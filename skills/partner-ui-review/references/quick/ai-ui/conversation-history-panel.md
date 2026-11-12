<!-- Generated from huawei-partner-ai-ui@0.3.1-dev.20261106.1 (16d91bbbede5006960cce5278b0e2cda88785393) — do not edit. -->

# 面板 · 侧栏、悬浮与全屏 — `ConversationHistoryPanel`

包：`huawei-partner-ai-ui@0.3.1-dev.20261106.1` · commit：`16d91bbbede5006960cce5278b0e2cda88785393` · dirty：false

资格（包内声明）：channel=unknown；stableEligible=unknown；targetProductionEligible=unknown。元数据和示例不授予发布或生产批准。

完整资料：[`conversation-history-panel`](<../../ai-ui/conversation-history-panel.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "conversation-history-panel",
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
  "publicImport": {"moduleName":"huawei-partner-ai-ui","exportName":"ConversationHistoryPanel"},
  "props": {
    "anchor": {"type":"HTMLElement","required":true,"default":{"kind":"undefined"}},
    "open": {"type":"boolean","required":true,"default":{"kind":"undefined"}},
    "records": {"type":"ConversationRecord[]","required":true,"default":{"kind":"undefined"}},
    "selected": {"type":"string","required":true,"default":{"kind":"undefined"}},
    "busy": {"type":"boolean","required":true,"default":{"kind":"undefined"}},
    "error": {"type":"string","required":true,"default":{"kind":"undefined"}},
    "readFailed": {"type":"boolean","required":true,"default":{"kind":"undefined"}},
    "blocked": {"type":"boolean","required":true,"default":{"kind":"undefined"}},
    "clear": {"type":"()=>Promise<boolean>","required":true,"default":{"kind":"undefined"}},
    "remove": {"type":"(id:string)=>Promise<boolean>","required":true,"default":{"kind":"undefined"}},
    "select": {"type":"(id:string)=>Promise<boolean>","required":true,"default":{"kind":"undefined"}}
  },
  "events": ["close","closed","pin","reload"],
  "eventDetails": {
    "close": {"signature":"() => void","parameters":[]},
    "closed": {"signature":"() => void","parameters":[]},
    "pin": {"signature":"(id: string) => void","parameters":[{"name":"id","type":"string","optional":false,"rest":false}]},
    "reload": {"signature":"() => void","parameters":[]}
  },
  "slots": [],
  "slotDetails": {},
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
