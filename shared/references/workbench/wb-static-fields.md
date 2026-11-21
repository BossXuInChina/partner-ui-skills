<!-- Generated from @workbench/ui-vue3@0.5.1-dev.20261121.1 (651d5bb52c6f91471c6e2269977f854ea3ef706f) — do not edit. -->

# 静态字段展示 StaticFields — `WorkbenchStaticFields`

资产：`wb-static-fields` · 类型：`block` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.5.1-dev.20261121.1` · commit：`651d5bb52c6f91471c6e2269977f854ea3ef706f` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-TX-ASSET-RECORD-FIELDS-20261109/tx-asset-record-fields?view=preview)

公开入口：`@workbench/ui-vue3` → `WorkbenchStaticFields`

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

**适用**：三列紧凑字段。窄屏单行截断，聚焦或悬停可查看全文。字段可配置值色、链接、复制及右侧操作。

**不适用**：业务持久化、路由和审批由宿主负责；不得作为稳定发布或生产资格依据

官方来源 SFC：unavailable。OFFICIAL_SFC_MISSING：No official usage SFC mentions this public asset. Scenario/story source was not substituted.

## 使用规范与API

包内未提供对应 Studio 路由。

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| fields * | Array |  |  |  |
| label * | String |  |  |  |
| model * | Object |  |  |  |

### Events

- `copy`

### 动态 Slots

- 包内前缀模式：`value-<key>`；原表达式：`` `value-${field.key}` ``

- 包内前缀模式：`action-<key>`；原表达式：`` `action-${field.key}` ``

### 规则

包内未提供规则；不补写设计结论。

### 组件依赖

`wb-button`、`wb-link`、`wb-tooltip`
