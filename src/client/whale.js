/**
 * 光之镜 · 思考指示器替换（v11）
 * ----------------------------------------------------------------------------
 * 资源侧 APNG：light-mirror/media/art/triquetra-{orbit,heartbeat,rotate}.png
 * 64×64 RGBA、白色 RGB + alpha、无限循环；另有 *-first.png 静态首帧。
 *
 * 说明：Chrome 对「APNG 作为 CSS mask」只取首帧（已本地实测），因此改用
 * <img> 播放 APNG + 主题色 filter 着色；静态 SVG（运行指示器原兜底）在资源
 * 未就绪时保持原样。
 *
 * 三种状态每 8s 轮换一次，模拟「不同情况不同动画」：
 *   orbit（思考中）→ heartbeat（等待）→ rotate（链接/初始化）→ …
 * reduced-motion 时只加载静态首帧，不轮换。
 */

import { resolveMedia } from './media.js'

const ART_PREFIX = '/light-mirror/media/art/'
const STATES = [
  { id: 'orbit', label: '思考中', animated: 'triquetra-orbit.png', still: 'triquetra-orbit-first.png' },
  { id: 'heartbeat', label: '等待', animated: 'triquetra-heartbeat.png', still: 'triquetra-heartbeat-first.png' },
  { id: 'rotate', label: '链接/初始化', animated: 'triquetra-rotate.png', still: 'triquetra-rotate-first.png' },
]
const CYCLE_MS = 8000
const ICON_SELECTOR = '[data-chat-running] [class*="_runningIcon"]'

function artUrl(file) {
  return resolveMedia(ART_PREFIX + file)
}

function reducedMotion() {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch (e) {
    return false
  }
}

export function createWhaleIndicator() {
  let disposed = false
  let ready = false
  let current = 0
  let timer = null
  let observer = null
  let mediaOff = null
  const availability = new Map()

  function availableStates() {
    return STATES.filter((state) => availability.get(state.id) === true)
  }

  function frameUrl(state) {
    return artUrl(reducedMotion() ? state.still : state.animated)
  }

  function applyState(index) {
    if (disposed) return
    const states = availableStates()
    if (states.length === 0) return
    current = ((index % states.length) + states.length) % states.length
    const state = states[current]
    try {
      document.documentElement.setAttribute('data-lmui-whale-state', state.id)
      const roots = document.querySelectorAll('[data-chat-running]')
      for (let i = 0; i < roots.length; i += 1) {
        roots[i].setAttribute('data-lmui-whale-state', state.id)
        const imgs = roots[i].querySelectorAll('.lmui-whale-img')
        for (let k = 0; k < imgs.length; k += 1) {
          const next = frameUrl(state)
          if (imgs[k].getAttribute('src') !== next) imgs[k].setAttribute('src', next)
        }
      }
    } catch (e) {
      /* noop */
    }
  }

  function ensureImages() {
    if (disposed || !ready) return
    const states = availableStates()
    if (states.length === 0) return
    const state = states[current % states.length]
    const icons = document.querySelectorAll(ICON_SELECTOR)
    for (let i = 0; i < icons.length; i += 1) {
      const icon = icons[i]
      if (icon.querySelector('.lmui-whale-img')) continue
      const img = document.createElement('img')
      img.className = 'lmui-whale-img'
      img.alt = ''
      img.draggable = false
      img.decoding = 'async'
      img.setAttribute('aria-hidden', 'true')
      img.setAttribute('src', frameUrl(state))
      icon.appendChild(img)
    }
    applyState(current)
  }

  function probe() {
    let pending = STATES.length
    let any = false
    STATES.forEach((state) => {
      const img = new Image()
      img.onload = () => {
        availability.set(state.id, true)
        any = true
        pending -= 1
        if (pending === 0) finish()
      }
      img.onerror = () => {
        availability.set(state.id, false)
        pending -= 1
        if (pending === 0) finish()
      }
      img.src = artUrl(state.animated)
    })
    const staticImg = new Image()
    staticImg.src = artUrl(STATES[0].still)

    function finish() {
      if (disposed || !any) return
      ready = true
      try {
        document.documentElement.setAttribute('data-lmui-whale-ready', '1')
      } catch (e) {
        /* noop */
      }
      ensureImages()
      if (!reducedMotion()) {
        timer = window.setInterval(() => {
          if (disposed) return
          if (!document.querySelector('[data-chat-running]')) return
          current = (current + 1) % availableStates().length
          applyState(current)
          ensureImages()
        }, CYCLE_MS)
      }
    }
  }

  try {
    observer = new MutationObserver(() => {
      if (!disposed) ensureImages()
    })
    observer.observe(document.body, { subtree: true, childList: true })
  } catch (e) {
    observer = null
  }

  try {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => applyState(current)
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
