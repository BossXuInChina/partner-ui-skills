<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 草稿筛选 Pattern — `WorkbenchDraftListFilter`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-draft-list-filter`](<../../workbench/wb-draft-list-filter.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-draft-list-filter",
  "kind": "pattern",
  "version": "1.0.0",
  "summary": "管理列表提供显式查询按钮，用户先编辑筛选草稿再提交",
  "avoidWhen": ["输入后立即过滤的即时搜索","筛选由服务端自动触发且无显式提交动作"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchDraftListFilter"},
  "props": {
    "fieldCount": {"type":"Number","default":1,"validator":{"kind":"unknown","expression":"(value) => Number.isInteger(value) && value >= 1 && value <= 4"}},
    "applyLabel": {"type":"String","default":"查询"},
    "resetLabel": {"type":"String","default":"重置"}
  },
  "events": ["apply","reset"],
  "slots": ["default","actions"]
}
```

未声明或为空：eventDetails、slotDetails、slotPatterns、exposed、family、propNotes、eventNotes、slotNotes（不代表支持）

## 规则与适用条件

```json
{
  "rules": [
    {"id":"wb-draft-list-filter-explicit-apply","title":"草稿显式提交","text":"筛选控件的编辑值与已应用条件分开保存；只有触发查询后才更新结果条件。","strength":"must","status":"confirmed","when":["手动查询管理列表"],"references":[]},
    {"id":"wb-draft-list-filter-reset","title":"宿主执行重置","text":"Pattern 发出重置意图；宿主负责清空草稿与已应用条件，并同步结果集和分页。","strength":"default","status":"confirmed","when":["手动查询管理列表"],"references":[]}
  ],
  "dependencies": ["wb-button"],
  "foundationKeys": ["spacing-component-lg","spacing-component-sm"]
}
```

未声明或为空：intro、sections、related（不代表支持）

## 官方示例

官方来源 SFC 状态：`unavailable`。包内未提供可展开的官方可移植示例；不以场景源码、Studio cases 或手写代码补齐。
