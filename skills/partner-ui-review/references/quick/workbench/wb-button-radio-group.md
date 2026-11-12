<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 按钮单选组 Button Radio Group — `WorkbenchButtonRadioGroup`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-button-radio-group`](<../../workbench/wb-button-radio-group.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-button-radio-group",
  "kind": "component",
  "version": "1.0.0",
  "summary": "用于在当前上下文内选择一个互斥值，例如筛选条件、显示方式或配置选项。切换关联内容面板时使用Tabs。",
  "useWhen": ["在当前上下文中选择一个互斥值","筛选条件、展示模式或配置选项使用按钮式单选"],
  "avoidWhen": ["切换具有关联关系的平级内容面板","选项需要自动收纳为更多菜单","未经验证的内部UI框架生产实现"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchButtonRadioGroup"},
  "props": {
    "modelValue": {"type":["String","Number"],"required":true},
    "items": {"type":"Array","required":true},
    "size": {"type":"String","default":"small","enum":["small","large"]},
    "ariaLabel": {"type":"String","default":"单选组"},
    "fill": {"type":"Boolean"}
  },
  "events": ["update:modelValue","change"],
  "slots": ["item"],
  "propNotes": {"modelValue":"当前选中的String或Number值，必填。","items":"必填选项数组；每项包含唯一value、label，可选disabled。","size":"small或large尺寸。","ariaLabel":"radiogroup可访问名称。"},
  "eventNotes": {"update:modelValue":{"payload":"新选中的选项value。","timing":"选中值改变后发出。"},"change":{"payload":"被选中的完整item对象。","timing":"选择有效项后发出；业务逻辑由调用方执行。"}},
  "slotNotes": {"item":{"scope":"{ item, selected }","description":"自定义项目内容；保留item.label对应的可访问语义。"}}
}
```

未声明或为空：eventDetails、slotDetails、slotPatterns、exposed、family（不代表支持）

## 规则与适用条件

```json
{
  "rules": [
    {"id":"wb-button-radio-group-rule-1","title":"选型边界","text":"用于在当前上下文选择一个互斥值；若切换具有关联关系的平级内容面板，使用Tabs。","strength":"must","status":"confirmed","when":["互斥选择"],"references":[]},
    {
      "id": "wb-button-radio-group-rule-2",
      "title": "交互与可访问性",
      "text": "使用radiogroup/radio/aria-checked语义和roving tabindex；方向键、Home、End自动选择并跳过禁用项。",
      "strength": "must",
      "status": "confirmed",
      "when": ["互斥选择"],
      "references": []
    },
    {"id":"wb-button-radio-group-rule-3","title":"溢出边界","text":"组件不自动收纳为更多；选项较多、名称较长或需要关联内容面板时重新选择布局或使用Tabs。","strength":"must","status":"confirmed","when":["互斥选择"],"references":[]}
  ],
  "foundationKeys": ["color-border-focus","color-fill-hover","color-surface-card-default","color-text-disabled","color-text-primary","color-text-secondary","font-body-l","font-body-m","radius-sm","shadow-sm"],
  "intro": "用于在当前上下文内选择一个互斥值，例如筛选条件、显示方式或配置选项。切换关联内容面板时使用Tabs。",
  "sections": [
    {"id":"selection","title":"选项结构","paragraphs":["items中每个value唯一，label同时作为可访问名称；disabled项目不能选择。v-model持有唯一选中值。"],"bullets":["小号适合紧凑上下文，大号适合更醒目的配置选择。","选项较多或名称较长时重新选择布局，不会自动折叠为更多菜单。"]},
    {"id":"keyboard","title":"键盘行为","paragraphs":["组件使用radiogroup/radio语义和roving tabindex。左右、上下方向键循环切换，Home/End跳至首尾可用项，并跳过disabled项。"],"bullets":[]}
  ]
}
```

未声明或为空：dependencies、related（不代表支持）

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "result-filter",
  "title": "筛选结果范围",
  "portability": "portable",
  "source": {
    "kind": "studio-official-usage",
    "ownerAssetId": "wb-button-radio-group",
    "scenarioId": "button-radio-group",
    "exampleId": "result-filter",
    "codeSha256": "sha256:9f4b37cb943ab62a9d98ac4699b55d006dcba32e275fb1168024d6c1ca8abd00"
  },
  "description": "受控互斥选项，键盘与点击更新共享的筛选范围值。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchButtonRadioGroup } from '@workbench/ui-vue3'
const scope = ref('all')
const options = [
  { value: 'all', label: '全部' },
  { value: 'mine', label: '我的申请' },
  { value: 'team', label: '团队申请' },
]
function onChange(item) { console.log('筛选范围：', item.value) }
</script>
<template>
  <WorkbenchButtonRadioGroup v-model="scope" :items="options" aria-label="申请范围" @change="onChange" />
  <output>当前范围：{{ scope }}</output>
</template>
```
