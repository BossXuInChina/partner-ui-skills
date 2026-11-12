<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 页签头 TabsHeader Block — `WorkbenchTabsHeader`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-tabs-header`](<../../workbench/wb-tabs-header.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-tabs-header",
  "kind": "block",
  "version": "1.0.0",
  "summary": "卡片内一级页签需要贯穿线样式、页签数量角标或右侧下钻操作",
  "avoidWhen": ["页面级导航或需要内容面板关联之外的复杂页签行为（直接使用Tabs）","未经生产接入验证即宣称可生产交付"],
  "status": {"maturity":"prototype-validated","deliveryEligibility":"prototype-only"},
  "usageStatus": "unavailable",
  "usageUnsupported": [{"code":"OFFICIAL_SFC_MISSING","reason":"No official usage SFC mentions this public asset. Scenario/story source was not substituted."}],
  "variantStatus": "unavailable",
  "variantUnsupported": [{"code":"VARIANT_VIEW_MISSING","reason":"No current declared variants view/readingPilot is available; source declarations are retained."}]
}
```

未声明或为空：unsupported、caseSemantics（不代表支持）

## 公开 API

包内声明原样列出；null 与“未声明或为空”字段不代表支持，不猜测签名、嵌套类型或动态 slot 名。

```json
{
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchTabsHeader"},
  "props": {
    "modelValue": {"type":["String","Number"],"required":true},
    "items": {"type":"Array","required":true},
    "size": {"type":"String","default":"large","enum":["small","large"]},
    "ariaLabel": {"type":"String","default":"页签"}
  },
  "events": ["update:modelValue"],
  "slots": ["extra"]
}
```

未声明或为空：eventDetails、slotDetails、slotPatterns、exposed、family、propNotes、eventNotes、slotNotes（不代表支持）

## 规则与适用条件

```json
{
  "rules": [
    {
      "id": "wb-tabs-header-structure",
      "title": "贯穿线页签与右侧操作",
      "text": "使用Tabs的rail（贯穿线）变体，size为large（一级）或small（卡片内二级）；数量角标以Badge corner放在页签文字右上角；右侧extra插槽放文字下钻等操作，垂直居中，不占用页签宽度。",
      "strength": "must",
      "status": "confirmed",
      "when": ["卡片页签头"],
      "references": []
    }
  ],
  "dependencies": ["wb-tabs","wb-badge"],
  "foundationKeys": ["spacing-component-md"]
}
```

未声明或为空：intro、sections、related（不代表支持）

## 官方示例

官方来源 SFC 状态：`unavailable`。包内未提供可展开的官方可移植示例；不以场景源码、Studio cases 或手写代码补齐。
