<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 图表 Chart — `WorkbenchChart`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-chart`](<../../workbench/wb-chart.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-chart",
  "kind": "component",
  "version": "1.0.0",
  "summary": "工作台看板中的数值分布、趋势、占比、达成度与多维对比",
  "avoidWhen": ["需要地图、桑基、漏斗等非登记图形","需要大数据量交互缩放或实时流式刷新"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchChart"},
  "props": {
    "type": {"type":"String","default":"bar","enum":["bar","line","area","bar-horizontal","donut","pie","gauge","radar"]},
    "categories": {"type":"Array","default":{"kind":"function"}},
    "series": {"type":"Array","default":{"kind":"function"}},
    "height": {"type":"Number","default":240},
    "unit": {"type":"String","default":""},
    "unitRight": {"type":"String","default":""},
    "max": {"type":"Number"},
    "maxRight": {"type":"Number"},
    "ticks": {"type":"Number","default":5},
    "barWidth": {"type":"Number","default":12},
    "showValues": {"type":"Boolean"},
    "legend": {"type":"Boolean","default":true},
    "tooltip": {"type":"Boolean","default":true},
    "formatter": {"type":"Function","default":null},
    "labelRotate": {"type":"Boolean"},
    "centerValue": {"type":["String","Number"],"default":""},
    "centerUnit": {"type":"String","default":""},
    "centerLabel": {"type":"String","default":""},
    "showPercent": {"type":"Boolean"},
    "thickness": {"type":"Number","default":0},
    "value": {"type":"Number","default":0},
    "min": {"type":"Number","default":0},
    "color": {"type":"String","default":""},
    "segments": {"type":"Array","default":{"kind":"function"}},
    "scaleLabels": {"type":"Array","default":{"kind":"function"}},
    "status": {"type":"String","default":""},
    "indicators": {"type":"Array","default":{"kind":"function"}},
    "ariaLabel": {"type":"String","default":"图表"}
  }
}
```

未声明或为空：events、eventDetails、slots、slotDetails、slotPatterns、exposed、family、propNotes、eventNotes、slotNotes（不代表支持）

## 规则与适用条件

```json
{
  "rules": [
    {
      "id": "wb-chart-rule-1",
      "title": "图表类型与数据合同",
      "text": "type支持bar/line/area/bar-horizontal/donut/pie/gauge/radar。直角坐标图使用categories+series[{name,data,type?,stack?,axis?,color?}]，同stack堆叠、axis=right使用右轴；环形与饼图使用series[{name,value,color?}]；仪表使用value/min/max，可选segments[{to,color}]分段色带与scaleLabels刻度；雷达使用indicators[{name,max}]与series[{name,data}]。",
      "strength": "must",
      "status": "confirmed",
      "when": ["看板图表"],
      "references": []
    },
    {
      "id": "wb-chart-rule-2",
      "title": "颜色与可访问",
      "text": "默认系列色按登记调色板循环，仅在业务需要时用series.color覆盖。图表整体为role=img并提供ariaLabel；关键数值同时在页面文字中呈现，悬浮提示不是唯一信息来源。",
      "strength": "must",
      "status": "confirmed",
      "when": ["看板图表"],
      "references": []
    }
  ],
  "foundationKeys": ["color-info-primary","color-info-secondary","color-warning","color-none","color-none-subtle","color-border-separator","color-fill-hover","color-text-primary","color-text-secondary","color-surface-overlay","color-surface-card-default","font-body-s","font-caption-m","font-display-xs","radius-xs","radius-md","radius-full","shadow-base","spacing-component-xs","spacing-component-sm","spacing-component-md","spacing-component-lg"]
}
```

未声明或为空：dependencies、intro、sections、related（不代表支持）

## 官方示例

官方来源 SFC 状态：`unavailable`。包内未提供可展开的官方可移植示例；不以场景源码、Studio cases 或手写代码补齐。
