/**
 * 光之镜 · 天空岛 — splash v5 DOM
 * ---------------------------------------------------------------------------
 * 深色场景（#101018–#1B1A22 渐变/雾）
 *   - 下侧竖直、向上浮动的光带：左右多、中间少，整体高度呈中间凹陷（两侧高中央低）
 *   - 中央主体十字星：细长（纵臂 > 横臂），外侧边缘正弦波不规则裁剪，内侧平滑
 *   - 深色从下往上填充 → 高频抖动 → 爆发（放射光/RGB 色散/星点/环/虹彩羽状弧）→ 全屏白
 *   - 白屏后 WebGL 四阶段 glitch 转场（y'=y+A(x,t)*N(y,t)，RGB 三通道 x 偏移，分组 α）
 * 无跳过键；字幕随语音淡入淡出。
 */

import { MEDIA } from '../shared/content.js'
import {
  hyperStarPath,
  starHaloSvg,
  starBigSvg,
  starCoreSvg,
  starSmallSvg,
} from './star.js'

function resolveUrl(path) {
  if (typeof path !== 'string') return ''
  if (window.location.protocol !== 'file:') return path
  return path.replace(/^\/light-mirror\//, '../')
}

function devFallback(key) {
  try {
    const map = window.__LIGHT_MIRROR_DEV_FALLBACK__
    if (map && typeof map === 'object' && typeof map[key] === 'string') return map[key]
  } catch (error) {
    /* noop */
  }
  return ''
}

function mountImage(img) {
  if (!img) return
  const chain = []
  const primary = img.getAttribute('data-src') || ''
  if (primary) chain.push(resolveUrl(primary))
  const dev = img.getAttribute('data-dev-fallback') || ''
  if (dev) chain.push(resolveUrl(dev))
  if (!chain.length) return
  let index = 0
  const next = function () {
    if (index >= chain.length) {
      img.style.display = 'none'
      return
    }
    img.src = chain[index]
    index += 1
  }
  img.addEventListener('load', function () {
    img.classList.add('is-loaded')
  })
  img.addEventListener('error', next)
  next()
}

/* 十字星：新结构见 star.js（大白光晕/大黑/中白/小黑）。 */

/* 光带：左右多、中间少；高度中间凹陷（两侧高中央低） */
function bandsHtml() {
  const list = []
  const count = 22
  let s = 7
  const rand = function () {
    s = (s * 16807) % 2147483647
    return s / 2147483647
  }
  for (let i = 0; i < count; i += 1) {
    const side = rand() > 0.5 ? 1 : -1
    const u = Math.pow(rand(), 0.55)
    const xPct = 50 + side * u * 48
    const edge = Math.abs(xPct - 50) / 50
    const dip = 0.28 + 0.72 * Math.pow(edge, 0.8)
    const h = (0.12 + rand() * 0.3) * (0.6 + 1.1 * dip)
    const w = 2 + rand() * 10
    const delay = -rand() * 9
    const dur = 5 + rand() * 7
    const op = 0.26 + rand() * 0.5
    const warm = rand() < 0.3
    const tint = warm ? 'rgba(255,226,200,0.9)' : 'rgba(214,226,255,0.9)'
    list.push(
      '<i style="--x:' +
        xPct.toFixed(2) +
        '%;--h:' +
        (h * 100).toFixed(1) +
        '%;--w:' +
        w.toFixed(1) +
        'px;--delay:' +
        delay.toFixed(2) +
        's;--dur:' +
        dur.toFixed(2) +
        's;--op:' +
        op.toFixed(2) +
        ';--tint:' +
        tint +
        '"></i>'
    )
  }
  return list.join('')
}

/* ── v6 爆发：锐边放射光带（3 粗 + 3 细，旋转容器） ───────────────────── */
function radialsHtml() {
  /* 图13 实测：3 条粗带约 60°/178°/298°，FWHM 约 80–150px(1920)；
   * 3 条细带约 145°/234°/326°，FWHM 约 8–15px；外端在视口对角 45–65% 处衰减到 0 */
  const defs = [
    { cls: 'thick', a: 60, len: 80, w: 52 },
    { cls: 'thick', a: 178, len: 122, w: 48 },
    { cls: 'thick', a: 298, len: 82, w: 50 },
    { cls: 'thin', a: 145, len: 108, w: 8 },
    { cls: 'thin', a: 234, len: 92, w: 7 },
    { cls: 'thin', a: 326, len: 112, w: 7.5 },
  ]
  return defs
    .map(function (d) {
      return (
        '<i class="lm-radial lm-radial--' +
        d.cls +
        '" style="--a:' +
        d.a +
        'deg;--l:' +
        d.len +
        'vmax;--w:' +
        d.w +
        'px"></i>'
      )
    })
    .join('')
}

/* 爆发期额外上浮竖光条（少量 DOM） */
function riseHtml() {
  const list = []
  let s = 31
  const rand = function () {
    s = (s * 16807) % 2147483647
    return s / 2147483647
  }
  for (let i = 0; i < 6; i += 1) {
    const x = 8 + rand() * 84
    const h = 18 + rand() * 34
    const w = 1.5 + rand() * 4
    const delay = -rand() * 2
    const dur = 0.9 + rand() * 1.2
    list.push(
      '<i style="--x:' + x.toFixed(1) + '%;--h:' + h.toFixed(1) + '%;--w:' + w.toFixed(1) + 'px;--delay:' + delay.toFixed(2) + 's;--dur:' + dur.toFixed(2) + 's"></i>'
    )
  }
  return list.join('')
}

/* 模糊细长白色十字星光晕（独立 filter id，避免与主星 defs 冲突） */
function burstCrossSvg() {
  const d = hyperStarPath(300, 280, 98)
  return (
    '<svg class="lm-burstcross-svg" viewBox="0 0 400 720" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
    '<defs><filter id="lmBurstCrossBlur" x="-60%" y="-60%" width="220%" height="220%">' +
    '<feGaussianBlur stdDeviation="22"/></filter></defs>' +
    '<path d="' + d + '" fill="#ffffff" filter="url(#lmBurstCrossBlur)"/></svg>'
  )
}

export function buildScene(root, cfg, debug) {
  root.innerHTML =
    '<div class="lm-scene">' +
    '<div class="lm-bg" aria-hidden="true"></div>' +
    '<div class="lm-fog" aria-hidden="true"></div>' +
    '<div class="lm-bands" aria-hidden="true">' + bandsHtml() + '</div>' +
    '<div class="lm-star-wrap" aria-hidden="true">' +
    '<div class="lm-star-glow"></div>' +
    '<div class="lm-star-halo">' + starHaloSvg() + '</div>' +
    '<div class="lm-star-big lm-star-fill" style="clip-path:inset(100% 0 0 0)">' + starBigSvg() + '</div>' +
    '<div class="lm-star-core">' + starCoreSvg() + '</div>' +
    '<div class="lm-star-small" style="clip-path:inset(100% 0 0 0)">' + starSmallSvg() + '</div>' +
    '</div>' +
    '<div class="lm-burst" aria-hidden="true">' +
    '<div class="lm-glow"></div>' +
    '<div class="lm-radials">' + radialsHtml() + '</div>' +
    '<div class="lm-burstcross">' + burstCrossSvg() + '</div>' +
    '<div class="lm-rise">' + riseHtml() + '</div>' +
    '<div class="lm-rings"><i></i><i></i><i></i></div>' +
    '<div class="lm-dots"></div>' +
    '<div class="lm-iri"></div>' +
    '<div class="lm-sparks">' + new Array(10).fill('<i></i>').join('') + '</div>' +
    '</div>' +
    '<img class="lm-newscene" alt="" aria-hidden="true" data-src="' +
    (MEDIA.photo && MEDIA.photo.bgDark ? MEDIA.photo.bgDark : '') +
    '" data-dev-fallback="' +
    devFallback('bgDark') +
    '">' +
    '<canvas class="lm-webgl" aria-hidden="true"></canvas>' +
    '<div class="lm-white" aria-hidden="true"></div>' +
    '<div class="lm-subtitle" aria-live="polite"></div>' +
    '<div class="lm-fail" hidden></div>' +
    '</div>'

  const q = function (sel) {
    return root.querySelector(sel)
  }
  const qa = function (sel) {
    return Array.prototype.slice.call(root.querySelectorAll(sel))
  }
  const ui = {
    root: root,
    scene: q('.lm-scene'),
    bands: qa('.lm-bands > i'),
    starWrap: q('.lm-star-wrap'),
    starHalo: q('.lm-star-halo'),
    starBig: q('.lm-star-big'),
    starFill: q('.lm-star-big'),
    starCore: q('.lm-star-core'),
    starSmall: q('.lm-star-small'),
    burst: q('.lm-burst'),
    rings: qa('.lm-rings > i'),
    feather: q('.lm-feather'),
    sparks: qa('.lm-sparks > i'),
    newScene: q('.lm-newscene'),
    webgl: q('.lm-webgl'),
    white: q('.lm-white'),
    subtitle: q('.lm-subtitle'),
    debug: null,
  }

  mountImage(ui.newScene)

  if (debug && debug.stats) {
    const dbg = document.createElement('div')
    dbg.className = 'lm-debug'
    ui.scene.appendChild(dbg)
    ui.debug = dbg
  }

  ui.setSubtitle = function (text) {
    if (text) {
      ui.subtitle.textContent = text
      ui.subtitle.classList.add('is-on')
    } else {
      ui.subtitle.classList.remove('is-on')
    }
  }
  ui.setFill = function (progress) {
    const p = Math.max(0, Math.min(1, Number(progress) || 0))
    /* 大黑星先长（占填充前 72%），小黑星后长（从 42% 开始）。 */
    const big = Math.max(0, Math.min(1, p / 0.72))
    const small = Math.max(0, Math.min(1, (p - 0.42) / 0.58))
    if (ui.starBig) {
      ui.starBig.style.setProperty('--bigClip', ((1 - big) * 100).toFixed(2) + '%')
      ui.starBig.style.clipPath = 'inset(' + ((1 - big) * 100).toFixed(2) + '% 0 0 0)'
    }
    if (ui.starSmall) {
      ui.starSmall.style.setProperty('--smallClip', ((1 - small) * 100).toFixed(2) + '%')
      ui.starSmall.style.clipPath = 'inset(' + ((1 - small) * 100).toFixed(2) + '% 0 0 0)'
    }
    ui.starWrap.style.setProperty('--fill', p.toFixed(4))
  }
  ui.setShake = function (scale, scaleX) {
    ui.starWrap.style.transform = 'scale(' + Number(scale).toFixed(4) + ',' + Number(scaleX).toFixed(4) + ')'
  }
  ui.setBurst = function (on) {
    root.classList.toggle('lm-bursting', !!on)
  }
  ui.setBurstPhase = function (phase) {
    const p = Math.max(0, Math.min(3, Number(phase) || 0))
    root.classList.toggle('lm-bursting', p > 0)
    root.classList.toggle('lm-burst1', p === 1)
    root.classList.toggle('lm-burst2', p === 2)
    root.classList.toggle('lm-burst3', p === 3)
    if (p > 0 && !root.classList.contains('lm-bursting')) root.classList.add('lm-bursting')
  }
  ui.setWhite = function (on) {
    root.classList.toggle('lm-whiteout', !!on)
  }
  ui.setTransition = function (on) {
    root.classList.toggle('lm-transitioning', !!on)
  }
  ui.domCount = function () {
    return root.querySelectorAll('*').length + 1
  }
  if (debug && debug.stats && ui.debug) {
    ui.debug.hidden = false
    ui.debug.textContent = 'nodes ' + ui.domCount()
  }
  return ui
}

export { resolveUrl }
