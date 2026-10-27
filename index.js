/* ============================================================================
 * dsh-light-mirror — Host 半侧
 * ----------------------------------------------------------------------------
 * 职责：
 *   1) 在 index.html 里注入「启动动画」：首屏深空兜底 + critical CSS + 配置 + 运行时
 *   2) 提供 /light-mirror/config（配置读写）、splash.css / splash.js、media/* 静态资源
 *   3) 把配置持久化到 ~/.dsh/light-mirror.json（设置页经 HTTP API 读写）
 *
 * 配置刻意不走 settings 命名空间，而是自带 JSON + 自带设置页，避免受
 * dsh-settings 版本变更影响（同类启动界面插件的常用取舍，本实现独立）。
 * ========================================================================== */

import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  NS,
  ROUTE_BASE,
  CONFIG_NAME,
  VERSION,
  DEFAULTS,
  BOOL_KEYS,
  ENUMS,
  ENUM_ALIASES,
  RANGES,
  TEXT_KEYS,
  SPLASH,
} from './src/shared/content.js'

const PACKAGE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '.')
const MEDIA_ROOT = path.join(PACKAGE_ROOT, 'media')
const DSH_HOME = process.env.DSH_HOME || path.join(os.homedir(), '.dsh')
const CONFIG_FILE = path.join(DSH_HOME, CONFIG_NAME)

const MEDIA_PREFIX = ROUTE_BASE + '/media'

function isFalseish(value) {
  return value === false || value === 'false' || value === 0 || value === '0'
}

/** 把任意输入规整为合法配置（字段与 DEFAULTS 一一对应）。 */
export function normalize(input) {
  const out = { ...DEFAULTS }
  const src = input && typeof input === 'object' ? input : {}
  for (const key of Object.keys(DEFAULTS)) {
    if (!(key in src) || src[key] === undefined || src[key] === null) continue
    const value = src[key]
    if (BOOL_KEYS.includes(key)) {
      out[key] = value === true || value === 'true' || value === 1 || value === '1'
    } else if (ENUMS[key]) {
      const aliased = ENUM_ALIASES && ENUM_ALIASES[key] ? ENUM_ALIASES[key][value] : undefined
      const candidate = aliased !== undefined ? aliased : value
      out[key] = ENUMS[key].includes(candidate) ? candidate : DEFAULTS[key]
    } else if (RANGES[key]) {
      const [lo, hi] = RANGES[key]
      const n = Number(value)
      out[key] = Number.isFinite(n) ? Math.min(hi, Math.max(lo, n)) : DEFAULTS[key]
    } else if (TEXT_KEYS.includes(key)) {
      const text = String(value).slice(0, 48)
      out[key] = text.trim() ? text : DEFAULTS[key]
    } else {
      out[key] = value
    }
  }
  /* 旧配置迁移：曾经只有 enabled 总开关时，启动动画跟随总开关。 */
  if (src.splashEnabled === undefined && src.enabled !== undefined) {
    out.splashEnabled = !isFalseish(src.enabled) || true
  }
  return out
}

