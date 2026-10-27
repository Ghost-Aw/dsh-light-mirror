/**
 * 光之镜 · 天空岛 — shell.overlay 装饰层 v3
 * ----------------------------------------------------------------------------
 * 全部 pointer-events:none、纯 CSS 动画、随总开关装卸：
 *   Frame       窗口四角极淡五光白细框
 *   StarDust    8~12 颗低密度五光白星尘（只在上/下边缘）
 *   StatusLine  右下角极简两行状态字（可关）
 *
 * v3 变更：派蒙立绘从右下角移入右侧观测栏（改为全息描边风，见 rail.js），
 * 这里不再渲染原图立绘；状态字仍保留，停靠观测栏打开时由 CSS 让位给第三列。
 */

import * as ReactNS from 'react'
import { useMirrorConfig } from './brand.js'

const React =
  ReactNS && typeof ReactNS.createElement === 'function'
    ? ReactNS
    : ReactNS && ReactNS.default && typeof ReactNS.default.createElement === 'function'
      ? ReactNS.default
      : ReactNS
const h = React.createElement

/* ── 1. 四角细框 ──────────────────────────────────────────────────────── */

const CORNERS = ['tl', 'tr', 'bl', 'br']

function CornerFrame() {
  return h(
    'div',
    { className: 'lmui-frame', 'data-lmui-decor': 'frame', 'aria-hidden': 'true' },
    CORNERS.map((corner) =>
      h(
        'span',
        { key: corner, className: 'lmui-frame__corner lmui-frame__corner--' + corner },
        h('span', { className: 'lmui-frame__h' }),
        h('span', { className: 'lmui-frame__v' }),
        h('span', { className: 'lmui-frame__glint' }),
      ),
    ),
  )
}

/* ── 2. 五光白星尘 ────────────────────────────────────────────────────── */
/* 固定坐标表（截图可复现）；颜色只用低饱和白/淡紫/淡粉/淡青。 */
const STARDUST = [
  { left: '9%', top: '5.2%', size: 2.2, delay: 0.0, dur: 8.4, tone: 'white' },
  { left: '19.5%', top: '9.4%', size: 1.4, delay: 2.6, dur: 10.2, tone: 'lavender' },
  { left: '31%', top: '4.4%', size: 1.8, delay: 4.1, dur: 9.1, tone: 'white' },
  { left: '46%', top: '8.6%', size: 1.2, delay: 1.4, dur: 11.4, tone: 'cyan' },
  { left: '62%', top: '4.8%', size: 2.0, delay: 3.3, dur: 8.8, tone: 'white' },
  { left: '78%', top: '8.2%', size: 1.3, delay: 5.7, dur: 10.6, tone: 'pink' },
  { left: '90%', top: '5.8%', size: 1.7, delay: 2.2, dur: 9.6, tone: 'white' },
  { left: '14%', top: '93.4%', size: 1.5, delay: 1.1, dur: 9.9, tone: 'lavender' },
  { left: '36%', top: '95.2%', size: 2.1, delay: 4.8, dur: 8.2, tone: 'white' },
  { left: '58%', top: '92.6%', size: 1.2, delay: 0.7, dur: 11.8, tone: 'cyan' },
  { left: '81%', top: '94.6%', size: 1.8, delay: 3.9, dur: 9.3, tone: 'white' },
]

function StarDust() {
  return h(
    'div',
    { className: 'lmui-dust', 'data-lmui-decor': 'stardust', 'aria-hidden': 'true' },
    STARDUST.map((dot, index) =>
      h('span', {
        key: 'dust' + index,
        className: 'lmui-dust__dot lmui-dust__dot--' + dot.tone,
        style: {
          left: dot.left,
          top: dot.top,
          width: dot.size + 'px',
          height: dot.size + 'px',
          animationDelay: dot.delay + 's',
          animationDuration: dot.dur + 's',
        },
      }),
    ),
  )
}

/* ── 3. 右下角状态字 ──────────────────────────────────────────────────── */

function StatusLine() {
  return h(
    'div',
    { className: 'lmui-statusline', 'data-lmui-decor': 'status-line' },
    h('div', { className: 'lmui-statusline__title' }, '光之镜'),
    h(
      'div',
      { className: 'lmui-statusline__meta' },
      h('span', { className: 'lmui-statusline__host' }, 'SKY ISLAND'),
      h('span', { className: 'lmui-statusline__dot', 'aria-hidden': 'true' }),
      h('span', { className: 'lmui-statusline__state' }, 'ONLINE'),
    ),
  )
}

/* ── 入口 ─────────────────────────────────────────────────────────────── */

function DecorLayer(props) {
  const cfg = useMirrorConfig(props && props.store)
  if (!cfg || cfg.enabled !== true) return null
  return h(
    'div',
    { className: 'lmui-decor', 'data-lmui-decor-layer': '', 'aria-hidden': 'true' },
    cfg.frame ? h(CornerFrame) : null,
    cfg.stardust ? h(StarDust) : null,
    cfg.statusLine ? h(StatusLine) : null,
  )
}

function bindStore(store, Component) {
  const Bound = (props) => h(Component, Object.assign({}, props, { store }))
  Bound.displayName = 'LMUI(Decor)'
  return Bound
}

/**
 * 注册 shell.overlay 装饰入口。
 * @param {object} ctx Cordis 客户端上下文
 * @param {object} store 配置 store
 * @param {Function} keep 收集 disposer
 */
export function registerDecor(ctx, store, keep) {
  if (!ctx || !ctx.slots) return
  const slots = ctx.slots
  const remember = typeof keep === 'function' ? keep : () => {}
  if (typeof slots.inject !== 'function' || typeof slots.register !== 'function') return
  try {
    const off = slots.inject('shell.overlay', () =>
      slots.register(
        { name: 'shell.overlay', id: 'light-mirror-decor', order: 20 },
        bindStore(store, DecorLayer),
      ),
    )
    if (typeof off === 'function') remember(off)
  } catch (e) {
    /* shell.overlay 缺失时静默降级 */
  }
}

export { STARDUST }
