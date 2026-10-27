/**
 * 光之镜 · 天空岛 — splash 小工具
 * ---------------------------------------------------------------------------
 * 只放无副作用的小函数，方便 dom / audio / stages 复用。
 */

const MEDIA_PREFIX = '/light-mirror/media/'

/**
 * 媒体 URL 解析：
 *   - 线上（Host 路由注入）：原样使用 /light-mirror/media/...
 *   - 离线预览（file://）：改写成相对 media 目录，方便在没有 Host 的情况下
 *     也能看到 resource-smith 产出的真实素材；素材不存在时照常走降级。
 * 这是“预览便利”而非网络请求：仍然只读同源 media 目录。
 */
export function resolveMedia(url) {
  try {
    if (
      typeof url === 'string' &&
      window.location &&
      window.location.protocol === 'file:' &&
      url.indexOf(MEDIA_PREFIX) === 0
    ) {
      return '../media/' + url.slice(MEDIA_PREFIX.length)
    }
  } catch (error) {
    /* 预览便利失效就原样返回 */
  }
  return url
}

/** 数字夹取；非法值回落 default。 */
export function clampNumber(value, lo, hi, dflt) {
  const n = Number(value)
  if (!Number.isFinite(n)) return dflt
  return Math.min(hi, Math.max(lo, n))
}

/** cubic-bezier(0.22, 1, 0.36, 1) 的近似，用于 JS 驱动的收尾动画。 */
export function easeOutQuint(t) {
  const x = Math.min(1, Math.max(0, t))
  return 1 - Math.pow(1 - x, 5)
}

/** 生成不重复的简单 id（只用于调试元素）。 */
let uid = 0
export function nextId(prefix) {
  uid += 1
  return prefix + '-' + uid
}
