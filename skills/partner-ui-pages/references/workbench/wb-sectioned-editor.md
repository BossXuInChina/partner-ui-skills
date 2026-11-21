<!-- Generated from @workbench/ui-vue3@0.5.1-dev.20261121.1 (651d5bb52c6f91471c6e2269977f854ea3ef706f) — do not edit. -->

# 交易分区编辑 — `WorkbenchSectionedEditor`

资产：`wb-sectioned-editor` · 类型：`block` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.5.1-dev.20261121.1` · commit：`651d5bb52c6f91471c6e2269977f854ea3ef706f` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-INDEPENDENT-DEMO-ASSETS-20261119/sectioned-editor?view=preview)

公开入口：`@workbench/ui-vue3` → `WorkbenchSectionedEditor`

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
      "label": "示例数据"
    }
  ],
  "controls": [],
  "pilotControls": [],
  "presets": []
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：创建报备、编辑报备与投标沿用有序的表单分区。

**不适用**：提交、草稿持久化、表单校验与页面操作区由宿主负责。

官方来源 SFC：unavailable。OFFICIAL_SFC_MISSING：No official usage SFC mentions this public asset. Scenario/story source was not substituted.

## 使用规范与API

包内未提供对应 Studio 路由。

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| sections * | Array |  |  |  |

### Slots

- `default`

### 动态 Slots

- `unknown`；表达式：`section.id + '-actions'`。包内未解析为确定的公开 slot 名。

- `unknown`；表达式：`section.id`。包内未解析为确定的公开 slot 名。

- `unknown`；表达式：`section.id + '-footer'`。包内未解析为确定的公开 slot 名。

### 规则

包内未提供规则；不补写设计结论。

### 组件依赖

`wb-card`、`wb-content-section`

### Foundation 引用

`spacing-layout-card-gap`、`spacing-component-lg`
