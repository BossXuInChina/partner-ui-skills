<!-- Generated from huawei-partner-ai-ui@0.3.1-dev.20261106.1 (16d91bbbede5006960cce5278b0e2cda88785393) — do not edit. -->

# BusinessTable — `BusinessTable`

包：`huawei-partner-ai-ui@0.3.1-dev.20261106.1` · commit：`16d91bbbede5006960cce5278b0e2cda88785393` · dirty：false

资格（包内声明）：channel=unknown；stableEligible=unknown；targetProductionEligible=unknown。元数据和示例不授予发布或生产批准。

## 组件预览

[Open in Studio](http://localhost:4178/overview.html?page=agreement-table#agreement-table-example)

```json
{
  "id": "business-table",
  "label": "BusinessTable",
  "summary": null,
  "group": "component",
  "publicImport": {
    "moduleName": "huawei-partner-ai-ui",
    "exportName": "BusinessTable"
  },
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
  "source": {
    "package": "huawei-partner-ai-ui",
    "version": "0.3.1-dev.20261106.1",
    "commit": "16d91bbbede5006960cce5278b0e2cda88785393"
  },
  "unsupported": [
    {
      "code": "CATALOG_SUMMARY_UNAVAILABLE",
      "reason": "The owning overview catalog has no dedicated summary for this public export; no new prose is invented."
    }
  ]
}
```

## 变体与状态

案例来自包内预览清单；controls 不推导为组件 props。

```json
{
  "caseCoverage": {
    "status": "unsupported",
    "scope": "Direct public-component imports and actual template tags in existing preview Vue files; runtime props and indirect child cases are not inferred.",
    "unsupported": [
      {
        "code": "CASE_PROPS_NOT_EXPORTED",
        "reason": "Existing preview usages are listed, but the producer has no owning serializable case props/controls contract."
      }
    ]
  },
  "cases": [
    {
      "id": "overview-examples-table-example",
      "label": "TableExample",
      "group": null,
      "props": null,
      "propsStatus": "not-derived",
      "unsupported": [
        {
          "code": "PREVIEW_PROPS_NOT_DERIVED",
          "reason": "This existing preview template imports and renders the public component; its props depend on preview state/handlers and are not exported as a serializable case object."
        },
        {
          "code": "CASE_GROUP_NOT_DECLARED",
          "reason": "The preview file does not declare a canonical variant/state case group."
        }
      ]
    }
  ]
}
```

## 使用场景

包内列出预览案例及覆盖范围；不推导额外适用场景或复制示例源码。

## 使用规范与API

以下为包内声明；缺失的签名或类型不作推断。

```json
{
  "props": {
    "columns": {
      "type": "BusinessColumn[]",
      "required": true,
      "default": {
        "kind": "undefined"
      }
    },
    "rows": {
      "type": "Record<string, unknown>[]",
      "required": true,
      "default": {
        "kind": "undefined"
      }
    },
    "label": {
      "type": "string",
      "required": false,
      "default": {
        "kind": "literal",
        "value": "业务数据"
      }
    },
    "rowKey": {
      "type": "string",
      "required": false,
      "default": {
        "kind": "literal",
        "value": "id"
      }
    },
    "minWidth": {
      "type": "number",
      "required": false,
      "default": {
        "kind": "undefined"
      }
    },
    "fit": {
      "type": "boolean",
      "required": false,
      "default": {
        "kind": "literal",
        "value": false
      }
    },
    "ellipsis": {
      "type": "boolean",
      "required": false,
      "default": {
        "kind": "literal",
        "value": false
      }
    },
    "cellText": {
      "type": "(row: Record<string, unknown>, column: BusinessColumn) => string",
      "required": false,
      "default": {
        "kind": "undefined"
      }
    }
  },
  "events": [],
  "eventDetails": {},
  "slots": [
    "cell"
  ],
  "slotDetails": {
    "cell": {
      "type": null,
      "typeStatus": "not-derived",
      "bindings": {
        "row": "row",
        "column": "column"
      },
      "unsupported": [
        {
          "code": "SLOT_TYPE_NOT_DECLARED",
          "reason": "Slot cell exists in the actual template/setup implementation but has no explicit defineSlots contract; binding expressions are recorded without inventing parameter types."
        }
      ]
    }
  },
  "exposed": []
}
```
