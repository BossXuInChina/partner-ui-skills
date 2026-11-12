<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 文字下钻 MoreAction Block — `WorkbenchMoreAction`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-more-action`](<../../workbench/wb-more-action.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-more-action",
  "kind": "block",
  "version": "1.0.0",
  "summary": "卡片标题或页签头右侧的“更多”“查看历史”等下钻入口",
  "useWhen": ["卡片标题或页签头右侧的“更多”“查看历史”等下钻入口"],
  "avoidWhen": ["跳转到真实地址且无需按钮语义（使用Link）","主要操作（使用填充按钮）","未经生产接入验证即宣称可生产交付"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchMoreAction"},
  "props": {"label":{"type":"String","default":"更多"},"disabled":{"type":"Boolean","default":false}},
  "events": ["click"],
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
      "id": "wb-more-action-style",
      "title": "无容器文字下钻",
      "text": "使用Button appearance=text、intent=drilldown、drilldown=more与textLayout=inline：仅占文字行高、无内边距，右侧箭头沿用Button规则；保留悬浮、按下、焦点与禁用状态。",
      "strength": "must",
      "status": "confirmed",
      "when": ["卡片或页签头部下钻入口"],
      "references": []
    }
  ],
  "dependencies": ["wb-button"],
  "foundationKeys": [],
  "intro": null,
  "sections": null,
  "related": null
}
```

## 官方示例

官方来源 SFC 状态：`unavailable`。仅展开首个可移植示例，不代表全部变体。

包内未提供可展开的官方可移植示例；不以场景源码、Studio cases 或手写代码补齐。
