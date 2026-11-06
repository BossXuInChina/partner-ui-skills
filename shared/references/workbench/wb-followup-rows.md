<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 新增遗留任务行 — `WorkbenchFollowupRows`

资产：`wb-followup-rows` · 类型：`block` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-CANVAS-FILTER-EDIT-20261102/canvas-filter-edit-candidate?view=preview)

公开入口：`@workbench/ui-vue3` → `WorkbenchFollowupRows`

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

**适用**：遗留任务行的受控业务组合

**不适用**：业务持久化、路由和审批由宿主负责；不得作为稳定发布或生产资格依据

官方来源 SFC：unavailable。OFFICIAL_SFC_MISSING：No official usage SFC mentions this public asset. Scenario/story source was not substituted.

## 使用规范与API

包内未提供对应 Studio 路由。

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| members | Array | {"kind":"function"} |  |  |
| rows * | Array |  |  |  |

### Events

- `add`

- `delete`

- `update-field`

### 规则

包内未提供规则；不补写设计结论。

### 组件依赖

`wb-input`、`wb-button`、`wb-tooltip`
