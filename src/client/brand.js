/**
 * 光之镜 · 天空岛 — 品牌插槽 v3（5 图案可切换 + 品牌文字）
 * ----------------------------------------------------------------------------
 * 三个单槽（单占位、priority -200，稳定压过宿主品牌与其它主题）：
 *   sidebar.brand.mark / sidebar.brand.name / conversation.hero.brand.mark
 *
 * 品牌图案 brandMark（content.js ENUMS）：
 *   phanes        法涅斯徽记·含左右翅膀（默认；白 / 淡金两版）
 *   terminal      光之镜终端（pattern-terminal；白 / 淡金两版）
 *   skyisland     天空岛（pattern-skyisland）
 *   paimonEmoji   派蒙表情（pattern-paimon-emoji）
 *   paimonAvatar  派蒙头像（pattern-paimon-avatar）
 *
 * 着色：深色模式用白色版；神殿（浅色）模式优先用淡金版，没有淡金版的图案
 * 用 CSS 压成深墨/低饱和。20px 收窄 rail 优先紧凑素材（phanes core-compact），
 * 都缺失时逐级回落到 core → cutout → 内置极简占位，不空窗。
 */

import * as ReactNS from 'react'
import { MEDIA, UI_COPY } from '../shared/content.js'
import { resolveMedia } from './media.js'

const React =
  ReactNS && typeof ReactNS.createElement === 'function'
    ? ReactNS
    : ReactNS && ReactNS.default && typeof ReactNS.default.createElement === 'function'
      ? ReactNS.default
      : ReactNS
const h = React.createElement

const BRAND_PRIORITY = -200

