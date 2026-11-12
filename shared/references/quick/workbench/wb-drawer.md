<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 抽屉 Drawer — `WorkbenchDrawer`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-drawer`](<../../workbench/wb-drawer.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-drawer",
  "kind": "component",
  "version": "1.0.0",
  "summary": "在页面边缘承载一项可独立完成的任务、扩展信息或配置内容；内容区可滚动，面板关闭受控。",
  "useWhen": ["Drawer首版容器"],
  "avoidWhen": ["嵌套、拖拽、手势及未经验证的内部框架生产场景"],
  "status": {"maturity":"prototype-validated","deliveryEligibility":"prototype-only"},
  "usageStatus": "supported",
  "variantStatus": "supported",
  "caseSemantics": "Studio controls, not public component props"
}
```

未声明或为空：unsupported、usageUnsupported、variantUnsupported（不代表支持）

## 公开 API

包内声明原样列出；null 与“未声明或为空”字段不代表支持，不猜测签名、嵌套类型或动态 slot 名。

```json
{
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchDrawer"},
  "props": {
    "modelValue": {"type":"Boolean","default":false},
    "title": {"type":"String","required":true},
    "placement": {"type":"String","default":"right","enum":["right","bottom"]},
    "modal": {"type":"Boolean","default":true},
    "panelSize": {"type":["String","Number"],"default":{"kind":"undefined"}},
    "closeOnMask": {"type":"Boolean","default":true},
    "closeOnEsc": {"type":"Boolean","default":true},
    "actions": {"type":"Array","default":{"kind":"function"}},
    "beforeClose": {"type":"Function","default":{"kind":"undefined"}}
  },
  "events": ["update:modelValue","close","action"],
  "slots": ["default","footer"],
  "exposed": [{"name":"requestClose","declaration":"requestClose(reason?: string): Promise<boolean>;"}],
  "propNotes": {
    "modelValue": "面板是否打开；父级通过 update:modelValue 接收关闭请求并更新状态。",
    "title": "面板标题；必填，超长时组件保留全文提示。",
    "placement": "right 从页面右侧进入；bottom 从底部进入。",
    "modal": "true 时显示遮罩、隔离背景并管理焦点和滚动；false 时页面其余区域仍可操作。",
    "panelSize": "面板目标尺寸，数字按像素处理；有效CSS长度可用于任务内定宽，视口仍限制最大尺寸。",
    "closeOnMask": "是否允许点击遮罩发起关闭请求。",
    "closeOnEsc": "是否允许 Escape 发起关闭请求。",
    "actions": "底部操作配置数组；只有配置为 closeOnClick 的操作会走关闭守卫。",
    "beforeClose": "关闭守卫，可同步或异步返回 false 阻止关闭；应用于按钮、遮罩、Escape和关闭型Action。"
  },
  "eventNotes": {
    "update:modelValue": {"payload":"新的打开状态；关闭操作请求false。","timing":"关闭通过守卫后发出，调用方更新v-model。"},
    "close": {"payload":"关闭原因。","timing":"关闭请求通过守卫并实际关闭时发出。"},
    "action": {"payload":"被触发的Action数据。","timing":"点击面板配置的底部操作时发出。"}
  },
  "slotNotes": {
    "default": {"scope":"面板正文，可放置表单、说明或业务内容。","description":"正文区由面板管理滚动；输入数据和校验仍由宿主负责。"},
    "footer": {"scope":"替代默认actions渲染的底部操作内容；插槽参数提供requestClose(reason)。","description":"提供该插槽后自行管理操作按钮和业务回调；是否关闭由宿主逻辑控制。"}
  }
}
```

未声明或为空：eventDetails、slotDetails、slotPatterns、family（不代表支持）

## 规则与适用条件

