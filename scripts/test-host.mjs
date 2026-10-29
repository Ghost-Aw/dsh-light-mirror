#!/usr/bin/env node
/* ============================================================================
 * dsh-light-mirror — Host 半侧单元测试（不安装插件、不接触真实 profile）
 * ----------------------------------------------------------------------------
 * 用 fake webServer / fake connection 驱动 index.js：
 *   - 路由注册完整性（config / health / splash.css / splash.js / media）
 *   - config GET/POST/reset、字段规整
 *   - media 路由 404 / 目录穿越防护
 *   - tapIndex 注入（有/无）与幂等
 *   - 浏览器信任栅栏（connection.requestRejection）
 *   - 插件导出形状（apply/inject/name）
 * ========================================================================== */

import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { EventEmitter } from 'node:events'
import { Writable, finished } from 'node:stream'
import { VERSION } from '../src/shared/content.js'

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const TMP_HOME = fs.mkdtempSync(path.join(os.tmpdir(), 'lm-host-test-'))
process.env.DSH_HOME = TMP_HOME

const results = []
function check(name, fn) {
  try {
    fn()
    results.push(['ok  ', name])
  } catch (error) {
    results.push(['FAIL', name + ' :: ' + (error && error.message)])
  }
}
async function checkAsync(name, fn) {
  try {
    await fn()
    results.push(['ok  ', name])
  } catch (error) {
    results.push(['FAIL', name + ' :: ' + (error && error.message)])
  }
}

function makeRes() {
  return {
    statusCode: 0,
    headers: null,
    body: Buffer.alloc(0),
    ended: false,
    writeHead(code, headers) {
      this.statusCode = code
      this.headers = headers || null
    },
    end(chunk) {
      this.ended = true
      if (chunk === undefined || chunk === null) return
      this.body = Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk))
    },
    destroy() {
      this.ended = true
    },
  }
}

function makeReq(url, method = 'GET') {
  const req = new EventEmitter()
  req.url = url
  req.method = method
  req.headers = {}
  return req
}

function makePostReq(url, payload) {
  const req = makeReq(url, 'POST')
  const text = typeof payload === 'string' ? payload : JSON.stringify(payload)
  setImmediate(() => {
    req.emit('data', Buffer.from(text, 'utf8'))
    req.emit('end')
  })
  return req
}

function createCtx({ reject } = {}) {
  const server = {
    routes: [],
    taps: [],
    register(route) {
      this.routes.push(route)
      return () => {}
    },
    tapIndex(fn) {
      this.taps.push(fn)
      return () => {}
    },
  }
  const effectCleanups = []
  const ctx = {
    get(name) {
      if (name === 'webServer') return server
      if (name === 'connection') {
        return {
          requestRejection() {
            return reject === undefined ? undefined : reject
          },
        }
      }
      return undefined
    },
    effect(cb) {
      const cleanup = cb()
      if (typeof cleanup === 'function') effectCleanups.push(cleanup)
      return () => cleanup && cleanup()
    },
    logger: { info() {}, warn() {}, error() {}, debug() {} },
  }
  return { ctx, server, effectCleanups }
}

function routeFor(server, pathname) {
  return server.routes.find((route) =>
    route.kind === 'exact' ? route.path === pathname : pathname.startsWith(route.path),
  )
}

const BASE_HTML = '<!doctype html><html><head><title>DSH</title></head><body><div id="root"></div></body></html>'

process.env.DSH_HOME = TMP_HOME
const mod = await import(pathToFileURL(path.join(ROOT, 'index.js')).href)

/* ── 导出形状 ───────────────────────────────────────────────────────── */
check('导出 shape：name/inject/apply', () => {
  assert.equal(mod.name, 'dsh-light-mirror')
  assert.deepEqual(mod.inject, ['webServer', 'connection'])
  assert.equal(typeof mod.apply, 'function')
})

/* ── apply + 路由 ───────────────────────────────────────────────────── */
const { ctx, server, effectCleanups } = createCtx()
mod.apply(ctx)

check('apply 注册了 6 条路由', () => {
  assert.equal(server.routes.length, 6)
})
check('路由清单完整', () => {
  const paths = server.routes.map((route) => route.path)
  for (const expected of [
    '/light-mirror/config',
    '/light-mirror/splash.css',
    '/light-mirror/splash.js',
    '/light-mirror/health',
    '/light-mirror/metrics',
    '/light-mirror/media',
  ]) {
    assert.ok(paths.includes(expected), '缺少路由 ' + expected)
  }
})
check('注册了 tapIndex', () => {
  assert.equal(server.taps.length, 1)
})

