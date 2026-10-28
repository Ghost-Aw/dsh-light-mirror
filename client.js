/* ============================================================================
 * dsh-light-mirror — client bundle（由 build.mjs 生成，请勿手改）
 * 源：src/client/index.js
 * ========================================================================== */
window.__ModuleLoader__.load({
  id: 'dsh-light-mirror',
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.js
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject,
  normalizeConfig: () => normalizeConfig2
});
module.exports = __toCommonJS(index_exports);

// src/shared/content.js
var ROUTE_BASE = "/light-mirror";
var VERSION = "2.0.0";
var MEDIA = {
  photo: {
    sceneTerminal: ROUTE_BASE + "/media/photo/scene-terminal.webp",
    sceneWide: ROUTE_BASE + "/media/photo/scene-wide.webp",
    anomalyCore: ROUTE_BASE + "/media/photo/anomaly-core.webp",
    bgDark: ROUTE_BASE + "/media/photo/bg-dark.webp",
    bgLight: ROUTE_BASE + "/media/photo/bg-light.webp"
  },
  art: {
    /* 法涅斯徽记（含左右翅膀，五光白 / 淡金） */
    phanesFull: ROUTE_BASE + "/media/art/phanes-wings.png",
    phanesFullGold: ROUTE_BASE + "/media/art/phanes-wings-gold.png",
    /* 仅中央主体紧凑版（20~34px 品牌位兜底） */
    phanesCore: ROUTE_BASE + "/media/art/emblem-phanes-core.png",
    phanesCutout: ROUTE_BASE + "/media/art/emblem-phanes-cutout.png",
    /* 品牌图案：光之镜终端 / 天空岛 / 派蒙表情 / 派蒙头像 */
    patternTerminal: ROUTE_BASE + "/media/art/pattern-terminal.png",
    patternTerminalGold: ROUTE_BASE + "/media/art/pattern-terminal-gold.png",
    patternSkyisland: ROUTE_BASE + "/media/art/pattern-skyisland.png",
    patternPaimonEmoji: ROUTE_BASE + "/media/art/pattern-paimon-emoji.png",
    patternPaimonAvatar: ROUTE_BASE + "/media/art/pattern-paimon-avatar.png",
    /* 派蒙全息（观测栏立绘，三档可切换） */
    paimonHoloGuide: ROUTE_BASE + "/media/art/paimon-holo-guide.png",
    paimonHolo2: ROUTE_BASE + "/media/art/paimon-holo-2.png",
    paimonHoloEmoji: ROUTE_BASE + "/media/art/paimon-holo-emoji.png",
    /* 派蒙干净半身彩色（client 侧做动态全息更可控） */
    paimonHalfGuide: ROUTE_BASE + "/media/art/paimon-half-guide.png",
    paimonHalf2: ROUTE_BASE + "/media/art/paimon-half-2.png",
    paimonHalfEmoji: ROUTE_BASE + "/media/art/paimon-half-emoji.png",
    /* 旧素材保留（splash 兜底 / 对照） */
    knot: ROUTE_BASE + "/media/art/knot-cutout.png",
    paimon: ROUTE_BASE + "/media/art/paimon-guide.png",
    icon: ROUTE_BASE + "/media/art/icon.svg"
  },
  /* 启动动画过渡帧序列（逐帧学习 PV 192s 竖向解离） */
  seq: {
    /* 旧契约（程序化为主时保留未用） */
    dissociation: ROUTE_BASE + "/media/seq/dissociation",
    frames: 48,
    fps: 30,
    /* v4：第 192 秒 1s/30 帧真实序列（逐帧贴合用；见 media/seq/second192/frames.json） */
    second192: ROUTE_BASE + "/media/seq/second192",
    second192Frames: 30,
    second192Fps: 30,
    second192Meta: ROUTE_BASE + "/media/seq/second192/frames.json"
  },
  bgm: [
    { id: "echo-1", title: "万有尽收", src: ROUTE_BASE + "/media/bgm/track-04.mp3" },
    { id: "echo-2", title: "寂石的哀忆", src: ROUTE_BASE + "/media/bgm/track-05.mp3" },
    { id: "echo-3", title: "无言的忧惧", src: ROUTE_BASE + "/media/bgm/track-06.mp3" },
    { id: "echo-4", title: "死夜深黯", src: ROUTE_BASE + "/media/bgm/track-07.mp3" },
    { id: "echo-5", title: "苍镝呈光", src: ROUTE_BASE + "/media/bgm/track-08.mp3" }
  ],
  voice: {
    link: ROUTE_BASE + "/media/voice/line-01-link.mp3",
    welcome: ROUTE_BASE + "/media/voice/line-02-welcome.mp3",
    lines: ROUTE_BASE + "/media/voice/lines.json"
  }
};
var DEFAULTS = {
  /* 主界面 */
  enabled: true,
  uiMode: "auto",
  // auto | terminal | temple
  frame: true,
  // 窗口四角细框
  stardust: true,
  // 五光白星尘
  rail: true,
  // 右侧观测栏（停靠式，不覆盖正文）
  music: true,
  // 观测栏内音乐播放器
  mascot: true,
  // 观测栏派蒙全息立绘
  statusLine: true,
  // 右下角两行状态字
  brandMark: "phanes",
  // phanes | terminal | skyisland | paimonEmoji | paimonAvatar
  paimonVariant: "guide",
  // guide(半身，默认) | paimon2(立绘) | emoji(表情)
  bgEnabled: true,
  // 图片背景
  bgOpacity: 0.55,
  // 背景不透明度
  bgMotion: true,
  // 背景动态（渐变/光晕/数据流/星点）
  /* 启动动画 */
  /* 新会话页 Hero 标题（设置可改；空字符串回退默认） */
  heroTitle: "封锁已至之境",
  /* 思考状态前缀（设置可改；后半句「用时 n 秒…」保留） */
  thinkingLabel: "黑玛门尼解算中",
  splashEnabled: true,
  splashMode: "session",
  // session | daily | every
  voice: true,
  voiceVolume: 0.85,
  sfx: true,
  sfxVolume: 0.5
};
var BOOL_KEYS = [
  "enabled",
  "frame",
  "stardust",
  "rail",
  "music",
  "mascot",
  "statusLine",
  "bgEnabled",
  "bgMotion",
  "splashEnabled",
  "voice",
  "sfx"
];
var ENUM_ALIASES = {
  uiMode: { day: "temple", night: "terminal" },
  splashMode: {}
};
var ENUMS = {
  uiMode: ["auto", "terminal", "temple"],
  splashMode: ["session", "daily", "every"],
  brandMark: ["phanes", "terminal", "skyisland", "paimonEmoji", "paimonAvatar"],
  paimonVariant: ["guide", "paimon2", "emoji"]
};
var RANGES = {
  voiceVolume: [0, 1],
  sfxVolume: [0, 1],
  bgOpacity: [0, 1]
};
var TOKENS = {
  /* ── 终端（深色） ── */
  dark: {
    "--dsw-alias-bg-base": "#0B0A0E",
    "--dsw-alias-bg-layer-1": "#121116",
    "--dsw-alias-bg-layer-2": "#18161C",
    "--dsw-alias-bg-overlay": "#1F1D24",
    "--dsw-alias-border-l1": "#26242C",
    "--dsw-alias-border-l2": "#3A3742",
    "--dsw-alias-border-l3": "#4E4A57",
    "--dsw-alias-brand-primary": "#E8E9EC",
    "--dsw-alias-label-primary": "#EDEDEF",
    "--dsw-alias-label-secondary": "#9A99A4",
    "--dsw-alias-state-error-primary": "#C97A7A",
    "--dsw-alias-state-idle-primary": "#7E7C88",
    "--dsw-alias-state-success-primary": "#8FB3A8",
    "--dsw-alias-state-warn-primary": "#D8C9A6",
    "--dsw-specific-sidebar-fill": "#08070B"
  },
  /* ── 神殿（浅色，灰白石） ── */
  light: {
    "--dsw-alias-bg-base": "#D9D7D3",
    "--dsw-alias-bg-layer-1": "#E6E4E0",
    "--dsw-alias-bg-layer-2": "#CFCDC8",
    "--dsw-alias-bg-overlay": "#EFEEEA",
    "--dsw-alias-border-l1": "#C2C0BA",
    "--dsw-alias-border-l2": "#ADAAA3",
    "--dsw-alias-border-l3": "#918D86",
    "--dsw-alias-brand-primary": "#4B4752",
    "--dsw-alias-label-primary": "#1D1C20",
    "--dsw-alias-label-secondary": "#5E5B60",
    "--dsw-alias-state-error-primary": "#8E4B4B",
    "--dsw-alias-state-idle-primary": "#77747A",
    "--dsw-alias-state-success-primary": "#4E6F65",
    "--dsw-alias-state-warn-primary": "#8A6F45",
    "--dsw-specific-sidebar-fill": "#CFCDC8"
  }
};
var VOICE_LINES = {
  link: { text: "正在链接天空岛", src: MEDIA.voice.link },
  welcome: { text: "欢迎来到世界", src: MEDIA.voice.welcome }
};
var UI_COPY = {
  brandName: "光之镜",
  brandSub: "LIGHT MIRROR",
  brandMarks: [
    ["phanes", "法涅斯徽记"],
    ["terminal", "光之镜终端"],
    ["skyisland", "天空岛"],
    ["paimonEmoji", "派蒙表情"],
    ["paimonAvatar", "派蒙头像"]
  ],
  paimonVariants: [
    ["guide", "派蒙 · 半身"],
    ["paimon2", "派蒙 · 立绘"],
    ["emoji", "派蒙 · 表情"]
  ],
  hudTitle: "光之镜",
  hudLink: "天空岛链接",
  hudOnline: "ONLINE",
  settingsTitle: "光之镜",
  settingsHint: "五光十色的白与低饱和的深色之间，是光之镜的观测界面。",
  railTitle: "观测",
  railLink: "链接",
  railSystem: "系统",
  railTime: "时间",
  railMusic: "回响",
  railPaimon: "派蒙",
  musicEmpty: "未启用曲目",
  preview: "立即预览启动动画",
  reset: "恢复默认",
  save: "保存",
  saved: "已保存。",
  resetDone: "已恢复默认。",
  splashNote: "启动动画设置将在下次页面加载时生效；可点「立即预览」先看效果。",
  versionPrefix: "版本 v"
};
var THEME_ID = "light-mirror";
var THEME_SOURCE = "dsh-light-mirror";
var STORAGE = {
  splashShown: "light-mirror:splash-shown",
  splashDay: "light-mirror:splash-day",
  railOpen: "light-mirror:rail-open",
  musicOn: "light-mirror:music-on",
  musicTrack: "light-mirror:music-track",
  musicLoop: "light-mirror:music-loop",
  musicVolume: "light-mirror:music-volume"
};

// src/client/styles.js
var DECOR_CSS = String.raw`
:root {
  --lmui-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --lmui-serif: "Songti SC", "STSong", "Noto Serif SC", "Source Han Serif SC", "SimSun", "宋体", serif;
  --lmui-mono: "SF Mono", "JetBrains Mono", "Consolas", "Liberation Mono", monospace;
  --lmui-irid: linear-gradient(105deg, #A2A9BB 0%, #E8E9EC 18%, #F4F2F5 34%, #E7BDD2 54%, #C8D6D2 72%, #EDE2BB 100%);
  --lmui-gold: #EDE2BB;
  --lmui-gold-strong: #F3D295;
  /* 五光白 bloom（实测参数）：白核 → 蓝灰 → 透明，避免暖金 drop-shadow。 */
  --lmui-bloom: radial-gradient(
    circle at 50% 50%,
    #ffffff 0 18%,
    #e8e9ec 42%,
    rgba(162, 169, 187, 0.45) 70%,
    transparent 100%
  );
}
html[data-lmui-scheme="dark"] {
  --lmui-ink: #EDEDEF;
  --lmui-ink-dim: #9A99A4;
  --lmui-ink-faint: #6F6D78;
  --lmui-hairline: #EDEDEF24;
  --lmui-hairline-soft: #EDEDEF12;
  --lmui-surface: #121116C9;
  --lmui-surface-border: #EDEDEF1F;
  --lmui-shadow: 0 24px 64px #00000073, 0 2px 12px #00000059;
  --lmui-glow: #E8E9EC;
}
html[data-lmui-scheme="light"] {
  --lmui-ink: #1D1C20;
  --lmui-ink-dim: #5E5B60;
  /* 浅色：标题/次要字再压深，保证灰石面上 ≥4.5:1（用户反馈的可读性问题） */
  --lmui-ink-faint: #5F5C63;
  --lmui-hairline: #1D1C2026;
  --lmui-hairline-soft: #1D1C2014;
  --lmui-surface: #FFFFFFD9;
  --lmui-surface-border: #1D1C201F;
  --lmui-shadow: 0 24px 64px #1D1C2026, 0 2px 12px #1D1C201A;
  --lmui-glow: #FFFFFF;
}

/* 强制模式时让原生控件与滚动条也换配色（auto 模式交给宿主）。 */
html[data-lmui-mode="terminal"] body { color-scheme: dark; }
html[data-lmui-mode="temple"] body { color-scheme: light; }

/* ── 装饰总容器：铺满视口、不拦截点击 ───────────────────────────────── */
.lmui-decor {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
  contain: layout style;
}

/* ── 1. 四角细框（极淡五光白 hairline）──────────────────────────────── */
.lmui-frame {
  position: absolute;
  inset: 12px;
  pointer-events: none;
}
.lmui-frame__corner {
  position: absolute;
  width: 34px;
  height: 34px;
  opacity: 0.74;
}
.lmui-frame__h,
.lmui-frame__v {
  position: absolute;
  background: var(--lmui-irid);
  opacity: 0.68;
}
.lmui-frame__h { height: 1px; width: 34px; }
.lmui-frame__v { width: 1px; height: 34px; }
html[data-lmui-scheme="light"] .lmui-frame__h,
html[data-lmui-scheme="light"] .lmui-frame__v {
  opacity: 0.92;
  filter: drop-shadow(0 1px 1px #1D1C201F);
}
html[data-lmui-scheme="light"] .lmui-frame__h { box-shadow: 0 1px 0 #1D1C2022; }
html[data-lmui-scheme="light"] .lmui-frame__v { box-shadow: 1px 0 0 #1D1C2022; }
.lmui-frame__corner--tl { top: 0; left: 0; }
.lmui-frame__corner--tl .lmui-frame__h { top: 0; left: 0; }
.lmui-frame__corner--tl .lmui-frame__v { top: 0; left: 0; }
.lmui-frame__corner--tr { top: 0; right: 0; }
.lmui-frame__corner--tr .lmui-frame__h { top: 0; right: 0; }
.lmui-frame__corner--tr .lmui-frame__v { top: 0; right: 0; }
.lmui-frame__corner--bl { bottom: 0; left: 0; }
.lmui-frame__corner--bl .lmui-frame__h { bottom: 0; left: 0; }
.lmui-frame__corner--bl .lmui-frame__v { bottom: 0; left: 0; }
.lmui-frame__corner--br { bottom: 0; right: 0; }
.lmui-frame__corner--br .lmui-frame__h { bottom: 0; right: 0; }
.lmui-frame__corner--br .lmui-frame__v { bottom: 0; right: 0; }
.lmui-frame__glint {
  position: absolute;
  width: 6px;
  height: 6px;
  background: var(--lmui-glow);
  opacity: 0.6;
  clip-path: polygon(50% 0%, 58% 42%, 100% 50%, 58% 58%, 50% 100%, 42% 58%, 0% 50%, 42% 42%);
  filter: drop-shadow(0 0 5px color-mix(in srgb, var(--lmui-glow) 60%, transparent));
  animation: lmui-glint 9s var(--lmui-ease) infinite;
}
html[data-lmui-scheme="light"] .lmui-frame__glint {
  background: #ffffff;
  filter: drop-shadow(0 1px 2px #1D1C2033) drop-shadow(0 0 4px #ffffffaa);
}
.lmui-frame__corner--tl .lmui-frame__glint { left: -2.5px; top: -2.5px; }
.lmui-frame__corner--tr .lmui-frame__glint { right: -2.5px; top: -2.5px; animation-delay: 2.2s; }
.lmui-frame__corner--bl .lmui-frame__glint { left: -2.5px; bottom: -2.5px; animation-delay: 4.4s; }
.lmui-frame__corner--br .lmui-frame__glint { right: -2.5px; bottom: -2.5px; animation-delay: 6.6s; }
@keyframes lmui-glint {
  0%, 100% { opacity: 0.32; }
  50% { opacity: 0.62; }
}

/* ── 2. 五光白星尘 ──────────────────────────────────────────────────── */
.lmui-dust {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.lmui-dust__dot {
  position: absolute;
  border-radius: 50%;
  opacity: 0.16;
  animation-name: lmui-twinkle;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  will-change: opacity, transform;
}
html[data-lmui-scheme="dark"] .lmui-dust__dot { mix-blend-mode: screen; }
.lmui-dust__dot--white { background: #F4F2F5; box-shadow: 0 0 6px #F4F2F5; }
.lmui-dust__dot--lavender { background: #A2A9BB; box-shadow: 0 0 6px #A2A9BB; }
.lmui-dust__dot--pink { background: #E7BDD2; box-shadow: 0 0 6px #E7BDD2; }
.lmui-dust__dot--cyan { background: #C8D6D2; box-shadow: 0 0 6px #C8D6D2; }
html[data-lmui-scheme="light"] .lmui-dust__dot { mix-blend-mode: normal; opacity: 0.12; }
html[data-lmui-scheme="light"] .lmui-dust__dot--white { background: #FFFFFF; box-shadow: 0 0 4px #FFFFFF; }
@keyframes lmui-twinkle {
  0%, 100% { opacity: 0.18; transform: translateY(0) scale(0.8); }
  44% { opacity: 0.9; transform: translateY(-4px) scale(1.06); }
  70% { opacity: 0.4; transform: translateY(-2px) scale(0.95); }
}
html[data-lmui-scheme="light"] .lmui-dust__dot { animation-name: lmui-twinkle-light; }
@keyframes lmui-twinkle-light {
  0%, 100% { opacity: 0.14; transform: translateY(0) scale(0.8); }
  44% { opacity: 0.62; transform: translateY(-4px) scale(1.06); }
  70% { opacity: 0.3; transform: translateY(-2px) scale(0.95); }
}

/* ── 3. 品牌图案与品牌文字 ──────────────────────────────────────────── */
.lmui-mark {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  line-height: 0;
  color: var(--lmui-ink);
}
.lmui-mark__fallback {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
  transform: scale(1.06);
  transform-origin: 50% 50%;
  filter: drop-shadow(0 0 4px color-mix(in srgb, var(--lmui-glow) 30%, transparent));
}
/* 每层图案（白色 / 淡金）叠在同一个 34px 槽里，浅色模式按是否有淡金层切换。 */
.lmui-mark__layer {
  position: absolute;
  inset: 0;
  display: block;
  pointer-events: none;
}
.lmui-mark__layer--gold { display: none; }
html[data-lmui-scheme="light"] .lmui-mark[data-lmui-gold="1"] .lmui-mark__layer--white { display: none; }
html[data-lmui-scheme="light"] .lmui-mark[data-lmui-gold="1"] .lmui-mark__layer--gold { display: block; }
.lmui-mark__media {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
  transform-origin: 50% 50%;
  transition: opacity 0.5s var(--lmui-ease);
}
/* 图案画布留白不同，按来源补放大/偏心修正，让 34px 槽里的视觉占比接近 80%。
   phanes-wings 导出画布 1024²，内容偏在右下且只占 31%，需要偏心裁剪式平移。 */
.lmui-mark__layer[data-lmui-shape="pattern"] .lmui-mark__media { transform: scale(1.02); }
.lmui-mark__layer[data-lmui-shape="core"] .lmui-mark__media { transform: scale(1.24); }
.lmui-mark__layer[data-lmui-shape="compact"] .lmui-mark__media { transform: scale(1.34); }
.lmui-mark__layer[data-lmui-shape="cutout"] .lmui-mark__media { transform: scale(1.18); }
.lmui-mark[data-lmui-size="compact"] .lmui-mark__layer[data-lmui-shape="core"] .lmui-mark__media {
  transform: scale(1.3);
}
.lmui-mark[data-lmui-size="compact"] .lmui-mark__layer[data-lmui-shape="compact"] .lmui-mark__media {
  transform: scale(1.42);
}
/* 深色：白色图案 + 五光白 bloom（34px 槽只给轻 bloom，避免光晕盖住侧栏文字；
   大尺寸 hero 由下面单独规则加强） */
html[data-lmui-scheme="dark"] .lmui-mark__layer--white .lmui-mark__media {
  filter: drop-shadow(0 0 3px color-mix(in srgb, var(--lmui-glow) 26%, transparent))
    drop-shadow(0 0 8px color-mix(in srgb, #A2A9BB 22%, transparent)) brightness(1.05);
}
html[data-lmui-scheme="dark"] .lmui-mark[data-lmui-size="compact"] .lmui-mark__layer--white .lmui-mark__media {
  filter: drop-shadow(0 0 2px color-mix(in srgb, var(--lmui-glow) 30%, transparent)) brightness(1.08) saturate(0.92);
}
/* 浅色：有淡金层用金色；没有淡金版的图案压成低饱和深墨，保证灰石底可读 */
html[data-lmui-scheme="light"] .lmui-mark__layer--gold .lmui-mark__media {
  filter: drop-shadow(0 1px 2px #1D1C2024) saturate(0.9) brightness(0.98);
}
html[data-lmui-scheme="light"] .lmui-mark[data-lmui-gold="0"] .lmui-mark__layer--white .lmui-mark__media {
  filter: brightness(0.28) saturate(0.5) contrast(1.12) drop-shadow(0 0 2px #1D1C2033);
}
html[data-lmui-scheme="light"] .lmui-mark[data-lmui-gold="0"][data-lmui-size="compact"] .lmui-mark__layer--white .lmui-mark__media {
  filter: brightness(0.26) saturate(0.5) contrast(1.12);
}
.lmui-hero-mark .lmui-mark__layer--white .lmui-mark__media {
  filter: drop-shadow(0 0 8px color-mix(in srgb, var(--lmui-glow) 34%, transparent))
    drop-shadow(0 0 24px color-mix(in srgb, #A2A9BB 26%, transparent))
    drop-shadow(0 0 44px color-mix(in srgb, #C8D6D2 18%, transparent));
}
html[data-lmui-scheme="light"] .lmui-hero-mark .lmui-mark__layer--gold .lmui-mark__media {
  filter: drop-shadow(0 2px 8px #1D1C201F) saturate(0.95);
}
html[data-lmui-scheme="light"] .lmui-hero-mark[data-lmui-gold="0"] .lmui-mark__layer--white .lmui-mark__media {
  filter: brightness(0.26) saturate(0.5) contrast(1.1) drop-shadow(0 2px 8px #1D1C201F);
}
.lmui-brand-name {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1px;
  min-width: 0;
  max-width: 100%;
  line-height: 1.1;
  overflow: hidden;
}
.lmui-brand-name__main {
  font-family: var(--lmui-serif);
  font-size: 17px;
  font-weight: 500;
  letter-spacing: 0.18em;
  color: var(--lmui-ink);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-shadow: 0 0 14px color-mix(in srgb, var(--lmui-glow) 14%, transparent);
}
.lmui-brand-name__sub {
  font-family: var(--lmui-sans, inherit);
  font-size: 8.5px;
  font-weight: 500;
  letter-spacing: 0.28em;
  color: var(--lmui-ink-faint);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ── 4. 右下角状态字 ────────────────────────────────────────────────── */
.lmui-statusline {
  position: absolute;
  right: 18px;
  bottom: 14px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  text-align: right;
  pointer-events: none;
  transition: right 0.36s var(--lmui-ease);
}
.lmui-statusline__title {
  font-family: var(--lmui-serif);
  font-size: 11.5px;
  line-height: 1;
  letter-spacing: 0.22em;
  color: var(--lmui-ink-faint);
  opacity: 0.82;
}
.lmui-statusline__meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 7.5px;
  line-height: 1;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--lmui-ink-faint);
  opacity: 0.72;
}
.lmui-statusline__dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--lmui-bloom);
  box-shadow: 0 0 7px color-mix(in srgb, #e8e9ec 55%, transparent);
  animation: lmui-breathe 4.4s ease-in-out infinite;
}
@keyframes lmui-breathe {
  0%, 100% { opacity: 0.45; }
  50% { opacity: 1; }
}
/* 浅色底上的状态字提高可读性（用户反馈深底深字问题的一部分） */
html[data-lmui-scheme="light"] .lmui-statusline__title {
  color: var(--lmui-ink-dim);
  opacity: 0.95;
}
html[data-lmui-scheme="light"] .lmui-statusline__meta {
  opacity: 0.85;
}
html[data-lmui-scheme="light"] .lmui-statusline__host,
html[data-lmui-scheme="light"] .lmui-statusline__state {
  color: var(--lmui-ink-dim);
}

/* ── 4. 观测栏派蒙全息立绘 ──────────────────────────────────────────── */
.lmui-rail__sectionHead {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}
.lmui-rail__sectionMeta {
  font-size: 9.5px;
  letter-spacing: 0.06em;
  color: var(--lmui-ink-faint);
  white-space: nowrap;
}
.lmui-rail__section--paimon {
  position: relative;
  overflow: hidden;
}
.lmui-paimon {
  position: relative;
  isolation: isolate;
  height: 168px;
  margin-top: 4px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  border-radius: 12px;
  overflow: visible;
}
/* v8b 线稿「线条光晕」：渐变层用同一张线稿 alpha 作 mask + 模糊，
   光晕沿轮廓围绕，不再用椭圆色块；层级在线稿下方。 */
.lmui-paimon__glow {
  position: absolute;
  inset: 8% 6% 0;
  z-index: 0;
  background: radial-gradient(ellipse at 50% 80%, rgba(255, 255, 255, 0.18), transparent 70%);
  filter: blur(20px);
  opacity: 0.5;
  pointer-events: none;
}
.lmui-paimon[data-lmui-paimon-line="1"] .lmui-paimon__glow {
  inset: 0;
  border-radius: 0;
  background: linear-gradient(
    112deg,
    rgba(255, 255, 255, 0.72) 0%,
    rgba(232, 220, 248, 0.62) 36%,
    rgba(214, 236, 248, 0.56) 68%,
    rgba(255, 232, 242, 0.48) 100%
  );
  -webkit-mask-image: var(--lmui-paimon-mask, none);
  mask-image: var(--lmui-paimon-mask, none);
  -webkit-mask-size: auto 100%;
  mask-size: auto 100%;
  -webkit-mask-position: center bottom;
  mask-position: center bottom;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  filter: blur(18px);
  opacity: 0.72;
}
html[data-lmui-scheme="dark"] .lmui-paimon[data-lmui-paimon-line="1"] .lmui-paimon__glow {
  background: linear-gradient(
    112deg,
    rgba(255, 255, 255, 0.42) 0%,
    rgba(214, 204, 240, 0.5) 40%,
    rgba(196, 222, 242, 0.45) 72%,
    rgba(255, 224, 238, 0.36) 100%
  );
  opacity: 0.7;
}
html[data-lmui-scheme="light"] .lmui-paimon[data-lmui-paimon-line="1"] .lmui-paimon__glow {
  background: linear-gradient(
    112deg,
    rgba(255, 255, 255, 0.72) 0%,
    rgba(232, 220, 248, 0.75) 36%,
    rgba(214, 236, 248, 0.68) 68%,
    rgba(255, 224, 238, 0.6) 100%
  );
  opacity: 0.74;
}
/* 线稿在观测栏里给足高度（全 720 高素材），避免显小 */
.lmui-paimon[data-lmui-paimon-source^="line"] {
  height: 196px;
}
.lmui-paimon__img {
  position: relative;
  z-index: 1;
  display: block;
  height: 168px;
  width: auto;
  max-width: 100%;
  object-fit: contain;
  opacity: 0.9;
  filter: drop-shadow(0 0 10px color-mix(in srgb, #c8d6d2 26%, transparent))
    drop-shadow(0 0 20px color-mix(in srgb, #e7bdd2 16%, transparent)) saturate(0.88) brightness(1.03)
    contrast(1.04);
  animation: lmui-float 8s ease-in-out infinite;
}
/* v8 黑铅线稿：浅色 multiply 保线条；深色反相成白线 + screen */
.lmui-paimon[data-lmui-paimon-source="line-black"] .lmui-paimon__img {
  height: 196px;
  opacity: 0.96;
  mix-blend-mode: multiply;
  filter: contrast(1.06) brightness(0.97) drop-shadow(0 6px 12px rgba(29, 28, 32, 0.16));
}
.lmui-paimon[data-lmui-paimon-source="line-white"] .lmui-paimon__img {
  height: 196px;
  opacity: 0.95;
  mix-blend-mode: screen;
  filter: brightness(1.08) contrast(1.05) drop-shadow(0 0 2px rgba(237, 237, 239, 0.45))
    drop-shadow(0 0 10px rgba(232, 236, 244, 0.5))
    drop-shadow(0 0 22px rgba(206, 216, 240, 0.24));
}
html[data-lmui-scheme="dark"] .lmui-paimon[data-lmui-paimon-source="line-black"] .lmui-paimon__img {
  mix-blend-mode: screen;
  filter: invert(1) brightness(1.06) contrast(1.04)
    drop-shadow(0 0 2px rgba(237, 237, 239, 0.45)) drop-shadow(0 0 10px rgba(238, 242, 250, 0.5));
}
html[data-lmui-scheme="light"] .lmui-paimon[data-lmui-paimon-source="line-white"] .lmui-paimon__img {
  mix-blend-mode: multiply;
  filter: invert(1) contrast(1.06) brightness(0.96)
    drop-shadow(0 6px 12px rgba(29, 28, 32, 0.16));
}
.lmui-paimon[data-lmui-paimon="emoji"][data-lmui-paimon-source^="line"] .lmui-paimon__img {
  height: 128px;
}
/* 预渲染全息：本身已有青白描边 + 深青灰半透明填充，再叠柔光 */
.lmui-paimon[data-lmui-paimon-source="holo"] .lmui-paimon__img {
  opacity: 0.95;
  filter: drop-shadow(0 0 6px rgba(200, 214, 210, 0.4)) drop-shadow(0 0 18px rgba(162, 169, 187, 0.24))
    drop-shadow(0 0 34px rgba(231, 189, 210, 0.12)) brightness(1.06) contrast(1.06);
}
.lmui-paimon[data-lmui-paimon-source="holo"] .lmui-paimon__glow {
  background: radial-gradient(ellipse at 50% 78%, rgba(200, 214, 210, 0.2), transparent 66%);
}
/* 干净半身彩色图 → CSS 全息（v4c：保留脸/五官/原色，只做轻全息）
   轻去饱和（.3）、半透明 .85、双向 1–2px 青白描边、极轻色散、3px 扫描线。 */
.lmui-paimon[data-lmui-paimon-source="half"] .lmui-paimon__img {
  opacity: 0.85;
  filter: grayscale(0.3) saturate(1.15) brightness(1.01) contrast(1.05)
    drop-shadow(1.3px 0 0 rgba(200, 214, 210, 0.62))
    drop-shadow(-1.3px 0 0 rgba(231, 189, 210, 0.5))
    drop-shadow(0 0 2px rgba(236, 244, 246, 0.55))
    drop-shadow(0 0 7px rgba(200, 214, 210, 0.4))
    drop-shadow(0 0 18px rgba(162, 169, 187, 0.22));
}
/* 表情档是方图：压成徽章尺度，避免贴纸感 */
/* v8e 固定框内取景（档位映射不变）：
   guide=半身 → scale 2.15，origin top center，头+肩+胸上缘
   paimon2=立绘 → scale 1.6，origin top center（头/脸不切，下摆两侧裁切）
   emoji=表情 → scale 1.8
   框高始终 196px、rail 宽度不变。 */
.lmui-paimon[data-lmui-paimon="guide"] {
  height: 196px;
  overflow: hidden;
}
.lmui-paimon[data-lmui-paimon="guide"] .lmui-paimon__img {
  height: 196px;
  max-width: none;
  animation: none;
  transform: scale(2.15) translateY(-2px);
  transform-origin: 50% 0%;
}
.lmui-paimon[data-lmui-paimon="guide"] .lmui-paimon__glow {
  transform: scale(2.15) translateY(-2px);
  transform-origin: 50% 0%;
  filter: blur(16px);
}
/* 立绘：固定框内放大（头脸保留，裁掉部分下摆/两侧） */
.lmui-paimon[data-lmui-paimon="paimon2"] {
  height: 196px;
  overflow: hidden;
}
.lmui-paimon[data-lmui-paimon="paimon2"] .lmui-paimon__img {
  height: 196px;
  max-width: none;
  animation: none;
  transform: scale(1.6) translateY(-24px);
  transform-origin: 50% 0%;
}
.lmui-paimon[data-lmui-paimon="paimon2"] .lmui-paimon__glow {
  transform: scale(1.6) translateY(-24px);
  transform-origin: 50% 0%;
  filter: blur(16px);
}
.lmui-paimon[data-lmui-paimon="emoji"] {
  height: 196px;
  overflow: hidden;
  align-items: center;
}
.lmui-paimon[data-lmui-paimon="emoji"] .lmui-paimon__img {
  height: 128px;
  max-width: none;
  animation: none;
  transform: scale(1.8);
  transform-origin: 50% 50%;
}
/* emoji 光晕按表情实际取景：与 128px 图片同框居中，再随 scale 放大；
   blur 16px，避免用 196px 全身布局产生大片糊团。 */
.lmui-paimon[data-lmui-paimon="emoji"] .lmui-paimon__glow {
  inset: 34px 0 auto;
  height: 128px;
  transform: scale(1.8);
  transform-origin: 50% 50%;
  filter: blur(16px);
  opacity: 0.7;
}
.lmui-paimon__fallback {
  position: relative;
  width: 96px;
  height: 96px;
  color: var(--lmui-glow);
  opacity: 0.5;
  filter: drop-shadow(0 0 14px color-mix(in srgb, var(--lmui-glow) 40%, transparent));
  animation: lmui-float 8s ease-in-out infinite;
}
html[data-lmui-scheme="light"] .lmui-paimon__img {
  filter: drop-shadow(0 8px 16px #1D1C2024) saturate(0.85) brightness(0.88) contrast(1.15);
  opacity: 0.96;
}
/* 神殿：白底上把全息投影压暗一档，保持「深青描边 + 半透明填充」的投影感 */
html[data-lmui-scheme="light"] .lmui-paimon[data-lmui-paimon-source="holo"] .lmui-paimon__img {
  opacity: 0.92;
  filter: brightness(0.82) contrast(1.18) saturate(0.9)
    drop-shadow(0 0 3px rgba(94, 91, 96, 0.28)) drop-shadow(0 8px 16px rgba(29, 28, 32, 0.14));
}
html[data-lmui-scheme="light"] .lmui-paimon[data-lmui-paimon-source="half"] .lmui-paimon__img {
  opacity: 0.9;
  filter: grayscale(0.28) saturate(1.08) brightness(0.92) contrast(1.1)
    drop-shadow(1px 0 0 rgba(255, 255, 255, 0.5)) drop-shadow(-1px 0 0 rgba(94, 91, 96, 0.28))
    drop-shadow(0 0 3px rgba(255, 255, 255, 0.4)) drop-shadow(0 6px 14px rgba(29, 28, 32, 0.18));
}
@keyframes lmui-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

/* ── 观测栏打开时右下状态字让位 ─────────────────────────────────────── */
html[data-lmui-rail-mode="docked"][data-lmui-rail="open"] .lmui-statusline {
  right: calc(var(--lmui-rail-w, 300px) + 16px);
}
html[data-lmui-rail-mode="overlay"][data-lmui-rail="open"] .lmui-statusline {
  right: 314px;
}

/* ── 5. 侧栏「观测」按钮 ────────────────────────────────────────────── */
.lmui-rail-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  height: 36px;
  min-width: 36px;
  max-width: 100%;
  padding: 0 10px;
  border: 1px solid transparent;
  border-radius: var(--dsw-radius-md);
  background: transparent;
  color: var(--dsw-alias-label-secondary);
  font: inherit;
  font-size: 12.5px;
  cursor: pointer;
  transition: background-color 0.2s var(--lmui-ease), border-color 0.2s var(--lmui-ease),
    color 0.2s var(--lmui-ease);
}
.lmui-rail-toggle:hover {
  background: var(--dsw-alias-interactive-bg-hover);
  color: var(--dsw-alias-label-primary);
}
.lmui-rail-toggle--on {
  color: var(--dsw-alias-label-primary);
  border-color: var(--lmui-hairline);
  background: color-mix(in srgb, var(--dsw-alias-label-primary) 5%, transparent);
}
.lmui-rail-toggle:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--dsw-alias-label-primary) 20%, transparent);
}
.lmui-rail-toggle__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
}
.lmui-rail-toggle__label {
  letter-spacing: 0.1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ── 6. 观测栏面板（停靠 = 真实第三列；找不到 frame 时降级 overlay）────── */
.lmui-rail {
  position: fixed;
  /* overlay 降级模式：与宿主 header 和右缘各留 ≥12px 安全边距 */
  top: 68px;
  right: 16px;
  bottom: 60px;
  width: var(--lmui-rail-w, 280px);
  z-index: 1;
  pointer-events: none;
  opacity: 0;
  transform: translateX(calc(100% + 28px));
  transition: opacity 0.3s var(--lmui-ease), transform 0.42s var(--lmui-ease);
}
.lmui-rail--open {
  opacity: 1;
  transform: translateX(0);
}
/* 停靠模式：grid 已由 JS 给 frame 加出第三列，这里只需填满这一列。 */
html[data-lmui-rail-mode="docked"] .lmui-rail {
  top: 0;
  right: 0;
  bottom: 0;
  width: var(--lmui-rail-w, 300px);
  transform: none;
  transition: opacity 0.24s var(--lmui-ease);
}
html[data-lmui-rail-mode="docked"] .lmui-rail__surface {
  border-radius: 0;
  border-top: none;
  border-right: none;
  border-bottom: none;
  border-left: 1px solid var(--lmui-surface-border);
  box-shadow: -18px 0 48px #00000026;
}
html[data-lmui-scheme="light"][data-lmui-rail-mode="docked"] .lmui-rail__surface {
  box-shadow: -18px 0 48px #1D1C2014;
}
html[data-lmui-rail-mode="docked"] .lmui-rail__head {
  padding-top: 20px;
}
.lmui-rail__surface {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  pointer-events: auto;
  border-radius: 18px;
  border: 1px solid var(--lmui-surface-border);
  background: var(--lmui-surface);
  box-shadow: var(--lmui-shadow);
  backdrop-filter: blur(20px) saturate(118%);
  -webkit-backdrop-filter: blur(20px) saturate(118%);
  overflow: hidden;
}
.lmui-rail__surface::before {
  content: "";
  position: absolute;
  left: 16px;
  right: 16px;
  top: 0;
  height: 1px;
  background: var(--lmui-irid);
  opacity: 0.45;
  pointer-events: none;
}
/* CRT / 电视条纹底：严格 3.00px 周期、极低 alpha（实测 0.01~0.03），
   只做观测栏玻璃面的细微纹理；非整数 DPR 屏降 alpha 并用 2.5px 防摩尔纹。 */
.lmui-rail__surface::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background-image: repeating-linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.022) 0 1px,
    transparent 1px 3px
  );
  opacity: 0.55;
}
html[data-lmui-scheme="light"] .lmui-rail__surface::after {
  background-image: repeating-linear-gradient(
    90deg,
    rgba(29, 28, 32, 0.018) 0 1px,
    transparent 1px 3px
  );
  opacity: 0.5;
}
@media (min-resolution: 1.5dppx) {
  .lmui-rail__surface::after {
    background-image: repeating-linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.014) 0 1px,
      transparent 1px 2.5px
    );
  }
  html[data-lmui-scheme="light"] .lmui-rail__surface::after {
    background-image: repeating-linear-gradient(
      90deg,
      rgba(29, 28, 32, 0.012) 0 1px,
      transparent 1px 2.5px
    );
  }
}
.lmui-rail__head {
  flex: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 14px 12px 11px 16px;
  border-bottom: 1px solid var(--lmui-hairline-soft);
}
.lmui-rail__headText {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}
.lmui-rail__spark {
  width: 5px;
  height: 5px;
  flex: none;
  background: var(--lmui-gold-strong);
  clip-path: polygon(50% 0%, 60% 40%, 100% 50%, 60% 60%, 50% 100%, 40% 60%, 0% 50%, 40% 40%);
  opacity: 0.92;
  filter: drop-shadow(0 0 5px color-mix(in srgb, var(--lmui-gold) 65%, transparent));
}
.lmui-rail__title {
  font-family: var(--lmui-serif);
  font-size: 14px;
  letter-spacing: 0.24em;
  color: var(--lmui-ink);
  white-space: nowrap;
}
.lmui-rail__titleEn {
  padding-top: 2px;
  font-size: 8px;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: var(--lmui-ink-faint);
  white-space: nowrap;
}
.lmui-rail__close {
  width: 26px;
  height: 26px;
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--lmui-ink-dim);
  cursor: pointer;
}
.lmui-rail__close:hover {
  background: var(--dsw-alias-interactive-bg-hover);
  color: var(--lmui-ink);
}
.lmui-rail__body {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 2px 16px 14px;
  scrollbar-width: thin;
  scrollbar-color: var(--lmui-hairline) transparent;
}
.lmui-rail__body::-webkit-scrollbar { width: 5px; }
.lmui-rail__body::-webkit-scrollbar-thumb {
  background: var(--lmui-hairline);
  border-radius: 3px;
}
.lmui-rail__section {
  padding: 12px 0 13px;
  border-bottom: 1px solid var(--lmui-hairline-soft);
}
.lmui-rail__section:last-child { border-bottom: none; padding-bottom: 4px; }
.lmui-rail__sectionTitle {
  margin: 0 0 10px;
  font-size: 9px;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: var(--lmui-ink-faint);
}
.lmui-rail__hint {
  font-size: 11px;
  line-height: 1.65;
  color: var(--lmui-ink-faint);
}
.lmui-rail__linkRow {
  display: flex;
  align-items: center;
  gap: 10px;
}
.lmui-rail__linkDot {
  width: 7px;
  height: 7px;
  flex: none;
  border-radius: 50%;
  background: var(--lmui-bloom);
  box-shadow: 0 0 8px color-mix(in srgb, #e8e9ec 60%, transparent);
  animation: lmui-breathe 4s ease-in-out infinite;
}
.lmui-rail__linkText {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}
.lmui-rail__value {
  font-size: 12.5px;
  line-height: 1.3;
  color: var(--lmui-ink);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.lmui-rail__sub {
  font-size: 8.5px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--lmui-ink-faint);
}
.lmui-rail__metric { margin-bottom: 12px; }
.lmui-rail__metric:last-child { margin-bottom: 0; }
.lmui-rail__metricHead {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}
.lmui-rail__metricLabel {
  font-size: 11px;
  letter-spacing: 0.04em;
  color: var(--lmui-ink-dim);
}
.lmui-rail__metricValue {
  font-family: var(--lmui-mono);
  font-size: 11px;
  color: var(--lmui-ink);
}
.lmui-rail__bar {
  height: 2px;
  margin-top: 6px;
  border-radius: 1px;
  background: var(--lmui-hairline-soft);
  overflow: hidden;
}
.lmui-rail__barFill {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--lmui-irid);
  opacity: 0.82;
  transition: width 0.5s var(--lmui-ease);
}
.lmui-rail__metricSub {
  margin-top: 4px;
  font-family: var(--lmui-mono);
  font-size: 9.5px;
  color: var(--lmui-ink-faint);
}
.lmui-rail__clock {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.lmui-rail__clockDate {
  font-size: 11px;
  color: var(--lmui-ink-dim);
}
.lmui-rail__clockTime {
  font-family: var(--lmui-mono);
  font-size: 21px;
  font-weight: 300;
  letter-spacing: 0.05em;
  color: var(--lmui-ink);
}

/* ── 回响播放器 ─────────────────────────────────────────────────────── */
.lmui-music {
  display: flex;
  flex-direction: column;
  gap: 9px;
}
.lmui-music__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}
.lmui-music__headLeft {
  display: flex;
  align-items: baseline;
  gap: 8px;
  min-width: 0;
}
.lmui-music__headLeft .lmui-rail__sectionTitle {
  margin: 0;
  flex: none;
}
.lmui-music__title {
  font-family: var(--lmui-serif);
  font-size: 13px;
  letter-spacing: 0.06em;
  color: var(--lmui-ink);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.lmui-music__count {
  font-family: var(--lmui-mono);
  font-size: 9.5px;
  color: var(--lmui-ink-faint);
}
.lmui-music__scrub {
  display: flex;
  align-items: center;
  gap: 8px;
}
.lmui-music__time {
  flex: none;
  min-width: 30px;
  text-align: center;
  font-family: var(--lmui-mono);
  font-size: 9.5px;
  color: var(--lmui-ink-faint);
}
.lmui-music__progress,
.lmui-music__volumeInput {
  -webkit-appearance: none;
  appearance: none;
  height: 14px;
  margin: 0;
  background: transparent;
  cursor: pointer;
}
.lmui-music__progress { flex: 1 1 auto; min-width: 40px; }
.lmui-music__progress::-webkit-slider-runnable-track,
.lmui-music__volumeInput::-webkit-slider-runnable-track {
  height: 2px;
  border-radius: 1px;
  background: var(--lmui-hairline);
}
.lmui-music__progress::-webkit-slider-thumb,
.lmui-music__volumeInput::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 9px;
  height: 9px;
  margin-top: -3.5px;
  border-radius: 50%;
  background: var(--lmui-ink);
  border: 1px solid var(--lmui-surface-border);
}
.lmui-music__progress:disabled { opacity: 0.4; cursor: default; }
.lmui-music__controls {
  display: flex;
  align-items: center;
  gap: 8px;
}
.lmui-music__btn {
  width: 30px;
  height: 30px;
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--lmui-hairline);
  border-radius: 50%;
  background: transparent;
  color: var(--lmui-ink-dim);
  cursor: pointer;
  transition: background-color 0.2s var(--lmui-ease), color 0.2s var(--lmui-ease),
    border-color 0.2s var(--lmui-ease);
}
.lmui-music__btn:hover {
  color: var(--lmui-ink);
  background: var(--dsw-alias-interactive-bg-hover);
}
.lmui-music__btn--main {
  width: 34px;
  height: 34px;
  color: var(--lmui-ink);
  border-color: color-mix(in srgb, var(--lmui-ink) 26%, transparent);
}
.lmui-music__btn--loop {
  width: 28px;
  height: 28px;
  font-family: var(--lmui-mono);
  color: var(--lmui-ink-dim);
}
.lmui-music__btn--loop[data-lmui-loop="single"],
.lmui-music__btn--loop[data-lmui-loop="shuffle"] {
  color: var(--lmui-ink);
  border-color: color-mix(in srgb, var(--lmui-ink) 28%, transparent);
}
.lmui-music__loopGlyph {
  font-size: 11px;
  line-height: 1;
  letter-spacing: 0;
}
.lmui-music__btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--lmui-ink) 22%, transparent);
}
.lmui-music__volume {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 0;
}
.lmui-music__volumeInput { width: 76px; }
.lmui-music__hint {
  font-size: 10.5px;
  line-height: 1.6;
  color: var(--lmui-ink-faint);
}

/* ── 宿主卡片：composer 磨砂不透明（修复输入框内长条背景）───────────────
   v3 只加了一层极淡渐变，宿主 composer 卡片本身若是半透明，背景亮带会透过
   输入卡形成横向长条。v4 改为卡片自带高 alpha 实色填充 + backdrop blur，
   不依赖背景层是否开启；背景层不再在 composer 内部形成长条。 */
html[data-lmui-composer="on"] [data-composer-card] {
  background-color: var(--lmui-composer-fill) !important;
  background-image: none !important;
  box-shadow: inset 0 0 0 1px var(--lmui-composer-hairline), 0 12px 32px rgba(0, 0, 0, 0.14) !important;
}
html[data-lmui-scheme="dark"] {
  --lmui-composer-fill: rgba(18, 17, 22, 0.97);
  --lmui-composer-hairline: #e8e9ec1f;
}
html[data-lmui-scheme="light"] {
  --lmui-composer-fill: rgba(255, 255, 255, 0.97);
  --lmui-composer-hairline: #1d1c2017;
}

/* ── 7. 全屏固定背景层（v4d：按真实 DSH DOM 精确透明化）─────────────────
   实机 DSH 结构（读安装包 dsh-client-ui-layout / ui-theme 确认）：
     body > #root > div.pI_x6G_frame{background:var(--dsw-alias-bg-base)}
       > div.pI_x6G_sidebarCol{background:var(--dsw-specific-sidebar-fill)}
       > div.pI_x6G_centerCol > … > [data-phase]{background:var(--dsw-alias-bg-base)}
       > div.pI_x6G_bottomRow / div.pI_x6G_overlayLayer
   主题令牌由 ThemePresenter 以 **body inline style** 写入，所以这里不再泛化改
   令牌，改为对上述具体容器逐条 !important 透明化；背景层用 z-index:0 +
   #root z-index:1 压在内容之下（不依赖 z-index:-1）。
   动态背景层仍 fixed，开合/滚动/拖拽都不改变其位置。 */
html[data-lmui-rail-docked] [data-lmui-frame] {
  grid-template-columns: var(--lmui-rail-head, 0px 1fr) var(--lmui-rail-w, 0px) !important;
}

html[data-lmui-bg="on"] body {
  background-color: transparent !important;
}
html[data-lmui-bg="on"][data-lmui-scheme="dark"] body {
  background-image: var(--lmui-body-bg-dark, none) !important;
  background-size: cover !important;
  background-position: center center !important;
  background-attachment: fixed !important;
  background-color: transparent !important;
}
html[data-lmui-bg="on"][data-lmui-scheme="light"] body {
  background-image: var(--lmui-body-bg-light, none) !important;
  background-size: cover !important;
  background-position: center center !important;
  background-attachment: fixed !important;
  background-color: transparent !important;
}
html[data-lmui-bg="on"] #root,
html[data-lmui-bg="on"] #mock-root {
  position: relative;
  z-index: 1;
  background-color: transparent !important;
}
html[data-lmui-bg="on"][data-lmui-scheme="dark"] {
  background-color: #0b0a0e;
}
html[data-lmui-bg="on"][data-lmui-scheme="light"] {
  background-color: #ffffff;
}

.lmui-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
  background-color: transparent;
  contain: paint;
}
html[data-lmui-bg="off"] .lmui-bg {
  display: none;
}

/* 侧栏真正透出：--dsw-specific-sidebar-fill 同时被 frame 的 sidebarCol 与
   SidebarRoot 内层使用（读 dsh-client-ui-sidebar 源码确认），改这个 token
   才是让侧栏内外两层一起变透的正确机制（html + body 双写 !important，
   压过 ThemePresenter 写在 body 上的行内令牌）。 */
html[data-lmui-scheme="dark"][data-lmui-bg="on"],
html[data-lmui-scheme="dark"][data-lmui-bg="on"] body {
  --dsw-specific-sidebar-fill: rgba(8, 7, 11, 0.30) !important;
}
html[data-lmui-scheme="light"][data-lmui-bg="on"],
html[data-lmui-scheme="light"][data-lmui-bg="on"] body {
  --dsw-specific-sidebar-fill: rgba(255, 255, 255, 0.28) !important;
}
/* 观测栏：背景开启时从「深色玻璃」降到半透明玻璃，让同一张全屏背景透出 */
html[data-lmui-scheme="dark"][data-lmui-bg="on"] .lmui-rail__surface {
  background-color: rgba(8, 7, 11, 0.30) !important;
}
html[data-lmui-scheme="light"][data-lmui-bg="on"] .lmui-rail__surface {
  background-color: rgba(255, 255, 255, 0.28) !important;
}
/* 侧栏与观测栏的内层容器（滚动区/列表）不要再叠自己的实色底 */
html[data-lmui-bg="on"] .lmui-rail__body {
  background-color: transparent !important;
}

/* 宿主 frame / 三栏 / 底部行 / 会话 phase：透明（背景连续可见）。
   主选择器用「[data-shell-overlay] 的直接父节点」+ 当前 DSH 的 frame 类名双保险。 */
html[data-lmui-bg="on"] #root > div:has(> [data-shell-overlay]),
html[data-lmui-bg="on"] div:has(> [data-shell-overlay]),
html[data-lmui-bg="on"] .pI_x6G_frame {
  background-color: transparent !important;
  background-image: none !important;
}
html[data-lmui-bg="on"] #root > div:has(> [data-shell-overlay]) > div,
html[data-lmui-bg="on"] div:has(> [data-shell-overlay]) > div,
html[data-lmui-bg="on"] .pI_x6G_frame > div {
  background-color: transparent !important;
  background-image: none !important;
}
html[data-lmui-scheme="dark"][data-lmui-bg="on"] [data-phase] {
  background-color: rgba(11, 10, 14, 0.30) !important;
  background-image: none !important;
}
html[data-lmui-scheme="light"][data-lmui-bg="on"] [data-phase] {
  background-color: rgba(255, 255, 255, 0.28) !important;
  background-image: none !important;
}
/* 侧栏保留一层玻璃感（比正文稍厚），不吃掉整张背景 */
html[data-lmui-scheme="dark"][data-lmui-bg="on"] .pI_x6G_frame > div:first-of-type,
html[data-lmui-scheme="dark"][data-lmui-bg="on"] .mock-sidebar {
  background-color: rgba(8, 7, 11, 0.35) !important;
}
html[data-lmui-scheme="light"][data-lmui-bg="on"] .pI_x6G_frame > div:first-of-type,
html[data-lmui-scheme="light"][data-lmui-bg="on"] .mock-sidebar {
  background-color: rgba(255, 255, 255, 0.32) !important;
}
/* composer 底部渐变座不要变成横向色带：保持透明过渡 */
html[data-lmui-scheme="dark"][data-lmui-bg="on"] [class*="composerSeat"] {
  background: transparent !important;
}
html[data-lmui-scheme="light"][data-lmui-bg="on"] [class*="composerSeat"] {
  background: transparent !important;
}
/* ── preview mock 的等价容器（真实宿主不存在这些类，仅保证预览同构）── */
html[data-lmui-bg="on"] .mock-frame,
html[data-lmui-bg="on"] .mock-frame > *,
html[data-lmui-bg="on"] .mock-main,
html[data-lmui-bg="on"] .mock-sidebar,
html[data-lmui-bg="on"] .mock-overlay-layer {
  background-image: none !important;
}
html[data-lmui-bg="on"] .mock-frame,
html[data-lmui-bg="on"] .mock-frame > *,
html[data-lmui-bg="on"] .mock-main {
  background-color: transparent !important;
}

.lmui-bg__photo {
  position: absolute;
  inset: 0;
  background-image: var(--lmui-bg-dark, linear-gradient(transparent, transparent));
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  transform: scale(1.015);
  will-change: transform;
}
html[data-lmui-scheme="light"] .lmui-bg__photo {
  background-image: var(--lmui-bg-light, linear-gradient(transparent, transparent));
}
/* 深色背景图偏暗时提高可辨识度（用户实机反馈"看不见背景"） */
html[data-lmui-scheme="dark"] .lmui-bg__photo {
  filter: brightness(1.55) contrast(1.08) saturate(1.12);
}
.lmui-bg__veil {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(180deg, var(--lmui-bg-veil-top), var(--lmui-bg-veil-bottom));
  opacity: 0.55;
}
/* ── 程序绘制动效（v5）：单 canvas 画竖直光带/星点带/稀疏星点 ────────
   深色模式才显示；位置/宽度/亮度按图4 实测：光柱 x=143/215/706/1618/1628/1877
   宽 6~19px、亮度 rel_amp 0.37~1.32；点带点距 ≈6.6px；全画布 pointer-events:none。 */
html[data-lmui-scheme="dark"] .lmui-bg {
  --lmui-bg-veil-top: rgb(11 10 14 / calc(var(--lmui-bg-veil, 0.62) + 0.16));
  --lmui-bg-veil-bottom: rgb(11 10 14 / calc(var(--lmui-bg-veil, 0.62) + 0.06));
}
html[data-lmui-scheme="light"] .lmui-bg {
  --lmui-bg-veil-top: rgb(255 255 255 / calc(var(--lmui-bg-veil, 0.62) + 0.2));
  --lmui-bg-veil-bottom: rgb(255 255 255 / calc(var(--lmui-bg-veil, 0.62) + 0.12));
}
.lmui-bg__canvas {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
/* 浅色模式（终端远景）不画这些深色动效 */
html[data-lmui-scheme="light"] .lmui-bg__canvas {
  display: none;
}
/* 浅色模式：40~60s 极缓推近视差 */
html[data-lmui-scheme="light"][data-lmui-bg-motion="on"] .lmui-bg__photo {
  animation: lmui-bg-parallax 52s ease-in-out infinite alternate;
}
@keyframes lmui-bg-parallax {
  0% { transform: scale(1.005) translateY(0); }
  100% { transform: scale(1.025) translateY(6px); }
}
html[data-lmui-bg-motion="off"] .lmui-bg * {
  animation: none !important;
}

/* ── v6 浅色（神殿）色散 / 虹彩：仅 light，克制、低饱和、不压对比度 ────
   机制：RGB 三通道横向错位（红 +0.6~1.4px / 蓝 -0.6~1.4px 的柔和 drop-shadow
   或 text-shadow）+ 1px 级低饱和彩虹渐变边；深色模式完全不变。 */
html[data-lmui-scheme="light"] {
  --lmui-chroma-red: rgba(255, 64, 96, 0.22);
  --lmui-chroma-blue: rgba(64, 128, 255, 0.22);
}
/* 品牌徽记 / hero 徽记：容器级错位，不覆盖子层现有 filter */
html[data-lmui-scheme="light"] .lmui-mark {
  filter: drop-shadow(0.9px 0 0 var(--lmui-chroma-red)) drop-shadow(-0.9px 0 0 var(--lmui-chroma-blue));
}
html[data-lmui-scheme="light"] .lmui-hero-mark .lmui-mark {
  filter: drop-shadow(1.4px 0 0 var(--lmui-chroma-red)) drop-shadow(-1.4px 0 0 var(--lmui-chroma-blue));
}
html[data-lmui-scheme="light"] .lmui-brand-name__main {
  text-shadow: 0.8px 0 0 var(--lmui-chroma-red), -0.8px 0 0 var(--lmui-chroma-blue),
    0 0 14px rgba(255, 255, 255, 0.5);
}
/* 观测栏标题 / ONLINE 点 */
html[data-lmui-scheme="light"] .lmui-rail__title {
  text-shadow: 0.9px 0 0 rgba(255, 64, 96, 0.24), -0.9px 0 0 rgba(64, 128, 255, 0.24),
    0 0 12px rgba(255, 255, 255, 0.55);
}
html[data-lmui-scheme="light"] .lmui-rail__titleEn {
  text-shadow: 0.6px 0 0 rgba(255, 64, 96, 0.18), -0.6px 0 0 rgba(64, 128, 255, 0.18);
}
html[data-lmui-scheme="light"] .lmui-rail__linkDot {
  background: linear-gradient(135deg, #ffffff 0%, #ffe9ee 48%, #e9f1ff 100%);
  box-shadow: 0.9px 0 0 rgba(255, 64, 96, 0.5), -0.9px 0 0 rgba(64, 128, 255, 0.5),
    0 0 8px rgba(255, 255, 255, 0.85), 0 0 14px rgba(255, 190, 210, 0.35);
}
/* 派蒙全息描边 */
html[data-lmui-scheme="light"] .lmui-paimon {
  filter: drop-shadow(1px 0 0 rgba(255, 80, 120, 0.2)) drop-shadow(-1px 0 0 rgba(80, 140, 255, 0.2));
}
/* 导航选中项（预览 mock + DSH 真实 panelActive） */
html[data-lmui-scheme="light"] .mock-item--active,
html[data-lmui-scheme="light"] [class*="_panelActive"] {
  box-shadow: inset 1px 0 0 rgba(255, 64, 96, 0.22), inset -1px 0 0 rgba(64, 128, 255, 0.22) !important;
  text-shadow: 0.6px 0 0 rgba(255, 64, 96, 0.16), -0.6px 0 0 rgba(64, 128, 255, 0.16);
}
/* Hero 标题 / 副标 */
html[data-lmui-scheme="light"] .mock-hero__title,
html[data-lmui-scheme="light"] [data-phase="hero"] h1 {
  text-shadow: 1px 0 0 rgba(255, 64, 96, 0.2), -1px 0 0 rgba(64, 128, 255, 0.2),
    0 0 18px rgba(255, 255, 255, 0.5);
}
html[data-lmui-scheme="light"] .mock-hero__sub,
html[data-lmui-scheme="light"] [data-phase="hero"] h1 + p {
  text-shadow: 0.7px 0 0 rgba(255, 64, 96, 0.16), -0.7px 0 0 rgba(64, 128, 255, 0.16);
}
/* composer 内的宿主按钮焦点：白环 + 红蓝错位（不改变布局/对比度） */
html[data-lmui-scheme="light"] [data-composer-card] button:focus-visible {
  outline: none !important;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.9), 0.9px 0 0 var(--lmui-chroma-red),
    -0.9px 0 0 rgba(64, 128, 255, 0.3) !important;
}
/* composer 焦点边框：白色为主 + 红蓝错位，不改变布局 */
html[data-lmui-scheme="light"] [data-composer-card]:focus-within {
  border-color: rgba(255, 255, 255, 0.9) !important;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.9), 0.9px 0 0 var(--lmui-chroma-red),
    -0.9px 0 0 rgba(64, 128, 255, 0.3), 0 0 18px rgba(255, 255, 255, 0.4) !important;
}
/* 按钮 / 焦点环（仅插件自有控件，避免影响宿主可访问性环） */
html[data-lmui-scheme="light"] .lmui-rail__close:focus-visible,
html[data-lmui-scheme="light"] .lmui-rail-toggle:focus-visible,
html[data-lmui-scheme="light"] .lmui-music__btn:focus-visible {
  outline: none !important;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.85), 0.9px 0 0 var(--lmui-chroma-red),
    -0.9px 0 0 rgba(64, 128, 255, 0.3), 0 0 0 2px rgba(255, 255, 255, 0.35) !important;
}
/* 进度 / 音量滑块：低饱和虹彩轨道 + 白色拇指 + 红蓝错位 */
html[data-lmui-scheme="light"] .lmui-music__progress::-webkit-slider-runnable-track,
html[data-lmui-scheme="light"] .lmui-music__volumeInput::-webkit-slider-runnable-track {
  background: linear-gradient(90deg, #ffffff 0%, #ffeef2 28%, #f3f8ff 58%, #ffffff 100%);
  box-shadow: 0.7px 0 0 rgba(255, 64, 96, 0.16), -0.7px 0 0 rgba(64, 128, 255, 0.16);
}
html[data-lmui-scheme="light"] .lmui-music__progress::-webkit-slider-thumb,
html[data-lmui-scheme="light"] .lmui-music__volumeInput::-webkit-slider-thumb {
  background: #ffffff;
  border-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0.8px 0 0 rgba(255, 64, 96, 0.5), -0.8px 0 0 rgba(64, 128, 255, 0.5),
    0 0 8px rgba(255, 255, 255, 0.9);
}

/* ── v7 蓝色元素 → 低饱和虹彩（深/浅双模式）─────────────────────────────
   真实 DSH 选择器（读安装包源码确认）：
   - composer 发送：InputBar.module.css .uV2eYG_primary（[data-composer-card] 内
     button，原 background:--dsw-alias-button-info-fill）
   - 预览版徽标：HeroShell.module.css .pXSMma_previewBadge（原 state-business-tertiary
     + label-primary-bluish）
   - 对话/轨迹选中：Conversation .wSkVaW_tabActive（color/:after 原 state-business-primary）
   - 当前工作区文件夹：ui-workspace .YDXeBa_folderActive（原 state-business-primary）
   统一用「白→极淡紫→极淡青」低饱和渐变 + 极轻红蓝 ±0.5–0.8px 色散边；
   深色偏亮、浅色偏白但可见。 */
html[data-lmui-scheme="dark"] {
  --lmui-irid-a: #575270;
  --lmui-irid-b: #756e92;
  --lmui-irid-c: #4c5a78;
  --lmui-irid-ink: #f7f5fb;
  --lmui-irid-border: rgba(255, 255, 255, 0.22);
  --lmui-irid-line: linear-gradient(90deg, #ffd9e2 0%, #e3dcf6 46%, #d9e9f7 100%);
}
html[data-lmui-scheme="light"] {
  --lmui-irid-a: #f6f2fb;
  --lmui-irid-b: #e8e0f5;
  --lmui-irid-c: #e2edf7;
  --lmui-irid-ink: #2e2938;
  --lmui-irid-border: rgba(90, 78, 118, 0.2);
  --lmui-irid-line: linear-gradient(90deg, #ffd9e2 0%, #e3dcf6 46%, #d9e9f7 100%);
}
/* composer 发送按钮：低饱和虹彩渐变圆 + 深/浅各自可读图标色。
   v13 修复：hover 不再用 filter（会触发整卡 backdrop-filter 重新合成，
   主画面闪一下），改为仅按钮自身的 box-shadow/亮度叠加；按钮固定为独立
   合成层，hover 只重绘按钮区域。 */
[data-composer-card] button[class*="_primary"] {
  position: relative;
  background-image: linear-gradient(135deg, var(--lmui-irid-a) 0%, var(--lmui-irid-b) 52%, var(--lmui-irid-c) 100%) !important;
  background-color: transparent !important;
  color: var(--lmui-irid-ink) !important;
  border: none !important;
  box-shadow: 0.6px 0 0 rgba(255, 64, 96, 0.4), -0.6px 0 0 rgba(64, 128, 255, 0.4),
    inset 0 0 0 0.5px var(--lmui-irid-border);
}
[data-composer-card] button[class*="_primary"]:hover:not(:disabled) {
  /* v14: 悬停不再触发任何合成层/滤镜变化，避免主体闪烁 */
  box-shadow: 0.6px 0 0 rgba(255, 64, 96, 0.4), -0.6px 0 0 rgba(64, 128, 255, 0.4),
    inset 0 0 0 0.5px var(--lmui-irid-border);
}
[data-composer-card] button[class*="_primary"] path,
[data-composer-card] button[class*="_primary"] svg {
  color: var(--lmui-irid-ink) !important;
}
/* 预览版徽标：低饱和白/淡紫底 + 深/浅可读字色 + 红蓝错位边 */
[class*="_previewBadge"] {
  background-image: linear-gradient(135deg, var(--lmui-irid-a) 0%, var(--lmui-irid-b) 55%, var(--lmui-irid-c) 100%) !important;
  background-color: transparent !important;
  color: var(--lmui-irid-ink) !important;
  border-color: var(--lmui-irid-border) !important;
  text-shadow: 0.5px 0 0 rgba(255, 64, 96, 0.28), -0.5px 0 0 rgba(64, 128, 255, 0.28);
  box-shadow: 0.5px 0 0 rgba(255, 64, 96, 0.22), -0.5px 0 0 rgba(64, 128, 255, 0.22);
}
/* 对话 / 轨迹切换的选中态：低饱和字色 + 虹彩下划线 + 红蓝错位 */
[class*="_tabActive"] {
  color: var(--lmui-irid-ink) !important;
  text-shadow: 0.6px 0 0 rgba(255, 64, 96, 0.32), -0.6px 0 0 rgba(64, 128, 255, 0.32);
}
[class*="_tabActive"]:after {
  background: var(--lmui-irid-line) !important;
  box-shadow: 0.5px 0 0 rgba(255, 64, 96, 0.35), -0.5px 0 0 rgba(64, 128, 255, 0.35);
}
/* 当前工作区文件夹图标：低饱和紫灰 + 极轻色散 */
[class*="_folderActive"] {
  color: var(--lmui-irid-ink) !important;
  filter: drop-shadow(0.5px 0 0 rgba(255, 64, 96, 0.35))
    drop-shadow(-0.5px 0 0 rgba(64, 128, 255, 0.35));
}

/* ── v8 新品牌线稿素材（黑描边白主体 / 彩色）：深色反相成白线，浅色保黑线 ──
   素材未到位时品牌组件会自动回退旧 pattern（data-lmui-shape 仍是旧 kind），
   这些规则只命中新素材加载成功后的 new-ink / new-color。 */
html[data-lmui-scheme="dark"] .lmui-mark__layer[data-lmui-shape="new-ink-dark"] .lmui-mark__media {
  filter: brightness(1.06) contrast(1.04) drop-shadow(0 0 6px rgba(232, 233, 236, 0.28)) !important;
}
html[data-lmui-scheme="dark"] .lmui-mark__layer[data-lmui-shape="new-bw-light"] .lmui-mark__media {
  filter: brightness(0) invert(1) contrast(1.04) drop-shadow(0 0 6px rgba(232, 233, 236, 0.24)) !important;
}
html[data-lmui-scheme="light"] .lmui-mark__layer[data-lmui-shape="new-ink-dark"] .lmui-mark__media {
  filter: invert(1) contrast(1.05) drop-shadow(0 1px 2px rgba(29, 28, 32, 0.16)) !important;
}
html[data-lmui-scheme="light"] .lmui-mark__layer[data-lmui-shape="new-bw-light"] .lmui-mark__media {
  filter: contrast(1.04) drop-shadow(0 1px 2px rgba(29, 28, 32, 0.16)) !important;
}
html[data-lmui-scheme="dark"] .lmui-mark__layer[data-lmui-shape="new-ink"] .lmui-mark__media {
  filter: invert(1) brightness(1.06) contrast(1.05)
    drop-shadow(0 0 6px rgba(232, 233, 236, 0.24)) !important;
}
html[data-lmui-scheme="dark"] .lmui-mark__layer[data-lmui-shape="new-color"] .lmui-mark__media {
  filter: brightness(1.08) contrast(1.03) saturate(1.04)
    drop-shadow(0 0 7px rgba(232, 233, 236, 0.22)) !important;
}
html[data-lmui-scheme="light"] .lmui-mark__layer[data-lmui-shape="new-ink"] .lmui-mark__media {
  filter: contrast(1.06) drop-shadow(0 1px 2px rgba(29, 28, 32, 0.16)) !important;
}
html[data-lmui-scheme="light"] .lmui-mark__layer[data-lmui-shape="new-color"] .lmui-mark__media {
  filter: saturate(0.94) brightness(0.99) contrast(1.04)
    drop-shadow(0 1px 2px rgba(29, 28, 32, 0.16)) !important;
}

/* ── v11 whale 思考指示器：APNG <img> 播放（mask 对 APNG 只取首帧）──── */
html[data-lmui-whale-ready="1"] [data-chat-running] [class*="_runningWhaleAnimated"],
html[data-lmui-whale-ready="1"] [data-chat-running] [class*="_runningWhaleStill"] {
  display: none !important;
}
.lmui-whale-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  pointer-events: none;
  opacity: 0.92;
  filter: brightness(0) invert(1) drop-shadow(0 0 2px rgba(160, 196, 255, 0.55));
}
html[data-lmui-scheme="light"] .lmui-whale-img {
  opacity: 0.78;
  filter: brightness(0) saturate(100%) drop-shadow(0 0 1px rgba(70, 58, 82, 0.28));
}

/* ── v11 思考文案：低饱和虹彩 gradient text（只作用于新文案）────────── */
:root {
  --lmui-thinking-iris: linear-gradient(100deg, #f7f4ff 0%, #d8c7ff 24%, #ffd2e8 48%, #c4f4ec 72%, #ffffff 100%);
}
html[data-lmui-scheme="light"] {
  --lmui-thinking-iris: linear-gradient(100deg, #4b4560 0%, #7a619e 24%, #a2607c 48%, #3f7f79 72%, #4a4a5d 100%);
}
[data-chat-running] [data-shimmer] [class*="_text"],
[data-chat-running] [data-shimmer] [data-shimmer-text]::after {
  background-image: var(--lmui-thinking-iris) !important;
  background-size: 220% 100% !important;
  background-position: 0% 50%;
  -webkit-background-clip: text !important;
  background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  color: transparent !important;
  animation: lmui-thinking-iris-flow 8s ease-in-out infinite !important;
}
@keyframes lmui-thinking-iris-flow {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
@media (prefers-reduced-motion: reduce) {
  [data-chat-running] [data-shimmer] [class*="_text"],
  [data-chat-running] [data-shimmer] [data-shimmer-text]::after {
    animation: none !important;
    background-position: 42% 50%;
  }
}

/* ── v11 派蒙横向扫描带：从框顶连续扫到框底，4–6s 一次 ─────────────── */
.lmui-paimon__scan {
  position: absolute;
  z-index: 3;
  inset: 0;
  height: auto;
  overflow: hidden;
  opacity: 1;
  pointer-events: none;
  -webkit-mask-image: none;
  mask-image: none;
  background: none;
}
.lmui-paimon__scan::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 20px;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgba(200, 235, 248, 0) 0%,
    rgba(200, 235, 248, 0.08) 24%,
    rgba(220, 244, 255, 0.34) 42%,
    rgba(240, 250, 255, 0.7) 52%,
    rgba(190, 235, 245, 0.3) 64%,
    rgba(200, 235, 248, 0) 100%
  );
  filter: blur(0.4px);
  mix-blend-mode: screen;
  opacity: 0;
  translate: 0 -20px;
  animation: lmui-paimon-scan-band var(--lmui-scan-cycle, 5s) linear infinite;
}
.lmui-paimon__scan::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: -4px;
  height: 26px;
  pointer-events: none;
  background: linear-gradient(180deg, rgba(205, 240, 250, 0) 0%, rgba(205, 240, 250, 0.2) 55%, rgba(205, 240, 250, 0) 100%);
  filter: blur(4px);
  mix-blend-mode: screen;
  opacity: 0;
  translate: 0 -26px;
  animation: lmui-paimon-scan-trail var(--lmui-scan-cycle, 5s) linear infinite;
}
@keyframes lmui-paimon-scan-band {
  0%, 7.9% { opacity: 0; translate: 0 -20px; }
  8% { opacity: 0.16; translate: 0 0; }
  10% { opacity: 0.26; }
  24% { opacity: 0.22; translate: 0 184px; }
  28% { opacity: 0; translate: 0 196px; }
  28.01%, 100% { opacity: 0; translate: 0 -20px; }
}
@keyframes lmui-paimon-scan-trail {
  0%, 7.9% { opacity: 0; translate: 0 -26px; }
  8% { opacity: 0.06; translate: 0 0; }
  10% { opacity: 0.12; }
  24% { opacity: 0.08; translate: 0 196px; }
  28%, 100% { opacity: 0; translate: 0 196px; }
}
/* glitch 重影：同线稿背景，横向切片错位 + RGB 红蓝 ±2px 边；每 8–14s 一次 */
.lmui-paimon__ghost {
  position: absolute;
  inset: 0;
  z-index: 2;
  opacity: 0;
  pointer-events: none;
  background-image: var(--lmui-paimon-img);
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-position: center bottom;
  mix-blend-mode: screen;
  filter: drop-shadow(2px 0 0 rgba(255, 64, 96, 0.55))
    drop-shadow(-2px 0 0 rgba(64, 160, 255, 0.5));
  animation-name: lmui-paimon-glitch-a;
  animation-duration: var(--lmui-glitch-cycle-a, 11s);
  animation-timing-function: steps(1, end);
  animation-iteration-count: infinite;
}
.lmui-paimon__ghost--b {
  animation-name: lmui-paimon-glitch-b;
  animation-duration: var(--lmui-glitch-cycle-a, 11s);
  animation-delay: 0.05s;
}
.lmui-paimon[data-lmui-paimon="guide"] .lmui-paimon__ghost {
  top: -2px;
  scale: 2.15;
  transform-origin: 50% 0%;
}
.lmui-paimon[data-lmui-paimon="paimon2"] .lmui-paimon__ghost {
  top: -24px;
  scale: 1.6;
  transform-origin: 50% 0%;
}
.lmui-paimon[data-lmui-paimon="emoji"] .lmui-paimon__ghost {
  inset: 34px 0 auto;
  height: 128px;
  scale: 1.8;
  transform-origin: 50% 50%;
  background-position: center center;
}
@keyframes lmui-paimon-glitch-a {
  0%, 84%, 100% { opacity: 0; translate: 0 0; clip-path: inset(0 0 0 0); }
  85% { opacity: 0.55; translate: -3px 0; clip-path: inset(16% 0 58% 0); }
  86% { opacity: 0.32; translate: 3px 0; clip-path: inset(55% 0 20% 0); }
  87% { opacity: 0.5; translate: -2px 0; clip-path: inset(4% 0 76% 0); }
  88% { opacity: 0.28; translate: 2px 0; clip-path: inset(68% 0 8% 0); }
  89%, 100% { opacity: 0; translate: 0 0; }
}
@keyframes lmui-paimon-glitch-b {
  0%, 86%, 100% { opacity: 0; translate: 0 0; clip-path: inset(0 0 0 0); }
  87% { opacity: 0.4; translate: 2px 0; clip-path: inset(30% 0 44% 0); }
  88% { opacity: 0.55; translate: -2px 0; clip-path: inset(8% 0 68% 0); }
  89% { opacity: 0.25; translate: 3px 0; clip-path: inset(62% 0 12% 0); }
  90%, 100% { opacity: 0; translate: 0 0; }
}
/* 偶发亮带 */
.lmui-paimon__glitchBar {
  position: absolute;
  left: 0;
  right: 0;
  top: 38%;
  z-index: 2;
  height: 2px;
  opacity: 0;
  pointer-events: none;
  background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.5) 38%,
    rgba(255, 100, 150, 0.4) 58%, transparent 100%);
  mix-blend-mode: screen;
  animation: lmui-paimon-glitch-bar var(--lmui-glitch-bar-cycle, 13s) linear infinite;
}
@keyframes lmui-paimon-glitch-bar {
  0%, 90%, 100% { opacity: 0; translate: 0 0; }
  91% { opacity: 0.5; translate: 0 0; }
  92% { opacity: 0.22; translate: 0 18px; }
  93% { opacity: 0.42; translate: 0 -14px; }
  94%, 100% { opacity: 0; translate: 0 0; }
}

/* ── 降低动效 ───────────────────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .lmui-decor *,
  .lmui-rail,
  .lmui-statusline,
  .lmui-paimon__img,
  .lmui-paimon__fallback,
  .lmui-paimon__scan,
  .lmui-paimon__ghost,
  .lmui-paimon__glitchBar,
  .lmui-bg * {
    animation: none !important;
    transition: none !important;
  }
  .lmui-paimon__scan,
  .lmui-paimon__ghost,
  .lmui-paimon__glitchBar { opacity: 0 !important; }
  .lmui-paimon__scan::before,
  .lmui-paimon__scan::after { animation: none !important; opacity: 0 !important; }
  .lmui-rail { transition: opacity 0.01s linear !important; }
}
`;
var SETTINGS_CSS = String.raw`
/* 光之镜设置页：只用 --dsw-* 主题变量，行/控件尺寸对齐 DSH 原生设置面板。 */
.lmui-settings {
  width: 100%;
  max-width: 620px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: var(--dsw-alias-label-primary);
  font-family: var(--dsw-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif);
  font-size: 14px;
  line-height: 22px;
}
.lmui-settings * { box-sizing: border-box; }
.lmui-settings__head {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 2px 0 10px;
}
.lmui-settings__title {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: var(--dsw-alias-label-primary);
}
.lmui-settings__desc {
  margin: 0;
  font-size: 12px;
  line-height: 18px;
  color: var(--dsw-alias-label-secondary);
}
.lmui-group {
  display: flex;
  flex-direction: column;
  padding: 2px 0 6px;
}
.lmui-group__title {
  margin: 0;
  padding: 14px 0 10px;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  color: var(--dsw-alias-label-primary);
  border-bottom: 0.5px solid var(--dsw-alias-border-l2);
}
.lmui-group__desc {
  margin: 8px 0 0;
  padding: 8px 10px;
  font-size: 12px;
  line-height: 18px;
  color: var(--dsw-alias-label-secondary);
  background: color-mix(in srgb, var(--dsw-alias-label-primary) 4%, transparent);
  border: 0.5px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
}
.lmui-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 14px 0;
  border-bottom: 0.5px solid var(--dsw-alias-border-l2);
}
.lmui-row:last-child { border-bottom: none; }
.lmui-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}
.lmui-field__text {
  font-size: 14px;
  line-height: 20px;
  color: var(--dsw-alias-label-primary);
}
.lmui-field__hint {
  font-size: 12px;
  line-height: 18px;
  color: var(--dsw-alias-label-secondary);
}
.lmui-field__control {
  display: flex;
  align-items: center;
  flex: none;
  min-width: 0;
  max-width: 62%;
}
.lmui-check {
  width: 16px;
  height: 16px;
  margin: 0;
  accent-color: var(--dsw-alias-label-primary);
  cursor: pointer;
  flex: none;
}
.lmui-check:disabled { cursor: default; opacity: 0.45; }
.lmui-textWrap {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 260px;
  max-width: 100%;
}
.lmui-text {
  box-sizing: border-box;
  flex: 1 1 auto;
  min-width: 0;
  height: 32px;
  padding: 0 8px;
  border: 0.5px solid var(--dsw-alias-border-l3);
  border-radius: var(--dsw-radius-sm);
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-primary);
  font: inherit;
  font-size: 13px;
  outline: none;
}
.lmui-text:focus-visible {
  border-color: var(--dsw-alias-label-secondary);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--dsw-alias-label-primary) 16%, transparent);
}
.lmui-text__reset {
  flex: none;
  height: 30px;
  padding: 0 9px;
  border: 0.5px solid var(--dsw-alias-border-l3);
  border-radius: var(--dsw-radius-sm);
  background: transparent;
  color: var(--dsw-alias-label-secondary);
  font: inherit;
  font-size: 12px;
  cursor: pointer;
}
.lmui-text__reset:hover { background: var(--dsw-alias-interactive-bg-hover); }
.lmui-select {
  min-width: 168px;
  max-width: 100%;
  height: 32px;
  padding: 0 8px;
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-primary);
  font: inherit;
  font-size: 13px;
  line-height: 30px;
  cursor: pointer;
}
.lmui-select:hover { border-color: var(--dsw-alias-border-l3); }
.lmui-select:focus-visible {
  outline: none;
  border-color: var(--dsw-alias-label-secondary);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--dsw-alias-label-primary) 16%, transparent);
}
.lmui-range {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 240px;
  width: 100%;
}
.lmui-range__input {
  flex: 1 1 auto;
  min-width: 120px;
  height: 18px;
  margin: 0;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
}
.lmui-range__input::-webkit-slider-runnable-track {
  height: 4px;
  border-radius: 2px;
  background: linear-gradient(
    90deg,
    var(--dsw-alias-label-primary) 0%,
    var(--dsw-alias-label-primary) var(--lmui-fill, 50%),
    color-mix(in srgb, var(--dsw-alias-label-secondary) 26%, transparent) var(--lmui-fill, 50%),
    color-mix(in srgb, var(--dsw-alias-label-secondary) 26%, transparent) 100%
  );
}
.lmui-range__input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  margin-top: -5px;
  border-radius: 50%;
  background: var(--dsw-alias-label-primary);
  border: 2px solid var(--dsw-alias-bg-layer-2);
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--dsw-alias-label-primary) 40%, transparent);
  cursor: pointer;
}
.lmui-range__input:disabled { cursor: default; opacity: 0.45; }
.lmui-range__value {
  flex: none;
  min-width: 52px;
  text-align: right;
  font-family: "SF Mono", "JetBrains Mono", "Consolas", monospace;
  font-size: 12px;
  line-height: 18px;
  color: var(--dsw-alias-label-secondary);
  letter-spacing: 0.02em;
}
.lmui-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  padding: 16px 0 10px;
}
.lmui-btn {
  height: 32px;
  padding: 0 14px;
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  background: transparent;
  color: var(--dsw-alias-label-primary);
  font: inherit;
  font-size: 13px;
  line-height: 30px;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}
.lmui-btn:hover:not(:disabled) {
  background: var(--dsw-alias-interactive-bg-hover);
  border-color: var(--dsw-alias-border-l3);
}
.lmui-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--dsw-alias-label-primary) 18%, transparent);
}
.lmui-btn:disabled { opacity: 0.5; cursor: default; }
.lmui-btn--primary {
  background: var(--dsw-alias-label-primary);
  border-color: transparent;
  color: var(--dsw-alias-label-primary-foreground, var(--dsw-alias-bg-base));
  font-weight: 500;
}
.lmui-btn--primary:hover:not(:disabled) {
  background: color-mix(in srgb, var(--dsw-alias-label-primary) 88%, #888 12%);
  border-color: transparent;
}
.lmui-status {
  font-size: 12px;
  line-height: 18px;
  color: var(--dsw-alias-label-tertiary);
}
.lmui-status--ok { color: var(--dsw-alias-state-success-primary); }
.lmui-status--err { color: var(--dsw-alias-state-error-primary); }
.lmui-foot {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 14px 0 4px;
  border-top: 0.5px solid var(--dsw-alias-border-l2);
  margin-top: 6px;
}
.lmui-foot__line {
  font-size: 12px;
  line-height: 18px;
  color: var(--dsw-alias-label-tertiary);
}
.lmui-foot__line--mono {
  font-family: "SF Mono", "JetBrains Mono", "Consolas", monospace;
  letter-spacing: 0.02em;
}
`;

// src/client/theme.js
var HIGHLIGHT_SOURCE = THEME_SOURCE + "-highlight";
var MEDIA_DARK = "(prefers-color-scheme: dark)";
var HIGHLIGHT_TOKENS = {
  "--dsw-alias-label-tertiary": { light: "#77747A", dark: "#7E7C88" },
  "--dsw-alias-label-primary-foreground": { light: "#EDEDEF", dark: "#0B0A0E" },
  "--dsw-alias-interactive-bg-hover": { light: "#1D1C2012", dark: "#E8E9EC14" },
  "--dsw-alias-interactive-bg-active": { light: "#1D1C201F", dark: "#E8E9EC1F" },
  "--dsw-focus-ring-color": { light: "#4B4752", dark: "#C8C8D6" },
  /* ── v3 浅色可读性补丁 ────────────────────────────────────────────────
     用户反馈「浅色模式下有些地方底是深色、字也是深色」。根因是：强制 temple
     时宿主仍带 data-ds-dark-theme，未被主令牌覆盖的 DSH 深色表面变量会留下
     深底；这些额外表面令牌在 temple 下一律换到灰白石，保证深字可读。 */
  "--dsw-alias-bg-layer-3": { light: "#E2DFDA", dark: "#353638" },
  "--dsw-alias-button-primary-hover": { light: "#5E5A64", dark: "#F5F5F7" },
  "--dsw-alias-button-primary-dimmed": { light: "#CFCBC4", dark: "#4A4750" },
  "--dsw-alias-button-floating-fill": { light: "#EFEEEA", dark: "#232324" },
  "--dsw-alias-button-floating-hover": { light: "#E2DFDA", dark: "#2C2C2E" },
  "--dsw-alias-button-elevated-fill": { light: "#E6E4E0", dark: "#232324" },
  "--dsw-alias-button-ghost-active-fill": { light: "#DEDAD4", dark: "#2A282F" },
  "--dsw-alias-interactive-bg-hover-solid": { light: "#DEDAD4", dark: "#2A282F" },
  "--dsw-alias-bg-module-platform": { light: "#E2DFDA", dark: "#2A2830" },
  "--dsw-alias-bg-multi-select": { light: "#E2DFDA", dark: "#2A2830" },
  "--dsw-alias-settings-card-fill": { light: "#E6E4E0", dark: "#18161C" },
  "--dsw-alias-settings-card-stroke": { light: "#C2C0BA", dark: "#2A2831" },
  "--dsw-alias-markdown-code-block": { light: "#EFEEEA", dark: "#151419" },
  "--dsw-alias-markdown-code-block-banner": { light: "#E6E4E0", dark: "#1B1A20" },
  "--dsw-alias-markdown-inline-code": { light: "#E2DFDA", dark: "#24232A" },
  "--dsw-alias-markdown-tag": { light: "#DEDAD4", dark: "#2A282F" },
  /* ── v7 蓝色元素 → 低饱和紫灰/白（深浅分别给明度）────────────────────
     composer 发送按钮原 --dsw-alias-button-info-fill、预览版徽标原
     state-business-tertiary/label-primary-bluish、对话/轨迹 tab 选中与
     工作区文件夹图标原 state-business-primary；这里先把 token 降到低饱和，
     渐变/色散由 styles.js 的精确选择器补。 */
  "--dsw-alias-state-business-primary": { light: "#6E6886", dark: "#C3BDDA" },
  "--dsw-alias-state-business-tertiary": { light: "#F2EEF9", dark: "#312D3D" },
  "--dsw-alias-label-primary-bluish": { light: "#5C566E", dark: "#DDD8EA" },
  "--dsw-alias-button-info-fill": { light: "#7A7395", dark: "#8A83A4" },
  "--dsw-alias-button-info-hover": { light: "#6C6686", dark: "#9C95B6" }
};
function foldForMode(pair, uiMode) {
  if (uiMode === "terminal") return { light: pair.dark, dark: pair.dark };
  if (uiMode === "temple") return { light: pair.light, dark: pair.light };
  return { light: pair.light, dark: pair.dark };
}
function flattenForScheme(tokens, scheme) {
  const out = {};
  for (const name of Object.keys(tokens)) {
    out[name] = tokens[name][scheme === "dark" ? "dark" : "light"];
  }
  return out;
}
function prefersDark() {
  try {
    return typeof window !== "undefined" && window.matchMedia ? window.matchMedia(MEDIA_DARK).matches : false;
  } catch (e) {
    return false;
  }
}
function createThemeController(ctx, store) {
  let disposers = [];
  let armed = false;
  let themeChangeOff = null;
  let savedHostPreference = null;
  const theme = ctx && ctx.theme ? ctx.theme : null;
  function hostPreference() {
    try {
      if (!theme || typeof theme.getTheme !== "function") return null;
      const snap = theme.getTheme();
      return snap && typeof snap.preference === "string" ? snap.preference : null;
    } catch (e) {
      return null;
    }
  }
  function restoreHostPreference() {
    if (savedHostPreference === null) return;
    const restore = savedHostPreference;
    savedHostPreference = null;
    try {
      if (!theme || typeof theme.setTheme !== "function") return;
      if (hostPreference() !== restore) theme.setTheme(restore);
    } catch (e) {
    }
  }
  function syncHostPreference(mode) {
    const forced = mode === "terminal" || mode === "temple";
    if (!forced) {
      restoreHostPreference();
      return;
    }
    try {
      if (!theme || typeof theme.setTheme !== "function") return;
      const current = hostPreference();
      if (savedHostPreference === null && current !== null) savedHostPreference = current;
      const target = mode === "terminal" ? "dark" : "light";
      if (current !== target) theme.setTheme(target);
    } catch (e) {
    }
  }
  function baseScheme(cfg) {
    const mode = cfg && cfg.uiMode ? cfg.uiMode : "auto";
    if (mode === "terminal") return "dark";
    if (mode === "temple") return "light";
    try {
      if (theme && typeof theme.getTheme === "function") {
        const snap = theme.getTheme();
        const scheme = snap && snap.active ? snap.active.colorScheme : null;
        if (scheme === "light" || scheme === "dark") return scheme;
      }
    } catch (e) {
    }
    return prefersDark() ? "dark" : "light";
  }
  function resolvedMode(cfg) {
    return baseScheme(cfg) === "dark" ? "terminal" : "temple";
  }
  function markDocument(cfg) {
    try {
      const el = document.documentElement;
      if (!el) return;
      const mode = cfg && cfg.uiMode ? cfg.uiMode : "auto";
      const scheme = baseScheme(cfg);
      el.setAttribute("data-lmui-mode", mode);
      el.setAttribute("data-lmui-resolved", scheme === "dark" ? "terminal" : "temple");
      el.setAttribute("data-lmui-scheme", scheme);
      el.style.colorScheme = scheme;
      if (document.body) {
        if (scheme === "dark") document.body.setAttribute("data-ds-dark-theme", "");
        else document.body.removeAttribute("data-ds-dark-theme");
      }
    } catch (e) {
    }
  }
  function clearDocumentMarks() {
    try {
      const el = document.documentElement;
      if (!el) return;
      el.removeAttribute("data-lmui-mode");
      el.removeAttribute("data-lmui-resolved");
      el.removeAttribute("data-lmui-scheme");
      el.style.removeProperty("color-scheme");
    } catch (e) {
    }
  }
  function disarm() {
    const pending = disposers;
    disposers = [];
    armed = false;
    for (let i = pending.length - 1; i >= 0; i -= 1) {
      try {
        if (typeof pending[i] === "function") pending[i]();
      } catch (e) {
      }
    }
    clearDocumentMarks();
  }
  function arm(cfg) {
    if (!theme) return;
    disarm();
    const mode = cfg && cfg.uiMode ? cfg.uiMode : "auto";
    syncHostPreference(mode);
    const scheme = baseScheme(cfg);
    const folded = {};
    for (const name of Object.keys(TOKENS.dark)) {
      folded[name] = foldForMode({ light: TOKENS.light[name], dark: TOKENS.dark[name] }, mode);
    }
    try {
      if (typeof theme.register === "function") {
        const layer = theme.register({
          id: THEME_ID,
          colorScheme: scheme === "dark" ? "dark" : "light",
          tokens: flattenForScheme(folded, scheme)
        });
        if (typeof layer === "function") disposers.push(layer);
      }
    } catch (e) {
    }
    try {
      if (typeof theme.overrideTokens === "function") {
        const layer = theme.overrideTokens(THEME_SOURCE, folded);
        if (typeof layer === "function") disposers.push(layer);
      }
    } catch (e) {
    }
    try {
      if (typeof theme.overrideTokens === "function") {
        const highlight = {};
        for (const name of Object.keys(HIGHLIGHT_TOKENS)) {
          highlight[name] = foldForMode(HIGHLIGHT_TOKENS[name], mode);
        }
        const layer = theme.overrideTokens(HIGHLIGHT_SOURCE, highlight);
        if (typeof layer === "function") disposers.push(layer);
      }
    } catch (e) {
    }
    markDocument(cfg);
    armed = true;
  }
  function refresh(cfg) {
    if (!cfg || cfg.enabled !== true) {
      restoreHostPreference();
      disarm();
      return;
    }
    arm(cfg);
  }
  if (ctx && typeof ctx.on === "function") {
    try {
      themeChangeOff = ctx.on("theme/change", () => {
        try {
          const cfg = store && typeof store.get === "function" ? store.get() : null;
          if (!armed || !cfg) return;
          const mode = cfg.uiMode || "auto";
          if (mode !== "auto") {
            const target = mode === "terminal" ? "dark" : "light";
            try {
              if (theme && typeof theme.setTheme === "function" && hostPreference() !== target) {
                theme.setTheme(target);
              }
            } catch (e) {
            }
          }
          markDocument(cfg);
        } catch (e) {
        }
      });
    } catch (e) {
      themeChangeOff = null;
    }
  }
  function dispose() {
    restoreHostPreference();
    disarm();
    if (typeof themeChangeOff === "function") {
      try {
        themeChangeOff();
      } catch (e) {
      }
      themeChangeOff = null;
    }
  }
  return {
    arm,
    disarm,
    refresh,
    isArmed() {
      return armed;
    },
    baseScheme,
    resolvedMode,
    dispose
  };
}

// src/client/heroTitle.js
var HERO_TITLE_DEFAULT = "封锁已至之境";
var HERO_TITLE_STORAGE = "light-mirror:heroTitle";
var HERO_TITLE_MAX = 40;
var THINKING_DEFAULT = "黑玛门尼解算中";
var THINKING_STORAGE = "light-mirror:thinkingLabel";
var THINKING_MAX = 30;
function readStoredHeroTitle() {
  try {
    const value = window.localStorage.getItem(HERO_TITLE_STORAGE);
    return value === null ? null : value;
  } catch (e) {
    return null;
  }
}
function writeStoredHeroTitle(value) {
  try {
    if (typeof value === "string") window.localStorage.setItem(HERO_TITLE_STORAGE, value);
    else window.localStorage.removeItem(HERO_TITLE_STORAGE);
  } catch (e) {
  }
}
function normalizeHeroTitle(value) {
  let raw = value;
  if (raw === void 0) raw = readStoredHeroTitle();
  if (raw === null || raw === void 0) return HERO_TITLE_DEFAULT;
  if (typeof raw !== "string") return HERO_TITLE_DEFAULT;
  const text = raw.trim();
  if (text === "") return "";
  return text.slice(0, HERO_TITLE_MAX);
}
function readStoredThinkingLabel() {
  try {
    const value = window.localStorage.getItem(THINKING_STORAGE);
    return value === null ? null : value;
  } catch (e) {
    return null;
  }
}
function writeStoredThinkingLabel(value) {
  try {
    if (typeof value === "string" && value.trim() !== "") {
      window.localStorage.setItem(THINKING_STORAGE, value.trim().slice(0, THINKING_MAX));
    } else {
      window.localStorage.removeItem(THINKING_STORAGE);
    }
  } catch (e) {
  }
}
function normalizeThinkingLabel(value) {
  let raw = value;
  if (raw === void 0) raw = readStoredThinkingLabel();
  if (typeof raw !== "string") return THINKING_DEFAULT;
  const text = raw.trim();
  return text === "" ? THINKING_DEFAULT : text.slice(0, THINKING_MAX);
}

// src/client/dompatches.js
var PERMISSION_MAP = {
  仅可查看: "天之御使",
  工作区内修改: "生死时空",
  完全权限: "理之大权"
};
var PERMISSION_SELECTOR = [
  '[class*="_triggerLabel"]',
  '[class*="_optionLabelText"]',
  '[class*="_selector"]',
  '[role="menu"] button[role="menuitem"]',
  '[role="menu"] [class*="_itemLabel"]',
  '[role="listbox"] [role="option"]'
].join(",");
var HERO_SELECTOR = '[data-phase="hero"] h1,[data-phase="hero"] [class*="_titleGroup"] > span:first-child,.mock-hero__title';
var SUBAGENT_BUTTON_SELECTOR = 'button[aria-haspopup="tree"]';
var THINKING_SELECTOR = "[data-chat-running]";
function textNodesOf(root) {
  const out = [];
  if (!root || typeof document === "undefined") return out;
  const walker = document.createTreeWalker(
    root,
    4
    /* NodeFilter.SHOW_TEXT */
  );
  let node = walker.nextNode();
  while (node) {
    out.push(node);
    node = walker.nextNode();
  }
  return out;
}
function replaceNodeText(node, next) {
  const current = node.nodeValue || "";
  const leading = (current.match(/^\s*/) || [""])[0];
  const trailing = (current.match(/\s*$/) || [""])[0];
  const replacement = leading + next + trailing;
  if (node.nodeValue !== replacement) node.nodeValue = replacement;
}
function createDomPatches(store) {
  let disposed = false;
  let raf = 0;
  let observer = null;
  let storeOff = null;
  const permissionOriginals = /* @__PURE__ */ new Map();
  const subagentTextOriginals = /* @__PURE__ */ new Map();
  const subagentAriaOriginals = /* @__PURE__ */ new Map();
  const thinkingOriginals = /* @__PURE__ */ new Map();
  const shimmerOriginals = /* @__PURE__ */ new Map();
  const knownHeadings = /* @__PURE__ */ new WeakSet();
  function readConfig2() {
    try {
      return store && typeof store.get === "function" ? store.get() : null;
    } catch (e) {
      return null;
    }
  }
  function applyPermissions() {
    if (disposed) return;
    const roots = document.querySelectorAll(PERMISSION_SELECTOR);
    for (let i = 0; i < roots.length; i += 1) {
      const nodes = textNodesOf(roots[i]);
      for (let k = 0; k < nodes.length; k += 1) {
        const node = nodes[k];
        if (!node.isConnected) continue;
        const raw = node.nodeValue || "";
        const trimmed = raw.trim();
        const mapped = PERMISSION_MAP[trimmed];
        if (!mapped) continue;
        if (!permissionOriginals.has(node)) permissionOriginals.set(node, raw);
        replaceNodeText(node, mapped);
      }
    }
  }
  function restorePermissions() {
    permissionOriginals.forEach((original, node) => {
      try {
        if (node.isConnected && node.nodeValue !== original) node.nodeValue = original;
      } catch (e) {
      }
    });
    permissionOriginals.clear();
  }
  function applySubagentCount() {
    const buttons = document.querySelectorAll(SUBAGENT_BUTTON_SELECTOR);
    for (let i = 0; i < buttons.length; i += 1) {
      const button = buttons[i];
      const countNodes = button.querySelectorAll('[class*="_count"]');
      const scope = countNodes.length > 0 ? countNodes : [button];
      for (let k = 0; k < scope.length; k += 1) {
        const nodes = textNodesOf(scope[k]);
        for (let n = 0; n < nodes.length; n += 1) {
          const node = nodes[n];
          const raw = node.nodeValue || "";
          if (raw.indexOf("个子智能体") < 0) continue;
          if (!subagentTextOriginals.has(node)) subagentTextOriginals.set(node, raw);
          const next = raw.replace(/个子智能体/g, "个影子");
          if (node.nodeValue !== next) node.nodeValue = next;
        }
      }
      const aria = button.getAttribute("aria-label");
      if (aria && aria.indexOf("个子智能体") >= 0) {
        if (!subagentAriaOriginals.has(button)) subagentAriaOriginals.set(button, aria);
        const next = aria.replace(/个子智能体/g, "个影子");
        if (next !== aria) button.setAttribute("aria-label", next);
      }
    }
  }
  function restoreSubagentCount() {
    subagentTextOriginals.forEach((original, node) => {
      try {
        if (node.isConnected && node.nodeValue !== original) node.nodeValue = original;
      } catch (e) {
      }
    });
    subagentTextOriginals.clear();
    subagentAriaOriginals.forEach((original, button) => {
      try {
        if (button.isConnected && button.getAttribute("aria-label") !== original) {
          button.setAttribute("aria-label", original);
        }
      } catch (e) {
      }
    });
    subagentAriaOriginals.clear();
  }
  function applyThinkingLabel() {
    const cfg = readConfig2();
    const desired = cfg && typeof cfg.thinkingLabel === "string" ? cfg.thinkingLabel : THINKING_DEFAULT;
    const roots = document.querySelectorAll(THINKING_SELECTOR);
    for (let i = 0; i < roots.length; i += 1) {
      const nodes = textNodesOf(roots[i]);
      for (let k = 0; k < nodes.length; k += 1) {
        const node = nodes[k];
        const raw = node.nodeValue || "";
        let base = raw;
        if (raw.indexOf("深度求索中") >= 0) {
          thinkingOriginals.set(node, raw);
        } else if (thinkingOriginals.has(node)) {
          base = thinkingOriginals.get(node);
        } else {
          continue;
        }
        const next = base.replace(/深度求索中/g, desired);
        if (node.nodeValue !== next) node.nodeValue = next;
      }
      const shimmerNodes = roots[i].querySelectorAll("[data-shimmer-text]");
      for (let k = 0; k < shimmerNodes.length; k += 1) {
        const el = shimmerNodes[k];
        const raw = el.getAttribute("data-shimmer-text") || "";
        let base = raw;
        if (raw.indexOf("深度求索中") >= 0) {
          shimmerOriginals.set(el, raw);
        } else if (shimmerOriginals.has(el)) {
          base = shimmerOriginals.get(el);
        } else {
          continue;
        }
        const next = base.replace(/深度求索中/g, desired);
        if (raw !== next) el.setAttribute("data-shimmer-text", next);
      }
    }
  }
  function restoreThinkingLabel() {
    thinkingOriginals.forEach((original, node) => {
      try {
        if (node.isConnected && node.nodeValue !== original) node.nodeValue = original;
      } catch (e) {
      }
    });
    thinkingOriginals.clear();
    shimmerOriginals.forEach((original, el) => {
      try {
        if (el.isConnected && el.getAttribute("data-shimmer-text") !== original) {
          el.setAttribute("data-shimmer-text", original);
        }
      } catch (e) {
      }
    });
    shimmerOriginals.clear();
  }
  function applyHeroTitle() {
    if (disposed) return;
    const cfg = readConfig2();
    const desired = cfg && typeof cfg.heroTitle === "string" ? cfg.heroTitle : HERO_TITLE_DEFAULT;
    const headings = document.querySelectorAll(HERO_SELECTOR);
    for (let i = 0; i < headings.length; i += 1) {
      const heading = headings[i];
      if (!heading || heading.nodeType !== 1) continue;
      const nodes = textNodesOf(heading);
      if (nodes.length === 0) continue;
      const textNode = nodes.find((n) => (n.nodeValue || "").trim() !== "") || nodes[0];
      const current = (heading.textContent || "").trim();
      if (desired === "") {
        const original = heading.getAttribute("data-lmui-hero-original");
        if (original && current !== original) replaceNodeText(textNode, original);
        continue;
      }
      if (!knownHeadings.has(heading) || !heading.getAttribute("data-lmui-hero-original")) {
        heading.setAttribute("data-lmui-hero-original", current);
        knownHeadings.add(heading);
      }
      if (current !== desired) {
        replaceNodeText(textNode, desired);
        for (let k = 0; k < nodes.length; k += 1) {
          if (nodes[k] !== textNode && (nodes[k].nodeValue || "").trim() !== "") nodes[k].nodeValue = "";
        }
      }
    }
  }
  function applyAll() {
    if (disposed) return;
    const cfg = readConfig2();
    if (!cfg || cfg.enabled !== true) return;
    applyPermissions();
    applySubagentCount();
    applyThinkingLabel();
    applyHeroTitle();
  }
  function schedule() {
    if (disposed || raf) return;
    raf = window.requestAnimationFrame(() => {
      raf = 0;
      applyAll();
    });
  }
  try {
    observer = new window.MutationObserver(schedule);
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["data-shimmer-text", "aria-label"]
    });
  } catch (e) {
    observer = null;
  }
  if (store && typeof store.subscribe === "function") {
    storeOff = store.subscribe(schedule);
  }
  applyAll();
  return {
    sync: schedule,
    dispose() {
      disposed = true;
      if (raf) {
        try {
          window.cancelAnimationFrame(raf);
        } catch (e) {
        }
        raf = 0;
      }
      if (observer) {
        try {
          observer.disconnect();
        } catch (e) {
        }
        observer = null;
      }
      if (typeof storeOff === "function") {
        try {
          storeOff();
        } catch (e) {
        }
        storeOff = null;
      }
      restorePermissions();
      restoreSubagentCount();
      restoreThinkingLabel();
      const headings = document.querySelectorAll(HERO_SELECTOR);
      for (let i = 0; i < headings.length; i += 1) {
        const heading = headings[i];
        const original = heading.getAttribute && heading.getAttribute("data-lmui-hero-original");
        if (original === null || original === void 0) continue;
        const nodes = textNodesOf(heading);
        const textNode = nodes.find((n) => (n.nodeValue || "").trim() !== "") || nodes[0];
        if (textNode) replaceNodeText(textNode, original);
        heading.removeAttribute("data-lmui-hero-original");
      }
    }
  };
}

// src/client/media.js
var MEDIA_PREFIX = "/light-mirror/media/";
function resolveMedia(url) {
  if (typeof url !== "string" || url.indexOf(MEDIA_PREFIX) !== 0) return url;
  try {
    const base = window.__LIGHT_MIRROR_MEDIA_BASE__;
    if (typeof base === "string" && base) {
      const rel = url.slice(MEDIA_PREFIX.length);
      return base.replace(/\/?$/, "/") + rel;
    }
  } catch (e) {
  }
  return url;
}

// src/client/whale.js
var ART_PREFIX = "/light-mirror/media/art/";
var ART_CACHE_KEY = "?v=triq2";
var STATES = {
  orbit: { animated: "triquetra-orbit.png", still: "triquetra-orbit-first.png" },
  heartbeat: { animated: "triquetra-heartbeat.png", still: "triquetra-heartbeat-first.png" },
  rotate: { animated: "triquetra-rotate.png", still: "triquetra-rotate-first.png" }
};
var INITIAL_ROTATE_MS = 2e3;
var POLL_MS = 400;
var WAIT_SELECTORS = ["[data-approval-key]", "[data-question-key]", "[data-plan-review-key]"];
function reducedMotion() {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (e) {
    return false;
  }
}
function isVisible(el) {
  try {
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return false;
    const cs = window.getComputedStyle(el);
    return cs.display !== "none" && cs.visibility !== "hidden" && Number(cs.opacity) !== 0;
  } catch (e) {
    return false;
  }
}
function hasWaitingSurface() {
  for (let i = 0; i < WAIT_SELECTORS.length; i += 1) {
    const nodes = document.querySelectorAll(WAIT_SELECTORS[i]);
    for (let k = 0; k < nodes.length; k += 1) {
      if (isVisible(nodes[k])) return true;
    }
  }
  return false;
}
function artUrl(file) {
  return resolveMedia(ART_PREFIX + file) + ART_CACHE_KEY;
}
function createWhaleIndicator() {
  let disposed = false;
  let ready = false;
  let timer = null;
  let observer = null;
  let mediaOff = null;
  const availability = /* @__PURE__ */ new Set();
  const currentState = /* @__PURE__ */ new WeakMap();
  let startedAt = 0;
  function resolveState() {
    if (reducedMotion()) return "orbit";
    if (hasWaitingSurface()) return "heartbeat";
    if (startedAt === 0) return "rotate";
    if (Date.now() - startedAt < INITIAL_ROTATE_MS) return "rotate";
    return "orbit";
  }
  function stateUrl(state) {
    const entry = STATES[state] || STATES.orbit;
    return artUrl(reducedMotion() ? entry.still : entry.animated);
  }
  function ensureImage(icon) {
    if (!ready || !icon) return null;
    let img = icon.querySelector(".lmui-whale-img");
    if (!img) {
      img = document.createElement("img");
      img.className = "lmui-whale-img";
      img.alt = "";
      img.draggable = false;
      img.decoding = "async";
      img.setAttribute("aria-hidden", "true");
      icon.appendChild(img);
    }
    return img;
  }
  function paintRoot(root, state) {
    if (!root || !root.isConnected) return;
    root.setAttribute("data-lmui-whale-state", state);
    try {
      document.documentElement.setAttribute("data-lmui-whale-state", state);
    } catch (e) {
    }
    currentState.set(root, state);
    const icons = root.querySelectorAll('[class*="_runningIcon"]');
    for (let i = 0; i < icons.length; i += 1) {
      const img = ensureImage(icons[i]);
      if (img && img.getAttribute("src") !== stateUrl(state)) img.setAttribute("src", stateUrl(state));
    }
  }
  function tick() {
    if (disposed || !ready) return;
    const roots = document.querySelectorAll("[data-chat-running]");
    for (let i = 0; i < roots.length; i += 1) {
      const root = roots[i];
      const state = resolveState();
      if (currentState.get(root) !== state) paintRoot(root, state);
      else if (!root.querySelector(".lmui-whale-img")) paintRoot(root, state);
    }
  }
  function probe() {
    const ids = Object.keys(STATES);
    let pending = ids.length;
    let any = false;
    ids.forEach((id) => {
      const img = new Image();
      img.onload = () => {
        availability.add(id);
        any = true;
        pending -= 1;
        if (pending === 0) finish();
      };
      img.onerror = () => {
        pending -= 1;
        if (pending === 0) finish();
      };
      img.src = artUrl(STATES[id].animated);
    });
    function finish() {
      if (disposed || !any) return;
      ready = true;
      startedAt = Date.now();
      try {
        document.documentElement.setAttribute("data-lmui-whale-ready", "1");
      } catch (e) {
      }
      tick();
      timer = window.setInterval(tick, POLL_MS);
    }
  }
  try {
    observer = new MutationObserver(() => {
      if (disposed) return;
      if (ready) tick();
    });
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["data-approval-key", "data-question-key", "data-plan-review-key"]
    });
  } catch (e) {
    observer = null;
  }
  try {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => {
      if (!disposed && ready) tick();
    };
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", onChange);
      mediaOff = () => mq.removeEventListener("change", onChange);
    }
  } catch (e) {
    mediaOff = null;
  }
  probe();
  return {
    dispose() {
      disposed = true;
      if (timer !== null) {
        try {
          window.clearInterval(timer);
        } catch (e) {
        }
        timer = null;
      }
      if (observer) {
        try {
          observer.disconnect();
        } catch (e) {
        }
        observer = null;
      }
      if (typeof mediaOff === "function") {
        try {
          mediaOff();
        } catch (e) {
        }
        mediaOff = null;
      }
      try {
        document.querySelectorAll(".lmui-whale-img").forEach((img) => {
          if (img.parentNode) img.parentNode.removeChild(img);
        });
        document.querySelectorAll("[data-chat-running]").forEach((el) => el.removeAttribute("data-lmui-whale-state"));
        document.documentElement.removeAttribute("data-lmui-whale-ready");
        document.documentElement.removeAttribute("data-lmui-whale-state");
      } catch (e) {
      }
    }
  };
}

// src/splash/styles.css
var styles_default = '/* ============================================================================\n * 鍏変箣闀?路 澶╃┖宀?鈥?splash v5 鏍峰紡\n * ----------------------------------------------------------------------------\n * 娣辫壊鍦烘櫙 + 涓嬩晶绔栫洿涓婃诞鍏夊甫锛堝乏鍙冲/涓棿灏戙€佹暣浣撲腑闂村嚬闄凤級\n * 涓ぎ缁嗛暱鍗佸瓧鏄燂紙姝ｅ鸡涓嶈鍒欏缂橈級鈫?娣辫壊浠庝笅寰€涓婂～鍏?鈫?楂橀鎶栧姩 鈫? * 鏀惧皠鐖嗗彂锛圧GB 鑹叉暎/鏄熺偣/鐜?铏瑰僵缇界姸寮э級鈫?鍏ㄥ睆鐧?鈫?WebGL 鍥涢樁娈?glitch 杞満 鈫?涓荤晫闈? * ========================================================================== */\n\n/* 鈹€鈹€ 1. 椤甸潰澹?鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€ */\n\nhtml.lm-lock,\nhtml.lm-lock body {\n  overflow: hidden !important;\n}\n\nhtml.lm-lock {\n  background: #0b0a0e;\n}\n\n#light-mirror-veil {\n  position: fixed;\n  inset: 0;\n  z-index: 2147482999;\n  background: #0b0a0e;\n  opacity: 1;\n  pointer-events: none;\n}\n\n#light-mirror-root.lm-root {\n  --lm-void: #0b0a0e;\n  --lm-bg-1: #101018;\n  --lm-bg-2: #16151d;\n  --lm-bg-3: #1b1a22;\n  --lm-white: #ffffff;\n  --lm-white-soft: #eef2ff;\n  --lm-cyan: #a8c8e0;\n  --lm-pink: #e8b8cf;\n  --lm-gold: #f0dfbf;\n  --lm-serif: "Songti SC", "STSong", "SimSun", "Source Han Serif SC", "Noto Serif CJK SC", serif;\n  --lm-sans: "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif;\n  --lm-mono: "Consolas", "SFMono-Regular", "Courier New", monospace;\n  position: fixed;\n  inset: 0;\n  z-index: 2147483000;\n  overflow: hidden;\n  background: var(--lm-void);\n  color: #eef2ff;\n  font-family: var(--lm-sans);\n  -webkit-font-smoothing: antialiased;\n  user-select: none;\n  -webkit-user-select: none;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n\n#light-mirror-root.lm-root *,\n#light-mirror-root.lm-root *::before,\n#light-mirror-root.lm-root *::after {\n  box-sizing: border-box;\n}\n\n.lm-scene {\n  position: absolute;\n  inset: 0;\n  overflow: hidden;\n  isolation: isolate;\n  background: var(--lm-bg-1);\n}\n\n/* 鈹€鈹€ 2. 娣辫壊鑳屾櫙 / 闆?鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€ */\n\n.lm-bg {\n  position: absolute;\n  inset: 0;\n  z-index: 0;\n  background: radial-gradient(120% 70% at 50% 78%, rgba(92, 94, 112, 0.2) 0%, rgba(22, 21, 29, 0) 62%),\n    linear-gradient(180deg, #101018 0%, #14131b 52%, #1b1a22 100%);\n}\n\n.lm-bg::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  opacity: 0.55;\n  background-image: radial-gradient(1.2px 1.2px at 12% 24%, rgba(226, 232, 248, 0.7), transparent 2px),\n    radial-gradient(1px 1px at 28% 63%, rgba(200, 210, 236, 0.6), transparent 1.8px),\n    radial-gradient(1.4px 1.4px at 44% 18%, rgba(240, 244, 255, 0.6), transparent 2.2px),\n    radial-gradient(1px 1px at 62% 38%, rgba(210, 220, 244, 0.55), transparent 1.8px),\n    radial-gradient(1.2px 1.2px at 76% 71%, rgba(230, 236, 252, 0.6), transparent 2px),\n    radial-gradient(1px 1px at 88% 22%, rgba(210, 220, 244, 0.55), transparent 1.8px),\n    radial-gradient(1px 1px at 52% 82%, rgba(240, 244, 255, 0.45), transparent 1.8px),\n    radial-gradient(1.2px 1.2px at 66% 54%, rgba(220, 228, 248, 0.5), transparent 2px);\n  animation: lm-stars-twinkle 6.4s ease-in-out infinite;\n}\n\n.lm-fog {\n  position: absolute;\n  inset: 0;\n  z-index: 1;\n  pointer-events: none;\n  background: radial-gradient(46% 40% at 22% 82%, rgba(160, 172, 205, 0.14) 0%, transparent 70%),\n    radial-gradient(40% 34% at 78% 76%, rgba(198, 178, 196, 0.1) 0%, transparent 72%),\n    radial-gradient(60% 34% at 50% 92%, rgba(120, 132, 168, 0.1) 0%, transparent 76%);\n  \n  animation: lm-fog-breathe 9s ease-in-out infinite;\n}\n\n/* 鈹€鈹€ 3. 绔栫洿涓婃诞鍏夊甫锛堝乏鍙冲/涓棿灏戙€佹暣浣撲腑闂村嚬闄凤級鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€ */\n\n.lm-bands {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 2;\n  height: 74%;\n  overflow: hidden;\n  pointer-events: none;\n  -webkit-mask-image: linear-gradient(180deg, transparent 0%, #000 26%, #000 100%);\n  mask-image: linear-gradient(180deg, transparent 0%, #000 26%, #000 100%);\n}\n\n.lm-bands > i {\n  position: absolute;\n  bottom: 0;\n  left: var(--x);\n  width: var(--w);\n  height: var(--h);\n  display: block;\n  border-radius: 50% / 6%;\n  background: linear-gradient(180deg, transparent 0%, var(--tint) 42%, rgba(255, 255, 255, 0.92) 74%, transparent 100%);\n  box-shadow: 0 0 14px rgba(220, 230, 250, 0.28), 0 0 40px rgba(180, 198, 235, 0.16);\n  opacity: 0;\n  mix-blend-mode: screen;\n  animation: lm-band-float var(--dur) var(--delay) ease-in-out infinite;\n}\n\n/* 鈹€鈹€ 4. 涓ぎ缁嗛暱鍗佸瓧鏄燂紙姝ｅ鸡涓嶈鍒欏缂橈級鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€ */\n\n.lm-star-wrap {\n  position: absolute;\n  left: 50%;\n  top: 47%;\n  z-index: 7;\n  width: min(34vmin, 380px);\n  height: min(72vmin, 800px);\n  translate: -50% -50%;\n  transform-origin: 50% 50%;\n  opacity: 0;\n  pointer-events: none;\n}\n\n.lm-star-glow {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 220%;\n  height: 120%;\n  translate: -50% -50%;\n  background: radial-gradient(circle, rgba(255, 255, 255, 0.42) 0%, rgba(214, 226, 250, 0.18) 32%, transparent 68%);\n  \n  animation: lm-star-glow 3.6s ease-in-out infinite;\n}\n\n.lm-star-base,\n.lm-star-fill,\n.lm-star-ghost {\n  position: absolute;\n  inset: 0;\n  display: block;\n}\n\n.lm-star-svg {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  overflow: visible;\n}\n\n/* 涓夊眰鏄熶綋锛氬ぇ鏄燂紙妯＄硦+鍣尝瑁佽竟锛夆啋 涓槦 white锛堟寲绌哄ぇ鏄燂級鈫?灏忔槦 dark锛堢敓闀块儴鍒嗭級 */\n.lm-star-large {\n  fill: #ffffff;\n  opacity: 0.97;\n}\n\n.lm-star-medium {\n  fill: #ffffff;\n  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.42)) drop-shadow(0 0 26px rgba(214, 226, 250, 0.28));\n}\n\n/* 娣辫壊閮ㄥ垎 = 涓ぎ灏忓崄瀛楁槦锛屼粠涓嬪線涓婄敓闀匡紙clip 杩涘害鐢?JS 璁剧疆 --clipPct=(1-p)*100%锛?*/\n.lm-star-fill {\n  clip-path: inset(var(--clipPct, 100%) 0 0 0);\n}\n\n.lm-star-small {\n  fill: #0d0c14;\n  filter: drop-shadow(0 0 10px rgba(9, 8, 14, 0.9));\n}\n\n/* RGB 鑹叉暎 ghost锛堢垎鍙?鎶栧姩鏃跺嚭鐜帮級 */\n.lm-star-ghost {\n  opacity: 0;\n  mix-blend-mode: screen;\n}\n\n.lm-star-ghost .lm-star-large,\n.lm-star-ghost .lm-star-medium {\n  filter: drop-shadow(0 0 10px currentColor);\n}\n\n.lm-star-ghost-cyan {\n  color: #7fd8e8;\n}\n\n.lm-star-ghost-cyan .lm-star-large,\n.lm-star-ghost-cyan .lm-star-medium {\n  fill: rgba(127, 216, 232, 0.55);\n}\n\n.lm-star-ghost-pink {\n  color: #e88fd0;\n}\n\n.lm-star-ghost-pink .lm-star-large,\n.lm-star-ghost-pink .lm-star-medium {\n  fill: rgba(232, 143, 208, 0.5);\n}\n\n/* 鈹€鈹€ 5. 鐖嗗彂锛氭斁灏勫厜 / 鐜?/ 铏瑰僵缇界姸寮?/ 鏄熺偣 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€ */\n\n.lm-burst {\n  position: absolute;\n  inset: 0;\n  z-index: 6;\n  pointer-events: none;\n  opacity: 0;\n}\n\n.lm-burst::before {\n  content: "";\n  position: absolute;\n  left: 50%;\n  top: 47%;\n  width: 170vmin;\n  height: 170vmin;\n  translate: -50% -50%;\n  background: radial-gradient(circle, rgba(255, 255, 255, 0.96) 0%, rgba(255, 250, 242, 0.62) 20%, rgba(226, 236, 252, 0.26) 46%, transparent 72%);\n  \n  mix-blend-mode: screen;\n  opacity: 0;\n}\n\n.lm-bursting .lm-burst::before {\n  animation: lm-burst-core 1.4s ease-in both;\n}\n\n/* v6 涓夐樁娈典寒搴︽帶鍒讹細burst1/2 淇濇寔娣辫壊鑳屾櫙锛堝浘13/15锛夛紝burst3 鎵嶅揩閫熸彁浜埌鐧藉満 */\n.lm-burst1 .lm-burst::before {\n  animation: none;\n  opacity: 0.22;\n}\n\n.lm-burst2 .lm-burst::before {\n  animation: none;\n  opacity: 0.4;\n}\n\n.lm-burst1 .lm-glow {\n  opacity: 0.85;\n}\n\n.lm-burst2 .lm-glow {\n  opacity: 1;\n}\n\n.lm-burst3 .lm-glow {\n  opacity: 0.95;\n}\n\n.lm-burst3 .lm-burst::before {\n  animation: none;\n  opacity: 0.2;\n}\n\n.lm-burst3 .lm-star-glow {\n  animation: none;\n  opacity: 0.35;\n}\n\n.lm-burst1 .lm-star-glow,\n.lm-burst2 .lm-star-glow {\n  animation: none;\n}\n\n.lm-burst1 .lm-star-glow {\n  opacity: 0.3;\n}\n\n.lm-burst2 .lm-star-glow {\n  opacity: 0.45;\n}\n\n.lm-rays {\n  position: absolute;\n  left: 50%;\n  top: 47%;\n  width: 240vmax;\n  height: 240vmax;\n  translate: -50% -50%;\n  background: repeating-conic-gradient(\n    from 0deg at 50% 50%,\n    rgba(255, 255, 255, 0.085) 0deg 1.4deg,\n    rgba(255, 255, 255, 0) 1.4deg 5.6deg,\n    rgba(224, 234, 255, 0.07) 5.6deg 7deg,\n    rgba(255, 255, 255, 0) 7deg 12.4deg\n  );\n  -webkit-mask-image: radial-gradient(circle at 50% 50%, #000 0 8%, rgba(0, 0, 0, 0.7) 22%, transparent 54%);\n  mask-image: radial-gradient(circle at 50% 50%, #000 0 8%, rgba(0, 0, 0, 0.7) 22%, transparent 54%);\n  mix-blend-mode: screen;\n  opacity: 0;\n}\n\n.lm-rings {\n  position: absolute;\n  inset: 0;\n}\n\n.lm-rings > i {\n  position: absolute;\n  left: 50%;\n  top: 47%;\n  width: 26vmin;\n  height: 26vmin;\n  translate: -50% -50%;\n  border-radius: 50%;\n  border: 1.5px solid rgba(255, 255, 255, 0.6);\n  box-shadow: 0 0 26px rgba(214, 226, 250, 0.28), inset 0 0 18px rgba(255, 255, 255, 0.18);\n  opacity: 0;\n}\n\n.lm-rings > i:nth-child(2) {\n  width: 42vmin;\n  height: 42vmin;\n  border-color: rgba(232, 184, 207, 0.4);\n  box-shadow: 0 0 30px rgba(232, 184, 207, 0.22);\n}\n\n.lm-rings > i:nth-child(3) {\n  width: 60vmin;\n  height: 60vmin;\n  border-color: rgba(168, 200, 224, 0.32);\n  box-shadow: 0 0 40px rgba(168, 200, 224, 0.18);\n}\n\n.lm-feather {\n  position: absolute;\n  left: 50%;\n  top: 47%;\n  width: 190vmax;\n  height: 190vmax;\n  translate: -50% -50%;\n  background: conic-gradient(\n      from 12deg at 50% 50%,\n      rgba(168, 200, 224, 0.16) 0deg 8deg,\n      transparent 8deg 36deg,\n      rgba(232, 184, 207, 0.15) 36deg 46deg,\n      transparent 46deg 88deg,\n      rgba(240, 223, 191, 0.14) 88deg 98deg,\n      transparent 98deg 144deg,\n      rgba(200, 214, 232, 0.14) 144deg 158deg,\n      transparent 158deg 208deg,\n      rgba(232, 184, 207, 0.12) 208deg 224deg,\n      transparent 224deg 276deg,\n      rgba(168, 200, 224, 0.12) 276deg 290deg,\n      transparent 290deg 360deg\n    ),\n    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0 1px, transparent 1px 27px);\n  -webkit-mask-image: radial-gradient(circle at 50% 50%, transparent 0 12%, #000 26%, rgba(0, 0, 0, 0.7) 44%, transparent 66%);\n  mask-image: radial-gradient(circle at 50% 50%, transparent 0 12%, #000 26%, rgba(0, 0, 0, 0.7) 44%, transparent 66%);\n  \n  mix-blend-mode: screen;\n  opacity: 0;\n}\n\n.lm-sparks {\n  position: absolute;\n  inset: 0;\n}\n\n.lm-sparks > i {\n  position: absolute;\n  left: 50%;\n  top: 47%;\n  width: 4px;\n  height: 4px;\n  border-radius: 50%;\n  background: #ffffff;\n  box-shadow: 0 0 10px rgba(255, 255, 255, 0.9), 0 0 22px rgba(200, 220, 250, 0.5);\n  opacity: 0;\n}\n\n/* 鈹€鈹€ 6. 鐧藉睆 / 鏂板満鏅?/ WebGL 杞満 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€ */\n\n.lm-newscene {\n  display: none;\n}\n\n/* 閫忔槑 WebGL 鐢诲竷锛氱櫧鍦烘挄瑁傚悗鐩存帴閫忓嚭涓嬫柟鐪熷疄涓荤晫闈紙DOM锛?*/\n.lm-webgl {\n  position: absolute;\n  inset: 0;\n  z-index: 8;\n  width: 100%;\n  height: 100%;\n  display: none;\n  background: transparent;\n}\n\n.lm-white {\n  position: absolute;\n  inset: 0;\n  z-index: 9;\n  background: #ffffff;\n  opacity: 0;\n  pointer-events: none;\n}\n\n.lm-subtitle {\n  position: absolute;\n  left: 50%;\n  bottom: 8.4%;\n  z-index: 10;\n  translate: -50% 8px;\n  font-family: var(--lm-serif);\n  font-size: clamp(14px, 1.3vw, 19px);\n  letter-spacing: 0.3em;\n  padding-left: 0.3em;\n  white-space: nowrap;\n  color: rgba(248, 250, 255, 0.95);\n  text-shadow: 0 0 22px rgba(0, 0, 0, 0.75), 0 0 40px rgba(210, 222, 245, 0.25);\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity 0.7s ease, translate 0.7s ease;\n}\n\n.lm-subtitle.is-on {\n  opacity: 1;\n  translate: -50% 0;\n}\n\n.lm-fail {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  z-index: 30;\n  translate: -50% -50%;\n  padding: 10px 18px;\n  font-family: var(--lm-serif);\n  font-size: 15px;\n  letter-spacing: 0.2em;\n  color: #eef2ff;\n  background: rgba(11, 10, 14, 0.8);\n  border: 1px solid rgba(220, 228, 248, 0.2);\n}\n\n.lm-fail[hidden] {\n  display: none;\n}\n\n.lm-debug {\n  position: absolute;\n  left: 12px;\n  bottom: 12px;\n  z-index: 40;\n  padding: 6px 10px;\n  border: 1px solid rgba(168, 200, 224, 0.3);\n  background: rgba(0, 0, 0, 0.55);\n  font-family: var(--lm-mono);\n  font-size: 11px;\n  color: #c8d6e0;\n}\n\n/* 鈹€鈹€ 7. 鐘舵€佺被锛氬～鍏呭畬鎴?/ 鎶栧姩 / 鐧藉睆 / 杞満 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€ */\n\n.lm-star-on .lm-star-wrap {\n  animation: lm-star-in 1.5s ease-out both;\n}\n\n/* 鏄熺偣锛?8 涓笉鍚屾柟鍚戯紙鐖嗗彂鏃跺悜澶栭鏁ｏ級 */\n.lm-sparks > i:nth-child(1) {\n  --sx: -180px;\n  --sy: -120px;\n}\n.lm-sparks > i:nth-child(2) {\n  --sx: -120px;\n  --sy: -200px;\n}\n.lm-sparks > i:nth-child(3) {\n  --sx: -60px;\n  --sy: -260px;\n}\n.lm-sparks > i:nth-child(4) {\n  --sx: 40px;\n  --sy: -240px;\n}\n.lm-sparks > i:nth-child(5) {\n  --sx: 110px;\n  --sy: -180px;\n}\n.lm-sparks > i:nth-child(6) {\n  --sx: 190px;\n  --sy: -80px;\n}\n.lm-sparks > i:nth-child(7) {\n  --sx: 240px;\n  --sy: 20px;\n}\n.lm-sparks > i:nth-child(8) {\n  --sx: 200px;\n  --sy: 140px;\n}\n.lm-sparks > i:nth-child(9) {\n  --sx: 120px;\n  --sy: 220px;\n}\n.lm-sparks > i:nth-child(10) {\n  --sx: 40px;\n  --sy: 280px;\n}\n.lm-sparks > i:nth-child(11) {\n  --sx: -60px;\n  --sy: 260px;\n}\n.lm-sparks > i:nth-child(12) {\n  --sx: -140px;\n  --sy: 200px;\n}\n.lm-sparks > i:nth-child(13) {\n  --sx: -220px;\n  --sy: 100px;\n}\n.lm-sparks > i:nth-child(14) {\n  --sx: -260px;\n  --sy: -10px;\n}\n.lm-sparks > i:nth-child(15) {\n  --sx: -220px;\n  --sy: -160px;\n}\n.lm-sparks > i:nth-child(16) {\n  --sx: 260px;\n  --sy: -140px;\n}\n.lm-sparks > i:nth-child(17) {\n  --sx: 160px;\n  --sy: 260px;\n}\n.lm-sparks > i:nth-child(18) {\n  --sx: -160px;\n  --sy: 260px;\n}\n\n.lm-webgl.is-out {\n  opacity: 0;\n  transition: opacity 0.22s ease;\n}\n\n.lm-star-wrap.lm-shaking {\n  filter: brightness(1.25) drop-shadow(0 0 26px rgba(255, 255, 255, 0.5));\n}\n\n.lm-star-wrap.lm-shaking .lm-star-fill {\n  filter: brightness(1.1);\n}\n\n.lm-shaking .lm-star-ghost {\n  opacity: 0.75;\n  animation: lm-ghost-shake 0.12s steps(2) infinite;\n}\n\n.lm-star-ghost-cyan {\n  translate: -4px 0;\n}\n\n.lm-star-ghost-pink {\n  translate: 4px 0;\n}\n\n.lm-bursting .lm-burst {\n  opacity: 1;\n}\n\n.lm-bursting .lm-star-wrap {\n  animation: lm-star-burst 1.4s ease-in both;\n}\n\n.lm-bursting .lm-star-fill {\n  opacity: 0;\n  transition: opacity 0.35s ease;\n}\n\n.lm-bursting .lm-star-glow {\n  opacity: 1;\n  animation: lm-glow-burst 1.3s ease-out both;\n}\n\n.lm-bursting .lm-star-ghost {\n  opacity: 0.9;\n  animation: lm-ghost-burst 1.1s ease-out both;\n}\n\n.lm-bursting .lm-star-ghost-cyan {\n  translate: -10px 0;\n}\n\n.lm-bursting .lm-star-ghost-pink {\n  translate: 10px 0;\n}\n\n.lm-bursting .lm-rays {\n  animation: lm-rays-burst 1.4s ease-out both;\n}\n\n.lm-bursting .lm-rings > i:nth-child(1) {\n  animation: lm-ring-burst 1.2s 0.05s ease-out both;\n}\n\n.lm-bursting .lm-rings > i:nth-child(2) {\n  animation: lm-ring-burst 1.35s 0.18s ease-out both;\n}\n\n.lm-bursting .lm-rings > i:nth-child(3) {\n  animation: lm-ring-burst 1.5s 0.3s ease-out both;\n}\n\n.lm-bursting .lm-feather {\n  animation: lm-feather-burst 1.5s ease-out both;\n}\n\n.lm-bursting .lm-sparks > i {\n  animation: lm-spark-burst 1.1s ease-out both;\n}\n\n.lm-whiteout .lm-white {\n  opacity: 1 !important;\n  animation: none !important;\n  transition: opacity 0.22s ease;\n}\n\n.lm-bursting .lm-white {\n  animation: none;\n}\n\n/* 鐧藉満鍙湪 burst3锛?.2s 璧凤級蹇€熸彁浜紱burst1/2 淇濇寔娣辫壊鏀惧皠鍦洪潰 */\n.lm-burst3 .lm-white {\n  animation: lm-white-in 0.16s 0.24s ease-in both;\n}\n\n.lm-transitioning .lm-webgl {\n  display: block;\n}\n\n/* 杞満鏈熼棿璁╃敾甯冧笅鏂圭洿鎺ユ槸鐪熷疄涓荤晫闈細闅愯棌鐧借壊鍦烘櫙灞傦紝\n   鐢诲竷鐢ㄩ€忔槑 alpha 鎾曡锛岄湶鍑?DOM锛堣€屼笉鏄?splash 鑷繁鐨勮儗鏅級銆?*/\n#light-mirror-root.lm-root.lm-transitioning,\n#light-mirror-root.lm-root.lm-transitioning .lm-scene {\n  background: transparent !important;\n}\n\n/* 鍏抽敭锛欻ost 鐨勯灞忛粦鑹?veil 浣嶄簬 splash 鏍逛箣涓嬨€佺湡瀹?DOM 涔嬩笂銆?   杞満鎾曡鏃跺繀椤绘妸瀹冧篃闅愯棌锛屽惁鍒欓€忔槑鐢诲竷闇插嚭鐨勫彧鏄函榛?veil锛岃€屼笉鏄湡瀹炰富鐣岄潰銆?*/\nhtml.lm-lock:has(#light-mirror-root.lm-transitioning) #light-mirror-veil,\nhtml.lm-lock:has(#light-mirror-root.lm-transitioning) #light-mirror-root {\n  background: transparent !important;\n}\n\nhtml.lm-lock:has(#light-mirror-root.lm-transitioning) #light-mirror-veil {\n  display: none !important;\n  opacity: 0 !important;\n}\n\nhtml.lm-lock:has(#light-mirror-root.lm-transitioning),\nhtml.lm-lock:has(#light-mirror-root.lm-transitioning) body {\n  background: transparent !important;\n}\n\n.lm-transitioning .lm-bg,\n.lm-transitioning .lm-fog,\n.lm-transitioning .lm-bands,\n.lm-transitioning .lm-star-wrap,\n.lm-transitioning .lm-burst,\n.lm-transitioning .lm-white {\n  opacity: 0 !important;\n  transition: opacity 0.12s linear;\n  pointer-events: none;\n}\n\n.lm-transitioning .lm-white {\n  opacity: 0;\n  animation: none;\n  transition: opacity 0.1s ease;\n}\n\n.lm-transitioning .lm-newscene {\n  opacity: 1;\n  z-index: 8;\n}\n\n#light-mirror-root.lm-root.lm-revealing,\n#light-mirror-root.lm-root.lm-revealing .lm-scene {\n  background: transparent !important;\n}\n\n#light-mirror-root.lm-root.lm-revealing .lm-scene {\n  opacity: 0;\n  transition: opacity 0.26s ease;\n}\n\n#light-mirror-root.lm-root.lm-revealing .lm-scene * {\n  animation-play-state: paused !important;\n}\n\n#light-mirror-root.lm-root.lm-revealing .lm-subtitle {\n  opacity: 0 !important;\n  transition: none !important;\n}\n\n#light-mirror-root.lm-root.lm-revealing .lm-webgl,\n#light-mirror-root.lm-root.lm-revealing .lm-newscene {\n  opacity: 0 !important;\n  transition: opacity 0.22s ease !important;\n}\n\n.lm-fallback-transition .lm-newscene {\n  opacity: 0;\n  animation: lm-fallback-fade 1.2s ease both;\n}\n\n.lm-fallback-transition .lm-white {\n  animation: lm-white-in 1.2s ease both;\n}\n\n.lm-frozen .lm-scene * {\n  animation-play-state: paused !important;\n}\n\n/* 鈹€鈹€ 8. reduced-motion 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€ */\n\n.lm-reduced .lm-scene * {\n  animation: none !important;\n}\n\n.lm-reduced .lm-star-wrap {\n  opacity: 1;\n}\n\n.lm-reduced .lm-bands > i {\n  opacity: 0.4;\n}\n\n.lm-reduced .lm-fog,\n.lm-reduced .lm-burst {\n  display: none;\n}\n\n.lm-reduced .lm-white {\n  transition: opacity 0.35s ease;\n}\n\n/* 鈹€鈹€ 9. 灏忓睆 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€ */\n\n@media (max-width: 780px) {\n  .lm-star-wrap {\n    width: min(44vmin, 300px);\n    height: min(66vmin, 560px);\n    top: 46%;\n  }\n\n  .lm-bands {\n    height: 62%;\n  }\n\n  .lm-subtitle {\n    bottom: 6.2%;\n    font-size: 13px;\n    letter-spacing: 0.2em;\n  }\n\n  .lm-rays {\n    width: 200vmax;\n    height: 200vmax;\n  }\n\n  /* 窄屏：放射光带整体缩短，确保外端不顶到屏幕边缘 */\n  .lm-radials {\n    transform: scale(0.68);\n  }\n}\n\n@media (max-height: 560px) and (min-width: 781px) {\n  .lm-star-wrap {\n    height: 76vmin;\n  }\n}\n\n/* 鈹€鈹€ 10. keyframes 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€ */\n\n@keyframes lm-stars-twinkle {\n  0%,\n  100% {\n    opacity: 0.4;\n  }\n  50% {\n    opacity: 0.75;\n  }\n}\n\n@keyframes lm-fog-breathe {\n  0%,\n  100% {\n    opacity: 0.7;\n    transform: scale(1);\n  }\n  50% {\n    opacity: 1;\n    transform: scale(1.03);\n  }\n}\n\n@keyframes lm-band-float {\n  0% {\n    transform: translateY(0) scaleY(0.7);\n    opacity: 0;\n  }\n  12% {\n    opacity: var(--op);\n  }\n  55% {\n    opacity: calc(var(--op) * 0.8);\n  }\n  88% {\n    opacity: 0;\n  }\n  100% {\n    transform: translateY(-58vh) scaleY(1.15);\n    opacity: 0;\n  }\n}\n\n@keyframes lm-band-flicker {\n  0%,\n  100% {\n    filter: none;\n  }\n  50% {\n    filter: none;\n  }\n}\n\n@keyframes lm-burst-core {\n  0% {\n    opacity: 0;\n    scale: 0.45;\n  }\n  55% {\n    opacity: 1;\n    scale: 1.15;\n  }\n  100% {\n    opacity: 1;\n    scale: 2.6;\n  }\n}\n\n@keyframes lm-ghost-burst {\n  0% {\n    opacity: 0.3;\n    scale: 1;\n  }\n  40% {\n    opacity: 1;\n    scale: 1.5;\n  }\n  100% {\n    opacity: 0;\n    scale: 2.4;\n  }\n}\n\n@keyframes lm-star-in {\n  0% {\n    opacity: 0;\n    scale: 0.82;\n    \n  }\n  22% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 1;\n    scale: 1;\n    filter: none;\n  }\n}\n\n@keyframes lm-star-glow {\n  0%,\n  100% {\n    opacity: 0.6;\n    transform: scale(1);\n  }\n  50% {\n    opacity: 1;\n    transform: scale(1.06);\n  }\n}\n\n@keyframes lm-ghost-shake {\n  0% {\n    opacity: 0.55;\n  }\n  100% {\n    opacity: 0.85;\n  }\n}\n\n@keyframes lm-star-burst {\n  0% {\n    scale: 1;\n    filter: brightness(1.2);\n  }\n  55% {\n    scale: 1.35;\n    filter: brightness(2.4) blur(2px);\n  }\n  100% {\n    scale: 2.1;\n    filter: brightness(4) blur(10px);\n  }\n}\n\n@keyframes lm-glow-burst {\n  0% {\n    opacity: 0.6;\n    transform: scale(1);\n  }\n  60% {\n    opacity: 1;\n    transform: scale(1.6);\n  }\n  100% {\n    opacity: 1;\n    transform: scale(3.2);\n  }\n}\n\n@keyframes lm-rays-burst {\n  0% {\n    opacity: 0;\n    transform: scale(0.4) rotate(0deg);\n  }\n  35% {\n    opacity: 0.9;\n  }\n  100% {\n    opacity: 1;\n    transform: scale(1.1) rotate(9deg);\n  }\n}\n\n@keyframes lm-ring-burst {\n  0% {\n    opacity: 0;\n    scale: 0.5;\n  }\n  30% {\n    opacity: 0.85;\n  }\n  100% {\n    opacity: 0;\n    scale: 2.4;\n  }\n}\n\n@keyframes lm-feather-burst {\n  0% {\n    opacity: 0;\n    transform: scale(0.5) rotate(0deg);\n  }\n  40% {\n    opacity: 0.9;\n  }\n  100% {\n    opacity: 0.7;\n    transform: scale(1.25) rotate(16deg);\n  }\n}\n\n@keyframes lm-spark-burst {\n  0% {\n    opacity: 0;\n    translate: 0 0;\n    scale: 0.4;\n  }\n  30% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n    translate: var(--sx, 0) var(--sy, 0);\n    scale: 1.2;\n  }\n}\n\n@keyframes lm-white-in {\n  0% {\n    opacity: 0;\n  }\n  55% {\n    opacity: 0.55;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\n@keyframes lm-fallback-fade {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\n/* ============================================================================\n * v6 鐖嗗彂娈碉細閿愯竟鏀惧皠鍏夊甫锛? 绮?+ 3 缁嗭級+ 搴曡‖ + 妯＄硦鍗佸瓧鏄熷厜鏅? *          burst2锛氱粏甯﹀彉绮?搴曡‖鍑虹幇/澶у渾鐜?鏇村绔栧厜鏉? *          burst3锛氬褰╁厜/绾㈤粍钃濆垎灞?褰╄壊鐐?涓嶈鍒欏厜鏅曪紙fallback 杈圭紭姗欑孩榛勬斁灏勫厜锛? * ========================================================================== */\n\n/* ── 合并后的整体提亮层（单元素多层渐变，非三块独立光晕）──────────────────\n * 中心大范围柔光 + 左下/右下自屏幕外向内的大范围角光（角点最亮、向中心衰减）。\n * 角光曲线来自 图13 左下角实测（`v6-fig13-corner-measure.json`）：\n *   归一化亮度 r/R: 0→1, .17→.79, .29→.69, .48→.46, .63→.32, .75→.18, .98→.07\n *   R ≈ 52vmin（1920 实测约 520px，×1600/1920≈433px≈48vmin，取 52vmin 略大以衔接全屏）\n * 只动 opacity（0 → .85，0.6s 连续渐入），burst2/3 继续平滑升到 1。 */\n.lm-glow {\n  position: absolute;\n  inset: 0;\n  z-index: 1;\n  opacity: 0;\n  pointer-events: none;\n  background:\n    /* 左下角：角点最亮，自外向内衰减 */\n    radial-gradient(\n      circle 52vmin at 0% 100%,\n      rgba(255, 244, 230, 0.52) 0%,\n      rgba(255, 240, 224, 0.47) 10%,\n      rgba(255, 236, 218, 0.38) 20%,\n      rgba(255, 232, 214, 0.30) 32%,\n      rgba(255, 230, 212, 0.22) 46%,\n      rgba(255, 228, 210, 0.13) 62%,\n      rgba(255, 226, 208, 0.06) 78%,\n      rgba(255, 224, 206, 0.02) 92%,\n      transparent 100%\n    ),\n    /* 右下角：角点最亮，自外向内衰减 */\n    radial-gradient(\n      circle 50vmin at 100% 100%,\n      rgba(255, 242, 228, 0.46) 0%,\n      rgba(255, 238, 222, 0.41) 10%,\n      rgba(255, 234, 216, 0.33) 21%,\n      rgba(255, 230, 212, 0.26) 33%,\n      rgba(255, 228, 210, 0.19) 47%,\n      rgba(255, 226, 208, 0.11) 63%,\n      rgba(255, 224, 206, 0.05) 79%,\n      rgba(255, 222, 204, 0.02) 92%,\n      transparent 100%\n    ),\n    /* 中心大范围柔光（连续过渡，不是独立光斑） */\n    radial-gradient(\n      circle 70vmin at 50% 47%,\n      rgba(255, 255, 255, 0.24) 0%,\n      rgba(255, 253, 249, 0.17) 24%,\n      rgba(255, 251, 245, 0.10) 44%,\n      rgba(255, 249, 242, 0.04) 66%,\n      transparent 100%\n    ),\n    /* 底部整体微亮，把两角与中心连成连续带 */\n    linear-gradient(0deg, rgba(255, 238, 224, 0.1) 0%, rgba(255, 236, 222, 0.04) 26%, transparent 52%);\n  mix-blend-mode: screen;\n  transition: opacity 0.6s ease;\n  will-change: opacity;\n}\n\n/* 鏃嬭浆瀹瑰櫒 + 6 鏉￠攼杈规斁灏勫厜甯?*/\n.lm-radials {\n  position: absolute;\n  inset: 0;\n  opacity: 0;\n  transform-origin: 50% 47%;\n  animation: lm-radials-spin 7s linear infinite;\n}\n\n.lm-bursting .lm-radials {\n  opacity: 1;\n}\n\n.lm-radial {\n  position: absolute;\n  left: 50%;\n  top: 47%;\n  width: var(--l);\n  height: var(--w);\n  translate: -50% -50%;\n  rotate: var(--a);\n  scale: var(--sx, 0.8) var(--sy, 0.8);\n  background: linear-gradient(\n    180deg,\n    transparent 0,\n    rgba(255, 255, 255, 0.16) 1px,\n    #ffffff 2.2px,\n    #ffffff calc(100% - 2.2px),\n    rgba(255, 255, 255, 0.16) calc(100% - 1px),\n    transparent 100%\n  );\n  /* 中心亮、向外沿长度逐渐衰减到 0；横向锐边（1–2px 过渡） */\n  -webkit-mask-image: linear-gradient(\n    90deg,\n    transparent 0%,\n    rgba(0, 0, 0, 0.08) 8%,\n    rgba(0, 0, 0, 0.45) 24%,\n    #000 50%,\n    rgba(0, 0, 0, 0.45) 76%,\n    rgba(0, 0, 0, 0.08) 92%,\n    transparent 100%\n  );\n  mask-image: linear-gradient(\n    90deg,\n    transparent 0%,\n    rgba(0, 0, 0, 0.08) 8%,\n    rgba(0, 0, 0, 0.45) 24%,\n    #000 50%,\n    rgba(0, 0, 0, 0.45) 76%,\n    rgba(0, 0, 0, 0.08) 92%,\n    transparent 100%\n  );\n  box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);\n  mix-blend-mode: screen;\n  will-change: transform, opacity;\n  transition: scale 0.45s ease, opacity 0.3s ease;\n  animation: lm-radial-in 0.5s ease-out both;\n}\n\n/* 底衬光带：同元素 ::before，更宽（2.2×）、略暗（opacity .25–.4） */\n.lm-radial::before {\n  content: "";\n  position: absolute;\n  left: -2%;\n  right: -2%;\n  top: 50%;\n  height: calc(var(--w) * 2.2);\n  translate: 0 -50%;\n  background: linear-gradient(\n    180deg,\n    transparent 0,\n    rgba(255, 255, 255, 0.7) 12%,\n    rgba(255, 255, 255, 0.5) 50%,\n    rgba(255, 255, 255, 0.7) 88%,\n    transparent 100%\n  );\n  opacity: 0;\n  mix-blend-mode: screen;\n  transition: opacity 0.45s ease;\n}\n\n.lm-burst1 .lm-radial {\n  --sx: 0.8;\n  --sy: 0.8;\n}\n\n.lm-burst2 .lm-radial {\n  --sx: 1;\n  --sy: 1;\n}\n\n/* 第二阶段：细带变粗（横向 scale 2.2×，只动 transform） */\n.lm-burst2 .lm-radial--thin {\n  --sy: 2.2;\n}\n\n.lm-burst2 .lm-radial::before {\n  opacity: 0.32;\n}\n\n.lm-burst3 .lm-radial {\n  --sx: 1.1;\n  --sy: 1.1;\n}\n\n.lm-burst3 .lm-radial--thin {\n  --sy: 2.2;\n}\n\n.lm-burst3 .lm-radial::before {\n  opacity: 0.38;\n}\n\n/* 妯＄硦缁嗛暱鐧借壊鍗佸瓧鏄熷厜鏅曪紙鐩栧湪涓ぎ鏄熶箣涓婏紝浣嗕腑澶槦 z-index 鏇撮珮淇濇寔鏈€鍓嶏級 */\n.lm-burstcross {\n  position: absolute;\n  left: 50%;\n  top: 47%;\n  width: 66vmin;\n  height: 138vmin;\n  translate: -50% -50%;\n  opacity: 0;\n  mix-blend-mode: screen;\n  pointer-events: none;\n}\n\n.lm-burstcross-svg {\n  width: 100%;\n  height: 100%;\n  opacity: 0.92;\n}\n\n.lm-burst1 .lm-burstcross,\n.lm-burst2 .lm-burstcross,\n.lm-burst3 .lm-burstcross {\n  opacity: 0.9;\n  animation: lm-burstcross-grow 1.4s ease-out both, lm-burstcross-spin 9s linear infinite;\n}\n\n/* burst 鏈熼澶栦笂娴珫鍏夋潯 */\n.lm-rise {\n  position: absolute;\n  inset: 0;\n  opacity: 0;\n  pointer-events: none;\n}\n\n.lm-rise > i {\n  position: absolute;\n  bottom: -2%;\n  left: var(--x);\n  width: var(--w);\n  height: var(--h);\n  display: block;\n  border-radius: 50% / 5%;\n  background: linear-gradient(180deg, transparent 0%, rgba(220, 232, 255, 0.55) 40%, rgba(255, 255, 255, 0.95) 82%, transparent 100%);\n  box-shadow: 0 0 12px rgba(230, 240, 255, 0.35);\n  \n  mix-blend-mode: screen;\n  animation: lm-band-float var(--dur) var(--delay) infinite;\n}\n\n.lm-bursting .lm-rise {\n  opacity: 0.9;\n}\n\n/* 澶氬僵鍏夛紙burst3锛夛細绾㈤粍钃濆垎灞?+ 褰╄壊鐐?+ 涓嶈鍒欏厜鏅?*/\n.lm-dots {\n  position: absolute;\n  inset: 0;\n  opacity: 0;\n  background-image: radial-gradient(2px 2px at 12% 22%, rgba(255, 214, 140, 0.95), transparent 3px),\n    radial-gradient(2px 2px at 24% 68%, rgba(255, 120, 90, 0.9), transparent 3px),\n    radial-gradient(1.6px 1.6px at 36% 32%, rgba(255, 255, 255, 0.95), transparent 3px),\n    radial-gradient(2px 2px at 48% 76%, rgba(140, 210, 255, 0.9), transparent 3px),\n    radial-gradient(1.6px 1.6px at 58% 18%, rgba(255, 220, 120, 0.9), transparent 3px),\n    radial-gradient(2px 2px at 66% 58%, rgba(255, 150, 190, 0.9), transparent 3px),\n    radial-gradient(1.4px 1.4px at 74% 34%, rgba(180, 230, 255, 0.9), transparent 3px),\n    radial-gradient(2px 2px at 82% 72%, rgba(255, 190, 120, 0.9), transparent 3px),\n    radial-gradient(1.6px 1.6px at 90% 26%, rgba(255, 255, 255, 0.9), transparent 3px),\n    radial-gradient(1.8px 1.8px at 18% 84%, rgba(255, 170, 120, 0.85), transparent 3px),\n    radial-gradient(1.5px 1.5px at 44% 12%, rgba(255, 230, 170, 0.85), transparent 3px),\n    radial-gradient(1.8px 1.8px at 88% 88%, rgba(255, 140, 120, 0.85), transparent 3px);\n  mix-blend-mode: screen;\n  animation: lm-dots-twinkle 1.6s ease-in-out infinite;\n}\n\n.lm-burst3 .lm-dots {\n  opacity: 1;\n}\n\n.lm-iri {\n  position: absolute;\n  left: 50%;\n  top: 47%;\n  width: 118vmax;\n  height: 118vmax;\n  translate: -50% -50%;\n  opacity: 0;\n  background: conic-gradient(\n      from 24deg at 50% 50%,\n      rgba(255, 92, 64, 0.34) 0deg 28deg,\n      rgba(255, 196, 96, 0.3) 28deg 62deg,\n      rgba(255, 240, 160, 0.26) 62deg 96deg,\n      rgba(120, 214, 255, 0.28) 96deg 150deg,\n      rgba(110, 150, 255, 0.24) 150deg 198deg,\n      rgba(255, 120, 210, 0.28) 198deg 252deg,\n      rgba(255, 92, 64, 0.3) 252deg 300deg,\n      rgba(255, 180, 110, 0.26) 300deg 360deg\n    ),\n    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.55) 0%, rgba(255, 186, 120, 0.24) 26%, transparent 58%);\n  -webkit-mask-image: radial-gradient(circle at 50% 50%, #000 0 18%, rgba(0, 0, 0, 0.85) 34%, transparent 64%);\n  mask-image: radial-gradient(circle at 50% 50%, #000 0 18%, rgba(0, 0, 0, 0.85) 34%, transparent 64%);\n  \n  mix-blend-mode: screen;\n  animation: lm-iri-spin 6s linear infinite;\n  transition: opacity 0.35s ease;\n}\n\n.lm-burst3 .lm-iri {\n  opacity: 1;\n}\n\n/* burst3 fallback锛氬睆骞曡竟缂樺ぇ閲忔/绾?榛勬ā绯婃斁灏勫厜甯︼紙鏈夌矖鏈夌粏锛?*/\n.lm-edge {\n  position: absolute;\n  inset: -12%;\n  opacity: 0;\n  background: repeating-conic-gradient(\n    from 0deg at 50% 47%,\n    rgba(255, 148, 66, 0.42) 0deg 1.4deg,\n    rgba(255, 148, 66, 0) 1.4deg 4.6deg,\n    rgba(255, 92, 64, 0.34) 4.6deg 5.8deg,\n    rgba(255, 92, 64, 0) 5.8deg 9.4deg,\n    rgba(255, 214, 120, 0.36) 9.4deg 10.6deg,\n    rgba(255, 214, 120, 0) 10.6deg 14.2deg\n  );\n  -webkit-mask-image: radial-gradient(circle at 50% 47%, transparent 0 30%, rgba(0, 0, 0, 0.55) 48%, #000 66%, #000 100%);\n  mask-image: radial-gradient(circle at 50% 47%, transparent 0 30%, rgba(0, 0, 0, 0.55) 48%, #000 66%, #000 100%);\n  \n  mix-blend-mode: screen;\n  transition: opacity 0.35s ease;\n}\n\n.lm-burst3 .lm-edge {\n  opacity: 1;\n}\n\n/* burst 鏈熸棫鏁村睆鍏夋檿鍑忓急锛岃閿愯竟鍏夊甫鎴愪负涓昏 */\n.lm-burst1 .lm-rays,\n.lm-burst2 .lm-rays {\n  opacity: 0.15;\n}\n\n.lm-burst1 .lm-feather,\n.lm-burst2 .lm-feather {\n  opacity: 0.5;\n}\n\n.lm-burst2 .lm-rings > i:nth-child(1) {\n  animation-duration: 1.5s;\n}\n\n.lm-burst2 .lm-rings > i:nth-child(2) {\n  animation-duration: 1.6s;\n}\n\n.lm-burst2 .lm-rings > i:nth-child(3) {\n  animation-duration: 1.7s;\n}\n\n@keyframes lm-radials-spin {\n  from {\n    rotate: 0deg;\n  }\n  to {\n    rotate: 360deg;\n  }\n}\n\n@keyframes lm-radial-in {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n@keyframes lm-burstcross-grow {\n  0% {\n    scale: 0.5;\n    opacity: 0;\n  }\n  40% {\n    opacity: 0.85;\n  }\n  100% {\n    scale: 1.55;\n    opacity: 0.9;\n  }\n}\n\n@keyframes lm-burstcross-spin {\n  from {\n    rotate: -10deg;\n  }\n  to {\n    rotate: 14deg;\n  }\n}\n\n@keyframes lm-iri-spin {\n  from {\n    rotate: 0deg;\n  }\n  to {\n    rotate: 360deg;\n  }\n}\n\n@keyframes lm-dots-twinkle {\n  0%,\n  100% {\n    opacity: 0.75;\n  }\n  50% {\n    opacity: 1;\n  }\n}\n\n\n\n\n\r\n';

// src/client/splashCss.js
var STYLE_ID = "light-mirror-splash-inline";
function injectSplashCss() {
  try {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.dataset.lmuiSplashInline = "1";
    style.textContent = styles_default;
    (document.head || document.documentElement).appendChild(style);
  } catch (error) {
  }
}
injectSplashCss();

// src/splash/dom.js
function resolveUrl(path) {
  if (typeof path !== "string") return "";
  if (window.location.protocol !== "file:") return path;
  return path.replace(/^\/light-mirror\//, "../");
}
function devFallback(key) {
  try {
    const map = window.__LIGHT_MIRROR_DEV_FALLBACK__;
    if (map && typeof map === "object" && typeof map[key] === "string") return map[key];
  } catch (error) {
  }
  return "";
}
function mountImage(img) {
  if (!img) return;
  const chain = [];
  const primary = img.getAttribute("data-src") || "";
  if (primary) chain.push(resolveUrl(primary));
  const dev = img.getAttribute("data-dev-fallback") || "";
  if (dev) chain.push(resolveUrl(dev));
  if (!chain.length) return;
  let index = 0;
  const next = function() {
    if (index >= chain.length) {
      img.style.display = "none";
      return;
    }
    img.src = chain[index];
    index += 1;
  };
  img.addEventListener("load", function() {
    img.classList.add("is-loaded");
  });
  img.addEventListener("error", next);
  next();
}
function slenderStarPath(scale, wobbleAmp, seed) {
  const cx = 100;
  const cy = 180;
  const waist = 3.2;
  const innerY = 46;
  const pts = [
    [100, 6],
    [cx + waist, cy - innerY],
    [136, 180],
    [cx + waist, cy + innerY],
    [100, 354],
    [cx - waist, cy + innerY],
    [64, 180],
    [cx - waist, cy - innerY]
  ];
  let s = seed || 1;
  const rand2 = function() {
    s = s * 16807 % 2147483647;
    return s / 2147483647;
  };
  const out = [];
  for (let i = 0; i < pts.length; i += 1) {
    const a = pts[i];
    const b = pts[(i + 1) % pts.length];
    const steps = 7;
    for (let k = 0; k < steps; k += 1) {
      const t = k / steps;
      let x = a[0] + (b[0] - a[0]) * t;
      let y = a[1] + (b[1] - a[1]) * t;
      if (wobbleAmp > 0) {
        const nx = -(b[1] - a[1]);
        const ny = b[0] - a[0];
        const len = Math.hypot(nx, ny) || 1;
        const off = Math.sin(t * Math.PI * 3 + rand2() * 6.283) * wobbleAmp;
        x += nx / len * off;
        y += ny / len * off;
      }
      out.push([cx + (x - cx) * scale, cy + (y - cy) * scale]);
    }
  }
  let d = "M" + out[0][0].toFixed(2) + "," + out[0][1].toFixed(2);
  for (let i = 1; i < out.length; i += 1) d += "L" + out[i][0].toFixed(2) + "," + out[i][1].toFixed(2);
  return d + "Z";
}
function starBaseSvg() {
  const large = slenderStarPath(1, 2.2, 11);
  const medium = slenderStarPath(0.52, 0, 11);
  return '<svg class="lm-star-svg" viewBox="0 0 200 360" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><defs><filter id="lmStarEdge" x="-40%" y="-40%" width="180%" height="180%" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="4.6" result="b"/><feTurbulence type="fractalNoise" baseFrequency="0.028" numOctaves="2" seed="7" result="n"/><feDisplacementMap in="b" in2="n" scale="14" xChannelSelector="R" yChannelSelector="G"/></filter><mask id="lmStarCut"><rect x="0" y="0" width="200" height="360" fill="#fff"/><path d="' + medium + '" fill="#000"/></mask></defs><path class="lm-star-large" d="' + large + '" filter="url(#lmStarEdge)" mask="url(#lmStarCut)"/><path class="lm-star-medium" d="' + medium + '"/></svg>';
}
function starFillSvg() {
  const small = slenderStarPath(0.27, 0, 11);
  return '<svg class="lm-star-svg" viewBox="0 0 200 360" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><path class="lm-star-small" d="' + small + '"/></svg>';
}
function bandsHtml() {
  const list = [];
  const count = 22;
  let s = 7;
  const rand2 = function() {
    s = s * 16807 % 2147483647;
    return s / 2147483647;
  };
  for (let i = 0; i < count; i += 1) {
    const side = rand2() > 0.5 ? 1 : -1;
    const u = Math.pow(rand2(), 0.55);
    const xPct = 50 + side * u * 48;
    const edge = Math.abs(xPct - 50) / 50;
    const dip = 0.28 + 0.72 * Math.pow(edge, 0.8);
    const h5 = (0.12 + rand2() * 0.3) * (0.6 + 1.1 * dip);
    const w = 2 + rand2() * 10;
    const delay = -rand2() * 9;
    const dur = 5 + rand2() * 7;
    const op = 0.26 + rand2() * 0.5;
    const warm = rand2() < 0.3;
    const tint = warm ? "rgba(255,226,200,0.9)" : "rgba(214,226,255,0.9)";
    list.push(
      '<i style="--x:' + xPct.toFixed(2) + "%;--h:" + (h5 * 100).toFixed(1) + "%;--w:" + w.toFixed(1) + "px;--delay:" + delay.toFixed(2) + "s;--dur:" + dur.toFixed(2) + "s;--op:" + op.toFixed(2) + ";--tint:" + tint + '"></i>'
    );
  }
  return list.join("");
}
function radialsHtml() {
  const defs = [
    { cls: "thick", a: 60, len: 80, w: 52 },
    { cls: "thick", a: 178, len: 122, w: 48 },
    { cls: "thick", a: 298, len: 82, w: 50 },
    { cls: "thin", a: 145, len: 108, w: 8 },
    { cls: "thin", a: 234, len: 92, w: 7 },
    { cls: "thin", a: 326, len: 112, w: 7.5 }
  ];
  return defs.map(function(d) {
    return '<i class="lm-radial lm-radial--' + d.cls + '" style="--a:' + d.a + "deg;--l:" + d.len + "vmax;--w:" + d.w + 'px"></i>';
  }).join("");
}
function riseHtml() {
  const list = [];
  let s = 31;
  const rand2 = function() {
    s = s * 16807 % 2147483647;
    return s / 2147483647;
  };
  for (let i = 0; i < 6; i += 1) {
    const x = 8 + rand2() * 84;
    const h5 = 18 + rand2() * 34;
    const w = 1.5 + rand2() * 4;
    const delay = -rand2() * 2;
    const dur = 0.9 + rand2() * 1.2;
    list.push(
      '<i style="--x:' + x.toFixed(1) + "%;--h:" + h5.toFixed(1) + "%;--w:" + w.toFixed(1) + "px;--delay:" + delay.toFixed(2) + "s;--dur:" + dur.toFixed(2) + 's"></i>'
    );
  }
  return list.join("");
}
function burstCrossSvg() {
  const d = slenderStarPath(1.55, 0, 23);
  return '<svg class="lm-burstcross-svg" viewBox="0 0 200 360" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><defs><filter id="lmBurstCrossBlur" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="22"/></filter></defs><path d="' + d + '" fill="#ffffff" filter="url(#lmBurstCrossBlur)"/></svg>';
}
function buildScene(root, cfg, debug) {
  root.innerHTML = '<div class="lm-scene"><div class="lm-bg" aria-hidden="true"></div><div class="lm-fog" aria-hidden="true"></div><div class="lm-bands" aria-hidden="true">' + bandsHtml() + '</div><div class="lm-star-wrap" aria-hidden="true"><div class="lm-star-glow"></div><div class="lm-star-base">' + starBaseSvg() + '</div><div class="lm-star-fill">' + starFillSvg() + '</div><div class="lm-star-ghost lm-star-ghost-cyan">' + starBaseSvg() + '</div><div class="lm-star-ghost lm-star-ghost-pink">' + starBaseSvg() + '</div></div><div class="lm-burst" aria-hidden="true"><div class="lm-glow"></div><div class="lm-radials">' + radialsHtml() + '</div><div class="lm-burstcross">' + burstCrossSvg() + '</div><div class="lm-rise">' + riseHtml() + '</div><div class="lm-rings"><i></i><i></i><i></i></div><div class="lm-dots"></div><div class="lm-iri"></div><div class="lm-sparks">' + new Array(10).fill("<i></i>").join("") + '</div></div><img class="lm-newscene" alt="" aria-hidden="true" data-src="' + (MEDIA.photo && MEDIA.photo.bgDark ? MEDIA.photo.bgDark : "") + '" data-dev-fallback="' + devFallback("bgDark") + '"><canvas class="lm-webgl" aria-hidden="true"></canvas><div class="lm-white" aria-hidden="true"></div><div class="lm-subtitle" aria-live="polite"></div><div class="lm-fail" hidden></div></div>';
  const q = function(sel) {
    return root.querySelector(sel);
  };
  const qa = function(sel) {
    return Array.prototype.slice.call(root.querySelectorAll(sel));
  };
  const ui = {
    root,
    scene: q(".lm-scene"),
    bands: qa(".lm-bands > i"),
    starWrap: q(".lm-star-wrap"),
    starBase: q(".lm-star-base"),
    starFill: q(".lm-star-fill"),
    burst: q(".lm-burst"),
    rings: qa(".lm-rings > i"),
    feather: q(".lm-feather"),
    sparks: qa(".lm-sparks > i"),
    newScene: q(".lm-newscene"),
    webgl: q(".lm-webgl"),
    white: q(".lm-white"),
    subtitle: q(".lm-subtitle"),
    debug: null
  };
  mountImage(ui.newScene);
  if (debug && debug.stats) {
    const dbg = document.createElement("div");
    dbg.className = "lm-debug";
    ui.scene.appendChild(dbg);
    ui.debug = dbg;
  }
  ui.setSubtitle = function(text) {
    if (text) {
      ui.subtitle.textContent = text;
      ui.subtitle.classList.add("is-on");
    } else {
      ui.subtitle.classList.remove("is-on");
    }
  };
  ui.setFill = function(progress) {
    const p = Math.max(0, Math.min(1, Number(progress) || 0));
    const clip = ((1 - p) * 100).toFixed(2) + "%";
    ui.starFill.style.setProperty("--clipPct", clip);
    ui.starWrap.style.setProperty("--fill", p.toFixed(4));
  };
  ui.setShake = function(scale, scaleX) {
    ui.starWrap.style.transform = "scale(" + Number(scale).toFixed(4) + "," + Number(scaleX).toFixed(4) + ")";
  };
  ui.setBurst = function(on) {
    root.classList.toggle("lm-bursting", !!on);
  };
  ui.setBurstPhase = function(phase) {
    const p = Math.max(0, Math.min(3, Number(phase) || 0));
    root.classList.toggle("lm-bursting", p > 0);
    root.classList.toggle("lm-burst1", p === 1);
    root.classList.toggle("lm-burst2", p === 2);
    root.classList.toggle("lm-burst3", p === 3);
    if (p > 0 && !root.classList.contains("lm-bursting")) root.classList.add("lm-bursting");
  };
  ui.setWhite = function(on) {
    root.classList.toggle("lm-whiteout", !!on);
  };
  ui.setTransition = function(on) {
    root.classList.toggle("lm-transitioning", !!on);
  };
  ui.domCount = function() {
    return root.querySelectorAll("*").length + 1;
  };
  if (debug && debug.stats && ui.debug) {
    ui.debug.hidden = false;
    ui.debug.textContent = "nodes " + ui.domCount();
  }
  return ui;
}

// src/splash/util.js
var MEDIA_PREFIX2 = "/light-mirror/media/";
function resolveMedia2(url) {
  try {
    if (typeof url === "string" && window.location && window.location.protocol === "file:" && url.indexOf(MEDIA_PREFIX2) === 0) {
      return "../media/" + url.slice(MEDIA_PREFIX2.length);
    }
  } catch (error) {
  }
  return url;
}
function clampNumber(value, lo, hi, dflt) {
  const n = Number(value);
  if (!Number.isFinite(n)) return dflt;
  return Math.min(hi, Math.max(lo, n));
}

// src/splash/audio.js
function safe(fn) {
  try {
    fn();
  } catch (error) {
  }
}
function createAudio(cfg) {
  const sfxOn = cfg.sfx !== false;
  const voiceOn = cfg.voice !== false;
  const sfxVolume = clampNumber(cfg.sfxVolume, 0, 1, 0.5);
  const voiceVolume = clampNumber(cfg.voiceVolume, 0, 1, 0.85);
  const state = {
    ctx: null,
    master: null,
    noise: null,
    disposed: false,
    voiceCache: {},
    spoken: {}
  };
  function ctx() {
    if (state.disposed) return null;
    if (state.ctx) return state.ctx;
    const Ctor = window.AudioContext || window.webkitAudioContext;
    if (!Ctor) return null;
    try {
      state.ctx = new Ctor();
      const master = state.ctx.createGain();
      master.gain.value = sfxVolume * 0.72;
      master.connect(state.ctx.destination);
      state.master = master;
      const length = Math.floor(state.ctx.sampleRate * 1.4);
      const buffer = state.ctx.createBuffer(1, length, state.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < length; i += 1) data[i] = Math.random() * 2 - 1;
      state.noise = buffer;
    } catch (error) {
      state.ctx = null;
    }
    return state.ctx;
  }
  function running() {
    return !!(state.ctx && state.ctx.state === "running" && state.master);
  }
  function resume() {
    safe(function() {
      const ac = ctx();
      if (ac && ac.state === "suspended") ac.resume().catch(function() {
      });
    });
  }
  function now() {
    const ac = state.ctx;
    return ac ? ac.currentTime + 0.012 : 0;
  }
  function tone(freq, options) {
    if (!sfxOn || !running()) return;
    const o = options || {};
    const ac = state.ctx;
    const t0 = now() + (o.delay || 0);
    const dur = o.dur || 0.5;
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = o.type || "sine";
    osc.frequency.setValueAtTime(freq, t0);
    if (o.slideTo) osc.frequency.exponentialRampToValueAtTime(Math.max(20, o.slideTo), t0 + dur);
    if (o.detune) osc.detune.value = o.detune;
    const peak = Math.max(1e-4, (o.gain == null ? 0.1 : o.gain) * sfxVolume);
    gain.gain.setValueAtTime(1e-4, t0);
    gain.gain.exponentialRampToValueAtTime(peak, t0 + (o.attack || 0.02));
    gain.gain.exponentialRampToValueAtTime(1e-4, t0 + dur);
    osc.connect(gain);
    gain.connect(state.master);
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
  }
  function noise(options) {
    if (!sfxOn || !running() || !state.noise) return;
    const o = options || {};
    const ac = state.ctx;
    const t0 = now() + (o.delay || 0);
    const dur = o.dur || 0.4;
    const src = ac.createBufferSource();
    src.buffer = state.noise;
    const filter = ac.createBiquadFilter();
    filter.type = o.filter || "bandpass";
    filter.frequency.setValueAtTime(o.freq || 900, t0);
    if (o.freqTo) filter.frequency.exponentialRampToValueAtTime(Math.max(40, o.freqTo), t0 + dur);
    filter.Q.value = o.q == null ? 1 : o.q;
    const gain = ac.createGain();
    const peak = Math.max(1e-4, (o.gain == null ? 0.08 : o.gain) * sfxVolume);
    gain.gain.setValueAtTime(1e-4, t0);
    gain.gain.exponentialRampToValueAtTime(peak, t0 + (o.attack || 0.04));
    gain.gain.exponentialRampToValueAtTime(1e-4, t0 + dur);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(state.master);
    src.start(t0);
    src.stop(t0 + dur + 0.05);
  }
  const sfx = {
    /** 黑场低鸣（0.0s） */
    hum: function() {
      tone(46, { type: "sine", dur: 1.6, gain: 0.13, slideTo: 62, attack: 0.35 });
      tone(92, { type: "sine", dur: 1.2, gain: 0.04, attack: 0.4 });
      noise({ dur: 1.4, gain: 0.03, filter: "lowpass", freq: 200, freqTo: 480, q: 0.6 });
    },
    /** 终端帧淡入 / 中央金光出现（1.2s） */
    bloom: function() {
      tone(392, { type: "sine", dur: 2.4, gain: 0.05, attack: 0.3 });
      tone(587.33, { type: "sine", dur: 2.6, gain: 0.03, attack: 0.4, delay: 0.08 });
      tone(880, { type: "sine", dur: 2.2, gain: 0.018, attack: 0.5, delay: 0.16 });
      noise({ dur: 2.2, gain: 0.02, filter: "highpass", freq: 2600, q: 0.5 });
    },
    /** 光雨升起 / 金光增强（4.5s） */
    lift: function() {
      noise({ dur: 0.9, gain: 0.04, filter: "bandpass", freq: 520, freqTo: 2800, q: 0.8 });
      tone(659.25, { type: "sine", dur: 1.4, gain: 0.03, attack: 0.2 });
    },
    /** 链接状态行（8.6s） */
    status: function(index) {
      const base = 740 + (index || 0) * 110;
      tone(base, { type: "triangle", dur: 0.18, gain: 0.035, attack: 6e-3 });
      tone(base * 1.5, { type: "sine", dur: 0.3, gain: 0.016, attack: 0.01, delay: 0.02 });
    },
    /** 五光白过曝（10.4s） */
    overexpose: function() {
      noise({ dur: 1.2, gain: 0.11, filter: "bandpass", freq: 700, freqTo: 5200, q: 0.6, attack: 0.06 });
      tone(523.25, { type: "sine", dur: 1.5, gain: 0.06, attack: 0.05 });
      tone(783.99, { type: "sine", dur: 1.6, gain: 0.04, attack: 0.08, delay: 0.06 });
      tone(1046.5, { type: "sine", dur: 1.4, gain: 0.022, attack: 0.1, delay: 0.12 });
    },
    /** 镜面 wipe 打开（10.55s） */
    wipe: function() {
      noise({ dur: 0.9, gain: 0.05, filter: "lowpass", freq: 1400, freqTo: 120, q: 0.7 });
      tone(392, { type: "sine", dur: 1.2, gain: 0.045, attack: 0.01 });
      tone(587.33, { type: "sine", dur: 1.3, gain: 0.028, attack: 0.02, delay: 0.05 });
      noise({ dur: 0.8, gain: 0.02, filter: "highpass", freq: 5600, q: 0.6, delay: 0.12 });
    }
  };
  function tts(text) {
    if (!voiceOn || state.disposed) return;
    safe(function() {
      const synth = window.speechSynthesis;
      if (!synth || typeof window.SpeechSynthesisUtterance !== "function") return;
      const utter = new window.SpeechSynthesisUtterance(text);
      utter.lang = "zh-CN";
      utter.rate = 0.94;
      utter.pitch = 0.98;
      utter.volume = Math.min(1, voiceVolume);
      synth.speak(utter);
    });
  }
  function voice(key) {
    if (!voiceOn || state.disposed) return;
    const line = VOICE_LINES[key];
    if (!line || !line.src) return;
    if (state.spoken[key]) return;
    state.spoken[key] = true;
    safe(function() {
      let audio = state.voiceCache[key];
      if (!audio) {
        audio = new Audio();
        audio.preload = "auto";
        audio.volume = Math.min(1, voiceVolume);
        audio.src = resolveMedia2(line.src);
        state.voiceCache[key] = audio;
      }
      const promise = audio.play();
      if (promise && typeof promise.catch === "function") {
        promise.catch(function() {
          if (!audio || audio.error || audio.networkState === 3) tts(line.text);
        });
      }
      audio.addEventListener(
        "error",
        function() {
          tts(line.text);
          state.voiceCache[key] = null;
        },
        { once: true }
      );
    });
  }
  function unlock() {
    resume();
  }
  function dispose() {
    state.disposed = true;
    safe(function() {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    });
    Object.keys(state.voiceCache).forEach(function(key) {
      const audio = state.voiceCache[key];
      if (audio) {
        audio.pause();
        try {
          audio.removeAttribute("src");
          audio.load();
        } catch (error) {
        }
      }
    });
    state.voiceCache = {};
    safe(function() {
      if (state.ctx && state.ctx.state !== "closed") state.ctx.close();
    });
    state.ctx = null;
    state.master = null;
    state.noise = null;
  }
  return { sfx, voice, unlock, resume, dispose };
}

// src/splash/stages.js
var TIMELINE = {
  total: 10.2,
  voiceLinkAt: 1.4,
  starAt: 1.9,
  fillStart: 3,
  fillEnd: 5.6,
  shakeStart: 5.6,
  shakeEnd: 6.3,
  voiceWelcomeAt: 5.2,
  burstAt: 6.3,
  whiteFullAt: 7.6,
  transitionStart: 7.9,
  transitionEnd: 9.1,
  revealAt: 9.4,
  totalEnd: 10.2
};
var REDUCED_TIMELINE = {
  total: 4.2,
  starAt: 0.3,
  revealAt: 1.8,
  totalEnd: 4.2
};
var BURST_PHASES = {
  burst1At: 6.3,
  burst2At: 6.85,
  burst3At: 7.2,
  whiteFullAt: 7.6
};
function burstPhaseAt(t) {
  if (t >= BURST_PHASES.burst3At) return 3;
  if (t >= BURST_PHASES.burst2At) return 2;
  if (t >= BURST_PHASES.burst1At) return 1;
  return 0;
}
function clamp01(v) {
  const n = Number(v);
  if (!Number.isFinite(n)) return 0;
  return Math.min(1, Math.max(0, n));
}
function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}
function createDirector(opts) {
  const root = opts.root;
  const ui = opts.ui;
  const audio = opts.audio;
  const transition = opts.transition;
  const reduced = !!opts.reduced;
  const debug = opts.debug || {};
  const timeline = reduced ? REDUCED_TIMELINE : TIMELINE;
  const total = timeline.total;
  let timers = [];
  let intervals = [];
  let raf = 0;
  let finished = false;
  let frozen = false;
  let stageRunning = false;
  function later(fn, seconds) {
    const id = window.setTimeout(function() {
      removeTimer(id);
      if (finished || frozen) return;
      try {
        fn();
      } catch (error) {
        if (window.console && console.warn) console.warn("[light-mirror] splash step failed", error);
      }
    }, Math.max(0, seconds * 1e3));
    timers.push(id);
    return id;
  }
  function removeTimer(id) {
    const index = timers.indexOf(id);
    if (index >= 0) timers.splice(index, 1);
  }
  function clearAll() {
    timers.forEach(function(id) {
      window.clearTimeout(id);
    });
    timers = [];
    intervals.forEach(function(id) {
      window.clearInterval(id);
    });
    intervals = [];
    if (raf) window.cancelAnimationFrame(raf);
    raf = 0;
  }
  function showSubtitle(key, hold) {
    const line = VOICE_LINES[key];
    ui.setSubtitle(line ? line.text : "");
    later(function() {
      ui.setSubtitle("");
    }, hold);
  }
  function markLive() {
    if (!root.classList.contains("lm-live-scene")) root.classList.add("lm-live-scene");
    root.dataset.playAt = root.dataset.playAt || String(Math.round(performance.now()));
  }
  function startFillAnimation() {
    const t0 = performance.now();
    const duration = (TIMELINE.fillEnd - TIMELINE.fillStart) * 1e3;
    const tick = function() {
      if (finished || frozen) return;
      const p = clamp01((performance.now() - t0) / duration);
      ui.setFill(easeInOut(p));
      if (p < 1) raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);
  }
  function cleanupShake() {
    if (ui.starWrap) ui.starWrap.classList.remove("lm-shaking");
    if (ui.starFill) ui.starFill.classList.remove("lm-shaking");
  }
  function shakeLoop() {
    if (!ui.starWrap) return;
    ui.starWrap.classList.add("lm-shaking");
    if (ui.starFill) ui.starFill.classList.add("lm-shaking");
    let steps = 0;
    const totalSteps = Math.round((TIMELINE.shakeEnd - TIMELINE.shakeStart) * 1e3 / 50);
    const id = window.setInterval(function() {
      if (finished || frozen) return;
      steps += 1;
      const jitter = function() {
        return 1 + (Math.random() * 2 - 1) * 0.06;
      };
      ui.setShake(jitter(), jitter());
      if (steps >= totalSteps) {
        window.clearInterval(id);
        const index = intervals.indexOf(id);
        if (index >= 0) intervals.splice(index, 1);
        ui.setShake(1, 1);
        cleanupShake();
      }
    }, 50);
    intervals.push(id);
  }
  function startTransition() {
    ui.setWhite(false);
    ui.setTransition(true);
    if (!transition) return;
    if (!transition.supported) {
      root.classList.add("lm-fallback-transition");
      return;
    }
    if (transition.resize) transition.resize();
    if (transition.setNewImage && ui.newScene) transition.setNewImage(ui.newScene);
    const t0 = performance.now();
    const duration = (TIMELINE.transitionEnd - TIMELINE.transitionStart) * 1e3;
    let ticks = 0;
    const tick = function() {
      ticks += 1;
      root.dataset.transTicks = String(ticks);
      root.dataset.transFlags = (frozen ? "F" : "") + (finished ? "X" : "") + "/" + timers.length;
      if (finished || frozen) return;
      const elapsed = performance.now() - t0;
      const p = clamp01(elapsed / duration);
      root.dataset.transitionP = p.toFixed(3) + "/" + elapsed.toFixed(0) + "ms";
      try {
        transition.render(p, elapsed / 1e3);
      } catch (error) {
        root.dataset.transitionError = String(error && error.message || error);
      }
      if (p < 1) raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);
  }
  function reveal() {
    if (opts.onRevealStart) {
      try {
        opts.onRevealStart();
      } catch (error) {
      }
    }
    root.classList.add("lm-revealing");
    if (transition && transition.supported && ui.webgl) {
      ui.webgl.classList.add("is-out");
    }
    if (ui.newScene) ui.newScene.style.opacity = "0";
  }
  function playNormal() {
    audio.sfx.hum();
    later(function() {
      audio.sfx.bloom();
    }, 0.8);
    later(function() {
      root.classList.add("lm-star-on");
      if (ui.starWrap) ui.starWrap.style.opacity = "1";
    }, TIMELINE.starAt);
    later(function() {
      showSubtitle("link", 2.6);
      audio.voice("link");
    }, TIMELINE.voiceLinkAt);
    later(function() {
      ui.setFill(0);
      startFillAnimation();
    }, TIMELINE.fillStart);
    later(function() {
      ui.setFill(1);
      shakeLoop();
    }, TIMELINE.shakeStart);
    later(function() {
      showSubtitle("welcome", 3.9);
      audio.voice("welcome");
    }, TIMELINE.voiceWelcomeAt);
    later(function() {
      ui.setBurstPhase(1);
      audio.sfx.overexpose();
    }, BURST_PHASES.burst1At);
    later(function() {
      ui.setBurstPhase(2);
    }, BURST_PHASES.burst2At);
    later(function() {
      ui.setBurstPhase(3);
    }, BURST_PHASES.burst3At);
    later(function() {
      ui.setWhite(true);
    }, TIMELINE.whiteFullAt);
    later(function() {
      root.dataset.stepTransition = "1";
      startTransition();
      audio.sfx.wipe();
    }, TIMELINE.transitionStart);
    later(function() {
      root.dataset.stepReveal = "1";
      reveal();
    }, TIMELINE.revealAt);
    later(function() {
      finish("done");
    }, TIMELINE.totalEnd);
  }
  function playReduced() {
    root.classList.add("lm-reduced");
    ui.setFill(1);
    if (ui.starWrap) ui.starWrap.style.opacity = "1";
    later(function() {
      showSubtitle("link", 1.4);
    }, 0.2);
    later(function() {
      ui.setWhite(true);
    }, 1.2);
    later(function() {
      reveal();
    }, REDUCED_TIMELINE.revealAt);
    later(function() {
      finish("done");
    }, REDUCED_TIMELINE.totalEnd);
  }
  function play() {
    if (stageRunning || finished) return;
    stageRunning = true;
    markLive();
    if (reduced) {
      playReduced();
      return;
    }
    playNormal();
  }
  function applyStateAt(t) {
    if (t >= TIMELINE.starAt) {
      root.classList.add("lm-star-on");
      if (ui.starWrap) ui.starWrap.style.opacity = "1";
    }
    if (t >= TIMELINE.fillStart && t < TIMELINE.shakeStart) {
      ui.setFill(easeInOut(clamp01((t - TIMELINE.fillStart) / (TIMELINE.fillEnd - TIMELINE.fillStart))));
    }
    if (t >= TIMELINE.shakeStart && t < TIMELINE.burstAt) {
      ui.setFill(1);
      const step = Math.floor((t - TIMELINE.shakeStart) / 0.05);
      const seed = Math.sin(step * 12.9898) * 43758.5453;
      const j1 = 1 + ((seed - Math.floor(seed)) * 2 - 1) * 0.05;
      ui.setShake(j1, 2 - j1);
      if (ui.starWrap) ui.starWrap.classList.add("lm-shaking");
    } else if (ui.starWrap) {
      ui.setShake(1, 1);
      ui.starWrap.classList.remove("lm-shaking");
    }
    ui.setBurstPhase(burstPhaseAt(t));
    if (t >= TIMELINE.whiteFullAt) ui.setWhite(true);
    if (t >= TIMELINE.transitionStart && transition && transition.supported) {
      ui.setTransition(true);
      const duration = TIMELINE.transitionEnd - TIMELINE.transitionStart;
      const p = clamp01((t - TIMELINE.transitionStart) / duration);
      if (transition.resize) transition.resize();
      if (transition.setNewImage && ui.newScene) transition.setNewImage(ui.newScene);
      transition.render(p, p * duration);
    } else if (t >= TIMELINE.transitionStart && transition && !transition.supported) {
      ui.setTransition(true);
      root.classList.add("lm-fallback-transition");
    }
    if (t >= TIMELINE.revealAt) reveal();
  }
  function jumpDebug(seconds) {
    if (stageRunning || finished) return false;
    stageRunning = true;
    markLive();
    const t = Math.min(total, Math.max(0, Number(seconds) || 0));
    if (reduced) {
      root.classList.add("lm-reduced");
      if (t >= REDUCED_TIMELINE.revealAt) reveal();
      freezeAt(t);
      return true;
    }
    applyStateAt(t);
    freezeAt(t);
    return true;
  }
  function seekTo(seconds) {
    if (!stageRunning) return jumpDebug(seconds);
    if (!frozen) return false;
    const t = Math.min(total, Math.max(0, Number(seconds) || 0));
    if (reduced) {
      if (t >= REDUCED_TIMELINE.revealAt) reveal();
      return true;
    }
    applyStateAt(t);
    if (opts.onFreeze) {
      try {
        opts.onFreeze(t * 1e3);
      } catch (error) {
      }
    }
    return true;
  }
  function freezeAt(t) {
    if (frozen || finished) return;
    frozen = true;
    root.dataset.freeze = "1";
    clearAll();
    root.classList.add("lm-frozen");
    try {
      void root.getBoundingClientRect();
      const animations = document.getAnimations ? document.getAnimations() : [];
      animations.forEach(function(animation) {
        try {
          animation.pause();
          animation.currentTime = Math.max(0, t * 1e3);
        } catch (error) {
        }
      });
    } catch (error) {
    }
    if (opts.onFreeze) {
      try {
        opts.onFreeze(t * 1e3);
      } catch (error) {
      }
    }
  }
  function holdAt(seconds) {
    if (reduced) return;
    later(function() {
      if (frozen || finished) return;
      frozen = true;
      clearAll();
      root.classList.add("lm-frozen");
      if (opts.onFreeze) opts.onFreeze(seconds * 1e3);
    }, Math.max(0, seconds));
  }
  function finish(reason) {
    if (finished) return;
    finished = true;
    clearAll();
    if (transition) {
      try {
        transition.dispose();
      } catch (error) {
      }
    }
    if (opts.onFinish) opts.onFinish(reason || "done");
  }
  function dispose() {
    finished = true;
    frozen = true;
    clearAll();
    if (transition) {
      try {
        transition.dispose();
      } catch (error) {
      }
    }
  }
  return {
    play,
    jumpDebug,
    seekTo,
    holdAt,
    finish,
    dispose,
    total,
    reduced,
    timeline,
    isFinished: function() {
      return finished;
    },
    isFrozen: function() {
      return frozen;
    }
  };
}

// src/splash/webgl.js
var VERT = [
  "attribute vec2 a_pos;",
  "varying vec2 v_uv;",
  "void main() {",
  "  v_uv = a_pos * 0.5 + 0.5;",
  "  gl_Position = vec4(a_pos, 0.0, 1.0);",
  "}"
].join("\n");
var FRAG = [
  "precision highp float;",
  "varying vec2 v_uv;",
  "uniform vec2 u_res;",
  "uniform float u_p;",
  "uniform float u_t;",
  "float hash(float n) { return fract(sin(n) * 43758.5453123); }",
  "void main() {",
  "  vec2 uv = v_uv;",
  "  float p = clamp(u_p, 0.0, 1.0);",
  "  float px = uv.x * u_res.x;",
  "  float pre = 1.0 - smoothstep(0.0, 0.15, p);",
  "  float stretch = smoothstep(0.10, 0.32, p) * (1.0 - smoothstep(0.74, 0.98, p));",
  "  float tear = smoothstep(0.32, 0.58, p) * (1.0 - smoothstep(0.86, 1.0, p));",
  "  /* 全高竖条：每条有随机宽度与随机显露起点；覆盖从 100% 逐渐收窄，",
  "     竖条贯穿整个画面高度（alpha 只与 x 有关），不做上下分段。 */",
  "  float cellW = mix(5.0, 52.0, hash(floor(px / 13.0)));",
  "  float cell = floor(px / cellW);",
  "  float lp = fract(px / cellW);",
  "  float r1 = hash(cell * 1.37 + 2.1);",
  "  float r2 = hash(cell * 2.71 + 7.3);",
  "  float startP = 0.16 + r1 * 0.58;",
  "  float local = clamp((p - startP) / 0.24, 0.0, 1.0);",
  "  local = local * local * (3.0 - 2.0 * local);",
  "  /* 目标残留比例：大部分条完全消失，少数保留成最终场景的细光柱 */",
  "  float targetW = (r2 > 0.86 ? mix(0.10, 0.28, hash(cell * 5.9)) : 0.0);",
  "  float barW = mix(1.0, targetW, local);",
  "  /* 边缘轻微纵向不规则（正弦扰动边界 x，不切断竖条） */",
  "  float wobble = (sin(uv.y * 7.0 + r1 * 6.283) * 0.018 + sin(uv.y * 23.0 + r2 * 6.283) * 0.008) * (0.5 + 0.5 * tear);",
  "  float center = 0.5 + (r2 - 0.5) * 0.10;",
  "  float halfW = max(0.0, barW) * 0.5;",
  "  float d = abs(lp - center + wobble);",
  "  float aa = 0.012 + 0.02 * stretch;",
  "  float bar = 1.0 - smoothstep(halfW - aa, halfW + aa, d);",
  "  /* 细光柱/拉丝：竖向拉伸感来自条内的长条亮暗纹理（全高） */",
  "  float streak = 0.5 + 0.5 * sin(uv.y * 41.0 + r1 * 6.283 + u_t * 3.0);",
  "  streak *= 0.5 + 0.5 * sin(uv.y * 9.0 - r2 * 4.0 + u_t * 1.7);",
  "  vec3 white = vec3(0.972, 0.976, 1.0);",
  "  white *= 0.90 + 0.10 * streak;",
  "  /* 明暗反转条（少量条在撕裂阶段变暗，增强故障感） */",
  "  float invMask = step(0.80, r1) * smoothstep(0.30, 0.55, p) * (1.0 - smoothstep(0.80, 0.96, p));",
  "  vec3 col = mix(white, vec3(0.10, 0.10, 0.13), invMask * 0.55);",
  "  /* 色差只在竖条两侧：一侧暖橙、一侧冷青（避免紫色偏色） */",
  "  float edgeDist = abs(d - halfW);",
  "  float fringe = smoothstep(0.0, 0.018 + 0.02 * stretch, edgeDist);",
  "  float fringeAmt = (0.35 * stretch + 0.55 * tear) * (1.0 - local * 0.5);",
  "  float side = sign(lp - center);",
  "  col += vec3(0.10, 0.045, -0.02) * (1.0 - fringe) * fringeAmt * step(0.0, side);",
  "  col += vec3(-0.02, 0.045, 0.11) * (1.0 - fringe) * fringeAmt * step(side, 0.0);",
  "  /* 预热阶段整屏近白 */",
  "  col = mix(vec3(1.0), col, smoothstep(0.0, 0.10, p));",
  "  /* alpha = 白条覆盖；条外露出下方真实 DOM */",
  "  float alpha = bar;",
  "  alpha *= 1.0 - smoothstep(0.94, 1.0, p);",
  "  alpha = clamp(alpha, 0.0, 1.0);",
  "  /* 标准预乘 alpha 输出（浏览器按同一规则与 DOM 合成） */",
  "  gl_FragColor = vec4(col * alpha, alpha);",
  "}"
].join("\n");
function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error("shader compile: " + info);
  }
  return shader;
}
function createTransition(canvas) {
  const gl = canvas ? canvas.getContext("webgl", {
    alpha: true,
    antialias: false,
    premultipliedAlpha: true,
    preserveDrawingBuffer: true
  }) : null;
  if (!gl) {
    return {
      supported: false,
      render: function() {
      },
      resize: function() {
      },
      dispose: function() {
      },
      setNewImage: function() {
      }
    };
  }
  let program = null;
  let buffer = null;
  let aPos = null;
  const uni = {};
  try {
    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error("link failed");
    buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    aPos = gl.getAttribLocation(program, "a_pos");
    uni.res = gl.getUniformLocation(program, "u_res");
    uni.p = gl.getUniformLocation(program, "u_p");
    uni.t = gl.getUniformLocation(program, "u_t");
  } catch (error) {
    return {
      supported: false,
      render: function() {
      },
      resize: function() {
      },
      dispose: function() {
      },
      setNewImage: function() {
      }
    };
  }
  function resize() {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const w = Math.max(2, Math.round(rect.width || window.innerWidth));
    const h5 = Math.max(2, Math.round(rect.height || window.innerHeight));
    const dpr = Math.min(2, Math.max(1, window.devicePixelRatio || 1));
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h5 * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  function render(progress, timeSec) {
    if (!canvas) return;
    if (!canvas.width) resize();
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    gl.uniform2f(uni.res, canvas.width, canvas.height);
    gl.uniform1f(uni.p, Math.max(0, Math.min(1, progress)));
    gl.uniform1f(uni.t, timeSec || 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
  function dispose() {
    try {
      if (program) gl.deleteProgram(program);
      if (buffer) gl.deleteBuffer(buffer);
    } catch (error) {
    }
  }
  return {
    supported: true,
    render,
    resize,
    setNewImage: function() {
    },
    dispose
  };
}

// src/splash/index.js
var ROOT_ID = "light-mirror-root";
var VEIL_ID = "light-mirror-veil";
var LM_SPLASH_DISABLED = typeof window !== "undefined" && window.__LIGHT_MIRROR_SPLASH_DISABLE__ === true;
var LM_HAS_DOM = typeof window !== "undefined" && typeof document !== "undefined" && !!document.documentElement && !!document.body;
if (LM_SPLASH_DISABLED || !LM_HAS_DOM) {
} else if (window.__LIGHT_MIRROR_SPLASH__ && window.__LIGHT_MIRROR_SPLASH__.version) {
  window.__LIGHT_MIRROR_SPLASH_LOADED__ = true;
} else {
  boot();
}
function boot() {
  const state = {
    cfg: null,
    debug: null,
    reduced: false,
    mounted: false,
    done: false,
    root: null,
    veil: null,
    ui: null,
    director: null,
    audio: null,
    transition: null,
    listeners: [],
    failsafe: 0,
    prevOverflow: null,
    prevBodyOverflow: null
  };
  state.debug = parseDebug();
  state.cfg = normalizeConfig3(window.__LIGHT_MIRROR__);
  state.reduced = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) || state.debug.reduced;
  const api = {
    version: VERSION,
    start,
    replay,
    stop,
    debugSeek: function(seconds) {
      if (state.director && typeof state.director.seekTo === "function") return state.director.seekTo(seconds);
      return false;
    },
    stats: function() {
      return {
        version: VERSION,
        mounted: state.mounted,
        done: state.done,
        nodes: state.root ? state.root.querySelectorAll("*").length + 1 : 0,
        reduced: state.reduced,
        debug: state.debug,
        config: state.cfg,
        webgl: state.transition ? state.transition.supported : null
      };
    }
  };
  window.__LIGHT_MIRROR_SPLASH__ = api;
  window.__LIGHT_MIRROR_SPLASH_LOADED__ = true;
  function normalizeConfig3(input) {
    const out = {};
    Object.keys(DEFAULTS).forEach(function(key) {
      out[key] = DEFAULTS[key];
    });
    const src = input && typeof input === "object" ? input : {};
    Object.keys(DEFAULTS).forEach(function(key) {
      if (!(key in src) || src[key] === void 0 || src[key] === null) return;
      const value = src[key];
      if (BOOL_KEYS.indexOf(key) >= 0) {
        out[key] = value === true || value === "true" || value === 1 || value === "1";
      } else if (ENUMS[key]) {
        const alias = ENUM_ALIASES[key] && ENUM_ALIASES[key][value];
        const next = alias || value;
        out[key] = ENUMS[key].indexOf(next) >= 0 ? next : DEFAULTS[key];
      } else if (RANGES[key]) {
        out[key] = clampNumber(value, RANGES[key][0], RANGES[key][1], DEFAULTS[key]);
      } else {
        out[key] = value;
      }
    });
    if (state.debug && state.debug.mute) {
      out.voice = false;
      out.sfx = false;
    }
    return out;
  }
  function parseDebug() {
    const result = { t: -1, play: false, mute: false, reduced: false, stats: false, finish: false, hold: -1 };
    try {
      const params = new URLSearchParams(window.location.search || "");
      const preview = window.__LIGHT_MIRROR_PREVIEW__ === true;
      const local = window.location.protocol === "file:" || window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || params.has("lmdebug") || preview;
      if (!local) return result;
      if (params.has("t") || params.has("freeze")) {
        result.t = clampNumber(params.get("t") || params.get("freeze"), 0, TIMELINE.total, -1);
        result.play = true;
      }
      if (params.has("at")) {
        result.t = clampNumber(params.get("at"), 0, 1, 0.6) * TIMELINE.total;
        result.play = true;
      }
      if (params.has("hold")) {
        result.hold = clampNumber(params.get("hold"), 0, TIMELINE.total, -1);
        result.play = true;
      }
      if (params.get("play") === "1" || preview) result.play = true;
      if (params.get("mute") === "1") result.mute = true;
      if (params.get("reduced") === "1") result.reduced = true;
      if (params.get("stats") === "1") result.stats = true;
      if (params.get("finish") === "1") result.finish = true;
    } catch (error) {
    }
    return result;
  }
  function ensureRoot() {
    let root = document.getElementById(ROOT_ID);
    if (!root) {
      root = document.createElement("div");
      root.id = ROOT_ID;
      root.className = "lm-root lm-boot";
      document.body.insertBefore(root, document.body.firstChild);
    }
    return root;
  }
  function ensureVeil() {
    let veil = document.getElementById(VEIL_ID);
    if (!veil) {
      veil = document.createElement("div");
      veil.id = VEIL_ID;
      veil.setAttribute("aria-hidden", "true");
      document.body.insertBefore(veil, document.body.firstChild);
    }
    return veil;
  }
  function lockPage() {
    const html = document.documentElement;
    html.classList.add("lm-lock");
    html.setAttribute("data-lm-boot", "1");
    if (state.prevOverflow == null) state.prevOverflow = html.style.overflow || "";
    if (state.prevBodyOverflow == null) {
      state.prevBodyOverflow = document.body ? document.body.style.overflow || "" : "";
    }
    html.style.overflow = "hidden";
    if (document.body) document.body.style.overflow = "hidden";
  }
  function unlockPage() {
    const html = document.documentElement;
    html.classList.remove("lm-lock");
    html.removeAttribute("data-lm-boot");
    html.style.overflow = state.prevOverflow || "";
    if (document.body) document.body.style.overflow = state.prevBodyOverflow || "";
    state.prevOverflow = null;
    state.prevBodyOverflow = null;
  }
  function addListener(target, type, fn, options) {
    target.addEventListener(type, fn, options);
    state.listeners.push(function() {
      target.removeEventListener(type, fn, options);
    });
  }
  function clearListeners() {
    state.listeners.forEach(function(off) {
      try {
        off();
      } catch (error) {
      }
    });
    state.listeners = [];
  }
  function bindAudioUnlock() {
    const unlock = function() {
      if (state.audio) state.audio.unlock();
    };
    addListener(document, "pointerdown", unlock, { passive: true });
    addListener(document, "keydown", unlock);
  }
  function start(overrideConfig) {
    if (overrideConfig && typeof overrideConfig === "object") state.cfg = normalizeConfig3(overrideConfig);
    try {
      mount();
      return true;
    } catch (error) {
      softFail(error);
      return false;
    }
  }
  function replay(overrideConfig) {
    if (overrideConfig && typeof overrideConfig === "object") return Promise.resolve(start(overrideConfig));
    const url = window.__LIGHT_MIRROR_CONFIG_URL__;
    if (!url) return Promise.resolve(start());
    return new Promise(function(resolve2) {
      let finished = false;
      const done = function(ok) {
        if (finished) return;
        finished = true;
        resolve2(ok);
      };
      try {
        fetch(url, { headers: { Accept: "application/json" }, cache: "no-store" }).then(function(res) {
          return res.json();
        }).then(function(json) {
          if (json && json.ok === true && json.config) done(start(json.config));
          else done(start());
        }).catch(function() {
          done(start());
        });
        window.setTimeout(function() {
          done(start());
        }, 1200);
      } catch (error) {
        done(start());
      }
    });
  }
  function mount() {
    window.__LIGHT_MIRROR_SPLASH_DONE__ = false;
    window.__LIGHT_MIRROR_SPLASH_REASON__ = "";
    if (state.mounted) teardown();
    state.done = false;
    const cfg = state.cfg;
    const debug = state.debug;
    const root = ensureRoot();
    const veil = ensureVeil();
    state.root = root;
    state.veil = veil;
    lockPage();
    if (veil) veil.style.opacity = "1";
    root.className = "lm-root";
    root.style.display = "";
    root.classList.toggle("lm-reduced", state.reduced);
    const ui = buildScene(root, cfg, debug);
    state.ui = ui;
    const transition = createTransition(ui.webgl);
    state.transition = transition;
    state.audio = createAudio(cfg);
    const director = createDirector({
      root,
      ui,
      audio: state.audio,
      transition,
      reduced: state.reduced,
      debug,
      onFinish: function(reason) {
        release(reason);
      },
      onRevealStart: function() {
        beginReveal();
      },
      onFreeze: function(offsetMs) {
        onFrozen(offsetMs);
      }
    });
    state.director = director;
    state.mounted = true;
    root.classList.remove("lm-boot");
    root.classList.add("lm-ready");
    root.dataset.bootAt = String(Math.round(performance.now()));
    window.__LIGHT_MIRROR_TAKEN_OVER__ = true;
    bindAudioUnlock();
    window.clearTimeout(state.failsafe);
    if (debug.t < 0 && debug.hold < 0) {
      state.failsafe = window.setTimeout(function() {
        if (!state.done) softFail(new Error("splash timeout"));
      }, TIMELINE.total * 1e3 + 3e3);
    }
    if (debug.stats) {
      const count = ui.domCount();
      try {
        document.title = "LM nodes=" + count + " t=" + (debug.t >= 0 ? debug.t : "play");
      } catch (error) {
      }
    }
    if (debug.t >= 0) {
      director.jumpDebug(debug.t);
    } else {
      director.play();
      if (debug.hold >= 0) director.holdAt(debug.hold);
    }
    if (debug.finish) {
      window.setTimeout(function() {
        if (!state.done) release("debug-finish");
      }, 260);
    }
  }
  function beginReveal() {
    const html = document.documentElement;
    html.classList.add("lm-revealing");
    html.classList.remove("lm-lock");
    html.removeAttribute("data-lm-boot");
    if (state.root) state.root.classList.add("lm-revealing");
    if (state.veil) {
      const veil = state.veil;
      state.veil = null;
      if (veil.parentNode) veil.parentNode.removeChild(veil);
    }
  }
  function release(reason) {
    if (state.done) return;
    state.done = true;
    window.clearTimeout(state.failsafe);
    state.failsafe = 0;
    clearListeners();
    if (state.director) {
      try {
        state.director.dispose();
      } catch (error) {
      }
    }
    if (state.audio) {
      try {
        state.audio.dispose();
      } catch (error) {
      }
    }
    const root = state.root || document.getElementById(ROOT_ID);
    const veil = state.veil || document.getElementById(VEIL_ID);
    unlockPage();
    if (root && root.parentNode) root.parentNode.removeChild(root);
    if (veil && veil.parentNode) veil.parentNode.removeChild(veil);
    state.root = null;
    state.veil = null;
    state.mounted = false;
    state.director = null;
    state.audio = null;
    state.transition = null;
    state.ui = null;
    window.__LIGHT_MIRROR_SPLASH_DONE__ = true;
    window.__LIGHT_MIRROR_SPLASH_REASON__ = reason || "done";
  }
  function stop() {
    if (!state.mounted && state.done) return;
    release("stop");
  }
  function softFail(error) {
    try {
      if (window.console && console.warn) console.warn("[light-mirror] splash fallback:", error);
      window.__LIGHT_MIRROR_SPLASH_ERROR__ = String(error && error.message || error || "unknown");
      if (state.director) state.director.dispose();
      const root = state.root || document.getElementById(ROOT_ID);
      const ui = state.ui;
      if (ui && ui.scene) {
        const fail = ui.scene.querySelector(".lm-fail");
        if (fail) {
          fail.hidden = false;
          fail.textContent = "光之镜暂时失焦，正在返回世界…";
        }
        root && root.classList.add("lm-revealing");
      }
    } catch (inner) {
    }
    window.setTimeout(function() {
      release("error");
    }, 900);
  }
  function teardown() {
    if (!state.mounted) return;
    clearListeners();
    if (state.director) {
      try {
        state.director.dispose();
      } catch (error) {
      }
    }
    if (state.audio) {
      try {
        state.audio.dispose();
      } catch (error) {
      }
    }
    if (state.root && state.root.parentNode) state.root.parentNode.removeChild(state.root);
    if (state.veil && state.veil.parentNode) state.veil.parentNode.removeChild(state.veil);
    unlockPage();
    state.mounted = false;
    state.director = null;
    state.audio = null;
    state.transition = null;
    state.ui = null;
    state.root = null;
    state.veil = null;
    state.done = false;
  }
  function onFrozen(offsetMs) {
    const nodes = state.ui ? state.ui.domCount() : 0;
    const text = "frozen t=" + (Number(offsetMs) / 1e3).toFixed(2) + "s | nodes " + nodes;
    try {
      if (state.ui && state.ui.debug) {
        state.ui.debug.hidden = false;
        state.ui.debug.textContent = text;
      }
      document.title = "LM " + text;
    } catch (error) {
    }
  }
  function currentDay() {
    try {
      return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    } catch (error) {
      return "";
    }
  }
  function shouldSelfPlay(cfg) {
    if (!cfg.splashEnabled) return false;
    try {
      if (cfg.splashMode === "session" && sessionStorage.getItem(STORAGE.splashShown) === "1") return false;
      if (cfg.splashMode === "daily" && localStorage.getItem(STORAGE.splashDay) === currentDay()) return false;
    } catch (error) {
    }
    return true;
  }
  function markSelfPlayed(cfg) {
    try {
      if (cfg.splashMode === "session") sessionStorage.setItem(STORAGE.splashShown, "1");
      if (cfg.splashMode === "daily") localStorage.setItem(STORAGE.splashDay, currentDay());
    } catch (error) {
    }
  }
  function afterBoot() {
    const injected = window.__LIGHT_MIRROR__ && typeof window.__LIGHT_MIRROR__ === "object";
    const rootExists = !!document.getElementById(ROOT_ID);
    const skipByHost = window.__LIGHT_MIRROR_SKIP__ === true;
    const force = state.debug.play || window.__LIGHT_MIRROR_PREVIEW__ === true;
    if (skipByHost && !force) return;
    if (rootExists) {
      start();
      return;
    }
    if (!force) {
      if (injected) return;
      if (!shouldSelfPlay(state.cfg)) return;
    }
    if (!injected && window.__LIGHT_MIRROR_CONFIG_URL__) {
      fetch(window.__LIGHT_MIRROR_CONFIG_URL__, { headers: { Accept: "application/json" }, cache: "no-store" }).then(function(res) {
        return res.json();
      }).then(function(json) {
        if (json && json.ok === true && json.config) {
          state.cfg = normalizeConfig3(json.config);
          if (force || shouldSelfPlay(state.cfg)) {
            if (!force) markSelfPlayed(state.cfg);
            start();
          }
        } else {
          fallbackSelfPlay();
        }
      }).catch(fallbackSelfPlay);
      return;
    }
    fallbackSelfPlay();
    function fallbackSelfPlay() {
      if (!force && !shouldSelfPlay(state.cfg)) return;
      if (!force) markSelfPlayed(state.cfg);
      start();
    }
  }
  if (document.body) afterBoot();
  else document.addEventListener("DOMContentLoaded", afterBoot, { once: true });
}

// src/client/splashRuntime.js
var ROOT_ID2 = "light-mirror-root";
function startFallbackIfNeeded() {
  try {
    if (document.getElementById(ROOT_ID2)) return;
    if (window.__LIGHT_MIRROR_SKIP__ === true) return;
    const api = window.__LIGHT_MIRROR_SPLASH__;
    if (!api || typeof api.start !== "function") return;
    const cfg = window.__LIGHT_MIRROR__;
    if (cfg && cfg.splashEnabled === false) return;
    if (window.__LIGHT_MIRROR_TAKEN_OVER__ === true) return;
    const mode = cfg && cfg.splashMode;
    if (mode === "session") {
      try {
        if (sessionStorage.getItem("light-mirror:splash-shown") === "1") return;
      } catch (error) {
      }
    }
    if (mode === "daily") {
      try {
        const day = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
        if (localStorage.getItem("light-mirror:splash-day") === day) return;
      } catch (error) {
      }
    }
    api.start(cfg && typeof cfg === "object" ? cfg : void 0);
    window.setTimeout(function() {
      try {
        const current = window.__LIGHT_MIRROR__;
        const mode2 = current && current.splashMode;
        if (mode2 === "session") sessionStorage.setItem("light-mirror:splash-shown", "1");
        if (mode2 === "daily") localStorage.setItem("light-mirror:splash-day", (/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
      } catch (error) {
      }
    }, 1200);
  } catch (error) {
    try {
      window.__LIGHT_MIRROR_SPLASH_CLIENT_ERROR__ = String(error && error.message || error);
    } catch (inner) {
    }
  }
}
if (document.body) {
  window.setTimeout(startFallbackIfNeeded, 0);
} else {
  document.addEventListener("DOMContentLoaded", startFallbackIfNeeded, { once: true });
}

// src/client/brand.js
var ReactNS = __toESM(require("react"), 1);
var React = ReactNS && typeof ReactNS.createElement === "function" ? ReactNS : ReactNS && ReactNS.default && typeof ReactNS.default.createElement === "function" ? ReactNS.default : ReactNS;
var h = React.createElement;
var BRAND_PRIORITY = -200;
function useMirrorConfig(store) {
  const read = () => {
    try {
      return store && typeof store.get === "function" ? store.get() : {};
    } catch (e) {
      return {};
    }
  };
  const [snap, setSnap] = React.useState(read);
  React.useEffect(() => {
    if (!store || typeof store.subscribe !== "function") return void 0;
    const off = store.subscribe(() => setSnap(read()));
    return () => {
      if (typeof off === "function") off();
    };
  }, [store]);
  return snap || {};
}
function resolve(url) {
  return url ? resolveMedia(url) : "";
}
var PHANES_COMPACT = (() => {
  const core = resolve(MEDIA.art.phanesCore);
  return core ? core.replace(/-core\.png$/i, "-core-compact.png") : "";
})();
var ART_DIR = (() => {
  const url = resolve(MEDIA.art.phanesFull);
  return url ? url.replace(/[^/]+$/i, "") : "";
})();
function artUrl2(name) {
  return ART_DIR ? ART_DIR + name : "";
}
function newArtCandidates(variant, scheme) {
  const dark = scheme === "dark";
  const list = [];
  const push = (kind, names) => {
    names.forEach((name) => {
      if (name) list.push({ kind, url: artUrl2(name) });
    });
  };
  if (variant === "phanes") {
    if (dark) {
      push("new-ink-dark", ["phanes-ink-dark.png"]);
      push("new-color", ["phanes-wings-new.png"]);
      push("new-ink", ["phanes-ink.png"]);
    } else {
      push("new-ink", ["phanes-ink.png"]);
      push("new-color", ["phanes-wings-new.png"]);
    }
  } else if (variant === "paimonEmoji") {
    if (dark) {
      push("new-ink-dark", ["pattern-paimon-emoji-new-dark.png"]);
      push("new-ink", ["pattern-paimon-emoji-new.png", "paimon-emoji-ink.png"]);
    } else {
      push("new-ink", ["pattern-paimon-emoji-new.png", "paimon-emoji-ink.png"]);
    }
  } else if (variant === "paimonAvatar") {
    if (dark) {
      push("new-color", ["pattern-paimon-avatar-new.png"]);
      push("new-bw-light", ["pattern-paimon-avatar-new-light.png"]);
    } else {
      push("new-ink", ["pattern-paimon-avatar-new-light.png"]);
      push("new-color", ["pattern-paimon-avatar-new.png"]);
    }
  }
  return list.filter((item) => item.url);
}
function useScheme() {
  const read = () => {
    try {
      return document.documentElement.getAttribute("data-lmui-scheme") === "light" ? "light" : "dark";
    } catch (e) {
      return "dark";
    }
  };
  const [scheme, setScheme] = React.useState(read);
  React.useEffect(() => {
    if (typeof window.MutationObserver !== "function") return void 0;
    const obs = new window.MutationObserver(() => setScheme(read()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-lmui-scheme"] });
    return () => obs.disconnect();
  }, []);
  return scheme;
}
var VARIANT_DEFS = {
  phanes: {
    white: () => resolve(MEDIA.art.phanesFull),
    gold: () => resolve(MEDIA.art.phanesFullGold),
    compact: () => PHANES_COMPACT,
    kind: "pattern",
    goldKind: "pattern"
  },
  terminal: {
    white: () => resolve(MEDIA.art.patternTerminal),
    gold: () => resolve(MEDIA.art.patternTerminalGold),
    compact: () => resolve(MEDIA.art.patternTerminal),
    kind: "pattern",
    goldKind: "pattern"
  },
  skyisland: {
    white: () => resolve(MEDIA.art.patternSkyisland),
    gold: () => "",
    compact: () => resolve(MEDIA.art.patternSkyisland),
    kind: "pattern",
    goldKind: "pattern"
  },
  paimonEmoji: {
    white: () => resolve(MEDIA.art.patternPaimonEmoji),
    gold: () => "",
    compact: () => resolve(MEDIA.art.patternPaimonEmoji),
    kind: "pattern",
    goldKind: "pattern"
  },
  paimonAvatar: {
    white: () => resolve(MEDIA.art.patternPaimonAvatar),
    gold: () => "",
    compact: () => resolve(MEDIA.art.patternPaimonAvatar),
    kind: "pattern",
    goldKind: "pattern"
  }
};
function variantDef(variant) {
  return VARIANT_DEFS[variant] || VARIANT_DEFS.phanes;
}
function primaryCandidates(variant, size, scheme) {
  const def = variantDef(variant);
  const list = [];
  const push = (kind, url) => {
    if (!url) return;
    if (list.some((item) => item.url === url)) return;
    list.push({ kind, url });
  };
  const fresh = newArtCandidates(variant, scheme);
  fresh.forEach((item) => push(item.kind, item.url));
  if (size < 26) push(def.kind === "wings" ? "compact" : "pattern", def.compact());
  push(def.kind, def.white());
  if (size < 26 && PHANES_COMPACT) push("compact", PHANES_COMPACT);
  push("core", resolve(MEDIA.art.phanesCore));
  push("cutout", resolve(MEDIA.art.phanesCutout));
  return list;
}
function goldCandidates(variant) {
  const def = variantDef(variant);
  const url = def.gold();
  return url ? [{ kind: def.goldKind || "gold", url }] : [];
}
function fourStar(cx, cy, r) {
  const k = r * 0.18;
  return [
    "M" + cx + " " + (cy - r),
    "Q" + (cx + k) + " " + (cy - k) + " " + (cx + r) + " " + cy,
    "Q" + (cx + k) + " " + (cy + k) + " " + cx + " " + (cy + r),
    "Q" + (cx - k) + " " + (cy + k) + " " + (cx - r) + " " + cy,
    "Q" + (cx - k) + " " + (cy - k) + " " + cx + " " + (cy - r),
    "Z"
  ].join(" ");
}
function PlaceholderMark() {
  return h(
    "svg",
    { className: "lmui-mark__fallback", viewBox: "0 0 64 64", "aria-hidden": "true", focusable: "false" },
    h("circle", { cx: "32", cy: "32", r: "21.5", fill: "none", stroke: "currentColor", strokeWidth: "1", opacity: "0.5" }),
    h("path", { d: fourStar(32, 32, 13), fill: "currentColor", opacity: "0.92" }),
    h("path", { d: fourStar(32, 10.5, 3.2), fill: "currentColor", opacity: "0.55" }),
    h("path", { d: fourStar(32, 53.5, 3.2), fill: "currentColor", opacity: "0.55" })
  );
}
function MarkLayer(props) {
  const candidates = props.candidates;
  const [index, setIndex] = React.useState(0);
  const [loaded, setLoaded] = React.useState(false);
  const entry = candidates[index];
  const src = entry ? entry.url : "";
  React.useEffect(() => {
    setLoaded(false);
  }, [src]);
  React.useEffect(() => {
    setIndex(0);
    setLoaded(false);
  }, [candidates]);
  React.useEffect(() => {
    if (typeof props.onLoadedChange === "function") props.onLoadedChange(loaded);
  }, [loaded]);
  React.useEffect(() => {
    if (src) return;
    if (typeof props.onExhausted === "function") props.onExhausted();
  }, [src]);
  if (!src) return null;
  return h(
    "span",
    {
      className: "lmui-mark__layer lmui-mark__layer--" + props.layer,
      "data-lmui-shape": entry.kind
    },
    h("img", {
      key: src,
      className: "lmui-mark__media",
      src,
      alt: "",
      draggable: false,
      decoding: "async",
      style: { opacity: loaded ? 1 : 0 },
      onLoad: () => {
        setLoaded(true);
        if (typeof props.onResolved === "function") props.onResolved(entry.kind);
      },
      onError: () => {
        setLoaded(false);
        setIndex((prev) => prev + 1);
      }
    })
  );
}
function MarkGlyph(props) {
  const rawSize = Number(props.size);
  const size = Number.isFinite(rawSize) && rawSize > 0 ? Math.round(rawSize) : 24;
  const variant = VARIANT_DEFS[props.variant] ? props.variant : "phanes";
  const scheme = useScheme();
  const primary = React.useMemo(() => primaryCandidates(variant, size, scheme), [variant, size, scheme]);
  const gold = React.useMemo(() => goldCandidates(variant), [variant]);
  const [whiteLoaded, setWhiteLoaded] = React.useState(false);
  const [goldLoaded, setGoldLoaded] = React.useState(false);
  const [goldBroken, setGoldBroken] = React.useState(false);
  const [resolvedKind, setResolvedKind] = React.useState("");
  React.useEffect(() => {
    setWhiteLoaded(false);
    setGoldLoaded(false);
    setGoldBroken(false);
    setResolvedKind("");
  }, [variant, size, scheme]);
  const isNewArt = resolvedKind.indexOf("new-") === 0;
  const hasGoldLayer = gold.length > 0 && !goldBroken && !isNewArt;
  const showPlaceholder = !whiteLoaded && !goldLoaded;
  const shapeKind = primary[0] && primary[0].kind || "image";
  return h(
    "span",
    {
      className: "lmui-mark" + (props.className ? " " + props.className : ""),
      style: { width: size + "px", height: size + "px" },
      "data-lmui-size": size < 26 ? "compact" : "normal",
      "data-lmui-variant": variant,
      "data-lmui-shape": shapeKind,
      "data-lmui-gold": hasGoldLayer ? "1" : "0",
      "aria-hidden": "true"
    },
    showPlaceholder ? h(PlaceholderMark, null) : null,
    h(MarkLayer, {
      layer: "white",
      candidates: primary,
      onLoadedChange: setWhiteLoaded,
      onResolved: setResolvedKind
    }),
    hasGoldLayer ? h(MarkLayer, {
      layer: "gold",
      candidates: gold,
      onLoadedChange: setGoldLoaded,
      onExhausted: () => setGoldBroken(true)
    }) : null
  );
}
function SidebarMark(props) {
  const cfg = useMirrorConfig(props && props.store);
  return h(MarkGlyph, {
    size: props && props.size ? props.size : 26,
    variant: cfg.brandMark || "phanes"
  });
}
function HeroMark(props) {
  const cfg = useMirrorConfig(props && props.store);
  return h(MarkGlyph, {
    size: props && props.size ? props.size : 34,
    variant: cfg.brandMark || "phanes",
    className: "lmui-hero-mark"
  });
}
function BrandName() {
  const displayName = "⌈" + UI_COPY.brandName + "⌋";
  return h(
    "span",
    { className: "lmui-brand-name", "data-lmui-brand-name": "" },
    h("span", { className: "lmui-brand-name__main" }, displayName),
    h("span", { className: "lmui-brand-name__sub" }, UI_COPY.brandSub)
  );
}
function bindStore(store, Component) {
  const Bound = (props) => h(Component, Object.assign({}, props, { store }));
  Bound.displayName = "LMUI(" + (Component.name || "Slot") + ")";
  return Bound;
}
function registerBrand(ctx, store, keep) {
  if (!ctx || !ctx.slots) return;
  const slots = ctx.slots;
  const remember = typeof keep === "function" ? keep : () => {
  };
  const put = (slotName, options, Component) => {
    if (typeof slots.inject !== "function" || typeof slots.register !== "function") return;
    try {
      const off = slots.inject(slotName, () => slots.register(options, bindStore(store, Component)));
      if (typeof off === "function") remember(off);
    } catch (e) {
    }
  };
  put("sidebar.brand.mark", { name: "sidebar.brand.mark", priority: BRAND_PRIORITY }, SidebarMark);
  put("sidebar.brand.name", { name: "sidebar.brand.name", priority: BRAND_PRIORITY }, BrandName);
  put(
    "conversation.hero.brand.mark",
    { name: "conversation.hero.brand.mark", priority: BRAND_PRIORITY },
    HeroMark
  );
}

// src/client/decor.js
var ReactNS2 = __toESM(require("react"), 1);
var React2 = ReactNS2 && typeof ReactNS2.createElement === "function" ? ReactNS2 : ReactNS2 && ReactNS2.default && typeof ReactNS2.default.createElement === "function" ? ReactNS2.default : ReactNS2;
var h2 = React2.createElement;
var CORNERS = ["tl", "tr", "bl", "br"];
function CornerFrame() {
  return h2(
    "div",
    { className: "lmui-frame", "data-lmui-decor": "frame", "aria-hidden": "true" },
    CORNERS.map(
      (corner) => h2(
        "span",
        { key: corner, className: "lmui-frame__corner lmui-frame__corner--" + corner },
        h2("span", { className: "lmui-frame__h" }),
        h2("span", { className: "lmui-frame__v" }),
        h2("span", { className: "lmui-frame__glint" })
      )
    )
  );
}
var STARDUST = [
  { left: "9%", top: "5.2%", size: 2.2, delay: 0, dur: 8.4, tone: "white" },
  { left: "19.5%", top: "9.4%", size: 1.4, delay: 2.6, dur: 10.2, tone: "lavender" },
  { left: "31%", top: "4.4%", size: 1.8, delay: 4.1, dur: 9.1, tone: "white" },
  { left: "46%", top: "8.6%", size: 1.2, delay: 1.4, dur: 11.4, tone: "cyan" },
  { left: "62%", top: "4.8%", size: 2, delay: 3.3, dur: 8.8, tone: "white" },
  { left: "78%", top: "8.2%", size: 1.3, delay: 5.7, dur: 10.6, tone: "pink" },
  { left: "90%", top: "5.8%", size: 1.7, delay: 2.2, dur: 9.6, tone: "white" },
  { left: "14%", top: "93.4%", size: 1.5, delay: 1.1, dur: 9.9, tone: "lavender" },
  { left: "36%", top: "95.2%", size: 2.1, delay: 4.8, dur: 8.2, tone: "white" },
  { left: "58%", top: "92.6%", size: 1.2, delay: 0.7, dur: 11.8, tone: "cyan" },
  { left: "81%", top: "94.6%", size: 1.8, delay: 3.9, dur: 9.3, tone: "white" }
];
function StarDust() {
  return h2(
    "div",
    { className: "lmui-dust", "data-lmui-decor": "stardust", "aria-hidden": "true" },
    STARDUST.map(
      (dot, index) => h2("span", {
        key: "dust" + index,
        className: "lmui-dust__dot lmui-dust__dot--" + dot.tone,
        style: {
          left: dot.left,
          top: dot.top,
          width: dot.size + "px",
          height: dot.size + "px",
          animationDelay: dot.delay + "s",
          animationDuration: dot.dur + "s"
        }
      })
    )
  );
}
function StatusLine() {
  return h2(
    "div",
    { className: "lmui-statusline", "data-lmui-decor": "status-line" },
    h2("div", { className: "lmui-statusline__title" }, "光之镜"),
    h2(
      "div",
      { className: "lmui-statusline__meta" },
      h2("span", { className: "lmui-statusline__host" }, "SKY ISLAND"),
      h2("span", { className: "lmui-statusline__dot", "aria-hidden": "true" }),
      h2("span", { className: "lmui-statusline__state" }, "ONLINE")
    )
  );
}
function DecorLayer(props) {
  const cfg = useMirrorConfig(props && props.store);
  if (!cfg || cfg.enabled !== true) return null;
  return h2(
    "div",
    { className: "lmui-decor", "data-lmui-decor-layer": "", "aria-hidden": "true" },
    cfg.frame ? h2(CornerFrame) : null,
    cfg.stardust ? h2(StarDust) : null,
    cfg.statusLine ? h2(StatusLine) : null
  );
}
function bindStore2(store, Component) {
  const Bound = (props) => h2(Component, Object.assign({}, props, { store }));
  Bound.displayName = "LMUI(Decor)";
  return Bound;
}
function registerDecor(ctx, store, keep) {
  if (!ctx || !ctx.slots) return;
  const slots = ctx.slots;
  const remember = typeof keep === "function" ? keep : () => {
  };
  if (typeof slots.inject !== "function" || typeof slots.register !== "function") return;
  try {
    const off = slots.inject(
      "shell.overlay",
      () => slots.register(
        { name: "shell.overlay", id: "light-mirror-decor", order: 20 },
        bindStore2(store, DecorLayer)
      )
    );
    if (typeof off === "function") remember(off);
  } catch (e) {
  }
}

// src/client/rail.js
var ReactNS3 = __toESM(require("react"), 1);
var React3 = ReactNS3 && typeof ReactNS3.createElement === "function" ? ReactNS3 : ReactNS3 && ReactNS3.default && typeof ReactNS3.default.createElement === "function" ? ReactNS3.default : ReactNS3;
var h3 = React3.createElement;
var METRICS_URL = "/light-mirror/metrics";
var METRICS_INTERVAL = 4e3;
var GB = 1024 * 1024 * 1024;
var RAIL_TARGET = 300;
var RAIL_MIN = 260;
var CONVERSATION_FLOOR = 480;
var RAIL_SHARE = 0.4;
var FALLBACK_WIDTH = 280;
function persistOpen(open) {
  try {
    window.localStorage.setItem(STORAGE.railOpen, open ? "1" : "0");
  } catch (e) {
  }
}
function readStoredOpen() {
  try {
    return window.localStorage.getItem(STORAGE.railOpen) === "1";
  } catch (e) {
    return false;
  }
}
function splitTracks(template) {
  const tracks = [];
  let depth = 0;
  let current = "";
  for (const ch of String(template || "")) {
    if (ch === "(") depth += 1;
    else if (ch === ")") depth = Math.max(0, depth - 1);
    if (/\s/.test(ch) && depth === 0) {
      if (current) {
        tracks.push(current);
        current = "";
      }
    } else {
      current += ch;
    }
  }
  if (current) tracks.push(current);
  return tracks;
}
function findFrameElement() {
  try {
    const overlay = document.querySelector("[data-shell-overlay]");
    if (overlay && overlay.parentElement) return overlay.parentElement;
    const slotOverlay = document.querySelector('[data-slot="shell.overlay"]');
    if (slotOverlay && slotOverlay.parentElement) return slotOverlay.parentElement;
  } catch (e) {
  }
  return null;
}
function headTrack(second) {
  if (!second) return "minmax(0, 1fr)";
  if (/fr|minmax|fit-content|auto/.test(second)) return second;
  return "minmax(0, 1fr)";
}
function createRailController(store) {
  let open = readStoredOpen();
  let docked = false;
  let frameEl = null;
  let resizeObserver = null;
  let mutationObserver = null;
  let resizeHandler = null;
  let scheduleTimer = 0;
  let retryTimer = 0;
  let disposed = false;
  const listeners = /* @__PURE__ */ new Set();
  const root = () => document.documentElement;
  function emit() {
    for (const fn of Array.from(listeners)) {
      try {
        fn();
      } catch (e) {
      }
    }
  }
  function publishOpenAttr(isOpen) {
    try {
      const el = root();
      if (!el) return;
      el.setAttribute("data-lmui-rail", isOpen ? "open" : "closed");
    } catch (e) {
    }
  }
  function clearDock() {
    docked = false;
    try {
      const el = root();
      if (!el) return;
      el.removeAttribute("data-lmui-rail-docked");
      el.removeAttribute("data-lmui-rail-mode");
      el.style.removeProperty("--lmui-rail-w");
      el.style.removeProperty("--lmui-rail-head");
      if (frameEl) frameEl.removeAttribute("data-lmui-frame");
    } catch (e) {
    }
  }
  function teardownObservers() {
    try {
      if (resizeObserver) resizeObserver.disconnect();
    } catch (e) {
    }
    resizeObserver = null;
    try {
      if (mutationObserver) mutationObserver.disconnect();
    } catch (e) {
    }
    mutationObserver = null;
    try {
      if (resizeHandler) window.removeEventListener("resize", resizeHandler);
    } catch (e) {
    }
    resizeHandler = null;
  }
  function ensureObservers(frame) {
    if (!frame) return;
    frameEl = frame;
    if (!resizeHandler) {
      resizeHandler = () => schedule();
      try {
        window.addEventListener("resize", resizeHandler, { passive: true });
      } catch (e) {
        resizeHandler = null;
      }
    }
    if (!resizeObserver && typeof window.ResizeObserver === "function") {
      try {
        resizeObserver = new window.ResizeObserver(() => schedule());
        resizeObserver.observe(frame);
      } catch (e) {
        resizeObserver = null;
      }
    }
    if (!mutationObserver && typeof window.MutationObserver === "function") {
      try {
        mutationObserver = new window.MutationObserver(() => schedule());
        mutationObserver.observe(frame, { attributes: true, attributeFilter: ["style", "class"] });
      } catch (e) {
        mutationObserver = null;
      }
    }
  }
  function computeWidth(frame, tracks) {
    let viewport = 1280;
    try {
      viewport = window.innerWidth || viewport;
    } catch (e) {
    }
    let frameWidth = viewport;
    if (frame) {
      try {
        frameWidth = frame.getBoundingClientRect().width || viewport;
      } catch (e) {
        frameWidth = viewport;
      }
    }
    const sidebar = tracks.length >= 2 ? parseFloat(tracks[0]) || 0 : 0;
    const spare = Math.max(0, frameWidth - sidebar);
    const capByShare = Math.round(spare * RAIL_SHARE);
    const capByFloor = Math.max(0, spare - CONVERSATION_FLOOR);
    let width = Math.min(RAIL_TARGET, capByShare, capByFloor);
    if (width < RAIL_MIN) width = Math.min(RAIL_MIN, capByFloor);
    return Math.max(0, Math.round(width));
  }
  function scheduleRetry(delay) {
    if (retryTimer || disposed) return;
    retryTimer = window.setTimeout(() => {
      retryTimer = 0;
      sync();
    }, delay || 400);
  }
  function sync() {
    if (disposed) return;
    const cfg = store && store.get() || {};
    const active = cfg.enabled === true && cfg.rail === true;
    publishOpenAttr(open && active);
    if (!open || !active) {
      clearDock();
      teardownObservers();
      if (retryTimer) {
        window.clearTimeout(retryTimer);
        retryTimer = 0;
      }
      return;
    }
    const frame = findFrameElement();
    if (!frame) {
      clearDock();
      const el2 = root();
      if (el2) {
        el2.setAttribute("data-lmui-rail-mode", "overlay");
        el2.style.removeProperty("--lmui-rail-head");
        el2.style.setProperty("--lmui-rail-w", FALLBACK_WIDTH + "px");
      }
      scheduleRetry(320);
      return;
    }
    const el = root();
    const wasDocked = el.hasAttribute("data-lmui-rail-docked");
    if (wasDocked) el.removeAttribute("data-lmui-rail-docked");
    frame.setAttribute("data-lmui-frame", "");
    let template = "";
    try {
      template = frame.style.gridTemplateColumns || getComputedStyle(frame).gridTemplateColumns || "";
    } catch (e) {
      template = frame.style.gridTemplateColumns || "";
    }
    const tracks = splitTracks(template);
    const sidebarTrack = tracks.length >= 2 ? parseFloat(tracks[0]) : NaN;
    const headKnown = tracks.length >= 2 && Number.isFinite(sidebarTrack) && sidebarTrack > 0;
    const width = computeWidth(frame, tracks);
    if (headKnown && width >= RAIL_MIN) {
      el.style.setProperty("--lmui-rail-w", width + "px");
      el.style.setProperty("--lmui-rail-head", tracks[0] + " " + headTrack(tracks[1]));
      el.setAttribute("data-lmui-rail-mode", "docked");
      el.setAttribute("data-lmui-rail-docked", "");
      docked = true;
      ensureObservers(frame);
      if (retryTimer) {
        window.clearTimeout(retryTimer);
        retryTimer = 0;
      }
    } else {
      el.removeAttribute("data-lmui-rail-docked");
      el.style.removeProperty("--lmui-rail-head");
      el.setAttribute("data-lmui-rail-mode", "overlay");
      el.style.setProperty("--lmui-rail-w", FALLBACK_WIDTH + "px");
      docked = false;
      ensureObservers(frame);
      scheduleRetry(400);
    }
  }
  function schedule() {
    if (disposed || scheduleTimer) return;
    scheduleTimer = window.setTimeout(() => {
      scheduleTimer = 0;
      sync();
    }, 90);
  }
  function setOpen(next) {
    const value = Boolean(next);
    if (value === open) {
      sync();
      return;
    }
    open = value;
    persistOpen(value);
    sync();
    emit();
  }
  function toggle() {
    setOpen(!open);
  }
  function getOpen() {
    return open;
  }
  function isDocked() {
    return docked;
  }
  function subscribe(fn) {
    if (typeof fn === "function") listeners.add(fn);
    return () => listeners.delete(fn);
  }
  function dispose() {
    disposed = true;
    teardownObservers();
    if (scheduleTimer) {
      try {
        window.clearTimeout(scheduleTimer);
      } catch (e) {
      }
      scheduleTimer = 0;
    }
    if (retryTimer) {
      try {
        window.clearTimeout(retryTimer);
      } catch (e) {
      }
      retryTimer = 0;
    }
    clearDock();
    try {
      root().removeAttribute("data-lmui-rail");
    } catch (e) {
    }
    listeners.clear();
  }
  let storeOff = null;
  if (store && typeof store.subscribe === "function") {
    storeOff = store.subscribe(() => sync());
  }
  const baseDispose = dispose;
  function disposeAll() {
    if (typeof storeOff === "function") {
      try {
        storeOff();
      } catch (e) {
      }
      storeOff = null;
    }
    baseDispose();
  }
  try {
    if (document.readyState !== "loading") sync();
    else document.addEventListener("DOMContentLoaded", () => sync(), { once: true });
  } catch (e) {
  }
  return {
    getOpen,
    setOpen,
    toggle,
    subscribe,
    sync,
    isDocked,
    dispose: disposeAll
  };
}
function useRail(controller) {
  const [, force] = React3.useState(0);
  React3.useEffect(() => {
    return controller.subscribe(() => force((n) => n + 1));
  }, [controller]);
  return { open: controller.getOpen(), docked: controller.isDocked() };
}
function IconEye() {
  return h3(
    "svg",
    { width: "13", height: "13", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" },
    h3("path", {
      d: "M1.4 8 C3.4 4.7 5.6 3.2 8 3.2 C10.4 3.2 12.6 4.7 14.6 8 C12.6 11.3 10.4 12.8 8 12.8 C5.6 12.8 3.4 11.3 1.4 8 Z",
      stroke: "currentColor",
      strokeWidth: "1.1",
      strokeLinejoin: "round"
    }),
    h3("circle", { cx: "8", cy: "8", r: "2.1", stroke: "currentColor", strokeWidth: "1.1" })
  );
}
function IconClose() {
  return h3(
    "svg",
    { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", "aria-hidden": "true" },
    h3("path", { d: "M2 2 L10 10 M10 2 L2 10", stroke: "currentColor", strokeWidth: "1.1", strokeLinecap: "round" })
  );
}
function IconPrev() {
  return h3(
    "svg",
    { width: "12", height: "12", viewBox: "0 0 16 16", fill: "currentColor", "aria-hidden": "true" },
    h3("path", { d: "M4 3 H5.6 V13 H4 Z M13 3.4 V12.6 L6 8 Z" })
  );
}
function IconNext() {
  return h3(
    "svg",
    { width: "12", height: "12", viewBox: "0 0 16 16", fill: "currentColor", "aria-hidden": "true" },
    h3("path", { d: "M12 3 H10.4 V13 H12 Z M3 3.4 V12.6 L10 8 Z" })
  );
}
function IconPlay() {
  return h3(
    "svg",
    { width: "12", height: "12", viewBox: "0 0 16 16", fill: "currentColor", "aria-hidden": "true" },
    h3("path", { d: "M4.5 2.8 L13 8 L4.5 13.2 Z" })
  );
}
function IconPause() {
  return h3(
    "svg",
    { width: "12", height: "12", viewBox: "0 0 16 16", fill: "currentColor", "aria-hidden": "true" },
    h3("rect", { x: "4", y: "3", width: "3", height: "10", rx: "0.6" }),
    h3("rect", { x: "9", y: "3", width: "3", height: "10", rx: "0.6" })
  );
}
var ZH_WEEK = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
function pad2(value) {
  const n = Number(value) || 0;
  return n < 10 ? "0" + n : String(n);
}
function formatClock(date) {
  const d = date instanceof Date && !Number.isNaN(date.getTime()) ? date : /* @__PURE__ */ new Date();
  return {
    date: d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日 " + ZH_WEEK[d.getDay()],
    time: pad2(d.getHours()) + ":" + pad2(d.getMinutes()) + ":" + pad2(d.getSeconds())
  };
}
function formatDuration(seconds) {
  const s = Number(seconds);
  if (!Number.isFinite(s) || s <= 0) return "0:00";
  const total = Math.floor(s);
  return Math.floor(total / 60) + ":" + pad2(total % 60);
}
function useClock() {
  const [now, setNow] = React3.useState(() => /* @__PURE__ */ new Date());
  React3.useEffect(() => {
    const id = window.setInterval(() => setNow(/* @__PURE__ */ new Date()), 1e3);
    return () => window.clearInterval(id);
  }, []);
  return now;
}
function metricsUrl() {
  try {
    if (typeof window.__LIGHT_MIRROR_METRICS_URL__ === "string" && window.__LIGHT_MIRROR_METRICS_URL__) {
      return window.__LIGHT_MIRROR_METRICS_URL__;
    }
  } catch (e) {
  }
  return METRICS_URL;
}
function useMetrics(active) {
  const [state, setState] = React3.useState({ status: "idle", data: null });
  React3.useEffect(() => {
    if (!active) {
      setState({ status: "idle", data: null });
      return void 0;
    }
    let alive = true;
    let timer = 0;
    const load = () => {
      try {
        fetch(metricsUrl(), { headers: { Accept: "application/json" }, cache: "no-store", credentials: "same-origin" }).then((res) => {
          if (!res || !res.ok) throw new Error("HTTP " + (res && res.status));
          return res.json();
        }).then((json) => {
          if (!alive) return;
          if (json && json.ok === true) setState({ status: "ready", data: json });
          else setState((prev) => prev.status === "ready" ? prev : { status: "error", data: null });
        }).catch(() => {
          if (alive) setState((prev) => prev.status === "ready" ? prev : { status: "error", data: null });
        });
      } catch (e) {
        if (alive) setState({ status: "error", data: null });
      }
    };
    setState((prev) => prev.status === "ready" ? prev : { status: "loading", data: null });
    load();
    timer = window.setInterval(load, METRICS_INTERVAL);
    return () => {
      alive = false;
      window.clearInterval(timer);
    };
  }, [active]);
  return state;
}
function percent(value) {
  const n = Number(value);
  return Number.isFinite(n) ? Math.max(0, Math.min(100, n)) : null;
}
function formatGB(bytes) {
  const n = Number(bytes);
  if (!Number.isFinite(n) || n <= 0) return "—";
  const gb = n / GB;
  return (gb >= 10 ? gb.toFixed(0) : gb.toFixed(1)) + " GB";
}
function MetricRow(props) {
  const pct = percent(props.value);
  return h3(
    "div",
    { className: "lmui-rail__metric" },
    h3(
      "div",
      { className: "lmui-rail__metricHead" },
      h3("span", { className: "lmui-rail__metricLabel" }, props.label),
      h3(
        "span",
        { className: "lmui-rail__metricValue" },
        pct === null ? "—" : (pct < 10 ? pct.toFixed(1) : Math.round(pct)) + "%"
      )
    ),
    h3(
      "div",
      { className: "lmui-rail__bar", "aria-hidden": "true" },
      h3("span", { className: "lmui-rail__barFill", style: { width: (pct === null ? 0 : pct) + "%" } })
    ),
    props.sub ? h3("div", { className: "lmui-rail__metricSub" }, props.sub) : null
  );
}
function SystemSection(props) {
  const state = props.state;
  let cpu = null;
  let memory = null;
  let disk = null;
  if (state.status === "ready" && state.data) {
    const data = state.data;
    cpu = data.cpu && typeof data.cpu.usage === "number" ? data.cpu.usage : null;
    memory = data.memory && typeof data.memory.usedPercent === "number" ? data.memory : null;
    disk = data.disk && typeof data.disk.usedPercent === "number" ? data.disk : null;
  }
  const loading = state.status === "loading" || state.status === "idle";
  return h3(
    "section",
    { className: "lmui-rail__section" },
    h3("div", { className: "lmui-rail__sectionTitle" }, UI_COPY.railSystem),
    loading && state.status !== "ready" ? h3("div", { className: "lmui-rail__hint" }, "正在读取系统信息…") : state.status === "error" ? h3("div", { className: "lmui-rail__hint" }, "系统信息暂不可用") : h3(
      React3.Fragment,
      null,
      h3(MetricRow, {
        label: "CPU",
        value: cpu,
        sub: state.data && state.data.cpu && state.data.cpu.cores ? state.data.cpu.cores + " 线程" : null
      }),
      h3(MetricRow, {
        label: "内存",
        value: memory ? memory.usedPercent : null,
        sub: memory ? formatGB(memory.totalBytes - memory.freeBytes) + " / " + formatGB(memory.totalBytes) : null
      }),
      h3(MetricRow, {
        label: "磁盘",
        value: disk ? disk.usedPercent : null,
        sub: disk ? formatGB(disk.totalBytes - disk.freeBytes) + " / " + formatGB(disk.totalBytes) : "—"
      })
    )
  );
}
var PAIMON_NAME = { guide: "guide", paimon2: "2", emoji: "emoji" };
var PAIMON_ART_DIR = (() => {
  const url = resolveMedia(MEDIA.art.paimonHoloGuide);
  return url ? url.replace(/[^/]+$/i, "") : "";
})();
function paimonArt(name) {
  return PAIMON_ART_DIR ? PAIMON_ART_DIR + name : "";
}
var PAIMON_HOLO = {
  guide: () => MEDIA.art.paimonHoloGuide,
  paimon2: () => MEDIA.art.paimonHolo2,
  emoji: () => MEDIA.art.paimonHoloEmoji
};
function paimonSources(variant, scheme) {
  const key = PAIMON_HOLO[variant] ? variant : "guide";
  const suffix = PAIMON_NAME[key] || "guide";
  const holoRaw = PAIMON_HOLO[key]();
  const holoUrl = resolveMedia(holoRaw);
  const halfRaw = holoRaw ? holoRaw.replace(/paimon-holo-(guide|2|emoji)\.png$/i, "paimon-half-$1.png") : "";
  const halfUrl = halfRaw && halfRaw !== holoRaw ? resolveMedia(halfRaw) : "";
  const lineBlack = paimonArt("paimon-line-" + suffix + ".png");
  const lineWhiteCandidates = [
    paimonArt("paimon-line-" + suffix + "-white.png"),
    paimonArt("paimon-line-white-" + suffix + ".png"),
    paimonArt("paimon-line-" + suffix + "-w.png")
  ].filter(Boolean);
  const list = [];
  const push = (kind, url) => {
    if (!url) return;
    if (list.some((item) => item.url === url)) return;
    list.push({ kind, url });
  };
  if (scheme === "light") {
    push("line-black", lineBlack);
    lineWhiteCandidates.forEach((url) => push("line-white", url));
  } else {
    lineWhiteCandidates.forEach((url) => push("line-white", url));
    push("line-black", lineBlack);
  }
  push("half", halfUrl);
  push("holo", holoUrl);
  const raw = resolveMedia(MEDIA.art.paimon);
  if (raw) push("raw", raw);
  return list;
}
function PaimonPlaceholder() {
  return h3(
    "svg",
    { className: "lmui-paimon__fallback", viewBox: "0 0 64 64", "aria-hidden": "true", focusable: "false" },
    h3("circle", { cx: "32", cy: "32", r: "10", fill: "currentColor", opacity: "0.85" }),
    h3("path", {
      d: "M32 6 L34.8 28.6 L58 32 L34.8 35.4 L32 58 L29.2 35.4 L6 32 L29.2 28.6 Z",
      fill: "currentColor",
      opacity: "0.5"
    })
  );
}
function PaimonHolo(props) {
  const variant = props.variant || "guide";
  const scheme = useScheme();
  const sources = React3.useMemo(() => paimonSources(variant, scheme), [variant, scheme]);
  const [sourceIndex, setSourceIndex] = React3.useState(0);
  const [loaded, setLoaded] = React3.useState(false);
  const [sourceKind, setSourceKind] = React3.useState("");
  const entry = sources[sourceIndex];
  const src = entry ? entry.url : "";
  const isLine = /paimon-line-/.test(String(src));
  const fx = React3.useMemo(
    () => ({
      scan: (4 + Math.random() * 2).toFixed(2) + "s",
      ghostA: (8 + Math.random() * 6).toFixed(2) + "s",
      ghostB: (8 + Math.random() * 6).toFixed(2) + "s",
      bar: (11 + Math.random() * 5).toFixed(2) + "s"
    }),
    [src]
  );
  const variantLabel = (() => {
    const item = (UI_COPY.paimonVariants || []).find((pair) => pair[0] === variant);
    return item ? item[1] : "派蒙";
  })();
  React3.useEffect(() => {
    setSourceIndex(0);
    setLoaded(false);
    setSourceKind("");
  }, [variant]);
  React3.useEffect(() => {
    setLoaded(false);
    setSourceKind("");
  }, [src]);
  return h3(
    "section",
    { className: "lmui-rail__section lmui-rail__section--paimon" },
    h3(
      "div",
      { className: "lmui-rail__sectionHead" },
      h3("div", { className: "lmui-rail__sectionTitle" }, UI_COPY.railPaimon),
      h3("span", { className: "lmui-rail__sectionMeta" }, variantLabel)
    ),
    h3(
      "div",
      {
        className: "lmui-paimon",
        "data-lmui-paimon": variant,
        "data-lmui-paimon-source": loaded ? sourceKind : "",
        "data-lmui-paimon-line": isLine ? "1" : "0",
        style: Object.assign(
          {},
          isLine ? { "--lmui-paimon-mask": 'url("' + src + '")' } : {},
          src ? {
            "--lmui-paimon-img": 'url("' + src + '")',
            "--lmui-scan-cycle": fx.scan,
            "--lmui-glitch-cycle-a": fx.ghostA,
            "--lmui-glitch-cycle-b": fx.ghostB,
            "--lmui-glitch-bar-cycle": fx.bar
          } : {}
        ),
        "aria-hidden": "true"
      },
      loaded ? null : h3(PaimonPlaceholder, null),
      h3("div", { className: "lmui-paimon__glow" }),
      src ? h3("img", {
        key: src,
        className: "lmui-paimon__img",
        src,
        alt: "",
        draggable: false,
        decoding: "async",
        style: { opacity: loaded ? 1 : 0 },
        onLoad: () => {
          setSourceKind(entry ? entry.kind : "");
          setLoaded(true);
        },
        onError: () => {
          setLoaded(false);
          setSourceKind("");
          setSourceIndex((prev) => prev + 1);
        }
      }) : null,
      src ? h3("span", { className: "lmui-paimon__ghost lmui-paimon__ghost--a", "aria-hidden": "true" }) : null,
      src ? h3("span", { className: "lmui-paimon__ghost lmui-paimon__ghost--b", "aria-hidden": "true" }) : null,
      src ? h3("span", { className: "lmui-paimon__glitchBar", "aria-hidden": "true" }) : null,
      h3("div", { className: "lmui-paimon__scan", "aria-hidden": "true" })
    )
  );
}
var BGM = Array.isArray(MEDIA.bgm) ? MEDIA.bgm : [];
var MUSIC_LOOP_KEY = STORAGE && STORAGE.musicLoop || "light-mirror:music-loop";
var LOOP_MODES = ["list", "single", "shuffle"];
var LOOP_META = {
  list: { glyph: "列", label: "列表循环" },
  single: { glyph: "单", label: "单曲循环" },
  shuffle: { glyph: "随", label: "随机循环" }
};
function readTrackIndex() {
  try {
    const raw = Number(window.localStorage.getItem(STORAGE.musicTrack));
    if (Number.isInteger(raw) && raw >= 0 && raw < BGM.length) return raw;
  } catch (e) {
  }
  return 0;
}
function readLoopMode() {
  try {
    const raw = window.localStorage.getItem(MUSIC_LOOP_KEY);
    if (LOOP_MODES.indexOf(raw) >= 0) return raw;
  } catch (e) {
  }
  return "list";
}
function readVolume() {
  try {
    const raw = Number(window.localStorage.getItem(STORAGE.musicVolume));
    if (Number.isFinite(raw) && raw >= 0 && raw <= 1) return raw;
  } catch (e) {
  }
  return 0.5;
}
function MusicPlayer() {
  const [index, setIndex] = React3.useState(readTrackIndex);
  const [volume, setVolume] = React3.useState(readVolume);
  const [playing, setPlaying] = React3.useState(false);
  const [loopMode, setLoopMode] = React3.useState(readLoopMode);
  const [error, setError] = React3.useState("");
  const [time, setTime] = React3.useState({ current: 0, duration: 0 });
  const audioRef = React3.useRef(null);
  const playingRef = React3.useRef(false);
  const historyRef = React3.useRef([]);
  const autoplayRef = React3.useRef(false);
  React3.useEffect(() => {
    playingRef.current = playing;
  }, [playing]);
  const track = BGM[index] || null;
  React3.useEffect(() => {
    try {
      window.localStorage.setItem(MUSIC_LOOP_KEY, loopMode);
    } catch (e) {
    }
    const audio = audioRef.current;
    if (audio) audio.loop = loopMode === "single";
  }, [loopMode]);
  React3.useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE.musicTrack, String(index));
    } catch (e) {
    }
    const audio = audioRef.current;
    if (!audio) return;
    setTime({ current: 0, duration: 0 });
    try {
      audio.currentTime = 0;
    } catch (e) {
    }
    try {
      audio.volume = volume;
      audio.load();
    } catch (e) {
    }
    if (playingRef.current || autoplayRef.current) {
      autoplayRef.current = false;
      const result = audio.play();
      if (result && typeof result.catch === "function") {
        result.catch(() => {
          setPlaying(false);
          setError("音频素材尚未就绪");
        });
      }
    }
  }, [index]);
  React3.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      audio.volume = volume;
    } catch (e) {
    }
    try {
      window.localStorage.setItem(STORAGE.musicVolume, String(volume));
    } catch (e) {
    }
  }, [volume]);
  if (!track) return h3("div", { className: "lmui-rail__hint" }, UI_COPY.musicEmpty);
  const play = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setError("");
    const result = audio.play();
    if (result && typeof result.then === "function") {
      result.then(
        () => setPlaying(true),
        () => {
          setPlaying(false);
          setError("音频素材尚未就绪");
        }
      );
    } else {
      setPlaying(true);
    }
  };
  const pause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      audio.pause();
    } catch (e) {
    }
    setPlaying(false);
  };
  const toggle = () => playing ? pause() : play();
  const pickShuffle = (current) => {
    if (BGM.length <= 1) return current;
    let next = current;
    let guard = 0;
    while (next === current && guard < 24) {
      next = Math.floor(Math.random() * BGM.length);
      guard += 1;
    }
    return next;
  };
  const step = (delta) => {
    if (BGM.length === 0) return;
    setError("");
    if (loopMode === "shuffle") {
      if (delta < 0 && historyRef.current.length > 0) {
        setIndex(historyRef.current.pop());
        return;
      }
      if (delta > 0) {
        historyRef.current.push(index);
        if (historyRef.current.length > 50) historyRef.current.shift();
        setIndex(pickShuffle(index));
        return;
      }
    }
    setIndex((prev) => (prev + delta + BGM.length) % BGM.length);
  };
  const cycleLoop = () => {
    setLoopMode((prev) => LOOP_MODES[(LOOP_MODES.indexOf(prev) + 1) % LOOP_MODES.length]);
  };
  const handleEnded = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (BGM.length === 0) {
      setPlaying(false);
      return;
    }
    if (loopMode === "single") {
      try {
        audio.currentTime = 0;
      } catch (e) {
      }
      setTime({ current: 0, duration: audio.duration || 0 });
      play();
      return;
    }
    if (BGM.length === 1) {
      try {
        audio.currentTime = 0;
      } catch (e) {
      }
      play();
      return;
    }
    if (loopMode === "shuffle") {
      autoplayRef.current = true;
      historyRef.current.push(index);
      if (historyRef.current.length > 50) historyRef.current.shift();
      setIndex(pickShuffle(index));
      return;
    }
    autoplayRef.current = true;
    setIndex((prev) => (prev + 1) % BGM.length);
  };
  const loopMeta = LOOP_META[loopMode] || LOOP_META.list;
  return h3(
    "div",
    { className: "lmui-music" },
    h3(
      "div",
      { className: "lmui-music__head" },
      h3(
        "div",
        { className: "lmui-music__headLeft" },
        h3("span", { className: "lmui-rail__sectionTitle" }, UI_COPY.railMusic),
        h3("span", { className: "lmui-music__title" }, track.title)
      ),
      h3("span", { className: "lmui-music__count", "data-lmui-loop": loopMode }, index + 1 + " / " + BGM.length + " · " + loopMeta.label)
    ),
    h3(
      "div",
      { className: "lmui-music__scrub" },
      h3("span", { className: "lmui-music__time" }, formatDuration(time.current)),
      h3("input", {
        type: "range",
        className: "lmui-music__progress",
        min: 0,
        max: Math.max(1, Math.round(time.duration || 0)),
        step: 1,
        value: Math.min(Math.round(time.current), Math.round(time.duration || 0)),
        "aria-label": "播放进度",
        disabled: !time.duration,
        onChange: (event) => {
          const audio = audioRef.current;
          if (!audio) return;
          const next = Number(event.target.value) || 0;
          try {
            audio.currentTime = next;
          } catch (e) {
          }
          setTime((prev) => Object.assign({}, prev, { current: next }));
        }
      }),
      h3("span", { className: "lmui-music__time" }, formatDuration(time.duration))
    ),
    h3(
      "div",
      { className: "lmui-music__controls" },
      h3(
        "button",
        { type: "button", className: "lmui-music__btn", "aria-label": "上一首", onClick: () => step(-1) },
        h3(IconPrev, null)
      ),
      h3(
        "button",
        {
          type: "button",
          className: "lmui-music__btn lmui-music__btn--main",
          "aria-label": playing ? "暂停" : "播放",
          onClick: toggle
        },
        playing ? h3(IconPause, null) : h3(IconPlay, null)
      ),
      h3(
        "button",
        { type: "button", className: "lmui-music__btn", "aria-label": "下一首", onClick: () => step(1) },
        h3(IconNext, null)
      ),
      h3(
        "button",
        {
          type: "button",
          className: "lmui-music__btn lmui-music__btn--loop",
          "data-lmui-loop": loopMode,
          title: "循环模式：" + loopMeta.label + "（点击切换）",
          "aria-label": "循环模式：" + loopMeta.label + "，点击切换",
          onClick: cycleLoop
        },
        h3("span", { className: "lmui-music__loopGlyph", "aria-hidden": "true" }, loopMeta.glyph)
      ),
      h3(
        "div",
        { className: "lmui-music__volume" },
        h3("input", {
          type: "range",
          className: "lmui-music__volumeInput",
          min: 0,
          max: 100,
          step: 1,
          value: Math.round(volume * 100),
          "aria-label": "音量",
          onChange: (event) => setVolume(Math.max(0, Math.min(1, (Number(event.target.value) || 0) / 100)))
        })
      )
    ),
    error ? h3("div", { className: "lmui-music__hint" }, error) : null,
    h3("audio", {
      ref: audioRef,
      src: resolveMedia(track.src),
      preload: "none",
      onTimeUpdate: (event) => {
        const audio = event.currentTarget;
        setTime({ current: audio.currentTime || 0, duration: audio.duration || 0 });
      },
      onLoadedMetadata: (event) => {
        const audio = event.currentTarget;
        setTime((prev) => Object.assign({}, prev, { duration: audio.duration || 0 }));
      },
      onEnded: handleEnded,
      onError: () => {
        setPlaying(false);
        setError("音频素材尚未就绪");
      },
      onPlay: () => setPlaying(true),
      onPause: () => setPlaying(false)
    })
  );
}
function RailPanel(props) {
  const cfg = useMirrorConfig(props.store);
  const rail = useRail(props.controller);
  const now = useClock();
  const metrics = useMetrics(rail.open && cfg.rail === true);
  if (cfg.rail !== true) return null;
  const clock = formatClock(now);
  const open = rail.open;
  return h3(
    "div",
    {
      className: "lmui-rail" + (open ? " lmui-rail--open" : ""),
      "data-lmui-rail-panel": "",
      "data-open": open ? "true" : "false",
      "data-mode": rail.docked ? "docked" : "overlay",
      "aria-hidden": open ? void 0 : "true"
    },
    h3(
      "div",
      { className: "lmui-rail__surface", role: "complementary", "aria-label": "观测栏" },
      h3(
        "header",
        { className: "lmui-rail__head" },
        h3(
          "div",
          { className: "lmui-rail__headText" },
          h3("span", { className: "lmui-rail__spark", "aria-hidden": "true" }),
          h3("span", { className: "lmui-rail__title" }, UI_COPY.railTitle),
          h3("span", { className: "lmui-rail__titleEn" }, "OBSERVATION")
        ),
        h3(
          "button",
          {
            type: "button",
            className: "lmui-rail__close",
            "aria-label": "收起观测栏",
            onClick: () => props.controller.setOpen(false)
          },
          h3(IconClose, null)
        )
      ),
      h3(
        "div",
        { className: "lmui-rail__body" },
        h3(
          "section",
          { className: "lmui-rail__section" },
          h3("div", { className: "lmui-rail__sectionTitle" }, UI_COPY.railLink),
          h3(
            "div",
            { className: "lmui-rail__linkRow" },
            h3("span", { className: "lmui-rail__linkDot", "aria-hidden": "true" }),
            h3(
              "div",
              { className: "lmui-rail__linkText" },
              h3("div", { className: "lmui-rail__value" }, "光之镜 · 天空岛链接"),
              h3("div", { className: "lmui-rail__sub" }, "ONLINE")
            )
          )
        ),
        /* 顺序：链接 → 派蒙 → 系统 → 时间 → 回响（派蒙固定在系统上面） */
        cfg.mascot === true ? h3(PaimonHolo, { variant: cfg.paimonVariant }) : null,
        h3(SystemSection, { state: metrics }),
        h3(
          "section",
          { className: "lmui-rail__section" },
          h3("div", { className: "lmui-rail__sectionTitle" }, UI_COPY.railTime),
          h3(
            "div",
            { className: "lmui-rail__clock" },
            h3("div", { className: "lmui-rail__clockDate" }, clock.date),
            h3("div", { className: "lmui-rail__clockTime" }, clock.time)
          )
        ),
        cfg.music === true ? h3("section", { className: "lmui-rail__section lmui-rail__section--music" }, h3(MusicPlayer, null)) : h3(
          "section",
          { className: "lmui-rail__section" },
          h3("div", { className: "lmui-rail__sectionTitle" }, UI_COPY.railMusic),
          h3("div", { className: "lmui-rail__hint" }, UI_COPY.musicEmpty)
        )
      )
    )
  );
}
function RailToggle(props) {
  const cfg = useMirrorConfig(props.store);
  const rail = useRail(props.controller);
  if (cfg.rail !== true) return null;
  const wide = props.wide !== false;
  const onClick = (event) => {
    try {
      if (event && typeof event.preventDefault === "function") event.preventDefault();
      if (event && typeof event.stopPropagation === "function") event.stopPropagation();
    } catch (e) {
    }
    props.controller.toggle();
  };
  return h3(
    "button",
    {
      type: "button",
      className: "lmui-rail-toggle" + (rail.open ? " lmui-rail-toggle--on" : ""),
      "data-lmui-rail-toggle": "",
      "aria-expanded": rail.open,
      "aria-label": "观测栏",
      title: "观测栏",
      onClick
    },
    h3("span", { className: "lmui-rail-toggle__icon", "aria-hidden": "true" }, h3(IconEye, null)),
    wide ? h3("span", { className: "lmui-rail-toggle__label" }, UI_COPY.railTitle) : null
  );
}
function registerRail(ctx, store, keep) {
  if (!ctx || !ctx.slots) return;
  const slots = ctx.slots;
  const remember = typeof keep === "function" ? keep : () => {
  };
  const controller = createRailController(store);
  remember(() => controller.dispose());
  const put = (slotName, options, Component, extraProps) => {
    if (typeof slots.inject !== "function" || typeof slots.register !== "function") return;
    const Bound = (props) => h3(Component, Object.assign({}, props, extraProps || {}));
    Bound.displayName = "LMUI(" + (Component.name || "Rail") + ")";
    try {
      const off = slots.inject(slotName, () => slots.register(options, Bound));
      if (typeof off === "function") remember(off);
    } catch (e) {
    }
  };
  put(
    "sidebar.footer.action",
    { name: "sidebar.footer.action", id: "light-mirror-observation", order: 30 },
    RailToggle,
    { store, controller }
  );
  put(
    "shell.overlay",
    { name: "shell.overlay", id: "light-mirror-rail", order: 40 },
    RailPanel,
    { store, controller }
  );
}

// src/client/settings.js
var ReactNS4 = __toESM(require("react"), 1);
var React4 = ReactNS4 && typeof ReactNS4.createElement === "function" ? ReactNS4 : ReactNS4 && ReactNS4.default && typeof ReactNS4.default.createElement === "function" ? ReactNS4.default : ReactNS4;
var h4 = React4.createElement;
var CONFIG_ROUTE = "/light-mirror/config";
var SPLASH_SCRIPT = "/light-mirror/splash.js";
var CONFIG_DISPLAY = "~/.dsh/light-mirror.json";
function configUrl() {
  try {
    const injected = window.__LIGHT_MIRROR_CONFIG_URL__;
    if (typeof injected === "string" && injected) return injected;
  } catch (e) {
  }
  return CONFIG_ROUTE;
}
function normalizeConfig(input) {
  const out = Object.assign({}, DEFAULTS);
  const src = input && typeof input === "object" ? input : {};
  for (const key of Object.keys(DEFAULTS)) {
    if (!(key in src) || src[key] === void 0 || src[key] === null) continue;
    const value = src[key];
    if (BOOL_KEYS.indexOf(key) >= 0) {
      out[key] = value === true || value === "true" || value === 1 || value === "1";
    } else if (ENUMS[key]) {
      const aliased = ENUM_ALIASES && ENUM_ALIASES[key] ? ENUM_ALIASES[key][value] : void 0;
      const candidate = aliased !== void 0 ? aliased : value;
      out[key] = ENUMS[key].indexOf(candidate) >= 0 ? candidate : DEFAULTS[key];
    } else if (RANGES[key]) {
      const range = RANGES[key];
      const n = Number(value);
      out[key] = Number.isFinite(n) ? Math.min(range[1], Math.max(range[0], n)) : DEFAULTS[key];
    } else {
      out[key] = value;
    }
  }
  out.heroTitle = normalizeHeroTitle(src.heroTitle);
  out.thinkingLabel = normalizeThinkingLabel(src.thinkingLabel);
  return out;
}
function httpError(res) {
  return new Error("HTTP " + (res && res.status ? res.status : "?"));
}
function readConfig() {
  return fetch(configUrl(), {
    headers: { Accept: "application/json" },
    cache: "no-store",
    credentials: "same-origin"
  }).then((res) => {
    if (!res || !res.ok) throw httpError(res);
    return res.json();
  }).then((json) => {
    if (!json || json.ok !== true || !json.config) throw new Error(json && json.error || "读取配置失败");
    return {
      config: normalizeConfig(json.config),
      defaults: normalizeConfig(json.defaults || DEFAULTS),
      file: typeof json.file === "string" ? json.file : "",
      version: json.version ? String(json.version) : VERSION
    };
  });
}
function postConfig(payload) {
  return fetch(configUrl(), {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    credentials: "same-origin",
    body: JSON.stringify(payload)
  }).then((res) => {
    if (!res || !res.ok) throw httpError(res);
    return res.json();
  }).then((json) => {
    if (!json || json.ok !== true || !json.config) throw new Error(json && json.error || "保存失败");
    return normalizeConfig(json.config);
  });
}
var splashLoadPromise = null;
function ensureSplashScript() {
  try {
    const api = window.__LIGHT_MIRROR_SPLASH__;
    if (api && typeof api.replay === "function") return Promise.resolve(true);
  } catch (e) {
  }
  if (splashLoadPromise) return splashLoadPromise;
  splashLoadPromise = new Promise((resolve2, reject) => {
    let settled = false;
    const finish = (err) => {
      if (settled) return;
      settled = true;
      if (err) {
        splashLoadPromise = null;
        reject(err);
      } else {
        resolve2(true);
      }
    };
    try {
      const script = document.createElement("script");
      script.src = SPLASH_SCRIPT + "?v=" + encodeURIComponent(VERSION) + "&t=" + Date.now();
      script.async = true;
      script.dataset.lmuiSplashLoader = "1";
      script.onload = () => {
        try {
          const api = window.__LIGHT_MIRROR_SPLASH__;
          if (api && typeof api.replay === "function") finish(null);
          else finish(new Error("启动动画运行时未提供 replay()"));
        } catch (e) {
          finish(e);
        }
      };
      script.onerror = () => finish(new Error("启动动画脚本加载失败，请刷新页面后重试"));
      (document.head || document.documentElement).appendChild(script);
      window.setTimeout(() => {
        try {
          const api = window.__LIGHT_MIRROR_SPLASH__;
          if (!api || typeof api.replay !== "function") finish(new Error("启动动画脚本超时，请刷新页面后重试"));
        } catch (e) {
          finish(e);
        }
      }, 12e3);
    } catch (e) {
      finish(e);
    }
  });
  return splashLoadPromise;
}
function replaySplash(cfg) {
  const config = cfg && typeof cfg === "object" ? cfg : {};
  try {
    window.__LIGHT_MIRROR__ = config;
    if (!window.__LIGHT_MIRROR_CONFIG_URL__) window.__LIGHT_MIRROR_CONFIG_URL__ = configUrl();
  } catch (e) {
  }
  const api = (() => {
    try {
      return window.__LIGHT_MIRROR_SPLASH__;
    } catch (e) {
      return null;
    }
  })();
  if (api && typeof api.replay === "function") {
    try {
      const ret = api.replay(config);
      return Promise.resolve(ret).then(() => true);
    } catch (e) {
      return Promise.reject(e);
    }
  }
  return ensureSplashScript().then(() => {
    const loaded = window.__LIGHT_MIRROR_SPLASH__;
    if (!loaded || typeof loaded.replay !== "function") throw new Error("启动动画运行时不可用");
    const ret = loaded.replay(config);
    return Promise.resolve(ret).then(() => true);
  });
}
function Row(props) {
  return h4(
    "div",
    { className: "lmui-row" },
    h4(
      "div",
      { className: "lmui-field" },
      h4("div", { className: "lmui-field__text" }, props.label),
      props.hint ? h4("div", { className: "lmui-field__hint" }, props.hint) : null
    ),
    h4("div", { className: "lmui-field__control" }, props.children)
  );
}
function Group(props) {
  return h4(
    "section",
    { className: "lmui-group" },
    h4("h3", { className: "lmui-group__title" }, props.title),
    props.description ? h4("p", { className: "lmui-group__desc" }, props.description) : null,
    props.children
  );
}
function ToggleRow(props) {
  return h4(
    Row,
    { label: props.label, hint: props.hint },
    h4("input", {
      type: "checkbox",
      className: "lmui-check",
      checked: props.checked === true,
      disabled: props.disabled === true,
      "aria-label": props.label,
      onChange: (event) => props.onChange(event.target.checked)
    })
  );
}
function SelectRow(props) {
  return h4(
    Row,
    { label: props.label, hint: props.hint },
    h4(
      "select",
      {
        className: "lmui-select",
        value: props.value,
        disabled: props.disabled === true,
        "aria-label": props.label,
        onChange: (event) => props.onChange(event.target.value)
      },
      props.options.map((opt) => h4("option", { key: opt[0], value: opt[0] }, opt[1]))
    )
  );
}
function TextRow(props) {
  return h4(
    Row,
    { label: props.label, hint: props.hint },
    h4(
      "div",
      { className: "lmui-textWrap" },
      h4("input", {
        type: "text",
        className: "lmui-text",
        value: props.value === void 0 || props.value === null ? "" : String(props.value),
        placeholder: props.placeholder || "",
        maxLength: props.maxLength || 40,
        "aria-label": props.label,
        onChange: (event) => props.onChange(event.target.value)
      }),
      props.onReset ? h4(
        "button",
        { type: "button", className: "lmui-text__reset", onClick: props.onReset },
        props.resetLabel || "恢复原文"
      ) : null
    )
  );
}
function RangeRow(props) {
  const min = Number(props.min);
  const max = Number(props.max);
  const value = Number(props.value);
  const span = Number.isFinite(max - min) && max > min ? max - min : 1;
  const fill = Math.max(0, Math.min(1, (Number.isFinite(value) ? value : min) - min) / span);
  return h4(
    Row,
    { label: props.label, hint: props.hint },
    h4(
      "div",
      { className: "lmui-range" },
      h4("input", {
        type: "range",
        className: "lmui-range__input",
        min: props.min,
        max: props.max,
        step: props.step || 0.05,
        value: props.value,
        disabled: props.disabled === true,
        "aria-label": props.label,
        style: { "--lmui-fill": (fill * 100).toFixed(2) + "%" },
        onChange: (event) => props.onChange(Number(event.target.value))
      }),
      h4("span", { className: "lmui-range__value" }, props.display)
    )
  );
}
var UI_MODE_OPTIONS = [
  ["auto", "跟随系统"],
  ["terminal", "终端（深色）"],
  ["temple", "神殿（浅色）"]
];
var SPLASH_MODE_OPTIONS = [
  ["session", "每次浏览器会话一次（默认）"],
  ["daily", "每天一次"],
  ["every", "每次刷新都播放"]
];
var BRAND_MARK_OPTIONS = Array.isArray(UI_COPY.brandMarks) && UI_COPY.brandMarks.length ? UI_COPY.brandMarks : [
  ["phanes", "法涅斯徽记"],
  ["terminal", "光之镜终端"],
  ["skyisland", "天空岛"],
  ["paimonEmoji", "派蒙表情"],
  ["paimonAvatar", "派蒙头像"]
];
var PAIMON_VARIANT_OPTIONS = Array.isArray(UI_COPY.paimonVariants) && UI_COPY.paimonVariants.length ? UI_COPY.paimonVariants : [
  ["guide", "派蒙 · 半身"],
  ["paimon2", "派蒙 · 立绘"],
  ["emoji", "派蒙 · 表情"]
];
function percent2(value) {
  const n = Number(value);
  return Math.round((Number.isFinite(n) ? n : 0) * 100) + "%";
}
function messageOf(error) {
  return String(error && error.message || error || "未知错误");
}
function MirrorSettings(props) {
  const onLive = typeof props.onLive === "function" ? props.onLive : () => {
  };
  const [draft, setDraft] = React4.useState(null);
  const [saved, setSaved] = React4.useState(null);
  const [file, setFile] = React4.useState("");
  const [version, setVersion] = React4.useState(VERSION);
  const [notice, setNotice] = React4.useState("");
  const [error, setError] = React4.useState("");
  const [busy, setBusy] = React4.useState(false);
  const load = React4.useCallback(() => {
    setError("");
    return readConfig().then((result) => {
      setDraft(result.config);
      setSaved(result.config);
      setFile(result.file || "");
      setVersion(result.version || VERSION);
      onLive(result.config);
      return result;
    }).catch((err) => {
      setError("读取配置失败：" + messageOf(err));
    });
  }, []);
  React4.useEffect(() => {
    load();
  }, [load]);
  const commit = (patch) => {
    if (!draft) return;
    if (patch && Object.prototype.hasOwnProperty.call(patch, "heroTitle")) {
      writeStoredHeroTitle(patch.heroTitle);
    }
    if (patch && Object.prototype.hasOwnProperty.call(patch, "thinkingLabel")) {
      writeStoredThinkingLabel(patch.thinkingLabel);
    }
    const next = normalizeConfig(Object.assign({}, draft, patch));
    setDraft(next);
    setNotice("");
    setError("");
    onLive(next);
  };
  const save = () => {
    if (!draft || busy) return;
    if (typeof draft.heroTitle === "string") writeStoredHeroTitle(draft.heroTitle);
    if (typeof draft.thinkingLabel === "string") writeStoredThinkingLabel(draft.thinkingLabel);
    setBusy(true);
    setNotice("");
    setError("");
    postConfig({ patch: draft }).then((next) => {
      setDraft(next);
      setSaved(next);
      onLive(next);
      setNotice(UI_COPY.saved);
    }).catch((err) => setError("保存失败：" + messageOf(err))).then(() => setBusy(false));
  };
  const reset = () => {
    if (busy) return;
    writeStoredHeroTitle(null);
    writeStoredThinkingLabel(null);
    setBusy(true);
    setNotice("");
    setError("");
    postConfig({ action: "reset" }).then((next) => {
      setDraft(next);
      setSaved(next);
      onLive(next);
      setNotice(UI_COPY.resetDone);
    }).catch((err) => setError("恢复默认失败：" + messageOf(err))).then(() => setBusy(false));
  };
  const preview = () => {
    if (busy) return;
    setBusy(true);
    setNotice("");
    setError("");
    readConfig().then((result) => {
      setDraft(result.config);
      setSaved(result.config);
      onLive(result.config);
      return replaySplash(result.config);
    }).then(() => setNotice("正在播放启动动画预览。")).catch((err) => setError("预览失败：" + messageOf(err))).then(() => setBusy(false));
  };
  const versionLine = h4(
    "div",
    { className: "lmui-foot__line" },
    UI_COPY.versionPrefix + (version || VERSION) + " · 配置：" + CONFIG_DISPLAY
  );
  if (!draft) {
    return h4(
      "div",
      { className: "lmui-settings" },
      versionLine,
      h4("div", { className: "lmui-status" }, error || "正在读取配置…"),
      error ? h4(
        "div",
        { className: "lmui-actions" },
        h4("button", { type: "button", className: "lmui-btn", onClick: load }, "重试")
      ) : null
    );
  }
  const dirty = saved ? JSON.stringify(saved) !== JSON.stringify(draft) : false;
  return h4(
    "div",
    { className: "lmui-settings", "data-lmui-settings": "" },
    h4(
      "header",
      { className: "lmui-settings__head" },
      h4("h2", { className: "lmui-settings__title" }, UI_COPY.settingsTitle),
      h4("p", { className: "lmui-settings__desc" }, UI_COPY.settingsHint)
    ),
    /* ── 主界面 ── */
    h4(
      Group,
      { title: "主界面" },
      h4(ToggleRow, {
        label: "启用主界面主题",
        hint: "关闭后主题令牌、装饰、观测栏与品牌插槽全部撤销，立即恢复 DSH 原样。",
        checked: draft.enabled,
        onChange: (v) => commit({ enabled: v })
      }),
      h4(SelectRow, {
        label: "界面模式",
        hint: "终端=低饱和深色（默认）；神殿=灰白石浅色；跟随系统时按 DSH 当前配色切换。",
        value: draft.uiMode,
        options: UI_MODE_OPTIONS,
        onChange: (v) => commit({ uiMode: v })
      }),
      h4(TextRow, {
        label: "空会话标题",
        hint: "新会话页大标题，默认「封锁已至之境」；清空或用「恢复原文」则显示宿主原文「探索未至之境」。",
        value: draft.heroTitle,
        placeholder: HERO_TITLE_DEFAULT,
        maxLength: 40,
        onChange: (v) => commit({ heroTitle: v }),
        onReset: () => commit({ heroTitle: "" }),
        resetLabel: "恢复原文"
      }),
      h4(TextRow, {
        label: "思考状态文案",
        hint: "把「深度求索中」替换为自定义前缀（如「黑玛门尼解算中」）；「用时 n 秒…」保持不变。",
        value: draft.thinkingLabel,
        placeholder: THINKING_DEFAULT,
        maxLength: 30,
        onChange: (v) => commit({ thinkingLabel: v }),
        onReset: () => commit({ thinkingLabel: THINKING_DEFAULT }),
        resetLabel: "恢复默认"
      }),
      h4(SelectRow, {
        label: "品牌图案",
        hint: "侧栏与空会话 Hero 使用的图案；法涅斯徽记默认含左右翅膀，浅色模式自动用淡金版。",
        value: draft.brandMark,
        options: BRAND_MARK_OPTIONS,
        onChange: (v) => commit({ brandMark: v })
      }),
      h4(ToggleRow, {
        label: "右侧观测栏",
        hint: "侧栏页脚出现「观测」按钮；展开时在宿主布局里真实增加第三列（不覆盖正文）。开合状态会记住。",
        checked: draft.rail,
        onChange: (v) => commit({ rail: v })
      }),
      h4(ToggleRow, {
        label: "观测栏音乐",
        hint: "在观测栏里显示「回响」播放器（默认不自动播放）。",
        checked: draft.music,
        disabled: draft.rail !== true,
        onChange: (v) => commit({ music: v })
      }),
      h4(ToggleRow, {
        label: "派蒙全息立绘",
        hint: "观测栏内的半身全息立绘（扫描线 + 柔光 + 慢浮动）；素材缺失时显示星光占位。",
        checked: draft.mascot,
        disabled: draft.rail !== true,
        onChange: (v) => commit({ mascot: v })
      }),
      h4(SelectRow, {
        label: "派蒙形象",
        hint: "三档全息形象：半身 / 立绘 / 表情。",
        value: draft.paimonVariant,
        options: PAIMON_VARIANT_OPTIONS,
        disabled: draft.rail !== true || draft.mascot !== true,
        onChange: (v) => commit({ paimonVariant: v })
      }),
      h4(ToggleRow, {
        label: "图片背景",
        hint: "终端模式=倒计时终端场景（与启动动画解离露出层同源）；神殿模式=终端远景。",
        checked: draft.bgEnabled,
        onChange: (v) => commit({ bgEnabled: v })
      }),
      h4(RangeRow, {
        label: "背景不透明度",
        min: 0,
        max: 1,
        step: 0.05,
        value: draft.bgOpacity,
        display: percent2(draft.bgOpacity),
        disabled: draft.bgEnabled !== true,
        onChange: (v) => commit({ bgOpacity: v })
      }),
      h4(ToggleRow, {
        label: "背景动态",
        hint: "渐变、光晕、数据流与星点的缓慢运动（reduced-motion 时自动静止）。",
        checked: draft.bgMotion,
        disabled: draft.bgEnabled !== true,
        onChange: (v) => commit({ bgMotion: v })
      }),
      h4(ToggleRow, {
        label: "星尘",
        hint: "上下边缘少量五光白星点，不落在正文上。",
        checked: draft.stardust,
        onChange: (v) => commit({ stardust: v })
      }),
      h4(ToggleRow, {
        label: "右下角状态字",
        hint: "极简的两行「光之镜 / SKY ISLAND · ONLINE」。",
        checked: draft.statusLine,
        onChange: (v) => commit({ statusLine: v })
      }),
      h4(ToggleRow, {
        label: "窗口细框",
        hint: "窗口四角极淡的五光白细线框。",
        checked: draft.frame,
        onChange: (v) => commit({ frame: v })
      })
    ),
    /* ── 启动动画 ── */
    h4(
      Group,
      { title: "启动动画", description: UI_COPY.splashNote },
      h4(ToggleRow, {
        label: "启用启动动画",
        hint: "关闭后页面加载直接进入主界面。",
        checked: draft.splashEnabled,
        onChange: (v) => commit({ splashEnabled: v })
      }),
      h4(SelectRow, {
        label: "播放时机",
        hint: "每次打开 DSH 时播放一次；同一标签页内刷新不会重复播放。",
        value: draft.splashMode,
        options: SPLASH_MODE_OPTIONS,
        onChange: (v) => commit({ splashMode: v })
      }),
      h4(ToggleRow, {
        label: "语音",
        hint: "播放 PV 原声台词；素材缺失时用系统语音兜底。",
        checked: draft.voice,
        onChange: (v) => commit({ voice: v })
      }),
      h4(RangeRow, {
        label: "语音音量",
        min: 0,
        max: 1,
        step: 0.05,
        value: draft.voiceVolume,
        display: percent2(draft.voiceVolume),
        disabled: draft.voice !== true,
        onChange: (v) => commit({ voiceVolume: v })
      }),
      h4(ToggleRow, {
        label: "界面音效",
        hint: "低鸣、刻度与镜面玻璃声（WebAudio 合成）。",
        checked: draft.sfx,
        onChange: (v) => commit({ sfx: v })
      }),
      h4(RangeRow, {
        label: "音效音量",
        min: 0,
        max: 1,
        step: 0.05,
        value: draft.sfxVolume,
        display: percent2(draft.sfxVolume),
        disabled: draft.sfx !== true,
        onChange: (v) => commit({ sfxVolume: v })
      }),
      h4(
        Row,
        {
          label: "立即预览",
          hint: "重新读取已保存的配置并播放一次启动动画；不会改动当前主界面。"
        },
        h4(
          "button",
          { type: "button", className: "lmui-btn", disabled: busy, onClick: preview },
          UI_COPY.preview
        )
      )
    ),
    /* ── 操作 ── */
    h4(
      "div",
      { className: "lmui-actions" },
      h4(
        "button",
        { type: "button", className: "lmui-btn lmui-btn--primary", disabled: busy, onClick: save },
        busy ? "处理中…" : UI_COPY.save
      ),
      h4("button", { type: "button", className: "lmui-btn", disabled: busy, onClick: reset }, UI_COPY.reset),
      dirty ? h4("span", { className: "lmui-status" }, "有未保存的修改") : null,
      notice ? h4("span", { className: "lmui-status lmui-status--ok" }, notice) : null,
      error ? h4("span", { className: "lmui-status lmui-status--err" }, error) : null
    ),
    /* ── 底部信息 ── */
    h4(
      "footer",
      { className: "lmui-foot" },
      versionLine,
      file && file !== CONFIG_DISPLAY && (file.indexOf("\\") >= 0 || file.indexOf("/") >= 0) ? h4("div", { className: "lmui-foot__line lmui-foot__line--mono", title: file }, "实际文件：" + file) : null,
      h4(
        "div",
        { className: "lmui-foot__line" },
        "素材声明：PV 画面与音乐版权归原权利方，本插件仅作个人、非商业的界面与启动动画使用。"
      )
    )
  );
}
function registerSettings(ctx, options) {
  if (!ctx || !ctx.slots) return null;
  const slots = ctx.slots;
  if (typeof slots.inject !== "function" || typeof slots.register !== "function") return null;
  const opts = options || {};
  const Bound = (props) => h4(MirrorSettings, Object.assign({}, props, { store: opts.store, onLive: opts.onLive }));
  Bound.displayName = "LMUI(Settings)";
  try {
    const off = slots.inject(
      "settings.section",
      () => slots.register(
        {
          name: "settings.section",
          id: "light-mirror",
          order: 27,
          label: UI_COPY.settingsTitle
        },
        Bound
      )
    );
    return typeof off === "function" ? off : null;
  } catch (e) {
    return null;
  }
}

// src/client/bg.js
var LAYER_CLASS = "lmui-bg";
var MEASURED_COLUMNS = [
  { width: 7, amp: 0.74, warm: true },
  { width: 8, amp: 0.38, warm: true },
  { width: 7, amp: 0.3, warm: false },
  { width: 7, amp: 0.62, warm: false },
  { width: 8, amp: 0.72, warm: false },
  { width: 14, amp: 1, warm: false }
];
var DOT_BAND_X = [246, 477, 1378, 1563, 1720, 1773];
var DOT_SPACING_1080 = 6.6;
var DOT_LONG = 42;
var DOT_SHORT = 22;
var LIGHT_MIN_S = 3;
var LIGHT_MAX_S = 5;
var LIGHT_COUNT_MIN = 6;
var LIGHT_COUNT_MAX = 12;
var DOT_COUNT_MIN = 3;
var DOT_COUNT_MAX = 5;
var SPARSE_STAR_COUNT = 56;
function clamp(value, fallback) {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(0, Math.min(1, n));
}
function rand(min, max) {
  return min + Math.random() * (max - min);
}
function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}
function preload(url) {
  return new Promise((resolve2) => {
    if (!url) {
      resolve2(false);
      return;
    }
    try {
      const img = new Image();
      img.onload = () => resolve2(true);
      img.onerror = () => resolve2(false);
      img.decoding = "async";
      img.src = url;
    } catch (e) {
      resolve2(false);
    }
  });
}
function pureDarkUrl() {
  const base = resolveMedia(MEDIA.photo.bgDark);
  if (!base) return "";
  return base.replace(/bg-dark\.webp$/i, "bg-dark-pure.webp");
}
function cleanLightUrl() {
  const base = resolveMedia(MEDIA.photo.bgLight);
  if (!base) return "";
  return base.replace(/bg-light\.webp$/i, "bg-light-clean.webp");
}
function createLayer() {
  const el = document.createElement("div");
  el.className = LAYER_CLASS;
  el.setAttribute("data-lmui-bg-layer", "");
  el.setAttribute("aria-hidden", "true");
  el.innerHTML = '<div class="lmui-bg__photo"></div><div class="lmui-bg__veil"></div><canvas class="lmui-bg__canvas" aria-hidden="true"></canvas>';
  return el;
}
function createFx(layer) {
  const canvas = layer ? layer.querySelector(".lmui-bg__canvas") : null;
  if (!canvas || typeof canvas.getContext !== "function") {
    return { setMode() {
    }, stop() {
    }, debug: () => null };
  }
  const ctx = canvas.getContext("2d");
  if (!ctx) return { setMode() {
  }, stop() {
  }, debug: () => null };
  let vw = 0;
  let vh = 0;
  let dpr = 1;
  let running = false;
  let raf = 0;
  let last = 0;
  let elapsed = 0;
  const lights = [];
  const dotBands = [];
  const stars = [];
  function pxPer1080(value) {
    return value * vh / 1080;
  }
  function warmColor(alpha, warm) {
    if (warm) return "rgba(255, 236, 214, " + alpha.toFixed(3) + ")";
    return "rgba(206, 224, 246, " + alpha.toFixed(3) + ")";
  }
  function smooth(x) {
    const t = Math.max(0, Math.min(1, x));
    return t * t * (3 - 2 * t);
  }
  function lifeAlpha(p) {
    if (p.age <= 0 || p.age >= p.life) return 0;
    const inT = smooth(p.age / p.fadeIn);
    const outT = smooth((p.life - p.age) / p.fadeOut);
    return Math.min(inT, outT);
  }
  function spawnLight(initial) {
    const ref = pick(MEASURED_COLUMNS);
    const life = rand(LIGHT_MIN_S, LIGHT_MAX_S);
    const fadeIn = rand(0.6, 0.95);
    const fadeOut = rand(1, 1.5);
    const lengthVh = rand(0.14, 0.45);
    const length = vh * lengthVh;
    const x = vw * rand(0.03, 0.97);
    const width = Math.max(1.5, pxPer1080(ref.width * rand(0.85, 1.35)));
    const amp = Math.max(0.3, Math.min(1.32, ref.amp * rand(0.75, 1.25)));
    const chromaStrong = Math.random() < 0.5;
    const chroma = chromaStrong ? rand(1.8, 3) : rand(0.5, 1.2);
    const chromaSign = Math.random() < 0.5 ? -1 : 1;
    const blurMul = rand(2, 3.5);
    const spawnY = vh * rand(0.55, 1.15);
    const maxRise = Math.max(0, spawnY - length / 2 - vh * 0.08);
    const speed = maxRise / life * rand(0.65, 1);
    return {
      type: "light",
      x,
      y: spawnY,
      spawnY,
      length,
      width,
      amp,
      warm: x / vw < 0.38,
      chroma,
      chromaSign,
      blurMul,
      life,
      age: initial ? rand(0.15, 0.65) * life : 0,
      fadeIn,
      fadeOut,
      speed
    };
  }
  function spawnDotBand(initial) {
    const count = Math.random() < 0.5 ? DOT_LONG : DOT_SHORT;
    const life = rand(LIGHT_MIN_S, LIGHT_MAX_S);
    const spacing = Math.max(4, Math.min(9, pxPer1080(DOT_SPACING_1080)));
    const length = count * spacing;
    const x = pick(DOT_BAND_X) / 1920 * vw + rand(-6, 6);
    const width = Math.max(1, pxPer1080(rand(1, 2.5)));
    const amp = rand(0.26, 0.58);
    const spawnY = vh * rand(0.55, 1.15);
    const maxRise = Math.max(0, spawnY - length / 2 - vh * 0.06);
    const speed = maxRise / life * rand(0.6, 1);
    return {
      type: "dots",
      x,
      y: spawnY,
      count,
      spacing,
      length,
      width,
      amp,
      life,
      age: initial ? rand(0.15, 0.65) * life : 0,
      fadeIn: rand(0.6, 0.95),
      fadeOut: rand(1, 1.5),
      speed
    };
  }
  function spawnStar() {
    const r = Math.random();
    stars.push({
      x: Math.random() * vw,
      y: Math.random() * vh,
      size: r < 0.7 ? rand(1, 2.8) : rand(2.8, 5),
      speed: rand(2, 8),
      twinkle: rand(0.7, 2.5),
      phase: Math.random() * Math.PI * 2,
      warm: Math.random() < 0.3
    });
  }
  function refill(initial) {
    while (lights.length < Math.round(rand(LIGHT_COUNT_MIN, LIGHT_COUNT_MAX))) lights.push(spawnLight(initial));
    while (dotBands.length < Math.round(rand(DOT_COUNT_MIN, DOT_COUNT_MAX))) dotBands.push(spawnDotBand(initial));
    while (stars.length < SPARSE_STAR_COUNT) spawnStar();
  }
  function resize() {
    vw = window.innerWidth || 1600;
    vh = window.innerHeight || 1e3;
    dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.max(1, Math.round(vw * dpr));
    canvas.height = Math.max(1, Math.round(vh * dpr));
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    lights.length = 0;
    dotBands.length = 0;
    stars.length = 0;
    refill(true);
  }
  function paintBand(p, alpha) {
    const warm = p.warm;
    const y0 = p.y - p.length / 2;
    const core = p.width;
    const soft = p.width * p.blurMul;
    const passes = [
      { dx: -p.chroma * p.chromaSign, w: soft * 1.05, color: "rgba(255, 74, 74, " + (alpha * 0.42).toFixed(3) + ")" },
      { dx: p.chroma * p.chromaSign, w: soft * 1.05, color: "rgba(86, 128, 255, " + (alpha * 0.42).toFixed(3) + ")" }
    ];
    for (let i = 0; i < passes.length; i += 1) {
      const pass = passes[i];
      const x0 = p.x + pass.dx;
      const g = ctx.createLinearGradient(x0 - pass.w / 2, 0, x0 + pass.w / 2, 0);
      g.addColorStop(0, "rgba(0,0,0,0)");
      g.addColorStop(0.32, pass.color);
      g.addColorStop(0.5, pass.color);
      g.addColorStop(0.68, pass.color);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(x0 - pass.w / 2, y0, pass.w, p.length);
    }
    const g2 = ctx.createLinearGradient(p.x - soft / 2, 0, p.x + soft / 2, 0);
    g2.addColorStop(0, "rgba(0,0,0,0)");
    g2.addColorStop(0.3, warmColor(alpha * 0.32, warm));
    g2.addColorStop(0.5, warmColor(alpha, warm));
    g2.addColorStop(0.7, warmColor(alpha * 0.32, warm));
    g2.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g2;
    ctx.fillRect(p.x - soft / 2, y0, soft, p.length);
    ctx.fillStyle = warmColor(alpha * 0.85, warm);
    ctx.fillRect(p.x - core / 2, y0, core, p.length);
  }
  function draw(animate) {
    ctx.clearRect(0, 0, vw, vh);
    ctx.globalCompositeOperation = "lighter";
    const fadeH = vh * 0.16;
    for (let i = 0; i < lights.length; i += 1) {
      const p = lights[i];
      const env = lifeAlpha(p);
      if (env <= 0) continue;
      paintBand(p, p.amp * 0.34 * env);
    }
    for (let i = 0; i < dotBands.length; i += 1) {
      const p = dotBands[i];
      const env = lifeAlpha(p);
      if (env <= 0) continue;
      const alpha = p.amp * env * 0.9;
      const size = Math.max(1, p.width);
      const top = p.y - p.length / 2;
      for (let d = 0; d < p.count; d += 1) {
        const yy = top + d * p.spacing;
        if (yy < -size || yy > vh + size) continue;
        ctx.fillStyle = warmColor(alpha, false);
        ctx.fillRect(p.x - size / 2, yy, size, size);
      }
    }
    for (let i = 0; i < stars.length; i += 1) {
      const s = stars[i];
      if (animate) {
        s.y -= s.speed / 60;
        if (s.y < -4) {
          s.y = vh + Math.random() * 40;
          s.x = Math.random() * vw;
        }
      }
      const fade = s.y < fadeH ? Math.max(0, s.y / fadeH) : 1;
      if (fade <= 0) continue;
      const tw = animate ? 0.55 + 0.4 * Math.sin(elapsed * s.twinkle + s.phase) : 0.7;
      const alpha = Math.max(0.06, Math.min(0.95, tw)) * fade * 0.8;
      ctx.fillStyle = warmColor(alpha, s.warm);
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalCompositeOperation = "source-over";
  }
  function update(dt) {
    for (let i = lights.length - 1; i >= 0; i -= 1) {
      lights[i].age += dt;
      lights[i].y -= lights[i].speed * dt;
      if (lights[i].age >= lights[i].life) lights.splice(i, 1);
    }
    for (let i = dotBands.length - 1; i >= 0; i -= 1) {
      dotBands[i].age += dt;
      dotBands[i].y -= dotBands[i].speed * dt;
      if (dotBands[i].age >= dotBands[i].life) dotBands.splice(i, 1);
    }
    while (lights.length < LIGHT_COUNT_MIN) lights.push(spawnLight(false));
    while (lights.length > LIGHT_COUNT_MAX) lights.pop();
    while (dotBands.length < DOT_COUNT_MIN) dotBands.push(spawnDotBand(false));
    while (dotBands.length > DOT_COUNT_MAX) dotBands.pop();
  }
  function frame(now) {
    if (!running) return;
    if (!last) last = now;
    const dt = Math.min(50, now - last) / 1e3;
    last = now;
    elapsed += dt;
    update(dt);
    draw(true);
    raf = window.requestAnimationFrame(frame);
  }
  function start() {
    if (running) return;
    running = true;
    last = 0;
    if (!vw) resize();
    raf = window.requestAnimationFrame(frame);
  }
  function stop() {
    running = false;
    if (raf) window.cancelAnimationFrame(raf);
    raf = 0;
    last = 0;
  }
  function setMode(active, motion) {
    resize();
    if (!active) {
      stop();
      ctx.clearRect(0, 0, vw, vh);
      return;
    }
    if (motion) start();
    else {
      stop();
      elapsed = 0;
      draw(false);
    }
  }
  const onResize = () => {
    resize();
    if (!running) draw(false);
  };
  window.addEventListener("resize", onResize, { passive: true });
  resize();
  setMode(false, false);
  return {
    setMode,
    stop() {
      stop();
      window.removeEventListener("resize", onResize);
    },
    debug() {
      const lightLengths = lights.map((p) => Number((p.length / vh).toFixed(3)));
      const dotCounts = dotBands.map((p) => p.count);
      const chromas = lights.map((p) => Number(p.chroma.toFixed(2)));
      const blurMuls = lights.map((p) => Number(p.blurMul.toFixed(2)));
      return {
        canvas: true,
        running,
        width: vw,
        height: vh,
        dpr,
        bands: lights.length,
        staticBands: 0,
        flowingBands: lights.length,
        dotBands: dotBands.length,
        dots: dotCounts,
        stars: stars.length,
        dotSpacing: Math.max(4, Math.min(9, pxPer1080(DOT_SPACING_1080))),
        lightLengthVh: {
          min: lightLengths.length ? Math.min.apply(null, lightLengths) : null,
          max: lightLengths.length ? Math.max.apply(null, lightLengths) : null
        },
        lightLife: [LIGHT_MIN_S, LIGHT_MAX_S],
        dotLife: [LIGHT_MIN_S, LIGHT_MAX_S],
        dotCountRange: [DOT_SHORT, DOT_LONG],
        lightCountRange: [LIGHT_COUNT_MIN, LIGHT_COUNT_MAX],
        chromaOffset: chromas,
        chromaRange: [0.5, 3],
        blurMul: blurMuls,
        blurRange: [2, 3.5]
      };
    }
  };
}
function createBackgroundController(store) {
  let disposed = false;
  let storeOff = null;
  let schemeObserver = null;
  let layer = null;
  let fx = null;
  const root = () => document.documentElement;
  function ensureLayer() {
    if (layer && layer.parentNode) return layer;
    if (!document.body) return null;
    layer = createLayer();
    document.body.appendChild(layer);
    fx = createFx(layer);
    return layer;
  }
  function debugStatus() {
    let frame = null;
    let phase = null;
    let bodyBg = null;
    let frameBg = null;
    let sidebarColumnBg = null;
    let sidebarInner = null;
    let sidebarToken = null;
    let railSurfaceBg = null;
    try {
      const overlay = document.querySelector("[data-shell-overlay]");
      frame = overlay ? overlay.parentElement : null;
      phase = document.querySelector("[data-phase]");
      bodyBg = getComputedStyle(document.body).backgroundColor;
      frameBg = frame ? getComputedStyle(frame).backgroundColor : null;
      sidebarToken = getComputedStyle(document.body).getPropertyValue("--dsw-specific-sidebar-fill").trim();
      if (frame && frame.children.length > 0) {
        const col = frame.children[0];
        sidebarColumnBg = { cls: String(col.className || ""), bg: getComputedStyle(col).backgroundColor };
        const queue = Array.from(col.children || []);
        let steps = 0;
        while (queue.length > 0 && steps < 80) {
          steps += 1;
          const el = queue.shift();
          if (!el) continue;
          const bg = getComputedStyle(el).backgroundColor;
          if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
            sidebarInner = { cls: String(el.className || ""), bg };
            break;
          }
          Array.prototype.push.apply(queue, Array.from(el.children || []));
        }
      }
      const railSurface = document.querySelector(".lmui-rail__surface");
      railSurfaceBg = railSurface ? getComputedStyle(railSurface).backgroundColor : null;
    } catch (e) {
    }
    const layerEl = layer;
    return {
      bg: root().getAttribute("data-lmui-bg"),
      motion: root().getAttribute("data-lmui-bg-motion"),
      debug: root().getAttribute("data-lmui-bg-debug"),
      layerAttached: !!(layerEl && layerEl.parentNode),
      layerRect: layerEl ? layerEl.getBoundingClientRect().toJSON() : null,
      frameFound: !!frame,
      frameClass: frame ? frame.className : null,
      frameBg,
      sidebarColumnBg,
      sidebarInner,
      sidebarToken,
      railSurfaceBg,
      phaseFound: !!phase,
      phaseBg: phase ? getComputedStyle(phase).backgroundColor : null,
      bodyBg,
      rootZ: (() => {
        try {
          return getComputedStyle(document.getElementById("root") || document.body).zIndex;
        } catch (e) {
          return null;
        }
      })(),
      photo: (() => {
        const photo = layerEl ? layerEl.querySelector(".lmui-bg__photo") : null;
        return photo ? getComputedStyle(photo).backgroundImage : null;
      })(),
      fx: fx ? fx.debug() : null
    };
  }
  function apply2() {
    if (disposed) return;
    let cfg = {};
    try {
      cfg = store && store.get() || {};
    } catch (e) {
      cfg = {};
    }
    const active = cfg.enabled === true && cfg.bgEnabled === true;
    const motion = active && cfg.bgMotion === true;
    const darkScheme = root().getAttribute("data-lmui-scheme") !== "light";
    const effects = active && darkScheme;
    let reduced = false;
    try {
      reduced = typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch (e) {
      reduced = false;
    }
    const fxMotion = motion && !reduced;
    const opacity = clamp(cfg.bgOpacity, 0.55);
    try {
      const el = root();
      if (!el) return;
      if (active) ensureLayer();
      el.setAttribute("data-lmui-bg", active ? "on" : "off");
      el.setAttribute("data-lmui-bg-motion", motion ? "on" : "off");
      el.setAttribute("data-lmui-bg-debug", active ? layer && layer.parentNode ? "on+layer" : "on" : "off");
      el.style.setProperty("--lmui-bg-opacity", String(opacity));
      el.style.setProperty("--lmui-bg-veil", (0.9 - 0.5 * opacity).toFixed(3));
      if (fx) fx.setMode(effects, fxMotion);
      try {
        window.__LIGHT_MIRROR_BG_DEBUG__ = debugStatus;
      } catch (e) {
      }
    } catch (e) {
    }
  }
  function loadFirst(urls, property) {
    const list = (urls || []).map((url) => resolveMedia(url)).filter(Boolean);
    const attempt = (index) => {
      if (disposed || index >= list.length) return;
      const url = list[index];
      preload(url).then((ok) => {
        if (disposed) return;
        if (ok) {
          try {
            root().style.setProperty(property, 'url("' + url + '")');
          } catch (e) {
          }
        } else {
          attempt(index + 1);
        }
      });
    };
    attempt(0);
  }
  function loadImages() {
    loadFirst([cleanLightUrl(), MEDIA.photo.bgLight, MEDIA.photo.sceneWide, MEDIA.photo.sceneTerminal], "--lmui-bg-light");
    loadFirst([pureDarkUrl(), MEDIA.photo.bgDark, MEDIA.photo.sceneWide], "--lmui-bg-dark");
  }
  apply2();
  loadImages();
  if (store && typeof store.subscribe === "function") {
    storeOff = store.subscribe(apply2);
  }
  try {
    if (typeof window.MutationObserver === "function") {
      schemeObserver = new window.MutationObserver(apply2);
      schemeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-lmui-scheme"]
      });
    }
  } catch (e) {
    schemeObserver = null;
  }
  return {
    sync: apply2,
    dispose() {
      disposed = true;
      if (typeof storeOff === "function") {
        try {
          storeOff();
        } catch (e) {
        }
        storeOff = null;
      }
      if (fx) {
        try {
          fx.stop();
        } catch (e) {
        }
        fx = null;
      }
      if (schemeObserver) {
        try {
          schemeObserver.disconnect();
        } catch (e) {
        }
        schemeObserver = null;
      }
      try {
        if (typeof window !== "undefined") delete window.__LIGHT_MIRROR_BG_DEBUG__;
      } catch (e) {
      }
      try {
        if (layer && layer.parentNode) layer.parentNode.removeChild(layer);
      } catch (e) {
      }
      layer = null;
      try {
        const el = root();
        if (!el) return;
        el.removeAttribute("data-lmui-bg");
        el.removeAttribute("data-lmui-bg-motion");
        el.removeAttribute("data-lmui-bg-debug");
        el.style.removeProperty("--lmui-bg-opacity");
        el.style.removeProperty("--lmui-bg-veil");
        el.style.removeProperty("--lmui-bg-dark");
        el.style.removeProperty("--lmui-bg-light");
      } catch (e) {
      }
    }
  };
}

// src/client/index.js
var PLUGIN_ID = "dsh-light-mirror";
var STYLE_MAIN = PLUGIN_ID + "/main.css";
var STYLE_SETTINGS = PLUGIN_ID + "/settings.css";
var CONFIG_ROUTE2 = ROUTE_BASE + "/config";
var METRICS_ROUTE = ROUTE_BASE + "/metrics";
function canUseDOM() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}
function mountStyle(css, key) {
  if (!canUseDOM()) return () => {
  };
  try {
    const stale = document.querySelectorAll('style[data-plugin-css="' + key + '"]');
    for (let i = 0; i < stale.length; i += 1) {
      const node = stale[i];
      if (node && node.parentNode) node.parentNode.removeChild(node);
    }
    const tag = document.createElement("style");
    tag.dataset.plugin = PLUGIN_ID;
    tag.dataset.pluginCss = key;
    tag.textContent = css;
    (document.head || document.documentElement).appendChild(tag);
    return () => {
      try {
        if (tag.parentNode) tag.parentNode.removeChild(tag);
      } catch (e) {
      }
    };
  } catch (e) {
    return () => {
    };
  }
}
function normalizeConfig2(input) {
  const out = Object.assign({}, DEFAULTS);
  const src = input && typeof input === "object" ? input : {};
  for (const key of Object.keys(DEFAULTS)) {
    if (!(key in src) || src[key] === void 0 || src[key] === null) continue;
    const value = src[key];
    if (BOOL_KEYS.indexOf(key) >= 0) {
      out[key] = value === true || value === "true" || value === 1 || value === "1";
    } else if (ENUMS[key]) {
      const aliased = ENUM_ALIASES && ENUM_ALIASES[key] ? ENUM_ALIASES[key][value] : void 0;
      const candidate = aliased !== void 0 ? aliased : value;
      out[key] = ENUMS[key].indexOf(candidate) >= 0 ? candidate : DEFAULTS[key];
    } else if (RANGES[key]) {
      const range = RANGES[key];
      const n = Number(value);
      out[key] = Number.isFinite(n) ? Math.min(range[1], Math.max(range[0], n)) : DEFAULTS[key];
    } else {
      out[key] = value;
    }
  }
  out.heroTitle = normalizeHeroTitle(src.heroTitle);
  out.thinkingLabel = normalizeThinkingLabel(src.thinkingLabel);
  return out;
}
function createStore(initial) {
  let current = normalizeConfig2(initial);
  const listeners = /* @__PURE__ */ new Set();
  return {
    get() {
      return current;
    },
    set(next) {
      current = normalizeConfig2(next);
      const snapshot = current;
      for (const fn of Array.from(listeners)) {
        try {
          fn(snapshot);
        } catch (e) {
        }
      }
      return current;
    },
    subscribe(fn) {
      if (typeof fn !== "function") return () => {
      };
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    clear() {
      listeners.clear();
    }
  };
}
function readBootConfig() {
  try {
    const injected = window.__LIGHT_MIRROR__;
    if (injected && typeof injected === "object") return normalizeConfig2(injected);
  } catch (e) {
  }
  return null;
}
function apply(ctx) {
  if (!ctx) return;
  const disposers = [];
  const track = (disposer) => {
    if (typeof disposer === "function") disposers.push(disposer);
  };
  track(mountStyle(SETTINGS_CSS, STYLE_SETTINGS));
  const store = createStore(readBootConfig() || DEFAULTS);
  track(() => store.clear());
  const themeController = createThemeController(ctx, store);
  track(() => themeController.dispose());
  let uiDisposers = [];
  let mainStyleOff = null;
  function armUI() {
    if (uiDisposers.length > 0) return;
    try {
      document.documentElement.setAttribute("data-lmui-composer", "on");
    } catch (e) {
    }
    if (!mainStyleOff) mainStyleOff = mountStyle(DECOR_CSS, STYLE_MAIN);
    const keep = (disposer) => {
      if (typeof disposer === "function") uiDisposers.push(disposer);
    };
    try {
      registerDecor(ctx, store, keep);
    } catch (e) {
    }
    try {
      registerBrand(ctx, store, keep);
    } catch (e) {
    }
    try {
      registerRail(ctx, store, keep);
    } catch (e) {
    }
    try {
      const background = createBackgroundController(store);
      keep(() => background.dispose());
    } catch (e) {
    }
    try {
      const domPatches = createDomPatches(store);
      keep(() => domPatches.dispose());
    } catch (e) {
    }
    try {
      const whale = createWhaleIndicator();
      keep(() => whale.dispose());
    } catch (e) {
    }
  }
  function disarmUI() {
    const pending = uiDisposers;
    uiDisposers = [];
    for (let i = pending.length - 1; i >= 0; i -= 1) {
      try {
        if (typeof pending[i] === "function") pending[i]();
      } catch (e) {
      }
    }
    try {
      document.documentElement.removeAttribute("data-lmui-composer");
    } catch (e) {
    }
    if (mainStyleOff) {
      try {
        mainStyleOff();
      } catch (e) {
      }
      mainStyleOff = null;
    }
  }
  track(disarmUI);
  function applyConfig(input) {
    const cfg = store.set(input);
    if (cfg.enabled === true) {
      armUI();
      themeController.arm(cfg);
    } else {
      themeController.disarm();
      disarmUI();
    }
    return cfg;
  }
  function onLive(next) {
    const prev = store.get();
    const cfg = store.set(next);
    const themeKeysChanged = cfg.enabled !== prev.enabled || cfg.uiMode !== prev.uiMode;
    if (cfg.enabled !== prev.enabled) {
      if (cfg.enabled === true) {
        armUI();
        themeController.arm(cfg);
      } else {
        themeController.disarm();
        disarmUI();
      }
      return;
    }
    if (cfg.enabled === true && (themeKeysChanged || !themeController.isArmed())) {
      armUI();
      themeController.arm(cfg);
    }
  }
  try {
    track(registerSettings(ctx, { store, onLive }));
  } catch (e) {
  }
  let booted = false;
  function bootWith(input) {
    booted = true;
    applyConfig(input);
  }
  const injected = readBootConfig();
  if (injected) bootWith(injected);
  let fallbackTimer = 0;
  try {
    if (typeof fetch === "function") {
      readConfig().then((result) => {
        if (!booted) bootWith(result.config);
        else applyConfig(result.config);
      }).catch(() => {
        if (!booted) bootWith(DEFAULTS);
      });
      fallbackTimer = window.setTimeout(() => {
        if (!booted) bootWith(DEFAULTS);
      }, 3e3);
    } else if (!booted) {
      bootWith(DEFAULTS);
    }
  } catch (e) {
    if (!booted) bootWith(DEFAULTS);
  }
  track(() => {
    try {
      if (fallbackTimer) window.clearTimeout(fallbackTimer);
    } catch (e) {
    }
  });
  const cleanup = () => {
    try {
      if (fallbackTimer) window.clearTimeout(fallbackTimer);
    } catch (e) {
    }
    fallbackTimer = 0;
    for (let i = disposers.length - 1; i >= 0; i -= 1) {
      try {
        if (typeof disposers[i] === "function") disposers[i]();
      } catch (e) {
      }
    }
    disposers.length = 0;
  };
  if (typeof ctx.effect === "function") {
    ctx.effect(() => cleanup);
  }
  try {
    window.__LIGHT_MIRROR_UI__ = {
      plugin: PLUGIN_ID,
      version: VERSION,
      configRoute: CONFIG_ROUTE2,
      metricsRoute: METRICS_ROUTE,
      getConfig() {
        return store.get();
      },
      isThemed() {
        return themeController.isArmed();
      },
      resolvedMode() {
        return themeController.resolvedMode(store.get());
      }
    };
    window.__LIGHT_MIRROR_METRICS_URL__ = METRICS_ROUTE;
  } catch (e) {
  }
}
var inject = ["slots", "theme"];

    return module.exports;
  },
});
