<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 静态字段组 ReadonlyFields — `WorkbenchReadonlyFields`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-readonly-fields`](<../../workbench/wb-readonly-fields.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-readonly-fields",
  "kind": "block",
  "version": "1.0.0",
  "summary": "静态字段组的受控业务组合",
  "avoidWhen": ["业务持久化、路由和审批由宿主负责","不得作为稳定发布或生产资格依据"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchReadonlyFields"},
  "props": {
    "title": {"type":"String","required":true},
    "titleVisible": {"type":"Boolean","default":false},
    "model": {"type":"Object","required":true},
    "fields": {"type":"Array","required":true},
    "columns": {"type":"Number","default":3},
    "labelPosition": {"type":"String","default":"left"},
    "labelWidth": {"type":"String","default":"224px"},
    "density": {"type":"String","default":"compact"}
  },
  "events": ["copy"],
  "slotPatterns": [{"kind":"prefix","prefix":"value-","expression":"`value-${field.key}`"}]
}
```

未声明或为空：eventDetails、slots、slotDetails、exposed、family、propNotes、eventNotes、slotNotes（不代表支持）

## 规则与适用条件

```json
{"dependencies":["wb-form","wb-button","wb-tag"]}
```

未声明或为空：rules、foundationKeys、intro、sections、related（不代表支持）

## 官方示例

官方来源 SFC 状态：`unavailable`。包内未提供可展开的官方可移植示例；不以场景源码、Studio cases 或手写代码补齐。