/** 配置 store 订阅 hook（装饰 / 观测栏共用）。 */
export function useMirrorConfig(store) {
  const read = () => {
    try {
      return store && typeof store.get === 'function' ? store.get() : {}
    } catch (e) {
      return {}
    }
  }
  const [snap, setSnap] = React.useState(read)
  React.useEffect(() => {
    if (!store || typeof store.subscribe !== 'function') return undefined
    const off = store.subscribe(() => setSnap(read()))
    return () => {
      if (typeof off === 'function') off()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store])
  return snap || {}
}

function resolve(url) {
  return url ? resolveMedia(url) : ''
}

/* 紧凑 phanes 素材路径：由 phanesCore 派生（content.js 未单列常量）。 */
const PHANES_COMPACT = (() => {
  const core = resolve(MEDIA.art.phanesCore)
  return core ? core.replace(/-core\.png$/i, '-core-compact.png') : ''
})()

/* 新素材目录 + 候选名（resource-smith 产出）：内容未到位时逐级回退旧图。
   目录从现有 art 常量派生，content.js 无需新增 key。 */
const ART_DIR = (() => {
  const url = resolve(MEDIA.art.phanesFull)
  return url ? url.replace(/[^/]+$/i, '') : ''
})()
function artUrl(name) {
  return ART_DIR ? ART_DIR + name : ''
}
/** 资源未到位时先接路径 + 旧图兜底（resource-smith 已产出下列命名）。 */
function newArtCandidates(variant, scheme) {
  const dark = scheme === 'dark'
  const list = []
  const push = (kind, names) => {
    names.forEach((name) => {
      if (name) list.push({ kind, url: artUrl(name) })
    })
  }
  if (variant === 'phanes') {
    if (dark) {
      push('new-ink-dark', ['phanes-ink-dark.png'])
      push('new-color', ['phanes-wings-new.png'])
      push('new-ink', ['phanes-ink.png'])
    } else {
      push('new-ink', ['phanes-ink.png'])
      push('new-color', ['phanes-wings-new.png'])
    }
  } else if (variant === 'paimonEmoji') {
    if (dark) {
      push('new-ink-dark', ['pattern-paimon-emoji-new-dark.png'])
      push('new-ink', ['pattern-paimon-emoji-new.png', 'paimon-emoji-ink.png'])
    } else {
      push('new-ink', ['pattern-paimon-emoji-new.png', 'paimon-emoji-ink.png'])
    }
  } else if (variant === 'paimonAvatar') {
    if (dark) {
      push('new-color', ['pattern-paimon-avatar-new.png'])
      push('new-bw-light', ['pattern-paimon-avatar-new-light.png'])
    } else {
      push('new-ink', ['pattern-paimon-avatar-new-light.png'])
      push('new-color', ['pattern-paimon-avatar-new.png'])
    }
  }
  return list.filter((item) => item.url)
}

/** 当前配色模式（品牌/派蒙素材需要按深浅选图）。 */
export function useScheme() {
  const read = () => {
    try {
      return document.documentElement.getAttribute('data-lmui-scheme') === 'light' ? 'light' : 'dark'
    } catch (e) {
      return 'dark'
    }
  }
  const [scheme, setScheme] = React.useState(read)
  React.useEffect(() => {
    if (typeof window.MutationObserver !== 'function') return undefined
    const obs = new window.MutationObserver(() => setScheme(read()))
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-lmui-scheme'] })
    return () => obs.disconnect()
  }, [])
  return scheme
}

const VARIANT_DEFS = {
  phanes: {
    white: () => resolve(MEDIA.art.phanesFull),
    gold: () => resolve(MEDIA.art.phanesFullGold),
    compact: () => PHANES_COMPACT,
    kind: 'pattern',
    goldKind: 'pattern',
  },
  terminal: {
    white: () => resolve(MEDIA.art.patternTerminal),
    gold: () => resolve(MEDIA.art.patternTerminalGold),
    compact: () => resolve(MEDIA.art.patternTerminal),
    kind: 'pattern',
    goldKind: 'pattern',
  },
  skyisland: {
    white: () => resolve(MEDIA.art.patternSkyisland),
    gold: () => '',
    compact: () => resolve(MEDIA.art.patternSkyisland),
    kind: 'pattern',
    goldKind: 'pattern',
  },
  paimonEmoji: {
    white: () => resolve(MEDIA.art.patternPaimonEmoji),
    gold: () => '',
    compact: () => resolve(MEDIA.art.patternPaimonEmoji),
    kind: 'pattern',
    goldKind: 'pattern',
  },
  paimonAvatar: {
    white: () => resolve(MEDIA.art.patternPaimonAvatar),
    gold: () => '',
    compact: () => resolve(MEDIA.art.patternPaimonAvatar),
    kind: 'pattern',
    goldKind: 'pattern',
  },
}

function variantDef(variant) {
  return VARIANT_DEFS[variant] || VARIANT_DEFS.phanes
}

/** 主图案候选链：新素材 → 尺寸紧凑版 → 旧图案本体 → phanes core → cutout。
 *  20px 收窄槽优先保留原 compact 兜底（新图太细会糊）。 */
function primaryCandidates(variant, size, scheme) {
  const def = variantDef(variant)
  const list = []
  const push = (kind, url) => {
    if (!url) return
    if (list.some((item) => item.url === url)) return
    list.push({ kind, url })
  }
  const fresh = newArtCandidates(variant, scheme)
  /* 新素材优先（含 24px 宿主侧栏品牌位）；旧 compact/core 只作缺图兜底。 */
  fresh.forEach((item) => push(item.kind, item.url))
  if (size < 26) push(def.kind === 'wings' ? 'compact' : 'pattern', def.compact())
  push(def.kind, def.white())
  if (size < 26 && PHANES_COMPACT) push('compact', PHANES_COMPACT)
  push('core', resolve(MEDIA.art.phanesCore))
  push('cutout', resolve(MEDIA.art.phanesCutout))
  return list
}

/** 淡金层候选链（浅色模式优先）；失败则回退白色层 + CSS 调色。 */
function goldCandidates(variant) {
  const def = variantDef(variant)
  const url = def.gold()
  return url ? [{ kind: def.goldKind || 'gold', url }] : []
}

function fourStar(cx, cy, r) {
  const k = r * 0.18
  return [
    'M' + cx + ' ' + (cy - r),
    'Q' + (cx + k) + ' ' + (cy - k) + ' ' + (cx + r) + ' ' + cy,
    'Q' + (cx + k) + ' ' + (cy + k) + ' ' + cx + ' ' + (cy + r),
    'Q' + (cx - k) + ' ' + (cy + k) + ' ' + (cx - r) + ' ' + cy,
    'Q' + (cx - k) + ' ' + (cy - k) + ' ' + cx + ' ' + (cy - r),
    'Z',
  ].join(' ')
}

/** 极简占位：细环 + 四芒星（素材没到时不空窗，也不冒充原徽记）。 */
function PlaceholderMark() {
  return h(
    'svg',
    { className: 'lmui-mark__fallback', viewBox: '0 0 64 64', 'aria-hidden': 'true', focusable: 'false' },
    h('circle', { cx: '32', cy: '32', r: '21.5', fill: 'none', stroke: 'currentColor', strokeWidth: '1', opacity: '0.5' }),
    h('path', { d: fourStar(32, 32, 13), fill: 'currentColor', opacity: '0.92' }),
    h('path', { d: fourStar(32, 10.5, 3.2), fill: 'currentColor', opacity: '0.55' }),
    h('path', { d: fourStar(32, 53.5, 3.2), fill: 'currentColor', opacity: '0.55' }),
  )
}

/** 单层图片（自带降级链与淡入）。 */
function MarkLayer(props) {
  const candidates = props.candidates
  const [index, setIndex] = React.useState(0)
  const [loaded, setLoaded] = React.useState(false)
  const entry = candidates[index]
  const src = entry ? entry.url : ''

  React.useEffect(() => {
    setLoaded(false)
  }, [src])
  React.useEffect(() => {
    setIndex(0)
    setLoaded(false)
  }, [candidates])
  React.useEffect(() => {
    if (typeof props.onLoadedChange === 'function') props.onLoadedChange(loaded)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded])
  React.useEffect(() => {
    if (src) return
    if (typeof props.onExhausted === 'function') props.onExhausted()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src])

  if (!src) return null
  return h(
    'span',
    {
      className: 'lmui-mark__layer lmui-mark__layer--' + props.layer,
      'data-lmui-shape': entry.kind,
    },
    h('img', {
      key: src,
      className: 'lmui-mark__media',
      src,
      alt: '',
      draggable: false,
      decoding: 'async',
      style: { opacity: loaded ? 1 : 0 },
      onLoad: () => {
        setLoaded(true)
        if (typeof props.onResolved === 'function') props.onResolved(entry.kind)
      },
      onError: () => {
        setLoaded(false)
        setIndex((prev) => prev + 1)
      },
    }),
  )
}

/** 徽记主体：深色用白色图案，浅色优先淡金图案。 */
function MarkGlyph(props) {
  const rawSize = Number(props.size)
  const size = Number.isFinite(rawSize) && rawSize > 0 ? Math.round(rawSize) : 24
  const variant = VARIANT_DEFS[props.variant] ? props.variant : 'phanes'
  const scheme = useScheme()
  const primary = React.useMemo(() => primaryCandidates(variant, size, scheme), [variant, size, scheme])
  const gold = React.useMemo(() => goldCandidates(variant), [variant])
  const [whiteLoaded, setWhiteLoaded] = React.useState(false)
  const [goldLoaded, setGoldLoaded] = React.useState(false)
  const [goldBroken, setGoldBroken] = React.useState(false)
  const [resolvedKind, setResolvedKind] = React.useState('')

  React.useEffect(() => {
    setWhiteLoaded(false)
    setGoldLoaded(false)
    setGoldBroken(false)
    setResolvedKind('')
  }, [variant, size, scheme])

  /* 新素材（彩色/黑描边白主体）自带完整外观，不再叠旧淡金层 */
  const isNewArt = resolvedKind.indexOf('new-') === 0
  const hasGoldLayer = gold.length > 0 && !goldBroken && !isNewArt
  const showPlaceholder = !whiteLoaded && !goldLoaded
  const shapeKind = (primary[0] && primary[0].kind) || 'image'

  return h(
    'span',
    {
      className: 'lmui-mark' + (props.className ? ' ' + props.className : ''),
      style: { width: size + 'px', height: size + 'px' },
      'data-lmui-size': size < 26 ? 'compact' : 'normal',
      'data-lmui-variant': variant,
      'data-lmui-shape': shapeKind,
      'data-lmui-gold': hasGoldLayer ? '1' : '0',
      'aria-hidden': 'true',
    },
    showPlaceholder ? h(PlaceholderMark, null) : null,
    h(MarkLayer, {
      layer: 'white',
      candidates: primary,
      onLoadedChange: setWhiteLoaded,
      onResolved: setResolvedKind,
    }),
    hasGoldLayer
      ? h(MarkLayer, {
          layer: 'gold',
          candidates: gold,
          onLoadedChange: setGoldLoaded,
          onExhausted: () => setGoldBroken(true),
        })
      : null,
  )
}

function SidebarMark(props) {
  const cfg = useMirrorConfig(props && props.store)
  return h(MarkGlyph, {
    size: props && props.size ? props.size : 26,
    variant: cfg.brandMark || 'phanes',
  })
}

function HeroMark(props) {
  const cfg = useMirrorConfig(props && props.store)
  return h(MarkGlyph, {
    size: props && props.size ? props.size : 34,
    variant: cfg.brandMark || 'phanes',
    className: 'lmui-hero-mark',
  })
}

function BrandName() {
  const displayName = '⌈' + UI_COPY.brandName + '⌋'
  return h(
    'span',
    { className: 'lmui-brand-name', 'data-lmui-brand-name': '' },
    h('span', { className: 'lmui-brand-name__main' }, displayName),
    h('span', { className: 'lmui-brand-name__sub' }, UI_COPY.brandSub),
  )
}

function bindStore(store, Component) {
  const Bound = (props) => h(Component, Object.assign({}, props, { store }))
  Bound.displayName = 'LMUI(' + (Component.name || 'Slot') + ')'
  return Bound
}

/**
 * 注册品牌三槽。
 * @param {object} ctx Cordis 客户端上下文
 * @param {object} store 配置 store
 * @param {Function} keep 收集 disposer
 */
export function registerBrand(ctx, store, keep) {
  if (!ctx || !ctx.slots) return
  const slots = ctx.slots
  const remember = typeof keep === 'function' ? keep : () => {}

  const put = (slotName, options, Component) => {
    if (typeof slots.inject !== 'function' || typeof slots.register !== 'function') return
    try {
      const off = slots.inject(slotName, () => slots.register(options, bindStore(store, Component)))
      if (typeof off === 'function') remember(off)
    } catch (e) {
      /* 某槽未声明时不影响其它槽 */
    }
  }

  put('sidebar.brand.mark', { name: 'sidebar.brand.mark', priority: BRAND_PRIORITY }, SidebarMark)
  put('sidebar.brand.name', { name: 'sidebar.brand.name', priority: BRAND_PRIORITY }, BrandName)
  put(
    'conversation.hero.brand.mark',
    { name: 'conversation.hero.brand.mark', priority: BRAND_PRIORITY },
    HeroMark,
  )
}

export { MarkGlyph, BRAND_PRIORITY, VARIANT_DEFS }
