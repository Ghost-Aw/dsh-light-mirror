/**
 * 光之镜 · 天空岛 — 设置页（settings.section）v2
 * ----------------------------------------------------------------------------
 * 注册：{ name: 'settings.section', id: 'light-mirror', order: 27, label: '光之镜' }
 *
 * 数据不走 settings 命名空间，直接走 Host 自带 HTTP API：
 *   GET  /light-mirror/config      → { ok, version, config, defaults, file }
 *   POST /light-mirror/config      → { patch } 合并保存 / { action:'reset' } 恢复默认
 *
 * 交互：字段改动即时写入 draft；主界面主题的开关/模式/装饰/观测栏/立绘等立即通过
 * 控制器生效（不刷新）；点「保存」POST；「恢复默认」POST reset；
 * 「立即预览」重新拉取已保存配置后调用启动动画运行时 replay（未加载则动态加载）。
 */

import * as ReactNS from 'react'
import {
  DEFAULTS,
  BOOL_KEYS,
  ENUMS,
  ENUM_ALIASES,
  RANGES,
  UI_COPY,
  VERSION,
} from '../shared/content.js'

const React =
  ReactNS && typeof ReactNS.createElement === 'function'
    ? ReactNS
    : ReactNS && ReactNS.default && typeof ReactNS.default.createElement === 'function'
      ? ReactNS.default
      : ReactNS
const h = React.createElement

const CONFIG_ROUTE = '/light-mirror/config'
const SPLASH_SCRIPT = '/light-mirror/splash.js'
const CONFIG_DISPLAY = '~/.dsh/light-mirror.json'

/* ── 配置 HTTP ────────────────────────────────────────────────────────── */

export function configUrl() {
  try {
    const injected = window.__LIGHT_MIRROR_CONFIG_URL__
    if (typeof injected === 'string' && injected) return injected
  } catch (e) {
    /* 无 window */
  }
  return CONFIG_ROUTE
}

/** 与 Host normalize 同口径（含 v1 → v2 的 uiMode 迁移）。默认值全部来自 content.js。 */
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
  return out
}

function httpError(res) {
  return new Error('HTTP ' + (res && res.status ? res.status : '?'))
}

export function readConfig() {
  return fetch(configUrl(), {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
    credentials: 'same-origin',
  })
    .then((res) => {
      if (!res || !res.ok) throw httpError(res)
      return res.json()
    })
    .then((json) => {
      if (!json || json.ok !== true || !json.config) throw new Error((json && json.error) || '读取配置失败')
      return {
        config: normalizeConfig(json.config),
        defaults: normalizeConfig(json.defaults || DEFAULTS),
        file: typeof json.file === 'string' ? json.file : '',
        version: json.version ? String(json.version) : VERSION,
      }
    })
}

function postConfig(payload) {
  return fetch(configUrl(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify(payload),
  })
    .then((res) => {
      if (!res || !res.ok) throw httpError(res)
      return res.json()
    })
    .then((json) => {
      if (!json || json.ok !== true || !json.config) throw new Error((json && json.error) || '保存失败')
      return normalizeConfig(json.config)
    })
}

/* ── 启动动画预览 ─────────────────────────────────────────────────────── */

let splashLoadPromise = null

function ensureSplashScript() {
  try {
    const api = window.__LIGHT_MIRROR_SPLASH__
    if (api && typeof api.replay === 'function') return Promise.resolve(true)
  } catch (e) {
    /* 继续动态加载 */
  }
  if (splashLoadPromise) return splashLoadPromise
  splashLoadPromise = new Promise((resolve, reject) => {
    let settled = false
    const finish = (err) => {
      if (settled) return
      settled = true
      if (err) {
        splashLoadPromise = null
        reject(err)
      } else {
        resolve(true)
      }
    }
    try {
      const script = document.createElement('script')
      script.src = SPLASH_SCRIPT + '?v=' + encodeURIComponent(VERSION) + '&t=' + Date.now()
      script.async = true
      script.dataset.lmuiSplashLoader = '1'
      script.onload = () => {
        try {
          const api = window.__LIGHT_MIRROR_SPLASH__
          if (api && typeof api.replay === 'function') finish(null)
          else finish(new Error('启动动画运行时未提供 replay()'))
        } catch (e) {
          finish(e)
        }
      }
      script.onerror = () => finish(new Error('启动动画脚本加载失败，请刷新页面后重试'))
      ;(document.head || document.documentElement).appendChild(script)
      window.setTimeout(() => {
        try {
          const api = window.__LIGHT_MIRROR_SPLASH__
          if (!api || typeof api.replay !== 'function') finish(new Error('启动动画脚本超时，请刷新页面后重试'))
        } catch (e) {
          finish(e)
        }
      }, 12000)
    } catch (e) {
      finish(e)
    }
  })
  return splashLoadPromise
}

