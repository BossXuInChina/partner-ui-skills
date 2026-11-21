<!-- Generated from @workbench/ui-vue3@0.5.1-dev.20261121.1 (651d5bb52c6f91471c6e2269977f854ea3ef706f) — do not edit. -->

# 业务记录卡片 RecordCard — `WorkbenchRecordCard`

包：`@workbench/ui-vue3@0.5.1-dev.20261121.1` · commit：`651d5bb52c6f91471c6e2269977f854ea3ef706f` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-record-card`](<../../workbench/wb-record-card.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-record-card",
  "kind": "block",
  "version": "1.0.0",
  "summary": "展示一条记录的标题、标签、收藏、选择和操作。点击卡片可打开记录，交互控件和文本选择保持独立。",
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchRecordCard"},
  "props": {
    "title": {"type":"String","required":true},
    "href": {"type":"String"},
    "status": {"type":"String","default":""},
    "tone": {"type":"String","default":"info"},
    "tags": {"type":"Array","default":{"kind":"function"}},
    "selectable": {"type":"Boolean"},
    "selectDisabled": {"type":"Boolean"},
    "selected": {"type":"Boolean"},
    "selectLabel": {"type":"String","default":""},
    "favorite": {"type":"Boolean"},
    "starred": {"type":"Boolean"},
    "openOnTitle": {"type":"Boolean"},
    "deletable": {"type":"Boolean"},
    "actions": {"type":"Array","default":{"kind":"function"}}
  },
  "events": ["select","favorite","open","delete","action"],
  "slots": ["header-actions","default","footer","progress"]
}
```

未声明或为空：eventDetails、slotDetails、slotPatterns、exposed、family、propNotes、eventNotes、slotNotes（不代表支持）

## 规则与适用条件

```json
{"dependencies":["wb-button","wb-card","wb-checkbox","wb-dropdown","wb-tag"]}
```

未声明或为空：rules、foundationKeys、intro、sections、related（不代表支持）

## 官方示例

官方来源 SFC 状态：`unavailable`。包内未提供可展开的官方可移植示例；不以场景源码、Studio cases 或手写代码补齐。
