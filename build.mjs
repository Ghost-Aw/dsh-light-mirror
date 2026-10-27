#!/usr/bin/env node
/* ============================================================================
 * dsh-light-mirror — 构建脚本
 * ----------------------------------------------------------------------------
 *   node build.mjs                 全量构建（client + splash + CSS + 校验）
 *   node build.mjs --only=client   只构建 client.js
 *   node build.mjs --only=splash   只构建 splash.js + splash.css
 *
 * 产物：
 *   client.js   ← src/client/index.js 打包为 CJS，再包进 DSH ModuleLoader 外壳
 *   splash.js   ← src/splash/index.js 打包为 IIFE（自包含运行时）
 *   splash.css  ← src/splash/styles.css 原样复制
 * ========================================================================== */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import { spawnSync } from 'node:child_process'

const ROOT = path.dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)

function loadEsbuild() {
  const candidates = [
    './tools/node_modules/esbuild/lib/main.js',
    './tools/node_modules/esbuild',
    'esbuild',
  ]
  for (const candidate of candidates) {
    try {
      const mod = require(candidate)
      if (mod && typeof mod.build === 'function') return mod
      if (mod && mod.default && typeof mod.default.build === 'function') return mod.default
    } catch {
      /* try next */
    }
  }
  throw new Error('未找到 esbuild：请在 light-mirror/tools 下执行 npm install esbuild（或全局安装）。')
}

const esbuild = loadEsbuild()

const args = process.argv.slice(2)
const only = (args.find((arg) => arg.startsWith('--only=')) || '').split('=')[1] || 'all'
const wantClient = only === 'all' || only === 'client'
const wantSplash = only === 'all' || only === 'splash'

const report = { builtAt: new Date().toISOString(), targets: [], warnings: [], errors: [] }

function log(line) {
  process.stdout.write(line + '\n')
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true })
}

function syntaxCheck(file) {
  const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' })
  if (result.status !== 0) {
    throw new Error(`语法检查失败：${path.relative(ROOT, file)}\n${result.stderr || result.stdout}`)
  }
}

function writeReport() {
  ensureDir(path.join(ROOT, 'lm-build'))
  fs.writeFileSync(path.join(ROOT, 'lm-build', 'build-report.json'), JSON.stringify(report, null, 2))
}

/* ── client bundle ─────────────────────────────────────────────────────── */

const CLIENT_HEAD = `/* ============================================================================
 * dsh-light-mirror — client bundle（由 build.mjs 生成，请勿手改）
 * 源：src/client/index.js
 * ========================================================================== */
window.__ModuleLoader__.load({
  id: 'dsh-light-mirror',
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
`

const CLIENT_TAIL = `
    return module.exports;
  },
});
`

async function buildClient() {
  const entry = path.join(ROOT, 'src', 'client', 'index.js')
  if (!fs.existsSync(entry)) {
    report.warnings.push('src/client/index.js 不存在，跳过 client 构建')
    log('warn: src/client/index.js 不存在，跳过 client 构建')
    return
  }
  const result = await esbuild.build({
    entryPoints: [entry],
    absWorkingDir: ROOT,
    bundle: true,
    write: false,
    format: 'cjs',
    platform: 'browser',
    target: ['es2020'],
    external: ['react'],
    legalComments: 'none',
    charset: 'utf8',
    logLevel: 'silent',
    define: { 'process.env.NODE_ENV': '"production"' },
  })
  const code = result.outputFiles.map((file) => file.text).join('\n')
  const out = CLIENT_HEAD + code + CLIENT_TAIL
  const target = path.join(ROOT, 'client.js')
  fs.writeFileSync(target, out, 'utf8')
  syntaxCheck(target)
  report.targets.push({ target: 'client.js', bytes: Buffer.byteLength(out), entry: 'src/client/index.js' })
  log(`ok: client.js (${(Buffer.byteLength(out) / 1024).toFixed(1)} KiB)`)
}

/* ── splash bundle + css ───────────────────────────────────────────────── */

