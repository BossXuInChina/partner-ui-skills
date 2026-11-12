<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 滑动条 Slider — `WorkbenchSlider`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-slider`](<../../workbench/wb-slider.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-slider",
  "kind": "component",
  "version": "1.0.0",
  "summary": "用于在连续或离散数值范围内调节单值，也支持不交叉的离散区间。",
  "useWhen": ["在连续值、离散值或离散区间内快速选择"],
  "avoidWhen": ["要求精确键入且范围未知或区间端点可交叉"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchSlider"},
  "props": {
    "modelValue": {"type":["Number","Array"],"default":0},
    "min": {"type":"Number","default":0},
    "max": {"type":"Number","default":100},
    "step": {"type":"Number","default":1},
    "type": {"type":"String","default":"continuous","enum":["continuous","discrete"]},
    "range": {"type":"Boolean"},
    "disabled": {"type":"Boolean"},
    "name": {"type":"String"},
    "ariaLabel": {"type":"String","default":"滑动条"},
    "ariaDescribedby": {"type":"String"},
    "invalid": {"type":"Boolean"},
    "showValue": {"type":"Boolean"},
    "showTicks": {"type":"Boolean"},
    "showTickLabels": {"type":"Boolean"},
    "tickLabelMode": {"type":"String","default":"all","enum":["all","endpoints"]},
    "showInput": {"type":"Boolean"},
    "wideInput": {"type":"Boolean"},
    "unit": {"type":"String"},
    "tickLabels": {"type":["Array","Object"],"default":{"kind":"function"}},
    "showTooltip": {"type":"Boolean"}
  },
  "events": ["update:modelValue"],
  "propNotes": {
    "modelValue": "单值Number或range模式下的双端点Array。",
    "min": "范围最小值，默认0。",
    "max": "范围最大值，默认100。",
    "step": "数值吸附与键盘调整的增量，默认1；continuous和discrete模式均使用该步长。",
    "type": "continuous或discrete。",
    "range": "在discrete模式下启用区间。",
    "disabled": "禁用滑块和配套输入。",
    "name": "原生表单字段名；区间对应name-min/name-max。",
    "ariaLabel": "滑块可访问名称。",
    "ariaDescribedby": "外部说明元素ID。",
    "invalid": "声明错误状态。",
    "showValue": "显示当前数值。",
    "showTicks": "显示刻度。",
    "showTickLabels": "显示刻度文本。",
    "tickLabelMode": "all或endpoints标签模式。",
    "showInput": "显示配套数值输入。",
    "wideInput": "加宽配套数值输入。",
    "unit": "显示单位文本，大小写由组件规范化。",
    "tickLabels": "刻度值到标签的数组或对象映射。",
    "showTooltip": "显示操作提示。"
  },
  "eventNotes": {"update:modelValue":{"payload":"单值模式为Number；range模式为[min, max] Number数组。","timing":"滑块、轨道或配套输入造成值变化时发出；边界与step规范化由组件执行。"}}
}
```

未声明或为空：eventDetails、slots、slotDetails、slotPatterns、exposed、family、slotNotes（不代表支持）

## 规则与适用条件

```json
{
  "rules": [
    {
      "id": "wb-slider-rule-1",
      "title": "数值与区间合同",
      "text": "modelValue为受控数字；type为continuous或discrete。仅discrete结合range形成双端区间，端点不可交叉，轨道点击选择最近端点，数值按step吸附并限制在min/max内。",
      "strength": "must",
      "status": "confirmed",
      "when": ["滑动选择"],
      "references": []
    },
    {
      "id": "wb-slider-rule-2",
      "title": "可选部件与表单",
      "text": "可配置刻度、刻度说明、输入框、当前值、单位和焦点/拖动提示。单值name直接提交；区间仅在name存在时提交name-min和name-max，未传name不得产生隐式表单字段。",
      "strength": "must",
      "status": "confirmed",
      "when": ["表单滑动选择"],
      "references": []
    },
    {"id":"wb-slider-rule-3","title":"交互与禁用","text":"原生range承载键盘与可访问语义；disabled同时阻止轨道、滑块和配套输入变化。提示只在键盘聚焦或指针操作期间展示。","strength":"must","status":"confirmed","when":["键盘或指针操作"],"references":[]},
    {
      "id": "wb-slider-tooltip-radius-20261025",
      "title": "Slider内置数值提示圆角",
      "text": "Slider内置数值提示气泡主体使用Foundation radius-sm（4px）；该规则不改变轨道、滑块或配套输入。",
      "strength": "must",
      "status": "confirmed",
      "when": ["显示Slider数值提示"],
      "references": []
    }
  ],
  "dependencies": ["wb-input","wb-popover"],
  "foundationKeys": ["color-border-disabled","color-fill-default","color-fill-disabled","color-icon-disabled","color-icon-primary","color-surface-overlay","color-text-disabled","color-text-placeholder","color-text-primary","font-body-m","font-body-s","radius-full","radius-md","radius-sm","shadow-lg","spacing-component-md","spacing-component-sm","spacing-component-xs"],
  "intro": "用于在连续或离散数值范围内调节单值，也支持不交叉的离散区间。",
  "sections": [
    {
      "id": "model",
      "title": "数值模型",
      "paragraphs": ["continuous用于连续单值外观，discrete用于离散单值；两种模式的交互值均按step吸附。range仅在discrete类型下启用双端点，modelValue为[最小端,最大端]。"],
      "bullets": ["端点不可交叉，轨道点击选择最近端点。","name使单值参与表单；区间生成name-min和name-max字段。"]
    },
    {
      "id": "parts",
      "title": "可选组成与可访问性",
      "paragraphs": ["showTicks、showTickLabels、showInput、showValue和showTooltip分别控制辅助展示部件。tickLabelMode选择全部刻度标签或仅端点。"],
      "bullets": ["disabled同时禁用滑块、轨道和配套输入。","ariaDescribedby关联说明，invalid声明错误状态。"]
    }
  ]
}
```

未声明或为空：related（不代表支持）

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "budget-range",
  "title": "项目预算范围",
  "portability": "portable",
  "source": {"kind":"studio-official-usage","ownerAssetId":"wb-slider","scenarioId":"slider","exampleId":"budget-range","codeSha256":"sha256:742d92fa9495b8bcfd614e82756f7aec28390e8b59ea0bed1211d445358fd23f"},
  "description": "离散区间示例；范围数据由调用方持有并可通过配套数值输入调整。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchSlider } from '@workbench/ui-vue3'
const budget = ref([20, 70])
</script>
<template>
  <WorkbenchSlider v-model="budget" type="discrete" range :min="0" :max="100" :step="5" show-value show-ticks show-input unit="万" aria-label="预算范围" />
  <output>预算范围：{{ budget[0] }}–{{ budget[1] }} 万</output>
</template>
```
