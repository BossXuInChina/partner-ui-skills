<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 数字计数器 NumberCount — `WorkbenchNumberCount`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-number-count`](<../../workbench/wb-number-count.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-number-count",
  "kind": "component",
  "version": "1.0.0",
  "summary": "用于有明确步长与上下界的数量录入。数值和业务提交由调用方控制。",
  "useWhen": ["在明确上下限与步长内录入数量"],
  "avoidWhen": ["普通文本、金额格式化、异步校验或高精度计算"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchNumberCount"},
  "props": {
    "modelValue": {"type":"Number","default":0},
    "step": {"type":"Number","default":1},
    "min": {"type":"Number","default":{"kind":"undefined"}},
    "max": {"type":"Number","default":{"kind":"undefined"}},
    "disabled": {"type":"Boolean"},
    "name": {"type":"String"},
    "ariaLabel": {"type":"String","default":"数量"}
  },
  "events": ["update:modelValue","change"],
  "propNotes": {"modelValue":"当前受控数值，默认0。","step":"每次增减的正步长，默认1；无效时内部回退到1。","min":"可选最小值。","max":"可选最大值。","disabled":"禁用整个计数器。","name":"设置数值输入的原生表单字段名。","ariaLabel":"控件组名称，默认“数量”。"},
  "eventNotes": {
    "update:modelValue": {"payload":"新的Number数值。","timing":"有效数值提交并与当前值不同时发出。"},
    "change": {"payload":"{ value: Number, source: \"input\" | \"increment\" | \"decrement\" }。","timing":"数值通过编辑、增加或减少操作改变时发出。"}
  }
}
```

未声明或为空：eventDetails、slots、slotDetails、slotPatterns、exposed、family、slotNotes（不代表支持）

## 规则与适用条件

```json
{
  "rules": [
    {
      "id": "wb-number-count-rule-1",
      "title": "受控数值合同",
      "text": "modelValue 为受控数值；step 必须大于0，非法step按1处理。加减、ArrowUp/ArrowDown、Enter或失焦提交，结果按step精度计算并夹在可选min/max内；change返回{value,source}。",
      "strength": "must",
      "status": "confirmed",
      "when": ["录入数量"],
      "references": []
    },
    {
      "id": "wb-number-count-rule-2",
      "title": "表单与禁用",
      "text": "name写入中间spinbutton并参与FormData；达到边界时仅禁用对应操作，整体disabled禁用输入和两侧操作。空值或非法文本在提交时恢复当前受控值。",
      "strength": "must",
      "status": "confirmed",
      "when": ["表单录入数量"],
      "references": []
    }
  ],
  "foundationKeys": ["color-border","color-border-disabled","color-border-focus","color-border-hover","color-fill-subtle-default","color-fill-subtle-disabled","color-icon-disabled","color-icon-primary","color-icon-secondary","color-text-disabled","color-text-primary","font-body-m","radius-sm"],
  "intro": "用于有明确步长与上下界的数量录入。数值和业务提交由调用方控制。",
  "sections": [
    {"id":"value","title":"数值与边界","paragraphs":["modelValue是受控数值；step定义递增幅度，min与max限制最终值。组件按步长精度处理输入并将有效结果约束在边界内。"],"bullets":["减小、增加按钮及上下方向键改变数值；Enter和失焦提交直接输入。","非法或空文本恢复到当前受控值；达到单侧边界时只禁用对应方向。"]},
    {"id":"form","title":"表单与职责","paragraphs":["传入name后，中间spinbutton参与FormData。ariaLabel定义控件组名称，内部数值输入会据此构造可访问名称。"],"bullets":["不用于高精度财务计算、货币格式化或异步校验。"]}
  ]
}
```

未声明或为空：dependencies、related（不代表支持）

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "bounded-quantity",
  "title": "申请材料份数",
  "portability": "portable",
  "source": {
    "kind": "studio-official-usage",
    "ownerAssetId": "wb-number-count",
    "scenarioId": "counter-input",
    "exampleId": "bounded-quantity",
    "codeSha256": "sha256:5ee3074411a93e2b2cbfd15063b86282741ecc8032035116c04b3e5e20774542"
  },
  "description": "受控正整数数量，并把输入变化映射为本地业务反馈。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchNumberCount } from '@workbench/ui-vue3'
const copies = ref(1)
const lastChange = ref('')
function onChange({ value, source }) { lastChange.value = `${source}：${value}` }
</script>
<template>
  <WorkbenchNumberCount v-model="copies" :min="1" :max="20" :step="1" name="copies" aria-label="材料份数" @change="onChange" />
  <output aria-live="polite">{{ copies }} 份；{{ lastChange }}</output>
</template>
```
