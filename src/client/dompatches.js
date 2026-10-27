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

import { HERO_TITLE_DEFAULT, THINKING_DEFAULT } from './heroTitle.js'

const PERMISSION_MAP = {
  仅可查看: '天之御使',
  工作区内修改: '生死时空',
  完全权限: '理之大权',
}
/* 稳定 class 后缀 + 展开菜单：primitive menu 将菜单项 label 放在
   button[role=menuitem] 内（可能 portal 到 body），统一按 role 限定。 */
const PERMISSION_SELECTOR = [
  '[class*="_triggerLabel"]',
  '[class*="_optionLabelText"]',
  '[class*="_selector"]',
  '[role="menu"] button[role="menuitem"]',
  '[role="menu"] [class*="_itemLabel"]',
  '[role="listbox"] [role="option"]',
].join(',')
const HERO_SELECTOR =
  '[data-phase="hero"] h1,[data-phase="hero"] [class*="_titleGroup"] > span:first-child,.mock-hero__title'
const SUBAGENT_BUTTON_SELECTOR = 'button[aria-haspopup="tree"]'
const THINKING_SELECTOR = '[data-chat-running]'

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
  const subagentTextOriginals = new Map()
  const subagentAriaOriginals = new Map()
  const thinkingOriginals = new Map()
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

  /* ── 顶部子智能体数量：n 个子智能体 → n 个影子 ── */
  function applySubagentCount() {
    const buttons = document.querySelectorAll(SUBAGENT_BUTTON_SELECTOR)
    for (let i = 0; i < buttons.length; i += 1) {
      const button = buttons[i]
      const countNodes = button.querySelectorAll('[class*="_count"]')
      const scope = countNodes.length > 0 ? countNodes : [button]
      for (let k = 0; k < scope.length; k += 1) {
        const nodes = textNodesOf(scope[k])
        for (let n = 0; n < nodes.length; n += 1) {
          const node = nodes[n]
          const raw = node.nodeValue || ''
          if (raw.indexOf('个子智能体') < 0) continue
          if (!subagentTextOriginals.has(node)) subagentTextOriginals.set(node, raw)
          const next = raw.replace(/个子智能体/g, '个影子')
          if (node.nodeValue !== next) node.nodeValue = next
        }
      }
      const aria = button.getAttribute('aria-label')
      if (aria && aria.indexOf('个子智能体') >= 0) {
        if (!subagentAriaOriginals.has(button)) subagentAriaOriginals.set(button, aria)
        const next = aria.replace(/个子智能体/g, '个影子')
        if (next !== aria) button.setAttribute('aria-label', next)
      }
    }
  }

  function restoreSubagentCount() {
    subagentTextOriginals.forEach((original, node) => {
      try {
        if (node.isConnected && node.nodeValue !== original) node.nodeValue = original
      } catch (e) {
        /* noop */
      }
    })
    subagentTextOriginals.clear()
    subagentAriaOriginals.forEach((original, button) => {
      try {
        if (button.isConnected && button.getAttribute('aria-label') !== original) {
          button.setAttribute('aria-label', original)
        }
      } catch (e) {
        /* noop */
      }
    })
    subagentAriaOriginals.clear()
  }

  /* ── 思考状态前缀：只替换「深度求索中」，保留「，用时 n 秒…」 ── */
  function applyThinkingLabel() {
    const cfg = readConfig()
    const desired = cfg && typeof cfg.thinkingLabel === 'string' ? cfg.thinkingLabel : THINKING_DEFAULT
    const roots = document.querySelectorAll(THINKING_SELECTOR)
    for (let i = 0; i < roots.length; i += 1) {
      const nodes = textNodesOf(roots[i])
      for (let k = 0; k < nodes.length; k += 1) {
        const node = nodes[k]
        const raw = node.nodeValue || ''
        if (raw.indexOf('深度求索中') < 0) continue
        if (!thinkingOriginals.has(node)) thinkingOriginals.set(node, raw)
        const next = raw.replace(/深度求索中/g, desired)
        if (node.nodeValue !== next) node.nodeValue = next
      }
    }
  }

  function restoreThinkingLabel() {
    thinkingOriginals.forEach((original, node) => {
      try {
        if (node.isConnected && node.nodeValue !== original) node.nodeValue = original
      } catch (e) {
        /* noop */
      }
    })
    thinkingOriginals.clear()
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
    applySubagentCount()
    applyThinkingLabel()
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
    /* 需求：observer 挂 document.body（菜单可能 portal 到 body 外） */
    observer.observe(document.body, {
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
      restoreSubagentCount()
      restoreThinkingLabel()
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
