---
name: partner-ui-pages
description: 用伙伴工作台的两套 UI 消费包（@workbench/ui-vue3 与 huawei-partner-ai-ui，含企业AI助手/智慧组件）制作可直接双击打开的 HTML 页面、演示原型和 PRD 需求页，或把已有静态 HTML 原型换成真实组件样式。适用于新建原型、PRD 转页面、按组件规范改造已有 HTML；需要可集成的 Vue 产品代码时使用 partner-ui-vue3。
---

# 伙伴工作台页面（Workbench + AI UI）

本 skill 用于离线 HTML 演示原型。自带的**预编译运行时**包含 Vue 3.5.13 和两个消费包的公开运行时组件；页面引用运行时、写 Vue 模板即可双击打开，不需要 npm、构建或联网。产品 Vue 代码、依赖接入与正式模块交接转到 `partner-ui-vue3`，不要把原型 helpers 或模拟会话当成产品功能。包的资格状态以随包 release 元数据为准，运行时打包不等于生产批准。

```
references/workbench/index.md  Workbench 包参考索引
references/ai-ui.md  AI UI 公开组件 API、缺口及来源说明
assets/runtime/     partner-ui-runtime.js / .css / versions.json（全局 PartnerUI 与 Vue）
assets/fonts/       HarmonyOS Sans 原件 + 许可（可选）
assets/templates/   6 个起步页面
scripts/            new_page.py、bundle_single.py（Python 3 标准库）；check_page.mjs（Node + Playwright，可选）
references/         组件、规则、Token、图标、运行时 API（按需读取）
maintainer/         升级包后重建运行时与参考文档（维护者用，页面作者不需要）
```

## 先判断任务类型

| 用户要的 | 流程 |
| --- | --- |
| 新页面 / demo / 原型 / “做一个××页” | A. 新建页面 |
| 给了 PRD、需求文档、截图，要变成页面 | B. 需求转页面（先拆需求，再走 A） |
| 给了已有 HTML，要“换成组件”“按规范重做”“美化” | C. 改造已有页面 |

分不清时问一句：新建，还是在原文件上改造？

## 通用规则（三种流程都适用）

1. **能用包里的组件就必须用组件**。先从 `references/workbench/index.md` 与 `references/ai-ui.md` 查已发布包参考；选型看 `references/workbench/index.md`、`references/ai-ui.md`、`references/patterns.md`；选定后读对应组件文件核对 props / 事件 / 插槽 / 设计规则。不凭外观猜 API，不用原生 HTML 仿造已有控件。AI UI 当前没有已发布的 components 元数据；其参考只列已证实的包导出和缺口，不提供手写补全 API。缺少所需契约时明确标为待确认，不能把运行时导出名单当作 props/事件说明。
2. **基础规范不可改**：不写 CSS 覆盖组件内部（`.wb-*`、`.tr-*`、`.partner-ai *`）的颜色、字号、间距、边框、圆角、阴影、动效；不改、不替换、不手绘任何图标（含 AI 头像、发送、工具栏、✦ 智慧标识）。尺寸和变体只用组件公开 props。详见 `references/design-rules.md`。
3. **包里没有才自建**：用原生 HTML + Foundation Token（`var(--wb-*)`，见 `references/tokens.md`）+ `.pui-*` 工具类；外层 `class="pui-custom" data-pui-name="名称"`，在页面“说明”里写明名称、原因、为何现有组件不满足；不出现新色值；图标仍只用 `references/icons.md` 里的名称。
4. **页面结构用原生 HTML + Foundation 布局**：版心两侧 32px、24/12 列栅格、沟槽与卡片间距 16px、卡片内边距 20/24、间距为 4 的倍数。
5. **数据和逻辑归页面**：组件只发出意图（事件），页面负责状态、跳转、提示。演示数据合理自洽，并标注“演示数据 / 未连接真实服务”。
6. **AI 组件两条硬要求**：外层要有 `.partner-ai`（`AgreementAssistantPanel`、`AssistantHostLayout` 自带；独立 `ChatPanel` 和卡片类需自己包）；聊天面板要有确定高度。
7. **图表**：包里没有图表组件。保留原图表，或用 SVG/CSS 绘制，颜色只用 Token，标为 `pui-custom`。

