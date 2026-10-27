/**
 * 光之镜 · 天空岛 — 白场 → 真实主界面 WebGL 撕裂转场（v6）
 * ---------------------------------------------------------------------------
 * 与 v5 的区别：不再把「主界面背景图」当新场景纹理绘制。
 * 画布使用 **透明 alpha**，白场撕裂后直接透出下方真实主界面（DOM），
 * 所以过渡终点天然就是真实 UI，不会出现"粗糙的 PV 画面先出现再消失"。
 *
 * 效果组合：
 *   - 预热（0–15%）：近白画面 + 稀疏细灰竖线；
 *   - 拉伸（15–45%）：逐列随机纵向拉伸/拖影、线宽与明暗差异、蓝橙色差；
 *   - 撕裂（45–80%）：竖条按随机阈值分批消失为透明洞（露出真实 UI），
 *                   边缘带 RGB 色散 + 明暗反转条 + 纵向 smear；
 *   - 稳定（80–100%）：剩余白条快速退去，alpha 归零。
 *
 * 片元里同时实现：y' = y + A(x,t)*N(y,t) 的纵向扰动、RGB 三通道 x 偏移、
 * 按竖条分组不同步的显露（α 分组），与用户给的参考方案一致。
 */

const VERT = [
  'attribute vec2 a_pos;',
  'varying vec2 v_uv;',
  'void main() {',
  '  v_uv = a_pos * 0.5 + 0.5;',
  '  gl_Position = vec4(a_pos, 0.0, 1.0);',
  '}',
].join('\n')

const FRAG = [
  'precision highp float;',
  'varying vec2 v_uv;',
  'uniform vec2 u_res;',
  'uniform float u_p;',
  'uniform float u_t;',
  'float hash(float n) { return fract(sin(n) * 43758.5453123); }',
  'void main() {',
  '  vec2 uv = v_uv;',
  '  float p = clamp(u_p, 0.0, 1.0);',
  '  float px = uv.x * u_res.x;',
  '  float pre = 1.0 - smoothstep(0.0, 0.15, p);',
  '  float stretch = smoothstep(0.10, 0.32, p) * (1.0 - smoothstep(0.74, 0.98, p));',
  '  float tear = smoothstep(0.32, 0.58, p) * (1.0 - smoothstep(0.86, 1.0, p));',
  '  /* 全高竖条：每条有随机宽度与随机显露起点；覆盖从 100% 逐渐收窄，',
  '     竖条贯穿整个画面高度（alpha 只与 x 有关），不做上下分段。 */',
  '  float cellW = mix(5.0, 52.0, hash(floor(px / 13.0)));',
  '  float cell = floor(px / cellW);',
  '  float lp = fract(px / cellW);',
  '  float r1 = hash(cell * 1.37 + 2.1);',
  '  float r2 = hash(cell * 2.71 + 7.3);',
  '  float startP = 0.16 + r1 * 0.58;',
  '  float local = clamp((p - startP) / 0.24, 0.0, 1.0);',
  '  local = local * local * (3.0 - 2.0 * local);',
  '  /* 目标残留比例：大部分条完全消失，少数保留成最终场景的细光柱 */',
  '  float targetW = (r2 > 0.86 ? mix(0.10, 0.28, hash(cell * 5.9)) : 0.0);',
  '  float barW = mix(1.0, targetW, local);',
  '  /* 边缘轻微纵向不规则（正弦扰动边界 x，不切断竖条） */',
  '  float wobble = (sin(uv.y * 7.0 + r1 * 6.283) * 0.018 + sin(uv.y * 23.0 + r2 * 6.283) * 0.008) * (0.5 + 0.5 * tear);',
  '  float center = 0.5 + (r2 - 0.5) * 0.10;',
  '  float halfW = max(0.0, barW) * 0.5;',
  '  float d = abs(lp - center + wobble);',
  '  float aa = 0.012 + 0.02 * stretch;',
  '  float bar = 1.0 - smoothstep(halfW - aa, halfW + aa, d);',
  '  /* 细光柱/拉丝：竖向拉伸感来自条内的长条亮暗纹理（全高） */',
  '  float streak = 0.5 + 0.5 * sin(uv.y * 41.0 + r1 * 6.283 + u_t * 3.0);',
  '  streak *= 0.5 + 0.5 * sin(uv.y * 9.0 - r2 * 4.0 + u_t * 1.7);',
  '  vec3 white = vec3(0.972, 0.976, 1.0);',
  '  white *= 0.90 + 0.10 * streak;',
  '  /* 明暗反转条（少量条在撕裂阶段变暗，增强故障感） */',
  '  float invMask = step(0.80, r1) * smoothstep(0.30, 0.55, p) * (1.0 - smoothstep(0.80, 0.96, p));',
  '  vec3 col = mix(white, vec3(0.10, 0.10, 0.13), invMask * 0.55);',
  '  /* 色差只在竖条两侧：一侧暖橙、一侧冷青（避免紫色偏色） */',
  '  float edgeDist = abs(d - halfW);',
  '  float fringe = smoothstep(0.0, 0.018 + 0.02 * stretch, edgeDist);',
  '  float fringeAmt = (0.35 * stretch + 0.55 * tear) * (1.0 - local * 0.5);',
  '  float side = sign(lp - center);',
  '  col += vec3(0.10, 0.045, -0.02) * (1.0 - fringe) * fringeAmt * step(0.0, side);',
  '  col += vec3(-0.02, 0.045, 0.11) * (1.0 - fringe) * fringeAmt * step(side, 0.0);',
  '  /* 预热阶段整屏近白 */',
  '  col = mix(vec3(1.0), col, smoothstep(0.0, 0.10, p));',
  '  /* alpha = 白条覆盖；条外露出下方真实 DOM */',
  '  float alpha = bar;',
  '  alpha *= 1.0 - smoothstep(0.94, 1.0, p);',
  '  alpha = clamp(alpha, 0.0, 1.0);',
  '  /* 标准预乘 alpha 输出（浏览器按同一规则与 DOM 合成） */',
  '  gl_FragColor = vec4(col * alpha, alpha);',
  '}',
].join('\n')

