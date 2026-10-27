/**
 * 光之镜 · 天空岛 — 主界面主题控制器 v2
 * ----------------------------------------------------------------------------
 * 只依赖 DSH 公开的 theme 服务（ctx.theme），不 import 任何 @deepseek-ai/* 包。
 *
 * 两套模式（content.js v2 TOKENS）：
 *   terminal 终端：低饱和低亮度深色（默认）
 *   temple   神殿：灰白石浅色
 *   auto     跟随 DSH 当前配色（light → temple / dark → terminal）
 *
 * 叠层：
 *   1) 主令牌层：content.js TOKENS.dark / TOKENS.light（15 个 --dsw-* 主令牌），
 *      强制模式时把对应一套同时写进 {light,dark} 两格；auto 则两格各取各的。
 *   2) 五光白细高光层：补充 DSH 的 hover/focus/三级文字等令牌，让宿主原生控件
 *      也落在「五光白 + 低饱和」体系里（可选叠加，撤销干净）。
 *   金色只出现在插件自己的装饰里（极小面积），不进入令牌。
 */

import { TOKENS, THEME_ID, THEME_SOURCE } from '../shared/content.js'

const HIGHLIGHT_SOURCE = THEME_SOURCE + '-highlight'
const MEDIA_DARK = '(prefers-color-scheme: dark)'

/**
 * 五光白细高光层（主令牌之外的 DSH 变量）。
 * 深色：白系低透明度；浅色：深墨系低透明度。
 */
const HIGHLIGHT_TOKENS = {
  '--dsw-alias-label-tertiary': { light: '#77747A', dark: '#7E7C88' },
  '--dsw-alias-label-primary-foreground': { light: '#EDEDEF', dark: '#0B0A0E' },
  '--dsw-alias-interactive-bg-hover': { light: '#1D1C2012', dark: '#E8E9EC14' },
  '--dsw-alias-interactive-bg-active': { light: '#1D1C201F', dark: '#E8E9EC1F' },
  '--dsw-focus-ring-color': { light: '#4B4752', dark: '#C8C8D6' },

  /* ── v3 浅色可读性补丁 ────────────────────────────────────────────────
     用户反馈「浅色模式下有些地方底是深色、字也是深色」。根因是：强制 temple
     时宿主仍带 data-ds-dark-theme，未被主令牌覆盖的 DSH 深色表面变量会留下
     深底；这些额外表面令牌在 temple 下一律换到灰白石，保证深字可读。 */
  '--dsw-alias-bg-layer-3': { light: '#E2DFDA', dark: '#353638' },
  '--dsw-alias-button-primary-hover': { light: '#5E5A64', dark: '#F5F5F7' },
  '--dsw-alias-button-primary-dimmed': { light: '#CFCBC4', dark: '#4A4750' },
  '--dsw-alias-button-floating-fill': { light: '#EFEEEA', dark: '#232324' },
  '--dsw-alias-button-floating-hover': { light: '#E2DFDA', dark: '#2C2C2E' },
  '--dsw-alias-button-elevated-fill': { light: '#E6E4E0', dark: '#232324' },
  '--dsw-alias-button-ghost-active-fill': { light: '#DEDAD4', dark: '#2A282F' },
  '--dsw-alias-interactive-bg-hover-solid': { light: '#DEDAD4', dark: '#2A282F' },
  '--dsw-alias-bg-module-platform': { light: '#E2DFDA', dark: '#2A2830' },
  '--dsw-alias-bg-multi-select': { light: '#E2DFDA', dark: '#2A2830' },
  '--dsw-alias-settings-card-fill': { light: '#E6E4E0', dark: '#18161C' },
  '--dsw-alias-settings-card-stroke': { light: '#C2C0BA', dark: '#2A2831' },
  '--dsw-alias-markdown-code-block': { light: '#EFEEEA', dark: '#151419' },
  '--dsw-alias-markdown-code-block-banner': { light: '#E6E4E0', dark: '#1B1A20' },
  '--dsw-alias-markdown-inline-code': { light: '#E2DFDA', dark: '#24232A' },
  '--dsw-alias-markdown-tag': { light: '#DEDAD4', dark: '#2A282F' },

  /* ── v7 蓝色元素 → 低饱和紫灰/白（深浅分别给明度）────────────────────
     composer 发送按钮原 --dsw-alias-button-info-fill、预览版徽标原
     state-business-tertiary/label-primary-bluish、对话/轨迹 tab 选中与
     工作区文件夹图标原 state-business-primary；这里先把 token 降到低饱和，
     渐变/色散由 styles.js 的精确选择器补。 */
  '--dsw-alias-state-business-primary': { light: '#6E6886', dark: '#C3BDDA' },
  '--dsw-alias-state-business-tertiary': { light: '#F2EEF9', dark: '#312D3D' },
  '--dsw-alias-label-primary-bluish': { light: '#5C566E', dark: '#DDD8EA' },
  '--dsw-alias-button-info-fill': { light: '#7A7395', dark: '#8A83A4' },
  '--dsw-alias-button-info-hover': { light: '#6C6686', dark: '#9C95B6' },
}

