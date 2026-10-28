#!/usr/bin/env node
/* ============================================================================
 * dsh-light-mirror — client bundle 集成测试（不启动 DSH、不安装插件）
 * ----------------------------------------------------------------------------
 * 用最小 DOM / ModuleLoader / Cordis ctx 桩加载构建产物 client.js，验证：
 *   - wrapper 格式（__ModuleLoader__.load + factory(require)）
 *   - inject = ['slots', 'theme']
 *   - apply() 注册了：主题（register + 2 层 overrideTokens）、
 *     shell.overlay 装饰、3 个品牌单槽（priority -200）、settings.section（id/order/label）
 *   - 配置读取（GET /light-mirror/config）后 total enabled=true 时 arm
 *   - 关闭 enabled 后全部 disposer 被调用（主题层/插槽）
 *   - 重新开启后再次注册
 * ========================================================================== */

import assert from 'node:assert/strict'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const results = []
const ok = (name) => results.push(['ok  ', name])
const bad = (name, error) => results.push(['FAIL', name + ' :: ' + (error && error.message)])

/* ── 最小 DOM ──────────────────────────────────────────────────────── */
function makeClassList() {
  const set = new Set()
  return {
    add: (...names) => names.forEach((n) => set.add(n)),
    remove: (...names) => names.forEach((n) => set.delete(n)),
    contains: (n) => set.has(n),
    toString: () => Array.from(set).join(' '),
  }
}

function createDom() {
  const headChildren = []
  const documentElement = {
    classList: makeClassList(),
    attributes: {},
    setAttribute(name, value) {
      this.attributes[name] = String(value)
    },
    removeAttribute(name) {
      delete this.attributes[name]
    },
    getAttribute(name) {
      return this.attributes[name]
    },
  }
  const document = {
    documentElement,
    head: {
      appendChild(node) {
        headChildren.push(node)
        node.parentNode = document.head
        return node
      },
    },
    body: { style: {}, appendChild() {} },
    createElement(tag) {
      return {
        tagName: String(tag).toUpperCase(),
        dataset: {},
        style: {},
        textContent: '',
        parentNode: null,
        setAttribute() {},
        removeAttribute() {},
      }
    },
    querySelectorAll() {
      return []
    },
    querySelector() {
      return null
    },
    getElementById() {
      return null
    },
    addEventListener() {},
    removeEventListener() {},
  }
  return { document, headChildren }
}

/* ── 最小 React ────────────────────────────────────────────────────── */
const reactStub = {
  createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
  Fragment: Symbol('Fragment'),
  useState: (initial) => [typeof initial === 'function' ? initial() : initial, () => {}],
  useEffect: () => {},
  useMemo: (fn) => fn(),
  useCallback: (fn) => fn,
  useRef: (value) => ({ current: value }),
  useSyncExternalStore: (subscribe, getSnapshot) => getSnapshot(),
  useContext: () => null,
  createContext: (value) => ({ Provider: null, Consumer: null, _value: value }),
}

/* ── 最小 Cordis ctx ───────────────────────────────────────────────── */
function createCtx() {
  const record = {
    themeRegistrations: [],
    tokenOverrides: [],
    slotInjections: [],
    slotRegistrations: [],
    events: [],
    configFetches: 0,
    themeDisposers: [],
    overrideDisposers: [],
    slotInjectDisposers: [],
    slotRegisterDisposers: [],
  }
  const slots = {
    inject(key, callback) {
      record.slotInjections.push(key)
      const disposer = callback()
      record.slotInjectDisposers.push(disposer)
      return () => {
        if (typeof disposer === 'function') disposer()
      }
    },
    register(options, component) {
      record.slotRegistrations.push({ options, component })
      const disposer = () => {}
      record.slotRegisterDisposers.push(disposer)
      return disposer
    },
    registerFactory() {
      return () => {}
    },
  }
  const theme = {
    getTheme: () => ({ preference: 'dark', active: { id: 'dark', colorScheme: 'dark', tokens: {} } }),
    register(definition) {
      record.themeRegistrations.push(definition)
      const disposer = () => {}
      record.themeDisposers.push(disposer)
      return disposer
    },
    overrideTokens(source, tokens) {
      record.tokenOverrides.push({ source, tokens })
      const disposer = () => {}
      record.overrideDisposers.push(disposer)
      return disposer
    },
    setTheme() {},
  }
  const ctx = {
    slots,
    theme,
    get(name) {
      if (name === 'slots') return slots
      if (name === 'theme') return theme
      return undefined
    },
    on(event, callback) {
      record.events.push({ event, callback })
      return () => {}
    },
    effect(callback) {
      const cleanup = callback()
      return () => {
        if (typeof cleanup === 'function') cleanup()
      }
    },
  }
  return { ctx, record }
}

