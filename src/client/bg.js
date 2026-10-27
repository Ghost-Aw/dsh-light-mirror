/**
 * 光之镜 · 天空岛 — 全屏固定背景控制器 v5b
 * ----------------------------------------------------------------------------
 * 深色模式：纯净深色底板 `bg-dark-pure.webp`（2048×1152）+ **程序绘制**：
 *   1) 竖直光带：长度 14–45vh 随机、同屏 6–12 条；从屏幕下半部/屏幕外下方渐显
 *      生成，上浮，生命周期 3–5s 整体 fade in/out（不做上下渐变遮罩）；左右边缘
 *      横向模糊 + 红蓝 RGB 分离（每根随机弱/强，偏移 ±0.5–3px，三次偏移叠加）；
 *      宽度/亮度按图4 实测（宽 7–19px@1080、rel_amp 0.37–1.32、左暖右冷）；
 *   2) 星点带（点状竖向虚线）：长 42 点 / 短 22 点（点距 ≈6.6px@1080），同屏
 *      3–5 条；同样下半部渐显生成 → 上浮 → 3–5s 整体渐隐；
 *   3) 稀疏散落星点：56 个（1–5px），缓慢上浮 + 闪烁 + 顶部渐隐。
 * 全部画在单个 <canvas>（1 个 DOM 节点），pointer-events:none；bgMotion / 系统
 * reduced-motion 时只静态绘制一帧；浅色模式保持 bg-light 且不画这些动效。
 */

import { MEDIA } from '../shared/content.js'
import { resolveMedia } from './media.js'

const LAYER_CLASS = 'lmui-bg'

/* 图4 实测（1920×1080）光柱：宽度/亮度/冷暖，用于随机取值分布 */
const MEASURED_COLUMNS = [
  { width: 7, amp: 0.74, warm: true },
  { width: 8, amp: 0.38, warm: true },
  { width: 7, amp: 0.3, warm: false },
  { width: 7, amp: 0.62, warm: false },
  { width: 8, amp: 0.72, warm: false },
  { width: 14, amp: 1.0, warm: false },
]

/* 图4 dataflow 实测的竖向点带 x（宽 1–5px，点距中位 ≈6.6px） */
const DOT_BAND_X = [246, 477, 1378, 1563, 1720, 1773]
const DOT_SPACING_1080 = 6.6
const DOT_LONG = 42
const DOT_SHORT = 22
const LIGHT_MIN_S = 3
const LIGHT_MAX_S = 5
const LIGHT_COUNT_MIN = 6
const LIGHT_COUNT_MAX = 12
const DOT_COUNT_MIN = 3
const DOT_COUNT_MAX = 5
const SPARSE_STAR_COUNT = 56

function clamp(value, fallback) {
  const n = Number(value)
  if (!Number.isFinite(n)) return fallback
  return Math.max(0, Math.min(1, n))
}

function rand(min, max) {
  return min + Math.random() * (max - min)
}

function pick(list) {
  return list[Math.floor(Math.random() * list.length)]
}

function preload(url) {
  return new Promise((resolve) => {
    if (!url) {
      resolve(false)
      return
    }
    try {
      const img = new Image()
      img.onload = () => resolve(true)
      img.onerror = () => resolve(false)
      img.decoding = 'async'
      img.src = url
    } catch (e) {
      resolve(false)
    }
  })
}

/** 深色纯背景路径从 MEDIA.photo.bgDark 同目录派生（等 content.js 加 key 后可换）。 */
function pureDarkUrl() {
  const base = resolveMedia(MEDIA.photo.bgDark)
  if (!base) return ''
  return base.replace(/bg-dark\.webp$/i, 'bg-dark-pure.webp')
}

/** 浅色干净版背景从 bgLight 同目录派生；缺失时回退旧 bg-light。 */
function cleanLightUrl() {
  const base = resolveMedia(MEDIA.photo.bgLight)
  if (!base) return ''
  return base.replace(/bg-light\.webp$/i, 'bg-light-clean.webp')
}

