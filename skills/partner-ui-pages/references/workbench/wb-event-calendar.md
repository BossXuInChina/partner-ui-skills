<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 事件日历与日程列表 EventCalendar Block — `WorkbenchEventCalendar`

资产：`wb-event-calendar` · 类型：`block` · 资产合同版本：`1.0.1`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-HOME-BLOCKS-REGISTER-20261104/event-calendar?view=preview)

公开入口：`@workbench/ui-vue3` → `WorkbenchEventCalendar`

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

**适用**：工作台侧栏按日期查看活动、日程或待办，并需要日期事件标记与当日列表联动

**不适用**：只需选择日期的表单字段（使用DatePicker）；跨模块日程编辑、提醒与持久化（由宿主或Pattern负责）；未经生产接入验证即宣称可生产交付

官方来源 SFC：unavailable。OFFICIAL_SFC_MISSING：No official usage SFC mentions this public asset. Scenario/story source was not substituted.

## 使用规范与API

包内未提供对应 Studio 路由。

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| agendaLabel | String | 当日活动 |  |  |
| ariaLabel | String | 活动日历 |  |  |
| emptyText | String | 当日暂无活动 |  |  |
| events * | Array |  |  |  |
| initialDate * | String |  |  |  |
| today | Date | {"kind":"function"} |  |  |

### Events

- `open`

- `select`

### 规则

### 日期面板与当日列表

id：`wb-event-calendar-composition` · must / confirmed

由DatePicker面板模式（inline、fluid、flatInline、showInput=false、dateMarkers、showEmptyMarkers）与当日日程列表组合；有日程日期显示品牌色圆点，其余为灰色圆点；圆点6px、位于日期控件下方4px，上一行圆点到下一行控件12px。

**适用条件**：事件日历

### 收起与日程列表

id：`wb-event-calendar-agenda` · must / confirmed

收起条高32px、距日历8px，文字与箭头居中，阴影只在收起条下方；日程列表距收起条16px，使用组件滚动条和subtle分隔线；每项标题14px regular与分类标签，时间与地点16px图标、14px文字、4px间距。点击日程触发open，业务跳转由宿主处理。 时间使用用户确认的「首页 时间/time」原始16px图标。地点使用「定位/location」原始16px图标。

**适用条件**：事件日历

### 组件依赖

`wb-date-picker`、`wb-button`、`wb-scrollbar`、`wb-tag`

### Foundation 引用

`color-text-primary`、`color-text-secondary`、`color-border-separator-subtle`、`color-link`、`font-body-m`、`spacing-component-xs`、`spacing-component-sm`、`spacing-component-md`、`spacing-component-lg`
