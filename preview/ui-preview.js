/* ============================================================================
 * 光之镜 · 天空岛 — 主界面预览适配层 v2（仅开发自测用，不进插件产物）
 * ----------------------------------------------------------------------------
 * 目标：在 file:// 下用最小 __ModuleLoader__ 桩 + mock ctx 驱动 **真实构建产物**
 *       client.js 里的组件，还原 DSH 侧栏 / 会话 Hero / shell.overlay / 设置面板。
 *
 * 用法：
 *   preview/ui.html?page=shell|settings&mode=terminal|temple|auto&scheme=light|dark
 *   可选：&rail=0|1 &music=0|1 &mascot=0|1 &statusLine=0|1 &stardust=0|1 &frame=0|1
 *         &enabled=0
 *
 * 说明：mock 的 DSH 基础配色取 DSH 原生 token 明暗两套代表值（仅模拟宿主）；
 *       光之镜自己的令牌由 mock theme.overrideTokens 叠加进来。媒体文件走相对
 *       ../media/（window.__LIGHT_MIRROR_MEDIA_BASE__），素材缺失时插件自动降级。
 * ========================================================================== */

;(function () {
  'use strict'

  var React = window.React
  var ReactDOM = window.ReactDOM
  var h = React.createElement

  /* 离线预览：媒体绝对路由 → ../media/；主题/品牌/立绘加载真实素材，失败自动兜底。 */
  window.__LIGHT_MIRROR_PREVIEW__ = true
  window.__LIGHT_MIRROR_MEDIA_BASE__ = '../media/'
  window.__LIGHT_MIRROR_METRICS_URL__ = '/light-mirror/metrics'

  /* ── URL 参数 ─────────────────────────────────────────────────────────── */
  var params = new URLSearchParams(window.location.search)
  var PAGE = params.get('page') === 'settings' ? 'settings' : 'shell'
  var MODE_PARAM = params.get('mode')
  var MODE = ['terminal', 'temple', 'auto'].indexOf(MODE_PARAM) >= 0 ? MODE_PARAM : 'terminal'
  var SCHEME =
    params.get('scheme') === 'light' || params.get('scheme') === 'dark'
      ? params.get('scheme')
      : MODE === 'temple'
        ? 'light'
        : 'dark'
  var CONFIG_FILE = '~/.dsh/light-mirror.json'
  var VERSION = '2.0.0'
  /* 收窄侧栏（56px rail）预览：验证 20px 徽记与 compact 素材。 */
  var NAV_RAIL = params.get('navRail') === '1'
  var BRAND = params.get('brand') || 'phanes'
  var PAIMON_VARIANT = params.get('paimon') || 'guide'
  var BG_ON = params.has('bg') ? params.get('bg') !== '0' : true
  var BG_OPACITY = params.has('bgOpacity') ? Number(params.get('bgOpacity')) : 0.55
  var BG_MOTION = params.has('bgMotion') ? params.get('bgMotion') !== '0' : true

  function reportError(label, detail) {
    try {
      var box = document.getElementById('mock-errors')
      if (!box) return
      box.setAttribute('data-has-error', '1')
      box.textContent += '[' + label + '] ' + detail + '\n'
    } catch (e) {
      /* noop */
    }
  }
  window.addEventListener('error', function (event) {
    reportError('error', (event && event.message) || 'unknown error')
  })
  window.addEventListener('unhandledrejection', function (event) {
    var reason = event && event.reason
    reportError('rejection', String((reason && (reason.stack || reason.message)) || reason))
  })

  /* ── mock 配置（稀疏 patch；完整默认值由插件自己的 content.js 规整提供）── */
  var BOOL_PARAMS = ['enabled', 'frame', 'stardust', 'music', 'mascot', 'statusLine', 'splashEnabled']
  var mockPatch = { uiMode: MODE }
  BOOL_PARAMS.forEach(function (key) {
    if (params.has(key)) mockPatch[key] = params.get(key) !== '0' && params.get(key) !== 'false'
  })
  /* rail=1/0 只控制「开合状态」；railEnabled=0 才关闭观测栏功能。 */
  mockPatch.rail = params.has('railEnabled') ? params.get('railEnabled') !== '0' : true
  mockPatch.brandMark = BRAND
  mockPatch.paimonVariant = PAIMON_VARIANT
  mockPatch.bgEnabled = BG_ON
  mockPatch.bgOpacity = BG_OPACITY
  mockPatch.bgMotion = BG_MOTION

  /* 观测栏开合：预览里用 localStorage 预置（真实插件也是这个持久化键） */
  try {
    if (params.get('rail') === '1') window.localStorage.setItem('light-mirror:rail-open', '1')
    else if (params.get('rail') === '0') window.localStorage.setItem('light-mirror:rail-open', '0')
  } catch (e) {
    /* noop */
  }

  function jsonResponse(payload, ok) {
    return Promise.resolve({
      ok: ok !== false,
      status: ok === false ? 500 : 200,
      json: function () {
        return Promise.resolve(payload)
      },
    })
  }

  /* ── mock metrics：给观测栏一组稳定、可读的假数据（每次刷新略有变化）── */
  var metricsCalls = 0
  function metricsPayload() {
    metricsCalls += 1
    var cpu = Math.round((12 + ((metricsCalls * 17) % 28)) * 10) / 10
    var memPct = Math.round((46 + ((metricsCalls * 3) % 9)) * 10) / 10
    var diskPct = 61.4
    var GB = 1024 * 1024 * 1024
    return {
      ok: true,
      ts: Date.now(),
      cpu: { usage: cpu, cores: 16 },
      memory: {
        totalBytes: 16 * GB,
        freeBytes: Math.round(16 * GB * (1 - memPct / 100)),
        usedPercent: memPct,
      },
      disk: {
        totalBytes: 512 * GB,
        freeBytes: Math.round(512 * GB * (1 - diskPct / 100)),
        usedPercent: diskPct,
      },
      uptimeSec: 18420,
    }
  }

  window.fetch = function (input, init) {
    var url = String((input && input.url) || input || '')
    var method = String((init && init.method) || 'GET').toUpperCase()
    if (url.indexOf('/light-mirror/config') === 0) {
      if (method === 'POST') {
        var payload = {}
        try {
          payload = JSON.parse((init && init.body) || '{}')
        } catch (e) {
          payload = {}
        }
        if (payload && payload.action === 'reset') mockPatch = {}
        else if (payload && payload.patch && typeof payload.patch === 'object') {
          mockPatch = Object.assign({}, mockPatch, payload.patch)
        }
        return jsonResponse({ ok: true, version: VERSION, config: mockPatch, defaults: {}, file: CONFIG_FILE })
      }
      return jsonResponse({ ok: true, version: VERSION, config: mockPatch, defaults: {}, file: CONFIG_FILE })
    }
    if (url.indexOf('/light-mirror/metrics') === 0) {
      return jsonResponse(metricsPayload())
    }
    if (url.indexOf('/light-mirror/media/') === 0) {
      return Promise.resolve({
        ok: false,
        status: 404,
        json: function () {
          return Promise.reject(new Error('404'))
        },
      })
    }
    return Promise.reject(new Error('preview mock fetch 未实现：' + url))
  }

  /* ── mock theme 服务（对齐 DSH ThemeRuntime 的可观察行为）──────────────── */
  var themeListeners = new Set()
  var themeState = {
    preference: SCHEME,
    themes: new Map(),
    layers: new Map(),
    seq: 0,
    revision: 0,
  }
  var appliedNames = new Set()

  function themeSnapshot() {
    return {
      preference: themeState.preference,
      active: { id: themeState.preference, colorScheme: themeState.preference, tokens: {} },
      themes: Array.from(themeState.themes.values()),
      revision: themeState.revision,
    }
  }

  function applyThemeLayers() {
    var body = document.body
    if (!body) return
    appliedNames.forEach(function (name) {
      body.style.removeProperty(name)
    })
    appliedNames.clear()
    if (themeState.preference === 'dark') body.setAttribute('data-ds-dark-theme', '')
    else body.removeAttribute('data-ds-dark-theme')
    var layers = Array.from(themeState.layers.values()).sort(function (a, b) {
      return a.seq - b.seq
    })
    layers.forEach(function (layer) {
      Object.keys(layer.tokens).forEach(function (name) {
        var pair = layer.tokens[name]
        var value = pair && typeof pair === 'object' ? pair[themeState.preference] : null
        if (typeof value === 'string') {
          body.style.setProperty(name, value)
          appliedNames.add(name)
        }
      })
    })
  }

  function emitThemeChange() {
    themeState.revision += 1
    var snapshot = themeSnapshot()
    themeListeners.forEach(function (fn) {
      try {
        fn(snapshot)
      } catch (e) {
        reportError('theme listener', String(e && e.message))
      }
    })
    applyThemeLayers()
  }

  var themeService = {
    getTheme: function () {
      return themeSnapshot()
    },
    register: function (definition) {
      if (!definition || !definition.id) throw new Error('theme.register 需要 id')
      if (themeState.themes.has(definition.id)) throw new Error('duplicate theme id: ' + definition.id)
      themeState.themes.set(definition.id, definition)
      emitThemeChange()
      return function () {
        themeState.themes.delete(definition.id)
        emitThemeChange()
      }
    },
    overrideTokens: function (source, tokens) {
      var record = { tokens: Object.assign({}, tokens), seq: (themeState.seq += 1) }
      themeState.layers.set(source, record)
      emitThemeChange()
      return function () {
        if (themeState.layers.get(source) === record) {
          themeState.layers.delete(source)
          emitThemeChange()
        }
      }
    },
    setTheme: function (id) {
      if (id !== 'light' && id !== 'dark') throw new Error('preview 只模拟 light/dark')
      themeState.preference = id
      emitThemeChange()
    },
    getLayers: function () {
      return Array.from(themeState.layers.keys())
    },
  }

  /* ── mock slots（真实 DSH slot 的最小行为：inject 延迟 + register 撤销）── */
  var SLOT_KINDS = {
    'shell.overlay': 'list',
    'sidebar.brand.mark': 'single',
    'sidebar.brand.name': 'single',
    'conversation.hero.brand.mark': 'single',
    'sidebar.footer.action': 'list',
    'settings.section': 'list',
  }

  function createSlots() {
    var entries = {}
    var inserted = 0
    var version = 0
    var listeners = new Set()
    Object.keys(SLOT_KINDS).forEach(function (name) {
      entries[name] = []
    })

    function touch() {
      version += 1
      listeners.forEach(function (fn) {
        try {
          fn(version)
        } catch (e) {
          reportError('slot listener', String(e && e.message))
        }
      })
    }

    return {
      list: function (name) {
        return (entries[name] || []).slice()
      },
      single: function (name) {
        var list = entries[name] || []
        if (list.length === 0) return null
        return list.slice().sort(function (a, b) {
          var pa = typeof a.options.priority === 'number' ? a.options.priority : 0
          var pb = typeof b.options.priority === 'number' ? b.options.priority : 0
          if (pa !== pb) return pa - pb
          return a.insertedAt - b.insertedAt
        })[0]
      },
      ordered: function (name) {
        return (entries[name] || []).slice().sort(function (a, b) {
          var oa = typeof a.options.order === 'number' ? a.options.order : 0
          var ob = typeof b.options.order === 'number' ? b.options.order : 0
          if (oa !== ob) return oa - ob
          return a.insertedAt - b.insertedAt
        })
      },
      subscribe: function (fn) {
        listeners.add(fn)
        return function () {
          listeners.delete(fn)
        }
      },
      inject: function (name, factory) {
        if (!entries[name]) entries[name] = []
        var off = typeof factory === 'function' ? factory() : null
        return function () {
          if (typeof off === 'function') off()
        }
      },
      register: function (options, Component) {
        var name = options && options.name
        if (!name) throw new Error('slots.register 需要 name')
        if (!SLOT_KINDS[name]) throw new Error('未知 slot（preview mock 未声明）：' + name)
        var record = { options: options, Component: Component, insertedAt: (inserted += 1) }
        entries[name].push(record)
        touch()
        return function () {
          var list = entries[name]
          var index = list.indexOf(record)
          if (index >= 0) list.splice(index, 1)
          touch()
        }
      },
    }
  }

  var slots = createSlots()

  /* ── mock ctx ─────────────────────────────────────────────────────────── */
  var ctx = {
    theme: themeService,
    slots: slots,
    effect: function (fn) {
      try {
        var off = fn()
        return function () {
          if (typeof off === 'function') off()
        }
      } catch (e) {
        reportError('ctx.effect', String(e && e.stack))
        return function () {}
      }
    },
    on: function (event, handler) {
      if (event === 'theme/change') {
        themeListeners.add(handler)
        return function () {
          themeListeners.delete(handler)
        }
      }
      return function () {}
    },
    get: function (name) {
      if (name === 'theme') return themeService
      if (name === 'slots') return slots
      return undefined
    },
  }

  /* ── 加载并启动真实插件 bundle ───────────────────────────────────────── */
  function loadPlugin() {
    var definition = window.__LMUI_MODULE__
    if (!definition || typeof definition.factory !== 'function') {
      throw new Error('client.js 未被 __ModuleLoader__ 捕获；请先 node build.mjs --only=client')
    }
    var mockRequire = function (name) {
      if (name === 'react') return React
      throw new Error('预览只注入 react，插件却 require 了：' + name)
    }
    return definition.factory(mockRequire)
  }

  /* ── mock 宿主基础令牌（仅模拟 DSH，光之镜令牌会被真实插件覆盖）───────── */
  function baseCss() {
    var light = {
      '--dsw-alias-bg-base': '#ffffff',
      '--dsw-alias-bg-layer-1': '#ffffff',
      '--dsw-alias-bg-layer-2': '#ffffff',
      '--dsw-alias-bg-layer-3': '#ffffff',
      '--dsw-alias-bg-overlay': '#e9ecf2',
      '--dsw-alias-border-l1': '#0000000a',
      '--dsw-alias-border-l2': '#0000001a',
      '--dsw-alias-border-l3': '#0000001f',
      '--dsw-alias-border-l4': '#00000029',
      '--dsw-alias-brand-primary': '#0f1115',
      '--dsw-alias-label-primary': '#0f1115',
      '--dsw-alias-label-secondary': '#61666b',
      '--dsw-alias-label-tertiary': '#81858c',
      '--dsw-alias-label-primary-foreground': '#ffffff',
      '--dsw-alias-state-error-primary': '#ec1313',
      '--dsw-alias-state-idle-primary': '#d4d4d4',
      '--dsw-alias-state-success-primary': '#1f9d63',
      '--dsw-alias-state-warn-primary': '#f59e0b',
      '--dsw-alias-state-business-primary': '#4176e6',
      '--dsw-alias-interactive-bg-hover': '#2631480f',
      '--dsw-alias-interactive-bg-active': '#2631481a',
      '--dsw-specific-sidebar-fill': '#f9fafb',
      '--dsw-alias-bg-mask-1': '#0000003d',
      '--dsw-focus-ring-color': '#4176e6',
      '--dsw-focus-ring-width': '2px',
      '--dsw-elevation-prominent': '0 16px 40px rgba(15, 17, 21, 0.16), 0 2px 8px rgba(15, 17, 21, 0.08)',
      '--dsw-radius-xs': '4px',
      '--dsw-radius-sm': '8px',
      '--dsw-radius-md': '12px',
      '--dsw-radius-lg': '16px',
      '--dsw-radius-xl': '20px',
      '--dsw-radius-panel': '28px',
    }
    var dark = {
      '--dsw-alias-bg-base': '#151517',
      '--dsw-alias-bg-layer-1': '#232324',
      '--dsw-alias-bg-layer-2': '#2c2c2e',
      '--dsw-alias-bg-layer-3': '#353638',
      '--dsw-alias-bg-overlay': '#61666b',
      '--dsw-alias-border-l1': '#ffffff0f',
      '--dsw-alias-border-l2': '#ffffff1f',
      '--dsw-alias-border-l3': '#ffffff29',
      '--dsw-alias-border-l4': '#ffffff3d',
      '--dsw-alias-brand-primary': '#f9fafb',
      '--dsw-alias-label-primary': '#f9fafb',
      '--dsw-alias-label-secondary': '#cfd3d6',
      '--dsw-alias-label-tertiary': '#adb2b8',
      '--dsw-alias-label-primary-foreground': '#0f1115',
      '--dsw-alias-state-error-primary': '#f25a5a',
      '--dsw-alias-state-idle-primary': '#545557',
      '--dsw-alias-state-success-primary': '#2ba974',
      '--dsw-alias-state-warn-primary': '#f59e0b',
      '--dsw-alias-state-business-primary': '#7aaaff',
      '--dsw-alias-interactive-bg-hover': '#ffffff14',
      '--dsw-alias-interactive-bg-active': '#ffffff1f',
      '--dsw-specific-sidebar-fill': '#1b1b1c',
      '--dsw-alias-bg-mask-1': '#00000080',
      '--dsw-focus-ring-color': '#7aaaff',
      '--dsw-focus-ring-width': '2px',
      '--dsw-elevation-prominent': '0 24px 64px rgba(0, 0, 0, 0.45), 0 2px 10px rgba(0, 0, 0, 0.3)',
      '--dsw-radius-xs': '4px',
      '--dsw-radius-sm': '8px',
      '--dsw-radius-md': '12px',
      '--dsw-radius-lg': '16px',
      '--dsw-radius-xl': '20px',
      '--dsw-radius-panel': '28px',
    }
    function tokenLines(tokens) {
      return (
        Object.keys(tokens)
          .map(function (key) {
            return '  ' + key + ': ' + tokens[key] + ';'
          })
          .join('\n') + '\n'
      )
    }
    return (
      ':root {\n' +
      '  --dsw-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif;\n' +
      tokenLines(light) +
      '}\n' +
      'body[data-ds-dark-theme] {\n' +
      tokenLines(dark) +
      '}\n'
    )
  }

  function mockCss() {
    return String.raw`
/* DSH 主界面 mock（仅预览用；配色全部走 --dsw-* 变量） */
html, body { height: 100%; }
body {
  margin: 0;
  background: var(--dsw-alias-bg-base);
  color: var(--dsw-alias-label-primary);
  font-family: var(--dsw-font-family);
  font-size: 14px;
  line-height: 22px;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
}
.mock-frame {
  position: relative;
  display: grid; grid-template-columns: 248px minmax(0, 1fr); height: 100vh;
}
.mock-frame--nav-rail { grid-template-columns: 56px minmax(0, 1fr); }
.mock-frame--nav-rail .mock-sidebar { align-items: center; padding: 10px 6px 8px; }
.mock-frame--nav-rail .mock-brand-row { justify-content: center; width: 100%; padding: 0; gap: 0; }
.mock-nav-spacer { flex: 1; }
.mock-frame--nav-rail .mock-foot-row { flex-direction: column; justify-content: center; }
.mock-frame--nav-rail .mock-settings-btn {
  margin-left: 0; width: 36px; padding: 0; justify-content: center; font-size: 0; gap: 0;
}
.mock-frame--nav-rail .mock-settings-btn span { font-size: 14px; }
.mock-sidebar {
  display: flex; flex-direction: column; gap: 6px;
  padding: 10px 8px 8px;
  background: var(--dsw-specific-sidebar-fill);
  border-right: 0.5px solid var(--dsw-alias-border-l1);
  min-height: 0;
}
.mock-brand-row {
  display: flex; align-items: center; gap: 9px;
  min-height: 42px; padding: 0 8px; border-radius: var(--dsw-radius-md);
}
.mock-fish { display: block; color: var(--dsw-alias-label-primary); opacity: 0.86; flex: none; }
.mock-fallback-brand { font-size: 12.5px; letter-spacing: 0.04em; color: var(--dsw-alias-label-secondary); }
.mock-new {
  display: flex; align-items: center; gap: 8px;
  height: 36px; padding: 0 10px; margin: 2px 2px 4px;
  border: 0.5px solid var(--dsw-alias-border-l1); border-radius: var(--dsw-radius-md);
  background: transparent; color: var(--dsw-alias-label-primary);
  font: inherit; font-size: 13px; text-align: left; cursor: pointer;
}
.mock-new:hover { background: var(--dsw-alias-interactive-bg-hover); }
.mock-search {
  height: 30px; margin: 0 2px 4px; padding: 0 10px;
  display: flex; align-items: center;
  border-radius: var(--dsw-radius-sm);
  background: var(--dsw-alias-interactive-bg-hover);
  color: var(--dsw-alias-label-tertiary); font-size: 12.5px;
}
.mock-workspace {
  display: flex; align-items: center; gap: 8px;
  margin: 0 2px 6px; padding: 6px 10px;
  border-radius: var(--dsw-radius-sm);
  color: var(--dsw-alias-label-secondary); font-size: 12.5px;
}
.mock-workspace__label { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.mock-list { flex: 1; min-height: 0; overflow: hidden; display: flex; flex-direction: column; gap: 1px; padding: 4px 0; }
.mock-group { padding: 10px 10px 4px; font-size: 10.5px; letter-spacing: 0.06em; color: var(--dsw-alias-label-tertiary); }
.mock-item {
  height: 30px; display: flex; align-items: center; gap: 8px;
  padding: 0 10px; border-radius: var(--dsw-radius-sm);
  color: var(--dsw-alias-label-secondary); font-size: 13px;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.mock-item--active { background: var(--dsw-alias-interactive-bg-active); color: var(--dsw-alias-label-primary); }
.mock-item__dot { width: 5px; height: 5px; border-radius: 50%; background: var(--dsw-alias-label-tertiary); flex: none; opacity: 0.6; }
.mock-foot { border-top: 0.5px solid var(--dsw-alias-border-l1); padding-top: 6px; display: flex; flex-direction: column; gap: 4px; }
.mock-foot-row { display: flex; align-items: center; gap: 6px; padding: 0 2px; }
.mock-settings-btn {
  margin-left: auto; display: flex; align-items: center; gap: 7px;
  height: 36px; padding: 0 10px; border: none; border-radius: var(--dsw-radius-md);
  background: transparent; color: var(--dsw-alias-label-primary); font: inherit; font-size: 13px; cursor: pointer;
}
.mock-settings-btn:hover { background: var(--dsw-alias-interactive-bg-hover); }
.mock-main { display: flex; flex-direction: column; min-width: 0; position: relative; }
.mock-header {
  height: 48px; flex: none; display: flex; align-items: center; justify-content: space-between;
  padding: 0 20px; color: var(--dsw-alias-label-secondary); font-size: 13px;
  border-bottom: 0.5px solid var(--dsw-alias-border-l1);
}
.mock-header__left, .mock-header__right { display: flex; align-items: center; gap: 10px; }
.mock-tabs {
  flex: none; height: 42px; display: flex; align-items: flex-end; gap: 22px;
  padding: 0 24px; border-bottom: 1px solid var(--dsw-alias-border-l2);
  position: relative; z-index: 1;
}
.mock-tabs .wSkVaW_tab {
  position: relative; background: none; border: none; padding: 8px 0 10px;
  color: var(--dsw-alias-label-tertiary); font: inherit; font-size: 13px; font-weight: 500; cursor: pointer;
}
.mock-tabs .wSkVaW_tab:after {
  content: ''; position: absolute; left: 0; right: 0; bottom: -1px; height: 2px;
  border-radius: 2px; background: transparent;
}
.mock-hero__head { display: flex; align-items: flex-start; gap: 8px; }
.pXSMma_previewBadge {
  align-self: flex-start; margin-top: 6px; padding: 1px 7px 0;
  border: 0.5px solid transparent; border-radius: 999px;
  font-family: var(--ds-font-family-code, monospace); font-size: 12px; line-height: 18px;
  font-weight: 500; white-space: nowrap;
}
.mock-chip {
  height: 24px; display: inline-flex; align-items: center; padding: 0 9px;
  border: 0.5px solid var(--dsw-alias-border-l2); border-radius: 999px;
  background: var(--dsw-alias-bg-layer-3);
  font-size: 11px; color: var(--dsw-alias-label-primary);
}
.mock-hero {
  flex: 1; min-height: 0; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 14px; padding: 0 48px 40px;
}
.mock-hero__title { margin: 6px 0 0; font-size: 26px; font-weight: 500; letter-spacing: 0.01em; }
.mock-hero__sub { margin: 0; font-size: 13px; color: #A2A9BB; }
html[data-lmui-scheme="light"] .mock-hero__sub { color: #5E5B60; }
/* composer 上方的一条「背景亮带」：复现真实背景亮部透过半透明输入卡的长条 */
.mock-composer-band {
  position: absolute;
  left: 8%; right: 8%; top: 46%; height: 128px;
  z-index: 0; pointer-events: none;
  background: linear-gradient(90deg, transparent 0%, var(--mock-band-color, rgba(235,235,240,.55)) 42%, rgba(255,255,255,.32) 55%, transparent 100%);
  filter: blur(14px);
}
html[data-lmui-scheme="light"] .mock-composer-band {
  --mock-band-color: rgba(255, 255, 255, 0.72);
}
.mock-main { z-index: 1; }
.mock-header, .mock-tabs, .mock-hero { position: relative; z-index: 1; }
.mock-composer {
  width: min(660px, 100%); height: 116px; margin-top: 14px;
  display: flex; flex-direction: column; justify-content: space-between;
  padding: 14px 16px 10px;
  border: 0.5px solid color-mix(in srgb, var(--dsw-alias-label-primary) 12%, transparent);
  border-radius: var(--dsw-radius-xl);
  /* before 状态：沿用宿主卡片本身的半透明底，背景亮带会透成长条；
     修复由插件 [data-composer-card] 规则接管（after 截图）。 */
  background: var(--dsw-alias-bg-layer-1);
  box-shadow: var(--dsw-elevation-prominent);
}
/* before 状态（composerFix=0）显式半透明，模拟宿主卡片透出背景亮带 */
html[data-lmui-composer="off"] .mock-composer {
  background: rgba(18, 17, 22, 0.55) !important;
}
html[data-lmui-scheme="light"][data-lmui-composer="off"] .mock-composer {
  background: rgba(255, 255, 255, 0.55) !important;
}
.mock-composer__hint { font-size: 13px; color: var(--dsw-alias-label-tertiary); }
.mock-composer__tools { display: flex; align-items: center; gap: 8px; font-size: 11.5px; color: var(--dsw-alias-label-secondary); }
.mock-composer__send {
  margin-left: auto; width: 28px; height: 28px; border-radius: 50%;
  display: grid; place-items: center; border: none; padding: 0;
  background: var(--dsw-alias-brand-primary); color: var(--dsw-alias-label-primary-foreground);
  font: inherit; font-size: 13px; cursor: pointer;
}
.mock-overlay-layer { position: absolute; inset: 0; pointer-events: none; z-index: 60; }
/* 设置面板 mock：几何对齐 DSH（800 宽 / 188 nav / 24 内容内边距） */
.mock-modal {
  position: fixed; inset: 0; z-index: 1000;
  display: flex; align-items: center; justify-content: center;
  background: var(--dsw-alias-bg-mask-1);
  backdrop-filter: blur(2px);
}
.mock-modal__panel {
  width: 800px; max-width: calc(100vw - 48px);
  height: min(800px, calc(100vh - 48px));
  display: flex; overflow: hidden;
  border: 0.5px solid var(--dsw-alias-border-l1);
  border-radius: var(--dsw-radius-panel);
  background: var(--dsw-alias-bg-layer-2);
  box-shadow: var(--dsw-elevation-prominent);
}
.mock-modal__nav { flex: none; width: 188px; padding: 22px 12px 0; display: flex; flex-direction: column; gap: 18px; }
.mock-modal__navTitle { padding: 0 12px; font-size: 16px; font-weight: 500; line-height: 24px; }
.mock-modal__navList { display: flex; flex-direction: column; gap: 4px; overflow-y: auto; }
.mock-modal__navCell {
  height: 40px; display: flex; align-items: center; gap: 8px;
  padding: 9px 16px 9px 12px; border: none; border-radius: var(--dsw-radius-md);
  background: transparent; color: var(--dsw-alias-label-primary);
  font: inherit; font-size: 14px; text-align: left; cursor: pointer;
}
.mock-modal__navCell:hover { background: var(--dsw-alias-interactive-bg-hover); }
.mock-modal__navCell--active { background: var(--dsw-alias-interactive-bg-active); }
.mock-modal__navIcon { width: 14px; height: 14px; flex: none; border-radius: 4px; background: currentColor; opacity: 0.28; }
.mock-modal__content { flex: 1; min-width: 0; display: flex; flex-direction: column; }
.mock-modal__header { flex: none; height: 54px; display: flex; align-items: flex-start; justify-content: flex-end; padding: 20px 14px 8px 10px; }
.mock-modal__close {
  width: 28px; height: 28px; display: inline-flex; align-items: center; justify-content: center;
  border: none; border-radius: var(--dsw-radius-sm); background: transparent;
  color: var(--dsw-alias-label-primary); font-size: 17px; line-height: 1; cursor: pointer;
}
.mock-modal__close:hover { background: var(--dsw-alias-interactive-bg-hover); }
.mock-modal__options { flex: 1; min-height: 0; overflow-y: auto; padding: 0 24px 24px; }
`
  }

  /* ── 预览 React 组件 ─────────────────────────────────────────────────── */
  function useSlotVersion() {
    var state = React.useState(0)
    React.useEffect(function () {
      return slots.subscribe(function () {
        state[1](function (n) {
          return n + 1
        })
      })
    }, [])
    return state[0]
  }

  function MockFish(props) {
    var size = props && props.size ? props.size : 34
    return h(
      'svg',
      { className: 'mock-fish', width: size, height: size, viewBox: '0 0 34 34', 'aria-hidden': 'true' },
      h('path', {
        d: 'M3 17 C8 9 19 7.5 25.5 12 L31 9.5 L29.6 17 L31 24.5 L25.5 22 C19 26.5 8 25 3 17 Z',
        fill: 'currentColor',
      }),
    )
  }

  function renderSingle(name, ownerProps, fallback) {
    var entry = slots.single(name)
    if (!entry) return fallback || null
    return h(entry.Component, Object.assign({}, ownerProps || {}))
  }

  function renderList(name, ownerProps) {
    var list = slots.ordered(name)
    if (list.length === 0) return null
    return list.map(function (entry, index) {
      return h(entry.Component, Object.assign({ key: 'slot-' + name + '-' + index }, ownerProps || {}))
    })
  }

  function ShellView() {
    useSlotVersion()
    return h(
      'div',
      { className: 'mock-frame' + (NAV_RAIL ? ' mock-frame--nav-rail' : '') },
      h(
        'aside',
        { className: 'mock-sidebar' + (NAV_RAIL ? ' mock-sidebar--nav-rail' : '') },
        h(
          'div',
          { className: 'mock-brand-row' },
          renderSingle('sidebar.brand.mark', { size: NAV_RAIL ? 20 : 24 }, h(MockFish, { size: NAV_RAIL ? 20 : 24 })),
          NAV_RAIL
            ? null
            : renderSingle('sidebar.brand.name', {}, h('span', { className: 'mock-fallback-brand' }, 'LOCAL BUILD')),
        ),
        NAV_RAIL
          ? h('div', { className: 'mock-nav-spacer' })
          : h(React.Fragment, null,
              h('button', { type: 'button', className: 'mock-new' }, h('span', { 'aria-hidden': 'true' }, '＋'), '新会话'),
              h('div', { className: 'mock-search' }, '搜索会话'),
              h(
                'div',
                { className: 'mock-workspace' },
                h(
                  'svg',
                  {
                    className: 'YDXeBa_folderActive',
                    width: 16,
                    height: 16,
                    viewBox: '0 0 16 16',
                    'aria-hidden': 'true',
                  },
                  h('path', {
                    d: 'M2 4.2c0-.7.6-1.2 1.2-1.2h2.4c.4 0 .8.2 1 .5l.7.9h5.5c.7 0 1.2.6 1.2 1.2v6.2c0 .7-.5 1.2-1.2 1.2H3.2c-.7 0-1.2-.5-1.2-1.2V4.2Z',
                    fill: 'currentColor',
                    opacity: 0.85,
                  }),
                ),
                h('span', { className: 'mock-workspace__label' }, '工作区 · 光之镜'),
              ),
              h(
                'div',
                { className: 'mock-list' },
                h('div', { className: 'mock-group' }, '今天'),
                h('div', { className: 'mock-item mock-item--active' }, h('span', { className: 'mock-item__dot' }), '天空岛的镜面校准'),
                h('div', { className: 'mock-item' }, h('span', { className: 'mock-item__dot' }), '终端场景构图'),
                h('div', { className: 'mock-item' }, h('span', { className: 'mock-item__dot' }), '五光白高光参数'),
                h('div', { className: 'mock-group' }, '昨天'),
                h('div', { className: 'mock-item' }, h('span', { className: 'mock-item__dot' }), '观测栏信息设计'),
                h('div', { className: 'mock-item' }, h('span', { className: 'mock-item__dot' }), '派蒙立绘动效'),
              ),
            ),
        h(
          'div',
          { className: 'mock-foot' },
          h(
            'div',
            { className: 'mock-foot-row' },
            renderList('sidebar.footer.action', { wide: !NAV_RAIL }),
            h(
              'button',
              { type: 'button', className: 'mock-settings-btn' },
              h('span', { 'aria-hidden': 'true' }, '⚙'),
              NAV_RAIL ? null : '设置',
            ),
          ),
        ),
      ),
      h(
        'main',
        { className: 'mock-main', 'data-phase': 'hero', 'data-conversation-region': 'chat' },
        h(
          'header',
          { className: 'mock-header' },
          h('div', { className: 'mock-header__left' }, h('span', null, '新会话'), h('span', { className: 'mock-chip' }, '工作区 · 光之镜')),
          h('div', { className: 'mock-header__right' }, h('span', { className: 'mock-chip' }, 'deepseek-chat'), h('span', { className: 'mock-chip' }, '默认权限')),
        ),
        h(
          'div',
          { className: 'mock-tabs' },
          h('button', { type: 'button', className: 'wSkVaW_tab wSkVaW_tabActive' }, '对话'),
          h('button', { type: 'button', className: 'wSkVaW_tab' }, '轨迹'),
        ),
        h(
          'div',
          { className: 'mock-hero' },
          h('div', { className: 'mock-composer-band', 'aria-hidden': 'true' }),
          renderSingle('conversation.hero.brand.mark', { size: 34 }, h(MockFish, { size: 34 })),
          h(
            'div',
            { className: 'mock-hero__head' },
            h('h1', { className: 'mock-hero__title' }, '今天想做什么？'),
            h('span', { className: 'pXSMma_previewBadge mock-preview-badge' }, '预览版'),
          ),
          h('p', { className: 'mock-hero__sub' }, '镜面会记住每一个愿望。'),
          h(
            'div',
            { className: 'mock-composer', 'data-composer-card': '', tabIndex: 0 },
            h('div', { className: 'mock-composer__hint' }, '向光之镜描述你的想法…'),
            h(
              'div',
              { className: 'mock-composer__tools' },
              h('span', null, '＋'),
              h('span', null, '工具'),
              h('span', null, '｜'),
              h('span', null, '上下文 12%'),
              h('button', {
                type: 'button',
                className: 'mock-composer__send uV2eYG_primary',
                'aria-hidden': 'true',
                tabIndex: -1,
              }, '↑'),
            ),
          ),
        ),
      ),
      /* shell.overlay：真实宿主里它就是 frame 的直接子节点（停靠控制器靠它找 frame） */
      h(
        'div',
        { className: 'mock-overlay-layer', 'data-shell-overlay': '', 'data-mock-overlay': '' },
        renderList('shell.overlay', {}),
      ),
    )
  }

  var NATIVE_NAV = [
    { id: 'general', order: 5, label: '通用' },
    { id: 'appearance', order: 20, label: '外观' },
    { id: 'models', order: 30, label: '模型' },
    { id: 'plugins', order: 40, label: '插件' },
    { id: 'shortcuts', order: 45, label: '快捷键' },
  ]

  function SettingsModal() {
    useSlotVersion()
    var pluginSections = slots.ordered('settings.section').map(function (entry) {
      return {
        id: String(entry.options.id || ''),
        order: typeof entry.options.order === 'number' ? entry.options.order : 0,
        label: typeof entry.options.label === 'string' ? entry.options.label : String(entry.options.id || ''),
        entry: entry,
      }
    })
    var nav = NATIVE_NAV.concat(pluginSections).sort(function (a, b) {
      return a.order - b.order
    })
    var activeId = pluginSections.length > 0 ? pluginSections[0].id : 'general'
    var activeEntry = null
    pluginSections.forEach(function (item) {
      if (item.id === activeId) activeEntry = item.entry
    })

    return h(
      'div',
      { className: 'mock-modal' },
      h(
        'div',
        { className: 'mock-modal__panel' },
        h(
          'nav',
          { className: 'mock-modal__nav' },
          h('div', { className: 'mock-modal__navTitle' }, '设置'),
          h(
            'div',
            { className: 'mock-modal__navList' },
            nav.map(function (item) {
              return h(
                'button',
                {
                  key: 'nav-' + item.id,
                  type: 'button',
                  className: 'mock-modal__navCell' + (item.id === activeId ? ' mock-modal__navCell--active' : ''),
                },
                h('span', { className: 'mock-modal__navIcon', 'aria-hidden': 'true' }),
                item.label,
              )
            }),
          ),
        ),
        h(
          'div',
          { className: 'mock-modal__content' },
          h('header', { className: 'mock-modal__header' }, h('button', { type: 'button', className: 'mock-modal__close' }, '×')),
          h(
            'div',
            { className: 'mock-modal__options' },
            activeEntry
              ? h(activeEntry.Component, { close: function () {} })
              : h('div', { className: 'mock-fallback-brand' }, 'settings.section 未注册'),
          ),
        ),
      ),
    )
  }

  function App() {
    useSlotVersion()
    return h(
      'div',
      null,
      h(ShellView),
      PAGE === 'settings' ? h(SettingsModal) : null,
    )
  }

  /* ── 启动 ────────────────────────────────────────────────────────────── */
  function boot() {
    var styleBase = document.createElement('style')
    styleBase.setAttribute('data-mock', 'dsh-base-tokens')
    styleBase.textContent = baseCss() + mockCss()
    document.head.appendChild(styleBase)
    applyThemeLayers()

    var plugin
    try {
      plugin = loadPlugin()
    } catch (error) {
      reportError('load', String((error && error.stack) || error))
      return
    }
    try {
      plugin.apply(ctx)
    } catch (error) {
      reportError('apply', String((error && error.stack) || error))
    }
    /* composer 修复的 before/after 复现开关（after 为插件默认 on）。
       插件异步读到配置后会再次把属性设回 on，这里用 MutationObserver 保持 off。 */
    if (params.get('composerFix') === '0') {
      const rootEl = document.documentElement
      const forceOff = () => {
        if (rootEl.getAttribute('data-lmui-composer') !== 'off') {
          rootEl.setAttribute('data-lmui-composer', 'off')
        }
      }
      forceOff()
      try {
        new MutationObserver(forceOff).observe(rootEl, {
          attributes: true,
          attributeFilter: ['data-lmui-composer'],
        })
      } catch (e) {
        /* noop */
      }
      setTimeout(forceOff, 500)
      setTimeout(forceOff, 1500)
    }

    /* 预览页没有启动动画运行时：给「立即预览」一个安静的 mock（不弹错误、不盖屏）。 */
    if (!window.__LIGHT_MIRROR_SPLASH__) {
      window.__LIGHT_MIRROR_SPLASH__ = {
        start: function () {},
        replay: function () {
          return Promise.resolve()
        },
        stop: function () {},
        __mock: true,
      }
    }

    window.__LMUI_PREVIEW__ = {
      params: { page: PAGE, mode: MODE, scheme: SCHEME },
      slots: slots,
      theme: themeService,
      ctx: ctx,
      getConfig: function () {
        try {
          return window.__LIGHT_MIRROR_UI__.getConfig()
        } catch (e) {
          return null
        }
      },
      isThemed: function () {
        try {
          return window.__LIGHT_MIRROR_UI__.isThemed()
        } catch (e) {
          return false
        }
      },
      resolvedMode: function () {
        try {
          return window.__LIGHT_MIRROR_UI__.resolvedMode()
        } catch (e) {
          return null
        }
      },
    }

    var rootEl = document.getElementById('mock-root')
    var bootEl = document.getElementById('mock-boot')
    if (bootEl && bootEl.parentNode) bootEl.parentNode.removeChild(bootEl)
    ReactDOM.createRoot(rootEl).render(h(App))
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot)
  } else {
    boot()
  }
})()
