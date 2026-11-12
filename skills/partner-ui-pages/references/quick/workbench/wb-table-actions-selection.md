<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 表格操作与跨页选择 Block — `WorkbenchTableActionsSelection`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-table-actions-selection`](<../../workbench/wb-table-actions-selection.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-table-actions-selection",
  "kind": "block",
  "version": "1.0.0",
  "summary": "表格需将稳定行 ID 的选择状态保留跨页，并由页面提供批量操作和行操作处理",
  "avoidWhen": ["仅当前页选择已满足需求","服务端全量选择、权限过滤或业务删除语义需要统一由 Block 决定"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchTableActionsSelection"},
  "props": {
    "caption": {"type":"String","default":""},
    "columns": {"type":"Array","required":true},
    "rows": {"type":"Array","required":true},
    "selectedIds": {"type":"Array","required":true},
    "rowKey": {"type":["String","Function"],"default":"id"},
    "sort": {"type":"Object","default":null},
    "page": {"type":"Number","default":1},
    "pageSize": {"type":"Number","default":10},
    "total": {"type":"Number","default":null},
    "selectionFixed": {"type":"Boolean","default":false},
    "actionsFixed": {"type":"Boolean","default":false},
    "rowActions": {"type":["Array","Function"],"default":{"kind":"function"}}
  },
  "events": ["update:selectedIds","selection-change","update:sort","sort-change","column-filter","update:page","page-change","update:pageSize","page-size-change","row-action"],
  "slots": ["toolbar-leading","toolbar-actions","row-actions"],
  "slotPatterns": [{"kind":"prefix","prefix":"cell-","expression":"`cell-${column.key}`"}]
}
```

未声明或为空：eventDetails、slotDetails、exposed、family、propNotes、eventNotes、slotNotes（不代表支持）

## 规则与适用条件

```json
{
  "rules": [
    {
      "id": "wb-table-actions-selection-stable-keys",
      "title": "跨页选择使用稳定 ID",
      "text": "Block 将当前页 Table 选择与宿主持有的稳定 row ID 集合合并；翻页和改每页数量保留其他页选择。",
      "strength": "must",
      "status": "confirmed",
      "when": ["客户端持有跨页选择集的列表"],
      "references": []
    },
    {
      "id": "wb-table-actions-selection-page-policy",
      "title": "操作语义由调用方决定",
      "text": "Block 传递行操作与批量操作插槽，不定义动作权限、颜色顺序、确认文字或删除结果。筛选及数据集变化后的清选由宿主明确处理。",
      "strength": "must",
      "status": "confirmed",
      "when": ["表格行操作和批量操作"],
      "references": []
    }
  ],
  "dependencies": ["wb-table"],
  "foundationKeys": ["color-surface-page","spacing-layout-content-gap"]
}
```

未声明或为空：intro、sections、related（不代表支持）

## 官方示例

官方来源 SFC 状态：`unavailable`。包内未提供可展开的官方可移植示例；不以场景源码、Studio cases 或手写代码补齐。
