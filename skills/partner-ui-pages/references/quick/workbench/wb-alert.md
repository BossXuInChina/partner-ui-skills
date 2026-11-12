<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 提示条 Alert — `WorkbenchAlert`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-alert`](<../../workbench/wb-alert.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-alert",
  "kind": "component",
  "version": "1.1.0",
  "summary": "在页面上下文中持续呈现需要用户阅读的状态、风险或操作说明，直到用户关闭或宿主更新状态。",
  "useWhen": ["页面、卡片、对话框、产品区的持续提示；内容留在页面流中。"],
  "avoidWhen": ["瞬时操作结果使用 Message；需要显式确认使用 Feedback Dialog。","未经验证的公司内部UI框架或生产交付"],
  "status": {"maturity":"prototype-validated","deliveryEligibility":"prototype-only"},
  "usageStatus": "supported",
  "variantStatus": "unsupported",
  "variantUnsupported": [
    {
      "code": "CUSTOM_VARIANT_GALLERY",
      "reason": "A custom gallery or indirect scenario factory owns the rendered cases; manifest declarations are preserved, but are not claimed as an exhaustive portable gallery."
    }
  ]
}
```

未声明或为空：unsupported、usageUnsupported、caseSemantics（不代表支持）

## 公开 API

包内声明原样列出；null 与“未声明或为空”字段不代表支持，不猜测签名、嵌套类型或动态 slot 名。

```json
{
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchAlert"},
  "props": {
    "modelValue": {"type":"Boolean","default":true},
    "type": {"type":"String","default":"info","enum":["info","success","warning","danger","critical","error"]},
    "message": {"type":"String","required":true},
    "linkLabel": {"type":"String","default":""},
    "linkHref": {"type":"String","default":""},
    "showIcon": {"type":"Boolean","default":true},
    "showClose": {"type":"Boolean","default":true},
    "checkboxLabel": {"type":"String","default":""},
    "checkboxChecked": {"type":"Boolean","default":false},
    "surface": {"type":"String","default":{"kind":"undefined"},"enum":["semantic","neutral"]},
    "placement": {"type":"String","default":"page","enum":["product","global","page","card","dialog"]}
  },
  "events": ["update:modelValue","update:checkboxChecked","link","close"],
  "propNotes": {
    "modelValue": "是否显示；默认为true，父级通过update:modelValue更新。",
    "type": "提示语义类型。",
    "message": "必填提示正文。",
    "linkLabel": "链接文案，须与linkHref配对。",
    "linkHref": "真实导航地址。",
    "showIcon": "是否显示语义图标。",
    "showClose": "是否显示关闭按钮。",
    "checkboxLabel": "可选复选项文案。",
    "checkboxChecked": "受控复选框状态。",
    "surface": "semantic使用语义表面；neutral使用中性表面。",
    "placement": "提示位于product、global、page、card或dialog上下文。"
  },
  "eventNotes": {
    "update:modelValue": {"payload":"新的显示状态。","timing":"用户关闭提示时发出false。"},
    "update:checkboxChecked": {"payload":"新的复选状态。","timing":"用户切换复选框时发出。"},
    "link": {"payload":"包含href的导航对象。","timing":"激活链接时发出；不会拦截浏览器导航。"},
    "close": {"payload":"{reason:'button',checkboxChecked}关闭信息。","timing":"用户关闭提示时发出；偏好持久化由宿主实现。"}
  }
}
```

未声明或为空：eventDetails、slots、slotDetails、slotPatterns、exposed、family、slotNotes（不代表支持）

## 规则与适用条件