/**
 * 立即预览启动动画。优先 window.__LIGHT_MIRROR_SPLASH__.replay()；
 * 未加载时动态插入 /light-mirror/splash.js。
 * @param {object} cfg 最新配置（同步写入 window.__LIGHT_MIRROR__ 供运行时读取）
 * @returns {Promise<boolean>}
 */
export function replaySplash(cfg) {
  const config = cfg && typeof cfg === 'object' ? cfg : {}
  try {
    window.__LIGHT_MIRROR__ = config
    if (!window.__LIGHT_MIRROR_CONFIG_URL__) window.__LIGHT_MIRROR_CONFIG_URL__ = configUrl()
  } catch (e) {
    /* noop */
  }
  const api = (() => {
    try {
      return window.__LIGHT_MIRROR_SPLASH__
    } catch (e) {
      return null
    }
  })()
  if (api && typeof api.replay === 'function') {
    try {
      const ret = api.replay(config)
      return Promise.resolve(ret).then(() => true)
    } catch (e) {
      return Promise.reject(e)
    }
  }
  return ensureSplashScript().then(() => {
    const loaded = window.__LIGHT_MIRROR_SPLASH__
    if (!loaded || typeof loaded.replay !== 'function') throw new Error('启动动画运行时不可用')
    const ret = loaded.replay(config)
    return Promise.resolve(ret).then(() => true)
  })
}

/* ── 原生观感的小控件（DSH 设置页风格：行 + label/hint + 原生控件）──────── */

function Row(props) {
  return h(
    'div',
    { className: 'lmui-row' },
    h(
      'div',
      { className: 'lmui-field' },
      h('div', { className: 'lmui-field__text' }, props.label),
      props.hint ? h('div', { className: 'lmui-field__hint' }, props.hint) : null,
    ),
    h('div', { className: 'lmui-field__control' }, props.children),
  )
}

function Group(props) {
  return h(
    'section',
    { className: 'lmui-group' },
    h('h3', { className: 'lmui-group__title' }, props.title),
    props.description ? h('p', { className: 'lmui-group__desc' }, props.description) : null,
    props.children,
  )
}

function ToggleRow(props) {
  return h(
    Row,
    { label: props.label, hint: props.hint },
    h('input', {
      type: 'checkbox',
      className: 'lmui-check',
      checked: props.checked === true,
      disabled: props.disabled === true,
      'aria-label': props.label,
      onChange: (event) => props.onChange(event.target.checked),
    }),
  )
}

function SelectRow(props) {
  return h(
    Row,
    { label: props.label, hint: props.hint },
    h(
      'select',
      {
        className: 'lmui-select',
        value: props.value,
        disabled: props.disabled === true,
        'aria-label': props.label,
        onChange: (event) => props.onChange(event.target.value),
      },
      props.options.map((opt) => h('option', { key: opt[0], value: opt[0] }, opt[1])),
    ),
  )
}

function RangeRow(props) {
  const min = Number(props.min)
  const max = Number(props.max)
  const value = Number(props.value)
  const span = Number.isFinite(max - min) && max > min ? max - min : 1
  const fill = Math.max(0, Math.min(1, (Number.isFinite(value) ? value : min) - min) / span)
  return h(
    Row,
    { label: props.label, hint: props.hint },
    h(
      'div',
      { className: 'lmui-range' },
      h('input', {
        type: 'range',
        className: 'lmui-range__input',
        min: props.min,
        max: props.max,
        step: props.step || 0.05,
        value: props.value,
        disabled: props.disabled === true,
        'aria-label': props.label,
        style: { '--lmui-fill': (fill * 100).toFixed(2) + '%' },
        onChange: (event) => props.onChange(Number(event.target.value)),
      }),
      h('span', { className: 'lmui-range__value' }, props.display),
    ),
  )
}

