<!-- Generated from huawei-partner-ai-ui@0.3.1-dev.20261106.1 (16d91bbbede5006960cce5278b0e2cda88785393) — do not edit. -->

# 面板 · 侧栏、悬浮与全屏 — `ChatPanel`

包：`huawei-partner-ai-ui@0.3.1-dev.20261106.1` · commit：`16d91bbbede5006960cce5278b0e2cda88785393` · dirty：false

资格（包内声明）：channel=unknown；stableEligible=unknown；targetProductionEligible=unknown。元数据和示例不授予发布或生产批准。

完整资料：[`chat-panel`](<../../ai-ui/chat-panel.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "chat-panel",
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
  "publicImport": {"moduleName":"huawei-partner-ai-ui","exportName":"ChatPanel"},
  "props": {
    "icons": {
      "type": "AiIconMap",
      "required": false,
      "default": {"kind":"undefined"},
      "resolvedType": "Partial<Record<AiIconName, Component | AiIconDefinition>>"
    },
    "windowMode": {"type":"ChatWindowMode","required":false,"default":{"kind":"undefined"},"resolvedType":"'sidebar' | 'floating'"},
    "fullscreen": {"type":"boolean","required":false,"default":{"kind":"undefined"}},
    "messages": {"type":"UIMessage[]","required":true,"default":{"kind":"undefined"}},
    "processing": {"type":"boolean","required":true,"default":{"kind":"undefined"}},
    "continuationAvailable": {"type":"boolean","required":false,"default":{"kind":"literal","value":false}},
    "error": {"type":"string","required":true,"default":{"kind":"undefined"}},
    "aborted": {"type":"boolean","required":true,"default":{"kind":"undefined"}},
    "renderers": {"type":"BubbleContentRendererMatch[]","required":false,"default":{"kind":"factory","source":"() => []"}},
    "avatarSrc": {"type":"string","required":false,"default":{"kind":"expression","source":"assistantAvatar"}},
    "toolbarActions": {"type":"ChatToolbarAction[]","required":false,"default":{"kind":"factory","source":"() => []"}},
    "modeOptions": {"type":"ComposerModeOption[]","required":false,"default":{"kind":"factory","source":"() => []"}},
    "welcomeEntries": {"type":"WelcomeBusinessEntry[]","required":false,"default":{"kind":"factory","source":"() => []"}},
    "suggestionPills": {"type":"ChatSuggestionPill[]","required":false,"default":{"kind":"factory","source":"() => []"}},
    "messagePrompts": {
      "type": "MessagePromptsResolver",
      "required": false,
      "default": {"kind":"undefined"},
      "resolvedType": "(message: UIMessage) => ChatSuggestion[]"
    },
    "requestContext": {"type":"ComposerRequestContext","required":false,"default":{"kind":"undefined"}},
    "newConversationDisabled": {"type":"boolean","required":false,"default":{"kind":"literal","value":false}},
    "conversationId": {"type":"string","required":false,"default":{"kind":"undefined"}},
    "conversationView": {"type":"ConversationViewState","required":false,"default":{"kind":"undefined"}},
    "historyAvailable": {"type":"boolean","required":false,"default":{"kind":"literal","value":false}},
    "historyOpen": {"type":"boolean","required":false,"default":{"kind":"literal","value":false}},
    "closable": {"type":"boolean","required":false,"default":{"kind":"literal","value":false}}
  },
  "events": [
    "close",
    "windowModeChange",
    "fullscreenChange",
    "windowDragStart",
    "windowDragKeydown",
    "send",
    "abort",
    "retry",
    "event",
    "toolbarAction",
    "newConversation",
    "historyOpen",
    "conversationViewChange",
    "composerChange",
    "welcomeAction"
  ],
  "eventDetails": {
    "close": {"signature":"() => void","parameters":[]},
    "windowModeChange": {
      "signature": "(mode: ChatWindowMode) => void",
      "parameters": [{"name":"mode","type":"ChatWindowMode","optional":false,"rest":false}]
    },
    "fullscreenChange": {"signature":"(value: boolean) => void","parameters":[{"name":"value","type":"boolean","optional":false,"rest":false}]},
    "windowDragStart": {
      "signature": "(event: PointerEvent) => void",
      "parameters": [{"name":"event","type":"PointerEvent","optional":false,"rest":false}]
    },
    "windowDragKeydown": {
      "signature": "(event: KeyboardEvent) => void",
      "parameters": [{"name":"event","type":"KeyboardEvent","optional":false,"rest":false}]
    },
    "send": {
      "signature": "(query: string, context: ComposerRequestContext) => void",
      "parameters": [
        {"name":"query","type":"string","optional":false,"rest":false},
        {"name":"context","type":"ComposerRequestContext","optional":false,"rest":false}
      ]
    },
    "abort": {
      "signature": "(snapshot?: ChatDisplayStopSnapshot) => void",
      "parameters": [{"name":"snapshot","type":"ChatDisplayStopSnapshot","optional":true,"rest":false}]
    },
    "retry": {"signature":"() => void","parameters":[]},
    "event": {
      "signature": "(event: BubbleEvent) => void",
      "parameters": [{"name":"event","type":"BubbleEvent","optional":false,"rest":false}]
    },
    "toolbarAction": {
      "signature": "(action: ChatToolbarAction) => void",
      "parameters": [{"name":"action","type":"ChatToolbarAction","optional":false,"rest":false}]
    },
    "newConversation": {"signature":"() => void","parameters":[]},
    "historyOpen": {
      "signature": "(anchor: HTMLElement) => void",
      "parameters": [{"name":"anchor","type":"HTMLElement","optional":false,"rest":false}]
    },
    "conversationViewChange": {
      "signature": "(view: ConversationViewState) => void",
      "parameters": [{"name":"view","type":"ConversationViewState","optional":false,"rest":false}]
    },
    "composerChange": {
      "signature": "(context: ComposerRequestContext) => void",
      "parameters": [{"name":"context","type":"ComposerRequestContext","optional":false,"rest":false}]
    },
    "welcomeAction": {
      "signature": "(entry: WelcomeBusinessEntry) => void",
      "parameters": [{"name":"entry","type":"WelcomeBusinessEntry","optional":false,"rest":false}]
    }
  },
  "slots": ["toolbar-end"],
  "slotDetails": {
    "toolbar-end": {
      "type": null,
      "typeStatus": "not-derived",
      "bindings": {},
      "unsupported": [
        {
          "code": "SLOT_TYPE_NOT_DECLARED",
          "reason": "Slot toolbar-end exists in the actual template/setup implementation but has no explicit defineSlots contract; binding expressions are recorded without inventing parameter types."
        }
      ]
    }
  },
  "slotPatterns": null,
  "exposed": ["resetComposer","captureView","locateReply"],
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
