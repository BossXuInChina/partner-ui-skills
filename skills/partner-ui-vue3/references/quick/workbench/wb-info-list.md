<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 信息列表 InfoList Block — `WorkbenchInfoList`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-info-list`](<../../workbench/wb-info-list.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-info-list",
  "kind": "block",
  "version": "1.0.1",
  "summary": "公告、资讯等信息流需要标题、状态标签与发布时间三层展示",
  "useWhen": ["公告、资讯等信息流需要标题、状态标签与发布时间三层展示"],
  "avoidWhen": ["需要排序、分页或批量操作的数据（使用Table）","带封面图的内容（使用MediaCard）","未经生产接入验证即宣称可生产交付"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchInfoList"},
  "props": {"items":{"type":"Array","required":true},"href":{"type":"String","default":"#"}},
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
      "id": "wb-info-list-structure",
      "title": "标题/标签/时间三层",
      "text": "每项依次为：标题链接（14px body-m，单行省略）、subtle状态标签（small）、时间行（16px时钟图标+14px文字，间距4px，垂直居中）；三层间距8px，项上下8px，项间subtle分隔线。 时间使用用户确认的「首页 时间/time」原始16px图标。",
      "strength": "must",
      "status": "confirmed",
      "when": ["信息列表"],
      "references": []
    }
  ],
  "dependencies": ["wb-tag"],
  "foundationKeys": [
    "color-text-primary",
    "color-text-secondary",
    "color-link-hover",
    "color-border-separator-subtle",
    "font-body-m",
    "spacing-component-xs",
    "spacing-component-sm"
  ],
  "intro": null,
  "sections": null,
  "related": null
}
```

## 官方示例

官方来源 SFC 状态：`unavailable`。仅展开首个可移植示例，不代表全部变体。

包内未提供可展开的官方可移植示例；不以场景源码、Studio cases 或手写代码补齐。
