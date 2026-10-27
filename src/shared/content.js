/**
 * 光之镜 · 天空岛 — 唯一常量源 v2（返修版）
 * ---------------------------------------------------------------------------
 * Host（index.js）、client bundle、splash bundle 三处共享：
 *   - 插件标识与路由
 *   - 默认配置 / 枚举 / 区间（Host normalize 与客户端 FALLBACK 用同一份）
 *   - 主题令牌（终端=深色 / 神殿=灰白石浅色，两套值）
 *   - 原创文案
 *   - 媒体资源路径
 * 视觉方向见 DESIGN.md v2：五光十色的白 + 低饱和低亮度深色；金色只用于终端中央光源。
 */

export const NS = 'dsh-light-mirror'
export const ROW_ID = 'light-mirror'
export const ROUTE_BASE = '/light-mirror'
export const CONFIG_NAME = 'light-mirror.json'
export const VERSION = '2.0.0'

/** 媒体资源路由（Host 静态服务 media/ 目录）。 */
export const MEDIA = {
  photo: {
    sceneTerminal: ROUTE_BASE + '/media/photo/scene-terminal.webp',
    sceneWide: ROUTE_BASE + '/media/photo/scene-wide.webp',
    anomalyCore: ROUTE_BASE + '/media/photo/anomaly-core.webp',
    bgDark: ROUTE_BASE + '/media/photo/bg-dark.webp',
    bgLight: ROUTE_BASE + '/media/photo/bg-light.webp',
  },
  art: {
    /* 法涅斯徽记（含左右翅膀，五光白 / 淡金） */
    phanesFull: ROUTE_BASE + '/media/art/phanes-wings.png',
    phanesFullGold: ROUTE_BASE + '/media/art/phanes-wings-gold.png',
    /* 仅中央主体紧凑版（20~34px 品牌位兜底） */
    phanesCore: ROUTE_BASE + '/media/art/emblem-phanes-core.png',
    phanesCutout: ROUTE_BASE + '/media/art/emblem-phanes-cutout.png',
    /* 品牌图案：光之镜终端 / 天空岛 / 派蒙表情 / 派蒙头像 */
    patternTerminal: ROUTE_BASE + '/media/art/pattern-terminal.png',
    patternTerminalGold: ROUTE_BASE + '/media/art/pattern-terminal-gold.png',
    patternSkyisland: ROUTE_BASE + '/media/art/pattern-skyisland.png',
    patternPaimonEmoji: ROUTE_BASE + '/media/art/pattern-paimon-emoji.png',
    patternPaimonAvatar: ROUTE_BASE + '/media/art/pattern-paimon-avatar.png',
    /* 派蒙全息（观测栏立绘，三档可切换） */
    paimonHoloGuide: ROUTE_BASE + '/media/art/paimon-holo-guide.png',
    paimonHolo2: ROUTE_BASE + '/media/art/paimon-holo-2.png',
    paimonHoloEmoji: ROUTE_BASE + '/media/art/paimon-holo-emoji.png',
    /* 派蒙干净半身彩色（client 侧做动态全息更可控） */
    paimonHalfGuide: ROUTE_BASE + '/media/art/paimon-half-guide.png',
    paimonHalf2: ROUTE_BASE + '/media/art/paimon-half-2.png',
    paimonHalfEmoji: ROUTE_BASE + '/media/art/paimon-half-emoji.png',
    /* 旧素材保留（splash 兜底 / 对照） */
    knot: ROUTE_BASE + '/media/art/knot-cutout.png',
    paimon: ROUTE_BASE + '/media/art/paimon-guide.png',
    icon: ROUTE_BASE + '/media/art/icon.svg',
  },
  /* 启动动画过渡帧序列（逐帧学习 PV 192s 竖向解离） */
  seq: {
    /* 旧契约（程序化为主时保留未用） */
    dissociation: ROUTE_BASE + '/media/seq/dissociation',
    frames: 48,
    fps: 30,
    /* v4：第 192 秒 1s/30 帧真实序列（逐帧贴合用；见 media/seq/second192/frames.json） */
    second192: ROUTE_BASE + '/media/seq/second192',
    second192Frames: 30,
    second192Fps: 30,
    second192Meta: ROUTE_BASE + '/media/seq/second192/frames.json',
  },
  bgm: [
    { id: 'echo-1', title: '回响 · 神殿', src: ROUTE_BASE + '/media/bgm/track-01.mp3' },
    { id: 'echo-2', title: '回响 · 终端', src: ROUTE_BASE + '/media/bgm/track-02.mp3' },
    { id: 'echo-3', title: '回响 · 镜面', src: ROUTE_BASE + '/media/bgm/track-03.mp3' },
  ],
  voice: {
    link: ROUTE_BASE + '/media/voice/line-01-link.mp3',
    welcome: ROUTE_BASE + '/media/voice/line-02-welcome.mp3',
    lines: ROUTE_BASE + '/media/voice/lines.json',
  },
}