async function buildSplash() {
  const entry = path.join(ROOT, 'src', 'splash', 'index.js')
  if (!fs.existsSync(entry)) {
    report.warnings.push('src/splash/index.js 不存在，跳过 splash 构建')
    log('warn: src/splash/index.js 不存在，跳过 splash 构建')
    return
  }
  const result = await esbuild.build({
    entryPoints: [entry],
    absWorkingDir: ROOT,
    bundle: true,
    write: false,
    format: 'iife',
    globalName: '__LM_SPLASH_BUNDLE__',
    platform: 'browser',
    target: ['es2020'],
    legalComments: 'none',
    charset: 'utf8',
    logLevel: 'silent',
    define: { 'process.env.NODE_ENV': '"production"' },
  })
  let code = result.outputFiles.map((file) => file.text).join('\n')
  const banner = `/* dsh-light-mirror — splash runtime（由 build.mjs 生成，请勿手改） */\n`
  const target = path.join(ROOT, 'splash.js')
  fs.writeFileSync(target, banner + code, 'utf8')
  syntaxCheck(target)
  report.targets.push({ target: 'splash.js', bytes: Buffer.byteLength(banner + code), entry: 'src/splash/index.js' })
  log(`ok: splash.js (${(Buffer.byteLength(banner + code) / 1024).toFixed(1)} KiB)`)

  const cssSource = path.join(ROOT, 'src', 'splash', 'styles.css')
  const cssTarget = path.join(ROOT, 'splash.css')
  if (fs.existsSync(cssSource)) {
    const css = fs.readFileSync(cssSource, 'utf8')
    fs.writeFileSync(cssTarget, css, 'utf8')
    report.targets.push({ target: 'splash.css', bytes: Buffer.byteLength(css), entry: 'src/splash/styles.css' })
    log(`ok: splash.css (${(Buffer.byteLength(css) / 1024).toFixed(1)} KiB)`)
  } else {
    report.warnings.push('src/splash/styles.css 不存在，跳过 splash.css 复制')
    log('warn: src/splash/styles.css 不存在，跳过 splash.css 复制')
  }
}

/* ── 资源引用巡检（只警告，不阻塞构建）───────────────────────────────── */

function checkMedia() {
  const mediaRoot = path.join(ROOT, 'media')
  const expected = [
    'photo/scene-terminal.webp',
    'photo/scene-wide.webp',
    'photo/bg-dark.webp',
    'photo/bg-light.webp',
    'art/phanes-wings.png',
    'art/phanes-wings-gold.png',
    'art/emblem-phanes-core.png',
    'art/pattern-terminal.png',
    'art/pattern-skyisland.png',
    'art/pattern-paimon-emoji.png',
    'art/pattern-paimon-avatar.png',
    'art/paimon-holo-guide.png',
    'art/paimon-holo-2.png',
    'art/paimon-holo-emoji.png',
    'art/paimon-half-guide.png',
    'art/knot-cutout.png',
    'art/paimon-guide.png',
    'art/icon.svg',
    'bgm/track-01.mp3',
    'bgm/track-02.mp3',
    'bgm/track-03.mp3',
    'voice/line-01-link.mp3',
    'voice/line-02-welcome.mp3',
  ]
  const missing = expected.filter((rel) => !fs.existsSync(path.join(mediaRoot, rel)))
  if (missing.length > 0) {
    report.warnings.push('暂时缺失的媒体资源：' + missing.join(', '))
    log('warn: 暂时缺失的媒体资源：' + missing.join(', '))
  } else {
    log('ok: media 资源齐备')
  }
}

/* ── main ─────────────────────────────────────────────────────────────── */

try {
  if (wantClient) await buildClient()
  if (wantSplash) await buildSplash()
  if (only === 'all') checkMedia()
  ensureDir(path.join(ROOT, 'lm-build'))
  writeReport()
  log('done.')
} catch (error) {
  report.errors.push(String((error && error.stack) || error))
  ensureDir(path.join(ROOT, 'lm-build'))
  writeReport()
  console.error('build failed:', (error && error.message) || error)
  process.exit(1)
}
