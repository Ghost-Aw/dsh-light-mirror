/**
 * 光之镜 · 天空岛 — 右侧「观测栏」v3（真实第三列停靠）
 * ----------------------------------------------------------------------------
 * 机制学习自参考项目（只学机制，视觉/文案原创）：
 *   - 观测栏不是 overlay，而是给 DSH frame 增加**真实第三列**：
 *     `[data-shell-overlay]` 的父元素就是 frame；打开时在 html 上发布
 *     `--lmui-rail-head`（读 frame 现有前两列 / 侧栏+正文）与 `--lmui-rail-w`，
 *     再由 `html[data-lmui-rail-docked] [data-lmui-frame]` 的 !important 规则
 *     改写成三列模板。关闭时只摘掉属性，不写 shell 的 inline style（React 拥有）。
 *   - 宽度按「剩余空间 40% 上限、正文 ≥480px 下限」计算；测不到可靠 template
 *     时降级为 overlay 模式（旧行为），不会把布局弄坏。
 *   - ResizeObserver 跟随侧栏拖拽 / 窗口缩放重新计算。
 *
 * 内容：链接 / 系统（CPU·内存·磁盘，4s）/ 时间（1s）/ 派蒙全息立绘 / 回响播放器。
 * 派蒙从右下角原图改为面板内全息描边风（半身、扫描线、色散、慢浮动），
 * variant（guide / paimon2 / emoji）可切换。
 */

import * as ReactNS from 'react'
import { MEDIA, STORAGE, UI_COPY } from '../shared/content.js'
import { resolveMedia } from './media.js'
import { useMirrorConfig, useScheme } from './brand.js'

const React =
  ReactNS && typeof ReactNS.createElement === 'function'
    ? ReactNS
    : ReactNS && ReactNS.default && typeof ReactNS.default.createElement === 'function'
      ? ReactNS.default
      : ReactNS
const h = React.createElement

const METRICS_URL = '/light-mirror/metrics'
const METRICS_INTERVAL = 4000
const GB = 1024 * 1024 * 1024

const RAIL_TARGET = 300
const RAIL_MIN = 260
const CONVERSATION_FLOOR = 480
const RAIL_SHARE = 0.4
const FALLBACK_WIDTH = 280

/* ── 打开状态持久化 ─────────────────────────────────────────────────── */

function persistOpen(open) {
  try {
    window.localStorage.setItem(STORAGE.railOpen, open ? '1' : '0')
  } catch (e) {
    /* 隐私模式忽略 */
  }
}

function readStoredOpen() {
  try {
    return window.localStorage.getItem(STORAGE.railOpen) === '1'
  } catch (e) {
    return false
  }
}

/* ── 停靠控制器（frame 三列 + 观察器）───────────────────────────────── */

/** 只按顶层空格切 grid template（minmax(400px, 1fr) 里也有空格）。 */
function splitTracks(template) {
  const tracks = []
  let depth = 0
  let current = ''
  for (const ch of String(template || '')) {
    if (ch === '(') depth += 1
    else if (ch === ')') depth = Math.max(0, depth - 1)
    if (/\s/.test(ch) && depth === 0) {
      if (current) {
        tracks.push(current)
        current = ''
      }
    } else {
      current += ch
    }
  }
  if (current) tracks.push(current)
  return tracks
}

function findFrameElement() {
  try {
    const overlay = document.querySelector('[data-shell-overlay]')
    if (overlay && overlay.parentElement) return overlay.parentElement
    const slotOverlay = document.querySelector('[data-slot="shell.overlay"]')
    if (slotOverlay && slotOverlay.parentElement) return slotOverlay.parentElement
  } catch (e) {
    /* noop */
  }
  return null
}

/** 第二列（正文）只在 shell 给的是弹性轨道时原样保留；固定 px 时改成 1fr，
    否则加第三列会溢出（computed template 只有 px 值）。 */
function headTrack(second) {
  if (!second) return 'minmax(0, 1fr)'
  if (/fr|minmax|fit-content|auto/.test(second)) return second
  return 'minmax(0, 1fr)'
}

