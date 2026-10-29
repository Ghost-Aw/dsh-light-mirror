/* dsh-light-mirror — splash runtime（由 build.mjs 生成，请勿手改） */
var __LM_SPLASH_BUNDLE__ = (() => {
  // src/shared/content.js
  var ROUTE_BASE = "/light-mirror";
  var VERSION = "3.0.1";
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
  var VOICE_LINES = {
    link: { text: "正在链接天空岛", src: MEDIA.voice.link },
    welcome: { text: "欢迎来到世界", src: MEDIA.voice.welcome }
  };
  var STORAGE = {
    splashShown: "light-mirror:splash-shown",
    splashDay: "light-mirror:splash-day",
    railOpen: "light-mirror:rail-open",
    musicOn: "light-mirror:music-on",
    musicTrack: "light-mirror:music-track",
    musicLoop: "light-mirror:music-loop",
    musicVolume: "light-mirror:music-volume"
  };

  // src/splash/star.js
  var STAR_VB_W = 400;
  var STAR_VB_H = 720;
  var STAR_CX = 200;
  var STAR_CY = 360;
  function hyperStarPath(HT, HB, WH, k) {
    const kk = k || 1.8;
    const n = 150;
    const pts = [];
    const push = function(x, y) {
      pts.push([x, y]);
    };
    for (let i = 0; i <= n; i += 1) {
      const t = i / n;
      push(STAR_CX + WH * Math.pow(t, kk), STAR_CY - HT * Math.pow(1 - t, kk));
    }
    for (let i = 1; i <= n; i += 1) {
      const t = i / n;
      push(STAR_CX + WH * Math.pow(1 - t, kk), STAR_CY + HB * Math.pow(t, kk));
    }
    for (let i = 1; i <= n; i += 1) {
      const t = i / n;
      push(STAR_CX - WH * Math.pow(t, kk), STAR_CY + HB * Math.pow(1 - t, kk));
    }
    for (let i = 1; i <= n; i += 1) {
      const t = i / n;
      push(STAR_CX - WH * Math.pow(1 - t, kk), STAR_CY - HT * Math.pow(t, kk));
    }
    let d = "M" + pts[0][0].toFixed(2) + "," + pts[0][1].toFixed(2);
    for (let i = 1; i < pts.length; i += 1) d += "L" + pts[i][0].toFixed(2) + "," + pts[i][1].toFixed(2);
    return d + "Z";
  }
  function hyperStarSvg(HT, HB, WH, cls, stroke, color, style) {
    const d = hyperStarPath(HT, HB, WH);
    return '<svg class="lm-star-svg ' + cls + '" viewBox="0 0 ' + STAR_VB_W + " " + STAR_VB_H + '" preserveAspectRatio="xMidYMid meet" aria-hidden="true"' + (style ? ' style="' + style + '"' : "") + '><path d="' + d + '" fill="' + (color || "#ffffff") + '"' + (stroke ? ' stroke="' + stroke + '" stroke-width="1.1"' : "") + "/></svg>";
  }
  function starHaloSvg() {
    return hyperStarSvg(298, 278, 126, "lm-star-halo-svg", null, "#ffffff", "filter:blur(15px);opacity:.92");
  }
  function starBigSvg() {
    return hyperStarSvg(266, 248, 113, "lm-star-big-svg", "rgba(120,122,140,0.32)", "#050509");
  }
  function starCoreSvg() {
    return hyperStarSvg(146, 136, 62, "lm-star-core-svg", null, "#f6f7fc", "filter:drop-shadow(0 0 8px rgba(255,255,255,.4)) drop-shadow(0 0 24px rgba(214,226,250,.22))");
  }
  function starSmallSvg() {
    return hyperStarSvg(56, 52, 23.5, "lm-star-small-svg", null, "#040407");
  }

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
  function bandsHtml() {
    const list = [];
    const count = 22;
    let s = 7;
    const rand = function() {
      s = s * 16807 % 2147483647;
      return s / 2147483647;
    };
    for (let i = 0; i < count; i += 1) {
      const side = rand() > 0.5 ? 1 : -1;
      const u = Math.pow(rand(), 0.55);
      const xPct = 50 + side * u * 48;
      const edge = Math.abs(xPct - 50) / 50;
      const dip = 0.28 + 0.72 * Math.pow(edge, 0.8);
      const h = (0.12 + rand() * 0.3) * (0.6 + 1.1 * dip);
      const w = 2 + rand() * 10;
      const delay = -rand() * 9;
      const dur = 5 + rand() * 7;
      const op = 0.26 + rand() * 0.5;
      const warm = rand() < 0.3;
      const tint = warm ? "rgba(255,226,200,0.9)" : "rgba(214,226,255,0.9)";
      list.push(
        '<i style="--x:' + xPct.toFixed(2) + "%;--h:" + (h * 100).toFixed(1) + "%;--w:" + w.toFixed(1) + "px;--delay:" + delay.toFixed(2) + "s;--dur:" + dur.toFixed(2) + "s;--op:" + op.toFixed(2) + ";--tint:" + tint + '"></i>'
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
    const rand = function() {
      s = s * 16807 % 2147483647;
      return s / 2147483647;
    };
    for (let i = 0; i < 6; i += 1) {
      const x = 8 + rand() * 84;
      const h = 18 + rand() * 34;
      const w = 1.5 + rand() * 4;
      const delay = -rand() * 2;
      const dur = 0.9 + rand() * 1.2;
      list.push(
        '<i style="--x:' + x.toFixed(1) + "%;--h:" + h.toFixed(1) + "%;--w:" + w.toFixed(1) + "px;--delay:" + delay.toFixed(2) + "s;--dur:" + dur.toFixed(2) + 's"></i>'
      );
    }
    return list.join("");
  }
  function burstCrossSvg() {
    const d = hyperStarPath(300, 280, 98);
    return '<svg class="lm-burstcross-svg" viewBox="0 0 400 720" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><defs><filter id="lmBurstCrossBlur" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="22"/></filter></defs><path d="' + d + '" fill="#ffffff" filter="url(#lmBurstCrossBlur)"/></svg>';
  }
  function buildScene(root, cfg, debug) {
    root.innerHTML = '<div class="lm-scene"><div class="lm-bg" aria-hidden="true"></div><div class="lm-fog" aria-hidden="true"></div><div class="lm-bands" aria-hidden="true">' + bandsHtml() + '</div><div class="lm-star-wrap" aria-hidden="true"><div class="lm-star-glow"></div><div class="lm-star-halo">' + starHaloSvg() + '</div><div class="lm-star-big lm-star-fill" style="clip-path:inset(100% 0 0 0)">' + starBigSvg() + '</div><div class="lm-star-core">' + starCoreSvg() + '</div><div class="lm-star-small" style="clip-path:inset(100% 0 0 0)">' + starSmallSvg() + '</div></div><div class="lm-burst" aria-hidden="true"><div class="lm-glow"></div><div class="lm-radials">' + radialsHtml() + '</div><div class="lm-burstcross">' + burstCrossSvg() + '</div><div class="lm-rise">' + riseHtml() + '</div><div class="lm-rings"><i></i><i></i><i></i></div><div class="lm-dots"></div><div class="lm-iri"></div><div class="lm-sparks">' + new Array(10).fill("<i></i>").join("") + '</div></div><img class="lm-newscene" alt="" aria-hidden="true" data-src="' + (MEDIA.photo && MEDIA.photo.bgDark ? MEDIA.photo.bgDark : "") + '" data-dev-fallback="' + devFallback("bgDark") + '"><canvas class="lm-webgl" aria-hidden="true"></canvas><div class="lm-white" aria-hidden="true"></div><div class="lm-subtitle" aria-live="polite"></div><div class="lm-fail" hidden></div></div>';
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
      starHalo: q(".lm-star-halo"),
      starBig: q(".lm-star-big"),
      starFill: q(".lm-star-big"),
      starCore: q(".lm-star-core"),
      starSmall: q(".lm-star-small"),
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
      const big = Math.max(0, Math.min(1, p / 0.72));
      const small = Math.max(0, Math.min(1, (p - 0.42) / 0.58));
      if (ui.starBig) {
        ui.starBig.style.setProperty("--bigClip", ((1 - big) * 100).toFixed(2) + "%");
        ui.starBig.style.clipPath = "inset(" + ((1 - big) * 100).toFixed(2) + "% 0 0 0)";
      }
      if (ui.starSmall) {
        ui.starSmall.style.setProperty("--smallClip", ((1 - small) * 100).toFixed(2) + "%");
        ui.starSmall.style.clipPath = "inset(" + ((1 - small) * 100).toFixed(2) + "% 0 0 0)";
      }
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
  var MEDIA_PREFIX = "/light-mirror/media/";
  function resolveMedia(url) {
    try {
      if (typeof url === "string" && window.location && window.location.protocol === "file:" && url.indexOf(MEDIA_PREFIX) === 0) {
        return "../media/" + url.slice(MEDIA_PREFIX.length);
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
          audio.src = resolveMedia(line.src);
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
      const h = Math.max(2, Math.round(rect.height || window.innerHeight));
      const dpr = Math.min(2, Math.max(1, window.devicePixelRatio || 1));
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
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
    state.cfg = normalizeConfig(window.__LIGHT_MIRROR__);
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
    function normalizeConfig(input) {
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
      if (overrideConfig && typeof overrideConfig === "object") state.cfg = normalizeConfig(overrideConfig);
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
      return new Promise(function(resolve) {
        let finished = false;
        const done = function(ok) {
          if (finished) return;
          finished = true;
          resolve(ok);
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
            state.cfg = normalizeConfig(json.config);
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
})();
