<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 单选框 Radio — `WorkbenchRadio`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-radio`](<../../workbench/wb-radio.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-radio",
  "kind": "component",
  "version": "1.0.0",
  "summary": "用于从互斥选项中选择一个值。多个Radio共享name和v-model状态，由调用方提供选项布局。",
  "useWhen": ["互斥选择"],
  "avoidWhen": ["未经验证的内部框架生产实现"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchRadio"},
  "props": {
    "modelValue": {"type":"String"},
    "value": {"type":"String","required":true},
    "name": {"type":"String","required":true},
    "disabled": {"type":"Boolean"},
    "hover": {"type":"Boolean"},
    "label": {"type":"String","default":""},
    "ariaLabel": {"type":"String"},
    "description": {"type":"String"},
    "noWrap": {"type":"Boolean"}
  },
  "events": ["update:modelValue"],
  "propNotes": {
    "modelValue": "当前组共享的字符串选择值。",
    "value": "此项唯一的字符串值，必填。",
    "name": "同组Radio共享的原生表单名称，必填。",
    "disabled": "阻止该选项交互。",
    "hover": "Studio预览悬浮状态控制。",
    "label": "可见选项文本。",
    "ariaLabel": "无可见选项文本时的可访问名称。",
    "description": "显示在选项标签下方的辅助说明。",
    "noWrap": "单行截断长选项文本。"
  },
  "eventNotes": {"update:modelValue":{"payload":"被选中的字符串value。","timing":"用户选择本项时发出；调用方应更新同组共享值。"}}
}
```

未声明或为空：eventDetails、slots、slotDetails、slotPatterns、exposed、family、slotNotes（不代表支持）

## 规则与适用条件

```json
{
  "rules": [
    {"id":"wb-radio-rule-1","title":"尺寸与状态","text":"图形16×16px，图文间距8px，默认三级图标色描边，悬浮一级图标色；禁用优先于悬浮。","strength":"must","status":"confirmed","when":["互斥选择"],"references":[]},
    {"id":"wb-radio-rule-2","title":"版本范围","text":"当前版本视觉参数已批准；新增样式与复杂交互通过后续版本评审，当前不推断支持。","strength":"must","status":"confirmed","when":["互斥选择"],"references":[]},
    {"id":"wb-radio-rule-3","title":"使用约束 1","text":"同组使用相同name，value唯一，通过v-model共享值；原生Radio支持键盘互斥选择，选中白色内圆7px。","strength":"must","status":"confirmed","when":["互斥选择"],"references":[]},
    {"id":"wb-radio-rule-4","title":"文案与辅助说明","text":"图形对齐主文本首行；辅助说明左对齐，使用Caption M；noWrap超过20个字符省略且保留全文提示和可访问名称。","strength":"must","status":"confirmed","when":["互斥选择"],"references":[]},
    {"id":"wb-radio-rule-5","title":"选项组排列","text":"RadioGroup纵向间距8px、横向16px并允许换行；其示例结构和布局规则与CheckboxGroup保持一致。","strength":"must","status":"confirmed","when":["互斥选择"],"references":[]},
    {"id":"wb-radio-rule-6","title":"无可见文字","text":"不显示文字时必须传入ariaLabel提供可访问名称。","strength":"must","status":"confirmed","when":["互斥选择"],"references":[]}
  ],
  "foundationKeys": ["color-icon-primary","color-icon-tertiary","color-icon-disabled","color-border-disabled","color-fill-subtle-disabled","color-fill-subtle-default","color-text-primary","color-text-inverse","color-text-disabled","color-border-focus","spacing-component-sm","spacing-component-lg","radius-full","radius-sm","spacing-component-xs","color-text-secondary"],
  "intro": "用于从互斥选项中选择一个值。多个Radio共享name和v-model状态，由调用方提供选项布局。",
  "sections": [
    {
      "id": "grouping",
      "title": "分组选项",
      "paragraphs": ["同组的Radio必须使用相同name，每项使用唯一value，并绑定同一受控值。原生radio键盘行为负责组内移动和选中。"],
      "bullets": ["使用label提供可见选项名；无可见文本时传ariaLabel。","disabled保留既有选择状态并阻止操作；辅助文案通过description提供。"]
    },
    {"id":"layout","title":"排版与可访问性","paragraphs":["图形与主要文本首行对齐，辅助说明在标题下方左对齐。组方向和项目间距由调用方负责。"],"bullets":["noWrap启用长文案单行省略；名称仍应通过label和ariaLabel清楚表达。"]}
  ]
}
```

未声明或为空：dependencies、related（不代表支持）

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "delivery-method",
  "title": "选择交付方式",
  "portability": "portable",
  "source": {"kind":"studio-official-usage","ownerAssetId":"wb-radio","scenarioId":"radio","exampleId":"delivery-method","codeSha256":"sha256:e8e583f320aec1332ba0666473d729c5ab682d1eeb6c7168b310cf35e3efc00a"},
  "description": "两个选项共享name与受控值，展示标准的互斥选择关系。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchRadio } from '@workbench/ui-vue3'
const delivery = ref('online')
</script>
<template>
  <fieldset>
    <legend>选择交付方式</legend>
    <WorkbenchRadio v-model="delivery" name="delivery" value="online" label="线上交付" />
    <WorkbenchRadio v-model="delivery" name="delivery" value="onsite" label="现场交付" />
  </fieldset>
  <output>当前选择：{{ delivery }}</output>
</template>
```
