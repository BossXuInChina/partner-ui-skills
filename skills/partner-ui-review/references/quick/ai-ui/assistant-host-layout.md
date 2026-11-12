<!-- Generated from huawei-partner-ai-ui@0.3.1-dev.20261106.1 (16d91bbbede5006960cce5278b0e2cda88785393) — do not edit. -->

# 面板 · 侧栏、悬浮与全屏 — `AssistantHostLayout`

包：`huawei-partner-ai-ui@0.3.1-dev.20261106.1` · commit：`16d91bbbede5006960cce5278b0e2cda88785393` · dirty：false

资格（包内声明）：channel=unknown；stableEligible=unknown；targetProductionEligible=unknown。元数据和示例不授予发布或生产批准。

完整资料：[`assistant-host-layout`](<../../ai-ui/assistant-host-layout.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "assistant-host-layout",
  "kind": "component",
  "version": null,
  "summary": "通用聊天呈现与可选宿主；消息、请求由业务控制器持有",
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
  "publicImport": {"moduleName":"huawei-partner-ai-ui","exportName":"AssistantHostLayout"},
  "props": {
    "open": {"type":"boolean","required":true,"default":{"kind":"undefined"}},
    "windowMode": {
      "type": "ChatWindowMode",
      "required": false,
      "default": {"kind":"literal","value":"sidebar"},
      "resolvedType": "'sidebar' | 'floating'"
    },
    "sidebarBehavior": {
      "type": "ChatSidebarBehavior",
      "required": false,
      "default": {"kind":"literal","value":"push"},
      "resolvedType": "'push' | 'overlay'"
    },
    "fullscreen": {"type":"boolean","required":false,"default":{"kind":"literal","value":false}},
    "viewportWidth": {"type":"number","required":false,"default":{"kind":"undefined"}},
    "overlayLayer": {"type":"number","required":false,"default":{"kind":"literal","value":1000}},
    "flow": {"type":"boolean","required":false,"default":{"kind":"literal","value":false}}
  },
  "events": ["update:windowMode","update:fullscreen"],
  "eventDetails": {
    "update:windowMode": {
      "signature": "(mode: ChatWindowMode) => void",
      "parameters": [{"name":"mode","type":"ChatWindowMode","optional":false,"rest":false}]
    },
    "update:fullscreen": {"signature":"(value: boolean) => void","parameters":[{"name":"value","type":"boolean","optional":false,"rest":false}]}
  },
  "slots": ["navigation","default","assistant"],
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