/* ── config GET/POST ────────────────────────────────────────────────── */
await checkAsync('config GET 返回默认配置', async () => {
  const req = makeReq('/light-mirror/config')
  const res = makeRes()
  await routeFor(server, '/light-mirror/config').handler(req, res)
  assert.equal(res.statusCode, 200)
  const body = JSON.parse(res.body.toString('utf8'))
  assert.equal(body.ok, true)
  assert.equal(body.config.enabled, true)
  assert.equal(body.config.splashMode, 'session')
  assert.ok(body.defaults)
  assert.ok(fs.existsSync(path.join(TMP_HOME, 'light-mirror.json')) === false)
})

await checkAsync('config POST 保存并规整字段', async () => {
  const req = makePostReq('/light-mirror/config', {
    patch: {
      splashMode: 'daily',
      uiMode: 'terminal',
      voiceVolume: -1,
      enabled: false,
      unknownKey: 1,
    },
  })
  const res = makeRes()
  await routeFor(server, '/light-mirror/config').handler(req, res)
  assert.equal(res.statusCode, 200)
  const body = JSON.parse(res.body.toString('utf8'))
  assert.equal(body.config.splashMode, 'daily')
  assert.equal(body.config.voiceVolume, 0)
  assert.equal(body.config.uiMode, 'terminal')
  assert.equal(body.config.enabled, false)
  assert.equal('unknownKey' in body.config, false)
  assert.ok(fs.existsSync(path.join(TMP_HOME, 'light-mirror.json')))
})

await checkAsync('config POST invalid json → 400', async () => {
  const req = makePostReq('/light-mirror/config', '{oops')
  const res = makeRes()
  await routeFor(server, '/light-mirror/config').handler(req, res)
  assert.equal(res.statusCode, 400)
})

await checkAsync('config POST reset 恢复默认', async () => {
  const req = makePostReq('/light-mirror/config', { action: 'reset' })
  const res = makeRes()
  await routeFor(server, '/light-mirror/config').handler(req, res)
  assert.equal(res.statusCode, 200)
  const body = JSON.parse(res.body.toString('utf8'))
  assert.equal(body.config.enabled, true)
  assert.equal(body.config.splashMode, 'session')
  assert.equal(body.config.uiMode, 'auto')
})

/* ── health ─────────────────────────────────────────────────────────── */
await checkAsync('health 返回 ok', async () => {
  const req = makeReq('/light-mirror/health')
  const res = makeRes()
  await routeFor(server, '/light-mirror/health').handler(req, res)
  assert.equal(res.statusCode, 200)
  const body = JSON.parse(res.body.toString('utf8'))
  assert.equal(body.ok, true)
  assert.equal(body.name, 'dsh-light-mirror')
  assert.equal(body.version, VERSION)
})

await checkAsync('metrics 返回系统数据', async () => {
  const req = makeReq('/light-mirror/metrics')
  const res = makeRes()
  await routeFor(server, '/light-mirror/metrics').handler(req, res)
  assert.equal(res.statusCode, 200)
  const body = JSON.parse(res.body.toString('utf8'))
  assert.equal(body.ok, true)
  assert.equal(typeof body.cpu.usage, 'number')
  assert.ok(body.cpu.usage >= 0 && body.cpu.usage <= 100)
  assert.equal(typeof body.memory.usedPercent, 'number')
  assert.equal(typeof body.memory.totalBytes, 'number')
  assert.equal(typeof body.uptimeSec, 'number')
})

/* ── splash 静态资源 ────────────────────────────────────────────────── */
await checkAsync('splash.css 路由返回 text/css', async () => {
  const req = makeReq('/light-mirror/splash.css')
  const res = makeRes()
  await routeFor(server, '/light-mirror/splash.css').handler(req, res)
  assert.equal(res.statusCode, 200)
  assert.match(String(res.headers['Content-Type']), /text\/css/)
})
await checkAsync('splash.js 路由返回 javascript', async () => {
  const req = makeReq('/light-mirror/splash.js')
  const res = makeRes()
  await routeFor(server, '/light-mirror/splash.js').handler(req, res)
  assert.equal(res.statusCode, 200)
  assert.match(String(res.headers['Content-Type']), /javascript/)
})

/* ── media 路由 ─────────────────────────────────────────────────────── */
await checkAsync('media 缺失文件 → 404', async () => {
  const req = makeReq('/light-mirror/media/photo/not-exist.webp')
  const res = makeRes()
  await routeFor(server, '/light-mirror/media').handler(req, res)
  assert.equal(res.statusCode, 404)
})

await checkAsync('media 目录穿越被拒绝', async () => {
  const req = makeReq('/light-mirror/media/../../index.js')
  const res = makeRes()
  await routeFor(server, '/light-mirror/media').handler(req, res)
  assert.equal(res.statusCode, 404)
})

