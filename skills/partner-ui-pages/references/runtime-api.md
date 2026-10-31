# 运行时与页面写法

## 页面骨架

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>页面名称</title>
  <link rel="stylesheet" href="fonts/partner-ui-fonts.css">        <!-- 可选：HarmonyOS Sans；没有 fonts/ 时删掉，自动回退系统字体 -->
  <link rel="stylesheet" href="runtime/partner-ui-runtime.css">
</head>
<body class="pui-page">
  <div id="app"></div>

  <script type="text/x-template" id="page">
    <WorkbenchTopNav :tabs="nav.tabs" :sites="nav.sites" v-model:active-tab="nav.active" />
    <main class="pui-container pui-stack" style="padding-block: 16px 32px">
      <WorkbenchBreadcrumb :items="crumbs" />
      <section class="pui-surface pui-stack">
        <h1 class="pui-title-l">协议管理</h1>
        <WorkbenchTable caption="协议列表" :columns="columns" :rows="rows" row-key="id" />
      </section>
    </main>
  </script>

  <script src="runtime/partner-ui-runtime.js"></script>
  <script>
    const { ref, reactive, computed } = Vue
    PartnerUI.mount('#app', {
      template: '#page',
      setup() {
        const nav = reactive({ tabs: [{ value: 'home', label: '首页' }, { value: 'ops', label: '经营' }], sites: [{ value: 'partner', label: '企业伙伴网站' }], active: 'ops' })
        const crumbs = [{ id: 'home', label: '伙伴工作台', href: '#' }, { id: 'cur', label: '协议管理' }]
        const columns = [{ key: 'name', title: '协议名称', primary: true }, { key: 'status', title: '状态' }]
        const rows = ref([{ id: 1, name: '华东区分销框架协议', status: '待续签' }])
        return { nav, crumbs, columns, rows }
      },
    })
  </script>
</body>
</html>
```

- 运行时是普通 `<script>`（不是 module），`file://` 双击可用。必须放在页面脚本之前。
- 运行时同时提供全局 `Vue`（若页面没有自带）和 `PartnerUI`。
- 运行时是生产构建：Vue 不输出开发警告（拼错组件名会静默渲染成未知标签）。用 `scripts/check_page.mjs` 检查未注册组件；运行出错时控制台有 `[PartnerUI]` 前缀的错误。

## 模板写法要点

公开 SFC 示例只有标为 portable 且含代码时才可转换；unsupported 示例保留元数据但不提供源码，不要从维护源码补取。AI UI 尚未发布组件 API 元数据，运行时组件名单不等于 props/事件契约。

转换官方 SFC 时保留原示例状态、事件和插槽行为：公开组件 import 改为全局组件名，Vue import 改用 `PartnerUI.Vue`（或与之相同的全局 `Vue`）；把 `<script setup>` 的值与函数放进 `setup()` 并显式 return，把 `<template>` 放入 `text/x-template`。无法表达的私有依赖需报告，不可随意改写。产品工程保留 SFC 并转交 `partner-ui-vue3`。

- **模板必须写在 `<script type="text/x-template">` 里**（或 JS 字符串），不要直接写在 `#app` 的 HTML 里：浏览器会把 `<WorkbenchButton />` 小写化并破坏自闭合标签。
- 组件全部已全局注册，直接用导出名：`<WorkbenchButton>`、`<ChatPanel>`、`<WorkspaceSmartCard>`…（完整列表：`PartnerUI.workbenchComponents` / `PartnerUI.aiComponents`）。
- props 在模板里写 kebab-case 或 camelCase 均可：`row-key="id"`、`:selected-row-keys="sel"`。
- 双向绑定：`v-model`（modelValue）、`v-model:active-tab`、`v-model:selected-row-keys`、`v-model:open` 等，名称见组件文件的 `update:*` 事件。
- 插槽：`<template #header>…</template>`、作用域插槽 `<template #cell-status="{ row }">…</template>`。
- 官方示例是 SFC（`<script setup>` + import）。改成页面写法时：删掉 import，把 `ref/reactive` 换成 `Vue.ref` 等，把 setup 里声明的变量 `return` 出来。
- 页面里不需要 `<style scoped>`；自建块的样式写在 `<style>` 里并只用 Token。

## PartnerUI API