/** 默认配置（Host 持久化 + 客户端兜底）。 */
export const DEFAULTS = {
  /* 主界面 */
  enabled: true,
  uiMode: 'auto',          // auto | terminal | temple
  frame: true,             // 窗口四角细框
  stardust: true,          // 五光白星尘
  rail: true,              // 右侧观测栏（停靠式，不覆盖正文）
  music: true,             // 观测栏内音乐播放器
  mascot: true,            // 观测栏派蒙全息立绘
  statusLine: true,        // 右下角两行状态字
  brandMark: 'phanes',     // phanes | terminal | skyisland | paimonEmoji | paimonAvatar
  paimonVariant: 'guide', // guide(半身，默认) | paimon2(立绘) | emoji(表情)
  bgEnabled: true,         // 图片背景
  bgOpacity: 0.55,         // 背景不透明度
  bgMotion: true,          // 背景动态（渐变/光晕/数据流/星点）
  /* 启动动画 */
  splashEnabled: true,
  splashMode: 'session',   // session | daily | every
  voice: true,
  voiceVolume: 0.85,
  sfx: true,
  sfxVolume: 0.5,
}

export const BOOL_KEYS = [
  'enabled', 'frame', 'stardust', 'rail', 'music', 'mascot', 'statusLine',
  'bgEnabled', 'bgMotion',
  'splashEnabled', 'voice', 'sfx',
]

/** 旧配置迁移：v1 的 day/night 映射到 temple/terminal。 */
export const ENUM_ALIASES = {
  uiMode: { day: 'temple', night: 'terminal' },
  splashMode: {},
}

export const ENUMS = {
  uiMode: ['auto', 'terminal', 'temple'],
  splashMode: ['session', 'daily', 'every'],
  brandMark: ['phanes', 'terminal', 'skyisland', 'paimonEmoji', 'paimonAvatar'],
  paimonVariant: ['guide', 'paimon2', 'emoji'],
}

export const RANGES = {
  voiceVolume: [0, 1],
  sfxVolume: [0, 1],
  bgOpacity: [0, 1],
}

export const TEXT_KEYS = []

/**
 * DSH 主题令牌（名称必须与 DSH Theme 目录逐字一致）。
 * 终端（深色）：低饱和低亮度深色；神殿（浅色）：灰白石。
 * 强调色统一为五光白（深色）/ 深墨（浅色），金色只在插件自己的装饰里小面积出现。
 */
export const TOKENS = {
  /* ── 终端（深色） ── */
  dark: {
    '--dsw-alias-bg-base': '#0B0A0E',
    '--dsw-alias-bg-layer-1': '#121116',
    '--dsw-alias-bg-layer-2': '#18161C',
    '--dsw-alias-bg-overlay': '#1F1D24',
    '--dsw-alias-border-l1': '#26242C',
    '--dsw-alias-border-l2': '#3A3742',
    '--dsw-alias-border-l3': '#4E4A57',
    '--dsw-alias-brand-primary': '#E8E9EC',
    '--dsw-alias-label-primary': '#EDEDEF',
    '--dsw-alias-label-secondary': '#9A99A4',
    '--dsw-alias-state-error-primary': '#C97A7A',
    '--dsw-alias-state-idle-primary': '#7E7C88',
    '--dsw-alias-state-success-primary': '#8FB3A8',
    '--dsw-alias-state-warn-primary': '#D8C9A6',
    '--dsw-specific-sidebar-fill': '#08070B',
  },
  /* ── 神殿（浅色，灰白石） ── */
  light: {
    '--dsw-alias-bg-base': '#D9D7D3',
    '--dsw-alias-bg-layer-1': '#E6E4E0',
    '--dsw-alias-bg-layer-2': '#CFCDC8',
    '--dsw-alias-bg-overlay': '#EFEEEA',
    '--dsw-alias-border-l1': '#C2C0BA',
    '--dsw-alias-border-l2': '#ADAAA3',
    '--dsw-alias-border-l3': '#918D86',
    '--dsw-alias-brand-primary': '#4B4752',
    '--dsw-alias-label-primary': '#1D1C20',
    '--dsw-alias-label-secondary': '#5E5B60',
    '--dsw-alias-state-error-primary': '#8E4B4B',
    '--dsw-alias-state-idle-primary': '#77747A',
    '--dsw-alias-state-success-primary': '#4E6F65',
    '--dsw-alias-state-warn-primary': '#8A6F45',
    '--dsw-specific-sidebar-fill': '#CFCDC8',
  },
}

