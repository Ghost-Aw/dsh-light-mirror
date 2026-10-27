/**
 * 光之镜 · 天空岛 — C 幕「PV 192s 竖向解离」渲染器（v3.2）
 * ---------------------------------------------------------------------------
 * 核心 0.6s（映射 10.4–11.0s）竖向解离；覆盖/白条数/亮度按 task-13 实测表：
 *   覆盖 99 → 76 → 43 → 18 → ~2%（10.40/10.55/10.70/10.85/11.00 自查基准，
 *   对应 PV 192.55–193.10 的 99.7→1.8% 区间）；
 *   白条数 3→15→27→42→54→55–62→…→5（每帧变化，中位宽随覆盖/条数自然落到
 *   619→82→46→20→9.5→10→7→8→5→4px，2–146px 随机分布）；
 *   亮度 L 255→121（α 1→0.45）；每条竖向 offset ±(0–40→0–120px)、smear 0→36px、
 *   scaleY 1→1.03–1.08；左侧相位提前 ~1–2 帧；边缘 1–3px 青/品红。
 * 白条下面 = 已就绪的主界面深色场景（overlay 透明，缝隙直接露出 DOM），
 * 10.4 起缝隙里就是深色 UI；11.0 后白条基本消失，仅剩主界面。
 * 无额外白闪、无扫描带、无横向整屏推拉。
 * 帧序列（resource E 已撤）当前不加载；若后续提供 frames.json 自动切换。
 */

const CORE = 0.8 /* 程序化兜底核心占比 */
const TOTAL_MS = 1000 /* 真实序列 30 帧 @30fps = 1.0s */

/* 覆盖（核心进度 0–1，PV 同进度实测表） */
const COVERAGE_STOPS = [
  [0.0, 0.997],
  [0.083, 0.975],
  [0.167, 0.915],
  [0.25, 0.825],
  [0.333, 0.659],
  [0.417, 0.523],
  [0.5, 0.374],
  [0.583, 0.256],
  [0.667, 0.162],
  [0.75, 0.081],
  [0.833, 0.043],
  [0.917, 0.025],
  [1.0, 0.018],
]

/* 白条数量（PV 实测：3→15→27→42→54→55–62→…→5） */
const COUNT_STOPS = [
  [0.0, 3],
  [0.08, 15],
  [0.17, 27],
  [0.25, 42],
  [0.33, 54],
  [0.42, 55],
  [0.5, 59],
  [0.58, 47],
  [0.67, 50],
  [0.75, 25],
  [0.83, 15],
  [1.0, 5],
]

/* 白条亮度（直接作为 canvas alpha；暗底合成后 L≈255/255/211/146/121） */
const ALPHA_STOPS = [
  [0.0, 1.0],
  [0.25, 1.0],
  [0.5, 0.82],
  [0.75, 0.5],
  [1.0, 0.39],
]

function clamp01(v) {
  return Math.min(1, Math.max(0, v))
}

function rand(seed) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

function interp(stops, p) {
  const q = clamp01(p)
  for (let i = 1; i < stops.length; i += 1) {
    if (q <= stops[i][0]) {
      const a = stops[i - 1]
      const b = stops[i]
      const t = (q - a[0]) / Math.max(1e-6, b[0] - a[0])
      return a[1] + (b[1] - a[1]) * t
    }
  }
  return stops[stops.length - 1][1]
}

