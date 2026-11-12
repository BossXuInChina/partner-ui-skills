<!-- Generated from huawei-partner-ai-ui@0.3.1-dev.20261106.1 (16d91bbbede5006960cce5278b0e2cda88785393) — do not edit. -->

# AgreementAssistantPanel — `AgreementAssistantPanel`

包：`huawei-partner-ai-ui@0.3.1-dev.20261106.1` · commit：`16d91bbbede5006960cce5278b0e2cda88785393` · dirty：false

资格（包内声明）：channel=unknown；stableEligible=unknown；targetProductionEligible=unknown。元数据和示例不授予发布或生产批准。

完整资料：[`agreement-assistant-panel`](<../../ai-ui/agreement-assistant-panel.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "agreement-assistant-panel",
  "kind": "component",
  "status": {
    "maturity": null,
    "deliveryEligibility": null,
    "unsupported": [{"code":"AI_RELEASE_STATUS_UNDECLARED","reason":"The owning AI UI release metadata declares version/source identity but no component maturity or delivery-eligibility status."}]
  },
  "unsupported": [{"code":"CATALOG_SUMMARY_UNAVAILABLE","reason":"The owning overview catalog has no dedicated summary for this public export; no new prose is invented."}],
  "usageStatus": "unknown",
  "variantStatus": "unknown"
}
```

未声明或为空：version、summary、useWhen、avoidWhen、variantUnsupported、caseSemantics（不代表支持）

## 公开 API

包内声明原样列出；null 与“未声明或为空”字段不代表支持，不猜测签名、嵌套类型或动态 slot 名。

```json
{
  "publicImport": {"moduleName":"huawei-partner-ai-ui","exportName":"AgreementAssistantPanel"},
  "props": {
    "icons": {"type":"AiIconMap","required":false,"default":{"kind":"undefined"},"resolvedType":"Partial<Record<AiIconName, Component | AiIconDefinition>>"},
    "businessActionMode": {"type":"BusinessActionMode","required":false,"default":{"kind":"literal","value":"default"},"resolvedType":"'default' | 'host'"},
    "businessDialogScope": {"type":"BusinessDialogScope","required":false,"default":{"kind":"undefined"},"resolvedType":"'region' | 'global'"},
    "windowMode": {"type":"ChatWindowMode","required":false,"default":{"kind":"undefined"},"resolvedType":"'sidebar' | 'floating'"},
    "fullscreen": {"type":"boolean","required":false,"default":{"kind":"undefined"}},
    "adapter": {"type":"AgreementAssistantAdapter","required":true,"default":{"kind":"undefined"}},
    "theme": {"type":"'workbench' | 'aurora'","required":false,"default":{"kind":"literal","value":"workbench"}},
    "autoStart": {"type":"boolean","required":false,"default":{"kind":"literal","value":false}},
    "avatarSrc": {"type":"string","required":false,"default":{"kind":"expression","source":"assistantAvatar"}},
    "toolbarActions": {"type":"ChatToolbarAction[]","required":false,"default":{"kind":"factory","source":"() => []"}},
    "modeOptions": {"type":"ComposerModeOption[]","required":false,"default":{"kind":"factory","source":"()=>[]"}},
    "welcomeEntries": {"type":"WelcomeBusinessEntry[]","required":false,"default":{"kind":"factory","source":"()=>[]"}},
    "suggestionPills": {"type":"ChatSuggestionPill[]","required":false,"default":{"kind":"factory","source":"()=>[]"}},
    "messagePrompts": {"type":"MessagePromptsResolver","required":false,"default":{"kind":"undefined"},"resolvedType":"(message: UIMessage) => ChatSuggestion[]"},
    "historyOptions": {"type":"ConversationHistoryOptions","required":false,"default":{"kind":"undefined"}},
    "contentRenderers": {"type":"BubbleContentRendererMatch[]","required":false,"default":{"kind":"factory","source":"()=>[]"}}
  },
  "events": ["businessAction","workspaceNavigate","windowModeChange","fullscreenChange","windowDragStart","windowDragKeydown","status","toolbarAction","composerChange","welcomeAction"],
  "eventDetails": {
    "businessAction": {"signature":"(action: AgreementBusinessAction) => void","parameters":[{"name":"action","type":"AgreementBusinessAction","optional":false,"rest":false}]},
    "workspaceNavigate": {"signature":"(navigation: WorkspaceNavigation) => void","parameters":[{"name":"navigation","type":"WorkspaceNavigation","optional":false,"rest":false}]},
    "windowModeChange": {"signature":"(mode: ChatWindowMode) => void","parameters":[{"name":"mode","type":"ChatWindowMode","optional":false,"rest":false}]},
    "fullscreenChange": {"signature":"(value: boolean) => void","parameters":[{"name":"value","type":"boolean","optional":false,"rest":false}]},
    "windowDragStart": {"signature":"(event: PointerEvent) => void","parameters":[{"name":"event","type":"PointerEvent","optional":false,"rest":false}]},
    "windowDragKeydown": {"signature":"(event: KeyboardEvent) => void","parameters":[{"name":"event","type":"KeyboardEvent","optional":false,"rest":false}]},
    "status": {"signature":"(state: { dirty: boolean; busy: boolean }) => void","parameters":[{"name":"state","type":"{ dirty: boolean; busy: boolean }","optional":false,"rest":false}]},
    "toolbarAction": {"signature":"(action: ChatToolbarAction) => void","parameters":[{"name":"action","type":"ChatToolbarAction","optional":false,"rest":false}]},
    "composerChange": {"signature":"(context: ComposerRequestContext) => void","parameters":[{"name":"context","type":"ComposerRequestContext","optional":false,"rest":false}]},
    "welcomeAction": {"signature":"(entry: WelcomeBusinessEntry) => void","parameters":[{"name":"entry","type":"WelcomeBusinessEntry","optional":false,"rest":false}]}
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
  "exposed": ["applyBusinessUpdate","currentStatus","discardDraft","reset","newConversation","canSendQuery","sendQuery","getMessages","locateReply","start"]
}
```

未声明或为空：slotPatterns、family、propNotes、eventNotes、slotNotes（不代表支持）

## 规则与适用条件

未声明或为空：rules、dependencies、foundationKeys、intro、sections、related（不代表支持）

## 官方示例

官方来源 SFC 状态：`unknown`。包内未提供可展开的官方可移植示例；不以场景源码、Studio cases 或手写代码补齐。
