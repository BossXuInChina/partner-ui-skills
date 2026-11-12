<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 步骤条 Steps — `WorkbenchSteps`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-steps`](<../../workbench/wb-steps.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-steps",
  "kind": "component",
  "version": "1.0.0",
  "summary": "用于展示多阶段任务的流程进度，并按业务需要允许回看可导航步骤。",
  "useWhen": ["步骤条 Steps相关交互与状态展示"],
  "avoidWhen": ["未经独立生产接入与设计验收直接用于生产交付"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchSteps"},
  "props": {
    "items": {"type":"Array","required":true},
    "modelValue": {"type":"Number","default":0},
    "current": {"type":"Number"},
    "variant": {"type":"String","default":"horizontal"},
    "size": {"type":"String","default":"medium"},
    "nodeType": {"type":"String","default":"number"},
    "readonly": {"type":"Boolean","default":true},
    "disabled": {"type":"Boolean","default":false},
    "ariaLabel": {"type":"String","default":"流程步骤"}
  },
  "events": ["update:modelValue","change"],
  "slots": ["icon","title","description"],
  "propNotes": {
    "items": "必填StepItem数组：title必填；可选key、description、status、disabled、clickable。",
    "modelValue": "当前查看索引，0起始；-1可表示无选中。",
    "current": "实际流程进度；不传时跟随modelValue。",
    "variant": "horizontal、vertical或arrow。",
    "size": "large、medium、small或mini。",
    "nodeType": "number或icon。",
    "readonly": "默认true；控制步骤导航交互。",
    "disabled": "禁用整个步骤条。",
    "ariaLabel": "有序步骤列表可访问名称。"
  },
  "eventNotes": {"update:modelValue":{"payload":"新选中步骤索引Number。","timing":"调用方允许跳转的步骤被选择时发出。"},"change":{"payload":"(index, item)：新索引与对应StepItem。","timing":"用户选择可导航步骤时发出。"}},
  "slotNotes": {
    "icon": {"scope":"{ item, index, status }","description":"图标节点为装饰内容，辅助技术名称由步骤标题、状态和描述提供。"},
    "title": {"scope":"{ item, index }","description":"自定义步骤标题内容。"},
    "description": {"scope":"{ item, index }","description":"自定义步骤辅助说明内容。"}
  }
}
```

未声明或为空：eventDetails、slotDetails、slotPatterns、exposed、family（不代表支持）

## 规则与适用条件

```json
{
  "foundationKeys": ["font-body-m","font-body-s","radius-full","font-headline-xs","font-headline-xxs","font-body-l"],
  "intro": "用于展示多阶段任务的流程进度，并按业务需要允许回看可导航步骤。",
  "sections": [
    {
      "id": "flow",
      "title": "流程模型",
      "paragraphs": ["items按流程顺序提供title和可选description、status、disabled、clickable。modelValue是当前查看步骤索引，从0开始；current是实际流程进度，可与浏览位置分离。"],
      "bullets": ["显式status优先于current推导；禁用和不可操作状态不能跳转。","readonly默认true；只有业务允许回溯时才设为false。"]
    },
    {
      "id": "layout",
      "title": "类型、键盘与布局",
      "paragraphs": ["horizontal用于页面顶部短流程，vertical用于长流程侧栏，arrow强调单向阶段推进。尺寸支持large、medium、small、mini；箭头型使用固定高度。"],
      "bullets": ["可操作步骤支持方向键及Home/End，Enter或Space确认。","溢出通过内部横向滚动和翻页控制处理；不会把流程变成卡片列表。"]
    }
  ]
}
```

未声明或为空：rules、dependencies、related（不代表支持）

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "application-review-flow",
  "title": "申请审核流程",
  "portability": "portable",
  "source": {
    "kind": "studio-official-usage",
    "ownerAssetId": "wb-steps",
    "scenarioId": "steps",
    "exampleId": "application-review-flow",
    "codeSha256": "sha256:a1bd154c8810228994d97d4cb1e9f1676d171651d7a4295ccd881d755c735218"
  },
  "description": "查看流程当前进度，并由调用方处理允许回溯的步骤选择。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchSteps } from '@workbench/ui-vue3'
const selected = ref(1)
const current = ref(2)
const items = [
  { title: '提交申请', status: 'finish' },
  { title: '资料审核', status: 'finish' },
  { title: '结果确认', status: 'process' },
]
function onChange(index, item) { selected.value = index; console.log('查看步骤：', item.title) }
</script>
<template>
  <WorkbenchSteps v-model="selected" :current="current" :items="items" :readonly="false" aria-label="申请审核流程" @change="onChange" />
  <output>流程进度：第{{ current + 1 }}步；正在查看第{{ selected + 1 }}步</output>
</template>
```
