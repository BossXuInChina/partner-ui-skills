<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 快捷应用卡片 Block — `WorkbenchQuickAppCard`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-quick-app-card`](<../../workbench/wb-quick-app-card.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-quick-app-card",
  "kind": "block",
  "version": "1.0.0",
  "summary": "需要以稳定数据接口复用快捷应用卡片结构、布局和独立底部区域",
  "avoidWhen": ["跨卡片业务流程、持久化与编排应由宿主/Pattern管理","未经人工视觉签收或生产接入验证即宣称可生产交付"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchQuickAppCard"},
  "props": {
    "title": {"type":"String","default":""},
    "variant": {"type":"String","default":"display-white","enum":["display-white"]},
    "size": {"type":"String","default":"xxxl","enum":["s","m","l","xl","xxl","xxxl"]},
    "href": {"type":"String","default":{"kind":"undefined"}},
    "target": {"type":"String","default":{"kind":"undefined"}},
    "rel": {"type":"String","default":{"kind":"undefined"}},
    "headerActions": {"type":"Array","default":{"kind":"function"}},
    "footer": {"type":"Object","default":null},
    "actions": {"type":"Array","default":{"kind":"function"}},
    "layout": {"type":"String","default":"row","enum":["row","multi","column"]},
    "items": {"type":"Array","default":{"kind":"function"}}
  },
  "events": ["action","activate"],
  "slots": ["header","header-actions","footer","actions","item","empty"]
}
```

未声明或为空：eventDetails、slotDetails、slotPatterns、exposed、family、propNotes、eventNotes、slotNotes（不代表支持）

## 规则与适用条件

```json
{
  "rules": [
    {
      "id": "wb-quick-app-card-structure",
      "title": "固定区域与独立操作",
      "text": "按header、正文、footer、actions组织；footer辅助信息与actions独立配置，关闭或空插槽不留下占位。",
      "strength": "must",
      "status": "confirmed",
      "when": ["快捷应用卡片组合"],
      "references": []
    },
    {"id":"wb-quick-app-card-navigation","title":"原生导航与职责边界","text":"navigation保留原生href，内部仅被动内容，禁止嵌套交互；业务保存和跨卡片编排归宿主。","strength":"must","status":"confirmed","when":["整卡导航"],"references":[]}
  ],
  "dependencies": ["wb-card","wb-button"],
  "foundationKeys": ["color-text-primary","color-text-secondary","font-body-m","font-body-s","spacing-component-sm","spacing-component-md","spacing-component-lg"]
}
```

未声明或为空：intro、sections、related（不代表支持）

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "quick-app-block",
  "title": "快捷应用 Block · 原生导航",
  "portability": "portable",
  "source": {"kind":"studio-official-usage","ownerAssetId":"wb-card","scenarioId":"card","exampleId":"quick-app-block","codeSha256":"sha256:a780a3462b2c004249b1b37bd8e086f0364cfbaba9ca06ee8b3489514f440bbe"},
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { WorkbenchQuickAppCard } from '@workbench/ui-vue3'
const items = [{id:'orders',label:'合同与订单中心',href:'/orders'},{id:'create',label:'新建项目'},{id:'disabled',label:'暂未开放',disabled:true}]
function activate({item}) { if (!item.href) console.log('执行动作',item.id) }
</script>
<template><WorkbenchQuickAppCard title="快捷应用" layout="multi" :items="items" @activate="activate" /></template>
```