function createRailController(store) {
  let open = readStoredOpen()
  let docked = false
  let frameEl = null
  let resizeObserver = null
  let mutationObserver = null
  let resizeHandler = null
  let scheduleTimer = 0
  let retryTimer = 0
  let disposed = false
  const listeners = new Set()

  const root = () => document.documentElement

  function emit() {
    for (const fn of Array.from(listeners)) {
      try {
        fn()
      } catch (e) {
        /* noop */
      }
    }
  }

  function publishOpenAttr(isOpen) {
    try {
      const el = root()
      if (!el) return
      el.setAttribute('data-lmui-rail', isOpen ? 'open' : 'closed')
    } catch (e) {
      /* noop */
    }
  }

  function clearDock() {
    docked = false
    try {
      const el = root()
      if (!el) return
      el.removeAttribute('data-lmui-rail-docked')
      el.removeAttribute('data-lmui-rail-mode')
      el.style.removeProperty('--lmui-rail-w')
      el.style.removeProperty('--lmui-rail-head')
      if (frameEl) frameEl.removeAttribute('data-lmui-frame')
    } catch (e) {
      /* noop */
    }
  }

  function teardownObservers() {
    try {
      if (resizeObserver) resizeObserver.disconnect()
    } catch (e) {
      /* noop */
    }
    resizeObserver = null
    try {
      if (mutationObserver) mutationObserver.disconnect()
    } catch (e) {
      /* noop */
    }
    mutationObserver = null
    try {
      if (resizeHandler) window.removeEventListener('resize', resizeHandler)
    } catch (e) {
      /* noop */
    }
    resizeHandler = null
  }

  function ensureObservers(frame) {
    if (!frame) return
    frameEl = frame
    if (!resizeHandler) {
      resizeHandler = () => schedule()
      try {
        window.addEventListener('resize', resizeHandler, { passive: true })
      } catch (e) {
        resizeHandler = null
      }
    }
    if (!resizeObserver && typeof window.ResizeObserver === 'function') {
      try {
        resizeObserver = new window.ResizeObserver(() => schedule())
        resizeObserver.observe(frame)
      } catch (e) {
        resizeObserver = null
      }
    }
    if (!mutationObserver && typeof window.MutationObserver === 'function') {
      try {
        mutationObserver = new window.MutationObserver(() => schedule())
        mutationObserver.observe(frame, { attributes: true, attributeFilter: ['style', 'class'] })
      } catch (e) {
        mutationObserver = null
      }
    }
  }

  function computeWidth(frame, tracks) {
    let viewport = 1280
    try {
      viewport = window.innerWidth || viewport
    } catch (e) {
      /* noop */
    }
    let frameWidth = viewport
    if (frame) {
      try {
        frameWidth = frame.getBoundingClientRect().width || viewport
      } catch (e) {
        frameWidth = viewport
      }
    }
    const sidebar = tracks.length >= 2 ? parseFloat(tracks[0]) || 0 : 0
    const spare = Math.max(0, frameWidth - sidebar)
    const capByShare = Math.round(spare * RAIL_SHARE)
    const capByFloor = Math.max(0, spare - CONVERSATION_FLOOR)
    let width = Math.min(RAIL_TARGET, capByShare, capByFloor)
    if (width < RAIL_MIN) width = Math.min(RAIL_MIN, capByFloor)
    return Math.max(0, Math.round(width))
  }

  function scheduleRetry(delay) {
    if (retryTimer || disposed) return
    retryTimer = window.setTimeout(() => {
      retryTimer = 0
      sync()
    }, delay || 400)
  }

  function sync() {
    if (disposed) return
    const cfg = (store && store.get()) || {}
    const active = cfg.enabled === true && cfg.rail === true
    publishOpenAttr(open && active)
    if (!open || !active) {
      clearDock()
      teardownObservers()
      if (retryTimer) {
        window.clearTimeout(retryTimer)
        retryTimer = 0
      }
      return
    }

    const frame = findFrameElement()
    if (!frame) {
      /* React 还没把 overlay 挂出来 / frame 还没出现：先 overlay 兜底，稍后重试 */
      clearDock()
      const el = root()
      if (el) {
        el.setAttribute('data-lmui-rail-mode', 'overlay')
        el.style.removeProperty('--lmui-rail-head')
        el.style.setProperty('--lmui-rail-w', FALLBACK_WIDTH + 'px')
      }
      scheduleRetry(320)
      return
    }

    /* 测量前必须先摘掉 dock 属性，否则 computed 读到的是我们自己的三列模板。 */
    const el = root()
    const wasDocked = el.hasAttribute('data-lmui-rail-docked')
    if (wasDocked) el.removeAttribute('data-lmui-rail-docked')
    frame.setAttribute('data-lmui-frame', '')
    let template = ''
    try {
      template = frame.style.gridTemplateColumns || getComputedStyle(frame).gridTemplateColumns || ''
    } catch (e) {
      template = frame.style.gridTemplateColumns || ''
    }
    const tracks = splitTracks(template)
    const sidebarTrack = tracks.length >= 2 ? parseFloat(tracks[0]) : NaN
    const headKnown = tracks.length >= 2 && Number.isFinite(sidebarTrack) && sidebarTrack > 0
    const width = computeWidth(frame, tracks)

    if (headKnown && width >= RAIL_MIN) {
      el.style.setProperty('--lmui-rail-w', width + 'px')
      el.style.setProperty('--lmui-rail-head', tracks[0] + ' ' + headTrack(tracks[1]))
      el.setAttribute('data-lmui-rail-mode', 'docked')
      el.setAttribute('data-lmui-rail-docked', '')
      docked = true
      ensureObservers(frame)
      if (retryTimer) {
        window.clearTimeout(retryTimer)
        retryTimer = 0
      }
    } else {
      el.removeAttribute('data-lmui-rail-docked')
      el.style.removeProperty('--lmui-rail-head')
      el.setAttribute('data-lmui-rail-mode', 'overlay')
      el.style.setProperty('--lmui-rail-w', FALLBACK_WIDTH + 'px')
      docked = false
      ensureObservers(frame)
      /* 首帧 shell 还没布局好：稍后重试测量 */
      scheduleRetry(400)
    }
  }

  function schedule() {
    if (disposed || scheduleTimer) return
    scheduleTimer = window.setTimeout(() => {
      scheduleTimer = 0
      sync()
    }, 90)
  }

  function setOpen(next) {
    const value = Boolean(next)
    if (value === open) {
      sync()
      return
    }
    open = value
    persistOpen(value)
    sync()
    emit()
  }

  function toggle() {
    setOpen(!open)
  }

  function getOpen() {
    return open
  }

  function isDocked() {
    return docked
  }

  function subscribe(fn) {
    if (typeof fn === 'function') listeners.add(fn)
    return () => listeners.delete(fn)
  }

  function dispose() {
    disposed = true
    teardownObservers()
    if (scheduleTimer) {
      try {
        window.clearTimeout(scheduleTimer)
      } catch (e) {
        /* noop */
      }
      scheduleTimer = 0
    }
    if (retryTimer) {
      try {
        window.clearTimeout(retryTimer)
      } catch (e) {
        /* noop */
      }
      retryTimer = 0
    }
    clearDock()
    try {
      root().removeAttribute('data-lmui-rail')
    } catch (e) {
      /* noop */
    }
    listeners.clear()
  }

  /* 配置变化（rail 开关 / enabled）立即重新评估停靠 */
  let storeOff = null
  if (store && typeof store.subscribe === 'function') {
    storeOff = store.subscribe(() => sync())
  }
  const baseDispose = dispose
  function disposeAll() {
    if (typeof storeOff === 'function') {
      try {
        storeOff()
      } catch (e) {
        /* noop */
      }
      storeOff = null
    }
    baseDispose()
  }

  /* 初始同步（仅当 DOM 已就绪） */
  try {
    if (document.readyState !== 'loading') sync()
    else document.addEventListener('DOMContentLoaded', () => sync(), { once: true })
  } catch (e) {
    /* noop */
  }

  return {
    getOpen,
    setOpen,
    toggle,
    subscribe,
    sync,
    isDocked,
    dispose: disposeAll,
  }
}