## A. 新建页面

1. **定页面**：目的、用户、主要任务、区块，以及要覆盖的状态（空、加载、错误、禁用、确认、成功提示、AI 回复）。
2. **选模板**（说明见 `references/patterns.md`）：`workbench-list`（列表管理）、`workbench-detail`（详情/编辑）、`workbench-dashboard`（工作台首页）、`ai-assistant-workspace`（业务页 + 企业AI助手）、`ai-chat`（独立 AI 问答）、`blank`。
3. **生成页面文件夹**：
   ```bash
   python3 scripts/new_page.py --template workbench-list --out ./my-page --title "协议管理"
   ```
   得到 `my-page/index.html` + `runtime/` + `fonts/`（`--no-fonts` 不带字体）。没有 Python 时手动复制：模板 → `index.html`，`assets/runtime/` → `runtime/`，`assets/fonts/` → `fonts/`。
4. **写页面**（`references/runtime-api.md`）：模板写在 `<script type="text/x-template" id="page">` 里，数据与方法写在 `PartnerUI.mount('#app', { template: '#page', setup() { … return {…} } })`；组件直接用 PascalCase 名称，无需 import。官方示例是 SFC 写法，按 runtime-api.md 改写。
5. **自检并交付**（见下方）。需要单文件发送时：
   ```bash
   python3 scripts/bundle_single.py my-page/index.html my-page.html   # 内联运行时，不含字体
   ```

## B. 需求转页面（PRD / 截图 / 文字需求）

1. 整理**页面清单**：每页目标、入口、区块、字段、操作、状态、跳转。多页面用一个 HTML 内多个视图，或多个 HTML 共享 `runtime/` 互链。
2. 写**组件映射**：区块 → 组件（或“自建：原因”）→ 关键 props/事件。先把映射表和不清楚处的假设发给用户。
3. AI 能力：侧栏/悬浮助手 → `AssistantHostLayout` + `AgreementAssistantPanel`（协议领域）或 `ChatPanel` + `PartnerUI.createChatSession`（通用）；页面内洞察 → `WorkspaceSmartCard` / `WorkspaceSmartTag` / `AiSummaryCard`；回复中的业务卡片 → `PartnerUI.chatRenderers`（ai-summary、business-navigation、agreement-table、`pui-template` 任意模板）。演示回复用本地模拟，注明未连接真实服务。
4. 按 A 的 3–5 步实现；页面末尾“说明”折叠区加**需求对照**：需求点 → 实现位置 → 状态（已实现 / 假设 / 待确认）。

## C. 改造已有 HTML 页面

目标：保留原页面全部文字、数字、图表、交互流程和脚本，只把界面换成组件与 Token。完整说明见 `references/restyle.md`。

1. 复制原文件到新文件夹并放好 `runtime/`；读结构：产品画面根节点、不改的标注区、原脚本如何响应点击和取值。
2. **语义盘点（关键）**：静态 HTML 只是元素拼接，不能只转换“看得出是控件”的部分。逐屏列出每个可见模块，按它表达的意思映射到组件：提示句 → Alert；带圆点/编号的阶段或核对项 → Steps / Timeline；“查看… →” → 下钻文字按钮；带按钮的描边盒子 → operation 卡片；数字+标签 → 指标卡；AI 回答 → ChatPanel 气泡 + 回复操作区；横条 → meter（自建）；纯分栏 → layout。映射表见 `references/restyle.md`。没有对应组件的才标 `custom` 并写原因。
3. 在 `</body>` 前加入运行时与配置：
   ```html
   <link rel="stylesheet" href="runtime/partner-ui-runtime.css">
   <script src="runtime/partner-ui-runtime.js"></script>
   <script>
     PartnerUI.restyle({
       root: '.product', skip: '.annotation', tokens: true,
       rules: [
         { selector: '.site-nav', as: 'topnav', top: '.site-top', menu: '.site-menu', items: 'span' },
         { selector: '.crumb', as: 'breadcrumb' },
         { selector: '.tabs', as: 'tabs' },
         { selector: 'table', as: 'table' },
         { selector: '.tag', as: 'tag', statusByClass: { amber: 'warning' } },
         { selector: 'button.primary', as: 'button', appearance: 'primary' },
         { selector: 'button.link', as: 'button', appearance: 'text' },
         { selector: 'input[type=text]', as: 'input' }, { selector: 'select', as: 'select' },
       ],
     })
   </script>
   ```
   组件挂在原元素前，原元素隐藏保留，点击/取值转发回原元素，原脚本流程不受影响；原脚本重绘后自动再转换。`tokens: true` 同时按语义角色统一字阶（标题 / 正文 14 / 辅助 12，AI 区域用 AI UI 字阶）并把原型灰色改为文本 Token。