function compile(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader)
    gl.deleteShader(shader)
    throw new Error('shader compile: ' + info)
  }
  return shader
}

export function createTransition(canvas) {
  const gl = canvas
    ? canvas.getContext('webgl', {
        alpha: true,
        antialias: false,
        premultipliedAlpha: true,
        preserveDrawingBuffer: true,
      })
    : null
  if (!gl) {
    return {
      supported: false,
      render: function () {},
      resize: function () {},
      dispose: function () {},
      setNewImage: function () {},
    }
  }

  let program = null
  let buffer = null
  let aPos = null
  const uni = {}
  try {
    const vs = compile(gl, gl.VERTEX_SHADER, VERT)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
    program = gl.createProgram()
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('link failed')
    buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    aPos = gl.getAttribLocation(program, 'a_pos')
    uni.res = gl.getUniformLocation(program, 'u_res')
    uni.p = gl.getUniformLocation(program, 'u_p')
    uni.t = gl.getUniformLocation(program, 'u_t')
  } catch (error) {
    return {
      supported: false,
      render: function () {},
      resize: function () {},
      dispose: function () {},
      setNewImage: function () {},
    }
  }

  function resize() {
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const w = Math.max(2, Math.round(rect.width || window.innerWidth))
    const h = Math.max(2, Math.round(rect.height || window.innerHeight))
    const dpr = Math.min(2, Math.max(1, window.devicePixelRatio || 1))
    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)
    gl.viewport(0, 0, canvas.width, canvas.height)
  }

  function render(progress, timeSec) {
    if (!canvas) return
    if (!canvas.width) resize()
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)
    gl.uniform2f(uni.res, canvas.width, canvas.height)
    gl.uniform1f(uni.p, Math.max(0, Math.min(1, progress)))
    gl.uniform1f(uni.t, timeSec || 0)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  }

  function dispose() {
    try {
      if (program) gl.deleteProgram(program)
      if (buffer) gl.deleteBuffer(buffer)
    } catch (error) {
      /* noop */
    }
  }

  return {
    supported: true,
    render: render,
    resize: resize,
    setNewImage: function () {},
    dispose: dispose,
  }
}
