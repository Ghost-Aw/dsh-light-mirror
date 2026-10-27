/**
 * 光之镜 · 天空岛 — splash 运行时入口 v5
 * ---------------------------------------------------------------------------
 * 由 Host 以 <script defer src="/light-mirror/splash.js"> 注入，在 React 挂载前接管首屏。
 * 时间轴（见 stages.js TIMELINE，总长 10.2s）：
 *   深色光带场 → 全白十字星 → 自下而上深色填充 → 高频抖动 → 爆发/全屏白 →
 *   WebGL 四阶段 glitch 转场 → 揭开主界面 → 释放
 * 无跳过键；两段语音；reduced-motion 简化淡入；WebGL 不可用 CSS/Canvas 降级。
 *
 * 运行时契约：
 *   window.__LIGHT_MIRROR_SPLASH__ = { start(cfg?), replay(cfg?), stop(), stats(), debugSeek(t), version }
 *
 * 调试参数（file:// / localhost / ?lmdebug）：
 *   ?t=<秒>/&freeze=<秒> 冻结 seek；&at=0..1；&hold=<秒> 真实播放到该秒暂停；
 *   &play=1 / &mute=1 / &reduced=1 / &stats=1 / &finish=1
 */

import {
  DEFAULTS,
  BOOL_KEYS,
  ENUMS,
  RANGES,
  ENUM_ALIASES,
  STORAGE,
  VERSION,
} from '../shared/content.js'
import { buildScene } from './dom.js'
import { createAudio } from './audio.js'
import { createDirector, TIMELINE } from './stages.js'
import { createTransition } from './webgl.js'
import { clampNumber } from './util.js'

const ROOT_ID = 'light-mirror-root'
const VEIL_ID = 'light-mirror-veil'

if (window.__LIGHT_MIRROR_SPLASH__ && window.__LIGHT_MIRROR_SPLASH__.version) {
  window.__LIGHT_MIRROR_SPLASH_LOADED__ = true
} else {
  boot()
}

