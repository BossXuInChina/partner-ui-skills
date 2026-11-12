<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 事件日历与日程列表 EventCalendar Block — `WorkbenchEventCalendar`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-event-calendar`](<../../workbench/wb-event-calendar.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-event-calendar",
  "kind": "block",
  "version": "1.0.1",
  "summary": "工作台侧栏按日期查看活动、日程或待办，并需要日期事件标记与当日列表联动",
  "avoidWhen": ["只需选择日期的表单字段（使用DatePicker）","跨模块日程编辑、提醒与持久化（由宿主或Pattern负责）","未经生产接入验证即宣称可生产交付"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchEventCalendar"},
  "props": {
    "events": {"type":"Array","required":true},
    "initialDate": {"type":"String","required":true},
    "today": {"type":"Date","default":{"kind":"function"}},
    "ariaLabel": {"type":"String","default":"活动日历"},
    "agendaLabel": {"type":"String","default":"当日活动"},
    "emptyText": {"type":"String","default":"当日暂无活动"}
  },
  "events": ["open","select"]
}
```

未声明或为空：eventDetails、slots、slotDetails、slotPatterns、exposed、family、propNotes、eventNotes、slotNotes（不代表支持）

## 规则与适用条件

```json
{
  "rules": [
    {
      "id": "wb-event-calendar-composition",
      "title": "日期面板与当日列表",
      "text": "由DatePicker面板模式（inline、fluid、flatInline、showInput=false、dateMarkers、showEmptyMarkers）与当日日程列表组合；有日程日期显示品牌色圆点，其余为灰色圆点；圆点6px、位于日期控件下方4px，上一行圆点到下一行控件12px。",
      "strength": "must",
      "status": "confirmed",
      "when": ["事件日历"],
      "references": []
    },
    {
      "id": "wb-event-calendar-agenda",
      "title": "收起与日程列表",
      "text": "收起条高32px、距日历8px，文字与箭头居中，阴影只在收起条下方；日程列表距收起条16px，使用组件滚动条和subtle分隔线；每项标题14px regular与分类标签，时间与地点16px图标、14px文字、4px间距。点击日程触发open，业务跳转由宿主处理。 时间使用用户确认的「首页 时间/time」原始16px图标。地点使用「定位/location」原始16px图标。",
      "strength": "must",
      "status": "confirmed",
      "when": ["事件日历"],
      "references": []
    }
  ],
  "dependencies": ["wb-date-picker","wb-button","wb-scrollbar","wb-tag"],
  "foundationKeys": ["color-text-primary","color-text-secondary","color-border-separator-subtle","color-link","font-body-m","spacing-component-xs","spacing-component-sm","spacing-component-md","spacing-component-lg"]
}
```

未声明或为空：intro、sections、related（不代表支持）

## 官方示例

官方来源 SFC 状态：`unavailable`。包内未提供可展开的官方可移植示例；不以场景源码、Studio cases 或手写代码补齐。
