<!-- Generated from huawei-partner-ai-ui@0.3.1-dev.20261106.1 (16d91bbbede5006960cce5278b0e2cda88785393) — do not edit. -->

# 面板 · 侧栏、悬浮与全屏 — `ConversationHistoryPanel`

包：`huawei-partner-ai-ui@0.3.1-dev.20261106.1` · commit：`16d91bbbede5006960cce5278b0e2cda88785393` · dirty：false

资格（包内声明）：channel=unknown；stableEligible=unknown；targetProductionEligible=unknown。元数据和示例不授予发布或生产批准。

## 组件预览

[Open in Studio](http://localhost:4178/overview.html?page=panel#panel-advanced)

```json
{
  "id": "conversation-history-panel",
  "label": "面板 · 侧栏、悬浮与全屏",
  "summary": "通用聊天呈现与可选宿主；消息、请求由业务控制器持有",
  "group": "component",
  "publicImport": {
    "moduleName": "huawei-partner-ai-ui",
    "exportName": "ConversationHistoryPanel"
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
      "id": "overview-live-history",
      "label": "LiveHistory",
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
    },
    {
      "id": "overview-examples-history-example",
      "label": "HistoryExample",
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
    "anchor": {
      "type": "HTMLElement",
      "required": true,
      "default": {
        "kind": "undefined"
      }
    },
    "open": {
      "type": "boolean",
      "required": true,
      "default": {
        "kind": "undefined"
      }
    },
    "records": {
      "type": "ConversationRecord[]",
      "required": true,
      "default": {
        "kind": "undefined"
      }
    },
    "selected": {
      "type": "string",
      "required": true,
      "default": {
        "kind": "undefined"
      }
    },
    "busy": {
      "type": "boolean",
      "required": true,
      "default": {
        "kind": "undefined"
      }
    },
    "error": {
      "type": "string",
      "required": true,
      "default": {
        "kind": "undefined"
      }
    },
    "readFailed": {
      "type": "boolean",
      "required": true,
      "default": {
        "kind": "undefined"
      }
    },
    "blocked": {
      "type": "boolean",
      "required": true,
      "default": {
        "kind": "undefined"
      }
    },
    "clear": {
      "type": "()=>Promise<boolean>",
      "required": true,
      "default": {
        "kind": "undefined"
      }
    },
    "remove": {
      "type": "(id:string)=>Promise<boolean>",
      "required": true,
      "default": {
        "kind": "undefined"
      }
    },
    "select": {
      "type": "(id:string)=>Promise<boolean>",
      "required": true,
      "default": {
        "kind": "undefined"
      }
    }
  },
  "events": [
    "close",
    "closed",
    "pin",
    "reload"
  ],
  "eventDetails": {
    "close": {
      "signature": "() => void",
      "parameters": []
    },
    "closed": {
      "signature": "() => void",
      "parameters": []
    },
    "pin": {
      "signature": "(id: string) => void",
      "parameters": [
        {
          "name": "id",
          "type": "string",
          "optional": false,
          "rest": false
        }
      ]
    },
    "reload": {
      "signature": "() => void",
      "parameters": []
    }
  },
  "slots": [],
  "slotDetails": {},
  "exposed": []
}
```