const iconPath = path.join(ROOT, 'media', 'art', 'icon.svg')
if (fs.existsSync(iconPath)) {
  await checkAsync('media Range 请求 → 206 且 Content-Range 正确', async () => {
    const req = makeReq('/light-mirror/media/art/icon.svg')
    req.headers.range = 'bytes=0-99'
    /* streaming 路由要求 res 是 Writable：这里用真实 Writable 捕获 pipe 输出。 */
    const chunks = []
    const res = new Writable({
      write(chunk, _encoding, callback) {
        chunks.push(chunk)
        callback()
      },
    })
    res.statusCode = 0
    res.headers = null
    res.writeHead = (code, headers) => {
      res.statusCode = code
      res.headers = headers || null
    }
    await routeFor(server, '/light-mirror/media').handler(req, res)
    await new Promise((resolve, reject) => finished(res, (error) => (error ? reject(error) : resolve())))
    assert.equal(res.statusCode, 206)
    assert.match(String(res.headers['Content-Range']), /^bytes 0-99\/\d+$/)
    assert.equal(Buffer.concat(chunks).length, 100)
  })
}

/* ── tapIndex 注入 ──────────────────────────────────────────────────── */
const injected = server.taps[0](BASE_HTML)

check('tapIndex 注入 veil/root/config/splash.js', () => {
  assert.ok(injected.includes('id="light-mirror-veil"'))
  assert.ok(injected.includes('id="light-mirror-root"'))
  assert.ok(injected.includes('__LIGHT_MIRROR__='))
  assert.ok(injected.includes('__LIGHT_MIRROR__="') === false)
  assert.ok(injected.includes('/light-mirror/splash.js'))
  assert.ok(injected.includes('/light-mirror/splash.css'))
  assert.ok(injected.includes('lm-lock'))
  assert.ok(injected.includes('</head>'))
  assert.ok(injected.indexOf('light-mirror-veil') < injected.indexOf('<div id="root">'))
})
check('tapIndex 幂等', () => {
  assert.equal(server.taps[0](injected), injected)
})
check('注入的配置是合法 JSON 且字段完整', () => {
  const match = /window\.__LIGHT_MIRROR__=(\{.*?\});\(function/.exec(injected)
  assert.ok(match, '未找到注入的配置对象')
  const cfg = JSON.parse(match[1])
  assert.equal(cfg.splashEnabled, true)
  assert.equal(cfg.splashMode, 'session')
  assert.equal(cfg.uiMode, 'auto')
  assert.equal(typeof cfg.voiceVolume, 'number')
})

/* splashEnabled=false 时不注入 */
await checkAsync('splashEnabled=false → tapIndex 不注入', async () => {
  const req = makePostReq('/light-mirror/config', { patch: { splashEnabled: false } })
  const res = makeRes()
  await routeFor(server, '/light-mirror/config').handler(req, res)
  const out = server.taps[0](BASE_HTML)
  assert.equal(out, BASE_HTML)
})

await checkAsync('恢复 splashEnabled=true 后恢复注入', async () => {
  const req = makePostReq('/light-mirror/config', { patch: { splashEnabled: true } })
  const res = makeRes()
  await routeFor(server, '/light-mirror/config').handler(req, res)
  assert.ok(server.taps[0](BASE_HTML).includes('light-mirror-root'))
})

/* ── 浏览器信任栅栏 ─────────────────────────────────────────────────── */
const blocked = createCtx({ reject: 401 })
mod.apply(blocked.ctx)
await checkAsync('requestRejection 401 → config 请求被拒绝', async () => {
  const req = makeReq('/light-mirror/config')
  const res = makeRes()
  await routeFor(blocked.server, '/light-mirror/config').handler(req, res)
  assert.equal(res.statusCode, 401)
  assert.equal(res.body.length, 0)
})

/* ── effect 清理 ────────────────────────────────────────────────────── */
check('apply 返回的 effect 可清理（disposers 可执行）', () => {
  assert.ok(effectCleanups.length >= 1)
  for (const cleanup of effectCleanups) cleanup()
})

/* ── 结果 ───────────────────────────────────────────────────────────── */
fs.rmSync(TMP_HOME, { recursive: true, force: true })
let failed = 0
for (const [tag, line] of results) {
  console.log(tag + ' ' + line)
  if (tag === 'FAIL') failed += 1
}
console.log('')
if (failed > 0) {
  console.error(`host test FAILED (${failed}/${results.length})`)
  process.exit(1)
}
console.log(`host test OK (${results.length} checks)`)