```json
{
  "rules": [
    {"id":"wb-alert-rule-1","title":"用途与边界","text":"页面、卡片、对话框、产品区的持续提示；内容留在页面流中。 瞬时操作结果使用 Message；需要显式确认使用 Feedback Dialog。","strength":"must","status":"confirmed","when":["使用提示条 Alert"],"references":[]},
    {"id":"wb-alert-rule-2","title":"交互与状态","text":"关闭发出受控更新及关闭事件；复选项使用原生键盘操作，链接不关闭提示。","strength":"must","status":"confirmed","when":["使用提示条 Alert"],"references":[]},
    {
      "id": "wb-alert-rule-3",
      "title": "公开API",
      "text": "| 参数 | 合同 |\n| --- | --- |\n| modelValue | Boolean，默认 true；受控显示，父级消费 update:modelValue |\n| type | info（默认）、success、warning、danger、critical、error |\n| message / linkLabel / linkHref | 必填正文；链接文案与真实导航地址必须成对提供 |\n| showIcon / showClose | Boolean，默认 true |\n| checkboxLabel / checkboxChecked | 可选复选文案；受控选中值，默认 false |\n| surface | semantic / neutral；未传时 product、global 为 neutral，其他为 semantic |\n| placement | page（默认）、product、global、card、dialog |\n\n事件：`update:modelValue(false)`、`close({reason:'button',checkboxChecked})`、`update:checkboxChecked(boolean)`、`link({href})`。链接保留浏览器默认导航，事件只用于埋点或旁路监听。关闭不负责持久化“不再提示”，业务方保存偏好。",
      "strength": "must",
      "status": "confirmed",
      "when": ["使用提示条 Alert"],
      "references": []
    },
    {
      "id": "wb-alert-real-navigation",
      "title": "真实导航链接",
      "text": "链接文案与linkHref成对提供，复用WorkbenchLink和Link状态链；原生导航与link事件同时保留，事件不阻止默认导航。缺地址时不渲染伪链接。",
      "strength": "must",
      "status": "confirmed",
      "when": ["提示内容包含导航入口"],
      "references": []
    }
  ],
  "dependencies": ["wb-checkbox","wb-link"],
  "foundationKeys": ["color-info-primary","color-info-secondary-subtle","color-success","color-success-primary-subtle","color-warning","color-warning-subtle","color-alert","color-alert-subtle","color-error","color-error-subtle","color-none-subtle","color-text-primary","color-text-inverse","color-icon-primary","color-icon-hover","color-border-focus","radius-lg","icon-size-16","font-body-m","font-body-s","spacing-component-sm","spacing-component-md","spacing-component-lg","spacing-layout-container-inline","spacing-layout-container-block","spacing-layout-content-gap","spacing-layout-section-gap-large","spacing-screen-edge-compact","spacing-screen-edge-expanded","color-icon-active"],
  "intro": "在页面上下文中持续呈现需要用户阅读的状态、风险或操作说明，直到用户关闭或宿主更新状态。",
  "sections": [
    {"id":"selection","title":"选型","paragraphs":["用于长期可见的页面、卡片或对话框说明；短时操作反馈用Message，多条异步事件用Notification。"],"bullets":[]},
    {"id":"structure","title":"设计结构与排版","paragraphs":["type表达语义，surface和placement确定承载位置和表面。链接、复选项和关闭入口独立呈现；关闭不保存“不再提示”偏好。"],"bullets":[]},
    {"id":"interaction","title":"交互与键盘","paragraphs":["关闭和复选框使用原生操作语义；链接执行浏览器默认导航。关闭会发出受控更新与close事件。"],"bullets":[]},
    {"id":"responsibility","title":"使用边界与职责","paragraphs":["组件公开入口为 WorkbenchAlert（@workbench/ui-vue3）。当前资格：prototype-only；业务数据、持久化和流程决策由宿主承担。"],"bullets":[]}
  ],
  "related": [{"label":"提示条 Alert组件规范","href":"#rules"}]
}
```

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "controlled-example",
  "title": "付款方式到期提示",
  "portability": "portable",
  "source": {"kind":"studio-official-usage","ownerAssetId":"wb-alert","scenarioId":"alert","exampleId":"controlled-example","codeSha256":"sha256:b96ffbad1ce715af3baad96c6570214b490b6f7a09eae9aea94ec9ce60fd0aed"},
  "description": "付款方式到期提示业务场景的完整Vue示例，包含公开组件导入和所需数据。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchAlert } from '@workbench/ui-vue3'
const visible = ref(true)
const checked = ref(false)
</script>
<template><WorkbenchAlert v-model="visible" type="warning" message="付款方式将在本月底失效。" link-label="更新付款方式" link-href="/billing" checkbox-label="我已知晓" v-model:checkbox-checked="checked" /></template>
```
