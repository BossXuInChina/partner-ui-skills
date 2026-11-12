<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 时间轴 Timeline — `WorkbenchTimeline`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-timeline`](<../../workbench/wb-timeline.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-timeline",
  "kind": "component",
  "version": "1.0.0",
  "summary": "按先后顺序呈现多个相关事件及其时间、标题和说明，帮助阅读者理解过程与进展。",
  "useWhen": ["时间轴 Timeline相关交互与状态展示"],
  "avoidWhen": ["未经独立生产接入与设计验收直接用于生产交付"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchTimeline"},
  "props": {
    "items": {"type":"Array","default":{"kind":"function"}},
    "nodeType": {"type":"String","default":"dot","enum":["dot","icon"]},
    "label": {"type":"String","default":"事件时间轴"}
  },
  "events": [],
  "eventDetails": null,
  "slots": ["node","time","image","title","description"],
  "slotDetails": null,
  "slotPatterns": [],
  "exposed": [],
  "family": [],
  "propNotes": {"items":"按展示顺序排列的事件数据。","nodeType":"dot使用圆点节点；icon使用事件图标节点。","label":"时间轴区域的可访问名称。"},
  "eventNotes": {},
  "slotNotes": {
    "node": {"scope":"每项节点内容；参数为item与零基index。","description":"只替换节点呈现，事件顺序仍由items决定。"},
    "time": {"scope":"每项时间内容；参数为item与零基index。","description":"保留清晰可读的时间文本。"},
    "image": {"scope":"每项配图内容；参数为item与零基index。","description":"由调用方提供图片替代文本和尺寸约束。"},
    "title": {"scope":"每项标题内容；参数为item与零基index。","description":"标题层级与完整文案由宿主控制。"},
    "description": {"scope":"每项说明内容；参数为item与零基index。","description":"适合展示单项补充信息，不承载复杂操作流程。"}
  }
}
```

## 规则与适用条件

```json
{
  "rules": [],
  "dependencies": [],
  "foundationKeys": [
    "font-body-m",
    "font-body-s",
    "radius-full",
    "color-text-primary",
    "color-text-secondary",
    "color-icon-tertiary",
    "color-info-primary",
    "color-error",
    "color-success",
    "color-border-separator"
  ],
  "intro": "按先后顺序呈现多个相关事件及其时间、标题和说明，帮助阅读者理解过程与进展。",
  "sections": [
    {"id":"selection","title":"选型","paragraphs":["当事件顺序本身有意义时使用；若只需列举独立项目，使用列表；若强调必须完成的线性步骤，使用Steps。"],"bullets":[]},
    {
      "id": "structure",
      "title": "设计结构与排版",
      "paragraphs": ["items提供时间、标题、描述及可选图像等数据；nodeType选择点或图标节点。分区插槽可覆盖节点、时间、图片、标题和描述内容。时间轴填满父容器可用宽度，正文只在空间不足时自然换行；182px仅为规范样张宽度，不作为业务宽度上限。"],
      "bullets": []
    },
    {"id":"interaction","title":"交互与键盘","paragraphs":["时间轴为信息展示结构；插槽内若放交互内容，调用方需保证其键盘顺序和名称。"],"bullets":[]},
    {
      "id": "responsibility",
      "title": "使用边界与职责",
      "paragraphs": ["组件公开入口为 WorkbenchTimeline（@workbench/ui-vue3）。当前资格：prototype-only；业务数据、持久化和流程决策由宿主承担。"],
      "bullets": []
    }
  ],
  "related": [{"label":"时间轴 Timeline组件规范","href":"#rules"}]
}
```

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "controlled-example",
  "title": "订单进度时间轴",
  "portability": "portable",
  "source": {
    "kind": "studio-official-usage",
    "ownerAssetId": "wb-timeline",
    "scenarioId": "timeline",
    "exampleId": "controlled-example",
    "codeSha256": "sha256:9bc480c0c30f9e677877592e44b09462e94dedfdbb15b67604028ea5817d4309"
  },
  "description": "订单进度时间轴业务场景的完整Vue示例，包含公开组件导入和所需数据。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { WorkbenchTimeline } from '@workbench/ui-vue3'
const items = [{ id: 'created', time: '09:00', title: '订单已创建', description: '等待付款' }, { id: 'paid', time: '09:12', title: '付款已完成', description: '订单进入处理中' }]
</script>
<template><WorkbenchTimeline :items="items" node-type="dot" label="订单进度" /></template>
```