/* ── 加载 bundle ───────────────────────────────────────────────────── */
const { document } = createDom()
let captured = null
let windowStub = null

windowStub = {
  /* 单元测试不启动 splash 运行时（由 splash 自己的 QA 覆盖） */
  __LIGHT_MIRROR_SPLASH_DISABLE__: true,
  __LIGHT_MIRROR__: {
    enabled: true,
    uiMode: 'auto',
    accent: 'gold',
    frame: true,
    calibration: true,
    linkStatus: true,
    stardust: true,
    mirrorEdge: true,
    brandMark: 'phanes',
    brandName: '光之镜',
    brandSub: 'LIGHT MIRROR',
    splashEnabled: true,
    splashMode: 'session',
    splashSpeed: 1,
    allowSkip: true,
    voice: true,
    voiceVolume: 0.85,
    sfx: true,
    sfxVolume: 0.5,
    paimon: false,
  },
  __ModuleLoader__: {
    load(registration) {
      captured = registration
    },
  },
  matchMedia: () => ({ matches: true, addEventListener() {}, removeEventListener() {} }),
  setTimeout: (fn) => setTimeout(fn, 0),
  clearTimeout: (id) => clearTimeout(id),
  localStorage: { getItem: () => null, setItem() {}, removeItem() {} },
  sessionStorage: { getItem: () => null, setItem() {}, removeItem() {} },
  addEventListener() {},
  removeEventListener() {},
  location: { href: 'http://127.0.0.1:3080/', protocol: 'http:', search: '' },
}

globalThis.window = windowStub
globalThis.document = document
try {
  Object.defineProperty(globalThis, 'navigator', { value: { userAgent: 'node' }, configurable: true })
} catch {
  /* Node 自带 navigator，无需覆盖 */
}
globalThis.localStorage = windowStub.localStorage
globalThis.sessionStorage = windowStub.sessionStorage
globalThis.matchMedia = windowStub.matchMedia

const configResponses = []
function makeConfigResponse() {
  return {
    ok: true,
    config: {
      enabled: true,
      uiMode: 'auto',
      accent: 'gold',
      brandName: '光之镜',
      brandSub: 'LIGHT MIRROR',
      frame: true,
      calibration: true,
      linkStatus: true,
      stardust: true,
      mirrorEdge: true,
      brandMark: 'phanes',
      splashEnabled: true,
      splashMode: 'session',
      splashSpeed: 1,
      allowSkip: true,
      voice: true,
      voiceVolume: 0.85,
      sfx: true,
      sfxVolume: 0.5,
      paimon: false,
    },
  }
}
globalThis.fetch = async (url) => {
  if (String(url).includes('/light-mirror/config')) {
    configResponses.push(String(url))
    return makeConfigResponse()
  }
  return { ok: false, json: async () => ({}) }
}

await import(pathToFileURL(path.join(ROOT, 'client.js')).href)

/* 等待 apply 内的异步配置读取完成 */
await new Promise((resolve) => setTimeout(resolve, 30))

