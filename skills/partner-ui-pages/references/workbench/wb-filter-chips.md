<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 业务筛选 FilterChips Block — `WorkbenchFilterChips`

资产：`wb-filter-chips` · 类型：`block` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-HOME-BLOCKS-REGISTER-20261104/filter-chips?view=preview)

公开入口：`@workbench/ui-vue3` → `WorkbenchFilterChips`

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

**适用**：列表上方需要十项以上的单选业务筛选，并希望一眼看到全部选项与数量

**不适用**：多选或带复杂条件的筛选（使用查询表单或Select）；两到五项互斥切换（使用ButtonRadioGroup）；未经生产接入验证即宣称可生产交付

官方来源 SFC：unavailable。OFFICIAL_SFC_MISSING：No official usage SFC mentions this public asset. Scenario/story source was not substituted.

## 使用规范与API

包内未提供对应 Studio 路由。

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| ariaLabel | String | 筛选 |  |  |
| items * | Array |  |  |  |
| modelValue * | String |  |  |  |

### Events

- `update:modelValue`

### 规则

### 可点击标签单选

id：`wb-filter-chips-selection` · must / confirmed

以可交互Tag表达单选筛选，选中态使用Tag selected；带数量时显示为“名称(数量)”；选项自动换行，间距8px，不收纳为更多。

**适用条件**：业务筛选

### 组件依赖

`wb-tag`

### Foundation 引用

`spacing-component-sm`
