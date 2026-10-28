/**
 * 启动动画样式内联：桌面端（Electron profile）中 Host 注入的 /light-mirror/splash.js
 * 与 splash.css 可能因鉴权 / 注入路径不同而不可用，因此把样式打进 client bundle，
 * 由客户端自行确保 splash 样式存在（Host 注入成功时重复一份 style 无害）。
 */
import splashCss from '../splash/styles.css'

const STYLE_ID = 'light-mirror-splash-inline'

function injectSplashCss() {
  try {
    if (document.getElementById(STYLE_ID)) return
    const style = document.createElement('style')
    style.id = STYLE_ID
    style.dataset.lmuiSplashInline = '1'
    style.textContent = splashCss
    ;(document.head || document.documentElement).appendChild(style)
  } catch (error) {
    /* 样式注入失败时仍由 Host 的 splash.css 兜底 */
  }
}

injectSplashCss()
