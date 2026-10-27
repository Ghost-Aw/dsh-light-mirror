#!/usr/bin/env node
/* ============================================================================
 * dsh-light-mirror — 包自检
 * ----------------------------------------------------------------------------
 * 检查：
 *   1) package.json / dsh 清单 / exports 路径
 *   2) cordis.patch.yml 行 id 与包名一致
 *   3) 构建产物存在、client.js 内含 ModuleLoader 与插件 id、splash.js 含运行时 API
 *   4) locale meta title/description 完整
 *   5) icon.svg 存在且是 SVG
 *   6) content.js 声明的媒体路径在 media/ 下存在
 *   7) 源码里没有参考项目的禁用文案/色值
 *   8) 源码里没有外部网络地址（http(s):// 一律不允许，注释/文档除外用白名单）
 * ========================================================================== */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const failures = []
const warnings = []
const pass = []

function ok(message) {
  pass.push(message)
}

function fail(message) {
  failures.push(message)
}

function warn(message) {
  warnings.push(message)
}

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8')
}

function exists(rel) {
  return fs.existsSync(path.join(ROOT, rel))
}

/* ── 1. package.json ─────────────────────────────────────────────────── */
let pkg
try {
  pkg = JSON.parse(read('package.json'))
} catch (error) {
  fail('package.json 不是合法 JSON：' + error.message)
  pkg = null
}

if (pkg) {
  if (pkg.name !== 'dsh-light-mirror') fail('包名必须是 dsh-light-mirror，实际：' + pkg.name)
  if (!pkg.private) ok('包可被安装（非 private）')
  if (!pkg.repository?.url) warn('package.json 缺少 repository（可选）')
  if (pkg.type !== 'module') fail('type 必须是 module')
  if (!pkg.dsh?.bundle?.patch) fail('缺少 dsh.bundle.patch')
  if (!pkg.dsh?.client) fail('缺少 dsh.client')
  else {
    if (pkg.dsh.client.platform !== 'web') fail('dsh.client.platform 必须是 web')
    if (!Array.isArray(pkg.dsh.client.inject)) fail('dsh.client.inject 必须是数组')
  }
  for (const [key, rel] of Object.entries(pkg.exports || {})) {
    if (typeof rel !== 'string') continue
    if (rel.includes('*')) continue
    if (!exists(rel)) fail(`exports["${key}"] 指向不存在的文件：${rel}`)
  }
  if (!pkg.exports?.['.']) fail('exports 缺少 "."')
  if (!pkg.exports?.['./client']) fail('exports 缺少 "./client"')
  if (pkg.peerDependencies?.['@deepseek-ai/cordis'] !== '>=4.0.0-rc <5') {
    fail('peerDependencies @deepseek-ai/cordis 必须是 >=4.0.0-rc <5')
  }
  for (const required of ['index.js', 'client.js', 'splash.js', 'splash.css', 'cordis.patch.yml']) {
    if (!exists(required)) fail(`缺少运行文件：${required}`)
  }
}

/* ── 2. cordis.patch.yml ─────────────────────────────────────────────── */
try {
  const patch = read('cordis.patch.yml')
  if (!patch.includes("id: light-mirror")) fail('cordis.patch.yml 缺少 id: light-mirror')
  if (!patch.includes("name: 'dsh-light-mirror'")) fail('cordis.patch.yml 缺少 name: dsh-light-mirror')
  else ok('cordis.patch.yml 行定义正确')
} catch {
  fail('cordis.patch.yml 不存在')
}

/* ── 3. 构建产物 ─────────────────────────────────────────────────────── */
try {
  const client = read('client.js')
  if (!client.includes('__ModuleLoader__.load')) fail('client.js 不是 ModuleLoader bundle')
  if (!client.includes("id: 'dsh-light-mirror'")) fail('client.js 缺少 id dsh-light-mirror')
  if (!client.includes('factory: (require)')) fail('client.js 缺少 factory(require)')
  if (!client.includes("require('react')") && !client.includes('require("react")')) {
    fail('client.js 未引用 react')
  }
  if (client.length > 3_000_000) warn('client.js 体积过大：' + client.length)
  ok('client.js 结构正确（' + (client.length / 1024).toFixed(1) + ' KiB）')
} catch {
  fail('client.js 不存在（先运行 node build.mjs）')
}

