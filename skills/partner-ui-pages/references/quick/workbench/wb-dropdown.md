<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 下拉菜单 Dropdown — `WorkbenchDropdown`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-dropdown`](<../../workbench/wb-dropdown.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-dropdown",
  "kind": "component",
  "version": "1.1.0",
  "summary": "用于组合操作项、单选配置项和复选配置项的菜单。字段选择、复杂筛选或月份面板使用专门选择器或组合面板。",
  "useWhen": ["操作与单选、复选配置混合菜单"],
  "avoidWhen": ["表单字段选择、异步搜索、嵌套子菜单","未经验证的内部 UI 框架或生产交付"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchDropdown"},
  "props": {
    "size": {"type":"String","default":"default","enum":["small","default","large"]},
    "triggerType": {"type":"String","default":"button","enum":["button","text","icon"]},
    "textIntent": {"type":"String","default":"drilldown","enum":["action","drilldown"]},
    "textLayout": {"type":"String","default":"container","enum":["container","inline"]},
    "panelWidth": {"type":"String","default":"auto","enum":["auto","min","max"]},
    "items": {"type":"Array","required":true},
    "radioValues": {"type":"Object","default":{"kind":"function"}},
    "checkboxValues": {"type":"Array","default":{"kind":"function"}},
    "disabled": {"type":"Boolean"},
    "open": {"type":"Boolean","default":{"kind":"undefined"}},
    "ariaLabel": {"type":"String","default":"下拉菜单"}
  },
  "events": ["action","update:radio","update:checked","update:open"],
  "slots": ["trigger"],
  "propNotes": {
    "size": "small、default或large菜单尺寸。",
    "triggerType": "button、text或icon入口样式。",
    "textIntent": "文字触发器的action或drilldown语义。",
    "panelWidth": "auto、min或max宽度策略。",
    "items": "必填菜单项数组；id唯一，type按菜单项语义配置。",
    "radioValues": "groupId到已选value的对象映射。",
    "checkboxValues": "当前选中菜单项id数组。",
    "disabled": "禁用触发器并关闭菜单。",
    "open": "展开状态；传入时受控并响应update:open。",
    "ariaLabel": "菜单触发器可访问名称。"
  },
  "eventNotes": {
    "action": {"payload":"{ id }，被触发操作项的id。","timing":"激活action类型项目后发出。"},
    "update:radio": {"payload":"{ groupId, value }。","timing":"radio选择值变化时发出；父级更新radioValues。"},
    "update:checked": {"payload":"{ id, checked }。","timing":"checkbox状态切换时发出；父级更新checkboxValues。"},
    "update:open": {"payload":"新的Boolean展开状态。","timing":"菜单打开或关闭时发出；受控调用方应同步open。"}
  },
  "slotNotes": {"trigger":{"scope":"{ open, selectedItems, summary, toggle, aria }","description":"自定义触发器内部内容；不要在slot中嵌套另一个交互按钮或链接。"}}
}
```

未声明或为空：eventDetails、slotDetails、slotPatterns、exposed、family（不代表支持）

## 规则与适用条件

