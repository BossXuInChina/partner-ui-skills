<!-- Generated from huawei-partner-ai-ui@0.3.1-dev.20261031.1 (8d5f658b9152fecbe954840ac2f52a01c551636f) — do not edit. -->

# AgreementAssistantPanel — `AgreementAssistantPanel`

包：`huawei-partner-ai-ui@0.3.1-dev.20261031.1` · commit：`8d5f658b9152fecbe954840ac2f52a01c551636f` · dirty：false

资格（包内声明）：channel=unknown；stableEligible=unknown；targetProductionEligible=unknown。元数据和示例不授予发布或生产批准。

## 组件预览

[Open in Studio](http://localhost:4178/overview.html?page=handoff#icon-integration)

```json
{
  "id": "agreement-assistant-panel",
  "label": "AgreementAssistantPanel",
  "summary": null,
  "group": "component",
  "publicImport": {
    "moduleName": "huawei-partner-ai-ui",
    "exportName": "AgreementAssistantPanel"
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
    "version": "0.3.1-dev.20261031.1",
    "commit": "8d5f658b9152fecbe954840ac2f52a01c551636f"
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
      "id": "overview-icon-integration-examples",
      "label": "IconIntegrationExamples",
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
    "icons": {
      "type": "AiIconMap",
      "required": false,
      "default": {
        "kind": "undefined"
      },
      "resolvedType": "Partial<Record<AiIconName, Component | AiIconDefinition>>"
    },
    "businessActionMode": {
      "type": "BusinessActionMode",
      "required": false,
      "default": {
        "kind": "literal",
        "value": "default"
      },
      "resolvedType": "'default' | 'host'"
    },
    "businessDialogScope": {
      "type": "BusinessDialogScope",
      "required": false,
      "default": {
        "kind": "undefined"
      },
      "resolvedType": "'region' | 'global'"
    },
    "windowMode": {
      "type": "ChatWindowMode",
      "required": false,
      "default": {
        "kind": "undefined"
      },
      "resolvedType": "'sidebar' | 'floating'"
    },
    "fullscreen": {
      "type": "boolean",
      "required": false,
      "default": {
        "kind": "undefined"
      }
    },
    "adapter": {
      "type": "AgreementAssistantAdapter",
      "required": true,
      "default": {
        "kind": "undefined"
      }
    },
    "theme": {
      "type": "'workbench' | 'aurora'",
      "required": false,
      "default": {
        "kind": "literal",
        "value": "workbench"
      }
    },
    "autoStart": {
      "type": "boolean",
      "required": false,
      "default": {
        "kind": "literal",
        "value": false
      }
    },
    "avatarSrc": {
      "type": "string",
      "required": false,
      "default": {
        "kind": "expression",
        "source": "assistantAvatar"
      }
    },
    "toolbarActions": {
      "type": "ChatToolbarAction[]",
      "required": false,
      "default": {
        "kind": "factory",
        "source": "() => []"
      }
    },
    "modeOptions": {
      "type": "ComposerModeOption[]",
      "required": false,
      "default": {
        "kind": "factory",
        "source": "()=>[]"
      }
    },
    "welcomeEntries": {
      "type": "WelcomeBusinessEntry[]",
      "required": false,
      "default": {
        "kind": "factory",
        "source": "()=>[]"
      }
    },
    "suggestionPills": {
      "type": "ChatSuggestionPill[]",
      "required": false,
      "default": {
        "kind": "factory",
        "source": "()=>[]"
      }
    },
    "messagePrompts": {
      "type": "MessagePromptsResolver",
      "required": false,
      "default": {
        "kind": "undefined"
      },
      "resolvedType": "(message: UIMessage) => ChatSuggestion[]"
    },
    "historyOptions": {
      "type": "ConversationHistoryOptions",
      "required": false,
      "default": {
        "kind": "undefined"
      }
    },
    "contentRenderers": {
      "type": "BubbleContentRendererMatch[]",
      "required": false,
      "default": {
        "kind": "factory",
        "source": "()=>[]"
      }
    }
  },
  "events": [
    "businessAction",
    "workspaceNavigate",
    "windowModeChange",
    "fullscreenChange",
    "windowDragStart",
    "windowDragKeydown",
    "status",
    "toolbarAction",
    "composerChange",
    "welcomeAction"
  ],
  "eventDetails": {
    "businessAction": {
      "signature": "(action: AgreementBusinessAction) => void",
      "parameters": [
        {
          "name": "action",
          "type": "AgreementBusinessAction",
          "optional": false,
          "rest": false
        }
      ]
    },
    "workspaceNavigate": {
      "signature": "(navigation: WorkspaceNavigation) => void",
      "parameters": [
        {
          "name": "navigation",
          "type": "WorkspaceNavigation",
          "optional": false,
          "rest": false
        }
      ]
    },
    "windowModeChange": {
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
    "fullscreenChange": {
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
    "windowDragStart": {
      "signature": "(event: PointerEvent) => void",
      "parameters": [
        {
          "name": "event",
          "type": "PointerEvent",
          "optional": false,
          "rest": false
        }
      ]
    },
    "windowDragKeydown": {
      "signature": "(event: KeyboardEvent) => void",
      "parameters": [
        {
          "name": "event",
          "type": "KeyboardEvent",
          "optional": false,
          "rest": false
        }
      ]
    },
    "status": {
      "signature": "(state: { dirty: boolean; busy: boolean }) => void",
      "parameters": [
        {
          "name": "state",
          "type": "{ dirty: boolean; busy: boolean }",
          "optional": false,
          "rest": false
        }
      ]
    },
    "toolbarAction": {
      "signature": "(action: ChatToolbarAction) => void",
      "parameters": [
        {
          "name": "action",
          "type": "ChatToolbarAction",
          "optional": false,
          "rest": false
        }
      ]
    },
    "composerChange": {
      "signature": "(context: ComposerRequestContext) => void",
      "parameters": [
        {
          "name": "context",
          "type": "ComposerRequestContext",
          "optional": false,
          "rest": false
        }
      ]
    },
    "welcomeAction": {
      "signature": "(entry: WelcomeBusinessEntry) => void",
      "parameters": [
        {
          "name": "entry",
          "type": "WelcomeBusinessEntry",
          "optional": false,
          "rest": false
        }
      ]
    }
  },
  "slots": [
    "toolbar-end"
  ],
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
  "exposed": [
    "applyBusinessUpdate",
    "currentStatus",
    "discardDraft",
    "reset",
    "newConversation",
    "canSendQuery",
    "sendQuery",
    "getMessages",
    "locateReply",
    "start"
  ]
}
```
