/* 中白十字星 · 粒子版本
 *
 * 用大量细密发光粒子填充原来「中白星」的轮廓，作为启动动画倒计时「1」的接棒层。
 * 粒子围绕各自初始位置做周期振荡：波纹式相位差 + 亮度/尺寸呼吸 + 少量粒子缓慢流动。
 * 不引入随机喷射或剧烈抖动，保持几何轮廓稳定。
 */
import { hyperStarPath } from './star.js'

const VB_W = 400
const VB_H = 720

export function createParticleStar(canvas, options) {
  if (!canvas || !canvas.getContext) return null
  const opts = options || {}
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  const targetCount = Math.max(600, Math.min(9000, opts.count || 4600))
  const shapes = new Path2D(hyperStarPath(146, 136, 62))
  const probe = document.createElement('canvas')
  probe.width = VB_W
  probe.height = VB_H
  const pctx = probe.getContext('2d')

  let particles = []
  let width = 0
  let height = 0
  let dpr = 1
  let raf = 0
  let active = false
  let startedAt = 0
  let running = false
  let reduced = false

  function buildParticles() {
    const raw = []
    let guard = 0
    while (raw.length < targetCount && guard < targetCount * 80) {
      guard += 1
      const x = 138 + Math.random() * 124
      const y = 214 + Math.random() * 282
      if (!pctx.isPointInPath(shapes, x, y)) continue
      const dx = x - 200
      const dy = y - 360
      const r = Math.hypot(dx, dy) / 180
      const angle = Math.atan2(dy, dx)
      raw.push({
        x,
        y,
        r,
        angle,
        phase: angle * 1.35 + r * 3.1 + Math.random() * 0.6,
        phase2: angle * 0.9 + r * 2.2 + Math.random() * 1.2,
        amp: 0.9 + Math.random() * 1.3,
        speed: 0.65 + Math.random() * 0.5,
        flow: Math.random() < 0.045,
        flowDir: Math.random() < 0.5 ? -1 : 1,
        seed: Math.random() * 6.283,
        startX: 200 + (Math.random() * 2 - 1) * 38,
        startY: 360 + (Math.random() * 2 - 1) * 74,
      })
    }
    particles = raw
  }

  function layout() {
    const rect = canvas.getBoundingClientRect()
    const nextW = Math.max(1, Math.round(rect.width || canvas.clientWidth || 1))
    const nextH = Math.max(1, Math.round(rect.height || canvas.clientHeight || 1))
    dpr = Math.min(2, window.devicePixelRatio || 1)
    if (nextW === width && nextH === height) return
    width = nextW
    height = nextH
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    if (!particles.length) buildParticles()
  }

  function starTransform() {
    const scale = Math.min(width / VB_W, height / VB_H)
    return {
      scale,
      ox: (width - VB_W * scale) / 2,
      oy: (height - VB_H * scale) / 2,
    }
  }

  function drawParticle(x, y, size, alpha) {
    ctx.globalAlpha = alpha
    ctx.fillRect(x - size / 2, y - size / 2, size, size)
  }

  function drawStatic() {
    layout()
    ctx.clearRect(0, 0, width, height)
    const tr = starTransform()
    ctx.save()
    ctx.translate(tr.ox, tr.oy)
    ctx.scale(tr.scale, tr.scale)
    ctx.fillStyle = '#f6f7fc'
    ctx.globalCompositeOperation = 'lighter'
    for (let i = 0; i < particles.length; i += 1) {
      const p = particles[i]
      ctx.globalAlpha = 0.72
      ctx.fillRect(p.x - 0.45, p.y - 0.45, 0.9, 0.9)
    }
    ctx.restore()
    ctx.globalAlpha = 1
  }

  function render(now) {
    if (!running) return
    layout()
    const t = Math.max(0, (now - startedAt) / 1000)
    const assemble = active ? Math.min(1, Math.max(0, (t - 0.04) / 0.95)) : 0
    const assembleEase = assemble * assemble * (3 - 2 * assemble)
    const tr = starTransform()

    ctx.clearRect(0, 0, width, height)
    ctx.save()
    ctx.translate(tr.ox, tr.oy)
    ctx.scale(tr.scale, tr.scale)
    ctx.globalCompositeOperation = 'lighter'

    const clock = t
    for (let i = 0; i < particles.length; i += 1) {
      const p = particles[i]
      const baseX = p.x
      const baseY = p.y

      /* 波纹式扰动：相位由半径+角度决定，波在结构内缓慢传播 */
      const wave = Math.sin(clock * 1.55 * p.speed + p.phase) + Math.sin(clock * 0.48 + p.seed) * 0.35
      const wave2 = Math.cos(clock * 1.18 * p.speed + p.phase2)
      let x = baseX + wave * p.amp
      let y = baseY + wave2 * p.amp * 0.72

      /* 少量粒子沿切向缓慢流动 */
      if (p.flow) {
        const drift = Math.sin(clock * 0.42 + p.seed) * 2.2 * p.flowDir
        x += Math.cos(p.angle) * (-drift)
        y += Math.sin(p.angle) * (-drift)
      }

      const breath = 0.5 + 0.5 * Math.sin(clock * 1.9 + p.phase2)
      const alpha = 0.36 + breath * 0.44
      const size = 0.72 + breath * 0.75

      ctx.globalAlpha = 0.08 * alpha
      ctx.fillRect(x - 1.35, y - 1.35, 2.7, 2.7)
      ctx.globalAlpha = alpha
      ctx.fillStyle = breath > 0.55 ? '#ffffff' : '#e8eeff'
      ctx.fillRect(x - size / 2, y - size / 2, size, size)
    }
    ctx.restore()
    ctx.globalAlpha = 1
    if (active) raf = window.requestAnimationFrame(render)
  }

  function start() {
    if (running) return
    running = true
    active = true
    startedAt = performance.now()
    layout()
    if (reduced) {
      drawStatic()
      return
    }
    raf = window.requestAnimationFrame(render)
  }

  function stop() {
    running = false
    active = false
    if (raf) window.cancelAnimationFrame(raf)
    raf = 0
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  function resize() {
    if (running) {
      layout()
      if (reduced) {
        drawStatic()
      } else if (!raf) {
        raf = window.requestAnimationFrame(render)
      }
    }
  }

  function setReduced(value) {
    reduced = !!value
    if (reduced && running) {
      if (raf) window.cancelAnimationFrame(raf)
      raf = 0
      drawStatic()
    }
  }

  return { start, stop, resize, setReduced, isRunning: function () { return running } }
}