function useRail(controller) {
  const [, force] = React.useState(0)
  React.useEffect(() => {
    return controller.subscribe(() => force((n) => n + 1))
  }, [controller])
  return { open: controller.getOpen(), docked: controller.isDocked() }
}

/* ── 小图标（内联 SVG，跟随 currentColor）────────────────────────────── */

function IconEye() {
  return h(
    'svg',
    { width: '13', height: '13', viewBox: '0 0 16 16', fill: 'none', 'aria-hidden': 'true' },
    h('path', {
      d: 'M1.4 8 C3.4 4.7 5.6 3.2 8 3.2 C10.4 3.2 12.6 4.7 14.6 8 C12.6 11.3 10.4 12.8 8 12.8 C5.6 12.8 3.4 11.3 1.4 8 Z',
      stroke: 'currentColor',
      strokeWidth: '1.1',
      strokeLinejoin: 'round',
    }),
    h('circle', { cx: '8', cy: '8', r: '2.1', stroke: 'currentColor', strokeWidth: '1.1' }),
  )
}

function IconClose() {
  return h(
    'svg',
    { width: '12', height: '12', viewBox: '0 0 12 12', fill: 'none', 'aria-hidden': 'true' },
    h('path', { d: 'M2 2 L10 10 M10 2 L2 10', stroke: 'currentColor', strokeWidth: '1.1', strokeLinecap: 'round' }),
  )
}

function IconPrev() {
  return h(
    'svg',
    { width: '12', height: '12', viewBox: '0 0 16 16', fill: 'currentColor', 'aria-hidden': 'true' },
    h('path', { d: 'M4 3 H5.6 V13 H4 Z M13 3.4 V12.6 L6 8 Z' }),
  )
}

function IconNext() {
  return h(
    'svg',
    { width: '12', height: '12', viewBox: '0 0 16 16', fill: 'currentColor', 'aria-hidden': 'true' },
    h('path', { d: 'M12 3 H10.4 V13 H12 Z M3 3.4 V12.6 L10 8 Z' }),
  )
}

function IconPlay() {
  return h(
    'svg',
    { width: '12', height: '12', viewBox: '0 0 16 16', fill: 'currentColor', 'aria-hidden': 'true' },
    h('path', { d: 'M4.5 2.8 L13 8 L4.5 13.2 Z' }),
  )
}

function IconPause() {
  return h(
    'svg',
    { width: '12', height: '12', viewBox: '0 0 16 16', fill: 'currentColor', 'aria-hidden': 'true' },
    h('rect', { x: '4', y: '3', width: '3', height: '10', rx: '0.6' }),
    h('rect', { x: '9', y: '3', width: '3', height: '10', rx: '0.6' }),
  )
}

/* ── 时间 ─────────────────────────────────────────────────────────────── */

const ZH_WEEK = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

function pad2(value) {
  const n = Number(value) || 0
  return n < 10 ? '0' + n : String(n)
}

function formatClock(date) {
  const d = date instanceof Date && !Number.isNaN(date.getTime()) ? date : new Date()
  return {
    date: d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日 ' + ZH_WEEK[d.getDay()],
    time: pad2(d.getHours()) + ':' + pad2(d.getMinutes()) + ':' + pad2(d.getSeconds()),
  }
}

function formatDuration(seconds) {
  const s = Number(seconds)
  if (!Number.isFinite(s) || s <= 0) return '0:00'
  const total = Math.floor(s)
  return Math.floor(total / 60) + ':' + pad2(total % 60)
}

function useClock() {
  const [now, setNow] = React.useState(() => new Date())
  React.useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])
  return now
}

/* ── 系统指标 ─────────────────────────────────────────────────────────── */

