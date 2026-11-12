<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 开关 Switch — `WorkbenchSwitch`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-switch`](<../../workbench/wb-switch.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-switch",
  "kind": "component",
  "version": "1.0.0",
  "summary": "用于即时切换一个布尔设置。切换后由调用方保存状态并决定后续业务影响。",
  "useWhen": ["即时开启或关闭一个布尔配置"],
  "avoidWhen": ["提交后才生效的多项选择或不可立即撤销的操作"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchSwitch"},
  "props": {
    "modelValue": {"type":"Boolean"},
    "disabled": {"type":"Boolean"},
    "loading": {"type":"Boolean"},
    "name": {"type":"String"},
    "value": {"type":"String","default":"on"},
    "label": {"type":"String","default":""},
    "ariaLabel": {"type":"String","default":""},
    "ariaDescribedby": {"type":"String"},
    "invalid": {"type":"Boolean"}
  },
  "events": ["update:modelValue"],
  "propNotes": {
    "modelValue": "当前布尔值。",
    "disabled": "阻止用户切换。",
    "loading": "显示加载状态并阻止切换。",
    "name": "原生checkbox表单字段名。",
    "value": "提交到FormData的字符串值，默认on。",
    "label": "可见开关名称。",
    "ariaLabel": "可访问名称；优先于label。",
    "ariaDescribedby": "关联补充说明的ID。",
    "invalid": "声明错误状态。"
  },
  "eventNotes": {"update:modelValue":{"payload":"新的Boolean值。","timing":"用户通过点击或Space改变状态时发出。"}}
}
```

未声明或为空：eventDetails、slots、slotDetails、slotPatterns、exposed、family、slotNotes（不代表支持）

## 规则与适用条件

```json
{
  "rules": [
    {
      "id": "wb-switch-rule-1",
      "title": "受控布尔合同",
      "text": "modelValue为受控布尔值，点击或Space通过update:modelValue返回新值。label显示可见名称，显式ariaLabel优先，无可见名称时回退为“开关”。name和value沿用原生checkbox表单语义。",
      "strength": "must",
      "status": "confirmed",
      "when": ["即时布尔配置"],
      "references": []
    },
    {"id":"wb-switch-rule-2","title":"禁用与加载","text":"disabled或loading均阻止切换；loading保留当前开关值、设置aria-busy并在滑块内复用Loading。","strength":"must","status":"confirmed","when":["异步切换"],"references":[]}
  ],
  "dependencies": ["wb-loading"],
  "foundationKeys": ["color-border-focus","color-fill-disabled","color-icon-disabled","color-icon-inverse","color-icon-primary","color-none","color-text-disabled","color-text-primary","radius-full","spacing-component-sm"],
  "intro": "用于即时切换一个布尔设置。切换后由调用方保存状态并决定后续业务影响。",
  "sections": [
    {
      "id": "behavior",
      "title": "状态与交互",
      "paragraphs": ["点击或Space切换受控modelValue。loading与disabled都会阻止状态变化；loading保留当前值并声明忙碌状态。"],
      "bullets": ["传入label提供可见名称；无可见名称时通过ariaLabel命名。","name与value使控件遵循原生checkbox表单语义。"]
    },
    {"id":"responsibility","title":"使用边界","paragraphs":["仅用于可以立即生效的布尔设置。需要提交多字段配置时使用表单控件，不用开关代替保存动作。"],"bullets":[]}
  ]
}
```

未声明或为空：related（不代表支持）

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "notification-switch",
  "title": "开启通知",
  "portability": "portable",
  "source": {
    "kind": "studio-official-usage",
    "ownerAssetId": "wb-switch",
    "scenarioId": "switch",
    "exampleId": "notification-switch",
    "codeSha256": "sha256:9a8f7d6e3be9c261a77d05f28c03da151503a6657bbc816eee4a8512083e36f5"
  },
  "description": "开关代表即时生效的通知偏好，保存值由调用方持有。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchSwitch } from '@workbench/ui-vue3'
const notifications = ref(true)
</script>
<template>
  <WorkbenchSwitch v-model="notifications" label="接收审批进度通知" name="notifications" />
  <output>通知{{ notifications ? '已开启' : '已关闭' }}</output>
</template>
```
