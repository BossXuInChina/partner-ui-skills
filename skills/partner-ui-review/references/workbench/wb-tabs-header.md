<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 页签头 TabsHeader Block — `WorkbenchTabsHeader`

资产：`wb-tabs-header` · 类型：`block` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-HOME-BLOCKS-REGISTER-20261104/tabs-header?view=preview)

公开入口：`@workbench/ui-vue3` → `WorkbenchTabsHeader`

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

**适用**：卡片内一级页签需要贯穿线样式、页签数量角标或右侧下钻操作

**不适用**：页面级导航或需要内容面板关联之外的复杂页签行为（直接使用Tabs）；未经生产接入验证即宣称可生产交付

官方来源 SFC：unavailable。OFFICIAL_SFC_MISSING：No official usage SFC mentions this public asset. Scenario/story source was not substituted.

## 使用规范与API

包内未提供对应 Studio 路由。

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| ariaLabel | String | 页签 |  |  |
| items * | Array |  |  |  |
| modelValue * | String \| Number |  |  |  |
| size | String | large | small / large |  |

### Events

- `update:modelValue`

### Slots

- `extra`

### 规则

### 贯穿线页签与右侧操作

id：`wb-tabs-header-structure` · must / confirmed

使用Tabs的rail（贯穿线）变体，size为large（一级）或small（卡片内二级）；数量角标以Badge corner放在页签文字右上角；右侧extra插槽放文字下钻等操作，垂直居中，不占用页签宽度。

**适用条件**：卡片页签头

### 组件依赖

`wb-tabs`、`wb-badge`

### Foundation 引用

`spacing-component-md`