function metricsUrl() {
  try {
    if (typeof window.__LIGHT_MIRROR_METRICS_URL__ === 'string' && window.__LIGHT_MIRROR_METRICS_URL__) {
      return window.__LIGHT_MIRROR_METRICS_URL__
    }
  } catch (e) {
    /* noop */
  }
  return METRICS_URL
}

function useMetrics(active) {
  const [state, setState] = React.useState({ status: 'idle', data: null })
  React.useEffect(() => {
    if (!active) {
      setState({ status: 'idle', data: null })
      return undefined
    }
    let alive = true
    let timer = 0
    const load = () => {
      try {
        fetch(metricsUrl(), { headers: { Accept: 'application/json' }, cache: 'no-store', credentials: 'same-origin' })
          .then((res) => {
            if (!res || !res.ok) throw new Error('HTTP ' + (res && res.status))
            return res.json()
          })
          .then((json) => {
            if (!alive) return
            if (json && json.ok === true) setState({ status: 'ready', data: json })
            else setState((prev) => (prev.status === 'ready' ? prev : { status: 'error', data: null }))
          })
          .catch(() => {
            if (alive) setState((prev) => (prev.status === 'ready' ? prev : { status: 'error', data: null }))
          })
      } catch (e) {
        if (alive) setState({ status: 'error', data: null })
      }
    }
    setState((prev) => (prev.status === 'ready' ? prev : { status: 'loading', data: null }))
    load()
    timer = window.setInterval(load, METRICS_INTERVAL)
    return () => {
      alive = false
      window.clearInterval(timer)
    }
  }, [active])
  return state
}

function percent(value) {
  const n = Number(value)
  return Number.isFinite(n) ? Math.max(0, Math.min(100, n)) : null
}

function formatGB(bytes) {
  const n = Number(bytes)
  if (!Number.isFinite(n) || n <= 0) return '—'
  const gb = n / GB
  return (gb >= 10 ? gb.toFixed(0) : gb.toFixed(1)) + ' GB'
}

function MetricRow(props) {
  const pct = percent(props.value)
  return h(
    'div',
    { className: 'lmui-rail__metric' },
    h(
      'div',
      { className: 'lmui-rail__metricHead' },
      h('span', { className: 'lmui-rail__metricLabel' }, props.label),
      h(
        'span',
        { className: 'lmui-rail__metricValue' },
        pct === null ? '—' : (pct < 10 ? pct.toFixed(1) : Math.round(pct)) + '%',
      ),
    ),
    h(
      'div',
      { className: 'lmui-rail__bar', 'aria-hidden': 'true' },
      h('span', { className: 'lmui-rail__barFill', style: { width: (pct === null ? 0 : pct) + '%' } }),
    ),
    props.sub ? h('div', { className: 'lmui-rail__metricSub' }, props.sub) : null,
  )
}

function SystemSection(props) {
  const state = props.state
  let cpu = null
  let memory = null
  let disk = null
  if (state.status === 'ready' && state.data) {
    const data = state.data
    cpu = data.cpu && typeof data.cpu.usage === 'number' ? data.cpu.usage : null
    memory = data.memory && typeof data.memory.usedPercent === 'number' ? data.memory : null
    disk = data.disk && typeof data.disk.usedPercent === 'number' ? data.disk : null
  }
  const loading = state.status === 'loading' || state.status === 'idle'
  return h(
    'section',
    { className: 'lmui-rail__section' },
    h('div', { className: 'lmui-rail__sectionTitle' }, UI_COPY.railSystem),
    loading && state.status !== 'ready'
      ? h('div', { className: 'lmui-rail__hint' }, '正在读取系统信息…')
      : state.status === 'error'
        ? h('div', { className: 'lmui-rail__hint' }, '系统信息暂不可用')
        : h(
            React.Fragment,
            null,
            h(MetricRow, {
              label: 'CPU',
              value: cpu,
              sub: state.data && state.data.cpu && state.data.cpu.cores ? state.data.cpu.cores + ' 线程' : null,
            }),
            h(MetricRow, {
              label: '内存',
              value: memory ? memory.usedPercent : null,
              sub: memory
                ? formatGB(memory.totalBytes - memory.freeBytes) + ' / ' + formatGB(memory.totalBytes)
                : null,
            }),
            h(MetricRow, {
              label: '磁盘',
              value: disk ? disk.usedPercent : null,
              sub: disk
                ? formatGB(disk.totalBytes - disk.freeBytes) + ' / ' + formatGB(disk.totalBytes)
                : '—',
            }),
          ),
  )
}

/* ── 派蒙全息立绘 ─────────────────────────────────────────────────────── */

/* 派蒙素材：线稿 PNG 优先（resource-smith 产出），缺图逐级回退旧半身/全息。
   - 线稿黑版：paimon-line-<variant>.png（浅色直接 multiply；深色 CSS 反相）
   - 线稿白版：paimon-line-<variant>-white.png（深色 screen；浅色 CSS 反相）
   - 三条变体 guide / 2 / emoji 沿用 / 回退 half → holo → raw。 */
const PAIMON_NAME = { guide: 'guide', paimon2: '2', emoji: 'emoji' }
const PAIMON_ART_DIR = (() => {
  const url = resolveMedia(MEDIA.art.paimonHoloGuide)
  return url ? url.replace(/[^/]+$/i, '') : ''
})()
function paimonArt(name) {
  return PAIMON_ART_DIR ? PAIMON_ART_DIR + name : ''
}

