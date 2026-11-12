<!-- Generated from huawei-partner-ai-ui@0.3.1-dev.20261106.1 (16d91bbbede5006960cce5278b0e2cda88785393) — do not edit. -->

# 宿主 · Drawer / Modal 与作业区 — `UiDialog`

包：`huawei-partner-ai-ui@0.3.1-dev.20261106.1` · commit：`16d91bbbede5006960cce5278b0e2cda88785393` · dirty：false

资格（包内声明）：channel=unknown；stableEligible=unknown；targetProductionEligible=unknown。元数据和示例不授予发布或生产批准。

完整资料：[`ui-dialog`](<../../ai-ui/ui-dialog.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "ui-dialog",
  "kind": "component",
  "version": null,
  "summary": "区域模态和所属 document 全局模态有明确边界",
  "useWhen": null,
  "avoidWhen": null,
  "status": {
    "maturity": null,
    "deliveryEligibility": null,
    "unsupported": [
      {
        "code": "AI_RELEASE_STATUS_UNDECLARED",
        "reason": "The owning AI UI release metadata declares version/source identity but no component maturity or delivery-eligibility status."
      }
    ]
  },
  "source": {"package":"huawei-partner-ai-ui","version":"0.3.1-dev.20261106.1","commit":"16d91bbbede5006960cce5278b0e2cda88785393"},
  "unsupported": null,
  "usageStatus": "unknown",
  "usageUnsupported": null,
  "variantStatus": "unknown",
  "variantUnsupported": null,
  "caseSemantics": null
}
```

## 公开 API

以下字段来自包内声明。null 表示来源为空或未声明，不代表支持；不猜测签名、嵌套类型或动态 slot 名。

```json
{
  "publicImport": {"moduleName":"huawei-partner-ai-ui","exportName":"UiDialog"},
  "props": {
    "titleId": {"type":"string","required":true,"default":{"kind":"undefined"}},
    "drawer": {"type":"boolean","required":false,"default":{"kind":"undefined"}},
    "scope": {"type":"BusinessDialogScope","required":false,"default":{"kind":"undefined"},"resolvedType":"'region' | 'global'"},
    "theme": {"type":"'workbench' | 'aurora'","required":false,"default":{"kind":"undefined"}}
  },
  "events": ["close"],
  "eventDetails": {"close":{"signature":"() => void","parameters":[]}},
  "slots": ["default"],
  "slotDetails": {
    "default": {
      "type": null,
      "typeStatus": "not-derived",
      "bindings": {},
      "unsupported": [
        {
          "code": "SLOT_TYPE_NOT_DECLARED",
          "reason": "Slot default exists in the actual template/setup implementation but has no explicit defineSlots contract; binding expressions are recorded without inventing parameter types."
        }
      ]
    }
  },
  "slotPatterns": null,
  "exposed": [],
  "family": null,
  "propNotes": null,
  "eventNotes": null,
  "slotNotes": null
}
```

## 规则与适用条件

```json
{"rules":null,"dependencies":null,"foundationKeys":null,"intro":null,"sections":null,"related":null}
```

## 官方示例

官方来源 SFC 状态：`unknown`。仅展开首个可移植示例，不代表全部变体。

包内未提供可展开的官方可移植示例；不以场景源码、Studio cases 或手写代码补齐。
