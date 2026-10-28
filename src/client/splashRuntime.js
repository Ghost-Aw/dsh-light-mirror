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
 * Side-effect module: loaded once from src/client/index.js.
 */
import './splashCss.js'
import '../splash/index.js'

const ROOT_ID = 'light-mirror-root'

function startFallbackIfNeeded() {
  try {
    if (document.getElementById(ROOT_ID)) return
    if (window.__LIGHT_MIRROR_SKIP__ === true) return
    const api = window.__LIGHT_MIRROR_SPLASH__
    if (!api || typeof api.start !== 'function') return
    const cfg = window.__LIGHT_MIRROR__
    if (cfg && cfg.splashEnabled === false) return
    /* 已经由 Host 的 splash.js 或其它路径开始过则不再重复。 */
    if (window.__LIGHT_MIRROR_TAKEN_OVER__ === true) return
    const mode = cfg && cfg.splashMode
    if (mode === 'session') {
      try {
        if (sessionStorage.getItem('light-mirror:splash-shown') === '1') return
      } catch (error) {
        /* 隐私模式：按可播处理 */
      }
    }
    if (mode === 'daily') {
      try {
        const day = new Date().toISOString().slice(0, 10)
        if (localStorage.getItem('light-mirror:splash-day') === day) return
      } catch (error) {
        /* 隐私模式：按可播处理 */
      }
    }
    api.start(cfg && typeof cfg === 'object' ? cfg : undefined)
    window.setTimeout(function () {
      try {
        const current = window.__LIGHT_MIRROR__
        const mode2 = current && current.splashMode
        if (mode2 === 'session') sessionStorage.setItem('light-mirror:splash-shown', '1')
        if (mode2 === 'daily') localStorage.setItem('light-mirror:splash-day', new Date().toISOString().slice(0, 10))
      } catch (error) {
        /* noop */
      }
    }, 1200)
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
