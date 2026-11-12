<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 认证详情 CertificationDetails Block — `WorkbenchCertificationDetails`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-certification-details`](<../../workbench/wb-certification-details.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-certification-details",
  "kind": "block",
  "version": "1.0.0",
  "summary": "身份达标等状态卡片底部展示认证类型、归属与关键日期的只读信息",
  "useWhen": ["身份达标等状态卡片底部展示认证类型、归属与关键日期的只读信息"],
  "avoidWhen": ["可编辑字段（使用Form）","超过五项或需要分组的详情（使用描述列表或表格）","未经生产接入验证即宣称可生产交付"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchCertificationDetails"},
  "props": {"details":{"type":"Object","required":true},"ariaLabel":{"type":"String","default":"认证详情"}},
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
      "id": "wb-certification-details-structure",
      "title": "只读认证事实",
      "text": "白色内卡，16px内边距、6px圆角，12px字号；首行为认证类型（alert状态subtle标签）与归属代表处/系统部，第二行为认证开始、结束、能力复核三项日期；宽度不足时自动换行，长文本断行。",
      "strength": "must",
      "status": "confirmed",
      "when": ["认证详情"],
      "references": []
    }
  ],
  "dependencies": ["wb-tag"],
  "foundationKeys": [
    "color-surface-card-default",
    "color-text-primary",
    "color-text-secondary",
    "font-body-s",
    "radius-md",
    "spacing-component-xs",
    "spacing-component-md",
    "spacing-component-lg",
    "spacing-component-xl"
  ],
  "intro": null,
  "sections": null,
  "related": null
}
```

## 官方示例

官方来源 SFC 状态：`unavailable`。仅展开首个可移植示例，不代表全部变体。

包内未提供可展开的官方可移植示例；不以场景源码、Studio cases 或手写代码补齐。
