# 既有 HTML 流程

需要保留原文件结构、使用六个经典模板或改造已有 HTML 时阅读。新建多页 Demo 默认使用 [JS 项目模式](project.md)。下列命令从 Skill 根目录执行。

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