try {
  const splash = read('splash.js')
  if (!splash.includes('__LIGHT_MIRROR_SPLASH__')) fail('splash.js 未暴露 __LIGHT_MIRROR_SPLASH__ API')
  if (!splash.includes('light-mirror-root')) fail('splash.js 未引用 #light-mirror-root')
  if (!splash.includes('light-mirror-veil')) fail('splash.js 未引用 #light-mirror-veil')
  const splashUrls = (splash.match(/https?:\/\/[^\s'")]+/g) || []).filter(
    (url) => !url.includes('www.w3.org') && !url.includes('127.0.0.1') && !url.includes('localhost'),
  )
  if (splashUrls.length > 0) {
    fail('splash.js 含外部网络地址（禁止）：' + splashUrls.slice(0, 3).join(', '))
  }
  ok('splash.js 结构正确（' + (splash.length / 1024).toFixed(1) + ' KiB）')
} catch {
  fail('splash.js 不存在（先运行 node build.mjs）')
}

try {
  const css = read('splash.css')
  if (!css.includes('light-mirror')) fail('splash.css 未引用插件命名空间')
  ok('splash.css 存在（' + (css.length / 1024).toFixed(1) + ' KiB）')
} catch {
  fail('splash.css 不存在（先运行 node build.mjs）')
}

/* ── 4. locale ───────────────────────────────────────────────────────── */
for (const lang of ['en', 'zh']) {
  try {
    const dict = JSON.parse(read(`locale/${lang}.json`))
    if (!dict?.meta?.title) fail(`locale/${lang}.json 缺少 meta.title`)
    if (!dict?.meta?.description) fail(`locale/${lang}.json 缺少 meta.description`)
    ok(`locale/${lang}.json 完整：${dict.meta.title}`)
  } catch (error) {
    fail(`locale/${lang}.json 不合法：` + error.message)
  }
}

/* ── 5. icon ─────────────────────────────────────────────────────────── */
try {
  const icon = read('media/art/icon.svg')
  if (!icon.trim().startsWith('<svg') && !icon.includes('<svg')) fail('media/art/icon.svg 不是 SVG')
  else ok('media/art/icon.svg 存在（' + icon.length + ' B）')
} catch {
  fail('media/art/icon.svg 缺失（resource-smith 产出）')
}

/* ── 6. 媒体资源（软检查；缺失时只警告）─────────────────────────────── */
const requiredMedia = [
  'media/photo/scene-terminal.webp',
  'media/photo/scene-wide.webp',
  'media/photo/bg-dark.webp',
  'media/photo/bg-light.webp',
  'media/art/phanes-wings.png',
  'media/art/phanes-wings-gold.png',
  'media/art/emblem-phanes-core.png',
  'media/art/pattern-terminal.png',
  'media/art/pattern-skyisland.png',
  'media/art/pattern-paimon-emoji.png',
  'media/art/pattern-paimon-avatar.png',
  'media/art/paimon-holo-guide.png',
  'media/art/paimon-holo-2.png',
  'media/art/paimon-holo-emoji.png',
  'media/art/paimon-half-guide.png',
  'media/art/knot-cutout.png',
  'media/art/paimon-guide.png',
  'media/bgm/track-01.mp3',
  'media/bgm/track-02.mp3',
  'media/bgm/track-03.mp3',
  'media/voice/line-01-link.mp3',
  'media/voice/line-02-welcome.mp3',
]
const missingMedia = requiredMedia.filter((rel) => !exists(rel))
if (missingMedia.length > 0) warn('缺少媒体资源（运行时会走降级）：' + missingMedia.join(', '))
else ok('媒体资源齐备（' + requiredMedia.length + ' 项）')

/* ── 7. 禁用文案 / 参考项目痕迹（只查会被用户看到的文案，不查注释里的机制说明）── */
const forbidden = [
  '长征机', 'LONG MARCH', '量子跃迁', '东亚防御倡议', '判罚之钉都出现了异动',
  'ACCESS PERMISSION REQUIRED', 'IDENTITY VERIFICATION', 'c70000', '#c70000',
]
const sourceFiles = [
  'index.js', 'client.js', 'splash.js', 'splash.css',
  'src/shared/content.js', 'src/client/index.js', 'src/client/theme.js',
  'src/client/decor.js', 'src/client/brand.js', 'src/client/settings.js', 'src/client/styles.js',
  'src/splash/index.js', 'src/splash/stages.js', 'src/splash/audio.js', 'src/splash/styles.css',
].filter(exists)
for (const rel of sourceFiles) {
  const text = fs.readFileSync(path.join(ROOT, rel), 'utf8')
  for (const word of forbidden) {
    if (rel === 'src/shared/content.js' && word === '判罚之钉都出现了异动') continue /* 合法人声字幕引用 */
    if (text.includes(word)) fail(`${rel} 含禁用内容：${word}`)
  }
}
ok('禁用文案巡检完成（' + sourceFiles.length + ' 个文件）')

/* ── 8. 外部网络地址巡检（Host/client/splash 源）────────────────────── */
for (const rel of ['index.js', 'src/shared/content.js', 'src/client/index.js', 'src/client/theme.js', 'src/client/decor.js', 'src/client/brand.js', 'src/client/settings.js', 'src/splash/index.js', 'src/splash/stages.js', 'src/splash/audio.js'].filter(exists)) {
  const text = fs.readFileSync(path.join(ROOT, rel), 'utf8')
  const matches = text.match(/https?:\/\/[^\s'")]+/g) || []
  const external = matches.filter(
    (url) =>
      !url.includes('127.0.0.1') &&
      !url.includes('localhost') &&
      !url.includes('www.w3.org'), /* SVG/XML 命名空间不是网络请求 */
  )
  if (external.length > 0) fail(`${rel} 含外部网络地址：` + external.slice(0, 3).join(', '))
}
ok('外部网络地址巡检完成')

/* ── 结果 ────────────────────────────────────────────────────────────── */
for (const line of pass) console.log('ok  : ' + line)
for (const line of warnings) console.log('warn: ' + line)
for (const line of failures) console.log('FAIL: ' + line)
console.log('')
if (failures.length > 0) {
  console.error(`package check FAILED (${failures.length} failures, ${warnings.length} warnings)`)
  process.exit(1)
}
console.log(`package check OK (${pass.length} passed, ${warnings.length} warnings)`)
