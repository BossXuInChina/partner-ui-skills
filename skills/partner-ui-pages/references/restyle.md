# 改造已有 HTML（PartnerUI.restyle）

用途：已有静态原型（手写 HTML/CSS/JS），要换成真实组件和 Foundation 样式，同时**保留全部文字、数字、图表、交互流程和原脚本**。

原理：对匹配到的原元素，在它前面挂载对应的包组件，原元素隐藏但保留在 DOM 里；组件的点击/选择会转发给原元素（`click()`、`input`/`change` 事件），所以 `onclick`、事件委托、`data-*` 跳转照常工作。原脚本替换 `innerHTML` 后，MutationObserver 会对新节点重新转换。

## 步骤

1. **复制原文件**到新文件夹，复制 `assets/runtime/` 为同级 `runtime/`（可选 `fonts/`）。不在原文件上直接改。
2. **读结构**：找出“产品画面”的根（如 `.product`、`.app`、`main`），以及哪些是标注/说明/评审区（不改，用 `skip` 排除）。
3. **语义盘点（必做，决定还原度）**：静态 HTML 由普通元素拼成，class 名不等于含义。逐屏列出**每一个可见模块**，按它*表达的意思*归类，再选组件——不是只转换“长得像控件”的部分。写成一张表（模块 → 含义 → 组件/处理 → 规则），交付时附上：

   | 看到的写法 | 实际含义 | 对应 |
   | --- | --- | --- |
   | 一行字 + 色块背景/边框，可能带“查看…”链接 | 页面/卡片提示 | `alert`（按颜色 class 定 type；评审标签用 `exclude` 留在外面） |
   | 两三个带圆点/连线的“时间 + 事项”，或 01/02/03 编号清单 | 流程/步骤、待办核对项 | `steps`（横向/纵向）；按时间先后的事件用 `timeline` |
   | 横条 + 百分比宽度 + 数值 | 占比/进度（包内无图表） | `meter`（自建块，Token 配色） |
   | 白底/灰底/描边盒子，里面有标题、数字、按钮 | 卡片：展示 / 浅色 / 操作（自带按钮） | `card`（`variant: white / tinted / operation / navigation`，`actions`、`inner`） |
   | 大号数字 + 小标签 + 注释 | 指标 | `card` 的 `value` / `label` / `note` |
   | “查看xx →” “xx ›” | 下钻 | `button`（自动去掉箭头，文字按钮改为 `intent: drilldown`，由组件画箭头） |
   | 以 ✦ 开头的标题、页签、按钮 | AI 能力标识 | `smart-mark`；页签/按钮里的 ✦ 自动换成 WorkspaceSmartIcon |
   | AI 回答里的灰底说明块、业务小卡片 | AI 内容块 | `ai-panel` 的 `notes`、`cards` |
   | AI 回答末尾没有操作 | ChatPanel 回复操作区 | `ai-panel` 的 `replyActions`（重新生成 · 复制 · 赞 · 踩） |
   | 只有分栏、分割线的容器 | 纯布局 | `layout`（只做 Token 吸附） |
   | 确实没有对应组件的视觉块 | 自建 | `custom` + `name`（会进入评审清单） |

   **重新生成** 属于回答操作区，不放在面板标题栏；标题栏的“重新开始”是 `panel.newConversation`（新建对话）。
4. **看原脚本**：控件如何响应（`onclick=`、`addEventListener`、委托 `closest('[data-go]')`、读 `.value`）。转换后这些都应继续工作；原脚本会改写文字的区域（如 `data-project-field`），`steps` / `timeline` 会自动跟随原元素更新，按钮类则先不转换或在说明里注明。
5. **在 `</body>` 前加入**：
   ```html
   <link rel="stylesheet" href="runtime/partner-ui-runtime.css">
   <script src="runtime/partner-ui-runtime.js"></script>
   <script>
     PartnerUI.restyle({
       root: '.product',
       skip: '.annotation, .review-note',
       tokens: true,
       rules: [ /* 见下表 */ ],
     })
   </script>
   ```
6. **核对覆盖率**：`node scripts/check_page.mjs index.html --out shots/` 会列出 **unadapted modules**（仍是原型样式的带底色/描边模块、原生控件、字符图标）。在浏览器控制台也可运行 `PartnerUI.restyle.audit()`。每一项都要么按含义映射到组件，要么标为 `layout` / `custom`，直到清单为 0。再逐屏截图、点通主要流程。
7. 交付说明写清：语义映射表、自建块及原因（图表、特殊图标等）、AI 面板为“原型结构 + AI UI 外观”。

