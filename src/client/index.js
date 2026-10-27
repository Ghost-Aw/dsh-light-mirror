/**
 * 光之镜 · 天空岛 — 主界面主题（client 半侧入口）v2
 * ----------------------------------------------------------------------------
 * DSH client bundle 格式由 build.mjs 包装；本文件只导出 apply / inject。
 *
 * 组成：
 *   theme.js     主题令牌层（终端深色 / 神殿灰白石 / auto，五光白细高光层）
 *   decor.js     shell.overlay 装饰（四角细框 / 星尘 / 右下状态字 / 派蒙立绘）
 *   brand.js     品牌单槽（法涅斯抠图 + 品牌文字，priority -200）
 *   rail.js      右侧「观测栏」（链接 / 系统指标 / 时间 / 回响播放器）
 *   settings.js  设置页（settings.section：id light-mirror、order 27、label 光之镜）
 *   styles.js    样式字符串（DECOR_CSS 随总开关装卸；SETTINGS_CSS 常驻）
 *
 * 总开关 enabled=false：撤销全部主题层、移除主界面样式、注销所有主界面插槽，
 * 主界面恢复 DSH 原样；设置页常驻（否则关掉后就找不回开关）。重新开启即时恢复。
 */

import {
  DEFAULTS,
  BOOL_KEYS,
  ENUMS,
  ENUM_ALIASES,
  RANGES,
  ROUTE_BASE,
  VERSION,
} from '../shared/content.js'
import { DECOR_CSS, SETTINGS_CSS } from './styles.js'
import { createThemeController } from './theme.js'
import { createDomPatches } from './dompatches.js'
import { normalizeHeroTitle, normalizeThinkingLabel } from './heroTitle.js'
import { registerBrand } from './brand.js'
import { registerDecor } from './decor.js'
import { registerRail } from './rail.js'
import { registerSettings, readConfig } from './settings.js'
import { createBackgroundController } from './bg.js'

const PLUGIN_ID = 'dsh-light-mirror'
const STYLE_MAIN = PLUGIN_ID + '/main.css'
const STYLE_SETTINGS = PLUGIN_ID + '/settings.css'
const CONFIG_ROUTE = ROUTE_BASE + '/config'
const METRICS_ROUTE = ROUTE_BASE + '/metrics'