/* ── 主面板 ───────────────────────────────────────────────────────────── */

const UI_MODE_OPTIONS = [
  ['auto', '跟随系统'],
  ['terminal', '终端（深色）'],
  ['temple', '神殿（浅色）'],
]

const SPLASH_MODE_OPTIONS = [
  ['session', '每次浏览器会话一次（默认）'],
  ['daily', '每天一次'],
  ['every', '每次刷新都播放'],
]

const BRAND_MARK_OPTIONS =
  Array.isArray(UI_COPY.brandMarks) && UI_COPY.brandMarks.length
    ? UI_COPY.brandMarks
    : [
        ['phanes', '法涅斯徽记'],
        ['terminal', '光之镜终端'],
        ['skyisland', '天空岛'],
        ['paimonEmoji', '派蒙表情'],
        ['paimonAvatar', '派蒙头像'],
      ]

const PAIMON_VARIANT_OPTIONS =
  Array.isArray(UI_COPY.paimonVariants) && UI_COPY.paimonVariants.length
    ? UI_COPY.paimonVariants
    : [
        ['guide', '派蒙 · 半身'],
        ['paimon2', '派蒙 · 立绘'],
        ['emoji', '派蒙 · 表情'],
      ]

function percent(value) {
  const n = Number(value)
  return Math.round((Number.isFinite(n) ? n : 0) * 100) + '%'
}

function messageOf(error) {
  return String((error && error.message) || error || '未知错误')
}

