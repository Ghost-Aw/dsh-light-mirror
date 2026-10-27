/**
 * 光之镜 · 天空岛 — splash v5 时间轴导演
 * ---------------------------------------------------------------------------
 * 0.0–3.0   深色光带场淡入（光带上浮/闪烁；语音① 1.4s），1.9s 全白十字星浮现
 * 3.0–5.6   深色自下而上填充十字星（clip 0→1）
 * 5.6–6.3   高频抖动（40–60ms 步进，±3–6% 大小/横向尺度）
 * 6.3–7.6   爆发：放射光/RGB 色散/星点/环/虹彩羽状弧 → 7.6 全屏白
 * 5.2       语音②「欢迎来到世界」（3.99s，9.19 播完 < 9.4 reveal）
 * 7.9–9.1   WebGL 四阶段 glitch 转场（旧=白屏，新=主界面深色背景；y'=y+A*N、RGB x 偏移、分组 α）
 * 9.4       揭开真实主界面（canvas 0.22s 淡出），10.2 释放
 *
 * 调试：?t= 冻结 → 逐步 apply；?hold= 真实播放到该时刻暂停；seekTo 供逐帧 QA。
 */

import { VOICE_LINES } from '../shared/content.js'

export const TIMELINE = {
  total: 10.2,
  voiceLinkAt: 1.4,
  starAt: 1.9,
  fillStart: 3.0,
  fillEnd: 5.6,
  shakeStart: 5.6,
  shakeEnd: 6.3,
  voiceWelcomeAt: 5.2,
  burstAt: 6.3,
  whiteFullAt: 7.6,
  transitionStart: 7.9,
  transitionEnd: 9.1,
  revealAt: 9.4,
  totalEnd: 10.2,
}

export const REDUCED_TIMELINE = {
  total: 4.2,
  starAt: 0.3,
  revealAt: 1.8,
  totalEnd: 4.2,
}

/* v6 爆发三阶段（时间轴总长/语音/转场不变） */
export const BURST_PHASES = {
  burst1At: 6.3,
  burst2At: 6.85,
  burst3At: 7.2,
  whiteFullAt: 7.6,
}

function burstPhaseAt(t) {
  if (t >= BURST_PHASES.burst3At) return 3
  if (t >= BURST_PHASES.burst2At) return 2
  if (t >= BURST_PHASES.burst1At) return 1
  return 0
}

function clamp01(v) {
  const n = Number(v)
  if (!Number.isFinite(n)) return 0
  return Math.min(1, Math.max(0, n))
}

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}