| API | 说明 |
| --- | --- |
| `PartnerUI.mount(target, options)` | 创建应用、注册全部组件并挂载；`options` 为普通 Vue 组件选项（`template`、`setup`、`data`…）。返回 `{ app, vm }`。 |
| `PartnerUI.createApp(options)` | 只创建（已注册组件、已设置独立 `idPrefix`），需要自行 `app.mount()`；可在挂载前 `app.provide()` 等。 |
| `PartnerUI.install(app)` | 给自建的 Vue app 注册全部组件。 |
| `PartnerUI.Workbench` / `PartnerUI.AI` | 两个包的完整导出（组件、类型以外的运行时导出，如 `defaultAiIcons`）。 |
| `PartnerUI.BubbleRenderers` | TinyRobot 内置消息渲染器（Markdown 等），用于高级自定义。 |
| `PartnerUI.chatRenderers` | 本地演示用的 ChatPanel 内容渲染器（ai-summary、business-navigation、agreement-table、pui-template），不代表 AI 包的业务协议。 |
| `PartnerUI.createChatSession({ respond, delay, initialMessages })` | ChatPanel 的本地会话状态与发送/停止/重试处理（演示用）。 |
| `PartnerUI.mockAgreementAdapter({ answers, fallback, agreements })` | AgreementAssistantPanel 的本地模拟 adapter（演示用）。 |
| `PartnerUI.mockStream(reply, signal)` | 把文字和卡片转成流式增量（自写 adapter 时用）。 |
| `PartnerUI.welcomeIcon(name, kind?)` | 给 AI 面板 `welcomeEntries[].icon` 用的业务图标（已登记的 Workbench 系统图标；`kind='pedestal'` 用底托图标）。 |
| `<PuiAssistantCloseButton @click>` | AI 面板 `#toolbar-end` 插槽里的“收起助手”按钮（与 AI UI 官方宿主示例同一实现）。 |
| `PartnerUI.overlays.modal({...})` / `.close()` / `.message(text, type)` | 命令式 Workbench Modal / Message，供非 Vue 代码调用。 |
| `PartnerUI.restyle({...})` | 改造已有 HTML（见 restyle.md）。 |
| `PartnerUI.versions` | 运行时与各包版本。 |

一个页面可以 `mount` 多个独立区域；每个应用有不同 `idPrefix`，AI 组件 ID 不会冲突。多个 AI 面板若需要独立历史，给 `historyOptions.namespace` 不同的值。

## 页面骨架工具类（只用 Foundation Token）

| 类名 | 作用 |
| --- | --- |
| `pui-page` | body：Workbench 页面底色、正文字阶、字体栈 |
| `pui-container` | 版心：左右 32px 安全边距，超宽 1856px 居中 |
| `pui-grid` + `pui-span-{3,4,6,8,12,16,18,24}` | 24 列栅格（<1280px 自动 12 列），沟槽 16px |
| `pui-stack` / `pui-row` / `pui-between` | 纵向 16px / 横向 12px 间距，`--pui-gap` 可调 |
| `pui-surface` | 白色容器，8px 圆角，20px 24px 内边距（需要卡片语义时优先用 `WorkbenchCard`） |
| `pui-title-l/m/s`、`pui-text`、`pui-text-s`、`pui-muted`、`pui-num` | 字阶 headline-l/m/s、body-m、body-s、次要文字、等宽数字 |
| `pui-ai-frame` | 给独立 AI 面板一个确定高度（默认 720px）；与 `partner-ai` 一起用 |
| `pui-title-xxl/xl` | headline-xxl 28/36、headline-xl 24/32（页面主标题） |
| `pui-display` | display-xs 24/40 数字展示 |
| `pui-custom` | 标记“包里没有、自建”的块；给 `<body data-pui-review>` 可显示橙色虚线便于评审 |

## 常见问题

- **AI 组件不显示 / 高度为 0**：`ChatPanel`、`AgreementAssistantPanel` 必须放在有明确高度的容器里（`.pui-ai-frame` 或 `AssistantHostLayout` 的 `#assistant` 插槽）。除 `AgreementAssistantPanel` 和 `AssistantHostLayout` 外，AI 组件（含独立 `ChatPanel`）外层都要有 `class="partner-ai"`（AI Token 作用域，缺失会导致动效报错、样式缺失）；卡片类再加 `style="height:auto;background:transparent"`。
- **弹层位置**：Modal、Drawer、Dropdown、Popover、Tooltip、Popconfirm、Select 面板都会挂到 body。不要强制 `open` 常开来“展示”，用按钮触发。
- **Table 报 caption 警告**：给 `caption` 或 `aria-label`。
- **Breadcrumb**：`navigate` 事件参数为 `(item, event)`；不想跳转时 `event.preventDefault()`。
- **Footer 默认带备案号**：不需要时传 `:registration="{ id: 'registration', label: '' }"`。
- **图标找不到**（控制台 `ICON_NOT_FOUND`）：名称必须来自 `icons.md`；系统图标的 `_14px` 别名不要再传不同 `size`。
- **深色主题**：Workbench 组件用 `data-wb-theme="dark"` 切换；AI UI 有自己的主题 Token。默认按浅色交付，除非需求要求。
- **字体**：组件不带字体。`fonts/partner-ui-fonts.css` 加载 HarmonyOS Sans（原样文件，附许可，页面需保留“本页面使用 HarmonyOS Sans 字体”声明）；未加载时回退系统字体，字阶不变。
