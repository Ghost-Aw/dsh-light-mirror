/**
 * 光之镜 · 宿主 DOM 文案补丁（v9）
 * ----------------------------------------------------------------------------
 * 1) 三档权限文案：仅可查看/工作区内修改/完全权限 →
 *    天之御使 / 生死时空 / 理之大权。
 *    用 MutationObserver 精确替换「权限选择器/菜单」内的文本节点；范围限制在
 *    permission-presets 的稳定 class 后缀（_triggerLabel/_optionLabelText/_selector），
 *    只替换整段完全匹配的文本，避免误伤正文与确认弹窗描述；停用时还原。
 * 2) 空会话 Hero 标题：真实 DOM 是 [data-phase=hero] 内 titleGroup 的第一个
 *    span（源码确认，不是 h1）；同时兼容 h1 与 preview mock。MutationObserver
 *    保持 React 重渲染后仍生效；空字符串时恢复宿主原文。
 */

import { HERO_TITLE_DEFAULT } from './heroTitle.js'

const PERMISSION_MAP = {
  仅可查看: '天之御使',
  工作区内修改: '生死时空',
  完全权限: '理之大权',
}
const PERMISSION_SELECTOR = '[class*="_triggerLabel"],[class*="_optionLabelText"],[class*="_selector"]'
const HERO_SELECTOR =
  '[data-phase="hero"] h1,[data-phase="hero"] [class*="_titleGroup"] > span:first-child,.mock-hero__title'

function textNodesOf(root) {
  const out = []
  if (!root || typeof document === 'undefined') return out
  const walker = document.createTreeWalker(root, 4 /* NodeFilter.SHOW_TEXT */)
  let node = walker.nextNode()
  while (node) {
    out.push(node)
    node = walker.nextNode()
  }
  return out
}

function replaceNodeText(node, next) {
  const current = node.nodeValue || ''
  const leading = (current.match(/^\s*/) || [''])[0]
  const trailing = (current.match(/\s*$/) || [''])[0]
  const replacement = leading + next + trailing
  if (node.nodeValue !== replacement) node.nodeValue = replacement
}

/**
 * @param {object} store 插件配置 store
 */
export function createDomPatches(store) {
  let disposed = false
  let raf = 0
  let observer = null
  let storeOff = null
  const permissionOriginals = new Map()
  const knownHeadings = new WeakSet()

  function readConfig() {
    try {
      return store && typeof store.get === 'function' ? store.get() : null
    } catch (e) {
      return null
    }
  }

  /* ── 权限文案 ── */
  function applyPermissions() {
    if (disposed) return
    const roots = document.querySelectorAll(PERMISSION_SELECTOR)
    for (let i = 0; i < roots.length; i += 1) {
      const nodes = textNodesOf(roots[i])
      for (let k = 0; k < nodes.length; k += 1) {
        const node = nodes[k]
        if (!node.isConnected) continue
        const raw = node.nodeValue || ''
        const trimmed = raw.trim()
        const mapped = PERMISSION_MAP[trimmed]
        if (!mapped) continue
        if (!permissionOriginals.has(node)) permissionOriginals.set(node, raw)
        replaceNodeText(node, mapped)
      }
    }
  }

  function restorePermissions() {
    permissionOriginals.forEach((original, node) => {
      try {
        if (node.isConnected && node.nodeValue !== original) node.nodeValue = original
      } catch (e) {
        /* noop */
      }
    })
    permissionOriginals.clear()
  }

  /* ── Hero 标题 ── */
  function applyHeroTitle() {
    if (disposed) return
    const cfg = readConfig()
    const desired = cfg && typeof cfg.heroTitle === 'string' ? cfg.heroTitle : HERO_TITLE_DEFAULT
    const headings = document.querySelectorAll(HERO_SELECTOR)
    for (let i = 0; i < headings.length; i += 1) {
      const heading = headings[i]
      if (!heading || heading.nodeType !== 1) continue
      const nodes = textNodesOf(heading)
      if (nodes.length === 0) continue
      const textNode = nodes.find((n) => (n.nodeValue || '').trim() !== '') || nodes[0]
      const current = (heading.textContent || '').trim()
      if (desired === '') {
        /* 空字符串 = 不覆盖：恢复宿主原文「探索未至之境」 */
        const original = heading.getAttribute('data-lmui-hero-original')
        if (original && current !== original) replaceNodeText(textNode, original)
        continue
      }
      if (!knownHeadings.has(heading) || !heading.getAttribute('data-lmui-hero-original')) {
        heading.setAttribute('data-lmui-hero-original', current)
        knownHeadings.add(heading)
      }
      if (current !== desired) {
        replaceNodeText(textNode, desired)
        /* 多文本节点时清掉其余，保证标题只显示自定义字符串 */
        for (let k = 0; k < nodes.length; k += 1) {
          if (nodes[k] !== textNode && (nodes[k].nodeValue || '').trim() !== '') nodes[k].nodeValue = ''
        }
      }
    }
  }

  function applyAll() {
    if (disposed) return
    const cfg = readConfig()
    if (!cfg || cfg.enabled !== true) return
    applyPermissions()
    applyHeroTitle()
  }

  function schedule() {
    if (disposed || raf) return
    raf = window.requestAnimationFrame(() => {
      raf = 0
      applyAll()
    })
  }

  try {
    observer = new window.MutationObserver(schedule)
    observer.observe(document.documentElement, {
      subtree: true,
      childList: true,
      characterData: true,
    })
  } catch (e) {
    observer = null
  }
  if (store && typeof store.subscribe === 'function') {
    storeOff = store.subscribe(schedule)
  }
  applyAll()

  return {
    sync: schedule,
    dispose() {
      disposed = true
      if (raf) {
        try {
          window.cancelAnimationFrame(raf)
        } catch (e) {
          /* noop */
        }
        raf = 0
      }
      if (observer) {
        try {
          observer.disconnect()
        } catch (e) {
          /* noop */
        }
        observer = null
      }
      if (typeof storeOff === 'function') {
        try {
          storeOff()
        } catch (e) {
          /* noop */
        }
        storeOff = null
      }
      restorePermissions()
      /* Hero 标题恢复宿主原文 */
      const headings = document.querySelectorAll(HERO_SELECTOR)
      for (let i = 0; i < headings.length; i += 1) {
        const heading = headings[i]
        const original = heading.getAttribute && heading.getAttribute('data-lmui-hero-original')
        if (original === null || original === undefined) continue
        const nodes = textNodesOf(heading)
        const textNode = nodes.find((n) => (n.nodeValue || '').trim() !== '') || nodes[0]
        if (textNode) replaceNodeText(textNode, original)
        heading.removeAttribute('data-lmui-hero-original')
      }
    },
  }
}
