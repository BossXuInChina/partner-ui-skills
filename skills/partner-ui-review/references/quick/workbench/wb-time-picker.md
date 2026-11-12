<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 时间选择 TimePicker — `WorkbenchTimePicker`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-time-picker`](<../../workbench/wb-time-picker.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-time-picker",
  "kind": "component",
  "version": "1.0.0",
  "summary": "用于选择单个时间或时间范围。面板中的修改作为草稿，点击确定后才更新modelValue。",
  "useWhen": ["时间选择器 TimePicker相关交互与状态展示"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchTimePicker"},
  "props": {
    "modelValue": {"type":["String","Array"],"default":""},
    "range": {"type":"Boolean"},
    "use12Hours": {"type":"Boolean"},
    "showSeconds": {"type":"Boolean","default":true},
    "showNow": {"type":"Boolean"},
    "disabled": {"type":"Boolean"},
    "name": {"type":"String"},
    "ariaLabel": {"type":"String","default":"选择时间"},
    "ariaDescribedby": {"type":"String"},
    "invalid": {"type":"Boolean"},
    "placeholder": {"type":"String","default":"请选择时间"},
    "previewState": {"type":"String","default":"default"},
    "defaultOpen": {"type":"Boolean"},
    "teleportPanel": {"type":"Boolean"},
    "inline": {"type":"Boolean"}
  },
  "events": ["update:modelValue","change","cancel"],
  "propNotes": {
    "modelValue": "受控时间字符串；range模式为起止时间字符串数组。",
    "range": "启用时间范围选择。",
    "use12Hours": "以12小时制呈现选择列；模型值仍为24小时制。",
    "showSeconds": "是否提供秒列；关闭时保留HH:mm格式。",
    "showNow": "是否显示“此刻”快捷操作。",
    "disabled": "禁用选择交互。",
    "name": "设置确认后同步的隐藏表单字段名。",
    "defaultOpen": "默认展开面板，主要用于演示或明确的嵌入交互。",
    "teleportPanel": "将面板传送到body以绕开祖先裁切。",
    "inline": "面板常驻文档流；取消恢复草稿，确认提交后保持展开，优先于 teleportPanel。",
    "ariaLabel": "控件的可访问名称。",
    "ariaDescribedby": "关联辅助说明元素ID。",
    "invalid": "声明控件存在错误状态。",
    "placeholder": "未选择时间时显示的提示文案。",
    "previewState": "Studio预览状态参数。"
  },
  "eventNotes": {"update:modelValue":{"payload":"已确认的时间字符串或范围数组。","timing":"用户点击确定并提交草稿后发出。"},"change":{"payload":"已提交的时间值。","timing":"确认时间选择后发出。"},"cancel":{"payload":"无。","timing":"草稿被取消或关闭并恢复已提交值时发出。"}}
}
```

未声明或为空：eventDetails、slots、slotDetails、slotPatterns、exposed、family、slotNotes（不代表支持）

## 规则与适用条件

```json
{
  "dependencies": ["wb-button"],
  "foundationKeys": ["font-body-m","radius-sm","radius-md","color-text-primary","color-text-placeholder","color-border","color-border-focus","color-fill-hover","color-surface-overlay"],
  "intro": "用于选择单个时间或时间范围。面板中的修改作为草稿，点击确定后才更新modelValue。",
  "sections": [
    {"id":"selection","title":"选型","paragraphs":["预约或配置单个时刻使用单值；需要开始和结束时启用range。"],"bullets":["showSeconds关闭时保持HH:mm兼容格式。","需要12小时显示时启用use12Hours；提交模型仍以24小时制表达。"]},
    {
      "id": "structure",
      "title": "设计结构与排版",
      "paragraphs": ["单选输入宽280px，范围输入宽374px；浮层按小时、分钟及可选秒分列。"],
      "bullets": ["showNow默认关闭；需要快捷当前时间提交时再开启。","teleportPanel用于被裁切容器内的面板展示；默认不传送。","inline使面板在文档流中常驻，适合同时对照不同时间格式；禁用时不显示面板。"]
    },
    {
      "id": "interaction",
      "title": "交互与键盘",
      "paragraphs": ["修改仅写入面板草稿；点击确定后才发出新modelValue和change。"],
      "bullets": ["取消和Escape撤销未提交草稿；普通浮层点击外部或焦点离开时也会撤销，inline面板保持显示。","方向键、PageUp/PageDown、Home/End调整数值；左右键切换时间列。","范围先选择开始再选择结束；结束早于开始时禁止确认。"]
    },
    {
      "id": "responsibility",
      "title": "使用边界与职责",
      "paragraphs": ["消费方负责提交时间后续化、时区解释与业务范围校验。"],
      "bullets": ["隐藏表单字段仅在确认后同步。","Studio的previewState/defaultOpen用于展示状态，不作为业务状态输入。","当前为preview-vue3原型资格；静态设计没有定义范围反向的错误样式。"]
    }
  ],
  "related": [{"label":"时间选择规范","href":"#rules"}]
}
```

未声明或为空：rules（不代表支持）

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "confirmed-time",
  "title": "确认后提交时间",
  "portability": "portable",
  "source": {
    "kind": "studio-official-usage",
    "ownerAssetId": "wb-time-picker",
    "scenarioId": "time-picker",
    "exampleId": "confirmed-time",
    "codeSha256": "sha256:51877e8f9e3ca42749d11ddea45deb5408243588145530483adf45dad1311a12"
  },
  "description": "显示已提交值；取消面板不会覆盖当前业务值。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { ref } from "vue"
import { WorkbenchTimePicker } from "@workbench/ui-vue3"
const meetingTime = ref('09:30')
</script>
<template>
  <WorkbenchTimePicker v-model="meetingTime" :show-seconds="false" aria-label="会议时间" />
  <output>已确认：{{ meetingTime }}</output>
</template>
```
