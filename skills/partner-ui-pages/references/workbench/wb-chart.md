<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 图表 Chart — `WorkbenchChart`

资产：`wb-chart` · 类型：`component` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-CHART-V1/chart?view=preview)

公开入口：`@workbench/ui-vue3` → `WorkbenchChart`

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
      "label": "原图数据"
    }
  ],
  "controls": [],
  "pilotControls": [],
  "presets": []
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：工作台看板中的数值分布、趋势、占比、达成度与多维对比

**不适用**：需要地图、桑基、漏斗等非登记图形；需要大数据量交互缩放或实时流式刷新

官方来源 SFC：unavailable。OFFICIAL_SFC_MISSING：No official usage SFC mentions this public asset. Scenario/story source was not substituted.

## 使用规范与API

包内未提供对应 Studio 路由。

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| ariaLabel | String | 图表 |  |  |
| barWidth | Number | 12 |  |  |
| categories | Array | {"kind":"function"} |  |  |
| centerLabel | String |  |  |  |
| centerUnit | String |  |  |  |
| centerValue | String \| Number |  |  |  |
| color | String |  |  |  |
| formatter | Function | null |  |  |
| height | Number | 240 |  |  |
| indicators | Array | {"kind":"function"} |  |  |
| labelRotate | Boolean |  |  |  |
| legend | Boolean | true |  |  |
| max | Number |  |  |  |
| maxRight | Number |  |  |  |
| min | Number | 0 |  |  |
| scaleLabels | Array | {"kind":"function"} |  |  |
| segments | Array | {"kind":"function"} |  |  |
| series | Array | {"kind":"function"} |  |  |
| showPercent | Boolean |  |  |  |
| showValues | Boolean |  |  |  |
| status | String |  |  |  |
| thickness | Number | 0 |  |  |
| ticks | Number | 5 |  |  |
| tooltip | Boolean | true |  |  |
| type | String | bar | bar / line / area / bar-horizontal / donut / pie / gauge / radar |  |
| unit | String |  |  |  |
| unitRight | String |  |  |  |
| value | Number | 0 |  |  |

### 规则

### 图表类型与数据合同

id：`wb-chart-rule-1` · must / confirmed

type支持bar/line/area/bar-horizontal/donut/pie/gauge/radar。直角坐标图使用categories+series[{name,data,type?,stack?,axis?,color?}]，同stack堆叠、axis=right使用右轴；环形与饼图使用series[{name,value,color?}]；仪表使用value/min/max，可选segments[{to,color}]分段色带与scaleLabels刻度；雷达使用indicators[{name,max}]与series[{name,data}]。

**适用条件**：看板图表

### 颜色与可访问

id：`wb-chart-rule-2` · must / confirmed

默认系列色按登记调色板循环，仅在业务需要时用series.color覆盖。图表整体为role=img并提供ariaLabel；关键数值同时在页面文字中呈现，悬浮提示不是唯一信息来源。

**适用条件**：看板图表

### Foundation 引用

`color-info-primary`、`color-info-secondary`、`color-warning`、`color-none`、`color-none-subtle`、`color-border-separator`、`color-fill-hover`、`color-text-primary`、`color-text-secondary`、`color-surface-overlay`、`color-surface-card-default`、`font-body-s`、`font-caption-m`、`font-display-xs`、`radius-xs`、`radius-md`、`radius-full`、`shadow-base`、`spacing-component-xs`、`spacing-component-sm`、`spacing-component-md`、`spacing-component-lg`
