<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 加载 Loading — `WorkbenchLoading`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-loading`](<../../workbench/wb-loading.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-loading",
  "kind": "component",
  "version": "1.0.0",
  "summary": "在请求或内容准备期间显示轻量加载指示；组件只表达进行中状态，不管理请求生命周期。",
  "useWhen": ["已知操作正在处理中，内容结构未知或适合用进度标识时。"],
  "avoidWhen": ["已知内容结构优先 Skeleton；不要把 Loading 当作禁用逻辑。","未经验证的公司内部UI框架或生产交付"],
  "status": {"maturity":"prototype-validated","deliveryEligibility":"prototype-only"},
  "source": {
    "package": "@workbench/ui-vue3",
    "version": "0.2.0-prototype.20261106.7",
    "commit": "6dad97e7a215069b5841b1f4413f80c1c587c1cc"
  },
  "unsupported": null,
  "usageStatus": "supported",
  "usageUnsupported": [],
  "variantStatus": "unsupported",
  "variantUnsupported": [
    {
      "code": "CUSTOM_VARIANT_GALLERY",
      "reason": "A custom gallery or indirect scenario factory owns the rendered cases; manifest declarations are preserved, but are not claimed as an exhaustive portable gallery."
    }
  ],
  "caseSemantics": null
}
```

## 公开 API

以下字段来自包内声明。null 表示来源为空或未声明，不代表支持；不猜测签名、嵌套类型或动态 slot 名。

```json
{
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchLoading"},
  "props": {
    "size": {
      "type": "Number",
      "default": 20,
      "validator": {"kind":"unknown","expression":"(value) => [64, 48, 24, 20, 14, 12].includes(value)"}
    },
    "inverse": {"type":"Boolean","default":false},
    "label": {"type":"String","default":""},
    "ariaLabel": {"type":"String","default":""}
  },
  "events": [],
  "eventDetails": null,
  "slots": [],
  "slotDetails": null,
  "slotPatterns": [],
  "exposed": [],
  "family": [],
  "propNotes": {"size":"认可尺寸为64、48、24、20、14、12像素；默认20。","inverse":"在深色背景上使用反色样式。","label":"加载指示旁显示的可见文本。","ariaLabel":"加载图形的可访问名称。"},
  "eventNotes": {},
  "slotNotes": {}
}
```

## 规则与适用条件

```json
{
  "rules": [
    {
      "id": "wb-loading-rule-1",
      "title": "用途与边界",
      "text": "已知操作正在处理中，内容结构未知或适合用进度标识时。 已知内容结构优先 Skeleton；不要把 Loading 当作禁用逻辑。",
      "strength": "must",
      "status": "confirmed",
      "when": ["使用加载 Loading"],
      "references": []
    },
    {
      "id": "wb-loading-rule-2",
      "title": "交互与状态",
      "text": "八个固定轨道圆点与旋转前景弧；减少动态效果偏好下停止动画，状态文案仍保留。",
      "strength": "must",
      "status": "confirmed",
      "when": ["使用加载 Loading"],
      "references": []
    },
    {
      "id": "wb-loading-rule-3",
      "title": "公开API",
      "text": "| 参数 | 合同 |\n| --- | --- |\n| size | 64 / 48 / 24 / 20 / 14 / 12，默认20；非法值回退20 |\n| inverse | Boolean，默认 false；强调背景内使用反色 |\n| label / ariaLabel | 默认为空；label 优先，有文案时输出 status/polite，无文案时装饰性 aria-hidden |\n\n无业务事件。尺寸语境：64独立加载、48对话框、24大输入框、20默认输入框、14选择器/按钮、12紧凑场景。调用方负责 aria-busy、请求状态、阻止重复提交和超时错误。",
      "strength": "must",
      "status": "confirmed",
      "when": ["使用加载 Loading"],
      "references": []
    }
  ],
  "dependencies": [],
  "foundationKeys": [
    "color-brand",
    "color-icon-primary",
    "color-text-primary",
    "color-text-secondary",
    "color-fill-subtle-default",
    "color-fill-hover",
    "color-border",
    "color-surface-card-default",
    "spacing-component-sm",
    "spacing-component-md",
    "spacing-component-lg",
    "radius-sm",
    "font-body-m",
    "font-body-s"
  ],
  "intro": "在请求或内容准备期间显示轻量加载指示；组件只表达进行中状态，不管理请求生命周期。",
  "sections": [
    {"id":"selection","title":"选型","paragraphs":["用于短时等待和局部忙碌反馈；页面骨架结构尚未到达时使用Skeleton。调用方负责防重复提交、错误和超时。"],"bullets":[]},
    {
      "id": "structure",
      "title": "设计结构与排版",
      "paragraphs": ["size使用组件认可的离散像素尺寸；inverse用于深色背景上的反色显示。label提供可见说明，ariaLabel提供辅助技术名称。"],
      "bullets": []
    },
    {"id":"interaction","title":"交互与键盘","paragraphs":["无键盘操作。父级应在忙碌区域设置aria-busy并在请求完成后移除指示。"],"bullets":[]},
    {
      "id": "responsibility",
      "title": "使用边界与职责",
      "paragraphs": ["组件公开入口为 WorkbenchLoading（@workbench/ui-vue3）。当前资格：prototype-only；业务数据、持久化和流程决策由宿主承担。"],
      "bullets": []
    }
  ],
  "related": [{"label":"加载 Loading组件规范","href":"#rules"}]
}
```

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "controlled-example",
  "title": "账户信息加载指示",
  "portability": "portable",
  "source": {
    "kind": "studio-official-usage",
    "ownerAssetId": "wb-loading",
    "scenarioId": "loading",
    "exampleId": "controlled-example",
    "codeSha256": "sha256:1ea2fab772618ec373ab70114956de67097983dfbe758ef40e599793a93d0fbd"
  },
  "description": "账户信息加载指示业务场景的完整Vue示例，包含公开组件导入和所需数据。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { WorkbenchLoading } from '@workbench/ui-vue3'
const loadingLabel = '正在读取账户信息'
</script>
<template><section aria-busy="true"><WorkbenchLoading :size="24" :aria-label="loadingLabel" /><span>{{ loadingLabel }}</span></section></template>
```
