/**
 * 光之镜 · 天空岛 — 主界面样式 v2
 * ----------------------------------------------------------------------------
 * 规则：
 *  - 色彩来自 content.js v2 色板：低饱和低亮度深色 + 五光十色的白；金色只做极小面积。
 *  - UI 颜色优先用 DSH 主题变量（--dsw-*）；插件自有变量一律 --lmui-* 前缀。
 *  - DECOR_CSS：主界面主题部分（四角细框 / 星尘 / 状态字 / 立绘 / 观测栏 / 播放器），
 *    随总开关装卸。SETTINGS_CSS：设置页（DSH 原生观感），常驻注入。
 *  - 装饰 pointer-events:none；观测栏面板本体才接收点击；动画只用 CSS，尊重 reduced-motion。
 */

export const DECOR_CSS = String.raw`
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
.lmui-paimon__scan {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background-image: repeating-linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.055) 0 1px,
    transparent 1px 3px
  );
  mix-blend-mode: screen;
  opacity: 0.55;
}
/* 预渲染全息：本身已有青白描边 + 深青灰半透明填充，再叠柔光和扫描线 */
.lmui-paimon[data-lmui-paimon-source="holo"] .lmui-paimon__img {
  opacity: 0.95;
  filter: drop-shadow(0 0 6px rgba(200, 214, 210, 0.4)) drop-shadow(0 0 18px rgba(162, 169, 187, 0.24))
    drop-shadow(0 0 34px rgba(231, 189, 210, 0.12)) brightness(1.06) contrast(1.06);
}
.lmui-paimon[data-lmui-paimon-source="holo"] .lmui-paimon__scan { opacity: 0.5; }
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
.lmui-paimon[data-lmui-paimon-source="half"] .lmui-paimon__scan { opacity: 0.42; }
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
.lmui-paimon__scan {
  -webkit-mask-image: linear-gradient(180deg, transparent 0%, #000 10%, #000 88%, transparent 100%);
  mask-image: linear-gradient(180deg, transparent 0%, #000 10%, #000 88%, transparent 100%);
}
html[data-lmui-scheme="light"] .lmui-paimon__scan { opacity: 0.28; }
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
/* composer 发送按钮：低饱和虹彩渐变圆 + 深/浅各自可读图标色 */
[data-composer-card] button[class*="_primary"] {
  background-image: linear-gradient(135deg, var(--lmui-irid-a) 0%, var(--lmui-irid-b) 52%, var(--lmui-irid-c) 100%) !important;
  background-color: transparent !important;
  color: var(--lmui-irid-ink) !important;
  border: none !important;
  box-shadow: 0.6px 0 0 rgba(255, 64, 96, 0.4), -0.6px 0 0 rgba(64, 128, 255, 0.4),
    inset 0 0 0 0.5px var(--lmui-irid-border);
  transition: background-color 0.1s, filter 0.15s;
}
[data-composer-card] button[class*="_primary"]:hover:not(:disabled) {
  filter: brightness(1.06) saturate(1.04);
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
  height: 44px;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgba(230, 242, 255, 0) 0%,
    rgba(215, 235, 255, 0.12) 24%,
    rgba(255, 255, 255, 0.42) 44%,
    rgba(255, 255, 255, 0.78) 56%,
    rgba(200, 225, 255, 0.26) 72%,
    rgba(255, 255, 255, 0) 100%
  );
  filter: blur(0.6px);
  mix-blend-mode: screen;
  opacity: 0;
  translate: 0 -44px;
  animation: lmui-paimon-scan-band var(--lmui-scan-cycle, 5s) linear infinite;
}
.lmui-paimon__scan::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: -6px;
  height: 14px;
  pointer-events: none;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 55%, rgba(255, 255, 255, 0) 100%);
  filter: blur(3px);
  mix-blend-mode: screen;
  opacity: 0;
  translate: 0 -20px;
  animation: lmui-paimon-scan-trail var(--lmui-scan-cycle, 5s) linear infinite;
}
@keyframes lmui-paimon-scan-band {
  0%, 7.9% { opacity: 0; translate: 0 -44px; }
  8% { opacity: 0.5; translate: 0 0; }
  10% { opacity: 0.92; }
  26% { opacity: 0.82; translate: 0 188px; }
  28% { opacity: 0; translate: 0 196px; }
  28.01%, 100% { opacity: 0; translate: 0 -44px; }
}
@keyframes lmui-paimon-scan-trail {
  0%, 7.9% { opacity: 0; translate: 0 -30px; }
  8% { opacity: 0.4; translate: 0 0; }
  10% { opacity: 0.65; }
  26% { opacity: 0.5; translate: 0 196px; }
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
`

export const SETTINGS_CSS = String.raw`
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
`