```json
{
  "rules": [
    {"id":"wb-dropdown-rule-1","title":"选型边界","text":"操作与单选、复选配置混合菜单；不适用于表单字段选择、异步搜索、嵌套子菜单","strength":"must","status":"confirmed","when":["操作与单选、复选配置混合菜单"],"references":[]},
    {
      "id": "wb-dropdown-rule-2",
      "title": "交互与调用合同",
      "text": "`items` 中 id 唯一；type 为 action/radio/checkbox/label/separator，radio 需 group 与 value。业务状态由调用方控制。trigger 插槽接收 open、selectedItems、summary、toggle、aria；调用方可选择在触发器、外部关联区域或完全不回显，Dropdown 不管理外部布局，也不提供回显位置 Prop。方向键、Home/End、Escape与焦点恢复保持菜单合同。",
      "strength": "must",
      "status": "confirmed",
      "when": ["操作与单选、复选配置混合菜单"],
      "references": []
    },
    {
      "id": "wb-dropdown-rule-3",
      "title": "复用边界",
      "text": "复选标记复用正式 choice/ChoiceMark内部原语及wb-checkbox/wb-radio设计合同。按钮式触发器复用Button secondary。文字式触发器通过textIntent区分action与drilldown，默认drilldown；操作型使用完整Text Action状态链，下钻/披露型依次使用color-text-primary、color-text-action-hover、color-text-action-active与color-text-disabled，展开期间持续使用active色。图标式触发器复用Button icon。各入口focus outline均为2px、偏移2px。",
      "strength": "must",
      "status": "confirmed",
      "when": ["操作与单选、复选配置混合菜单"],
      "references": []
    }
  ],
  "dependencies": ["wb-button","wb-checkbox","wb-radio"],
  "foundationKeys": ["color-border","color-border-disabled","color-border-focus","color-border-hover","color-fill-hover","color-fill-subtle-default","color-fill-subtle-disabled","color-icon-active","color-icon-disabled","color-icon-hover","color-icon-primary","color-icon-tertiary","color-surface-overlay","color-text-action","color-text-action-hover","color-text-action-active","color-text-action-disabled","color-text-disabled","color-text-inverse","color-text-primary","color-text-secondary","font-body-m","font-body-s","font-caption-m","radius-full","radius-sm","shadow-sm","spacing-component-lg","spacing-component-md","spacing-component-sm","spacing-component-xs"],
  "intro": "用于组合操作项、单选配置项和复选配置项的菜单。字段选择、复杂筛选或月份面板使用专门选择器或组合面板。",
  "sections": [
    {
      "id": "menu",
      "title": "菜单结构",
      "paragraphs": ["items的id必须唯一；type可为action、radio、checkbox、label或separator。radio需要group和值，业务选择状态通过radioValues和checkboxValues由调用方持有。"],
      "bullets": ["action激活后关闭；radio和checkbox关闭时机依交互键而异。","disabled禁用整个菜单并强制关闭；open传入后成为受控状态。"]
    },
    {"id":"trigger","title":"触发器与回显","paragraphs":["triggerType支持button、text、icon；textIntent声明操作或下钻语义。trigger插槽负责入口内容，配置摘要也可以由关联区域或完全不回显。"],"bullets":["菜单边界、尺寸和对齐由组件处理；每类项目使用menu语义及键盘导航。"]}
  ]
}
```

未声明或为空：related（不代表支持）

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "application-display-options",
  "title": "申请显示设置",
  "portability": "portable",
  "source": {
    "kind": "studio-official-usage",
    "ownerAssetId": "wb-dropdown",
    "scenarioId": "dropdown",
    "exampleId": "application-display-options",
    "codeSha256": "sha256:280d99d49a3a099fed0636367ae59790d66706f05622097360f068b483902cc3"
  },
  "description": "单个菜单组合操作、单选模式和复选条件，并由父级持有菜单状态。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchDropdown } from '@workbench/ui-vue3'
const open = ref(false)
const radioValues = ref({ density: 'comfortable' })
const checkboxValues = ref([])
const result = ref('')
const items = [
  { id: 'density-compact', type: 'radio', group: 'density', value: 'compact', label: '紧凑显示' },
  { id: 'density-comfortable', type: 'radio', group: 'density', value: 'comfortable', label: '舒适显示' },
  { id: 'show-owner', type: 'checkbox', label: '显示负责人' },
  { id: 'reset', type: 'action', label: '重置设置' },
]
function updateRadio({ groupId, value }) { radioValues.value = { ...radioValues.value, [groupId]: value } }
function updateChecked({ id, checked }) { checkboxValues.value = checked ? [...checkboxValues.value, id] : checkboxValues.value.filter(value => value !== id) }
function runAction({ id }) { result.value = `已触发：${id}` }
</script>
<template>
  <WorkbenchDropdown v-model:open="open" :items="items" :radio-values="radioValues" :checkbox-values="checkboxValues" aria-label="申请显示设置" @update:radio="updateRadio" @update:checked="updateChecked" @action="runAction">
    <template #trigger>显示设置</template>
  </WorkbenchDropdown>
  <output>{{ result || `密度：${radioValues.density}` }}</output>
</template>
```