function MirrorSettings(props) {
  const onLive = typeof props.onLive === 'function' ? props.onLive : () => {}
  const [draft, setDraft] = React.useState(null)
  const [saved, setSaved] = React.useState(null)
  const [file, setFile] = React.useState('')
  const [version, setVersion] = React.useState(VERSION)
  const [notice, setNotice] = React.useState('')
  const [error, setError] = React.useState('')
  const [busy, setBusy] = React.useState(false)

  const load = React.useCallback(() => {
    setError('')
    return readConfig()
      .then((result) => {
        setDraft(result.config)
        setSaved(result.config)
        setFile(result.file || '')
        setVersion(result.version || VERSION)
        onLive(result.config)
        return result
      })
      .catch((err) => {
        setError('读取配置失败：' + messageOf(err))
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    load()
  }, [load])

  const commit = (patch) => {
    if (!draft) return
    const next = normalizeConfig(Object.assign({}, draft, patch))
    setDraft(next)
    setNotice('')
    setError('')
    onLive(next)
  }

  const save = () => {
    if (!draft || busy) return
    setBusy(true)
    setNotice('')
    setError('')
    postConfig({ patch: draft })
      .then((next) => {
        setDraft(next)
        setSaved(next)
        onLive(next)
        setNotice(UI_COPY.saved)
      })
      .catch((err) => setError('保存失败：' + messageOf(err)))
      .then(() => setBusy(false))
  }

  const reset = () => {
    if (busy) return
    setBusy(true)
    setNotice('')
    setError('')
    postConfig({ action: 'reset' })
      .then((next) => {
        setDraft(next)
        setSaved(next)
        onLive(next)
        setNotice(UI_COPY.resetDone)
      })
      .catch((err) => setError('恢复默认失败：' + messageOf(err)))
      .then(() => setBusy(false))
  }

  const preview = () => {
    if (busy) return
    setBusy(true)
    setNotice('')
    setError('')
    readConfig()
      .then((result) => {
        setDraft(result.config)
        setSaved(result.config)
        onLive(result.config)
        return replaySplash(result.config)
      })
      .then(() => setNotice('正在播放启动动画预览。'))
      .catch((err) => setError('预览失败：' + messageOf(err)))
      .then(() => setBusy(false))
  }

  const versionLine = h(
    'div',
    { className: 'lmui-foot__line' },
    UI_COPY.versionPrefix + (version || VERSION) + ' · 配置：' + CONFIG_DISPLAY,
  )

  if (!draft) {
    return h(
      'div',
      { className: 'lmui-settings' },
      versionLine,
      h('div', { className: 'lmui-status' }, error || '正在读取配置…'),
      error
        ? h(
            'div',
            { className: 'lmui-actions' },
            h('button', { type: 'button', className: 'lmui-btn', onClick: load }, '重试'),
          )
        : null,
    )
  }

  const dirty = saved ? JSON.stringify(saved) !== JSON.stringify(draft) : false

  return h(
    'div',
    { className: 'lmui-settings', 'data-lmui-settings': '' },
    h(
      'header',
      { className: 'lmui-settings__head' },
      h('h2', { className: 'lmui-settings__title' }, UI_COPY.settingsTitle),
      h('p', { className: 'lmui-settings__desc' }, UI_COPY.settingsHint),
    ),

    /* ── 主界面 ── */
    h(
      Group,
      { title: '主界面' },
      h(ToggleRow, {
        label: '启用主界面主题',
        hint: '关闭后主题令牌、装饰、观测栏与品牌插槽全部撤销，立即恢复 DSH 原样。',
        checked: draft.enabled,
        onChange: (v) => commit({ enabled: v }),
      }),
      h(SelectRow, {
        label: '界面模式',
        hint: '终端=低饱和深色（默认）；神殿=灰白石浅色；跟随系统时按 DSH 当前配色切换。',
        value: draft.uiMode,
        options: UI_MODE_OPTIONS,
        onChange: (v) => commit({ uiMode: v }),
      }),
      h(SelectRow, {
        label: '品牌图案',
        hint: '侧栏与空会话 Hero 使用的图案；法涅斯徽记默认含左右翅膀，浅色模式自动用淡金版。',
        value: draft.brandMark,
        options: BRAND_MARK_OPTIONS,
        onChange: (v) => commit({ brandMark: v }),
      }),
      h(ToggleRow, {
        label: '右侧观测栏',
        hint: '侧栏页脚出现「观测」按钮；展开时在宿主布局里真实增加第三列（不覆盖正文）。开合状态会记住。',
        checked: draft.rail,
        onChange: (v) => commit({ rail: v }),
      }),
      h(ToggleRow, {
        label: '观测栏音乐',
        hint: '在观测栏里显示「回响」播放器（默认不自动播放）。',
        checked: draft.music,
        disabled: draft.rail !== true,
        onChange: (v) => commit({ music: v }),
      }),
      h(ToggleRow, {
        label: '派蒙全息立绘',
        hint: '观测栏内的半身全息立绘（扫描线 + 柔光 + 慢浮动）；素材缺失时显示星光占位。',
        checked: draft.mascot,
        disabled: draft.rail !== true,
        onChange: (v) => commit({ mascot: v }),
      }),
      h(SelectRow, {
        label: '派蒙形象',
        hint: '三档全息形象：半身 / 立绘 / 表情。',
        value: draft.paimonVariant,
        options: PAIMON_VARIANT_OPTIONS,
        disabled: draft.rail !== true || draft.mascot !== true,
        onChange: (v) => commit({ paimonVariant: v }),
      }),
      h(ToggleRow, {
        label: '图片背景',
        hint: '终端模式=倒计时终端场景（与启动动画解离露出层同源）；神殿模式=终端远景。',
        checked: draft.bgEnabled,
        onChange: (v) => commit({ bgEnabled: v }),
      }),
      h(RangeRow, {
        label: '背景不透明度',
        min: 0,
        max: 1,
        step: 0.05,
        value: draft.bgOpacity,
        display: percent(draft.bgOpacity),
        disabled: draft.bgEnabled !== true,
        onChange: (v) => commit({ bgOpacity: v }),
      }),
      h(ToggleRow, {
        label: '背景动态',
        hint: '渐变、光晕、数据流与星点的缓慢运动（reduced-motion 时自动静止）。',
        checked: draft.bgMotion,
        disabled: draft.bgEnabled !== true,
        onChange: (v) => commit({ bgMotion: v }),
      }),
      h(ToggleRow, {
        label: '星尘',
        hint: '上下边缘少量五光白星点，不落在正文上。',
        checked: draft.stardust,
        onChange: (v) => commit({ stardust: v }),
      }),
      h(ToggleRow, {
        label: '右下角状态字',
        hint: '极简的两行「光之镜 / SKY ISLAND · ONLINE」。',
        checked: draft.statusLine,
        onChange: (v) => commit({ statusLine: v }),
      }),
      h(ToggleRow, {
        label: '窗口细框',
        hint: '窗口四角极淡的五光白细线框。',
        checked: draft.frame,
        onChange: (v) => commit({ frame: v }),
      }),
    ),

    /* ── 启动动画 ── */
    h(
      Group,
      { title: '启动动画', description: UI_COPY.splashNote },
      h(ToggleRow, {
        label: '启用启动动画',
        hint: '关闭后页面加载直接进入主界面。',
        checked: draft.splashEnabled,
        onChange: (v) => commit({ splashEnabled: v }),
      }),
      h(SelectRow, {
        label: '播放时机',
        hint: '每次打开 DSH 时播放一次；同一标签页内刷新不会重复播放。',
        value: draft.splashMode,
        options: SPLASH_MODE_OPTIONS,
        onChange: (v) => commit({ splashMode: v }),
      }),
      h(ToggleRow, {
        label: '语音',
        hint: '播放 PV 原声台词；素材缺失时用系统语音兜底。',
        checked: draft.voice,
        onChange: (v) => commit({ voice: v }),
      }),
      h(RangeRow, {
        label: '语音音量',
        min: 0,
        max: 1,
        step: 0.05,
        value: draft.voiceVolume,
        display: percent(draft.voiceVolume),
        disabled: draft.voice !== true,
        onChange: (v) => commit({ voiceVolume: v }),
      }),
      h(ToggleRow, {
        label: '界面音效',
        hint: '低鸣、刻度与镜面玻璃声（WebAudio 合成）。',
        checked: draft.sfx,
        onChange: (v) => commit({ sfx: v }),
      }),
      h(RangeRow, {
        label: '音效音量',
        min: 0,
        max: 1,
        step: 0.05,
        value: draft.sfxVolume,
        display: percent(draft.sfxVolume),
        disabled: draft.sfx !== true,
        onChange: (v) => commit({ sfxVolume: v }),
      }),
      h(
        Row,
        {
          label: '立即预览',
          hint: '重新读取已保存的配置并播放一次启动动画；不会改动当前主界面。',
        },
        h(
          'button',
          { type: 'button', className: 'lmui-btn', disabled: busy, onClick: preview },
          UI_COPY.preview,
        ),
      ),
    ),

    /* ── 操作 ── */
    h(
      'div',
      { className: 'lmui-actions' },
      h(
        'button',
        { type: 'button', className: 'lmui-btn lmui-btn--primary', disabled: busy, onClick: save },
        busy ? '处理中…' : UI_COPY.save,
      ),
      h('button', { type: 'button', className: 'lmui-btn', disabled: busy, onClick: reset }, UI_COPY.reset),
      dirty ? h('span', { className: 'lmui-status' }, '有未保存的修改') : null,
      notice ? h('span', { className: 'lmui-status lmui-status--ok' }, notice) : null,
      error ? h('span', { className: 'lmui-status lmui-status--err' }, error) : null,
    ),

    /* ── 底部信息 ── */
    h(
      'footer',
      { className: 'lmui-foot' },
      versionLine,
      file && file !== CONFIG_DISPLAY && (file.indexOf('\\') >= 0 || file.indexOf('/') >= 0)
        ? h('div', { className: 'lmui-foot__line lmui-foot__line--mono', title: file }, '实际文件：' + file)
        : null,
      h(
        'div',
        { className: 'lmui-foot__line' },
        '素材声明：PV 画面与音乐版权归原权利方，本插件仅作个人、非商业的界面与启动动画使用。',
      ),
    ),
  )
}

/**
 * 注册设置页。这个注册独立于主界面总开关：主题关掉后设置页仍要能打开。
 * @param {object} ctx Cordis 客户端上下文
 * @param {{store:object, onLive:Function}} options
 * @returns {Function|null} disposer
 */
export function registerSettings(ctx, options) {
  if (!ctx || !ctx.slots) return null
  const slots = ctx.slots
  if (typeof slots.inject !== 'function' || typeof slots.register !== 'function') return null
  const opts = options || {}
  const Bound = (props) =>
    h(MirrorSettings, Object.assign({}, props, { store: opts.store, onLive: opts.onLive }))
  Bound.displayName = 'LMUI(Settings)'
  try {
    const off = slots.inject('settings.section', () =>
      slots.register(
        {
          name: 'settings.section',
          id: 'light-mirror',
          order: 27,
          label: UI_COPY.settingsTitle,
        },
        Bound,
      ),
    )
    return typeof off === 'function' ? off : null
  } catch (e) {
    return null
  }
}

export { MirrorSettings, CONFIG_ROUTE, CONFIG_DISPLAY }