function canUseDOM() {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

/** 注入一份插件拥有的全局样式；返回移除函数。重复注入时先清掉上一次的标签。 */
function mountStyle(css, key) {
  if (!canUseDOM()) return () => {}
  try {
    const stale = document.querySelectorAll('style[data-plugin-css="' + key + '"]')
    for (let i = 0; i < stale.length; i += 1) {
      const node = stale[i]
      if (node && node.parentNode) node.parentNode.removeChild(node)
    }
    const tag = document.createElement('style')
    tag.dataset.plugin = PLUGIN_ID
    tag.dataset.pluginCss = key
    tag.textContent = css
    ;(document.head || document.documentElement).appendChild(tag)
    return () => {
      try {
        if (tag.parentNode) tag.parentNode.removeChild(tag)
      } catch (e) {
        /* 已卸载 */
      }
    }
  } catch (e) {
    return () => {}
  }
}

/** 与 Host（index.js normalize）同口径的客户端规整；默认值全部来自 content.js。 */
export function normalizeConfig(input) {
  const out = Object.assign({}, DEFAULTS)
  const src = input && typeof input === 'object' ? input : {}
  for (const key of Object.keys(DEFAULTS)) {
    if (!(key in src) || src[key] === undefined || src[key] === null) continue
    const value = src[key]
    if (BOOL_KEYS.indexOf(key) >= 0) {
      out[key] = value === true || value === 'true' || value === 1 || value === '1'
    } else if (ENUMS[key]) {
      const aliased = ENUM_ALIASES && ENUM_ALIASES[key] ? ENUM_ALIASES[key][value] : undefined
      const candidate = aliased !== undefined ? aliased : value
      out[key] = ENUMS[key].indexOf(candidate) >= 0 ? candidate : DEFAULTS[key]
    } else if (RANGES[key]) {
      const range = RANGES[key]
      const n = Number(value)
      out[key] = Number.isFinite(n) ? Math.min(range[1], Math.max(range[0], n)) : DEFAULTS[key]
    } else {
      out[key] = value
    }
  }
  /* 空会话 Hero 标题：DEFAULTS 未含该字段（Host 侧未加 key），
     由 heroTitle.js 做 localStorage 持久化兜底。 */
  out.heroTitle = normalizeHeroTitle(src.heroTitle)
  /* 思考状态文案前缀（Host DEFAULTS 待补，先用 localStorage 兜底） */
  out.thinkingLabel = normalizeThinkingLabel(src.thinkingLabel)
  return out
}

/** 极简可订阅配置 store。 */
function createStore(initial) {
  let current = normalizeConfig(initial)
  const listeners = new Set()
  return {
    get() {
      return current
    },
    set(next) {
      current = normalizeConfig(next)
      const snapshot = current
      for (const fn of Array.from(listeners)) {
        try {
          fn(snapshot)
        } catch (e) {
          /* 某个订阅者出错不影响其它订阅者 */
        }
      }
      return current
    },
    subscribe(fn) {
      if (typeof fn !== 'function') return () => {}
      listeners.add(fn)
      return () => listeners.delete(fn)
    },
    clear() {
      listeners.clear()
    },
  }
}

/** Host 若在 index.html 里注入了 window.__LIGHT_MIRROR__，先拿来当初始值。 */
function readBootConfig() {
  try {
    const injected = window.__LIGHT_MIRROR__
    if (injected && typeof injected === 'object') return normalizeConfig(injected)
  } catch (e) {
    /* 启动动画关闭时 Host 不注入配置 */
  }
  return null
}

/**
 * 插件主体。
 * @param {object} ctx Cordis 客户端上下文（inject: slots/theme）
 */
export function apply(ctx) {
  if (!ctx) return
  const disposers = []
  const track = (disposer) => {
    if (typeof disposer === 'function') disposers.push(disposer)
  }

  /* 设置页样式常驻：即使主题关闭，设置页也要保持 DSH 原生观感。 */
  track(mountStyle(SETTINGS_CSS, STYLE_SETTINGS))

  const store = createStore(readBootConfig() || DEFAULTS)
  track(() => store.clear())

  const themeController = createThemeController(ctx, store)
  track(() => themeController.dispose())

  /* ── 主界面样式 + 插槽：可整体装卸 ─────────────────────────────────── */
  let uiDisposers = []
  let mainStyleOff = null

  function armUI() {
    if (uiDisposers.length > 0) return
    try {
      /* composer 磨砂不透明修复：属性在，v4 的 composer 规则才生效 */
      document.documentElement.setAttribute('data-lmui-composer', 'on')
    } catch (e) {
      /* noop */
    }
    if (!mainStyleOff) mainStyleOff = mountStyle(DECOR_CSS, STYLE_MAIN)
    const keep = (disposer) => {
      if (typeof disposer === 'function') uiDisposers.push(disposer)
    }
    try {
      registerDecor(ctx, store, keep)
    } catch (e) {
      /* 装饰失败不影响其它模块 */
    }
    try {
      registerBrand(ctx, store, keep)
    } catch (e) {
      /* 品牌失败不影响其它模块 */
    }
    try {
      registerRail(ctx, store, keep)
    } catch (e) {
      /* 观测栏失败不影响其它模块 */
    }
    try {
      /* 全屏固定背景层 + 动效层：不占插槽，通过 html 属性 / CSS 变量驱动 .lmui-bg */
      const background = createBackgroundController(store)
      keep(() => background.dispose())
    } catch (e) {
      /* 背景失败不影响主要主题 */
    }
    try {
      /* 权限三档文案 + 空会话 Hero 标题（MutationObserver 补宿主 DOM） */
      const domPatches = createDomPatches(store)
      keep(() => domPatches.dispose())
    } catch (e) {
      /* DOM 文案补丁失败不影响主要主题 */
    }
  }

  function disarmUI() {
    const pending = uiDisposers
    uiDisposers = []
    for (let i = pending.length - 1; i >= 0; i -= 1) {
      try {
        if (typeof pending[i] === 'function') pending[i]()
      } catch (e) {
        /* 已撤销 */
      }
    }
    try {
      document.documentElement.removeAttribute('data-lmui-composer')
    } catch (e) {
      /* noop */
    }
    if (mainStyleOff) {
      try {
        mainStyleOff()
      } catch (e) {
        /* noop */
      }
      mainStyleOff = null
    }
  }
  track(disarmUI)

  /** 使一份完整配置生效：总开关开 → 叠主题层 + 挂 UI；关 → 全撤。 */
  function applyConfig(input) {
    const cfg = store.set(input)
    if (cfg.enabled === true) {
      armUI()
      themeController.arm(cfg)
    } else {
      themeController.disarm()
      disarmUI()
    }
    return cfg
  }

  /* 设置页改动即时生效：主题相关字段重新叠层；其余字段靠 store 驱动重渲染。 */
  function onLive(next) {
    const prev = store.get()
    const cfg = store.set(next)
    const themeKeysChanged = cfg.enabled !== prev.enabled || cfg.uiMode !== prev.uiMode
    if (cfg.enabled !== prev.enabled) {
      if (cfg.enabled === true) {
        armUI()
        themeController.arm(cfg)
      } else {
        themeController.disarm()
        disarmUI()
      }
      return
    }
    if (cfg.enabled === true && (themeKeysChanged || !themeController.isArmed())) {
      armUI()
      themeController.arm(cfg)
    }
  }

  /* 设置页注册独立于总开关，保证关掉主题后还能把它打开。 */
  try {
    track(registerSettings(ctx, { store, onLive }))
  } catch (e) {
    /* 设置页注册失败不阻塞主题 */
  }

  /* ── 初始配置：优先 window 注入，其次 HTTP API；都拿不到用 DEFAULTS ─── */
  let booted = false
  function bootWith(input) {
    booted = true
    applyConfig(input)
  }

  const injected = readBootConfig()
  if (injected) bootWith(injected)

  let fallbackTimer = 0
  try {
    if (typeof fetch === 'function') {
      readConfig()
        .then((result) => {
          if (!booted) bootWith(result.config)
          else applyConfig(result.config)
        })
        .catch(() => {
          if (!booted) bootWith(DEFAULTS)
        })
      fallbackTimer = window.setTimeout(() => {
        if (!booted) bootWith(DEFAULTS)
      }, 3000)
    } else if (!booted) {
      bootWith(DEFAULTS)
    }
  } catch (e) {
    if (!booted) bootWith(DEFAULTS)
  }

  track(() => {
    try {
      if (fallbackTimer) window.clearTimeout(fallbackTimer)
    } catch (e) {
      /* noop */
    }
  })

  /* 模块卸载：清掉计时器、主题层、插槽、样式、监听。 */
  const cleanup = () => {
    try {
      if (fallbackTimer) window.clearTimeout(fallbackTimer)
    } catch (e) {
      /* noop */
    }
    fallbackTimer = 0
    for (let i = disposers.length - 1; i >= 0; i -= 1) {
      try {
        if (typeof disposers[i] === 'function') disposers[i]()
      } catch (e) {
        /* noop */
      }
    }
    disposers.length = 0
  }

  if (typeof ctx.effect === 'function') {
    ctx.effect(() => cleanup)
  }

  /* 便于宿主/调试面板/自测检查当前状态（只读）。 */
  try {
    window.__LIGHT_MIRROR_UI__ = {
      plugin: PLUGIN_ID,
      version: VERSION,
      configRoute: CONFIG_ROUTE,
      metricsRoute: METRICS_ROUTE,
      getConfig() {
        return store.get()
      },
      isThemed() {
        return themeController.isArmed()
      },
      resolvedMode() {
        return themeController.resolvedMode(store.get())
      },
    }
    window.__LIGHT_MIRROR_METRICS_URL__ = METRICS_ROUTE
  } catch (e) {
    /* noop */
  }
}

export const inject = ['slots', 'theme']