export function createDirector(opts) {
  const root = opts.root
  const ui = opts.ui
  const audio = opts.audio
  const transition = opts.transition
  const reduced = !!opts.reduced
  const debug = opts.debug || {}

  const timeline = reduced ? REDUCED_TIMELINE : TIMELINE
  const total = timeline.total

  let timers = []
  let intervals = []
  let raf = 0
  let finished = false
  let frozen = false
  let stageRunning = false

  function later(fn, seconds) {
    const id = window.setTimeout(function () {
      removeTimer(id)
      if (finished || frozen) return
      try {
        fn()
      } catch (error) {
        if (window.console && console.warn) console.warn('[light-mirror] splash step failed', error)
      }
    }, Math.max(0, seconds * 1000))
    timers.push(id)
    return id
  }

  function removeTimer(id) {
    const index = timers.indexOf(id)
    if (index >= 0) timers.splice(index, 1)
  }

  function clearAll() {
    timers.forEach(function (id) {
      window.clearTimeout(id)
    })
    timers = []
    intervals.forEach(function (id) {
      window.clearInterval(id)
    })
    intervals = []
    if (raf) window.cancelAnimationFrame(raf)
    raf = 0
  }

  function showSubtitle(key, hold) {
    const line = VOICE_LINES[key]
    ui.setSubtitle(line ? line.text : '')
    later(function () {
      ui.setSubtitle('')
    }, hold)
  }

  function markLive() {
    if (!root.classList.contains('lm-live-scene')) root.classList.add('lm-live-scene')
    root.dataset.playAt = root.dataset.playAt || String(Math.round(performance.now()))
  }

  function startFillAnimation() {
    const t0 = performance.now()
    const duration = (TIMELINE.fillEnd - TIMELINE.fillStart) * 1000
    const tick = function () {
      if (finished || frozen) return
      const p = clamp01((performance.now() - t0) / duration)
      ui.setFill(easeInOut(p))
      if (p < 1) raf = window.requestAnimationFrame(tick)
    }
    raf = window.requestAnimationFrame(tick)
  }

  function cleanupShake() {
    if (ui.starWrap) ui.starWrap.classList.remove('lm-shaking')
    if (ui.starFill) ui.starFill.classList.remove('lm-shaking')
  }

  function shakeLoop() {
    if (!ui.starWrap) return
    ui.starWrap.classList.add('lm-shaking')
    if (ui.starFill) ui.starFill.classList.add('lm-shaking')
    let steps = 0
    const totalSteps = Math.round(((TIMELINE.shakeEnd - TIMELINE.shakeStart) * 1000) / 50)
    const id = window.setInterval(function () {
      if (finished || frozen) return
      steps += 1
      const jitter = function () {
        return 1 + (Math.random() * 2 - 1) * 0.06
      }
      ui.setShake(jitter(), jitter())
      if (steps >= totalSteps) {
        window.clearInterval(id)
        const index = intervals.indexOf(id)
        if (index >= 0) intervals.splice(index, 1)
        ui.setShake(1, 1)
        cleanupShake()
      }
    }, 50)
    intervals.push(id)
  }

  function startTransition() {
    ui.setWhite(false)
    ui.setTransition(true)
    if (!transition) return
    if (!transition.supported) {
      root.classList.add('lm-fallback-transition')
      return
    }
    if (transition.resize) transition.resize()
    if (transition.setNewImage && ui.newScene) transition.setNewImage(ui.newScene)
    const t0 = performance.now()
    const duration = (TIMELINE.transitionEnd - TIMELINE.transitionStart) * 1000
    let ticks = 0
    const tick = function () {
      ticks += 1
      root.dataset.transTicks = String(ticks)
      root.dataset.transFlags = (frozen ? 'F' : '') + (finished ? 'X' : '') + '/' + timers.length
      if (finished || frozen) return
      const elapsed = performance.now() - t0
      const p = clamp01(elapsed / duration)
      root.dataset.transitionP = p.toFixed(3) + '/' + elapsed.toFixed(0) + 'ms'
      try {
        transition.render(p, elapsed / 1000)
      } catch (error) {
        root.dataset.transitionError = String((error && error.message) || error)
      }
      if (p < 1) raf = window.requestAnimationFrame(tick)
    }
    raf = window.requestAnimationFrame(tick)
  }

  function reveal() {
    if (opts.onRevealStart) {
      try {
        opts.onRevealStart()
      } catch (error) {
        /* 解锁失败交给最终释放 */
      }
    }
    root.classList.add('lm-revealing')
    if (transition && transition.supported && ui.webgl) {
      ui.webgl.classList.add('is-out')
    }
    if (ui.newScene) ui.newScene.style.opacity = '0'
  }

  function playNormal() {
    audio.sfx.hum()
    later(function () {
      audio.sfx.bloom()
    }, 0.8)

    later(function () {
      root.classList.add('lm-star-on')
      if (ui.starWrap) ui.starWrap.style.opacity = '1'
    }, TIMELINE.starAt)

    later(function () {
      showSubtitle('link', 2.6)
      audio.voice('link')
    }, TIMELINE.voiceLinkAt)

    later(function () {
      ui.setFill(0)
      startFillAnimation()
    }, TIMELINE.fillStart)

    later(function () {
      ui.setFill(1)
      shakeLoop()
    }, TIMELINE.shakeStart)

    later(function () {
      showSubtitle('welcome', 3.9)
      audio.voice('welcome')
    }, TIMELINE.voiceWelcomeAt)

    later(function () {
      ui.setBurstPhase(1)
      audio.sfx.overexpose()
    }, BURST_PHASES.burst1At)

    later(function () {
      ui.setBurstPhase(2)
    }, BURST_PHASES.burst2At)

    later(function () {
      ui.setBurstPhase(3)
    }, BURST_PHASES.burst3At)

    later(function () {
      ui.setWhite(true)
    }, TIMELINE.whiteFullAt)

    later(function () {
      root.dataset.stepTransition = '1'
      startTransition()
      audio.sfx.wipe()
    }, TIMELINE.transitionStart)

    later(function () {
      root.dataset.stepReveal = '1'
      reveal()
    }, TIMELINE.revealAt)

    later(function () {
      finish('done')
    }, TIMELINE.totalEnd)
  }

  function playReduced() {
    root.classList.add('lm-reduced')
    ui.setFill(1)
    if (ui.starWrap) ui.starWrap.style.opacity = '1'
    later(function () {
      showSubtitle('link', 1.4)
    }, 0.2)
    later(function () {
      ui.setWhite(true)
    }, 1.2)
    later(function () {
      reveal()
    }, REDUCED_TIMELINE.revealAt)
    later(function () {
      finish('done')
    }, REDUCED_TIMELINE.totalEnd)
  }

  function play() {
    if (stageRunning || finished) return
    stageRunning = true
    markLive()
    if (reduced) {
      playReduced()
      return
    }
    playNormal()
  }

  /* ── 调试 / 逐帧 QA ─────────────────────────────────────────────────── */

  function applyStateAt(t) {
    if (t >= TIMELINE.starAt) {
      root.classList.add('lm-star-on')
      if (ui.starWrap) ui.starWrap.style.opacity = '1'
    }
    if (t >= TIMELINE.fillStart && t < TIMELINE.shakeStart) {
      ui.setFill(easeInOut(clamp01((t - TIMELINE.fillStart) / (TIMELINE.fillEnd - TIMELINE.fillStart))))
    }
    if (t >= TIMELINE.shakeStart && t < TIMELINE.burstAt) {
      ui.setFill(1)
      const step = Math.floor((t - TIMELINE.shakeStart) / 0.05)
      const seed = Math.sin(step * 12.9898) * 43758.5453
      const j1 = 1 + ((seed - Math.floor(seed)) * 2 - 1) * 0.05
      ui.setShake(j1, 2 - j1)
      if (ui.starWrap) ui.starWrap.classList.add('lm-shaking')
    } else if (ui.starWrap) {
      ui.setShake(1, 1)
      ui.starWrap.classList.remove('lm-shaking')
    }
    ui.setBurstPhase(burstPhaseAt(t))
    if (t >= TIMELINE.whiteFullAt) ui.setWhite(true)
    if (t >= TIMELINE.transitionStart && transition && transition.supported) {
      ui.setTransition(true)
      const duration = TIMELINE.transitionEnd - TIMELINE.transitionStart
      const p = clamp01((t - TIMELINE.transitionStart) / duration)
      if (transition.resize) transition.resize()
      if (transition.setNewImage && ui.newScene) transition.setNewImage(ui.newScene)
      transition.render(p, p * duration)
    } else if (t >= TIMELINE.transitionStart && transition && !transition.supported) {
      ui.setTransition(true)
      root.classList.add('lm-fallback-transition')
    }
    if (t >= TIMELINE.revealAt) reveal()
  }

  function jumpDebug(seconds) {
    if (stageRunning || finished) return false
    stageRunning = true
    markLive()
    const t = Math.min(total, Math.max(0, Number(seconds) || 0))
    if (reduced) {
      root.classList.add('lm-reduced')
      if (t >= REDUCED_TIMELINE.revealAt) reveal()
      freezeAt(t)
      return true
    }
    applyStateAt(t)
    freezeAt(t)
    return true
  }

  function seekTo(seconds) {
    if (!stageRunning) return jumpDebug(seconds)
    if (!frozen) return false
    const t = Math.min(total, Math.max(0, Number(seconds) || 0))
    if (reduced) {
      if (t >= REDUCED_TIMELINE.revealAt) reveal()
      return true
    }
    applyStateAt(t)
    if (opts.onFreeze) {
      try {
        opts.onFreeze(t * 1000)
      } catch (error) {
        /* noop */
      }
    }
    return true
  }

  function freezeAt(t) {
    if (frozen || finished) return
    frozen = true
    root.dataset.freeze = '1'
    clearAll()
    root.classList.add('lm-frozen')
    try {
      void root.getBoundingClientRect()
      const animations = document.getAnimations ? document.getAnimations() : []
      animations.forEach(function (animation) {
        try {
          animation.pause()
          animation.currentTime = Math.max(0, t * 1000)
        } catch (error) {
          /* noop */
        }
      })
    } catch (error) {
      /* noop */
    }
    if (opts.onFreeze) {
      try {
        opts.onFreeze(t * 1000)
      } catch (error) {
        /* noop */
      }
    }
  }

  /** hold：真实播放到 seconds 后暂停（不 seek），供真实时刻截图 */
  function holdAt(seconds) {
    if (reduced) return
    later(function () {
      if (frozen || finished) return
      frozen = true
      clearAll()
      root.classList.add('lm-frozen')
      if (opts.onFreeze) opts.onFreeze(seconds * 1000)
    }, Math.max(0, seconds))
  }

  function finish(reason) {
    if (finished) return
    finished = true
    clearAll()
    if (transition) {
      try {
        transition.dispose()
      } catch (error) {
        /* noop */
      }
    }
    if (opts.onFinish) opts.onFinish(reason || 'done')
  }

  function dispose() {
    finished = true
    frozen = true
    clearAll()
    if (transition) {
      try {
        transition.dispose()
      } catch (error) {
        /* noop */
      }
    }
  }

  return {
    play: play,
    jumpDebug: jumpDebug,
    seekTo: seekTo,
    holdAt: holdAt,
    finish: finish,
    dispose: dispose,
    total: total,
    reduced: reduced,
    timeline: timeline,
    isFinished: function () {
      return finished
    },
    isFrozen: function () {
      return frozen
    },
  }
}
