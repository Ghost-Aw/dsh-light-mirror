/* 启动动画十字星（v15 新结构）：
 *   底部 大白十字星（模糊）作为光晕
 *   → 大黑十字星（从下往上生长）
 *   → 中白十字星
 *   → 小黑十字星（后段从下往上生长）
 * 轮廓：左右镜像构造；右上/左下两条双曲线边镜像出另两条，
 * 上下长、左右短，边缘平滑内凹、四尖角锐利，无边缘裁剪。 */
const STAR_VB_W = 400
const STAR_VB_H = 720
const STAR_CX = 200
const STAR_CY = 360

export function hyperStarPath(HT, HB, WH, k) {
  const kk = k || 1.8
  const n = 150
  const pts = []
  const push = function (x, y) {
    pts.push([x, y])
  }
  // top -> right
  for (let i = 0; i <= n; i += 1) {
    const t = i / n
    push(STAR_CX + WH * Math.pow(t, kk), STAR_CY - HT * Math.pow(1 - t, kk))
  }
  // right -> bottom
  for (let i = 1; i <= n; i += 1) {
    const t = i / n
    push(STAR_CX + WH * Math.pow(1 - t, kk), STAR_CY + HB * Math.pow(t, kk))
  }
  // bottom -> left
  for (let i = 1; i <= n; i += 1) {
    const t = i / n
    push(STAR_CX - WH * Math.pow(t, kk), STAR_CY + HB * Math.pow(1 - t, kk))
  }
  // left -> top
  for (let i = 1; i <= n; i += 1) {
    const t = i / n
    push(STAR_CX - WH * Math.pow(1 - t, kk), STAR_CY - HT * Math.pow(t, kk))
  }
  let d = 'M' + pts[0][0].toFixed(2) + ',' + pts[0][1].toFixed(2)
  for (let i = 1; i < pts.length; i += 1) d += 'L' + pts[i][0].toFixed(2) + ',' + pts[i][1].toFixed(2)
  return d + 'Z'
}

export function hyperStarSvg(HT, HB, WH, cls, stroke) {
  const d = hyperStarPath(HT, HB, WH)
  return (
    '<svg class="lm-star-svg ' +
    cls +
    '" viewBox="0 0 ' +
    STAR_VB_W +
    ' ' +
    STAR_VB_H +
    '" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
    '<path d="' +
    d +
    '"' +
    (stroke ? ' stroke="' + stroke + '" stroke-width="1.1"' : '') +
    '/>' +
    '</svg>'
  )
}

export function starHaloSvg() {
  return hyperStarSvg(298, 278, 126, 'lm-star-halo-svg')
}

export function starBigSvg() {
  return hyperStarSvg(266, 248, 113, 'lm-star-big-svg', 'rgba(120,122,140,0.32)')
}

export function starCoreSvg() {
  return hyperStarSvg(146, 136, 62, 'lm-star-core-svg')
}

export function starSmallSvg() {
  return hyperStarSvg(56, 52, 23.5, 'lm-star-small-svg')
}