## restyle 选项

| 选项 | 默认 | 说明 |
| --- | --- | --- |
| `root` | `document.body` | 选择器或元素；只在这些根内转换 |
| `rules` | 内置通用规则 | `[{ selector, as, …converter 参数 }]`，按顺序执行；`not` 可排除 |
| `tokens` | `false` | 把根内元素用到的页面 CSS（颜色、字号、间距、圆角、阴影、粗体）吸附到 Foundation Token；内联 style 也一并处理（`inlineStyles:false` 关闭；`data-pui-keep` 的元素保留原样） |
| `keep` | — | CSS 选择器（如图表 `'.gauge, .donut'`）：这些元素的内联样式和含这些 class 的 CSS 规则都不做 Token 吸附 |
| `keepSelector` | — | 正则字符串，匹配的 CSS 选择器不做 Token 吸附 |
| `shield` | `true` | 把原页面的裸标签规则（`button{}`、`table{}`、`h3{}`…）限制为不作用于组件内部 |
| `skip` | — | 这些元素及其内部不转换 |
| `observe` | `true` | 监听 DOM 变化自动转换新内容 |
| `typeset` | `tokens` 为 true 时开启 | 按**语义角色**统一字阶：标题（h1–h6 或加粗）→ headline 档；正文 → body 14/22；辅助文字（`small`、class 含 note/desc/label/meta/source/time 等，或 ≤11px）→ 12/20；AI 区域用 AI UI 字阶（正文 14/22、标题 16/24、说明 12/20）。原型灰色（含偏蓝灰）文字同时改为文本 Token。可传 `{ body, caption, heading }` 选择器强制指定；`false` 关闭 |

返回 `{ apply(scope), audit() }`。`PartnerUI.restyle.audit(root)` 返回未覆盖模块清单。

## 转换器（`as`）

