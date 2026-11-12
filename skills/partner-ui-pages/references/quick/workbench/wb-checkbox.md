<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 复选框 Checkbox — `WorkbenchCheckbox`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-checkbox`](<../../workbench/wb-checkbox.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-checkbox",
  "kind": "component",
  "version": "1.0.0",
  "summary": "用于独立的布尔选择；半选状态由父级汇总并传入，组件本身不计算父子关系。",
  "useWhen": ["独立多项选择与父级半选状态"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchCheckbox"},
  "props": {
    "modelValue": {"type":"Boolean"},
    "indeterminate": {"type":"Boolean"},
    "disabled": {"type":"Boolean"},
    "hover": {"type":"Boolean"},
    "label": {"type":"String","default":""},
    "ariaLabel": {"type":"String"},
    "description": {"type":"String"},
    "noWrap": {"type":"Boolean"}
  },
  "events": ["update:modelValue","update:indeterminate"],
  "propNotes": {
    "modelValue": "单个复选框当前布尔值。",
    "indeterminate": "父级传入的半选显示状态；半选数据由调用方计算。",
    "disabled": "阻止交互并保留当前选择。",
    "hover": "Studio预览悬浮状态控制。",
    "label": "可见选项文字。",
    "ariaLabel": "没有可见label时的可访问名称。",
    "description": "标题下方的辅助说明。",
    "noWrap": "将标签限制为单行省略。"
  },
  "eventNotes": {"update:modelValue":{"payload":"新的Boolean选择值。","timing":"用户切换复选框时发出。"},"update:indeterminate":{"payload":"Boolean；用户操作后为false。","timing":"用户激活复选框后发出，父级据此清除半选状态。"}}
}
```

未声明或为空：eventDetails、slots、slotDetails、slotPatterns、exposed、family、slotNotes（不代表支持）

## 规则与适用条件

```json
{
  "rules": [
    {"id":"wb-checkbox-rule-1","title":"尺寸与状态","text":"图形16×16px，图文间距8px，默认三级图标色描边，悬浮一级图标色；禁用优先于悬浮。","strength":"must","status":"confirmed","when":["独立多项选择与父级半选状态"],"references":[]},
    {"id":"wb-checkbox-rule-2","title":"版本范围","text":"当前版本视觉参数已批准；新增样式与复杂交互通过后续版本评审，当前不推断支持。","strength":"must","status":"confirmed","when":["独立多项选择与父级半选状态"],"references":[]},
    {"id":"wb-checkbox-rule-3","title":"使用约束 1","text":"半选由父级计算并传入indeterminate；点击半选转为选中并清除半选，禁用阻止操作。","strength":"must","status":"confirmed","when":["独立多项选择与父级半选状态"],"references":[]},
    {"id":"wb-checkbox-rule-4","title":"使用约束 2","text":"图形对齐主文本首行；辅助说明左对齐，使用Caption M；noWrap超过20个字符省略且保留全文提示和可访问名称。","strength":"must","status":"confirmed","when":["独立多项选择与父级半选状态"],"references":[]},
    {"id":"wb-checkbox-rule-5","title":"使用约束 3","text":"CheckboxGroup纵向间距8px、横向16px并允许换行。","strength":"must","status":"confirmed","when":["独立多项选择与父级半选状态"],"references":[]},
    {
      "id": "wb-checkbox-rule-6",
      "title": "使用约束 4",
      "text": "Select多选复用无交互的ChoiceMark标识；listbox option负责选择语义和键盘操作，不嵌套第二个checkbox输入。",
      "strength": "must",
      "status": "confirmed",
      "when": ["独立多项选择与父级半选状态"],
      "references": []
    },
    {"id":"wb-checkbox-rule-7","title":"使用约束 5","text":"不显示文字时必须传入ariaLabel提供可访问名称。","strength":"must","status":"confirmed","when":["独立多项选择与父级半选状态"],"references":[]}
  ],
  "foundationKeys": ["color-icon-primary","color-icon-tertiary","color-icon-disabled","color-border-disabled","color-fill-subtle-disabled","color-fill-subtle-default","color-text-primary","color-text-inverse","color-text-disabled","color-border-focus","spacing-component-sm","spacing-component-lg","radius-full","radius-sm","font-body-m","font-caption-m","spacing-component-xs","color-text-secondary"],
  "intro": "用于独立的布尔选择；半选状态由父级汇总并传入，组件本身不计算父子关系。",
  "sections": [
    {"id":"selection","title":"选择与半选","paragraphs":["v-model管理单个布尔值。indeterminate由父级计算；用户激活半选项后转为选中，并发出清除半选状态的更新。"],"bullets":["disabled阻止交互并保留当前状态。","Select的选项语义由listbox管理，不应在选项内部再嵌套交互Checkbox。"]},
    {
      "id": "layout",
      "title": "文本与可访问性",
      "paragraphs": ["标签文本位于图形右侧，辅助说明与标题左侧对齐。多项排列由调用方容器决定。"],
      "bullets": ["没有可见文本时使用ariaLabel。","noWrap适用于固定单行选项；长文本应保留完整可访问名称。辅助说明仍独占下一行，与标题保持4px间距。","多项组合使用CheckboxGroup：横向16px、纵向8px，横向空间不足自然换行。"]
    }
  ]
}
```

未声明或为空：dependencies、related（不代表支持）

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "notification-preference",
  "title": "通知偏好",
  "portability": "portable",
  "source": {
    "kind": "studio-official-usage",
    "ownerAssetId": "wb-checkbox",
    "scenarioId": "checkbox",
    "exampleId": "notification-preference",
    "codeSha256": "sha256:b96dff48c3b52841cd1fdc1d29ef9a93d69b8f0bdd20d7c5115c5c1c257dc20e"
  },
  "description": "单个受控复选项；提交和保存偏好由调用方实现。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchCheckbox } from '@workbench/ui-vue3'
const receiveUpdates = ref(true)
</script>
<template>
  <WorkbenchCheckbox v-model="receiveUpdates" label="接收申请状态变化通知" description="申请审核进度变化时发送工作台通知。" />
  <output>通知{{ receiveUpdates ? '已开启' : '已关闭' }}</output>
</template>
```