function boot() {
  const state = {
    cfg: null,
    debug: null,
    reduced: false,
    mounted: false,
    done: false,
    root: null,
    veil: null,
    ui: null,
    director: null,
    audio: null,
    transition: null,
    listeners: [],
    failsafe: 0,
    prevOverflow: null,
    prevBodyOverflow: null,
  }

  state.debug = parseDebug()
  state.cfg = normalizeConfig(window.__LIGHT_MIRROR__)
  state.reduced =
    !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) ||
    state.debug.reduced

  const api = {
    version: VERSION,
    start: start,
    replay: replay,
    stop: stop,
    debugSeek: function (seconds) {
      if (state.director && typeof state.director.seekTo === 'function') return state.director.seekTo(seconds)
      return false
    },
    stats: function () {
      return {
        version: VERSION,
        mounted: state.mounted,
        done: state.done,
        nodes: state.root ? state.root.querySelectorAll('*').length + 1 : 0,
        reduced: state.reduced,
        debug: state.debug,
        config: state.cfg,
        webgl: state.transition ? state.transition.supported : null,
      }
    },
  }
  window.__LIGHT_MIRROR_SPLASH__ = api
  window.__LIGHT_MIRROR_SPLASH_LOADED__ = true

  function normalizeConfig(input) {
    const out = {}
    Object.keys(DEFAULTS).forEach(function (key) {
      out[key] = DEFAULTS[key]
    })
    const src = input && typeof input === 'object' ? input : {}
    Object.keys(DEFAULTS).forEach(function (key) {
      if (!(key in src) || src[key] === undefined || src[key] === null) return
      const value = src[key]
      if (BOOL_KEYS.indexOf(key) >= 0) {
        out[key] = value === true || value === 'true' || value === 1 || value === '1'
      } else if (ENUMS[key]) {
        const alias = ENUM_ALIASES[key] && ENUM_ALIASES[key][value]
        const next = alias || value
        out[key] = ENUMS[key].indexOf(next) >= 0 ? next : DEFAULTS[key]
      } else if (RANGES[key]) {
        out[key] = clampNumber(value, RANGES[key][0], RANGES[key][1], DEFAULTS[key])
      } else {
        out[key] = value
      }
    })
    if (state.debug && state.debug.mute) {
      out.voice = false
      out.sfx = false
    }
    return out
  }

  function parseDebug() {
    const result = { t: -1, play: false, mute: false, reduced: false, stats: false, finish: false, hold: -1 }
    try {
      const params = new URLSearchParams(window.location.search || '')
      const preview = window.__LIGHT_MIRROR_PREVIEW__ === true
      const local =
        window.location.protocol === 'file:' ||
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1' ||
        params.has('lmdebug') ||
        preview
      if (!local) return result
      if (params.has('t') || params.has('freeze')) {
        result.t = clampNumber(params.get('t') || params.get('freeze'), 0, TIMELINE.total, -1)
        result.play = true
      }
      if (params.has('at')) {
        result.t = clampNumber(params.get('at'), 0, 1, 0.6) * TIMELINE.total
        result.play = true
      }
      if (params.has('hold')) {
        result.hold = clampNumber(params.get('hold'), 0, TIMELINE.total, -1)
        result.play = true
      }
      if (params.get('play') === '1' || preview) result.play = true
      if (params.get('mute') === '1') result.mute = true
      if (params.get('reduced') === '1') result.reduced = true
      if (params.get('stats') === '1') result.stats = true
      if (params.get('finish') === '1') result.finish = true
    } catch (error) {
      /* noop */
    }
    return result
  }

  function ensureRoot() {
    let root = document.getElementById(ROOT_ID)
    if (!root) {
      root = document.createElement('div')
      root.id = ROOT_ID
      root.className = 'lm-root lm-boot'
      document.body.insertBefore(root, document.body.firstChild)
    }
    return root
  }

  function ensureVeil() {
    let veil = document.getElementById(VEIL_ID)
    if (!veil) {
      veil = document.createElement('div')
      veil.id = VEIL_ID
      veil.setAttribute('aria-hidden', 'true')
      document.body.insertBefore(veil, document.body.firstChild)
    }
    return veil
  }

  function lockPage() {
    const html = document.documentElement
    html.classList.add('lm-lock')
    html.setAttribute('data-lm-boot', '1')
    if (state.prevOverflow == null) state.prevOverflow = html.style.overflow || ''
    if (state.prevBodyOverflow == null) {
      state.prevBodyOverflow = document.body ? document.body.style.overflow || '' : ''
    }
    html.style.overflow = 'hidden'
    if (document.body) document.body.style.overflow = 'hidden'
  }

  function unlockPage() {
    const html = document.documentElement
    html.classList.remove('lm-lock')
    html.removeAttribute('data-lm-boot')
    html.style.overflow = state.prevOverflow || ''
    if (document.body) document.body.style.overflow = state.prevBodyOverflow || ''
    state.prevOverflow = null
    state.prevBodyOverflow = null
  }

  function addListener(target, type, fn, options) {
    target.addEventListener(type, fn, options)
    state.listeners.push(function () {
      target.removeEventListener(type, fn, options)
    })
  }

  function clearListeners() {
    state.listeners.forEach(function (off) {
      try {
        off()
      } catch (error) {
        /* noop */
      }
    })
    state.listeners = []
  }

  function bindAudioUnlock() {
    const unlock = function () {
      if (state.audio) state.audio.unlock()
    }
    addListener(document, 'pointerdown', unlock, { passive: true })
    addListener(document, 'keydown', unlock)
  }

  function start(overrideConfig) {
    if (overrideConfig && typeof overrideConfig === 'object') state.cfg = normalizeConfig(overrideConfig)
    try {
      mount()
      return true
    } catch (error) {
      softFail(error)
      return false
    }
  }

  function replay(overrideConfig) {
    if (overrideConfig && typeof overrideConfig === 'object') return Promise.resolve(start(overrideConfig))
    const url = window.__LIGHT_MIRROR_CONFIG_URL__
    if (!url) return Promise.resolve(start())
    return new Promise(function (resolve) {
      let finished = false
      const done = function (ok) {
        if (finished) return
        finished = true
        resolve(ok)
      }
      try {
        fetch(url, { headers: { Accept: 'application/json' }, cache: 'no-store' })
          .then(function (res) {
            return res.json()
          })
          .then(function (json) {
            if (json && json.ok === true && json.config) done(start(json.config))
            else done(start())
          })
          .catch(function () {
            done(start())
          })
        window.setTimeout(function () {
          done(start())
        }, 1200)
      } catch (error) {
        done(start())
      }
    })
  }

  function mount() {
    window.__LIGHT_MIRROR_SPLASH_DONE__ = false
    window.__LIGHT_MIRROR_SPLASH_REASON__ = ''
    if (state.mounted) teardown()
    state.done = false
    const cfg = state.cfg
    const debug = state.debug
    const root = ensureRoot()
    const veil = ensureVeil()
    state.root = root
    state.veil = veil
    lockPage()
    if (veil) veil.style.opacity = '1'

    root.className = 'lm-root'
    root.style.display = ''
    root.classList.toggle('lm-reduced', state.reduced)

    const ui = buildScene(root, cfg, debug)
    state.ui = ui
    const transition = createTransition(ui.webgl)
    state.transition = transition
    state.audio = createAudio(cfg)

    const director = createDirector({
      root: root,
      ui: ui,
      audio: state.audio,
      transition: transition,
      reduced: state.reduced,
      debug: debug,
      onFinish: function (reason) {
        release(reason)
      },
      onRevealStart: function () {
        beginReveal()
      },
      onFreeze: function (offsetMs) {
        onFrozen(offsetMs)
      },
    })
    state.director = director
    state.mounted = true

    root.classList.remove('lm-boot')
    root.classList.add('lm-ready')
    root.dataset.bootAt = String(Math.round(performance.now()))
    window.__LIGHT_MIRROR_TAKEN_OVER__ = true

    bindAudioUnlock()

    window.clearTimeout(state.failsafe)
    if (debug.t < 0 && debug.hold < 0) {
      state.failsafe = window.setTimeout(function () {
        if (!state.done) softFail(new Error('splash timeout'))
      }, TIMELINE.total * 1000 + 3000)
    }

    if (debug.stats) {
      const count = ui.domCount()
      try {
        document.title = 'LM nodes=' + count + ' t=' + (debug.t >= 0 ? debug.t : 'play')
      } catch (error) {
        /* noop */
      }
    }

    if (debug.t >= 0) {
      director.jumpDebug(debug.t)
    } else {
      director.play()
      if (debug.hold >= 0) director.holdAt(debug.hold)
    }

    if (debug.finish) {
      window.setTimeout(function () {
        if (!state.done) release('debug-finish')
      }, 260)
    }
  }

  function beginReveal() {
    const html = document.documentElement
    html.classList.add('lm-revealing')
    html.classList.remove('lm-lock')
    html.removeAttribute('data-lm-boot')
    if (state.root) state.root.classList.add('lm-revealing')
    if (state.veil) {
      const veil = state.veil
      state.veil = null
      if (veil.parentNode) veil.parentNode.removeChild(veil)
    }
  }

  function release(reason) {
    if (state.done) return
    state.done = true
    window.clearTimeout(state.failsafe)
    state.failsafe = 0
    clearListeners()
    if (state.director) {
      try {
        state.director.dispose()
      } catch (error) {
        /* noop */
      }
    }
    if (state.audio) {
      try {
        state.audio.dispose()
      } catch (error) {
        /* noop */
      }
    }
    const root = state.root || document.getElementById(ROOT_ID)
    const veil = state.veil || document.getElementById(VEIL_ID)
    unlockPage()
    if (root && root.parentNode) root.parentNode.removeChild(root)
    if (veil && veil.parentNode) veil.parentNode.removeChild(veil)
    state.root = null
    state.veil = null
    state.mounted = false
    state.director = null
    state.audio = null
    state.transition = null
    state.ui = null
    window.__LIGHT_MIRROR_SPLASH_DONE__ = true
    window.__LIGHT_MIRROR_SPLASH_REASON__ = reason || 'done'
  }

  function stop() {
    if (!state.mounted && state.done) return
    release('stop')
  }

  function softFail(error) {
    try {
      if (window.console && console.warn) console.warn('[light-mirror] splash fallback:', error)
      window.__LIGHT_MIRROR_SPLASH_ERROR__ = String((error && error.message) || error || 'unknown')
      if (state.director) state.director.dispose()
      const root = state.root || document.getElementById(ROOT_ID)
      const ui = state.ui
      if (ui && ui.scene) {
        const fail = ui.scene.querySelector('.lm-fail')
        if (fail) {
          fail.hidden = false
          fail.textContent = '光之镜暂时失焦，正在返回世界…'
        }
        root && root.classList.add('lm-revealing')
      }
    } catch (inner) {
      /* 兜底本身不许再抛 */
    }
    window.setTimeout(function () {
      release('error')
    }, 900)
  }

  function teardown() {
    if (!state.mounted) return
    clearListeners()
    if (state.director) {
      try {
        state.director.dispose()
      } catch (error) {
        /* noop */
      }
    }
    if (state.audio) {
      try {
        state.audio.dispose()
      } catch (error) {
        /* noop */
      }
    }
    if (state.root && state.root.parentNode) state.root.parentNode.removeChild(state.root)
    if (state.veil && state.veil.parentNode) state.veil.parentNode.removeChild(state.veil)
    unlockPage()
    state.mounted = false
    state.director = null
    state.audio = null
    state.transition = null
    state.ui = null
    state.root = null
    state.veil = null
    state.done = false
  }

  function onFrozen(offsetMs) {
    const nodes = state.ui ? state.ui.domCount() : 0
    const text = 'frozen t=' + (Number(offsetMs) / 1000).toFixed(2) + 's | nodes ' + nodes
    try {
      if (state.ui && state.ui.debug) {
        state.ui.debug.hidden = false
        state.ui.debug.textContent = text
      }
      document.title = 'LM ' + text
    } catch (error) {
      /* noop */
    }
  }

  function currentDay() {
    try {
      return new Date().toISOString().slice(0, 10)
    } catch (error) {
      return ''
    }
  }

  function shouldSelfPlay(cfg) {
    if (!cfg.splashEnabled) return false
    try {
      if (cfg.splashMode === 'session' && sessionStorage.getItem(STORAGE.splashShown) === '1') return false
      if (cfg.splashMode === 'daily' && localStorage.getItem(STORAGE.splashDay) === currentDay()) return false
    } catch (error) {
      /* 隐私模式：按可播处理 */
    }
    return true
  }

  function markSelfPlayed(cfg) {
    try {
      if (cfg.splashMode === 'session') sessionStorage.setItem(STORAGE.splashShown, '1')
      if (cfg.splashMode === 'daily') localStorage.setItem(STORAGE.splashDay, currentDay())
    } catch (error) {
      /* noop */
    }
  }

  function afterBoot() {
    const injected = window.__LIGHT_MIRROR__ && typeof window.__LIGHT_MIRROR__ === 'object'
    const rootExists = !!document.getElementById(ROOT_ID)
    const skipByHost = window.__LIGHT_MIRROR_SKIP__ === true
    const force = state.debug.play || window.__LIGHT_MIRROR_PREVIEW__ === true
    if (skipByHost && !force) return
    if (rootExists) {
      start()
      return
    }
    if (!force) {
      if (injected) return
      if (!shouldSelfPlay(state.cfg)) return
    }
    if (!injected && window.__LIGHT_MIRROR_CONFIG_URL__) {
      fetch(window.__LIGHT_MIRROR_CONFIG_URL__, { headers: { Accept: 'application/json' }, cache: 'no-store' })
        .then(function (res) {
          return res.json()
        })
        .then(function (json) {
          if (json && json.ok === true && json.config) {
            state.cfg = normalizeConfig(json.config)
            if (force || shouldSelfPlay(state.cfg)) {
              if (!force) markSelfPlayed(state.cfg)
              start()
            }
          } else {
            fallbackSelfPlay()
          }
        })
        .catch(fallbackSelfPlay)
      return
    }
    fallbackSelfPlay()

    function fallbackSelfPlay() {
      if (!force && !shouldSelfPlay(state.cfg)) return
      if (!force) markSelfPlayed(state.cfg)
      start()
    }
  }

  if (document.body) afterBoot()
  else document.addEventListener('DOMContentLoaded', afterBoot, { once: true })
}