| as | 原元素 | 组件 | 参数 |
| --- | --- | --- | --- |
| `topnav` | 站点导航条 | WorkbenchTopNav | `top`（同级的站点/语言条，一并隐藏）、`menu`（菜单容器选择器）、`items`（菜单项，默认 `a, button, span`）、`active`（当前项，默认 `.on, .active, [aria-current]`）、`sites`/`currentSite`/`languages`/`currentLanguage`、`extras`（隐藏的原导航里必须保留的元素，如“场景演示”标签，移到新导航上，可再用 `tag` 规则转换）、`fixHeight: { target, total }` |
| `breadcrumb` | 面包屑 | WorkbenchBreadcrumb | `items`（默认 `a, button, span` 叶子节点）；点击转发到原链接 |
| `tabs` | 页签条 | WorkbenchTabs（标签以 ✦ 开头时用 WorkspaceSmartIcon） | `items`（默认直接子元素）、`active`、`variant`（basic/divider/rail/segment）、`size`、`center`、`follow`（默认 true：原脚本没有更新 active 标记时，组件直接选中被点的页签；设为 false 则完全以原页面标记为准） |
| `table` | 带 `<th>` 的表格 | WorkbenchTable | 单元格内容原样移入（含链接、按钮、标签，内部的 tag/button 先按规则转换）；`caption`、`captionFrom`、`striped` |
| `tag` | 状态标签 | WorkbenchTag | `variant`（默认 status-subtle）、`size`、`status`，或 `statusByClass: { amber: 'warning' }`（内置 green/red/amber/orange/gray/blue 等） |
| `button` | 按钮/文字链 | WorkbenchButton | `appearance`（primary/secondary/text，未给时按 `.primary`/`.link` 推断）、`size`（28/32/36）、`intent`、`drilldown`、`label`。文字末尾的 `→ › >` 自动去掉，文字按钮改为下钻（组件箭头）；开头的 ✦ 换成智慧图标；正文里的文字按钮按文字基线对齐 |
| `input` | `input` / `textarea` | WorkbenchInput | 值双向同步到原元素并触发 `input`/`change` |
| `search` | 搜索框 | WorkbenchSearch | 搜索时向原元素派发 Enter |
| `select` | `<select>` | WorkbenchSelect | 选项取自 `<option>`；选择后同步原 select 并触发 `change` |
| `checkbox` | `input[type=checkbox]`（可在 label 内） | WorkbenchCheckbox | 切换时点击原复选框 |
| `alert` | 提示条 | WorkbenchAlert | `type`（或 `defaultType` + `statusByClass` 按颜色 class 推断）、`surface`、`placement`、`link`（内部链接选择器）、`exclude`（不属于提示文字的子元素，如评审标签，移到提示条外保留） |
| `footer` | 页脚 | WorkbenchFooter | `copyright`、`links`、`registration`（默认不显示备案号） |
| `avatar` | 头像字 | WorkbenchAvatar | `size`、`color` |
| `pedestal` | 图标占位块 | WorkbenchPedestalIcon | `name` 或 `names`（按出现顺序轮换），名称来自 icons.md |
| `smart-tag` | 带 ✦ 的 AI 提示按钮 | WorkspaceSmartTag | `<b>/<strong>` 内文字作为数据强调 |
| `smart-mark` | 以 ✦ 开头的标题 | WorkspaceSmartIcon 替换字符 | `marker` |
| `icon` | 原型里的字符/emoji 图标按钮（仅 AI 区域） | AiIcon | `icon`（AiIcon 名称）、`label` |
| `card` | 原型里的卡片/统计块（只换皮，内容不动） | Workbench Card 外观 + MetricCard 字阶 | `variant`（white / tinted / operation：白底 1px 描边、卡内有独立按钮 / navigation：整卡跳转、阴影）、`title`、`value`、`label`、`note`、`actions`（底部操作区：上方 24px、底部 24px）、`inner`（卡内说明块 → 浅灰底） |
| `steps` | 阶段/里程碑行、编号核对清单 | WorkbenchSteps | `items`、`itemTitle`、`itemDescription`（子选择器）、`variant`（horizontal / vertical）、`size`、`current` 或 `active`；原元素文字变化时自动更新 |
| `timeline` | 按时间先后的事件 | WorkbenchTimeline | `items`、`itemTime`、`itemTitle`、`itemDescription`、`current` |
| `meter` | 横向占比/进度条（无对应组件） | 自建块（`pui-custom`），Foundation 颜色与字阶 | `row`、`label`、`track`、`fill`、`value`、`name` |
| `layout` | 只负责分栏、分割线的容器 | —（标记为已处理，边框用分割线 Token） | — |
| `custom` | 确无对应组件的视觉块 | —（`pui-custom`，进入评审清单） | `name`（写明原因） |
| `ai-surface` | 原型里的 AI 总结/建议块 | AiSummaryCard 外观（AI Token 渐变描边与底色） | `title`（标题选择器） |
| `ai-panel` | 原型里的 AI 助手面板（保留原 DOM 与脚本） | ChatPanel 外观：AI UI 默认头像、气泡、Markdown 表格（14/22、40px 行）、发送器（发送按钮在输入框内右下、免责声明居中在下）、回复操作区、AiIcon 工具 | `head`、`title`、`tools`、`topic`、`body`、`user`、`answer`、`answerTitle`、`composer`、`input`、`disclaimer`、`send`、`icons: { 选择器: { icon, label } }`、`notes`（回答里的灰底说明块）、`cards`（回答里的业务卡片，BusinessNavigationCard 外观）、`cardInner`、`replyActions`（回答容器选择器，追加 重新生成/复制/赞/踩；`onRegenerate(answerEl)` 可接管重新生成）；之后追加的回答自动套用 |
| `ai-launcher` | “✦ 企业AI助手”入口按钮 | WorkspaceSmartIcon + AI 渐变描边 | — （保留原定位与显隐） |

转换器选择器写得越具体越好（`.toolbar button.primary` 优于 `button`）。未知 `as` 会在控制台警告。

## Token 吸附规则（`tokens: true`）

- 中性色 → 文本 primary / secondary / placeholder、分隔线、页面底色、容器白；蓝 → info / 文字操作；红 → error / 品牌；橙 → alert；绿 → success。
- 字号吸附到 12 / 14 / 16 / 18 / 20 / 24 / 28 / 32，行高同步为对应字阶（12/20、14/22、16/24…）；间距吸附到 4 的倍数；圆角吸附到 2/4/6/8/12；阴影统一为 `shadow-sm`；600/700 字重改为 500。
- 只处理根内实际用到的 class 规则和内联样式；组件自身样式不受影响。`.card th`、`.notice b` 这类以裸标签结尾的页面规则不会作用到组件内部（如 WorkbenchTable 表头）。图表区域用 `keepSelector` 或 `data-pui-keep` 排除。

## 原页面的弹窗与提示

原脚本里的 `alert()`、自制弹窗/吐司函数，改为调用：

```js
PartnerUI.overlays.modal({ title: '确认提交？', html: '<p>提交后进入审批。</p>', okText: '提交', onOk: () => submit() })
PartnerUI.overlays.message('已保存', 'success')   // info | success | warning | error | loading
```

