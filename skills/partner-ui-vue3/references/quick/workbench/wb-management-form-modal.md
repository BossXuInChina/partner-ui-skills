<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 必填编辑弹窗 · 校验与失败重试 — `WorkbenchManagementFormModal`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-management-form-modal`](<../../workbench/wb-management-form-modal.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-management-form-modal",
  "kind": "block",
  "version": "1.0.0",
  "summary": "管理资料以单层 Modal 承载字段表单并需要稳定的提醒、补充内容和操作区插槽",
  "useWhen": ["管理资料以单层 Modal 承载字段表单并需要稳定的提醒、补充内容和操作区插槽"],
  "avoidWhen": ["嵌套确认或跨步骤提交流程","表单字段、必填规则或真实保存行为应被区块固定"],
  "status": {"maturity":"prototype-validated","deliveryEligibility":"prototype-only"},
  "source": {
    "package": "@workbench/ui-vue3",
    "version": "0.2.0-prototype.20261106.7",
    "commit": "6dad97e7a215069b5841b1f4413f80c1c587c1cc"
  },
  "unsupported": null,
  "usageStatus": "unavailable",
  "usageUnsupported": [
    {
      "code": "OFFICIAL_SFC_MISSING",
      "reason": "No official usage SFC mentions this public asset. Scenario/story source was not substituted."
    }
  ],
  "variantStatus": "unavailable",
  "variantUnsupported": [
    {
      "code": "VARIANT_VIEW_MISSING",
      "reason": "No current declared variants view/readingPilot is available; source declarations are retained."
    }
  ],
  "caseSemantics": null
}
```

## 公开 API

以下字段来自包内声明。null 表示来源为空或未声明，不代表支持；不猜测签名、嵌套类型或动态 slot 名。

```json
{
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchManagementFormModal"},
  "props": {
    "modelValue": {"type":"Boolean"},
    "title": {"type":"String","required":true},
    "size": {"type":"String","default":"l","enum":["m","l"]},
    "contentClass": {"type":"String","default":""}
  },
  "events": ["update:modelValue"],
  "eventDetails": null,
  "slots": ["notice","default","supplement","footer"],
  "slotDetails": null,
  "slotPatterns": [],
  "exposed": [],
  "family": [],
  "propNotes": null,
  "eventNotes": null,
  "slotNotes": null
}
```

## 规则与适用条件

```json
{
  "rules": [
    {
      "id": "wb-management-form-modal-slots",
      "title": "内容由宿主提供",
      "text": "Block 提供单层大尺寸 Modal、主要内容、可选提醒／补充区和 footer 插槽；字段、校验与提交回调由宿主持有。",
      "strength": "must",
      "status": "confirmed",
      "when": ["创建或编辑管理记录"],
      "references": []
    },
    {
      "id": "wb-management-form-modal-no-business-save",
      "title": "不持有业务保存",
      "text": "Block 只转发受控开关与关闭事件，不执行持久化，也不隐含成功状态。",
      "strength": "must",
      "status": "confirmed",
      "when": ["使用管理表单 Modal"],
      "references": []
    }
  ],
  "dependencies": ["wb-modal"],
  "foundationKeys": ["spacing-layout-container-inline","spacing-layout-content-gap"],
  "intro": null,
  "sections": null,
  "related": null
}
```

## 官方示例

官方来源 SFC 状态：`unavailable`。仅展开首个可移植示例，不代表全部变体。

包内未提供可展开的官方可移植示例；不以场景源码、Studio cases 或手写代码补齐。
