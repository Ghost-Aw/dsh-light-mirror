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
  backdrop-filter: blur(16px) saturate(118%);
  -webkit-backdrop-filter: blur(16px) saturate(118%);
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
  isolation: isolate;
  transform: translateZ(0);
  will-change: box-shadow, background-color;
  background-image: linear-gradient(135deg, var(--lmui-irid-a) 0%, var(--lmui-irid-b) 52%, var(--lmui-irid-c) 100%) !important;
  background-color: transparent !important;
  color: var(--lmui-irid-ink) !important;
  border: none !important;
  box-shadow: 0.6px 0 0 rgba(255, 64, 96, 0.4), -0.6px 0 0 rgba(64, 128, 255, 0.4),
    inset 0 0 0 0.5px var(--lmui-irid-border);
  transition: box-shadow 0.15s var(--lmui-ease), background-color 0.15s var(--lmui-ease);
}
[data-composer-card] button[class*="_primary"]:hover:not(:disabled) {
  box-shadow: 0.6px 0 0 rgba(255, 64, 96, 0.4), -0.6px 0 0 rgba(64, 128, 255, 0.4),
    inset 0 0 0 0.5px var(--lmui-irid-border), inset 0 0 12px rgba(255, 255, 255, 0.18),
    0 0 10px rgba(232, 233, 236, 0.2);
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