弹窗内的 `<a>`、`[data-go]` 点击后自动关闭弹窗，原跳转逻辑继续执行。选项：`cancelText:false` 不显示取消；`onOk` 返回 `false` 保持打开；`onClose` 在取消/×/遮罩关闭时调用；`onOpen(body)` 在正文渲染后调用（可 `rs.apply(body)` 把正文里的 select/textarea 换成组件）。

**原弹窗带表单或多种确认分支时（推荐“镜像”做法）**：原 `modal()` 照常执行（原弹窗用 CSS 隐藏），同时打开 Workbench Modal；点确定时把 Modal 里的表单值按顺序拷回原弹窗，再点击原确认按钮，校验、暂存、下载、二次弹窗都由原脚本完成：

```js
const origModal = window.modal, origClose = window.closeModal
window.modal = function (title, body, action = '知道了', kind = 'close') {
  origModal(title, body, action, kind)
  PartnerUI.overlays.modal({
    title, html: body, okText: action, cancelText: kind === 'close' ? false : '取消',
    onOpen: (el) => rs.apply(el),
    onOk: () => {
      const bodies = document.querySelectorAll('.pui-modal-body'), from = bodies[bodies.length - 1].querySelectorAll('input, select, textarea')
      const card = document.querySelector('.modal-card'), to = card.querySelectorAll('input, select, textarea')
      from.forEach((f, i) => { if (to[i]) to[i].value = f.value })
      card.querySelector('[data-confirm]')?.click()
      return false                       // 由原脚本决定是否关闭（它会调用 closeModal）
    },
    onClose: () => origClose(),
  })
}
window.closeModal = function () { origClose(); PartnerUI.overlays.close() }
window.toast = (t) => PartnerUI.overlays.message(t, 'success')
```
配合 CSS：`.modal { visibility: hidden !important; pointer-events: none !important; } .toast { display: none !important; }`（类名按原页面）。

## 原型里的 AI 面板

- 结构简单（消息列表 + 输入框）：整块替换为真实 `ChatPanel`（外包 `.partner-ai` 并给高度）+ `PartnerUI.createChatSession`，把原型里的问答内容写进 `respond()`，业务卡片用 `pui-template` 渲染器重建。这是最接近真实效果的做法。
- 与原脚本耦合很深（模板克隆、逐步脚本、跨区域联动）：保留原 DOM，用 `ai-panel` 换成 ChatPanel 外观（头像、气泡、表格、输入框、工具与发送图标），面板内按钮再按 `button` 规则转换；页面上的 AI 总结/建议块用 `ai-surface`，入口用 `ai-launcher`。说明里写明“AI 面板为原型结构 + AI UI 外观，非 AI UI 组件实例”。
- 任何情况下都不要手绘或替换 AI 头像、发送、工具栏图标。

## 完整示例：03 经营场景（7 个画面）

产品画面根为 `.product`（1920 画布、`zoom` 缩放），含顶栏、面包屑、页签、上下文提示、卡片、统计块、表格、标签、AI 总结与建议、可开关的 AI 助手面板、弹窗与吐司；设计标注区不改。规则顺序即转换顺序：

