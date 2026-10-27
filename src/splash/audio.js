/**
 * 光之镜 · 天空岛 — splash 声音（v2 单幕）
 * ---------------------------------------------------------------------------
 *  1) 语音：media/voice/line-01-link.mp3（2.2s）、line-02-welcome.mp3（6.0s），
 *     素材缺失 → Web Speech TTS；TTS 不可用就静默。
 *  2) 音效：WebAudio 现场合成（黑场低鸣 / 金光呼吸 / 光雨微响 / 过曝光晕 /
 *     镜面 wipe），不依赖任何音频文件，音量受 sfx / sfxVolume 控制。
 * 自动播放限制：AudioContext 未获得交互时 suspended，所有合成音效直接跳过；
 * 首次 pointerdown/keydown 尝试 resume。任何音频异常都不影响动画。
 */

import { VOICE_LINES } from '../shared/content.js'
import { clampNumber, resolveMedia } from './util.js'

function safe(fn) {
  try {
    fn()
  } catch (error) {
    /* 音频问题一律吞掉 */
  }
}

export function createAudio(cfg) {
  const sfxOn = cfg.sfx !== false
  const voiceOn = cfg.voice !== false
  const sfxVolume = clampNumber(cfg.sfxVolume, 0, 1, 0.5)
  const voiceVolume = clampNumber(cfg.voiceVolume, 0, 1, 0.85)

  const state = {
    ctx: null,
    master: null,
    noise: null,
    disposed: false,
    voiceCache: {},
    spoken: {},
  }

  function ctx() {
    if (state.disposed) return null
    if (state.ctx) return state.ctx
    const Ctor = window.AudioContext || window.webkitAudioContext
    if (!Ctor) return null
    try {
      state.ctx = new Ctor()
      const master = state.ctx.createGain()
      master.gain.value = sfxVolume * 0.72
      master.connect(state.ctx.destination)
      state.master = master
      const length = Math.floor(state.ctx.sampleRate * 1.4)
      const buffer = state.ctx.createBuffer(1, length, state.ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < length; i += 1) data[i] = Math.random() * 2 - 1
      state.noise = buffer
    } catch (error) {
      state.ctx = null
    }
    return state.ctx
  }

  function running() {
    return !!(state.ctx && state.ctx.state === 'running' && state.master)
  }

  function resume() {
    safe(function () {
      const ac = ctx()
      if (ac && ac.state === 'suspended') ac.resume().catch(function () {})
    })
  }

  function now() {
    const ac = state.ctx
    return ac ? ac.currentTime + 0.012 : 0
  }

  function tone(freq, options) {
    if (!sfxOn || !running()) return
    const o = options || {}
    const ac = state.ctx
    const t0 = now() + (o.delay || 0)
    const dur = o.dur || 0.5
    const osc = ac.createOscillator()
    const gain = ac.createGain()
    osc.type = o.type || 'sine'
    osc.frequency.setValueAtTime(freq, t0)
    if (o.slideTo) osc.frequency.exponentialRampToValueAtTime(Math.max(20, o.slideTo), t0 + dur)
    if (o.detune) osc.detune.value = o.detune
    const peak = Math.max(0.0001, (o.gain == null ? 0.1 : o.gain) * sfxVolume)
    gain.gain.setValueAtTime(0.0001, t0)
    gain.gain.exponentialRampToValueAtTime(peak, t0 + (o.attack || 0.02))
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
    osc.connect(gain)
    gain.connect(state.master)
    osc.start(t0)
    osc.stop(t0 + dur + 0.05)
  }

  function noise(options) {
    if (!sfxOn || !running() || !state.noise) return
    const o = options || {}
    const ac = state.ctx
    const t0 = now() + (o.delay || 0)
    const dur = o.dur || 0.4
    const src = ac.createBufferSource()
    src.buffer = state.noise
    const filter = ac.createBiquadFilter()
    filter.type = o.filter || 'bandpass'
    filter.frequency.setValueAtTime(o.freq || 900, t0)
    if (o.freqTo) filter.frequency.exponentialRampToValueAtTime(Math.max(40, o.freqTo), t0 + dur)
    filter.Q.value = o.q == null ? 1 : o.q
    const gain = ac.createGain()
    const peak = Math.max(0.0001, (o.gain == null ? 0.08 : o.gain) * sfxVolume)
    gain.gain.setValueAtTime(0.0001, t0)
    gain.gain.exponentialRampToValueAtTime(peak, t0 + (o.attack || 0.04))
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
    src.connect(filter)
    filter.connect(gain)
    gain.connect(state.master)
    src.start(t0)
    src.stop(t0 + dur + 0.05)
  }

  const sfx = {
    /** 黑场低鸣（0.0s） */
    hum: function () {
      tone(46, { type: 'sine', dur: 1.6, gain: 0.13, slideTo: 62, attack: 0.35 })
      tone(92, { type: 'sine', dur: 1.2, gain: 0.04, attack: 0.4 })
      noise({ dur: 1.4, gain: 0.03, filter: 'lowpass', freq: 200, freqTo: 480, q: 0.6 })
    },
    /** 终端帧淡入 / 中央金光出现（1.2s） */
    bloom: function () {
      tone(392, { type: 'sine', dur: 2.4, gain: 0.05, attack: 0.3 })
      tone(587.33, { type: 'sine', dur: 2.6, gain: 0.03, attack: 0.4, delay: 0.08 })
      tone(880, { type: 'sine', dur: 2.2, gain: 0.018, attack: 0.5, delay: 0.16 })
      noise({ dur: 2.2, gain: 0.02, filter: 'highpass', freq: 2600, q: 0.5 })
    },
    /** 光雨升起 / 金光增强（4.5s） */
    lift: function () {
      noise({ dur: 0.9, gain: 0.04, filter: 'bandpass', freq: 520, freqTo: 2800, q: 0.8 })
      tone(659.25, { type: 'sine', dur: 1.4, gain: 0.03, attack: 0.2 })
    },
    /** 链接状态行（8.6s） */
    status: function (index) {
      const base = 740 + (index || 0) * 110
      tone(base, { type: 'triangle', dur: 0.18, gain: 0.035, attack: 0.006 })
      tone(base * 1.5, { type: 'sine', dur: 0.3, gain: 0.016, attack: 0.01, delay: 0.02 })
    },
    /** 五光白过曝（10.4s） */
    overexpose: function () {
      noise({ dur: 1.2, gain: 0.11, filter: 'bandpass', freq: 700, freqTo: 5200, q: 0.6, attack: 0.06 })
      tone(523.25, { type: 'sine', dur: 1.5, gain: 0.06, attack: 0.05 })
      tone(783.99, { type: 'sine', dur: 1.6, gain: 0.04, attack: 0.08, delay: 0.06 })
      tone(1046.5, { type: 'sine', dur: 1.4, gain: 0.022, attack: 0.1, delay: 0.12 })
    },
    /** 镜面 wipe 打开（10.55s） */
    wipe: function () {
      noise({ dur: 0.9, gain: 0.05, filter: 'lowpass', freq: 1400, freqTo: 120, q: 0.7 })
      tone(392, { type: 'sine', dur: 1.2, gain: 0.045, attack: 0.01 })
      tone(587.33, { type: 'sine', dur: 1.3, gain: 0.028, attack: 0.02, delay: 0.05 })
      noise({ dur: 0.8, gain: 0.02, filter: 'highpass', freq: 5600, q: 0.6, delay: 0.12 })
    },
  }

  function tts(text) {
    if (!voiceOn || state.disposed) return
    safe(function () {
      const synth = window.speechSynthesis
      if (!synth || typeof window.SpeechSynthesisUtterance !== 'function') return
      const utter = new window.SpeechSynthesisUtterance(text)
      utter.lang = 'zh-CN'
      utter.rate = 0.94
      utter.pitch = 0.98
      utter.volume = Math.min(1, voiceVolume)
      synth.speak(utter)
    })
  }

  function voice(key) {
    if (!voiceOn || state.disposed) return
    const line = VOICE_LINES[key]
    if (!line || !line.src) return
    if (state.spoken[key]) return
    state.spoken[key] = true
    safe(function () {
      let audio = state.voiceCache[key]
      if (!audio) {
        audio = new Audio()
        audio.preload = 'auto'
        audio.volume = Math.min(1, voiceVolume)
        audio.src = resolveMedia(line.src)
        state.voiceCache[key] = audio
      }
      const promise = audio.play()
      if (promise && typeof promise.catch === 'function') {
        promise.catch(function () {
          if (!audio || audio.error || audio.networkState === 3) tts(line.text)
        })
      }
      audio.addEventListener(
        'error',
        function () {
          tts(line.text)
          state.voiceCache[key] = null
        },
        { once: true },
      )
    })
  }

  function unlock() {
    resume()
  }

  function dispose() {
    state.disposed = true
    safe(function () {
      if (window.speechSynthesis) window.speechSynthesis.cancel()
    })
    Object.keys(state.voiceCache).forEach(function (key) {
      const audio = state.voiceCache[key]
      if (audio) {
        audio.pause()
        try {
          audio.removeAttribute('src')
          audio.load()
        } catch (error) {
          /* noop */
        }
      }
    })
    state.voiceCache = {}
    safe(function () {
      if (state.ctx && state.ctx.state !== 'closed') state.ctx.close()
    })
    state.ctx = null
    state.master = null
    state.noise = null
  }

  return { sfx: sfx, voice: voice, unlock: unlock, resume: resume, dispose: dispose }
}