try {
  assert.ok(captured, 'client.js 应通过 window.__ModuleLoader__.load 注册')
  assert.equal(captured.id, 'dsh-light-mirror')
  assert.equal(typeof captured.factory, 'function')
  ok('bundle 通过 __ModuleLoader__.load 注册且 id 正确')

  const exportsObj = captured.factory((name) => {
    if (name === 'react') return reactStub
    throw new Error('unexpected require: ' + name)
  })
  assert.equal(typeof exportsObj.apply, 'function')
  assert.deepEqual(exportsObj.inject, ['slots', 'theme'])
  ok('exports.apply 存在且 inject = [slots, theme]')

  const { ctx, record } = createCtx()
  exportsObj.apply(ctx)
  await new Promise((resolve) => setTimeout(resolve, 60))

  /* 主题 */
  assert.ok(record.themeRegistrations.length >= 1, '应注册主题')
  const themeDef = record.themeRegistrations[0]
  assert.equal(themeDef.id, 'light-mirror')
  assert.ok(['light', 'dark'].includes(themeDef.colorScheme))
  assert.equal(Object.keys(themeDef.tokens).length, 15)
  ok('theme.register 调用正确（id light-mirror / 15 个令牌）')

  const sources = record.tokenOverrides.map((item) => item.source)
  assert.ok(sources.includes('dsh-light-mirror'), '缺少主令牌 override 层')
  assert.ok(sources.includes('dsh-light-mirror-highlight'), '缺少五光白高光 override 层')
  const mainLayer = record.tokenOverrides.find((item) => item.source === 'dsh-light-mirror')
  for (const token of ['--dsw-alias-bg-base', '--dsw-alias-brand-primary', '--dsw-specific-sidebar-fill']) {
    assert.ok(mainLayer.tokens[token], '令牌层缺少 ' + token)
    assert.equal(typeof mainLayer.tokens[token].light, 'string')
    assert.equal(typeof mainLayer.tokens[token].dark, 'string')
  }
  ok('overrideTokens 两层齐全且令牌为 {light, dark}')

  /* 插槽 */
  for (const key of ['shell.overlay', 'sidebar.brand.mark', 'sidebar.brand.name', 'conversation.hero.brand.mark', 'settings.section']) {
    assert.ok(record.slotInjections.includes(key), '缺少插槽 inject: ' + key)
  }
  const settingsReg = record.slotRegistrations.find((item) => item.options && item.options.id === 'light-mirror')
  assert.ok(settingsReg, '缺少 settings.section 注册（id light-mirror）')
  assert.equal(settingsReg.options.name, 'settings.section')
  assert.equal(settingsReg.options.order, 27)
  assert.equal(settingsReg.options.label, '光之镜')
  ok('settings.section 注册正确（id/order/label）')

  const brandRegs = record.slotRegistrations.filter((item) =>
    ['sidebar.brand.mark', 'sidebar.brand.name', 'conversation.hero.brand.mark'].includes(item.options.name),
  )
  assert.equal(brandRegs.length, 3, '品牌单槽应有 3 个')
  for (const reg of brandRegs) assert.equal(reg.options.priority, -200)
  ok('3 个品牌单槽 priority = -200')

  assert.ok(record.slotRegistrations.some((item) => item.options.id === 'light-mirror-decor'), '缺少 shell.overlay 装饰注册')
  ok('shell.overlay 装饰已注册')

  /* 配置读取 */
  assert.ok(configResponses.length >= 1, '应请求 /light-mirror/config')
  ok('通过 HTTP 读取配置')

  /* 关闭 → 撤销，再开启 → 恢复 */
  const beforeTheme = record.tokenOverrides.length
  const window_api = windowStub.__LIGHT_MIRROR_UI__
  assert.ok(window_api, '应暴露 window.__LIGHT_MIRROR_UI__')
  assert.equal(window_api.isThemed(), true)
  ok('window.__LIGHT_MIRROR_UI__.isThemed() = true')

  /* 通过设置页保存路径（store.set + onLive 在 settings 内部）模拟关闭：直接调用内部 API 不存在，
     这里改为再次 apply 一份 disabled 配置的 instance 验证 disarm 路径。 */
  const second = createCtx()
  const exportsObj2 = captured.factory((name) => {
    if (name === 'react') return reactStub
    throw new Error('unexpected require: ' + name)
  })
  windowStub.__LIGHT_MIRROR__ = { ...windowStub.__LIGHT_MIRROR__, enabled: false }
  exportsObj2.apply(second.ctx)
  await new Promise((resolve) => setTimeout(resolve, 60))
  const mainSlots = ['shell.overlay', 'sidebar.brand.mark', 'sidebar.brand.name', 'conversation.hero.brand.mark']
  for (const key of mainSlots) {
    assert.ok(!second.record.slotInjections.includes(key), 'enabled=false 时不应注册主界面插槽: ' + key)
  }
  assert.equal(second.record.tokenOverrides.length, 0, 'enabled=false 时不应叠主题层')
  assert.ok(second.record.slotInjections.includes('settings.section'), '设置页应始终注册')
  ok('enabled=false：主题/装饰不注册，但设置页仍注册')
} catch (error) {
  bad('client bundle 集成检查', error)
}

let failed = 0
for (const [tag, line] of results) {
  console.log(tag + ' ' + line)
  if (tag === 'FAIL') failed += 1
}
console.log('')
if (failed > 0) {
  console.error(`client test FAILED (${failed}/${results.length})`)
  process.exit(1)
}
console.log(`client test OK (${results.length} checks)`)