export function createDissolve(canvas, opts) {
  const options = opts || {}
  const ctx = canvas ? canvas.getContext('2d') : null
  const framesBase = options.framesBase || ''
  let W = 1
  let H = 1
  let dpr = 1
  let inited = false
  let frames = null
  let raf = 0
  let running = false
  let paused = false
  let startedAt = 0
  let progress = 0
  let disposed = false
  /* 真实 30 帧序列（media/seq/second192）：优先播放，缺失/失败回退程序化 */
  let seq = null /* {images,count,fps,start} */
  let seqReady = false
  let seqLoading = false
  let usingSeq = false

  function resize() {
    if (!canvas || !ctx) return
    const rect = canvas.getBoundingClientRect()
    W = Math.max(1, rect.width || window.innerWidth)
    H = Math.max(1, rect.height || window.innerHeight)
    dpr = Math.min(2, Math.max(1, window.devicePixelRatio || 1))
    canvas.width = Math.round(W * dpr)
    canvas.height = Math.round(H * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    inited = true
    drawAt(progress)
  }

  /* 真实序列加载：media/seq/second192/{1600|1280}/f-0001.webp + frames.json
   * 先 preload 前 N 帧再开始（避免卡顿），其余帧后台继续加载。 */
  function preload() {
    if (seqReady || seqLoading || disposed) return
    const base = (options.framesBase || '').replace(/\/$/, '')
    const dev = options.devSeq
    if (!base && !dev) return
    seqLoading = true
    const viewW = window.innerWidth || 1600
    const version = viewW > 1280 ? '1600' : '1280'

    function finish(list, meta) {
      if (!list || !list.length) {
        seqLoading = false
        return
      }
      const images = list.map(function (name) {
        const img = new Image()
        img.decoding = 'async'
        const verKey = encodeURIComponent(String((meta && meta.start) || 192.3))
        const url = /^https?:|^\.{1,2}\/|^\//.test(name) ? name + '?v=' + verKey : base + '/' + version + '/' + name + '?v=' + verKey
        img.src = url
        return img
      })
      let loaded = 0
      const markReady = function () {
        if (seqReady) return
        seq = {
          images: images,
          count: images.length,
          fps: (meta && meta.fps) || 30,
          start: (meta && meta.start) || 192.0,
          loaded: loaded,
        }
        seqReady = true
        usingSeq = true
        seqLoading = false
        if (!running && !paused) drawAt(progress)
      }
      const firstN = Math.min(12, images.length)
      images.forEach(function (img, index) {
        img.addEventListener('load', function () {
          loaded += 1
          if (seq) seq.loaded = loaded
          if (!seqReady && loaded >= firstN) markReady()
          if (seqReady && loaded === images.length) seq.loaded = loaded
        })
        img.addEventListener('error', function () {
          loaded += 1
          if (!seqReady && loaded >= firstN) markReady()
        })
        void index
      })
    }

    if (dev && Array.isArray(dev.frames) && dev.frames.length) {
      finish(dev.frames, dev)
      return
    }

    function probeConvention() {
      const names = []
      for (let i = 1; i <= ((options.frameCount || 30)); i += 1) names.push('f-' + ('000' + i).slice(-4) + '.webp')
      const probe = new Image()
      probe.onload = function () {
        finish(names, { fps: (options.fps || 30), start: 192.3 })
      }
      probe.onerror = function () {
        /* 兼容旧扁平目录 */
        const flat = new Image()
        flat.onload = function () {
          finish(names, { fps: (options.fps || 30), start: 192.3 })
        }
        flat.onerror = function () {
          seqLoading = false
          /* 无帧序列：保持程序化兜底 */
        }
        flat.src = base + '/' + names[0] + '?v=192.3'
      }
      probe.src = base + '/' + version + '/' + names[0] + '?v=192.3'
    }

    if (window.location.protocol === 'file:' || !window.fetch) {
      probeConvention()
      return
    }
    fetch(base + '/frames.json', { cache: 'no-store' })
      .then(function (res) {
        return res.ok ? res.json() : null
      })
      .then(function (json) {
        if (!json) {
          probeConvention()
          return
        }
        const verInfo = json.versions && json.versions[version]
        const metaList = verInfo && Array.isArray(verInfo.frames_meta) ? verInfo.frames_meta : null
        const raw = Array.isArray(json.frames) ? json.frames : null
        const list = metaList
          ? metaList.map(function (item) {
              return typeof item === 'string' ? item : item && (item.file || item.name || item.src)
            }).filter(Boolean)
          : raw
          ? raw.map(function (item) {
              return typeof item === 'string' ? item : item && (item.file || item.name || item.src)
            }).filter(Boolean)
          : null
        if (!list || !list.length) {
          probeConvention()
          return
        }
        finish(list, json)
      })
      .catch(probeConvention)
  }

  function frameImage(p) {
    if (!usingSeq || !seq || !seq.images.length) return null
    const count = seq.images.length
    const index = Math.min(count - 1, Math.max(0, Math.floor(clamp01(p) * count)))
    /* 若当前帧还没加载好，回退到最近一张已加载帧，避免闪烁 */
    for (let i = index; i >= 0; i -= 1) {
      const img = seq.images[i]
      if (img && img.complete && img.naturalWidth) return img
    }
    return null
  }

  function drawCover(img) {
    const sw = img.naturalWidth || img.width
    const sh = img.naturalHeight || img.height
    if (!sw || !sh) return false
    const scale = Math.max(W / sw, H / sh)
    const dw = sw * scale
    const dh = sh * scale
    ctx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh)
    return true
  }

  /* 核心：每帧重新采样白条数与宽度，总和严格等于 coverage*W */
  function drawCore(coreP) {
    const coverage = interp(COVERAGE_STOPS, coreP)
    const widthScale = Math.min(1, W / 1200)
    const count = Math.max(3, Math.min(62, Math.round(interp(COUNT_STOPS, coreP) * widthScale)))
    /* 亮度直接作为 alpha：起始纯白，后段灰白残影（暗底合成 L≈255/255/211/146/121） */
    const alpha = Math.min(1, interp(ALPHA_STOPS, coreP))
    const totalWhite = coverage * W
    const smear = 36 * clamp01(coreP * 1.35)
    const drift = 40 * clamp01(coreP * 2.4) + (coreP > 0.4 ? ((coreP - 0.4) / 0.6) * 80 : 0)
    const seedBase = Math.floor(coreP * 48) * 13.7

    /* PV 宽度分布：90% 窄条（0.3–2.5×，中位 ≈0.85×）、10% 宽条（4–8×）；
     * 归一后中位宽 ≈ 0.55×平均宽 → p.25/0.5/0.75/1.0 ≈ 17/6/3.5/3.5px@1600 */
    const factors = []
    let sum = 0
    const blend = 0.1 + 0.9 * Math.pow(coreP, 0.65)
    for (let i = 0; i < count; i += 1) {
      const r = rand(seedBase + i * 1.71 + 0.3)
      let f
      if (r < 0.1) f = 4 + rand(seedBase + i * 2.3) * 4
      else {
        const u = rand(seedBase + i * 3.1)
        f = 0.3 + u * u * 2.2
      }
      f = 1 + (f - 1) * blend
      factors.push(f)
      sum += f
    }
    const scale = sum > 0 ? totalWhite / sum : 1
    const slot = W / count
    /* 先算宽度，再按「实际并集」归一（宽条重叠不会把覆盖率算多） */
    const widths = []
    for (let i = 0; i < count; i += 1) {
      widths.push(Math.min(slot * 4.5, Math.max(0.5, factors[i] * scale)))
    }
    const intervals = widths
      .map(function (w, i) {
        const c = (i + 0.5) * slot
        return [c - w / 2, c + w / 2]
      })
      .sort(function (a, b) {
        return a[0] - b[0]
      })
    let union = 0
    let cursor = -Infinity
    for (let k = 0; k < intervals.length; k += 1) {
      const a = intervals[k]
      const start = Math.max(a[0], cursor)
      if (a[1] > start) union += a[1] - start
      cursor = Math.max(cursor, a[1])
    }
    const widthFix = union > 1 ? totalWhite / union : 1
    for (let i = 0; i < count; i += 1) {
      const width = Math.min(slot * 6, Math.max(0.4, widths[i] * widthFix))
      const center = (i + 0.5) * slot
      const lead = (1 - i / count) * 0.07 + rand(seedBase + i * 8.3) * 0.04 /* 左早右晚 */
      const q = clamp01(coreP + lead)
      const dir = rand(seedBase + i * 7.3 + 2.2) > 0.45 ? 1 : -1
      const offK = 0.35 + rand(seedBase + i * 5.9 + 1.7) * 0.95
      const scaleY = 1 + (0.03 + rand(seedBase + i * 13.1) * 0.05) * q
      const offset = dir * drift * offK * (0.4 + 0.6 * q)
      const bh = H * scaleY
      const y0 = H * 0.5 - bh / 2 + offset
      const x = center - width / 2
      if (alpha <= 0.01) continue
      /* 整条全高、单一 alpha（亮度由 alpha 直接决定，避免多层叠加把灰白洗回亮白） */
      ctx.globalAlpha = alpha
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(x, y0, width, bh)
      /* 竖向拖影：主条上下各 1 条低α ghost（仅制造 motion blur 观感） */
      if (smear > 2 && width > 0.8) {
        ctx.globalAlpha = alpha * 0.16
        ctx.fillRect(x, y0 - Math.min(smear, 36) * 0.5, width, bh)
        ctx.fillRect(x, y0 + Math.min(smear, 36) * 0.5, width, bh)
      }
      ctx.globalAlpha = alpha
      if (width > 1.6) {
        ctx.fillStyle = 'rgba(120,200,255,0.34)'
        ctx.fillRect(x - 1 - rand(seedBase + i) * 2, y0, 1 + rand(seedBase + i) * 2, bh)
        ctx.fillStyle = 'rgba(255,140,220,0.3)'
        ctx.fillRect(x + width, y0, 1 + rand(seedBase + i * 1.9) * 2, bh)
      }
    }
    ctx.globalAlpha = 1
  }

  function drawResidual(tailP) {
    const fade = 1 - clamp01(tailP)
    if (fade <= 0) return
    const picks = [4, 13, 22, 33, 41, 50]
    for (let k = 0; k < picks.length; k += 1) {
      const x = (picks[k] + 0.5) * (W / 58) - 2
      const y = -20 * clamp01(tailP)
      ctx.globalAlpha = fade * 0.9
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(x, y, 4, H)
      ctx.globalAlpha = fade * 0.4
      ctx.fillStyle = 'rgba(120,200,255,0.4)'
      ctx.fillRect(x - 2, y, 2, H)
      ctx.fillStyle = 'rgba(255,140,220,0.34)'
      ctx.fillRect(x + 5, y, 2, H)
    }
    ctx.globalAlpha = 1
  }

  function drawAt(p) {
    if (!ctx) return
    if (!inited) resize()
    progress = clamp01(p)
    ctx.clearRect(0, 0, W, H)

    const frame = frameImage(progress)
    if (frame && drawCover(frame)) return
    if (progress >= 1) return
    if (progress < CORE) {
      drawCore(progress / CORE)
    } else {
      drawResidual((progress - CORE) / (1 - CORE))
    }
  }

  function tick(now) {
    if (!running || paused) return
    if (!startedAt) startedAt = now
    const p = clamp01((now - startedAt) / TOTAL_MS)
    drawAt(p)
    if (p >= 1) {
      running = false
      return
    }
    raf = window.requestAnimationFrame(tick)
  }

  function start() {
    if (!canvas || !ctx || disposed) return
    resize()
    preload()
    running = true
    paused = false
    startedAt = 0
    progress = 0
    raf = window.requestAnimationFrame(tick)
  }

  function pause() {
    paused = true
    if (raf) window.cancelAnimationFrame(raf)
    raf = 0
  }

  function stop() {
    running = false
    paused = false
    if (raf) window.cancelAnimationFrame(raf)
    raf = 0
    if (ctx) ctx.clearRect(0, 0, W, H)
  }

  function dispose() {
    disposed = true
    stop()
    frames = null
    seq = null
    seqReady = false
    usingSeq = false
  }

  window.addEventListener('resize', function () {
    if (!running && !paused) return
    resize()
  })

  return {
    start: start,
    preload: preload,
    pause: pause,
    stop: stop,
    drawAt: drawAt,
    dispose: dispose,
    isSequence: function () {
      return usingSeq
    },
    sequenceInfo: function () {
      return seq ? { count: seq.count, loaded: seq.loaded || 0, fps: seq.fps, start: seq.start } : null
    },
    get progress() {
      return progress
    },
  }
}