/** 五光白 / 金色 等插件自有颜色（CSS 变量与样式里使用）。 */
export const LM_COLORS = {
  white: '#EDEDEF',
  whiteDim: '#C8C8D6',
  lavender: '#A2A9BB',
  pink: '#E7BDD2',
  cyan: '#C8D6D2',
  goldSoft: '#EDE2BB',
  gold: '#F3D295',
  goldDeep: '#BE9245',
  stoneDark: '#353132',
  stoneMid: '#514546',
  stoneLight: '#C8C1BC',
  voidDeep: '#0B0A0E',
}

/** 启动动画（v5：深色光带场 → 中央十字星填充/抖动/爆发 → 白屏 → WebGL glitch 转场）。 */
export const SPLASH = {
  total: 10.2,
  voiceLinkAt: 1.4,
  voiceWelcomeAt: 5.2,
  starAt: 1.9,
  fillAt: 3.0,
  shakeAt: 5.6,
  burstAt: 6.3,
  whiteAt: 7.6,
  transitionAt: 7.9,
  revealAt: 9.4,
  /** 旧字段保留（v4 调试接口兼容）。 */
  titleAt: 4.8,
  statusAt: 8.6,
  mascotAt: 2.8,
  anomalyAt: 6.0,
  dissolveAt: 7.9,
  /** Host 首屏兜底（必须大于 total + 转场余量，否则正常播放会被误杀）。 */
  failSafeMs: 18000,
}

/** 语音台词（PV 原声；只保留两条）。 */
export const VOICE_LINES = {
  link: { text: '正在链接天空岛', src: MEDIA.voice.link },
  welcome: { text: '欢迎来到世界', src: MEDIA.voice.welcome },
}

/** 启动动画原创文案（精简）。 */
export const SPLASH_COPY = {
  title: '光之镜',
  titleEn: 'LIGHT MIRROR',
  sub: '天空岛 · SKY ISLAND',
  status: [
    ['正在建立镜面链接', 'LINKING THE MIRROR'],
    ['正在解析天空岛坐标', 'RESOLVING SKY ISLAND'],
    ['链接完成', 'LINK ESTABLISHED'],
  ],
  failSafeHint: '光之镜暂时失焦，正在返回世界…',
}

/** 主界面原创文案。 */
export const UI_COPY = {
  brandName: '光之镜',
  brandSub: 'LIGHT MIRROR',
  brandMarks: [
    ['phanes', '法涅斯徽记'],
    ['terminal', '光之镜终端'],
    ['skyisland', '天空岛'],
    ['paimonEmoji', '派蒙表情'],
    ['paimonAvatar', '派蒙头像'],
  ],
  paimonVariants: [
    ['guide', '派蒙 · 半身'],
    ['paimon2', '派蒙 · 立绘'],
    ['emoji', '派蒙 · 表情'],
  ],
  hudTitle: '光之镜',
  hudLink: '天空岛链接',
  hudOnline: 'ONLINE',
  settingsTitle: '光之镜',
  settingsHint: '五光十色的白与低饱和的深色之间，是光之镜的观测界面。',
  railTitle: '观测',
  railLink: '链接',
  railSystem: '系统',
  railTime: '时间',
  railMusic: '回响',
  railPaimon: '派蒙',
  musicEmpty: '未启用曲目',
  preview: '立即预览启动动画',
  reset: '恢复默认',
  save: '保存',
  saved: '已保存。',
  resetDone: '已恢复默认。',
  splashNote: '启动动画设置将在下次页面加载时生效；可点「立即预览」先看效果。',
  versionPrefix: '版本 v',
}

/** 主题注册与 override 的标识。 */
export const THEME_ID = 'light-mirror'
export const THEME_SOURCE = 'dsh-light-mirror'

/** 本地存储键。 */
export const STORAGE = {
  splashShown: 'light-mirror:splash-shown',
  splashDay: 'light-mirror:splash-day',
  railOpen: 'light-mirror:rail-open',
  musicOn: 'light-mirror:music-on',
  musicTrack: 'light-mirror:music-track',
  musicVolume: 'light-mirror:music-volume',
}
