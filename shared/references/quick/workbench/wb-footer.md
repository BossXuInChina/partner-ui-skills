<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 页脚 Footer — `WorkbenchFooter`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-footer`](<../../workbench/wb-footer.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-footer",
  "kind": "component",
  "version": "1.0.0",
  "summary": "展示页面级版权、备案和法律入口；链接导航由浏览器处理，宿主可监听条目选择。",
  "useWhen": ["页脚 Footer相关交互与状态展示"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchFooter"},
  "props": {
    "copyright": {"type":"String","default":{"kind":"reference","name":"footerCopyright"}},
    "registration": {"type":"Object","default":{"kind":"function"}},
    "links": {"type":"Array","default":{"kind":"function"}},
    "disabled": {"type":"Boolean","default":false}
  },
  "events": ["select"],
  "eventDetails": null,
  "slots": ["copyright"],
  "slotDetails": null,
  "slotPatterns": [],
  "exposed": [],
  "family": [],
  "propNotes": {
    "copyright": "版权文本；不传时采用组件默认值。",
    "registration": "备案条目对象或null；可包含id、label及导航地址字段。",
    "links": "入口数组；条目含id、label及可选href、target、rel、disabled。",
    "disabled": "整体禁用可操作入口，但保留静态版权与备案信息。"
  },
  "eventNotes": {"select":{"payload":"被选择的条目对象。","timing":"激活任一未禁用条目时发出；带href的条目同时保留浏览器原生导航。"}},
  "slotNotes": {"copyright":{"scope":"自定义版权信息内容。","description":"仅替换版权区域，不改变备案或法律入口。"}}
}
```

## 规则与适用条件

```json
{
  "rules": [],
  "dependencies": [],
  "foundationKeys": [
    "font-body-s",
    "color-text-primary",
    "color-text-secondary",
    "color-text-disabled",
    "color-surface-page",
    "color-border-focus",
    "spacing-component-sm",
    "spacing-component-lg",
    "spacing-component-xl",
    "spacing-screen-edge-compact",
    "spacing-screen-edge-expanded",
    "layout-grid-max-width"
  ],
  "intro": "展示页面级版权、备案和法律入口；链接导航由浏览器处理，宿主可监听条目选择。",
  "sections": [
    {"id":"selection","title":"选型","paragraphs":["用于页面或产品外壳的末尾辅助信息和法律入口；主导航、页内操作或独立反馈使用对应导航和按钮组件。"],"bullets":[]},
    {
      "id": "structure",
      "title": "设计结构与排版",
      "paragraphs": ["copyright为版权文案，registration为备案条目，links为入口集合。备案无地址时作为文本；法律项无href时作为事件按钮。copyright插槽可替代版权文案。"],
      "bullets": []
    },
    {"id":"interaction","title":"交互与键盘","paragraphs":["有href的项目保留原生链接语义；无href的可操作条目使用按钮语义。disabled项目不可聚焦和触发。"],"bullets":[]},
    {
      "id": "responsibility",
      "title": "使用边界与职责",
      "paragraphs": ["组件公开入口为 WorkbenchFooter（@workbench/ui-vue3）。当前资格：prototype-only；业务数据、持久化和流程决策由宿主承担。"],
      "bullets": []
    }
  ],
  "related": [{"label":"页脚 Footer组件规范","href":"#rules"}]
}
```

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "legal-and-registration-footer",
  "title": "产品法律与备案页脚",
  "portability": "portable",
  "source": {
    "kind": "studio-official-usage",
    "ownerAssetId": "wb-footer",
    "scenarioId": "footer",
    "exampleId": "legal-and-registration-footer",
    "codeSha256": "sha256:2832678ea3ebb2d0e4d0546523fa1f3fc99784753d4af37ab0a38ef2def1990e"
  },
  "description": "产品法律与备案页脚场景示例展示组件在该业务流程中的职责，并附可直接运行的Vue代码。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { WorkbenchFooter } from '@workbench/ui-vue3'
const registration = { id: 'registration', label: '备案信息' }
const links = [{ id: 'privacy', label: '隐私政策', href: '/privacy' }, { id: 'terms', label: '服务条款' }]
function onSelect(item) { window.alert(item.label) }
</script>
<template>
  <WorkbenchFooter copyright="© 2026 示例公司" :registration="registration" :links="links" @select="onSelect" />
</template>
```
