<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 反馈对话框 Feedback Dialog — `WorkbenchFeedbackDialog`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-feedback-dialog`](<../../workbench/wb-feedback-dialog.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-feedback-dialog",
  "kind": "component",
  "version": "1.0.0",
  "summary": "围绕一项操作反馈结果、补充信息并提供一个主要动作及可选次要动作；关闭与异步动作通过受控契约管理。",
  "useWhen": ["需要用户阅读结果并作出明确决定的反馈对话框。"],
  "avoidWhen": ["非阻断反馈优先 Message/Notification；一般表单弹窗使用 Modal。","未经验证的公司内部UI框架或生产交付"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchFeedbackDialog"},
  "props": {
    "modelValue": {"type":"Boolean","default":false},
    "type": {"type":"String","default":"info","enum":["info","success","warning","danger","critical","error"]},
    "title": {"type":"String","required":true},
    "message": {"type":"String","required":true},
    "showIcon": {"type":"Boolean","default":true},
    "checkboxLabel": {"type":"String","default":""},
    "checkboxChecked": {"type":"Boolean","default":false},
    "primaryAction": {"type":"Object","required":true},
    "secondaryAction": {"type":"Object","default":null},
    "pending": {"type":"Boolean","default":false},
    "actionHandler": {"type":"Function","default":{"kind":"undefined"}},
    "beforeClose": {"type":"Function","default":{"kind":"undefined"}},
    "showGrid": {"type":"Boolean","default":false}
  },
  "events": ["update:modelValue","update:checkboxChecked","action","close","action-error","close-error"],
  "propNotes": {
    "modelValue": "对话框打开状态。",
    "type": "反馈语义类型。",
    "title": "结果标题，必填。",
    "message": "补充说明，必填。",
    "showIcon": "是否显示语义图标。",
    "checkboxLabel": "可选复选项说明。",
    "checkboxChecked": "受控复选值。",
    "primaryAction": "主要动作配置对象，必填。",
    "secondaryAction": "可选次要动作配置对象或null。",
    "pending": "动作处理中的状态，阻止重复触发。",
    "actionHandler": "异步动作处理函数；返回false会保持打开且不发action-error，抛错或Promise拒绝会发action-error。",
    "beforeClose": "关闭守卫；返回false阻止关闭，支持异步检查。",
    "showGrid": "仅显示布局检查网格，不改变组件行为。"
  },
  "eventNotes": {
    "update:modelValue": {"payload":"关闭请求的false状态。","timing":"Modal的关闭守卫通过并关闭后发出false；打开时由父级更新modelValue。"},
    "update:checkboxChecked": {"payload":"新的复选值。","timing":"用户切换复选框时发出。"},
    "action": {"payload":"动作id。","timing":"用户激活动作时通知宿主；此事件监听返回值不作为异步处理结果。"},
    "close": {"payload":"关闭原因。","timing":"关闭请求通过beforeClose后发出。"},
    "action-error": {"payload":"{action,error}对象。","timing":"actionHandler抛错或Promise拒绝时发出；返回false不视为错误。"},
    "close-error": {"payload":"关闭守卫错误。","timing":"beforeClose抛错或拒绝时发出，面板继续保持打开。"}
  }
}
```

未声明或为空：eventDetails、slots、slotDetails、slotPatterns、exposed、family、slotNotes（不代表支持）

## 规则与适用条件

