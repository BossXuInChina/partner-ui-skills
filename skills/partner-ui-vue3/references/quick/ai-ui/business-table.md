<!-- Generated from huawei-partner-ai-ui@0.3.1-dev.20261106.1 (16d91bbbede5006960cce5278b0e2cda88785393) — do not edit. -->

# BusinessTable — `BusinessTable`

包：`huawei-partner-ai-ui@0.3.1-dev.20261106.1` · commit：`16d91bbbede5006960cce5278b0e2cda88785393` · dirty：false

资格（包内声明）：channel=unknown；stableEligible=unknown；targetProductionEligible=unknown。元数据和示例不授予发布或生产批准。

完整资料：[`business-table`](<../../ai-ui/business-table.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "business-table",
  "kind": "component",
  "version": null,
  "summary": null,
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
  "unsupported": [
    {
      "code": "CATALOG_SUMMARY_UNAVAILABLE",
      "reason": "The owning overview catalog has no dedicated summary for this public export; no new prose is invented."
    }
  ],
  "usageStatus": "unknown",
  "usageUnsupported": [
    {
      "code": "CATALOG_SUMMARY_UNAVAILABLE",
      "reason": "The owning overview catalog has no dedicated summary for this public export; no new prose is invented."
    }
  ],
  "variantStatus": "unknown",
  "variantUnsupported": null,
  "caseSemantics": null
}
```

## 公开 API

以下字段来自包内声明。null 表示来源为空或未声明，不代表支持；不猜测签名、嵌套类型或动态 slot 名。

```json
{
  "publicImport": {"moduleName":"huawei-partner-ai-ui","exportName":"BusinessTable"},
  "props": {
    "columns": {"type":"BusinessColumn[]","required":true,"default":{"kind":"undefined"}},
    "rows": {"type":"Record<string, unknown>[]","required":true,"default":{"kind":"undefined"}},
    "label": {"type":"string","required":false,"default":{"kind":"literal","value":"业务数据"}},
    "rowKey": {"type":"string","required":false,"default":{"kind":"literal","value":"id"}},
    "minWidth": {"type":"number","required":false,"default":{"kind":"undefined"}},
    "fit": {"type":"boolean","required":false,"default":{"kind":"literal","value":false}},
    "ellipsis": {"type":"boolean","required":false,"default":{"kind":"literal","value":false}},
    "cellText": {
      "type": "(row: Record<string, unknown>, column: BusinessColumn) => string",
      "required": false,
      "default": {"kind":"undefined"}
    }
  },
  "events": [],
  "eventDetails": {},
  "slots": ["cell"],
  "slotDetails": {
    "cell": {
      "type": null,
      "typeStatus": "not-derived",
      "bindings": {"row":"row","column":"column"},
      "unsupported": [
        {
          "code": "SLOT_TYPE_NOT_DECLARED",
          "reason": "Slot cell exists in the actual template/setup implementation but has no explicit defineSlots contract; binding expressions are recorded without inventing parameter types."
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
