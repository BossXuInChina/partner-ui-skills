<!-- Generated from huawei-partner-ai-ui@0.3.1-dev.20261121.1 (9e1e87e9e8e8230e7330f1edaf29b3e74081cba7) — do not edit. -->

# AiToast — `AiToast`

包：`huawei-partner-ai-ui@0.3.1-dev.20261121.1` · commit：`9e1e87e9e8e8230e7330f1edaf29b3e74081cba7` · dirty：false

资格（包内声明）：channel=unknown；stableEligible=unknown；targetProductionEligible=unknown。元数据和示例不授予发布或生产批准。

完整资料：[`ai-toast`](<../../ai-ui/ai-toast.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "ai-toast",
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
  "publicImport": {"moduleName":"huawei-partner-ai-ui","exportName":"AiToast"},
  "props": {
    "modelValue": {"type":"boolean","required":true,"default":{"kind":"undefined"}},
    "message": {"type":"string","required":true,"default":{"kind":"undefined"}},
    "type": {"type":"AiToastType","required":false,"default":{"kind":"literal","value":"success"},"resolvedType":"'success' | 'error'"},
    "duration": {"type":"number","required":false,"default":{"kind":"literal","value":2000}}
  },
  "events": ["update:modelValue","close"],
  "eventDetails": {"update:modelValue":{"signature":"(value: boolean) => void","parameters":[{"name":"value","type":"boolean","optional":false,"rest":false}]},"close":{"signature":"() => void","parameters":[]}}
}
```

未声明或为空：slots、slotDetails、slotPatterns、exposed、family、propNotes、eventNotes、slotNotes（不代表支持）

## 规则与适用条件

未声明或为空：rules、dependencies、foundationKeys、intro、sections、related（不代表支持）

## 官方示例

官方来源 SFC 状态：`unknown`。包内未提供可展开的官方可移植示例；不以场景源码、Studio cases 或手写代码补齐。
