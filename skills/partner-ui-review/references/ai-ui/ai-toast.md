<!-- Generated from huawei-partner-ai-ui@0.3.1-dev.20261106.1 (16d91bbbede5006960cce5278b0e2cda88785393) — do not edit. -->

# AiToast — `AiToast`

包：`huawei-partner-ai-ui@0.3.1-dev.20261106.1` · commit：`16d91bbbede5006960cce5278b0e2cda88785393` · dirty：false

资格（包内声明）：channel=unknown；stableEligible=unknown；targetProductionEligible=unknown。元数据和示例不授予发布或生产批准。

## 组件预览

[Open in Studio](http://localhost:4178/overview.html?page=messages#messages-example)

```json
{
  "id": "ai-toast",
  "label": "AiToast",
  "summary": null,
  "group": "component",
  "publicImport": {
    "moduleName": "huawei-partner-ai-ui",
    "exportName": "AiToast"
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
    "status": "unavailable",
    "scope": "Direct public-component imports and actual template tags in existing preview Vue files; runtime props and indirect child cases are not inferred.",
    "unsupported": [
      {
        "code": "DIRECT_PREVIEW_CASE_UNAVAILABLE",
        "reason": "No direct imported public-component template usage was found in preview sources; an indirect interaction is not invented as a standalone case."
      }
    ]
  },
  "cases": []
}
```

## 使用场景

包内列出预览案例及覆盖范围；不推导额外适用场景或复制示例源码。

## 使用规范与API

以下为包内声明；缺失的签名或类型不作推断。

```json
{
  "props": {
    "modelValue": {
      "type": "boolean",
      "required": true,
      "default": {
        "kind": "undefined"
      }
    },
    "message": {
      "type": "string",
      "required": true,
      "default": {
        "kind": "undefined"
      }
    },
    "type": {
      "type": "AiToastType",
      "required": false,
      "default": {
        "kind": "literal",
        "value": "success"
      },
      "resolvedType": "'success' | 'error'"
    },
    "duration": {
      "type": "number",
      "required": false,
      "default": {
        "kind": "literal",
        "value": 2000
      }
    }
  },
  "events": [
    "update:modelValue",
    "close"
  ],
  "eventDetails": {
    "update:modelValue": {
      "signature": "(value: boolean) => void",
      "parameters": [
        {
          "name": "value",
          "type": "boolean",
          "optional": false,
          "rest": false
        }
      ]
    },
    "close": {
      "signature": "() => void",
      "parameters": []
    }
  },
  "slots": [],
  "slotDetails": {},
  "exposed": []
}
```
