<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 评分 Rating — `WorkbenchRating`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-rating`](<../../workbench/wb-rating.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-rating",
  "kind": "component",
  "version": "1.0.0",
  "summary": "用于表达等级、满意度或服务反馈。支持整分与半分、数值或文字说明，也可在只读界面展示已有评分。",
  "useWhen": ["以五级星形表达主观评分"],
  "avoidWhen": ["精确数值录入或超过半分精度"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchRating"},
  "props": {
    "modelValue": {"type":"Number","default":0},
    "max": {"type":"Number","default":5,"validator":{"kind":"unknown","expression":"value => Number.isInteger(value) && value > 0"}},
    "step": {"type":"Number","default":1,"validator":{"kind":"unknown","expression":"value => value === 1 || value === 0.5"}},
    "disabled": {"type":"Boolean"},
    "name": {"type":"String"},
    "ariaLabel": {"type":"String","default":"评分"},
    "ariaDescribedby": {"type":"String"},
    "invalid": {"type":"Boolean"},
    "readOnly": {"type":"Boolean"},
    "descriptionMode": {"type":"String","default":"per-star","enum":["none","text","numeric","per-star"]},
    "descriptionPlacement": {"type":"String","default":"right","enum":["right","bottom"]},
    "descriptions": {"type":"Array","default":{"kind":"function"}}
  },
  "events": ["update:modelValue"],
  "propNotes": {
    "modelValue": "当前受控分值；调用方应保持在0到max范围内。用户交互产生的更新会规范到此区间。",
    "max": "星级总数，必须为正整数。",
    "step": "评分增量，仅允许整分或半分。",
    "disabled": "禁用用户操作；同时遵循表单上下文的禁用状态。",
    "name": "有值时为表单加入同名隐藏输入。",
    "ariaLabel": "评分控件的可访问名称。",
    "ariaDescribedby": "关联外部说明元素的ID。",
    "invalid": "将控件标记为错误状态。",
    "readOnly": "阻止用户更改分值但保留评分呈现。",
    "descriptionMode": "选择无说明、整体文字、数值或逐星说明；numeric模式将传入分值格式化为一位小数。",
    "descriptionPlacement": "整体说明位于右侧或下方。",
    "descriptions": "逐星标签及文字说明的有序列表；自定义max时应匹配星级。"
  },
  "eventNotes": {"update:modelValue":{"payload":"新的数字分值。","timing":"用户点击星形或在可编辑控件上使用方向键、Home、End改变分值后发出。"}}
}
```

未声明或为空：eventDetails、slots、slotDetails、slotPatterns、exposed、family、slotNotes（不代表支持）

## 规则与适用条件

```json
{
  "rules": [
    {
      "id": "wb-rating-rule-1",
      "title": "评分与键盘合同",
      "text": "modelValue为0至max的受控分值；max为正整数，step仅支持1或0.5。点击选择，方向键按step移动，Home清空，End选满，并同步移动焦点。",
      "strength": "must",
      "status": "confirmed",
      "when": ["星级评分"],
      "references": []
    },
    {
      "id": "wb-rating-rule-2",
      "title": "说明与表单",
      "text": "descriptionMode支持none/text/numeric/per-star，说明位于右侧或下方；name存在时通过隐藏输入参与FormData。disabled阻止选择并使用禁用图标色；readOnly阻止点击和键盘选择但保留正常评分颜色。星形复用WorkbenchIcon收藏实心图标，在13px槽内等比渲染；通过colorSplit接口在单个SVG内以同位置色标沿中心线硬分色，避免独立裁切与叠层在浏览器缩放时产生接缝。",
      "strength": "must",
      "status": "confirmed",
      "when": ["评分伴随文字或表单提交"],
      "references": []
    }
  ],
  "foundationKeys": ["color-border-focus","color-icon-disabled","color-text-primary","color-warning","font-body-m","radius-sm","spacing-component-sm"],
  "intro": "用于表达等级、满意度或服务反馈。支持整分与半分、数值或文字说明，也可在只读界面展示已有评分。",
  "sections": [
    {"id":"selection","title":"选型","paragraphs":["适合用户以星级表达有序评价的场景。需要精确填写任意数值时使用数字输入；需要解释原因时应另配文本字段。"],"bullets":["整分评分使用默认步长；需要半星反馈时将步长设为0.5。","详情页展示已有评分时使用只读模式；禁用模式用于当前不可操作的控件状态。"]},
    {
      "id": "structure",
      "title": "设计结构与排版",
      "paragraphs": ["每颗星使用12px已登记原生图标和独立16px交互热区；半星由同一图标内的颜色分界呈现。保持图标原始绘制，不叠放或裁切两个星形。"],
      "bullets": ["descriptionMode支持无说明、整体文字、数值及逐星说明四类；整体说明可放在右侧或下方。","逐星说明按评分级别排列；自定义max时，descriptions应提供对应级数的文字。","只读评分保留正常评分颜色并声明只读；禁用评分使用禁用色。"]
    },
    {"id":"interaction","title":"交互与键盘","paragraphs":["点击星形更新受控分值；半星模式根据点击位置选择该星的半分或整分。焦点随当前分值定位。"],"bullets":["方向键按step增减；Home清零，End设为满分。","readOnly和disabled均阻止分值变化；readOnly仍可聚焦并保留正常颜色。"]},
    {
      "id": "responsibility",
      "title": "使用边界与职责",
      "paragraphs": ["评分值由调用方通过modelValue持有并响应update:modelValue。组件不提供插槽；说明文字通过descriptionMode和descriptions配置。"],
      "bullets": ["max必须为正整数；step仅支持1或0.5。","name提供时组件加入同名隐藏表单输入；未提供name时不产生FormData字段。","ariaLabel提供可访问名称；ariaDescribedby可关联外部说明，invalid用于声明错误状态。","组件只表达评分，不定义评分提交、业务校验、统计或持久化流程。"]
    }
  ],
  "related": [{"label":"已批准评分规范","href":"#rules"}]
}
```

未声明或为空：dependencies（不代表支持）

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "editable-half-star",
  "title": "可编辑半星评分",
  "portability": "portable",
  "source": {
    "kind": "studio-official-usage",
    "ownerAssetId": "wb-rating",
    "scenarioId": "rating",
    "exampleId": "editable-half-star",
    "codeSha256": "sha256:92031627377d6245331598a5adb399fba1b8a9e00d0c41fee583c7f9e70071b9"
  },
  "description": "受控半星示例，导入、数据和结果显示均完整定义。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { ref } from "vue"
import { WorkbenchRating } from "@workbench/ui-vue3"

const score = ref(3.5)
const descriptions = ["很差", "较差", "一般", "较好", "很好"]
</script>
<template>
  <WorkbenchRating v-model="score" :max="5" :step="0.5" description-mode="per-star" :descriptions="descriptions" aria-label="服务评分" />
  <output>当前评分：{{ score }}</output>
</template>
```

### 其他官方来源条目（未展开代码）

```json
[
  {
    "id": "readonly-rating",
    "portability": "portable",
    "source": {"kind":"studio-official-usage","ownerAssetId":"wb-rating","scenarioId":"rating","exampleId":"readonly-rating","codeSha256":"sha256:a8e338bf88a923856c9ba85bbca8dbe2c992f1763317a7c40f33466676c7aa5a"},
    "unsupported": []
  }
]
```

以上条目的详细信息见[完整资料](<../../workbench/wb-rating.md>)。
