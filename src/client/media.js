/**
 * 光之镜 · 天空岛 — 媒体 URL 解析
 * ----------------------------------------------------------------------------
 * 生产环境里 media 一律走 Host 路由 `/light-mirror/media/...`（同源）。
 * 离线预览（preview/ui.html 用 file:// 打开）没有 Host 路由，由预览适配层把
 * `window.__LIGHT_MIRROR_PREVIEW__` 置真、`window.__LIGHT_MIRROR_MEDIA_BASE__`
 * 指向 `../media/`，这里据此把绝对路由改写成相对路径——这样预览也能加载
 * 真实的 emblem-*.svg（加载失败仍会自动退回内置矢量兜底）。
 */

const MEDIA_PREFIX = '/light-mirror/media/'

/**
 * @param {string} url content.js MEDIA 里的绝对路由
 * @returns {string} 生产环境原样返回；离线预览改成相对基础路径
 */
export function resolveMedia(url) {
  if (typeof url !== 'string' || url.indexOf(MEDIA_PREFIX) !== 0) return url
  try {
    const base = window.__LIGHT_MIRROR_MEDIA_BASE__
    if (typeof base === 'string' && base) {
      const rel = url.slice(MEDIA_PREFIX.length)
      return base.replace(/\/?$/, '/') + rel
    }
  } catch (e) {
    /* 无 window 时保持原样 */
  }
  return url
}

/** 是否处于离线预览（仅供调试/自测使用）。 */
export function isPreview() {
  try {
    return window.__LIGHT_MIRROR_PREVIEW__ === true
  } catch (e) {
    return false
  }
}
