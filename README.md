# dsh-light-mirror · 光之镜 · 天空岛（v3）

> DeepSeek Harness（DSH）的**启动动画 + 主界面主题二合一**插件。
> 视觉取自《原神 7.2 前瞻 PV》中「光之镜」：**五光十色的白 + 低饱和低亮度深色**；灰白石质终端、中央金色凯尔特三角结、光雨/竖光柱/CRT 条纹、法涅斯徽记（含左右翅膀）与派蒙全息立绘。
> 启动动画流程：**动态终端场景 → 异象爆发 → PV 192s 整屏竖向解离 → 进入主界面**；配 PV 原声「正在链接天空岛」「欢迎来到世界」，无跳过键、自动播放、异常兜底。

本插件为个人学习与交流用的**二次创作**：代码原创（MIT）；PV 帧素材、角色图像、语音台词版权归 miHoYo / 原权利方所有，仅作个人演示，请勿单独分发或商用。

---

## 功能

### 启动动画（≈12s，单次自动播放）

| 时间 | 内容 |
|---|---|
| 0–6.0s | 终端场景**动起来**：镜头下沉推近、中央金光/金结呼吸、光雨光尘、竖光帘纵向流动、CRT 微闪、星点闪烁、远景视差；语音①「正在链接天空岛」；全息派蒙陪伴；标题与状态行 |
| 6.0–10.4s | 白闪转**异象爆发**（PV 188–194s）：深色四芒星剪影 + 白色四芒星（冰蓝核）+ 小十字星 + 三重细环 + 虹彩羽状雾 + 竖光柱 + bloom/glitch；语音②「欢迎来到世界」 |
| 10.4–11.0s | **PV 192s 整屏竖向解离**：白场切 3→62 条竖向白条/缝（2–146px 随机宽度、全高、竖向拖影、左先右后、青/品红边缘、亮度 L255→121），缝隙下露出主界面深色画面 → 无缝进入 UI |
| ~11.8s | 播放结束自动释放；12s 兜底 + Host 18s 兜底，任何异常都不锁页 |

- 无跳过键（纯自动播放）；`prefers-reduced-motion` 降级；离线/HTTPS 自动切换素材路径。
- 与主界面深色背景同源（倒计时场景），解离结束即主界面，不跳变。

### 主界面主题

- **双模式**：终端（低饱和深色，默认）/ 神殿（灰白石浅色）/ 跟随系统。
- **品牌图案可切换**（设置项 `brandMark`）：法涅斯徽记（含左右翅膀，深色五光白 / 浅色淡金）/ 光之镜终端 / 天空岛 / 派蒙表情 / 派蒙头像；替换侧栏品牌位与空会话 Hero，20px 收起侧栏自动用紧凑兜底。
- **图片动态背景**（`bgEnabled`/`bgOpacity`/`bgMotion`）：深色=倒计时场景 `bg-dark`（深色低饱和 3D 物体+CRT 条纹），浅色=终端远景 `bg-light`；上叠暗色 veil + 渐变/光晕/数据流/星点动态层，正文可读、不挡交互。
- **右侧「观测栏」= 真实第三列**（停靠式，不覆盖正文）：读取 shell frame 的 grid template 保留侧栏/正文两列，按「可用空间 40% 上限 + 正文 ≥480px 下限」插入第三列；关闭时只移除属性、不动 shell inline style；1280 下正文自动缩窄不重叠。
  - 链接状态、系统（CPU/内存/磁盘，`/light-mirror/metrics` 真实数据）、时间（正常措辞）、回响音乐播放器
  - **派蒙全息立绘**：观测栏内，描边/半透明/扫描线/轻微色散/慢浮动，三档可切换（半身 / 立绘 / 表情），可关
- **浅色可读性**：补 16 个宿主深色表面令牌到灰白石色，深底深字全部改浅灰/深墨；16 组对比度采样全部 ≥4.5:1。
- 窗口四角极淡五光白细框、星尘、右下角两行状态字（均可关）。
- **设置页**：设置 →「光之镜」；主界面改动即时生效，启动动画可「立即预览」。

---

## 安装

依赖：DSH 0.2.x（`web` 或 `desktop` profile）、Node ≥ 20。

DSH 插件通过 profile 的 `package.json` 声明依赖，安装方式与其它 DSH 插件一致。下面以 **web profile（浏览器版，默认 http://127.0.0.1:3080）** 为例；桌面端把 `--profile web` 换成 `--profile desktop` 即可。