```js
const rs = PartnerUI.restyle({
  root: '.product', skip: '.optimization-label',
  tokens: true,
  keep: '.gauge, .donut, .market-pie, .market-legend, .execution-progress, .progress-track',
  rules: [
    { selector: '.site-nav', as: 'topnav', top: '.site-top', menu: '.site-menu', items: 'span', active: '.on', extras: '.scenario-data-tag',
      languages: [{ value: 'zh-CN', label: 'China（简体中文）' }], currentLanguage: 'zh-CN' },
    { selector: 'nav.crumb', as: 'breadcrumb' },
    { selector: '.tabs', as: 'tabs', size: 'large', center: true, follow: false },
    { selector: '.task-context', as: 'alert', type: 'info', surface: 'neutral', link: 'button' },
    // 语义映射：静态模块按含义换成组件
    { selector: '.notice', as: 'alert', defaultType: 'warning', statusByClass: { blue: 'info', red: 'error', green: 'success' }, surface: 'semantic', link: 'button', exclude: '.optimization-label' },
    { selector: '.execution-milestones', as: 'steps', items: ':scope > div', itemTitle: 'span', itemDescription: 'b' },
    { selector: '.pui-modal-body .review-step-list', as: 'steps', variant: 'vertical', items: 'li', itemTitle: 'b', itemDescription: 'p' },
    { selector: '.ops-ledger-bars', as: 'meter', row: ':scope > div', label: 'span', track: 'i', fill: 'i > b', value: 'em' },
    { selector: '.execution-context', as: 'card', variant: 'white', label: ':scope > div > span', value: ':scope > div > b', note: 'small' },
    { selector: '.execution-card', as: 'card', variant: 'operation', title: ':scope > h3', actions: ':scope > footer', inner: '.execution-gap' },
    { selector: '.execution-ledger', as: 'card', variant: 'operation', title: 'h4', value: 'strong' },
    { selector: '.execution-context > div, .ops-overview-grid > section, .execution-prerequisites, .pgi-panel, .project-rec-meta > div, .execution-ledger-owner', as: 'layout' },
    { selector: '.execution-icon, .project-rec-icon', as: 'custom', name: '卡片小图标底托（包内底托图标固定 48px，不适用）' },
    { selector: '.project-rec-stage', as: 'tag', status: 'info' },
    { selector: '.workspace-panel', as: 'ai-panel', head: '.assistant-head', title: '.assistant-head > span', tools: '.assistant-tools',
      topic: '.assistant-topic', body: '.chat-body', user: '.chat-user', answer: '[data-answer-content], .assistant-inline-answer > p',
      answerTitle: '.answer-title', composer: '.assistant-composer', input: '.assistant-input', disclaimer: '.assistant-composer small',
      notes: '.answer-context-strip, .calc', cards: '.project-recommend', cardInner: '.project-rec-meta, .project-rec-reason',
      send: '.send-button', replyActions: '[data-answer-content], .assistant-inline-answer',
      icons: { '[data-action=closepanel]': { icon: 'panel.close', label: '收起 AI 助手' }, '[data-action=assistantreset]': { icon: 'panel.newConversation', label: '新建对话' } } },
    { selector: '.ai-summary, .advice', as: 'ai-surface', title: 'h4' },
    { selector: '.white, .operation-card', as: 'card', variant: 'white', title: ':scope > h3, :scope > h4, :scope > .row > h3, :scope > .row > b' },
    { selector: '.ops-finance-tile', as: 'card', variant: 'tinted', value: 'strong', label: 'span', note: 'small' },
    { selector: '.workspace-launcher', as: 'ai-launcher' },
    { selector: 'h4, .answer-title, .answer-subheading', as: 'smart-mark' },
    { selector: 'table', as: 'table', not: '.chat-body table, .modal table' },
    { selector: '.scenario-data-tag', as: 'tag', variant: 'basic' },
    { selector: '.tag', as: 'tag', statusByClass: { green: 'success', amber: 'warning', red: 'error', gray: 'none' } },
    { selector: '.pgi-grid > .pgi-item > i', as: 'pedestal',
      names: ['book', 'project', 'settings', 'template-management', 'flow', 'fabric-resource-pool'].map((n) => `pedestal/rounded-square/low/${n}/48`) },
    { selector: '.execution-prerequisites > div > b', as: 'tag', variant: 'basic', not: '[data-project-field]' },
    { selector: 'button.amount', as: 'smart-tag' },
    { selector: '.chat-body button, .advice button, td button, .project-rec-footer button', as: 'button', size: '28' },
    { selector: 'button', as: 'button', not: '.icon-button, .send-button, .workspace-launcher, .menu-home, .crumb-link, .modal button' },
    { selector: '.footer', as: 'footer' },
    // 弹窗正文（由 overlays.modal 打开后 rs.apply 处理）
    { selector: '.pui-modal-body textarea, .pui-modal-body input[type=text]', as: 'input' },
    { selector: '.pui-modal-body select', as: 'select' },
  ],
})
```

要点：原脚本按 `data-project-field` 改写文字的元素不转换（`steps` 会跟随原元素更新）；页面节奏（面包屑 → 提示条 → 卡片）在配置 CSS 里用 Foundation 间距统一，去掉原型里叠加的 padding/margin；原脚本在加载时克隆的面板/主区模板仍是原始 HTML，重新插入后由 MutationObserver 自动转换。

## 已知限制

- 画布被 `zoom` / `transform: scale()` 缩放时，TopNav/Tabs 下划线位置会自动按缩放比修正；缩放比很小（如 1920 画布显示在 1200px 宽窗口）时 TopNav 会按自身规则把末尾菜单收进“更多”。
- 原脚本直接修改按钮文字/禁用状态时，已转换的组件不会跟随（组件按转换时的状态渲染）。对这类控件不转换，或改用 `PartnerUI.mount` 重写该区块。
- 图表不转换（包里没有图表组件）：横条类用 `meter`，其余图表用 `keep` 保持原样并在说明中列出。
- 检查脚本在 restyle 页面上跳过“写死颜色”检查（原 CSS 在运行时吸附）。
