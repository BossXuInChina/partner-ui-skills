<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 面包屑 Breadcrumb — `WorkbenchBreadcrumb`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-breadcrumb`](<../../workbench/wb-breadcrumb.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-breadcrumb",
  "kind": "component",
  "version": "1.0.0",
  "summary": "用于展示当前页面在系统层级中的位置，并支持返回可导航的祖先页面。",
  "useWhen": ["页面层级路径与祖先导航"],
  "avoidWhen": ["侧栏树导航、业务步骤状态","未经验证的内部 UI 框架或生产交付"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchBreadcrumb"},
  "props": {
    "items": {"type":"Array","default":{"kind":"function"}},
    "collapseThreshold": {"type":"Number","default":6},
    "ariaLabel": {"type":"String","default":"面包屑"}
  },
  "events": ["navigate"],
  "eventDetails": null,
  "slots": [],
  "slotDetails": null,
  "slotPatterns": [],
  "exposed": [],
  "family": [],
  "propNotes": {
    "items": "按层级顺序排列的{id,label,href?,disabled?}项目数组，id必须唯一。",
    "collapseThreshold": "折叠阈值，默认6且实际最小6。",
    "ariaLabel": "导航区域可访问名称，默认“面包屑”。"
  },
  "eventNotes": {"navigate":{"payload":"(item, event)：被激活的祖先项目与原生事件。","timing":"激活没有href的祖先项时发出；路由调用方可preventDefault并处理导航。"}},
  "slotNotes": {}
}
```

## 规则与适用条件

```json
{
  "rules": [
    {
      "id": "wb-breadcrumb-rule-1",
      "title": "选型边界",
      "text": "页面层级路径与祖先导航；不适用于侧栏树导航、业务步骤状态",
      "strength": "must",
      "status": "confirmed",
      "when": ["页面层级路径与祖先导航"],
      "references": []
    },
    {
      "id": "wb-breadcrumb-rule-2",
      "title": "交互与调用合同",
      "text": "`items` 为 {id,label,href?,disabled?} 数组，id 必须唯一。最后一项是当前页且不交互，祖先有 href 时保留原生链接，隐藏祖先也相同；无 href 时发出 navigate(item,event)。路由调用方可在事件中 preventDefault。collapseThreshold 默认6，最小6，以避免第一项和尾四项重复；每个菜单具有实例唯一 ID。Enter/Space/ArrowDown 打开，方向键/Home/End 移动，Escape 关闭回焦点，焦点离开或外点关闭。",
      "strength": "must",
      "status": "confirmed",
      "when": ["页面层级路径与祖先导航"],
      "references": []
    },
    {
      "id": "wb-breadcrumb-rule-3",
      "title": "复用边界",
      "text": "保留祖先节点的原生a/button与导航语义，但视觉使用Breadcrumb组件专属的中性层级合同：祖先和折叠入口默认color-text-secondary，Hover使用color-text-primary，当前节点使用color-text-primary，禁用使用color-text-disabled；不套用独立Link或文字按钮的蓝色状态链。",
      "strength": "must",
      "status": "confirmed",
      "when": ["页面层级路径与祖先导航"],
      "references": []
    }
  ],
  "dependencies": [],
  "foundationKeys": [
    "color-border-focus",
    "color-fill-hover",
    "color-surface-overlay",
    "color-surface-page",
    "color-text-disabled",
    "color-text-primary",
    "color-text-secondary",
    "font-body-m",
    "radius-sm",
    "shadow-sm",
    "spacing-component-md",
    "spacing-component-sm",
    "spacing-component-xs"
  ],
  "intro": "用于展示当前页面在系统层级中的位置，并支持返回可导航的祖先页面。",
  "sections": [
    {
      "id": "hierarchy",
      "title": "层级与折叠",
      "paragraphs": ["items按从根节点到当前页的顺序排列，id唯一；最后一项始终是不可交互的当前页。超过折叠阈值时保留首项和末四项，中间项进入菜单。"],
      "bullets": ["祖先项提供href时保留原生链接；无href时通过navigate交给调用方。","collapseThreshold有效下限为6。"]
    },
    {"id":"keyboard","title":"键盘与职责","paragraphs":["折叠菜单由组件管理打开、方向键导航和焦点返回。路由状态及导航结果由调用方负责。"],"bullets":[]}
  ],
  "related": null
}
```

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "partner-detail-path",
  "title": "伙伴详情路径",
  "portability": "portable",
  "source": {
    "kind": "studio-official-usage",
    "ownerAssetId": "wb-breadcrumb",
    "scenarioId": "breadcrumb",
    "exampleId": "partner-detail-path",
    "codeSha256": "sha256:4b374c07ae94f9b39ce6c76716535e0f99e867dbadc4b9dd252ba9da995cecff"
  },
  "description": "父级以navigate处理无href祖先项；提供href的祖先保留原生导航。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchBreadcrumb } from '@workbench/ui-vue3'
const currentPage = ref('基本信息')
const items = [
  { id: 'partners', label: '合作伙伴', href: '/partners' },
  { id: 'acme', label: '华辰科技' },
  { id: 'profile', label: '基本信息' },
]
function navigate(item, event) {
  event.preventDefault()
  currentPage.value = item.label
}
</script>
<template>
  <WorkbenchBreadcrumb :items="items" aria-label="伙伴详情路径" @navigate="navigate" />
  <output>当前页面：{{ currentPage }}</output>
</template>
```