const PAIMON_HOLO = {
  guide: () => MEDIA.art.paimonHoloGuide,
  paimon2: () => MEDIA.art.paimonHolo2,
  emoji: () => MEDIA.art.paimonHoloEmoji,
}

function paimonSources(variant, scheme) {
  const key = PAIMON_HOLO[variant] ? variant : 'guide'
  const suffix = PAIMON_NAME[key] || 'guide'
  const holoRaw = PAIMON_HOLO[key]()
  const holoUrl = resolveMedia(holoRaw)
  const halfRaw = holoRaw ? holoRaw.replace(/paimon-holo-(guide|2|emoji)\.png$/i, 'paimon-half-$1.png') : ''
  const halfUrl = halfRaw && halfRaw !== holoRaw ? resolveMedia(halfRaw) : ''
  const lineBlack = paimonArt('paimon-line-' + suffix + '.png')
  const lineWhiteCandidates = [
    paimonArt('paimon-line-' + suffix + '-white.png'),
    paimonArt('paimon-line-white-' + suffix + '.png'),
    paimonArt('paimon-line-' + suffix + '-w.png'),
  ].filter(Boolean)
  const list = []
  const push = (kind, url) => {
    if (!url) return
    if (list.some((item) => item.url === url)) return
    list.push({ kind, url })
  }
  if (scheme === 'light') {
    push('line-black', lineBlack)
    lineWhiteCandidates.forEach((url) => push('line-white', url))
  } else {
    lineWhiteCandidates.forEach((url) => push('line-white', url))
    push('line-black', lineBlack)
  }
  push('half', halfUrl)
  push('holo', holoUrl)
  const raw = resolveMedia(MEDIA.art.paimon)
  if (raw) push('raw', raw)
  return list
}

function PaimonPlaceholder() {
  return h(
    'svg',
    { className: 'lmui-paimon__fallback', viewBox: '0 0 64 64', 'aria-hidden': 'true', focusable: 'false' },
    h('circle', { cx: '32', cy: '32', r: '10', fill: 'currentColor', opacity: '0.85' }),
    h('path', {
      d: 'M32 6 L34.8 28.6 L58 32 L34.8 35.4 L32 58 L29.2 35.4 L6 32 L29.2 28.6 Z',
      fill: 'currentColor',
      opacity: '0.5',
    }),
  )
}

function PaimonHolo(props) {
  const variant = props.variant || 'guide'
  const scheme = useScheme()
  const sources = React.useMemo(() => paimonSources(variant, scheme), [variant, scheme])
  const [sourceIndex, setSourceIndex] = React.useState(0)
  const [loaded, setLoaded] = React.useState(false)
  const [sourceKind, setSourceKind] = React.useState('')
  const entry = sources[sourceIndex]
  const src = entry ? entry.url : ''
  const isLine = /paimon-line-/.test(String(src))
  const fx = React.useMemo(
    () => ({
      scan: (4 + Math.random() * 2).toFixed(2) + 's',
      ghostA: (8 + Math.random() * 6).toFixed(2) + 's',
      ghostB: (8 + Math.random() * 6).toFixed(2) + 's',
      bar: (11 + Math.random() * 5).toFixed(2) + 's',
    }),
    [src],
  )
  const variantLabel = (() => {
    const item = (UI_COPY.paimonVariants || []).find((pair) => pair[0] === variant)
    return item ? item[1] : '派蒙'
  })()

  React.useEffect(() => {
    setSourceIndex(0)
    setLoaded(false)
    setSourceKind('')
  }, [variant])
  React.useEffect(() => {
    setLoaded(false)
    setSourceKind('')
  }, [src])

  return h(
    'section',
    { className: 'lmui-rail__section lmui-rail__section--paimon' },
    h(
      'div',
      { className: 'lmui-rail__sectionHead' },
      h('div', { className: 'lmui-rail__sectionTitle' }, UI_COPY.railPaimon),
      h('span', { className: 'lmui-rail__sectionMeta' }, variantLabel),
    ),
    h(
      'div',
      {
        className: 'lmui-paimon',
        'data-lmui-paimon': variant,
        'data-lmui-paimon-source': loaded ? sourceKind : '',
        'data-lmui-paimon-line': isLine ? '1' : '0',
        style: Object.assign(
          {},
          isLine ? { '--lmui-paimon-mask': 'url("' + src + '")' } : {},
          src
            ? {
                '--lmui-paimon-img': 'url("' + src + '")',
                '--lmui-scan-cycle': fx.scan,
                '--lmui-glitch-cycle-a': fx.ghostA,
                '--lmui-glitch-cycle-b': fx.ghostB,
                '--lmui-glitch-bar-cycle': fx.bar,
              }
            : {},
        ),
        'aria-hidden': 'true',
      },
      loaded ? null : h(PaimonPlaceholder, null),
      h('div', { className: 'lmui-paimon__glow' }),
      src
        ? h('img', {
            key: src,
            className: 'lmui-paimon__img',
            src,
            alt: '',
            draggable: false,
            decoding: 'async',
            style: { opacity: loaded ? 1 : 0 },
            onLoad: () => {
              setSourceKind(entry ? entry.kind : '')
              setLoaded(true)
            },
            onError: () => {
              setLoaded(false)
              setSourceKind('')
              setSourceIndex((prev) => prev + 1)
            },
          })
        : null,
      src
        ? h('span', { className: 'lmui-paimon__ghost lmui-paimon__ghost--a', 'aria-hidden': 'true' })
        : null,
      src
        ? h('span', { className: 'lmui-paimon__ghost lmui-paimon__ghost--b', 'aria-hidden': 'true' })
        : null,
      src ? h('span', { className: 'lmui-paimon__glitchBar', 'aria-hidden': 'true' }) : null,
      h('div', { className: 'lmui-paimon__scan', 'aria-hidden': 'true' }),
    ),
  )
}

