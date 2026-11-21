<!-- Generated from @workbench/ui-vue3@0.5.1-dev.20261121.1 (651d5bb52c6f91471c6e2269977f854ea3ef706f) — do not edit. -->

# 记录工作区 RecordWorkspace — `WorkbenchRecordWorkspace`

资产：`wb-record-workspace` · 类型：`block` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.5.1-dev.20261121.1` · commit：`651d5bb52c6f91471c6e2269977f854ea3ef706f` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-TRANSACTION-ASSETS-20261030/tx-asset-boq-workspace?view=preview)

公开入口：`@workbench/ui-vue3` → `WorkbenchRecordWorkspace`

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
      "label": "默认"
    }
  ],
  "controls": [],
  "pilotControls": [],
  "presets": []
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：在左侧筛选或用途后排列全选和计数，右侧排列批量操作。用于 BOQ、商务通知单、订单及其他可复用的记录列表。

**不适用**：业务持久化、路由和审批由宿主负责；不得作为稳定发布或生产资格依据

官方来源 SFC：unavailable。OFFICIAL_SFC_MISSING：No official usage SFC mentions this public asset. Scenario/story source was not substituted.

## 使用规范与API

包内未提供对应 Studio 路由。

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| checked | Boolean |  |  |  |
| indeterminate | Boolean |  |  |  |
| selectableCount | Number | 0 |  |  |
| selectedCount | Number | 0 |  |  |
| toolbarClass | String |  |  |  |

### Events

- `toggle-all`

### Slots

- `filters`

- `actions`

- `default`

- `footer`

### 规则

包内未提供规则；不补写设计结论。

### 组件依赖

`wb-button`、`wb-checkbox`
