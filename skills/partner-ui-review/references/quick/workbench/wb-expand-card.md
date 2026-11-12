<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 展开卡片 ExpandCard Block — `WorkbenchExpandCard`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-expand-card`](<../../workbench/wb-expand-card.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-expand-card",
  "kind": "block",
  "version": "1.0.0",
  "summary": "列表中的每项需要以图标与摘要标题呈现，并通过右侧箭头展开详情（如伙伴身份差距）",
  "avoidWhen": ["同一区域只能展开一项且需手风琴语义（使用Collapse）","整卡跳转或含主要操作的卡片（使用Card Blocks）","未经生产接入验证即宣称可生产交付"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchExpandCard"},
  "props": {"expanded":{"type":"Boolean","default":false},"title":{"type":"String","required":true}},
  "events": ["update:expanded"],
  "slots": ["icon","title","default"]
}
```

未声明或为空：eventDetails、slotDetails、slotPatterns、exposed、family、propNotes、eventNotes、slotNotes（不代表支持）

## 规则与适用条件

```json
{
  "rules": [
    {
      "id": "wb-expand-card-structure",
      "title": "摘要头与展开内容",
      "text": "浅灰背景（surface-card-tinted），头部上下8px、左右16px内边距：底座图标（建议PedestalIcon 28px）、标题（headline-xs）、右侧12px下箭头按钮；展开内容同样左右16px，展开/收起使用高度过渡且首帧不跳动，减少动效时关闭过渡。",
      "strength": "must",
      "status": "confirmed",
      "when": ["展开卡片"],
      "references": []
    }
  ],
  "dependencies": ["wb-pedestal-icon"],
  "foundationKeys": ["color-surface-card-tinted","color-text-primary","color-icon-primary","color-border-focus","font-headline-xs","radius-md","spacing-component-sm","spacing-component-md","spacing-component-lg"]
}
```

未声明或为空：intro、sections、related（不代表支持）

## 官方示例

官方来源 SFC 状态：`unavailable`。包内未提供可展开的官方可移植示例；不以场景源码、Studio cases 或手写代码补齐。
