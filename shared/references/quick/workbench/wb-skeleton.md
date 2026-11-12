<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 骨架屏 Skeleton — `WorkbenchSkeleton`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-skeleton`](<../../workbench/wb-skeleton.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-skeleton",
  "kind": "component",
  "version": "1.0.0",
  "summary": "在数据加载期间预留真实内容的结构与空间，降低页面布局跳动；请求状态仍由宿主管理。",
  "useWhen": ["加载前已知内容结构，以稳定骨架占位减少跳动。"],
  "avoidWhen": ["未知进度用 Loading；静态布局说明不要被播报为正在加载。","未经验证的公司内部UI框架或生产交付"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchSkeleton"},
  "props": {
    "variant": {"type":"String","default":"title-text","enum":["title-text","text","media-text","item-text","hero-text"]},
    "showTitle": {"type":"Boolean","default":true},
    "lines": {
      "type": "Number",
      "default": 3,
      "validator": {"kind":"unknown","expression":"value => Number.isInteger(value) && value >= 1 && value <= 5"}
    },
    "animated": {"type":"Boolean","default":true},
    "label": {"type":"String","default":""}
  },
  "events": [],
  "eventDetails": null,
  "slots": [],
  "slotDetails": null,
  "slotPatterns": [],
  "exposed": [],
  "family": [
    {
      "assetId": "wb-skeleton",
      "independentApproval": false,
      "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchSkeletonBlock"},
      "props": {
        "radius": {"type":"String","default":"sm","enum":["sm","lg"]},
        "animated": {"type":"Boolean","default":true},
        "label": {"type":"String","default":""}
      },
      "events": [],
      "slots": [],
      "slotPatterns": [],
      "exposed": []
    }
  ],
  "propNotes": {
    "variant": "预设内容结构：title-text、text、media-text、item-text或hero-text。",
    "showTitle": "是否显示标题占位。",
    "lines": "正文占位行数，整数1至5。",
    "animated": "是否启用流光动画；尊重减少动态效果偏好。",
    "label": "加载区域的可访问文本。"
  },
  "eventNotes": {},
  "slotNotes": {}
}
```

## 规则与适用条件

```json
{
  "rules": [
    {
      "id": "wb-skeleton-rule-1",
      "title": "用途与边界",
      "text": "加载前已知内容结构，以稳定骨架占位减少跳动。 未知进度用 Loading；静态布局说明不要被播报为正在加载。",
      "strength": "must",
      "status": "confirmed",
      "when": ["使用骨架屏 Skeleton"],
      "references": []
    },
    {
      "id": "wb-skeleton-rule-2",
      "title": "交互与状态",
      "text": "整体只播报一次；内部块不重复播报；每个变体复用同一块实现。",
      "strength": "must",
      "status": "confirmed",
      "when": ["使用骨架屏 Skeleton"],
      "references": []
    },
    {
      "id": "wb-skeleton-rule-3",
      "title": "公开API",
      "text": "| 参数 | 合同 |\n| --- | --- |\n| variant | title-text（默认）、text、media-text、item-text、hero-text；非法值回退默认 |\n| showTitle | Boolean，默认 true；text 变体始终无标题 |\n| lines | 默认3；有限数向下取整并限制1–5，NaN/Infinity回退3 |\n| animated | Boolean，默认 true；关闭或 reduced-motion 时不动 |\n| label | 默认空，装饰性隐藏；提供文案时单一 status/polite |\n\n同时导出 WorkbenchSkeletonBlock：radius=sm/lg（默认sm，非法值回退sm），animated、label 同上。无业务事件。骨架不切换真实内容，父级负责请求成功、空、错误分支及 aria-busy。",
      "strength": "must",
      "status": "confirmed",
      "when": ["使用骨架屏 Skeleton"],
      "references": []
    }
  ],
  "dependencies": [],
  "foundationKeys": [
    "color-fill-default",
    "color-fill-subtle-default",
    "color-surface-page",
    "color-surface-card-default",
    "color-text-primary",
    "color-text-secondary",
    "spacing-component-sm",
    "spacing-component-md",
    "spacing-component-lg",
    "spacing-component-xl",
    "radius-sm",
    "radius-lg",
    "font-body-m",
    "font-headline-s",
    "font-headline-xl"
  ],
  "intro": "在数据加载期间预留真实内容的结构与空间，降低页面布局跳动；请求状态仍由宿主管理。",
  "sections": [
    {"id":"selection","title":"选型","paragraphs":["内容结构已知且加载会持续一段时间时使用；仅短暂等待用Loading。无数据、失败和成功状态由父级分别切换。"],"bullets":[]},
    {
      "id": "structure",
      "title": "设计结构与排版",
      "paragraphs": ["variant选择标题、文本、媒体或条目结构；showTitle和lines控制骨架内容。WorkbenchSkeletonBlock可独立生成简单圆角占位块。"],
      "bullets": []
    },
    {"id":"interaction","title":"交互与键盘","paragraphs":["无键盘操作。容器应标注aria-busy；骨架不替代真实内容状态，也不承载交互。"],"bullets":[]},
    {
      "id": "responsibility",
      "title": "使用边界与职责",
      "paragraphs": ["组件公开入口为 WorkbenchSkeleton（@workbench/ui-vue3）。当前资格：prototype-only；业务数据、持久化和流程决策由宿主承担。"],
      "bullets": []
    }
  ],
  "related": [{"label":"骨架屏 Skeleton组件规范","href":"#rules"}]
}
```

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "controlled-example",
  "title": "项目详情加载骨架",
  "portability": "portable",
  "source": {
    "kind": "studio-official-usage",
    "ownerAssetId": "wb-skeleton",
    "scenarioId": "skeleton",
    "exampleId": "controlled-example",
    "codeSha256": "sha256:fba6016727b5863516780137964de9144780e34e8c6219adea0e09cfedb96f07"
  },
  "description": "项目详情加载骨架业务场景的完整Vue示例，包含公开组件导入和所需数据。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { WorkbenchSkeleton, WorkbenchSkeletonBlock } from '@workbench/ui-vue3'
const loading = true
</script>
<template>
  <section :aria-busy="loading">
    <WorkbenchSkeleton v-if="loading" variant="media-text" :lines="3" label="正在加载项目详情" />
    <WorkbenchSkeletonBlock v-else :radius="'lg'" label="媒体占位" />
  </section>
</template>
```
