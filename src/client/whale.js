/**
 * 光之镜 · 思考指示器替换（v11）
 * ----------------------------------------------------------------------------
 * 资源侧 APNG：light-mirror/media/art/triquetra-{orbit,heartbeat,rotate}.png
 * 64×64 RGBA、白色 RGB + alpha、无限循环；另有 *-first.png 静态首帧。
 *
 * Chrome 对「APNG 作为 CSS mask」只取首帧（已实测），因此用 <img> 播放 APNG +
 * 主题色 filter；静态 SVG 兜底在资源未就绪时保持原样。
 *
 * 状态映射（不按固定 8s 轮换，绑定可观测 DOM 信号）：
 *   - rotate    ：[data-chat-running] 首次挂载后的前 2s（连接/刚进入运行）
 *   - heartbeat ：可见的审批/提问/计划确认面板（[data-approval-key] /
 *                 [data-question-key] / [data-plan-review-key]）出现时（停滞等待）
 *   - orbit     ：其余正常思考/运行（默认）
 * 每 400ms 重新判定一次；无等待信号时回 orbit。reduced-motion 固定 orbit 静态首帧。
 */

import { resolveMedia } from './media.js'

const ART_PREFIX = '/light-mirror/media/art/'
const STATES = {
  orbit: { animated: 'triquetra-orbit.png', still: 'triquetra-orbit-first.png' },
  heartbeat: { animated: 'triquetra-heartbeat.png', still: 'triquetra-heartbeat-first.png' },
  rotate: { animated: 'triquetra-rotate.png', still: 'triquetra-rotate-first.png' },
}
const INITIAL_ROTATE_MS = 2000
const POLL_MS = 400
const WAIT_SELECTORS = ['[data-approval-key]', '[data-question-key]', '[data-plan-review-key]']

function reducedMotion() {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch (e) {
    return false
  }
}

function isVisible(el) {
  try {
    const rect = el.getBoundingClientRect()
    if (rect.width <= 0 || rect.height <= 0) return false
    const cs = window.getComputedStyle(el)
    return cs.display !== 'none' && cs.visibility !== 'hidden' && Number(cs.opacity) !== 0
  } catch (e) {
    return false
  }
}

function hasWaitingSurface() {
  for (let i = 0; i < WAIT_SELECTORS.length; i += 1) {
    const nodes = document.querySelectorAll(WAIT_SELECTORS[i])
    for (let k = 0; k < nodes.length; k += 1) {
      if (isVisible(nodes[k])) return true
    }
  }
  return false
}

function artUrl(file) {
  return resolveMedia(ART_PREFIX + file)
}

export function createWhaleIndicator() {
  let disposed = false
  let ready = false
  let timer = null
  let observer = null
  let mediaOff = null
  const availability = new Set()
  const mountTimes = new WeakMap()
  const currentState = new WeakMap()

  function resolveState(root) {
    if (reducedMotion()) return 'orbit'
    if (hasWaitingSurface()) return 'heartbeat'
    const mountedAt = mountTimes.get(root)
    if (mountedAt === undefined || Date.now() - mountedAt < INITIAL_ROTATE_MS) return 'rotate'
    return 'orbit'
  }

  function stateUrl(state) {
    const entry = STATES[state] || STATES.orbit
    return artUrl(reducedMotion() ? entry.still : entry.animated)
  }

  function ensureImage(icon) {
    if (!ready || !icon) return null
    let img = icon.querySelector('.lmui-whale-img')
    if (!img) {
      img = document.createElement('img')
      img.className = 'lmui-whale-img'
      img.alt = ''
      img.draggable = false
      img.decoding = 'async'
      img.setAttribute('aria-hidden', 'true')
      icon.appendChild(img)
    }
    return img
  }

  function paintRoot(root, state) {
    if (!root || !root.isConnected) return
    root.setAttribute('data-lmui-whale-state', state)
    try {
      document.documentElement.setAttribute('data-lmui-whale-state', state)
    } catch (e) {
      /* noop */
    }
    currentState.set(root, state)
    const icons = root.querySelectorAll('[class*="_runningIcon"]')
    for (let i = 0; i < icons.length; i += 1) {
      const img = ensureImage(icons[i])
      if (img && img.getAttribute('src') !== stateUrl(state)) img.setAttribute('src', stateUrl(state))
    }
  }

  function noteMounts() {
    const roots = document.querySelectorAll('[data-chat-running]')
    for (let i = 0; i < roots.length; i += 1) {
      if (!mountTimes.has(roots[i])) mountTimes.set(roots[i], Date.now())
    }
  }

  function tick() {
    if (disposed || !ready) return
    const roots = document.querySelectorAll('[data-chat-running]')
    for (let i = 0; i < roots.length; i += 1) {
      const root = roots[i]
      if (!mountTimes.has(root)) mountTimes.set(root, Date.now())
      const state = resolveState(root)
      if (currentState.get(root) !== state) paintRoot(root, state)
      else if (!root.querySelector('.lmui-whale-img')) paintRoot(root, state)
    }
  }

  function probe() {
    const ids = Object.keys(STATES)
    let pending = ids.length
    let any = false
    ids.forEach((id) => {
      const img = new Image()
      img.onload = () => {
        availability.add(id)
        any = true
        pending -= 1
        if (pending === 0) finish()
      }
      img.onerror = () => {
        pending -= 1
        if (pending === 0) finish()
      }
      img.src = artUrl(STATES[id].animated)
    })

    function finish() {
      if (disposed || !any) return
      ready = true
      try {
        document.documentElement.setAttribute('data-lmui-whale-ready', '1')
      } catch (e) {
        /* noop */
      }
      tick()
      timer = window.setInterval(tick, POLL_MS)
    }
  }

  try {
    observer = new MutationObserver(() => {
      if (disposed) return
      noteMounts()
      if (ready) tick()
    })
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['data-approval-key', 'data-question-key', 'data-plan-review-key'],
    })
  } catch (e) {
    observer = null
  }
  noteMounts()

  try {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => {
      if (!disposed && ready) tick()
    }
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', onChange)
      mediaOff = () => mq.removeEventListener('change', onChange)
    }
  } catch (e) {
    mediaOff = null
  }

  probe()

  return {
    dispose() {
      disposed = true
      if (timer !== null) {
        try {
          window.clearInterval(timer)
        } catch (e) {
          /* noop */
        }
        timer = null
      }
      if (observer) {
        try {
          observer.disconnect()
        } catch (e) {
          /* noop */
        }
        observer = null
      }
      if (typeof mediaOff === 'function') {
        try {
          mediaOff()
        } catch (e) {
          /* noop */
        }
        mediaOff = null
      }
      try {
        document.querySelectorAll('.lmui-whale-img').forEach((img) => {
          if (img.parentNode) img.parentNode.removeChild(img)
        })
        document.querySelectorAll('[data-chat-running]').forEach((el) => el.removeAttribute('data-lmui-whale-state'))
        document.documentElement.removeAttribute('data-lmui-whale-ready')
        document.documentElement.removeAttribute('data-lmui-whale-state')
      } catch (e) {
        /* noop */
      }
    },
  }
}
