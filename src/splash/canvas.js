/**
 * 光之镜 · 天空岛 — 单幕粒子层（唯一 canvas，DPR 上限 2）
 * ---------------------------------------------------------------------------
 * 依据 anomaly-analyst task-7 实测（PV 158.0s 光雨 / 图9）：
 *   - 光雨竖线：芯 1–2px + 柔光，颜色随距光源「暖白 #C0A292 → 中性 #8C7776」，
 *     两端透明，极慢上浮（视觉位移主要来自相机推近）；
 *   - 火花/光尘：2–5px，**静止 + 闪烁**（0.8~1.6s 呼吸，不连续漂移）；
 *   - 全部画在一个 canvas 上（0 DOM 节点），reveal 时 stop()。
 * prefers-reduced-motion 时由调用方直接不启动。
 */

/* 光雨线颜色：暖白 → 中性（PV 158.0s 实测） */
const RAIN_COLORS = [
  [192, 162, 146],
  [192, 162, 146],
  [176, 148, 134],
  [160, 138, 128],
  [140, 119, 118],
]

/* 火花：白 / 淡金 / 淡粉（保留五光白） */
const SPARK_COLORS = [
  [237, 237, 239],
  [244, 242, 245],
  [237, 226, 187],
  [231, 189, 210],
]

/* 光尘：中性白 */
const DUST_COLORS = [
  [237, 237, 239],
  [200, 200, 214],
  [237, 226, 187],
]

function rand(min, max) {
  return min + Math.random() * (max - min)
}

function pick(list) {
  return list[Math.floor(Math.random() * list.length)]
}