4. 原页面的弹窗/提示函数改接 `PartnerUI.overlays.modal()` / `.message()`；弹窗带表单或多种确认分支时用 restyle.md 的“镜像”写法，确认逻辑仍由原脚本执行。完整的多画面示例见 restyle.md。
5. 原型里的 AI 面板：结构简单时换成真实 `ChatPanel` + `createChatSession`；与原脚本耦合深时保留原 DOM，用 `ai-panel`（ChatPanel 外观，含发送器布局、`replyActions` 回复操作区、`notes`/`cards`）、`ai-surface`（AI 总结/建议块）、`ai-launcher` 转换，并在交付说明写清。卡片和统计块用 `card` 换成 Workbench 卡片外观。
6. 运行 `check_page.mjs`，**unadapted modules 必须为 0**（每项按含义映射，或标 `layout` / `custom`）；统一页面节奏（面包屑 → 提示 → 卡片用 Foundation 间距，去掉原型叠加的边距）；逐屏截图核对：文字数字不缺，跳转、弹窗、面板开关、发送等流程都能走通。

## 交付前检查

- 浏览器打开无报错。有 Node + Playwright 时运行：
  `node scripts/check_page.mjs my-page/index.html --out shots/`（控制台错误、未注册组件、AI 作用域/高度、写死颜色、自建块清单、改造页面的未覆盖模块 + 截图）。运行时是生产构建，Vue 不输出警告，所以“未注册组件”检查很重要。
- 可见控件都是包组件；改造页面 unadapted modules 为 0；自建块都有 `pui-custom` 并在说明里列出；没有覆盖组件样式、没有改图标、没有写死颜色。
- 状态齐全；主要交互逐一点过（筛选、分页、弹窗、确认、保存、AI 发送/停止/收起）。
- 交付时告诉用户：文件夹位置与打开方式（双击 index.html，`runtime/`、`fonts/` 需与之同级）、演示数据范围、新建组件与待确认项。

## 参考文件（按需读）

当前未提供独立组件图库；以下参考来自已锁定发布包。

- `references/runtime-api.md` — 页面写法、PartnerUI API、模板语法要点、常见问题
- `references/design-rules.md` — 包内规则生成的适用边界与设计使用要求
- `references/tokens.md` — 包内 Token、主题及字体映射
- `references/patterns.md` — 包内组合与 Pattern 规则；六个起步模板见上文 A
- `references/workbench/index.md` → `references/workbench/<asset>.md` — 60 个 Workbench 资产的 props/事件/插槽/设计规则/规格/官方示例
- `references/ai-ui.md` — AI UI 已证实的公开导出、元数据缺口与使用限制；原型聊天 helpers 的契约见 runtime-api.md
- `references/icons.md` — 已登记图标名称（系统、状态、底托、文件、空状态）
- `references/restyle.md` — 改造已有 HTML 的转换器、选项与限制
- 维护者重建：工作区使用根构建命令；独立安装包在 Skill 根安装随附维护依赖后运行 `node maintainer/build.mjs`。重建只读取随附锁定包，日期与版本取 `source.lock.json`；升级和发布由用户决定。