### 方式一：从 GitHub 安装（推荐）

```powershell
dsh plugin --profile web add github:Ghost-Aw/dsh-light-mirror
```

然后把包名加入 `~/.dsh/profiles/web/package.json` 的 `dsh.profile.bundles`：

```json
{
  "dsh": {
    "profile": {
      "bundles": [
        "@deepseek-ai/dsh-base",
        "@deepseek-ai/dsh-web-app",
        "dsh-light-mirror"
      ]
    }
  }
}
```

重启 `dsh web`（桌面端重启 DSH）后刷新页面即可。

### 方式二：本地 tarball 安装

```powershell
dsh plugin --profile web add file:C:/path/to/dsh-light-mirror-3.0.0.tgz
```

### 方式三：开发模式（链接源码目录）

```powershell
dsh plugin --profile web add link:C:/path/to/light-mirror
```

方式二/三同样需要在 `bundles` 中追加 `"dsh-light-mirror"`。

卸载：`dsh plugin --profile web remove dsh-light-mirror`，并从 `bundles` 中移除包名。
### 如何看到启动动画 / 立即预览

- 新标签页 / 重启 dsh web 后播放一次（默认 `session`：同一标签页刷新不重复）。
- 立即查看：**设置 → 光之镜 → 立即预览启动动画**。
- 离线预览：双击 `preview\打开预览.cmd`。

---

## 配置（`~/.dsh/light-mirror.json`，设置页读写）

| 字段 | 默认 | 说明 |
|---|---|---|
| `enabled` | `true` | 主界面主题总开关 |
| `uiMode` | `auto` | `auto` / `terminal` / `temple` |
| `brandMark` | `phanes` | `phanes` / `terminal` / `skyisland` / `paimonEmoji` / `paimonAvatar` |
| `paimonVariant` | `guide` | `guide` / `paimon2` / `emoji` |
| `bgEnabled` / `bgOpacity` / `bgMotion` | `true` / `0.55` / `true` | 图片背景开关、不透明度、动态 |
| `frame` `stardust` `rail` `music` `mascot` `statusLine` | `true` | 各装饰/功能开关 |
| `splashEnabled` | `true` | 启动动画开关 |
| `splashMode` | `session` | `session` / `daily` / `every` |
| `voice` `voiceVolume` | `true` / `0.85` | 语音与音量 |
| `sfx` `sfxVolume` | `true` / `0.5` | 音效与音量 |

---

## 开发

```powershell
cd "E:\Program Files\DSH\1017\light-mirror"
node build.mjs                 # 全量构建
node build.mjs --only=client   # 只构建主界面
node build.mjs --only=splash   # 只构建启动动画
node scripts/test-host.mjs     # Host 单测（路由/config/metrics/tapIndex/鉴权）
node scripts/test-client.mjs   # client bundle 集成测
node scripts/check-package.mjs # 包自检（清单/文案/资源/外链）
```

## 预览

`preview\打开预览.cmd` 或手动打开：
- `preview/splash.html`：启动动画离线预览（`?t=` 定格、`?finish=1`、`?reduced=1`）
- `preview/ui.html`：主界面 mock（终端/神殿、观测栏开合、品牌/派蒙/背景、设置页）

> 预览页是设计自测工具，线上效果以 DSH 页面为准。

## 已知限制

- 启动动画依赖 Host `webServer.tapIndex` 注入；桌面端 `file://` 走浏览器半侧自举。
- 首次交互前语音可能被浏览器 autoplay 策略静默（字幕照常）。
- 观测栏停靠依赖 shell frame 的 `[data-shell-overlay]` 父元素；若版本 DOM 不同会自动降级为覆盖式（不破坏布局）。
- 动态背景依赖 `[data-phase]` 容器属性；缺失时退回静态主题底色。
- 默认「每次浏览器会话一次」：同一标签页刷新不重复播放，可改 `every` 或点「立即预览」。
- 素材来自游戏前瞻 PV，仅供个人使用，不建议分发媒体文件。
- 与其它完整主题插件同时启用会互相叠加，建议同一时间只保留一个。

## 效果图

见 `preview/shots/`。

## License

代码 MIT。素材版权归原权利方，详见 `LICENSE`。