```json
{
  "rules": [
    {
      "id": "wb-drawer-rule-2",
      "title": "预览入口 `/preview/WB-DRAWER-V1/drawer`。首版覆盖",
      "text": "预览入口 `/preview/WB-DRAWER-V1/drawer`。首版覆盖右侧/底部与模态/非模态四种组合，标题、关闭按钮和内容区始终存在，底部操作区按配置展示。",
      "strength": "must",
      "status": "confirmed",
      "when": ["Drawer首版"],
      "references": []
    },
    {
      "id": "wb-drawer-rule-4",
      "title": "右侧最小宽度 296px、底部最小高度 360px 为本轮人工确认的原型参数。面",
      "text": "右侧最小宽度 296px、底部最小高度 360px 为本轮人工确认的原型参数。面板尺寸默认按内容自适应，`panelSize` 接受合法 CSS 长度或数字像素值，组件仍以视口作为上限。480px 仅为配置能力的预览示例，不是正式默认值。",
      "strength": "must",
      "status": "confirmed",
      "when": ["Drawer首版"],
      "references": []
    },
    {
      "id": "wb-drawer-rule-6",
      "title": "面板统一管理左右 24px、上下 20px 内边距；存在 Action 时底部改",
      "text": "面板统一管理左右 24px、上下 20px 内边距；存在 Action 时底部改为 24px。标题到内容区 16px，内容区到 Action 24px，三段之间不使用分割线。标题使用 `font-headline-s`（16px/24px/500），最长占位与 16px 关闭按钮保持 16px 间距；超长标题单行省略并通过 `title` 保留全文。示意表单复用现有 Workbench Input、Select 与 Checkbox，不模拟原生控件外观。",
      "strength": "must",
      "status": "confirmed",
      "when": ["Drawer首版"],
      "references": []
    },
    {
      "id": "wb-drawer-rule-8",
      "title": "关闭按钮直接使用 16px 原生图标按钮，不叠加可见外容器，图标右缘与面板保持 ",
      "text": "关闭按钮直接使用 16px 原生图标按钮，不叠加可见外容器，图标右缘与面板保持 24px。内容区直接复用 `wb-scrollbar`：10px 轨道和 4px 可见滑块贴面板右边缘，通过稳定 gutter 与补偿后的内容内边距保证滚动条出现前后正文宽度不变。",
      "strength": "must",
      "status": "confirmed",
      "when": ["Drawer首版"],
      "references": []
    },
    {
      "id": "wb-drawer-rule-10",
      "title": "模态模式使用遮罩、背景 inert、页面滚动锁定与焦点圈定；非模态模式仅允许面板",
      "text": "模态模式使用遮罩、背景 inert、页面滚动锁定与焦点圈定；非模态模式仅允许面板自身接收浮层指针事件，面板以外仍由原页面响应。关闭按钮、Escape、遮罩和配置为 `closeOnClick` 的 Action 均经过 `beforeClose`。",
      "strength": "must",
      "status": "confirmed",
      "when": ["Drawer首版"],
      "references": []
    },
    {
      "id": "wb-drawer-rule-12",
      "title": "动效时长、缓动和 Preview 层级尚无 Foundation 决策，保留 T",
      "text": "动效时长、缓动和 Preview 层级尚无 Foundation 决策，保留 Task-local proposed Candidate；减少动态效果偏好下取消过渡。本版已批准为 prototype-validated / prototype-only，未验证内部框架生产适配。",
      "strength": "must",
      "status": "confirmed",
      "when": ["Drawer首版"],
      "references": []
    },
    {
      "id": "wb-drawer-rule-14",
      "title": "正式实现位于[internal reference omitted]",
      "text": "正式实现位于[internal reference omitted] `--overlay-layer` 提供层级；正式默认不设置动效，预览动效及层级候选不属于批准规则。模态开启时隔离当前面板与其aria-controls关联浮层以外的背景，关闭或卸载仅释放本实例持有的隔离和滚动锁。关闭状态挂载、非模态模式不修改页面滚动设置。",
      "strength": "must",
      "status": "confirmed",
      "when": ["Drawer首版"],
      "references": []
    }
  ],
  "dependencies": ["wb-button","wb-scrollbar"],
  "foundationKeys": ["color-surface-overlay","color-surface-page","color-scrim-modal","color-text-primary","color-text-secondary","color-icon-primary","color-icon-hover","color-border-focus","color-border-separator","color-scrollbar-thumb-fill-hover","spacing-component-xs","spacing-component-sm","spacing-component-md","spacing-component-lg","spacing-layout-container-block","spacing-layout-container-inline","spacing-layout-content-gap","spacing-layout-action-gap","spacing-dialog-padding-block-end-with-actions","radius-none","radius-full","shadow-l-base","shadow-t-m","font-body-m","font-body-s","font-headline-m","font-headline-s","icon-size-16","color-icon-active"],
  "intro": "在页面边缘承载一项可独立完成的任务、扩展信息或配置内容；内容区可滚动，面板关闭受控。",
  "sections": [
    {"id":"selection","title":"选型","paragraphs":["编辑任务需要较大连续空间并保留当前页面上下文时使用 Drawer；短确认或小型单步操作使用 Modal。右侧适合纵向表单，底部适合横向工具面板。"],"bullets":[]},
    {"id":"structure","title":"设计结构与排版","paragraphs":["标题、正文和可选操作区属于固定结构；右侧和底部位置共享内容层级。模态模式隔离背景并锁定页面滚动，非模态模式保留页面其余区域操作。"],"bullets":[]},
    {"id":"interaction","title":"交互与键盘","paragraphs":["关闭按钮与 Escape 可关闭；模态下焦点留在面板内，关闭后恢复触发点。遮罩关闭与 Action 关闭均先调用 beforeClose。"],"bullets":[]},
    {"id":"responsibility","title":"使用边界与职责","paragraphs":["组件公开入口为 WorkbenchDrawer（@workbench/ui-vue3）。当前资格：prototype-only；业务数据、持久化和流程决策由宿主承担。"],"bullets":[]}
  ],
  "related": [{"label":"抽屉 Drawer组件规范","href":"#rules"}]
}
```

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "project-filter-drawer",
  "title": "编辑设置抽屉",
  "portability": "portable",
  "source": {
    "kind": "studio-official-usage",
    "ownerAssetId": "wb-drawer",
    "scenarioId": "drawer",
    "exampleId": "project-filter-drawer",
    "codeSha256": "sha256:b96c23165800984c115abbeacd5598e52e6c61fbb7383834493acc2c95c3c60a"
  },
  "description": "编辑设置抽屉场景示例展示组件在该业务流程中的职责，并附可直接运行的Vue代码。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchDrawer, WorkbenchButton } from '@workbench/ui-vue3'
const open = ref(false)
const saved = ref(false)
const actions = [{ id: 'cancel', label: '取消', closeOnClick: true }, { id: 'apply', label: '应用', closeOnClick: true }]
function beforeClose() { return true }
function handleAction(action) { if (action.id === 'apply') saved.value = true }
</script>
<template>
  <WorkbenchButton appearance="secondary" @click="open = true">编辑配置</WorkbenchButton>
  <WorkbenchDrawer v-model="open" title="编辑通知规则" placement="right" :actions="actions" :before-close="beforeClose" @action="handleAction">
    <p>{{ saved ? '配置已应用' : '设置通知的接收范围。' }}</p>
  </WorkbenchDrawer>
</template>
```