/** 折成 overrideTokens 需要的一格（强制模式时两格同值）。 */
function foldForMode(pair, uiMode) {
  if (uiMode === 'terminal') return { light: pair.dark, dark: pair.dark }
  if (uiMode === 'temple') return { light: pair.light, dark: pair.light }
  return { light: pair.light, dark: pair.dark }
}

/** 扁平化：register({ tokens }) 只需要当前基座那一套。 */
function flattenForScheme(tokens, scheme) {
  const out = {}
  for (const name of Object.keys(tokens)) {
    out[name] = tokens[name][scheme === 'dark' ? 'dark' : 'light']
  }
  return out
}

function prefersDark() {
  try {
    return typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia(MEDIA_DARK).matches
      : false
  } catch (e) {
    return false
  }
}

/**
 * @param {object} ctx Cordis 客户端上下文（需要 ctx.theme）
 * @param {object} store 配置 store
 */
export function createThemeController(ctx, store) {
  let disposers = []
  let armed = false
  let themeChangeOff = null
  let savedHostPreference = null
  const theme = ctx && ctx.theme ? ctx.theme : null

  /**
   * 插件 uiMode 明确为 terminal/temple 时，把宿主 DSH 主题偏好也锁到对应深浅，
   * 避免系统外观/宿主设置继续改动未被插件覆盖的 token 与 host 选择器；
   * 切回 auto 或停用插件时恢复用户原先的 DSH 偏好。
   */
  function hostPreference() {
    try {
      if (!theme || typeof theme.getTheme !== 'function') return null
      const snap = theme.getTheme()
      return snap && typeof snap.preference === 'string' ? snap.preference : null
    } catch (e) {
      return null
    }
  }

  function restoreHostPreference() {
    if (savedHostPreference === null) return
    const restore = savedHostPreference
    savedHostPreference = null
    try {
      if (!theme || typeof theme.setTheme !== 'function') return
      if (hostPreference() !== restore) theme.setTheme(restore)
    } catch (e) {
      /* 恢复失败时保持宿主现状 */
    }
  }

  function syncHostPreference(mode) {
    const forced = mode === 'terminal' || mode === 'temple'
    if (!forced) {
      restoreHostPreference()
      return
    }
    try {
      if (!theme || typeof theme.setTheme !== 'function') return
      const current = hostPreference()
      if (savedHostPreference === null && current !== null) savedHostPreference = current
      const target = mode === 'terminal' ? 'dark' : 'light'
      if (current !== target) theme.setTheme(target)
    } catch (e) {
      /* 锁定失败时退回 overrideTokens 兜底 */
    }
  }

  /** 当前模式解析成基座配色（light/dark）。 */
  function baseScheme(cfg) {
    const mode = cfg && cfg.uiMode ? cfg.uiMode : 'auto'
    if (mode === 'terminal') return 'dark'
    if (mode === 'temple') return 'light'
    try {
      if (theme && typeof theme.getTheme === 'function') {
        const snap = theme.getTheme()
        const scheme = snap && snap.active ? snap.active.colorScheme : null
        if (scheme === 'light' || scheme === 'dark') return scheme
      }
    } catch (e) {
      /* 退浏览器 prefer */
    }
    return prefersDark() ? 'dark' : 'light'
  }

  /** UI 上的实际模式（terminal/temple），auto 解析后落地为其中之一。 */
  function resolvedMode(cfg) {
    return baseScheme(cfg) === 'dark' ? 'terminal' : 'temple'
  }

  function markDocument(cfg) {
    try {
      const el = document.documentElement
      if (!el) return
      const mode = cfg && cfg.uiMode ? cfg.uiMode : 'auto'
      const scheme = baseScheme(cfg)
      el.setAttribute('data-lmui-mode', mode)
      el.setAttribute('data-lmui-resolved', scheme === 'dark' ? 'terminal' : 'temple')
      el.setAttribute('data-lmui-scheme', scheme)
      /* 强制模式时锁住 color-scheme / 宿主深浅属性，系统外观不再改基色 */
      el.style.colorScheme = scheme
      if (document.body) {
        if (scheme === 'dark') document.body.setAttribute('data-ds-dark-theme', '')
        else document.body.removeAttribute('data-ds-dark-theme')
      }
    } catch (e) {
      /* 无 DOM 时忽略 */
    }
  }

  function clearDocumentMarks() {
    try {
      const el = document.documentElement
      if (!el) return
      el.removeAttribute('data-lmui-mode')
      el.removeAttribute('data-lmui-resolved')
      el.removeAttribute('data-lmui-scheme')
      el.style.removeProperty('color-scheme')
    } catch (e) {
      /* noop */
    }
  }

  function disarm() {
    const pending = disposers
    disposers = []
    armed = false
    for (let i = pending.length - 1; i >= 0; i -= 1) {
      try {
        if (typeof pending[i] === 'function') pending[i]()
      } catch (e) {
        /* 已撤销 */
      }
    }
    clearDocumentMarks()
  }

  function arm(cfg) {
    if (!theme) return
    disarm()
    const mode = cfg && cfg.uiMode ? cfg.uiMode : 'auto'
    /* 明确模式先锁宿主 DSH 深浅偏好；auto 则恢复用户原偏好并跟随 */
    syncHostPreference(mode)
    const scheme = baseScheme(cfg)

    /* 主令牌层 */
    const folded = {}
    for (const name of Object.keys(TOKENS.dark)) {
      folded[name] = foldForMode({ light: TOKENS.light[name], dark: TOKENS.dark[name] }, mode)
    }

    try {
      if (typeof theme.register === 'function') {
        const layer = theme.register({
          id: THEME_ID,
          colorScheme: scheme === 'dark' ? 'dark' : 'light',
          tokens: flattenForScheme(folded, scheme),
        })
        if (typeof layer === 'function') disposers.push(layer)
      }
    } catch (e) {
      /* id 被同名实例占用时不影响覆盖层 */
    }

    try {
      if (typeof theme.overrideTokens === 'function') {
        const layer = theme.overrideTokens(THEME_SOURCE, folded)
        if (typeof layer === 'function') disposers.push(layer)
      }
    } catch (e) {
      /* 覆盖失败保持宿主原样 */
    }

    /* 五光白细高光层（后注册者胜） */
    try {
      if (typeof theme.overrideTokens === 'function') {
        const highlight = {}
        for (const name of Object.keys(HIGHLIGHT_TOKENS)) {
          highlight[name] = foldForMode(HIGHLIGHT_TOKENS[name], mode)
        }
        const layer = theme.overrideTokens(HIGHLIGHT_SOURCE, highlight)
        if (typeof layer === 'function') disposers.push(layer)
      }
    } catch (e) {
      /* 可选层失败不影响主层 */
    }

    markDocument(cfg)
    armed = true
  }

  function refresh(cfg) {
    if (!cfg || cfg.enabled !== true) {
      restoreHostPreference()
      disarm()
      return
    }
    arm(cfg)
  }

  /* DSH 主题改变：auto 跟随宿主；明确模式则把宿主深浅重新锁定回来。 */
  if (ctx && typeof ctx.on === 'function') {
    try {
      themeChangeOff = ctx.on('theme/change', () => {
        try {
          const cfg = store && typeof store.get === 'function' ? store.get() : null
          if (!armed || !cfg) return
          const mode = cfg.uiMode || 'auto'
          if (mode !== 'auto') {
            const target = mode === 'terminal' ? 'dark' : 'light'
            try {
              if (theme && typeof theme.setTheme === 'function' && hostPreference() !== target) {
                theme.setTheme(target)
              }
            } catch (e) {
              /* 锁定失败时保持现有覆盖 */
            }
          }
          markDocument(cfg)
        } catch (e) {
          /* 事件里不抛 */
        }
      })
    } catch (e) {
      themeChangeOff = null
    }
  }

  function dispose() {
    restoreHostPreference()
    disarm()
    if (typeof themeChangeOff === 'function') {
      try {
        themeChangeOff()
      } catch (e) {
        /* noop */
      }
      themeChangeOff = null
    }
  }

  return {
    arm,
    disarm,
    refresh,
    isArmed() {
      return armed
    },
    baseScheme,
    resolvedMode,
    dispose,
  }
}