/* ── 回响播放器 ───────────────────────────────────────────────────────── */

const BGM = Array.isArray(MEDIA.bgm) ? MEDIA.bgm : []
const MUSIC_LOOP_KEY = (STORAGE && STORAGE.musicLoop) || 'light-mirror:music-loop'
const LOOP_MODES = ['list', 'single', 'shuffle']
const LOOP_META = {
  list: { glyph: '列', label: '列表循环' },
  single: { glyph: '单', label: '单曲循环' },
  shuffle: { glyph: '随', label: '随机循环' },
}

function readTrackIndex() {
  try {
    const raw = Number(window.localStorage.getItem(STORAGE.musicTrack))
    if (Number.isInteger(raw) && raw >= 0 && raw < BGM.length) return raw
  } catch (e) {
    /* noop */
  }
  return 0
}

function readLoopMode() {
  try {
    const raw = window.localStorage.getItem(MUSIC_LOOP_KEY)
    if (LOOP_MODES.indexOf(raw) >= 0) return raw
  } catch (e) {
    /* noop */
  }
  return 'list'
}

function readVolume() {
  try {
    const raw = Number(window.localStorage.getItem(STORAGE.musicVolume))
    if (Number.isFinite(raw) && raw >= 0 && raw <= 1) return raw
  } catch (e) {
    /* noop */
  }
  return 0.5
}