function readConfig() {
  try {
    return normalize(JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8')))
  } catch {
    return { ...DEFAULTS }
  }
}

function writeConfig(next) {
  const cfg = normalize(next)
  fs.mkdirSync(path.dirname(CONFIG_FILE), { recursive: true })
  const tmp = CONFIG_FILE + '.tmp'
  fs.writeFileSync(tmp, JSON.stringify(cfg, null, 2), 'utf8')
  fs.renameSync(tmp, CONFIG_FILE)
  return cfg
}

/* ── 启动界面静态运行时（按 mtime 缓存） ─────────────────────────────── */
function makeTextReader(rel) {
  let cache = null
  return function read() {
    const file = path.join(PACKAGE_ROOT, rel)
    try {
      const stat = fs.statSync(file)
      if (!cache || cache.mtimeMs !== stat.mtimeMs) {
        cache = { mtimeMs: stat.mtimeMs, text: fs.readFileSync(file, 'utf8') }
      }
      return cache.text
    } catch {
      return ''
    }
  }
}

const readSplashCss = makeTextReader('splash.css')
const readSplashJs = makeTextReader('splash.js')

const MIME = {
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.mp3': 'audio/mpeg',
  '.ogg': 'audio/ogg',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
}

/** 内联脚本里绝不能出现 `</script>`。 */
function safeJson(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c').replace(/\u2028|\u2029/g, '')
}

/* 首屏兜底：应用挂载前先盖住窗口，避免闪出工作台白底。
   深空底色 + 纯 CSS veil，由 html.lm-lock 驱动，动画结束/本次不播时自动撤掉。 */
const CRITICAL_CSS = [
  'html.lm-lock,html.lm-lock body{overflow:hidden!important}',
  'html.lm-lock{background:#000!important;color-scheme:dark}',
  'html.lm-lock body{background:#000!important;--dsw-specific-sidebar-fill:transparent!important;--dsw-alias-label-primary:#fff!important}',
  'html.lm-lock #light-mirror-veil{display:block}',
  '#light-mirror-veil{display:none;position:fixed;inset:0;z-index:2147482999;background:#05070f}',
  '#light-mirror-root.lm-boot{position:fixed;inset:0;z-index:2147483000;background:#05070f}',
].join('')

/* 播放判定 + 12s 兜底放行。放在 <head> 之后的最早内联脚本里执行，先锁屏再判断。 */
const BOOTSTRAP_JS = `(function(){try{
var d=document.documentElement;
d.classList.add('lm-lock');
d.setAttribute('data-lm-boot','1');
var c=window.__LIGHT_MIRROR__||{};
var root=document.getElementById('light-mirror-root');
var off=!c.splashEnabled;
var mode=c.splashMode||'session';
var today=new Date().toISOString().slice(0,10);
try{
  if(!off&&mode==='session'&&sessionStorage.getItem('light-mirror:splash-shown')==='1')off=true;
  if(!off&&mode==='daily'&&localStorage.getItem('light-mirror:splash-day')===today)off=true;
}catch(e){}
if(off){
  window.__LIGHT_MIRROR_SKIP__=true;
  d.classList.remove('lm-lock');d.removeAttribute('data-lm-boot');
  var veil=document.getElementById('light-mirror-veil');
  if(root&&root.parentNode)root.parentNode.removeChild(root);
  if(veil&&veil.parentNode)veil.parentNode.removeChild(veil);
}else{
  try{
    if(mode==='session')sessionStorage.setItem('light-mirror:splash-shown','1');
    if(mode==='daily')localStorage.setItem('light-mirror:splash-day',today);
  }catch(e){}
  window.setTimeout(function(){try{
    var r=document.getElementById('light-mirror-root');
    if(r&&r.className&&r.className.indexOf('lm-boot')!==-1){
      if(r.parentNode)r.parentNode.removeChild(r);
      var v=document.getElementById('light-mirror-veil');
      if(v&&v.parentNode)v.parentNode.removeChild(v);
      document.documentElement.classList.remove('lm-lock');
      document.documentElement.removeAttribute('data-lm-boot');
      if(document.body)document.body.style.overflow='';
      window.__LIGHT_MIRROR_FAILED__=true;
    }
  }catch(e){}},${SPLASH.failSafeMs});
}
}catch(e){}})()`

function resolveWebServer(ctx) {
  try {
    const viaGet = typeof ctx.get === 'function' ? ctx.get('webServer') : undefined
    if (viaGet) return viaGet
  } catch {
    /* 取不到就当没有 */
  }
  return ctx?.webServer
}

function hasRoutes(server) {
  return !!server && typeof server.register === 'function' && typeof server.tapIndex === 'function'
}

function apply(ctx) {
  const disposers = []
  const webServer = resolveWebServer(ctx)

  if (!hasRoutes(webServer)) {
    /* 桌面端若用 file:// + IPC 下发前端，则没有 webServer：Host 侧跳过路由与注入，
       页面由 client 半侧 selfBoot 兜底。plugin 仍保持 APPLIED，不报错。 */
    try {
      ctx?.logger?.warn?.(
        `[${NS}] 当前 profile 没有可用的 webServer；Host 侧跳过路由与首屏注入，由浏览器半侧自举。`,
      )
    } catch {
      /* 日志失败不影响加载 */
    }
    return
  }

  /* 浏览器信任栅栏：自定义路由必须过一遍，否则可被任意网页读写。 */
  function rejected(req, res) {
    try {
      const conn =
        (typeof ctx.get === 'function' ? ctx.get('connection') : undefined) || ctx?.connection
      if (!conn || typeof conn.requestRejection !== 'function') return false
      const code = conn.requestRejection(req)
      if (code === undefined || code === null || code === false) return false
      res.statusCode = typeof code === 'number' ? code : 403
      res.end()
      return true
    } catch {
      return false
    }
  }

  function registerRoute(route) {
    const inner = route && route.handler
    const wrapped = Object.assign({}, route, {
      handler: async (req, res) => {
        if (rejected(req, res)) return
        return inner(req, res)
      },
    })
    return webServer.register(wrapped)
  }

  function sendJson(res, code, payload) {
    const body = Buffer.from(JSON.stringify(payload), 'utf8')
    res.writeHead(code, {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'Content-Length': String(body.length),
    })
    res.end(body)
  }

  function sendText(res, type, text) {
    const body = Buffer.from(text, 'utf8')
    res.writeHead(200, {
      'Content-Type': type,
      'Cache-Control': 'no-store',
      'Content-Length': String(body.length),
    })
    res.end(body)
  }

  function readBody(req, limit = 64 * 1024) {
    return new Promise((resolve) => {
      let size = 0
      const chunks = []
      req.on('data', (chunk) => {
        size += chunk.length
        if (size > limit) {
          req.destroy()
          resolve('')
          return
        }
        chunks.push(chunk)
      })
      req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
      req.on('error', () => resolve(''))
    })
  }

  /* ── 配置 API ─────────────────────────────────────────────────────── */
  disposers.push(
    registerRoute({
      kind: 'exact',
      path: ROUTE_BASE + '/config',
      handler: async (req, res) => {
        const method = (req.method || 'GET').toUpperCase()
        if (method === 'GET') {
          sendJson(res, 200, {
            ok: true,
            version: VERSION,
            config: readConfig(),
            defaults: DEFAULTS,
            file: CONFIG_FILE,
          })
          return
        }
        if (method !== 'POST') {
          sendJson(res, 405, { ok: false, error: 'method not allowed' })
          return
        }
        const text = await readBody(req)
        let payload = {}
        try {
          payload = text ? JSON.parse(text) : {}
        } catch {
          sendJson(res, 400, { ok: false, error: 'invalid json' })
          return
        }
        try {
          if (payload && payload.action === 'reset') {
            sendJson(res, 200, {
              ok: true,
              version: VERSION,
              config: writeConfig(DEFAULTS),
              defaults: DEFAULTS,
            })
            return
          }
          const current = readConfig()
          const patch = payload && typeof payload.patch === 'object' && payload.patch ? payload.patch : payload
          sendJson(res, 200, {
            ok: true,
            version: VERSION,
            config: writeConfig({ ...current, ...patch }),
            defaults: DEFAULTS,
          })
        } catch (error) {
          sendJson(res, 500, { ok: false, error: String((error && error.message) || error) })
        }
      },
    }),
  )

  /* ── 启动动画静态资源 ─────────────────────────────────────────────── */
  disposers.push(
    registerRoute({
      kind: 'exact',
      path: ROUTE_BASE + '/splash.css',
      handler: (req, res) => sendText(res, 'text/css; charset=utf-8', readSplashCss()),
    }),
  )
  disposers.push(
    registerRoute({
      kind: 'exact',
      path: ROUTE_BASE + '/splash.js',
      handler: (req, res) =>
        sendText(res, 'application/javascript; charset=utf-8', readSplashJs()),
    }),
  )

  /* ── 媒体静态资源（photo / art / voice）──────────────────────────── */
  disposers.push(
    registerRoute({
      kind: 'prefix',
      path: MEDIA_PREFIX,
      handler: (req, res) => {
        const method = (req.method || 'GET').toUpperCase()
        if (method !== 'GET' && method !== 'HEAD') {
          res.writeHead(405, { Allow: 'GET, HEAD' })
          res.end()
          return
        }
        let pathname = '/'
        try {
          pathname = decodeURIComponent(String(req.url || '/').split('?')[0])
        } catch {
          res.writeHead(400)
          res.end()
          return
        }
        const rel = pathname.slice(MEDIA_PREFIX.length).replace(/^[/\\]+/, '')
        const file = path.resolve(MEDIA_ROOT, rel)
        if (!file.startsWith(MEDIA_ROOT + path.sep) || rel === '') {
          res.writeHead(404)
          res.end()
          return
        }
        let stat
        try {
          stat = fs.statSync(file)
          if (!stat.isFile()) throw new Error('not a file')
        } catch {
          res.writeHead(404, { 'Cache-Control': 'no-store' })
          res.end()
          return
        }
        const type = MIME[path.extname(file).toLowerCase()] || 'application/octet-stream'
        const size = stat.size
        const headers = {
          'Content-Type': type,
          'Accept-Ranges': 'bytes',
          'Cache-Control': 'public, max-age=3600',
        }
        let start = 0
        let end = size - 1
        const header = typeof req.headers.range === 'string' ? req.headers.range.trim() : ''
        let partial = false
        if (header) {
          const match = /^bytes=(\d*)-(\d*)$/.exec(header)
          if (!match) {
            res.writeHead(416, { 'Content-Range': `bytes */${size}` })
            res.end()
            return
          }
          if (match[1] === '') {
            const suffix = Number(match[2])
            if (!Number.isSafeInteger(suffix) || suffix <= 0) {
              res.writeHead(416, { 'Content-Range': `bytes */${size}` })
              res.end()
              return
            }
            start = Math.max(0, size - suffix)
          } else {
            start = Number(match[1])
            end = match[2] === '' ? end : Number(match[2])
          }
          if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start < 0 || start >= size || end < start) {
            res.writeHead(416, { 'Content-Range': `bytes */${size}` })
            res.end()
            return
          }
          end = Math.min(end, size - 1)
          partial = true
          headers['Content-Range'] = `bytes ${start}-${end}/${size}`
        }
        headers['Content-Length'] = String(end - start + 1)
        res.writeHead(partial ? 206 : 200, headers)
        if (method === 'HEAD' || size === 0) {
          res.end()
          return
        }
        const stream = fs.createReadStream(file, { start, end })
        stream.on('error', () => {
          try {
            res.destroy()
          } catch {
            /* gone */
          }
        })
        stream.pipe(res)
      },
    }),
  )

  /* ── 健康检查（方便本机排查，不暴露敏感信息）────────────────────── */
  disposers.push(
    registerRoute({
      kind: 'exact',
      path: ROUTE_BASE + '/health',
      handler: (req, res) => {
        const cfg = readConfig()
        sendJson(res, 200, {
          ok: true,
          name: NS,
          version: VERSION,
          file: CONFIG_FILE,
          splashEnabled: cfg.splashEnabled,
          uiEnabled: cfg.enabled,
          media: {
            photo: fs.existsSync(path.join(MEDIA_ROOT, 'photo')),
            art: fs.existsSync(path.join(MEDIA_ROOT, 'art')),
            voice: fs.existsSync(path.join(MEDIA_ROOT, 'voice')),
          },
          assets: {
            splashCss: fs.existsSync(path.join(PACKAGE_ROOT, 'splash.css')),
            splashJs: fs.existsSync(path.join(PACKAGE_ROOT, 'splash.js')),
            client: fs.existsSync(path.join(PACKAGE_ROOT, 'client.js')),
          },
        })
      },
    }),
  )

  /* ── 系统指标（观测栏用；通用措辞，不改造词）────────────────────── */
  let lastCpuSample = (() => {
    const cpus = os.cpus()
    let idle = 0
    let total = 0
    for (const cpu of cpus) {
      idle += cpu.times.idle
      total += cpu.times.user + cpu.times.nice + cpu.times.sys + cpu.times.idle + cpu.times.irq
    }
    return { idle, total, at: Date.now() }
  })()

  function cpuUsage() {
    const cpus = os.cpus()
    let idle = 0
    let total = 0
    for (const cpu of cpus) {
      idle += cpu.times.idle
      total += cpu.times.user + cpu.times.nice + cpu.times.sys + cpu.times.idle + cpu.times.irq
    }
    const now = { idle, total, at: Date.now() }
    const deltaIdle = now.idle - lastCpuSample.idle
    const deltaTotal = now.total - lastCpuSample.total
    if (deltaTotal > 0) lastCpuSample = now
    return deltaTotal > 0 ? Math.max(0, Math.min(100, (1 - deltaIdle / deltaTotal) * 100)) : 0
  }

  function readMetrics() {
    const totalMem = os.totalmem()
    const freeMem = os.freemem()
    const memory = {
      totalBytes: totalMem,
      freeBytes: freeMem,
      usedPercent: totalMem > 0 ? Math.round(((totalMem - freeMem) / totalMem) * 1000) / 10 : 0,
    }
    let disk = null
    try {
      if (typeof fs.statfsSync === 'function') {
        const st = fs.statfsSync(PACKAGE_ROOT)
        const blockSize = Number(st.bsize || st.bsize === 0 ? st.bsize : 4096) || 4096
        const totalBytes = Number(st.blocks) * blockSize
        const freeBytes = Number(st.bavail) * blockSize
        if (totalBytes > 0) {
          disk = {
            totalBytes,
            freeBytes,
            usedPercent: Math.round(((totalBytes - freeBytes) / totalBytes) * 1000) / 10,
          }
        }
      }
    } catch {
      disk = null
    }
    return {
      ok: true,
      ts: Date.now(),
      cpu: { usage: Math.round(cpuUsage() * 10) / 10, cores: os.cpus().length },
      memory,
      disk,
      uptimeSec: Math.round(os.uptime()),
    }
  }

  disposers.push(
    registerRoute({
      kind: 'exact',
      path: ROUTE_BASE + '/metrics',
      handler: (req, res) => {
        if ((req.method || 'GET').toUpperCase() !== 'GET') {
          sendJson(res, 405, { ok: false, error: 'method not allowed' })
          return
        }
        try {
          sendJson(res, 200, readMetrics())
        } catch (error) {
          sendJson(res, 500, { ok: false, error: String((error && error.message) || error) })
        }
      },
    }),
  )

  /* ── index.html 注入 ──────────────────────────────────────────────── */
  disposers.push(
    webServer.tapIndex((html) => {
      if (!html || typeof html !== 'string') return html
      if (html.includes(ROUTE_BASE + '/splash.js')) return html
      let cfg
      try {
        cfg = readConfig()
      } catch {
        return html
      }
      /* 启动动画关闭时完全不注入（页面不锁屏、不闪黑）。 */
      if (!cfg.splashEnabled) return html

      const head =
        '<style id="light-mirror-critical">' +
        CRITICAL_CSS +
        '</style>' +
        /* 同步上锁：放在 <head>、任何样式表之前，尽量消除首帧白底窗口期。 */
        "<script>try{document.documentElement.classList.add('lm-lock')}catch(e){}</script>" +
        '<link rel="stylesheet" href="' +
        ROUTE_BASE +
        '/splash.css?v=' +
        VERSION +
        '">'

      const body =
        '<div id="light-mirror-veil" aria-hidden="true"></div>' +
        '<div id="light-mirror-root" class="lm-root lm-boot"></div>' +
        '<script>window.__LIGHT_MIRROR_BOOT__="index";window.__LIGHT_MIRROR_VERSION__=' +
        safeJson(VERSION) +
        ';window.__LIGHT_MIRROR_CONFIG_URL__=' +
        safeJson(ROUTE_BASE + '/config') +
        ';window.__LIGHT_MIRROR__=' +
        safeJson(cfg) +
        ';' +
        BOOTSTRAP_JS +
        '</script>' +
        '<script defer src="' +
        ROUTE_BASE +
        '/splash.js?v=' +
        VERSION +
        '"></script>'

      let out = html
      if (out.includes('</head>')) out = out.replace('</head>', head + '</head>')
      else out = head + out
      if (out.includes('<body>')) out = out.replace('<body>', '<body>' + body)
      else if (out.includes('</body>')) out = out.replace('</body>', body + '</body>')
      else out = out + body
      return out
    }),
  )

  try {
    ctx?.logger?.info?.(
      `[${NS}] host ready: ${ROUTE_BASE}/{config,health,splash.css,splash.js,media/*}; config: ${CONFIG_FILE}`,
    )
  } catch {
    /* ignore */
  }

  ctx.effect(() => () => {
    for (const dispose of disposers) {
      try {
        dispose()
      } catch {
        /* noop */
      }
    }
  })
}

export { apply }
export const inject = ['webServer', 'connection']
export const name = NS
