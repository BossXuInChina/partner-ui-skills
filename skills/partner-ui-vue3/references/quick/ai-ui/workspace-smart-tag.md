<!-- Generated from huawei-partner-ai-ui@0.3.1-dev.20261106.1 (16d91bbbede5006960cce5278b0e2cda88785393) — do not edit. -->

# WorkspaceSmartTag — `WorkspaceSmartTag`

包：`huawei-partner-ai-ui@0.3.1-dev.20261106.1` · commit：`16d91bbbede5006960cce5278b0e2cda88785393` · dirty：false

资格（包内声明）：channel=unknown；stableEligible=unknown；targetProductionEligible=unknown。元数据和示例不授予发布或生产批准。

完整资料：[`workspace-smart-tag`](<../../ai-ui/workspace-smart-tag.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "workspace-smart-tag",
  "kind": "component",
  "status": {
    "maturity": null,
    "deliveryEligibility": null,
    "unsupported": [{"code":"AI_RELEASE_STATUS_UNDECLARED","reason":"The owning AI UI release metadata declares version/source identity but no component maturity or delivery-eligibility status."}]
  },
  "unsupported": [{"code":"CATALOG_SUMMARY_UNAVAILABLE","reason":"The owning overview catalog has no dedicated summary for this public export; no new prose is invented."}],
  "usageStatus": "unknown",
  "variantStatus": "unknown"
}
```

未声明或为空：version、summary、useWhen、avoidWhen、variantUnsupported、caseSemantics（不代表支持）

## 公开 API

包内声明原样列出；null 与“未声明或为空”字段不代表支持，不猜测签名、嵌套类型或动态 slot 名。

```json
{
  "publicImport": {"moduleName":"huawei-partner-ai-ui","exportName":"WorkspaceSmartTag"},
  "props": {
    "fragments": {"type":"readonly IntelligenceFragment[]","required":true,"default":{"kind":"undefined"}},
    "logo": {"type":"IntelligenceLogo","required":false,"default":{"kind":"undefined"},"resolvedType":"Component | string"},
    "autoFollowHighlight": {"type":"boolean","required":false,"default":{"kind":"literal","value":true}}
  },
  "events": ["activate","highlightCenter"],
  "eventDetails": {
    "activate": {"signature":"() => void","parameters":[]},
    "highlightCenter": {"signature":"(center: {x:number;y:number}) => void","parameters":[{"name":"center","type":"{x:number;y:number}","optional":false,"rest":false}]}
  }
}
```

未声明或为空：slots、slotDetails、slotPatterns、exposed、family、propNotes、eventNotes、slotNotes（不代表支持）

## 规则与适用条件

未声明或为空：rules、dependencies、foundationKeys、intro、sections、related（不代表支持）

## 官方示例

官方来源 SFC 状态：`unknown`。包内未提供可展开的官方可移植示例；不以场景源码、Studio cases 或手写代码补齐。
