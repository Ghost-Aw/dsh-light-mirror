/**
 * 光之镜 · 空会话 Hero 标题配置
 * ----------------------------------------------------------------------------
 * Host 的配置规整只认识 content.js DEFAULTS 的字段（heroTitle 未入库），
 * 因此这里用 localStorage 作为客户端持久化兜底：设置面板写入后刷新仍生效；
 * 同时仍会随配置 POST 发给 Host（未来 Host 支持该字段时可无缝升级）。
 *
 * 语义：
 *   - 默认 '封锁已至之境'
 *   - 显式空字符串 → 不覆盖，恢复宿主原文「探索未至之境」
 */
export const HERO_TITLE_DEFAULT = '封锁已至之境'
export const HERO_TITLE_STORAGE = 'light-mirror:heroTitle'
export const HERO_TITLE_MAX = 40

export function readStoredHeroTitle() {
  try {
    const value = window.localStorage.getItem(HERO_TITLE_STORAGE)
    return value === null ? null : value
  } catch (e) {
    return null
  }
}

export function writeStoredHeroTitle(value) {
  try {
    if (typeof value === 'string') window.localStorage.setItem(HERO_TITLE_STORAGE, value)
    else window.localStorage.removeItem(HERO_TITLE_STORAGE)
  } catch (e) {
    /* 无 localStorage 时仅内存生效 */
  }
}

export function normalizeHeroTitle(value) {
  let raw = value
  if (raw === undefined) raw = readStoredHeroTitle()
  if (raw === null || raw === undefined) return HERO_TITLE_DEFAULT
  if (typeof raw !== 'string') return HERO_TITLE_DEFAULT
  const text = raw.trim()
  if (text === '') return ''
  return text.slice(0, HERO_TITLE_MAX)
}
