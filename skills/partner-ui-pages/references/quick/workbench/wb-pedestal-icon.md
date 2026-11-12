<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 底托图标 — `WorkbenchPedestalIcon`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-pedestal-icon`](<../../workbench/wb-pedestal-icon.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-pedestal-icon",
  "kind": "component",
  "version": "1.0.0",
  "summary": "底托图标 PedestalIcon：使用Pixso已定义的圆形或圆角矩形底托及高低饱和度变体；状态分类、资源类型和默认人像需要带底托图标",
  "useWhen": ["底托图标 PedestalIcon：使用Pixso已定义的圆形或圆角矩形底托及高低饱和度变体","状态分类、资源类型和默认人像需要带底托图标"],
  "avoidWhen": ["需要纯系统图标或状态提示图标时使用对应独立图标组件","将占位咖啡杯解释为已确认业务语义","未经生产接入验证作为生产交付"],
  "status": {"maturity":"prototype-validated","deliveryEligibility":"prototype-only"},
  "source": {
    "package": "@workbench/ui-vue3",
    "version": "0.2.0-prototype.20261106.7",
    "commit": "6dad97e7a215069b5841b1f4413f80c1c587c1cc"
  },
  "unsupported": null,
  "usageStatus": "unavailable",
  "usageUnsupported": [
    {
      "code": "OFFICIAL_SFC_MISSING",
      "reason": "No official usage SFC mentions this public asset. Scenario/story source was not substituted."
    }
  ],
  "variantStatus": "unavailable",
  "variantUnsupported": [
    {
      "code": "VARIANT_VIEW_MISSING",
      "reason": "No current declared variants view/readingPilot is available; source declarations are retained."
    }
  ],
  "caseSemantics": null
}
```

## 公开 API

以下字段来自包内声明。null 表示来源为空或未声明，不代表支持；不猜测签名、嵌套类型或动态 slot 名。

```json
{
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchPedestalIcon"},
  "props": {
    "name": {"type":"String","required":true},
    "label": {"type":"String","default":""},
    "size": {
      "type": "Number",
      "default": {"kind":"undefined"},
      "validator": {"kind":"unknown","expression":"(value) => [28, 48].includes(value)"}
    }
  },
  "events": [],
  "eventDetails": null,
  "slots": [],
  "slotDetails": null,
  "slotPatterns": [],
  "exposed": [],
  "family": [],
  "propNotes": null,
  "eventNotes": null,
  "slotNotes": null
}
```

## 规则与适用条件

```json
{
  "rules": [
    {
      "id": "wb-pedestal-icon-native-artwork",
      "title": "底托图标原档",
      "text": "使用 WorkbenchPedestalIcon 按登记名称选择完整原图；默认保留原始设计框及导出外溢。用户确认的 size=28 或 48 可适配完整原始画布，不复制资源，不改变 SVG 绘制和颜色。",
      "strength": "must",
      "status": "confirmed",
      "when": ["底托图标","pedestal icon","WorkbenchPedestalIcon"],
      "references": []
    }
  ],
  "dependencies": [],
  "foundationKeys": [],
  "intro": null,
  "sections": null,
  "related": null
}
```

## 官方示例

官方来源 SFC 状态：`unavailable`。仅展开首个可移植示例，不代表全部变体。

包内未提供可展开的官方可移植示例；不以场景源码、Studio cases 或手写代码补齐。
