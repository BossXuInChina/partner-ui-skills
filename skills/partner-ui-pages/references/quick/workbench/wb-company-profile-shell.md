<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 公司资料外壳 Block — `WorkbenchCompanyProfileShell`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-company-profile-shell`](<../../workbench/wb-company-profile-shell.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-company-profile-shell",
  "kind": "block",
  "version": "1.0.0",
  "summary": "同一业务对象下的资料维护页共享身份区和两级栏目导航",
  "useWhen": ["同一业务对象下的资料维护页共享身份区和两级栏目导航"],
  "avoidWhen": ["跨产品导航、权限裁决或真实路由必须由区块承担","单页表单无需身份区或共享栏目导航"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchCompanyProfileShell"},
  "props": {
    "primaryItems": {"type":"Array","required":true},
    "secondaryItems": {"type":"Array","default":{"kind":"function"}},
    "secondaryParent": {"type":"String","default":""},
    "initialPrimary": {"type":"String","default":""},
    "initialSecondary": {"type":"String","default":""},
    "navigation": {"type":"Object","required":true},
    "breadcrumbs": {"type":"Array","default":{"kind":"function"}},
    "identity": {"type":"Object","required":true},
    "primaryLabel": {"type":"String","default":"一级栏目"},
    "secondaryLabel": {"type":"String","default":"二级栏目"},
    "contentLabel": {"type":"String","default":"资料内容"},
    "contentClass": {"type":["String","Array","Object","Function"],"default":""}
  },
  "events": ["update:primary","update:secondary","navigation-action","breadcrumb-navigate"],
  "eventDetails": null,
  "slots": ["secondary-content","primary-content","hint","footer"],
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
      "id": "wb-company-profile-shell-content-ownership",
      "title": "外壳与业务内容分离",
      "text": "Block 提供公司身份、导航、一级／二级页签和内容 Card；页签内容、权限与业务数据由调用方通过插槽和事件提供。",
      "strength": "must",
      "status": "confirmed",
      "when": ["同一公司下多类资料维护"],
      "references": []
    }
  ],
  "dependencies": ["wb-top-nav","wb-breadcrumb","wb-tag","wb-card","wb-tabs"],
  "foundationKeys": [
    "color-border-separator",
    "color-surface-page",
    "color-text-primary",
    "color-text-secondary",
    "font-body-m",
    "font-headline-s",
    "spacing-component-lg",
    "spacing-component-sm",
    "spacing-component-xl",
    "spacing-layout-container-block",
    "spacing-layout-content-gap",
    "spacing-screen-edge-expanded"
  ],
  "intro": null,
  "sections": null,
  "related": null
}
```

## 官方示例

官方来源 SFC 状态：`unavailable`。仅展开首个可移植示例，不代表全部变体。

包内未提供可展开的官方可移植示例；不以场景源码、Studio cases 或手写代码补齐。