function MusicPlayer() {
  const [index, setIndex] = React.useState(readTrackIndex)
  const [volume, setVolume] = React.useState(readVolume)
  const [playing, setPlaying] = React.useState(false)
  const [loopMode, setLoopMode] = React.useState(readLoopMode)
  const [error, setError] = React.useState('')
  const [time, setTime] = React.useState({ current: 0, duration: 0 })
  const audioRef = React.useRef(null)
  const playingRef = React.useRef(false)
  const historyRef = React.useRef([])
  const autoplayRef = React.useRef(false)

  React.useEffect(() => {
    playingRef.current = playing
  }, [playing])

  const track = BGM[index] || null

  /* 循环模式持久化；单曲循环立刻把 audio.loop 打开，切走时关闭，
     不打断当前播放。 */
  React.useEffect(() => {
    try {
      window.localStorage.setItem(MUSIC_LOOP_KEY, loopMode)
    } catch (e) {
      /* noop */
    }
    const audio = audioRef.current
    if (audio) audio.loop = loopMode === 'single'
  }, [loopMode])

  React.useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE.musicTrack, String(index))
    } catch (e) {
      /* noop */
    }
    const audio = audioRef.current
    if (!audio) return
    /* 切歌重置进度/时长；音量不动 */
    setTime({ current: 0, duration: 0 })
    try {
      audio.currentTime = 0
    } catch (e) {
      /* noop */
    }
    try {
      audio.volume = volume
      audio.load()
    } catch (e) {
      /* noop */
    }
    if (playingRef.current || autoplayRef.current) {
      autoplayRef.current = false
      const result = audio.play()
      if (result && typeof result.catch === 'function') {
        result.catch(() => {
          setPlaying(false)
          setError('音频素材尚未就绪')
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  React.useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    try {
      audio.volume = volume
    } catch (e) {
      /* noop */
    }
    try {
      window.localStorage.setItem(STORAGE.musicVolume, String(volume))
    } catch (e) {
      /* noop */
    }
  }, [volume])

  if (!track) return h('div', { className: 'lmui-rail__hint' }, UI_COPY.musicEmpty)

  const play = () => {
    const audio = audioRef.current
    if (!audio) return
    setError('')
    const result = audio.play()
    if (result && typeof result.then === 'function') {
      result.then(
        () => setPlaying(true),
        () => {
          setPlaying(false)
          setError('音频素材尚未就绪')
        },
      )
    } else {
      setPlaying(true)
    }
  }

  const pause = () => {
    const audio = audioRef.current
    if (!audio) return
    try {
      audio.pause()
    } catch (e) {
      /* noop */
    }
    setPlaying(false)
  }

  const toggle = () => (playing ? pause() : play())

  const pickShuffle = (current) => {
    if (BGM.length <= 1) return current
    let next = current
    let guard = 0
    while (next === current && guard < 24) {
      next = Math.floor(Math.random() * BGM.length)
      guard += 1
    }
    return next
  }

  const step = (delta) => {
    if (BGM.length === 0) return
    setError('')
    if (loopMode === 'shuffle') {
      if (delta < 0 && historyRef.current.length > 0) {
        setIndex(historyRef.current.pop())
        return
      }
      if (delta > 0) {
        historyRef.current.push(index)
        if (historyRef.current.length > 50) historyRef.current.shift()
        setIndex(pickShuffle(index))
        return
      }
    }
    setIndex((prev) => (prev + delta + BGM.length) % BGM.length)
  }

  const cycleLoop = () => {
    setLoopMode((prev) => LOOP_MODES[(LOOP_MODES.indexOf(prev) + 1) % LOOP_MODES.length])
  }

  const handleEnded = () => {
    const audio = audioRef.current
    if (!audio) return
    if (BGM.length === 0) {
      setPlaying(false)
      return
    }
    if (loopMode === 'single') {
      try {
        audio.currentTime = 0
      } catch (e) {
        /* noop */
      }
      setTime({ current: 0, duration: audio.duration || 0 })
      play()
      return
    }
    if (BGM.length === 1) {
      try {
        audio.currentTime = 0
      } catch (e) {
        /* noop */
      }
      play()
      return
    }
    if (loopMode === 'shuffle') {
      autoplayRef.current = true
      historyRef.current.push(index)
      if (historyRef.current.length > 50) historyRef.current.shift()
      setIndex(pickShuffle(index))
      return
    }
    autoplayRef.current = true
    setIndex((prev) => (prev + 1) % BGM.length)
  }

  const loopMeta = LOOP_META[loopMode] || LOOP_META.list

  return h(
    'div',
    { className: 'lmui-music' },
    h(
      'div',
      { className: 'lmui-music__head' },
      h(
        'div',
        { className: 'lmui-music__headLeft' },
        h('span', { className: 'lmui-rail__sectionTitle' }, UI_COPY.railMusic),
        h('span', { className: 'lmui-music__title' }, track.title),
      ),
      h('span', { className: 'lmui-music__count', 'data-lmui-loop': loopMode }, index + 1 + ' / ' + BGM.length + ' · ' + loopMeta.label),
    ),
    h(
      'div',
      { className: 'lmui-music__scrub' },
      h('span', { className: 'lmui-music__time' }, formatDuration(time.current)),
      h('input', {
        type: 'range',
        className: 'lmui-music__progress',
        min: 0,
        max: Math.max(1, Math.round(time.duration || 0)),
        step: 1,
        value: Math.min(Math.round(time.current), Math.round(time.duration || 0)),
        'aria-label': '播放进度',
        disabled: !time.duration,
        onChange: (event) => {
          const audio = audioRef.current
          if (!audio) return
          const next = Number(event.target.value) || 0
          try {
            audio.currentTime = next
          } catch (e) {
            /* noop */
          }
          setTime((prev) => Object.assign({}, prev, { current: next }))
        },
      }),
      h('span', { className: 'lmui-music__time' }, formatDuration(time.duration)),
    ),
    h(
      'div',
      { className: 'lmui-music__controls' },
      h(
        'button',
        { type: 'button', className: 'lmui-music__btn', 'aria-label': '上一首', onClick: () => step(-1) },
        h(IconPrev, null),
      ),
      h(
        'button',
        {
          type: 'button',
          className: 'lmui-music__btn lmui-music__btn--main',
          'aria-label': playing ? '暂停' : '播放',
          onClick: toggle,
        },
        playing ? h(IconPause, null) : h(IconPlay, null),
      ),
      h(
        'button',
        { type: 'button', className: 'lmui-music__btn', 'aria-label': '下一首', onClick: () => step(1) },
        h(IconNext, null),
      ),
      h(
        'button',
        {
          type: 'button',
          className: 'lmui-music__btn lmui-music__btn--loop',
          'data-lmui-loop': loopMode,
          title: '循环模式：' + loopMeta.label + '（点击切换）',
          'aria-label': '循环模式：' + loopMeta.label + '，点击切换',
          onClick: cycleLoop,
        },
        h('span', { className: 'lmui-music__loopGlyph', 'aria-hidden': 'true' }, loopMeta.glyph),
      ),
      h(
        'div',
        { className: 'lmui-music__volume' },
        h('input', {
          type: 'range',
          className: 'lmui-music__volumeInput',
          min: 0,
          max: 100,
          step: 1,
          value: Math.round(volume * 100),
          'aria-label': '音量',
          onChange: (event) => setVolume(Math.max(0, Math.min(1, (Number(event.target.value) || 0) / 100))),
        }),
      ),
    ),
    error ? h('div', { className: 'lmui-music__hint' }, error) : null,
    h('audio', {
      ref: audioRef,
      src: resolveMedia(track.src),
      preload: 'none',
      onTimeUpdate: (event) => {
        const audio = event.currentTarget
        setTime({ current: audio.currentTime || 0, duration: audio.duration || 0 })
      },
      onLoadedMetadata: (event) => {
        const audio = event.currentTarget
        setTime((prev) => Object.assign({}, prev, { duration: audio.duration || 0 }))
      },
      onEnded: handleEnded,
      onError: () => {
        setPlaying(false)
        setError('音频素材尚未就绪')
      },
      onPlay: () => setPlaying(true),
      onPause: () => setPlaying(false),
    }),
  )
}

/* ── 面板 ─────────────────────────────────────────────────────────────── */

function RailPanel(props) {
  const cfg = useMirrorConfig(props.store)
  const rail = useRail(props.controller)
  const now = useClock()
  const metrics = useMetrics(rail.open && cfg.rail === true)
  if (cfg.rail !== true) return null
  const clock = formatClock(now)
  const open = rail.open
  return h(
    'div',
    {
      className: 'lmui-rail' + (open ? ' lmui-rail--open' : ''),
      'data-lmui-rail-panel': '',
      'data-open': open ? 'true' : 'false',
      'data-mode': rail.docked ? 'docked' : 'overlay',
      'aria-hidden': open ? undefined : 'true',
    },
    h(
      'div',
      { className: 'lmui-rail__surface', role: 'complementary', 'aria-label': '观测栏' },
      h(
        'header',
        { className: 'lmui-rail__head' },
        h(
          'div',
          { className: 'lmui-rail__headText' },
          h('span', { className: 'lmui-rail__spark', 'aria-hidden': 'true' }),
          h('span', { className: 'lmui-rail__title' }, UI_COPY.railTitle),
          h('span', { className: 'lmui-rail__titleEn' }, 'OBSERVATION'),
        ),
        h(
          'button',
          {
            type: 'button',
            className: 'lmui-rail__close',
            'aria-label': '收起观测栏',
            onClick: () => props.controller.setOpen(false),
          },
          h(IconClose, null),
        ),
      ),
      h(
        'div',
        { className: 'lmui-rail__body' },
        h(
          'section',
          { className: 'lmui-rail__section' },
          h('div', { className: 'lmui-rail__sectionTitle' }, UI_COPY.railLink),
          h(
            'div',
            { className: 'lmui-rail__linkRow' },
            h('span', { className: 'lmui-rail__linkDot', 'aria-hidden': 'true' }),
            h(
              'div',
              { className: 'lmui-rail__linkText' },
              h('div', { className: 'lmui-rail__value' }, '光之镜 · 天空岛链接'),
              h('div', { className: 'lmui-rail__sub' }, 'ONLINE'),
            ),
          ),
        ),
        /* 顺序：链接 → 派蒙 → 系统 → 时间 → 回响（派蒙固定在系统上面） */
        cfg.mascot === true ? h(PaimonHolo, { variant: cfg.paimonVariant }) : null,
        h(SystemSection, { state: metrics }),
        h(
          'section',
          { className: 'lmui-rail__section' },
          h('div', { className: 'lmui-rail__sectionTitle' }, UI_COPY.railTime),
          h(
            'div',
            { className: 'lmui-rail__clock' },
            h('div', { className: 'lmui-rail__clockDate' }, clock.date),
            h('div', { className: 'lmui-rail__clockTime' }, clock.time),
          ),
        ),
        cfg.music === true
          ? h('section', { className: 'lmui-rail__section lmui-rail__section--music' }, h(MusicPlayer, null))
          : h(
              'section',
              { className: 'lmui-rail__section' },
              h('div', { className: 'lmui-rail__sectionTitle' }, UI_COPY.railMusic),
              h('div', { className: 'lmui-rail__hint' }, UI_COPY.musicEmpty),
            ),
      ),
    ),
  )
}

/* ── 侧栏 footer 按钮 ─────────────────────────────────────────────────── */

function RailToggle(props) {
  const cfg = useMirrorConfig(props.store)
  const rail = useRail(props.controller)
  if (cfg.rail !== true) return null
  const wide = props.wide !== false
  const onClick = (event) => {
    try {
      if (event && typeof event.preventDefault === 'function') event.preventDefault()
      if (event && typeof event.stopPropagation === 'function') event.stopPropagation()
    } catch (e) {
      /* noop */
    }
    props.controller.toggle()
  }
  return h(
    'button',
    {
      type: 'button',
      className: 'lmui-rail-toggle' + (rail.open ? ' lmui-rail-toggle--on' : ''),
      'data-lmui-rail-toggle': '',
      'aria-expanded': rail.open,
      'aria-label': '观测栏',
      title: '观测栏',
      onClick,
    },
    h('span', { className: 'lmui-rail-toggle__icon', 'aria-hidden': 'true' }, h(IconEye, null)),
    wide ? h('span', { className: 'lmui-rail-toggle__label' }, UI_COPY.railTitle) : null,
  )
}

/**
 * 注册观测栏（footer 按钮 + overlay 面板 + 停靠控制器）。
 * @param {object} ctx Cordis 客户端上下文
 * @param {object} store 配置 store
 * @param {Function} keep 收集 disposer
 */
export function registerRail(ctx, store, keep) {
  if (!ctx || !ctx.slots) return
  const slots = ctx.slots
  const remember = typeof keep === 'function' ? keep : () => {}
  const controller = createRailController(store)
  remember(() => controller.dispose())

  const put = (slotName, options, Component, extraProps) => {
    if (typeof slots.inject !== 'function' || typeof slots.register !== 'function') return
    const Bound = (props) => h(Component, Object.assign({}, props, extraProps || {}))
    Bound.displayName = 'LMUI(' + (Component.name || 'Rail') + ')'
    try {
      const off = slots.inject(slotName, () => slots.register(options, Bound))
      if (typeof off === 'function') remember(off)
    } catch (e) {
      /* 某槽未声明时不影响其它槽 */
    }
  }

  put(
    'sidebar.footer.action',
    { name: 'sidebar.footer.action', id: 'light-mirror-observation', order: 30 },
    RailToggle,
    { store, controller },
  )
  put(
    'shell.overlay',
    { name: 'shell.overlay', id: 'light-mirror-rail', order: 40 },
    RailPanel,
    { store, controller },
  )
}

export { createRailController, splitTracks, paimonSources }