function createLayer() {
  const el = document.createElement('div')
  el.className = LAYER_CLASS
  el.setAttribute('data-lmui-bg-layer', '')
  el.setAttribute('aria-hidden', 'true')
  el.innerHTML =
    '<div class="lmui-bg__photo"></div>' +
    '<div class="lmui-bg__veil"></div>' +
    '<canvas class="lmui-bg__canvas" aria-hidden="true"></canvas>'
  return el
}

/* ── 程序绘制：单 canvas（光带 + 星点带 + 稀疏星点）──────────────────── */

function createFx(layer) {
  const canvas = layer ? layer.querySelector('.lmui-bg__canvas') : null
  if (!canvas || typeof canvas.getContext !== 'function') {
    return { setMode() {}, stop() {}, debug: () => null }
  }
  const ctx = canvas.getContext('2d')
  if (!ctx) return { setMode() {}, stop() {}, debug: () => null }

  let vw = 0
  let vh = 0
  let dpr = 1
  let running = false
  let raf = 0
  let last = 0
  let elapsed = 0

  const lights = []
  const dotBands = []
  const stars = []

  function pxPer1080(value) {
    return (value * vh) / 1080
  }

  function warmColor(alpha, warm) {
    if (warm) return 'rgba(255, 236, 214, ' + alpha.toFixed(3) + ')'
    return 'rgba(206, 224, 246, ' + alpha.toFixed(3) + ')'
  }

  function smooth(x) {
    const t = Math.max(0, Math.min(1, x))
    return t * t * (3 - 2 * t)
  }

  /* 生命周期整体透明度：淡入 0.6–0.95s，淡出 1.0–1.5s，中间保持；不是上下渐变 */
  function lifeAlpha(p) {
    if (p.age <= 0 || p.age >= p.life) return 0
    const inT = smooth(p.age / p.fadeIn)
    const outT = smooth((p.life - p.age) / p.fadeOut)
    return Math.min(inT, outT)
  }

  /* ── 竖直光带：14–45vh，同屏 6–12，下半部渐显→上浮→整体渐隐 ───────── */
  function spawnLight(initial) {
    const ref = pick(MEASURED_COLUMNS)
    const life = rand(LIGHT_MIN_S, LIGHT_MAX_S)
    const fadeIn = rand(0.6, 0.95)
    const fadeOut = rand(1.0, 1.5)
    const lengthVh = rand(0.14, 0.45)
    const length = vh * lengthVh
    /* x 离屏幕左右边缘留 3%，避免顶边；左暖右冷，宽度/亮度按图4 分布 */
    const x = vw * rand(0.03, 0.97)
    const width = Math.max(1.5, pxPer1080(ref.width * rand(0.85, 1.35)))
    const amp = Math.max(0.3, Math.min(1.32, ref.amp * rand(0.75, 1.25)))
    const chromaStrong = Math.random() < 0.5
    const chroma = chromaStrong ? rand(1.8, 3) : rand(0.5, 1.2)
    const chromaSign = Math.random() < 0.5 ? -1 : 1
    const blurMul = rand(2.0, 3.5)
    /* 生成位置：屏幕下半部 ~ 屏幕外下方 */
    const spawnY = vh * rand(0.55, 1.15)
    const maxRise = Math.max(0, spawnY - length / 2 - vh * 0.08)
    const speed = (maxRise / life) * rand(0.65, 1.0)
    return {
      type: 'light',
      x,
      y: spawnY,
      spawnY,
      length,
      width,
      amp,
      warm: x / vw < 0.38,
      chroma,
      chromaSign,
      blurMul,
      life,
      age: initial ? rand(0.15, 0.65) * life : 0,
      fadeIn,
      fadeOut,
      speed,
    }
  }

  /* ── 星点带：42 点长 / 22 点短，同屏 3–5 条，同样生命周期 ─────────── */
  function spawnDotBand(initial) {
    const count = Math.random() < 0.5 ? DOT_LONG : DOT_SHORT
    const life = rand(LIGHT_MIN_S, LIGHT_MAX_S)
    const spacing = Math.max(4, Math.min(9, pxPer1080(DOT_SPACING_1080)))
    const length = count * spacing
    const x = (pick(DOT_BAND_X) / 1920) * vw + rand(-6, 6)
    const width = Math.max(1, pxPer1080(rand(1, 2.5)))
    const amp = rand(0.26, 0.58)
    const spawnY = vh * rand(0.55, 1.15)
    const maxRise = Math.max(0, spawnY - length / 2 - vh * 0.06)
    const speed = (maxRise / life) * rand(0.6, 1.0)
    return {
      type: 'dots',
      x,
      y: spawnY,
      count,
      spacing,
      length,
      width,
      amp,
      life,
      age: initial ? rand(0.15, 0.65) * life : 0,
      fadeIn: rand(0.6, 0.95),
      fadeOut: rand(1.0, 1.5),
      speed,
    }
  }

  function spawnStar() {
    const r = Math.random()
    stars.push({
      x: Math.random() * vw,
      y: Math.random() * vh,
      size: r < 0.7 ? rand(1, 2.8) : rand(2.8, 5),
      speed: rand(2, 8),
      twinkle: rand(0.7, 2.5),
      phase: Math.random() * Math.PI * 2,
      warm: Math.random() < 0.3,
    })
  }

  function refill(initial) {
    while (lights.length < Math.round(rand(LIGHT_COUNT_MIN, LIGHT_COUNT_MAX))) lights.push(spawnLight(initial))
    while (dotBands.length < Math.round(rand(DOT_COUNT_MIN, DOT_COUNT_MAX))) dotBands.push(spawnDotBand(initial))
    while (stars.length < SPARSE_STAR_COUNT) spawnStar()
  }

  function resize() {
    vw = window.innerWidth || 1600
    vh = window.innerHeight || 1000
    dpr = Math.min(2, window.devicePixelRatio || 1)
    canvas.width = Math.max(1, Math.round(vw * dpr))
    canvas.height = Math.max(1, Math.round(vh * dpr))
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    lights.length = 0
    dotBands.length = 0
    stars.length = 0
    refill(true)
  }

  /* 横向模糊 + RGB 分离：红/蓝通道横向偏移两次叠加，中心窄芯保留光柱清晰度。
     光带本体不做上下渐变，整条只随生命周期整体淡入淡出。 */
  function paintBand(p, alpha) {
    const warm = p.warm
    const y0 = p.y - p.length / 2
    const core = p.width
    const soft = p.width * p.blurMul
    const passes = [
      { dx: -p.chroma * p.chromaSign, w: soft * 1.05, color: 'rgba(255, 74, 74, ' + (alpha * 0.42).toFixed(3) + ')' },
      { dx: p.chroma * p.chromaSign, w: soft * 1.05, color: 'rgba(86, 128, 255, ' + (alpha * 0.42).toFixed(3) + ')' },
    ]
    for (let i = 0; i < passes.length; i += 1) {
      const pass = passes[i]
      const x0 = p.x + pass.dx
      const g = ctx.createLinearGradient(x0 - pass.w / 2, 0, x0 + pass.w / 2, 0)
      g.addColorStop(0, 'rgba(0,0,0,0)')
      g.addColorStop(0.32, pass.color)
      g.addColorStop(0.5, pass.color)
      g.addColorStop(0.68, pass.color)
      g.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = g
      ctx.fillRect(x0 - pass.w / 2, y0, pass.w, p.length)
    }
    const g2 = ctx.createLinearGradient(p.x - soft / 2, 0, p.x + soft / 2, 0)
    g2.addColorStop(0, 'rgba(0,0,0,0)')
    g2.addColorStop(0.3, warmColor(alpha * 0.32, warm))
    g2.addColorStop(0.5, warmColor(alpha, warm))
    g2.addColorStop(0.7, warmColor(alpha * 0.32, warm))
    g2.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = g2
    ctx.fillRect(p.x - soft / 2, y0, soft, p.length)
    ctx.fillStyle = warmColor(alpha * 0.85, warm)
    ctx.fillRect(p.x - core / 2, y0, core, p.length)
  }

  function draw(animate) {
    ctx.clearRect(0, 0, vw, vh)
    ctx.globalCompositeOperation = 'lighter'
    const fadeH = vh * 0.16

    for (let i = 0; i < lights.length; i += 1) {
      const p = lights[i]
      const env = lifeAlpha(p)
      if (env <= 0) continue
      paintBand(p, p.amp * 0.34 * env)
    }

    for (let i = 0; i < dotBands.length; i += 1) {
      const p = dotBands[i]
      const env = lifeAlpha(p)
      if (env <= 0) continue
      const alpha = p.amp * env * 0.9
      const size = Math.max(1, p.width)
      const top = p.y - p.length / 2
      for (let d = 0; d < p.count; d += 1) {
        const yy = top + d * p.spacing
        if (yy < -size || yy > vh + size) continue
        ctx.fillStyle = warmColor(alpha, false)
        ctx.fillRect(p.x - size / 2, yy, size, size)
      }
    }

    /* 稀疏散落星点：缓慢上浮 + 闪烁 + 顶部渐隐 */
    for (let i = 0; i < stars.length; i += 1) {
      const s = stars[i]
      if (animate) {
        s.y -= s.speed / 60
        if (s.y < -4) {
          s.y = vh + Math.random() * 40
          s.x = Math.random() * vw
        }
      }
      const fade = s.y < fadeH ? Math.max(0, s.y / fadeH) : 1
      if (fade <= 0) continue
      const tw = animate ? 0.55 + 0.4 * Math.sin(elapsed * s.twinkle + s.phase) : 0.7
      const alpha = Math.max(0.06, Math.min(0.95, tw)) * fade * 0.8
      ctx.fillStyle = warmColor(alpha, s.warm)
      ctx.beginPath()
      ctx.arc(s.x, s.y, s.size / 2, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.globalCompositeOperation = 'source-over'
  }

  function update(dt) {
    for (let i = lights.length - 1; i >= 0; i -= 1) {
      lights[i].age += dt
      lights[i].y -= lights[i].speed * dt
      if (lights[i].age >= lights[i].life) lights.splice(i, 1)
    }
    for (let i = dotBands.length - 1; i >= 0; i -= 1) {
      dotBands[i].age += dt
      dotBands[i].y -= dotBands[i].speed * dt
      if (dotBands[i].age >= dotBands[i].life) dotBands.splice(i, 1)
    }
    /* 维持同屏数量：光带 6–12，点带 3–5 */
    while (lights.length < LIGHT_COUNT_MIN) lights.push(spawnLight(false))
    while (lights.length > LIGHT_COUNT_MAX) lights.pop()
    while (dotBands.length < DOT_COUNT_MIN) dotBands.push(spawnDotBand(false))
    while (dotBands.length > DOT_COUNT_MAX) dotBands.pop()
  }

  function frame(now) {
    if (!running) return
    if (!last) last = now
    const dt = Math.min(50, now - last) / 1000
    last = now
    elapsed += dt
    update(dt)
    draw(true)
    raf = window.requestAnimationFrame(frame)
  }

  function start() {
    if (running) return
    running = true
    last = 0
    if (!vw) resize()
    raf = window.requestAnimationFrame(frame)
  }

  function stop() {
    running = false
    if (raf) window.cancelAnimationFrame(raf)
    raf = 0
    last = 0
  }

  function setMode(active, motion) {
    resize()
    if (!active) {
      stop()
      ctx.clearRect(0, 0, vw, vh)
      return
    }
    if (motion) start()
    else {
      stop()
      elapsed = 0
      draw(false)
    }
  }

  const onResize = () => {
    resize()
    if (!running) draw(false)
  }
  window.addEventListener('resize', onResize, { passive: true })
  resize()
  setMode(false, false)

  return {
    setMode,
    stop() {
      stop()
      window.removeEventListener('resize', onResize)
    },
    debug() {
      const lightLengths = lights.map((p) => Number((p.length / vh).toFixed(3)))
      const dotCounts = dotBands.map((p) => p.count)
      const chromas = lights.map((p) => Number(p.chroma.toFixed(2)))
      const blurMuls = lights.map((p) => Number(p.blurMul.toFixed(2)))
      return {
        canvas: true,
        running,
        width: vw,
        height: vh,
        dpr,
        bands: lights.length,
        staticBands: 0,
        flowingBands: lights.length,
        dotBands: dotBands.length,
        dots: dotCounts,
        stars: stars.length,
        dotSpacing: Math.max(4, Math.min(9, pxPer1080(DOT_SPACING_1080))),
        lightLengthVh: {
          min: lightLengths.length ? Math.min.apply(null, lightLengths) : null,
          max: lightLengths.length ? Math.max.apply(null, lightLengths) : null,
        },
        lightLife: [LIGHT_MIN_S, LIGHT_MAX_S],
        dotLife: [LIGHT_MIN_S, LIGHT_MAX_S],
        dotCountRange: [DOT_SHORT, DOT_LONG],
        lightCountRange: [LIGHT_COUNT_MIN, LIGHT_COUNT_MAX],
        chromaOffset: chromas,
        chromaRange: [0.5, 3],
        blurMul: blurMuls,
        blurRange: [2, 3.5],
      }
    },
  }
}

/* ── 控制器 ───────────────────────────────────────────────────────────── */

export function createBackgroundController(store) {
  let disposed = false
  let storeOff = null
  let schemeObserver = null
  let layer = null
  let fx = null
  const root = () => document.documentElement

  function ensureLayer() {
    if (layer && layer.parentNode) return layer
    if (!document.body) return null
    layer = createLayer()
    document.body.appendChild(layer)
    fx = createFx(layer)
    return layer
  }

  function debugStatus() {
    let frame = null
    let phase = null
    let bodyBg = null
    let frameBg = null
    let sidebarColumnBg = null
    let sidebarInner = null
    let sidebarToken = null
    let railSurfaceBg = null
    try {
      const overlay = document.querySelector('[data-shell-overlay]')
      frame = overlay ? overlay.parentElement : null
      phase = document.querySelector('[data-phase]')
      bodyBg = getComputedStyle(document.body).backgroundColor
      frameBg = frame ? getComputedStyle(frame).backgroundColor : null
      sidebarToken = getComputedStyle(document.body).getPropertyValue('--dsw-specific-sidebar-fill').trim()
      if (frame && frame.children.length > 0) {
        const col = frame.children[0]
        sidebarColumnBg = { cls: String(col.className || ''), bg: getComputedStyle(col).backgroundColor }
        const queue = Array.from(col.children || [])
        let steps = 0
        while (queue.length > 0 && steps < 80) {
          steps += 1
          const el = queue.shift()
          if (!el) continue
          const bg = getComputedStyle(el).backgroundColor
          if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
            sidebarInner = { cls: String(el.className || ''), bg }
            break
          }
          Array.prototype.push.apply(queue, Array.from(el.children || []))
        }
      }
      const railSurface = document.querySelector('.lmui-rail__surface')
      railSurfaceBg = railSurface ? getComputedStyle(railSurface).backgroundColor : null
    } catch (e) {
      /* noop */
    }
    const layerEl = layer
    return {
      bg: root().getAttribute('data-lmui-bg'),
      motion: root().getAttribute('data-lmui-bg-motion'),
      debug: root().getAttribute('data-lmui-bg-debug'),
      layerAttached: !!(layerEl && layerEl.parentNode),
      layerRect: layerEl ? layerEl.getBoundingClientRect().toJSON() : null,
      frameFound: !!frame,
      frameClass: frame ? frame.className : null,
      frameBg,
      sidebarColumnBg,
      sidebarInner,
      sidebarToken,
      railSurfaceBg,
      phaseFound: !!phase,
      phaseBg: phase ? getComputedStyle(phase).backgroundColor : null,
      bodyBg,
      rootZ: (() => {
        try {
          return getComputedStyle(document.getElementById('root') || document.body).zIndex
        } catch (e) {
          return null
        }
      })(),
      photo: (() => {
        const photo = layerEl ? layerEl.querySelector('.lmui-bg__photo') : null
        return photo ? getComputedStyle(photo).backgroundImage : null
      })(),
      fx: fx ? fx.debug() : null,
    }
  }

  function apply() {
    if (disposed) return
    let cfg = {}
    try {
      cfg = (store && store.get()) || {}
    } catch (e) {
      cfg = {}
    }
    const active = cfg.enabled === true && cfg.bgEnabled === true
    const motion = active && cfg.bgMotion === true
    const darkScheme = root().getAttribute('data-lmui-scheme') !== 'light'
    const effects = active && darkScheme
    let reduced = false
    try {
      reduced =
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
    } catch (e) {
      reduced = false
    }
    const fxMotion = motion && !reduced
    const opacity = clamp(cfg.bgOpacity, 0.55)
    try {
      const el = root()
      if (!el) return
      if (active) ensureLayer()
      el.setAttribute('data-lmui-bg', active ? 'on' : 'off')
      el.setAttribute('data-lmui-bg-motion', motion ? 'on' : 'off')
      el.setAttribute('data-lmui-bg-debug', active ? (layer && layer.parentNode ? 'on+layer' : 'on') : 'off')
      el.style.setProperty('--lmui-bg-opacity', String(opacity))
      el.style.setProperty('--lmui-bg-veil', (0.9 - 0.5 * opacity).toFixed(3))
      if (fx) fx.setMode(effects, fxMotion)
      try {
        window.__LIGHT_MIRROR_BG_DEBUG__ = debugStatus
      } catch (e) {
        /* noop */
      }
    } catch (e) {
      /* noop */
    }
  }

  function loadFirst(urls, property) {
    const list = (urls || []).map((url) => resolveMedia(url)).filter(Boolean)
    const attempt = (index) => {
      if (disposed || index >= list.length) return
      const url = list[index]
      preload(url).then((ok) => {
        if (disposed) return
        if (ok) {
          try {
            root().style.setProperty(property, 'url("' + url + '")')
          } catch (e) {
            /* noop */
          }
        } else {
          attempt(index + 1)
        }
      })
    }
    attempt(0)
  }

  function loadImages() {
    loadFirst([cleanLightUrl(), MEDIA.photo.bgLight, MEDIA.photo.sceneWide, MEDIA.photo.sceneTerminal], '--lmui-bg-light')
    loadFirst([pureDarkUrl(), MEDIA.photo.bgDark, MEDIA.photo.sceneWide], '--lmui-bg-dark')
  }

  apply()
  loadImages()
  if (store && typeof store.subscribe === 'function') {
    storeOff = store.subscribe(apply)
  }
  try {
    if (typeof window.MutationObserver === 'function') {
      schemeObserver = new window.MutationObserver(apply)
      schemeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-lmui-scheme'],
      })
    }
  } catch (e) {
    schemeObserver = null
  }

  return {
    sync: apply,
    dispose() {
      disposed = true
      if (typeof storeOff === 'function') {
        try {
          storeOff()
        } catch (e) {
          /* noop */
        }
        storeOff = null
      }
      if (fx) {
        try {
          fx.stop()
        } catch (e) {
          /* noop */
        }
        fx = null
      }
      if (schemeObserver) {
        try {
          schemeObserver.disconnect()
        } catch (e) {
          /* noop */
        }
        schemeObserver = null
      }
      try {
        if (typeof window !== 'undefined') delete window.__LIGHT_MIRROR_BG_DEBUG__
      } catch (e) {
        /* noop */
      }
      try {
        if (layer && layer.parentNode) layer.parentNode.removeChild(layer)
      } catch (e) {
        /* noop */
      }
      layer = null
      try {
        const el = root()
        if (!el) return
        el.removeAttribute('data-lmui-bg')
        el.removeAttribute('data-lmui-bg-motion')
        el.removeAttribute('data-lmui-bg-debug')
        el.style.removeProperty('--lmui-bg-opacity')
        el.style.removeProperty('--lmui-bg-veil')
        el.style.removeProperty('--lmui-bg-dark')
        el.style.removeProperty('--lmui-bg-light')
      } catch (e) {
        /* noop */
      }
    },
  }
}
