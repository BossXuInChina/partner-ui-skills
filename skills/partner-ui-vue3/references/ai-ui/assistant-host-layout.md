<!-- Generated from huawei-partner-ai-ui@0.3.1-dev.20261106.1 (16d91bbbede5006960cce5278b0e2cda88785393) — do not edit. -->

# 面板 · 侧栏、悬浮与全屏 — `AssistantHostLayout`

包：`huawei-partner-ai-ui@0.3.1-dev.20261106.1` · commit：`16d91bbbede5006960cce5278b0e2cda88785393` · dirty：false

资格（包内声明）：channel=unknown；stableEligible=unknown；targetProductionEligible=unknown。元数据和示例不授予发布或生产批准。

## 组件预览

[Open in Studio](http://localhost:4178/overview.html?page=panel#panel-advanced)

```json
{
  "id": "assistant-host-layout",
  "label": "面板 · 侧栏、悬浮与全屏",
  "summary": "通用聊天呈现与可选宿主；消息、请求由业务控制器持有",
  "group": "component",
  "publicImport": {
    "moduleName": "huawei-partner-ai-ui",
    "exportName": "AssistantHostLayout"
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
      "id": "overview-live-panel",
      "label": "LivePanel",
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
    "open": {
      "type": "boolean",
      "required": true,
      "default": {
        "kind": "undefined"
      }
    },
    "windowMode": {
      "type": "ChatWindowMode",
      "required": false,
      "default": {
        "kind": "literal",
        "value": "sidebar"
      },
      "resolvedType": "'sidebar' | 'floating'"
    },
    "sidebarBehavior": {
      "type": "ChatSidebarBehavior",
      "required": false,
      "default": {
        "kind": "literal",
        "value": "push"
      },
      "resolvedType": "'push' | 'overlay'"
    },
    "fullscreen": {
      "type": "boolean",
      "required": false,
      "default": {
        "kind": "literal",
        "value": false
      }
    },
    "viewportWidth": {
      "type": "number",
      "required": false,
      "default": {
        "kind": "undefined"
      }
    },
    "overlayLayer": {
      "type": "number",
      "required": false,
      "default": {
        "kind": "literal",
        "value": 1000
      }
    },
    "flow": {
      "type": "boolean",
      "required": false,
      "default": {
        "kind": "literal",
        "value": false
      }
    }
  },
  "events": [
    "update:windowMode",
    "update:fullscreen"
  ],
  "eventDetails": {
    "update:windowMode": {
      "signature": "(mode: ChatWindowMode) => void",
      "parameters": [
        {
          "name": "mode",
          "type": "ChatWindowMode",
          "optional": false,
          "rest": false
        }
      ]
    },
    "update:fullscreen": {
      "signature": "(value: boolean) => void",
      "parameters": [
        {
          "name": "value",
          "type": "boolean",
          "optional": false,
          "rest": false
        }
      ]
    }
  },
  "slots": [
    "navigation",
    "default",
    "assistant"
  ],
  "slotDetails": {
    "navigation": {
      "type": null,
      "typeStatus": "not-derived",
      "bindings": {},
      "unsupported": [
        {
          "code": "SLOT_TYPE_NOT_DECLARED",
          "reason": "Slot navigation exists in the actual template/setup implementation but has no explicit defineSlots contract; binding expressions are recorded without inventing parameter types."
        }
      ]
    },
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
    },
    "assistant": {
      "type": null,
      "typeStatus": "not-derived",
      "bindings": {
        "window-mode": "mode",
        "fullscreen": "fullscreen",
        "toggle-fullscreen": "expansion.toggle",
        "switch-mode": "switchMode",
        "drag-start": "floating.start",
        "drag-keydown": "floating.keyboard"
      },
      "unsupported": [
        {
          "code": "SLOT_TYPE_NOT_DECLARED",
          "reason": "Slot assistant exists in the actual template/setup implementation but has no explicit defineSlots contract; binding expressions are recorded without inventing parameter types."
        }
      ]
    }
  },
  "exposed": []
}
```
