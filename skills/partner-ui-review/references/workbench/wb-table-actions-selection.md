<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261031.1 (af939228028791e24280015c5d48a35a658d40f3) — do not edit. -->

# 表格操作与跨页选择 Block — `WorkbenchTableActionsSelection`

资产：`wb-table-actions-selection` · 类型：`block` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261031.1` · commit：`af939228028791e24280015c5d48a35a658d40f3` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-P5-PATTERN-BLOCKS-20260929/p5-table-actions-selection-candidate?view=preview)

公开入口：`@workbench/ui-vue3` → `WorkbenchTableActionsSelection`

## 变体与状态

状态：`unavailable`。声明值属于 Studio 案例数据，不自动等于公开组件 props。

包内未提供对应 Studio 路由。

unsupported：VARIANT_VIEW_MISSING：No current declared variants view/readingPilot is available; source declarations are retained.

### 包内声明

```json
{
  "states": [
    {
      "id": "ready",
      "label": "可交互示例"
    }
  ],
  "controls": [],
  "pilotControls": [],
  "presets": []
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：表格需将稳定行 ID 的选择状态保留跨页，并由页面提供批量操作和行操作处理

**不适用**：仅当前页选择已满足需求；服务端全量选择、权限过滤或业务删除语义需要统一由 Block 决定

官方来源 SFC：unavailable。OFFICIAL_SFC_MISSING：No official usage SFC mentions this public asset. Scenario/story source was not substituted.

## 使用规范与API

包内未提供对应 Studio 路由。

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| actionsFixed | Boolean | false |  |  |
| caption | String |  |  |  |
| columns * | Array |  |  |  |
| page | Number | 1 |  |  |
| pageSize | Number | 10 |  |  |
| rowActions | Array \| Function | {"kind":"function"} |  |  |
| rowKey | String \| Function | id |  |  |
| rows * | Array |  |  |  |
| selectedIds * | Array |  |  |  |
| selectionFixed | Boolean | false |  |  |
| sort | Object | null |  |  |
| total | Number | null |  |  |

### Events

- `update:selectedIds`

- `selection-change`

- `update:sort`

- `sort-change`

- `column-filter`

- `update:page`

- `page-change`

- `update:pageSize`

- `page-size-change`

- `row-action`

### Slots

- `toolbar-leading`

- `toolbar-actions`

- `row-actions`

### 动态 Slots

- 包内前缀模式：`cell-<key>`；原表达式：`` `cell-${column.key}` ``

### 规则

### 跨页选择使用稳定 ID

id：`wb-table-actions-selection-stable-keys` · must / confirmed

Block 将当前页 Table 选择与宿主持有的稳定 row ID 集合合并；翻页和改每页数量保留其他页选择。

**适用条件**：客户端持有跨页选择集的列表

### 操作语义由调用方决定

id：`wb-table-actions-selection-page-policy` · must / confirmed

Block 传递行操作与批量操作插槽，不定义动作权限、颜色顺序、确认文字或删除结果。筛选及数据集变化后的清选由宿主明确处理。

**适用条件**：表格行操作和批量操作

### 组件依赖

`wb-table`

### Foundation 引用

`color-surface-page`、`spacing-layout-content-gap`