export function createParticles(canvas, opts) {
  const options = opts || {}
  const ctx = canvas ? canvas.getContext('2d') : null
  const count = options.count || 120
  const items = []
  let raf = 0
  let running = false
  let width = 0
  let height = 0
  let dpr = 1
  let last = 0
  let elapsed = 0
  let density = 1

  function resize() {
    if (!canvas || !ctx) return
    const rect = canvas.getBoundingClientRect()
    width = Math.max(1, rect.width || window.innerWidth)
    height = Math.max(1, rect.height || window.innerHeight)
    dpr = Math.min(2, Math.max(1, window.devicePixelRatio || 1))
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  function seed() {
    items.length = 0
    for (let i = 0; i < count; i += 1) {
      const roll = Math.random()
      if (roll < 0.46) {
        /* 光雨竖线：芯 1–2px，两端透明，极慢上浮 */
        items.push({
          kind: 'rain',
          x: Math.random() * width,
          y: Math.random() * height,
          len: rand(40, 360),
          speed: rand(1.5, 7),
          drift: rand(-1.5, 1.5),
          alpha: rand(0.08, 0.26),
          width: Math.random() < 0.25 ? 1.6 : 1,
          color: pick(RAIN_COLORS),
          phase: Math.random() * Math.PI * 2,
        })
      } else if (roll < 0.8) {
        /* 白色/淡金火花：静止 + 0.8~1.6s 呼吸闪烁 */
        items.push({
          kind: 'spark',
          x: Math.random() * width,
          y: Math.random() * height,
          baseY: Math.random() * height,
          r: rand(1.2, 2.8),
          alpha: rand(0.25, 0.85),
          twinkle: rand((Math.PI * 2) / 1.6, (Math.PI * 2) / 0.8),
          color: pick(SPARK_COLORS),
          phase: Math.random() * Math.PI * 2,
        })
      } else {
        /* 光尘：极小、静止、极轻呼吸 */
        items.push({
          kind: 'dust',
          x: Math.random() * width,
          y: Math.random() * height,
          baseY: Math.random() * height,
          r: rand(0.5, 1.2),
          alpha: rand(0.1, 0.4),
          twinkle: rand((Math.PI * 2) / 2.4, (Math.PI * 2) / 1.4),
          color: pick(DUST_COLORS),
          phase: Math.random() * Math.PI * 2,
        })
      }
    }
  }

  function draw(time) {
    if (!ctx) return
    const dt = Math.min(64, time - last || 16) / 1000
    last = time
    elapsed += dt * 1000
    const t = elapsed / 1000
    ctx.clearRect(0, 0, width, height)
    for (let i = 0; i < items.length; i += 1) {
      const item = items[i]
      const c = item.color
      if (item.kind === 'rain') {
        item.y -= item.speed * dt
        item.x += item.drift * dt
        if (item.y + item.len < -30) {
          item.y = height + rand(0, 40)
          item.x = Math.random() * width
        }
        if (item.x < -20) item.x = width + 16
        if (item.x > width + 20) item.x = -16
        const alpha = item.alpha * density * (0.75 + 0.25 * Math.sin(t * 0.6 + item.phase))
        const grad = ctx.createLinearGradient(item.x, item.y, item.x, item.y + item.len)
        grad.addColorStop(0, 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',0)')
        grad.addColorStop(0.42, 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + alpha + ')')
        grad.addColorStop(0.58, 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + alpha * 0.9 + ')')
        grad.addColorStop(1, 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',0)')
        /* 柔光外圈（约 3–7px） */
        ctx.fillStyle = 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + alpha * 0.22 + ')'
        ctx.fillRect(item.x - 2, item.y, item.width + 4, item.len)
        /* 芯线 */
        ctx.fillStyle = grad
        ctx.fillRect(item.x, item.y, item.width, item.len)
      } else if (item.kind === 'spark') {
        /* 静止 + 呼吸闪烁（无连续漂移，只有 ±3px 极慢浮动） */
        const twinkle = 0.55 + 0.45 * Math.sin(t * item.twinkle + item.phase)
        const alpha = Math.min(1, item.alpha * density * twinkle)
        const y = item.baseY + Math.sin(t * 0.12 + item.phase) * 3
        ctx.fillStyle = 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + alpha + ')'
        ctx.beginPath()
        ctx.arc(item.x, y, item.r, 0, Math.PI * 2)
        ctx.fill()
        if (item.r > 2.1) {
          ctx.strokeStyle = 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + alpha * 0.35 + ')'
          ctx.lineWidth = 0.7
          ctx.beginPath()
          ctx.moveTo(item.x - item.r * 3, y)
          ctx.lineTo(item.x + item.r * 3, y)
          ctx.moveTo(item.x, y - item.r * 3)
          ctx.lineTo(item.x, y + item.r * 3)
          ctx.stroke()
        }
      } else {
        const alpha = Math.min(1, item.alpha * density * (0.65 + 0.35 * Math.sin(t * item.twinkle + item.phase)))
        const y = item.baseY + Math.sin(t * 0.08 + item.phase) * 2
        ctx.fillStyle = 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + alpha + ')'
        ctx.fillRect(item.x, y, item.r, item.r)
      }
    }
    if (running) raf = window.requestAnimationFrame(draw)
  }

  function start() {
    if (!canvas || !ctx) return
    if (running) return
    resize()
    if (!items.length) seed()
    running = true
    last = 0
    elapsed = 0
    density = 1
    raf = window.requestAnimationFrame(draw)
  }

  function setDensity(value) {
    density = Math.max(0, Math.min(2.2, Number(value) || 1))
  }

  function stop(hide) {
    running = false
    if (raf) window.cancelAnimationFrame(raf)
    raf = 0
    if (ctx) ctx.clearRect(0, 0, width, height)
    if (canvas && hide) canvas.style.opacity = '0'
  }

  /* 暂停但保留当前帧（真实时刻 hold / 调试冻结用） */
  function pause() {
    running = false
    if (raf) window.cancelAnimationFrame(raf)
    raf = 0
  }

  function dispose() {
    stop(false)
    window.removeEventListener('resize', resize)
  }

  window.addEventListener('resize', resize, { passive: true })
  resize()

  return { start: start, stop: stop, pause: pause, setDensity: setDensity, dispose: dispose, resize: resize }
}
