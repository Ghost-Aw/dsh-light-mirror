/**
 * 启动动画客户端兜底（v14）
 * ---------------------------------------------------------------------------
 * Problem: on DSH Desktop the Host's `webServer.tapIndex` HTML injection is not
 * applied to the Electron window (or its /light-mirror/splash.js request is not
 * authorized), so the startup animation never loads even though the host plugin
 * is active. `settings.js` also loads /light-mirror/splash.js dynamically for the
 * "立即预览" button, which fails for the same reason.
 *
 * Fix: bundle the splash runtime + its CSS directly into client.js. The runtime
 * self-boots when the Host-injected root exists; otherwise we start it explicitly.
 * On the web profile the Host-injected splash script runs first, so importing the
 * runtime here is a no-op (it detects window.__LIGHT_MIRROR_SPLASH__ and skips).
 *
 * 配置来源（v15）：桌面端没有 Host 首屏注入时，`window.__LIGHT_MIRROR__` 往往
 * 还不存在。启动前先向 /light-mirror/config 拉一次已保存配置，确保设置页里的
 * 语音开关、语音音量、界面音效开关和音量真正作用到本次启动动画；接口不可用时
 * 再退回全局配置 / DEFAULTS，不影响其它平台的既有行为。
 *
 * Side-effect module: loaded once from src/client/index.js.
 */
import './splashCss.js'
import '../splash/index.js'

const ROOT_ID = 'light-mirror-root'
const CONFIG_ROUTE = '/light-mirror/config'
const CONFIG_TIMEOUT_MS = 900

let fallbackStarted = false

function readSavedConfig() {
  if (typeof fetch !== 'function') return Promise.resolve(null)
  let timer = 0
  let controller = null
  const request = (() => {
    try {
      if (typeof AbortController === 'function') {
        controller = new AbortController()
        timer = window.setTimeout(function () {
          try {
            controller.abort()
          } catch (error) {
            /* noop */
          }
        }, CONFIG_TIMEOUT_MS)
      }
      return fetch(CONFIG_ROUTE, {
        headers: { Accept: 'application/json' },
        cache: 'no-store',
        credentials: 'same-origin',
        signal: controller ? controller.signal : undefined,
      })
    } catch (error) {
      return Promise.reject(error)
    }
  })()
  return request
    .then(function (res) {
      if (!res || !res.ok) throw new Error('config unavailable')
      return res.json()
    })
    .then(function (json) {
      return json && json.ok === true && json.config && typeof json.config === 'object'
        ? json.config
        : null
    })
    .catch(function () {
      return null
    })
    .then(function (cfg) {
      if (timer) window.clearTimeout(timer)
      return cfg
    })
}

function shouldSkipForMode(cfg) {
  const mode = cfg && cfg.splashMode
  try {
    if (mode === 'session' && sessionStorage.getItem('light-mirror:splash-shown') === '1') return true
    if (mode === 'daily') {
      const day = new Date().toISOString().slice(0, 10)
      if (localStorage.getItem('light-mirror:splash-day') === day) return true
    }
  } catch (error) {
    /* 隐私模式：按可播处理 */
  }
  return false
}

function markPlayed(cfg) {
  const mode = cfg && cfg.splashMode
  try {
    if (mode === 'session') sessionStorage.setItem('light-mirror:splash-shown', '1')
    if (mode === 'daily') localStorage.setItem('light-mirror:splash-day', new Date().toISOString().slice(0, 10))
  } catch (error) {
    /* noop */
  }
}

function startFallbackIfNeeded() {
  try {
    if (fallbackStarted) return
    if (document.getElementById(ROOT_ID)) return
    if (window.__LIGHT_MIRROR_SKIP__ === true) return
    /* splash/index.js 的 afterBoot 已经接管了配置读取与起播，别重复启动。 */
    if (window.__LIGHT_MIRROR_AFTERBOOT__ === true) return
    const api = window.__LIGHT_MIRROR_SPLASH__
    if (!api || typeof api.start !== 'function') return
    /* 已经由 Host 的 splash.js 或其它路径开始过则不再重复。 */
    if (window.__LIGHT_MIRROR_TAKEN_OVER__ === true) return
    fallbackStarted = true

    const injected = window.__LIGHT_MIRROR__
    const start = function (cfg) {
      if (fallbackStarted === 'done') return
      if (window.__LIGHT_MIRROR_TAKEN_OVER__ === true) return
      fallbackStarted = 'done'
      if (cfg && typeof cfg === 'object') window.__LIGHT_MIRROR__ = cfg
      if (cfg && cfg.splashEnabled === false) return
      if (shouldSkipForMode(cfg)) return
      api.start(cfg && typeof cfg === 'object' ? cfg : undefined)
      markPlayed(cfg)
    }

    /* 桌面端没有 Host 注入时，优先读已保存配置，保证启动动画声音设置是最新的。 */
    readSavedConfig().then(function (saved) {
      start(saved || (injected && typeof injected === 'object' ? injected : undefined))
    })
  } catch (error) {
    try {
      window.__LIGHT_MIRROR_SPLASH_CLIENT_ERROR__ = String((error && error.message) || error)
    } catch (inner) {
      /* noop */
    }
  }
}

/* runtime 在 module load 时已执行 afterBoot()；这里再检查一次，覆盖 Host 注入
   失败的桌面端（root 不存在、API 已由本 bundle 创建）。延迟一帧让 DOM 稳定。 */
if (document.body) {
  window.setTimeout(startFallbackIfNeeded, 0)
} else {
  document.addEventListener('DOMContentLoaded', startFallbackIfNeeded, { once: true })
}
