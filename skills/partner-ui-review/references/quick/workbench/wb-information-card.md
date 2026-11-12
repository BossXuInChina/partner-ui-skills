<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 信息卡片 Block — `WorkbenchInformationCard`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-information-card`](<../../workbench/wb-information-card.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-information-card",
  "kind": "block",
  "version": "1.0.0",
  "summary": "需要以稳定数据接口复用信息卡片结构、布局和独立底部区域",
  "useWhen": ["需要以稳定数据接口复用信息卡片结构、布局和独立底部区域"],
  "avoidWhen": ["跨卡片业务流程、持久化与编排应由宿主/Pattern管理","未经人工视觉签收或生产接入验证即宣称可生产交付"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchInformationCard"},
  "props": {
    "title": {"type":"String","default":""},
    "variant": {"type":"String","default":"display-white","enum":["display-white","display-tinted","operation","navigation"]},
    "size": {"type":"String","default":"xxxl","enum":["s","m","l","xl","xxl","xxxl"]},
    "href": {"type":"String","default":{"kind":"undefined"}},
    "target": {"type":"String","default":{"kind":"undefined"}},
    "rel": {"type":"String","default":{"kind":"undefined"}},
    "headerActions": {"type":"Array","default":{"kind":"function"}},
    "footer": {"type":"Object","default":null},
    "actions": {"type":"Array","default":{"kind":"function"}},
    "bodySize": {"type":"Number","default":14,"validator":{"kind":"unknown","expression":"(value: number) => [14].includes(value)"}},
    "description": {"type":"String","default":""},
    "tags": {"type":"Array","default":{"kind":"function"}},
    "structure": {"type":"String","default":"icon","enum":["icon","text-action"]}
  },
  "events": ["action"],
  "eventDetails": null,
  "slots": ["header","icon","header-actions","footer","actions","content"],
  "slotDetails": null,
  "slotPatterns": [],
  "exposed": [],
  "family": [],
  "propNotes": null,
  "eventNotes": null,
  "slotNotes": null
}
```

## 规则与适用条件

```json
{
  "rules": [
    {
      "id": "wb-information-card-structure",
      "title": "固定区域与独立操作",
      "text": "按header、正文、footer、actions组织；footer辅助信息与actions独立配置，关闭或空插槽不留下占位。",
      "strength": "must",
      "status": "confirmed",
      "when": ["信息卡片组合"],
      "references": []
    },
    {
      "id": "wb-information-card-navigation",
      "title": "原生导航与职责边界",
      "text": "navigation保留原生href，内部仅被动内容，禁止嵌套交互；业务保存和跨卡片编排归宿主。",
      "strength": "must",
      "status": "confirmed",
      "when": ["整卡导航"],
      "references": []
    }
  ],
  "dependencies": ["wb-card","wb-button"],
  "foundationKeys": [
    "color-text-primary",
    "color-text-secondary",
    "font-body-m",
    "font-body-s",
    "spacing-component-sm",
    "spacing-component-md",
    "spacing-component-lg"
  ],
  "intro": null,
  "sections": null,
  "related": null
}
```

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "information-block",
  "title": "信息 Block · 辅助内容与真实操作",
  "portability": "portable",
  "source": {
    "kind": "studio-official-usage",
    "ownerAssetId": "wb-card",
    "scenarioId": "card",
    "exampleId": "information-block",
    "codeSha256": "sha256:e302bc849eb6dcdc8d36245c487a7357339cae6361d7493a40ddc0e52ad98a8c"
  },
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { WorkbenchInformationCard } from '@workbench/ui-vue3'
const actions = [{ id:'submit', label:'提交', appearance:'primary' }]
function handleAction({ id }) { if (id === 'submit') console.log('执行提交业务') }
</script>
<template><WorkbenchInformationCard title="云服务能力认证" structure="icon" description="等待最终复核" :tags="['认证中']" :footer="{kind:'progress',value:75}" :actions="actions" @action="handleAction" /></template>
```