```json
{
  "rules": [
    {
      "id": "wb-feedback-dialog-rule-1",
      "title": "用途与边界",
      "text": "需要用户阅读结果并作出明确决定的反馈对话框。 非阻断反馈优先 Message/Notification；一般表单弹窗使用 Modal。",
      "strength": "must",
      "status": "confirmed",
      "when": ["使用反馈对话框 Feedback Dialog"],
      "references": []
    },
    {
      "id": "wb-feedback-dialog-rule-2",
      "title": "交互与状态",
      "text": "复用 Modal 的焦点隔离、S尺寸、恢复焦点和关闭守卫；禁用遮罩与Escape关闭。确认操作仅发一次意图，异步期间复选框和两个按钮均禁用。",
      "strength": "must",
      "status": "confirmed",
      "when": ["使用反馈对话框 Feedback Dialog"],
      "references": []
    },
    {
      "id": "wb-feedback-dialog-rule-3",
      "title": "公开API",
      "text": "| 参数 | 合同 |\n| --- | --- |\n| modelValue | 默认false，受控显示 |\n| title / message | 必填标题和正文 |\n| type / showIcon | info（默认）、success、warning、danger、critical、error；图标默认true |\n| checkboxLabel / checkboxChecked | 可选复选文案与受控布尔值 |\n| primaryAction / secondaryAction | 主操作必填、次操作可选；{id,label,disabled?} |\n| pending | 外部异步工作期间禁用按钮与关闭，默认false |\n| actionHandler | 可选(action)=>boolean\\|void\\|Promise；false或抛错保持打开 |\n| beforeClose | 可选(reason)=>boolean\\|void\\|Promise；false阻止关闭 |\n\n事件：update:modelValue、update:checkboxChecked、action(id)、close(reason)、action-error({action,error})、close-error(error)。\naction 是点击意图通知，不等待事件监听器返回值。需要等待业务请求请使用 actionHandler，成功后再执行 beforeClose。处理期间防重复，失败保持上下文并交由调用方展示错误。",
      "strength": "must",
      "status": "confirmed",
      "when": ["使用反馈对话框 Feedback Dialog"],
      "references": []
    }
  ],
  "dependencies": ["wb-button","wb-checkbox","wb-modal"],
  "foundationKeys": ["color-info-primary","color-success","color-warning","color-alert","color-error","color-surface-page","color-surface-overlay","color-text-primary","color-text-secondary","color-text-inverse","color-scrim-modal","color-icon-primary","color-icon-hover","color-border-focus","spacing-component-xs","spacing-component-sm","spacing-component-lg","spacing-layout-action-gap","radius-full","font-body-m","font-body-s","font-headline-s","icon-size-16"],
  "intro": "围绕一项操作反馈结果、补充信息并提供一个主要动作及可选次要动作；关闭与异步动作通过受控契约管理。",
  "sections": [
    {"id":"selection","title":"选型","paragraphs":["适用于操作完成后的结果反馈、继续处理或关闭选择；一般确认用Popconfirm，编辑任务用Modal。"],"bullets":[]},
    {"id":"structure","title":"设计结构与排版","paragraphs":["type决定反馈语义；title/message说明结果；primaryAction必填，secondaryAction可选。checkboxChecked受控，pending表示动作处理中。"],"bullets":[]},
    {"id":"interaction","title":"交互与键盘","paragraphs":["对话框遵循模态焦点管理；pending期间防止重复动作。异步业务用actionHandler，beforeClose控制关闭请求并可异步等待。"],"bullets":[]},
    {"id":"responsibility","title":"使用边界与职责","paragraphs":["组件公开入口为 WorkbenchFeedbackDialog（@workbench/ui-vue3）。当前资格：prototype-only；业务数据、持久化和流程决策由宿主承担。"],"bullets":[]}
  ],
  "related": [{"label":"反馈对话框 Feedback Dialog组件规范","href":"#rules"}]
}
```

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "controlled-example",
  "title": "导入结果反馈对话框",
  "portability": "portable",
  "source": {
    "kind": "studio-official-usage",
    "ownerAssetId": "wb-feedback-dialog",
    "scenarioId": "feedback-dialog",
    "exampleId": "controlled-example",
    "codeSha256": "sha256:79f5c85b6e6d19440d3351c8bc1c3fea5b1a2667c5890d3c82d407443020efc7"
  },
  "description": "导入结果反馈对话框业务场景的完整Vue示例，包含公开组件导入和所需数据。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchFeedbackDialog, WorkbenchButton } from '@workbench/ui-vue3'
const open = ref(false)
const pending = ref(false)
const primaryAction = { id: 'view', label: '查看报告' }
async function actionHandler(action) { pending.value = true; try { return action.id === 'view' } finally { pending.value = false } }
async function beforeClose() { return true }
</script>
<template>
  <WorkbenchButton appearance="secondary" @click="open = true">查看导入结果</WorkbenchButton>
  <WorkbenchFeedbackDialog v-model="open" type="success" title="导入完成" message="已导入12条联系人。" :primary-action="primaryAction" :pending="pending" :action-handler="actionHandler" :before-close="beforeClose" />
</template>
```
