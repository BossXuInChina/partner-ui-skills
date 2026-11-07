<!-- Generated from huawei-partner-ai-ui@0.3.1-dev.20261106.1 (16d91bbbede5006960cce5278b0e2cda88785393) — do not edit. -->

# 宿主 · Drawer / Modal 与作业区 — `BusinessOverlayHost`

包：`huawei-partner-ai-ui@0.3.1-dev.20261106.1` · commit：`16d91bbbede5006960cce5278b0e2cda88785393` · dirty：false

资格（包内声明）：channel=unknown；stableEligible=unknown；targetProductionEligible=unknown。元数据和示例不授予发布或生产批准。

## 组件预览

[Open in Studio](http://localhost:4178/overview.html?page=overlays#overlays-advanced)

```json
{
  "id": "business-overlay-host",
  "label": "宿主 · Drawer / Modal 与作业区",
  "summary": "区域模态和所属 document 全局模态有明确边界",
  "group": "component",
  "publicImport": {
    "moduleName": "huawei-partner-ai-ui",
    "exportName": "BusinessOverlayHost"
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
  }
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
    "region": {
      "type": "HTMLElement",
      "required": false,
      "default": {
        "kind": "undefined"
      }
    },
    "layer": {
      "type": "number",
      "required": false,
      "default": {
        "kind": "undefined"
      }
    }
  },
  "events": [],
  "eventDetails": {},
  "slots": [
    "default"
  ],
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
  "exposed": []
}
```
