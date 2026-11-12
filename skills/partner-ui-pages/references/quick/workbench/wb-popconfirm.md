<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 气泡确认 Popconfirm — `WorkbenchPopconfirm`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-popconfirm`](<../../workbench/wb-popconfirm.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-popconfirm",
  "kind": "component",
  "version": "1.0.0",
  "summary": "在触发元素附近确认一项轻量、局部且可立即判定的操作，用户确认后才由宿主执行业务动作。",
  "useWhen": ["触发器附近的简单确认，可用一段正文说明影响。"],
  "avoidWhen": ["复杂表单、长文本、高风险必须阅读的信息使用 Modal/Feedback Dialog。","未经验证的公司内部UI框架或生产交付"],
  "status": {"maturity":"prototype-validated","deliveryEligibility":"prototype-only"},
  "source": {
    "package": "@workbench/ui-vue3",
    "version": "0.2.0-prototype.20261106.7",
    "commit": "6dad97e7a215069b5841b1f4413f80c1c587c1cc"
  },
  "unsupported": null,
  "usageStatus": "supported",
  "usageUnsupported": [],
  "variantStatus": "supported",
  "variantUnsupported": [],
  "caseSemantics": "Studio controls, not public component props"
}
```

## 公开 API

以下字段来自包内声明。null 表示来源为空或未声明，不代表支持；不猜测签名、嵌套类型或动态 slot 名。

```json
{
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchPopconfirm"},
  "props": {
    "placement": {
      "type": "String",
      "default": "top",
      "enum": [
        "top-start",
        "top",
        "top-end",
        "right-start",
        "right",
        "right-end",
        "bottom-start",
        "bottom",
        "bottom-end",
        "left-start",
        "left",
        "left-end"
      ]
    },
    "open": {"type":"Boolean","default":{"kind":"undefined"}},
    "disabled": {"type":"Boolean"},
    "type": {"type":"String","default":"info","enum":["info","warning","danger","critical","error"]},
    "showIcon": {"type":"Boolean","default":true},
    "showCancel": {"type":"Boolean","default":true},
    "title": {"type":"String","required":true},
    "message": {"type":"String","default":""},
    "confirmText": {"type":"String","default":"确认"},
    "cancelText": {"type":"String","default":"取消"},
    "confirmDisabled": {"type":"Boolean"},
    "cancelDisabled": {"type":"Boolean"},
    "pending": {"type":"Boolean"},
    "beforeConfirm": {"type":"Function","default":{"kind":"undefined"}}
  },
  "events": ["update:open","confirm","cancel","confirm-error"],
  "eventDetails": null,
  "slots": ["trigger"],
  "slotDetails": null,
  "slotPatterns": [],
  "exposed": [],
  "family": [],
  "propNotes": {
    "placement": "确认面板优先展示方向。",
    "open": "可选受控打开状态。",
    "disabled": "禁用触发和确认面板。",
    "type": "确认风险或语义类型，决定提示样式。",
    "showIcon": "是否显示类型图标。",
    "showCancel": "是否显示取消按钮。",
    "title": "确认标题，必填。",
    "message": "补充确认说明。",
    "confirmText": "确认按钮文案。",
    "cancelText": "取消按钮文案。",
    "confirmDisabled": "禁用确认按钮。",
    "cancelDisabled": "禁用取消按钮。",
    "pending": "确认处理期间展示等待状态并防止重复确认。",
    "beforeConfirm": "确认前守卫，可同步或异步返回false阻止确认；抛错或Promise拒绝会发confirm-error。"
  },
  "eventNotes": {
    "update:open": {"payload":"新的打开状态。","timing":"受控或非受控显示状态变化时发出；受控调用方应同步更新open。"},
    "confirm": {"payload":"确认操作事件，无载荷。","timing":"beforeConfirm通过且确认被接受后发出。"},
    "cancel": {"payload":"关闭原因字符串，例如cancel、escape或tab。","timing":"用户取消、按Escape或通过Tab离开确认面板时发出。"},
    "confirm-error": {"payload":"确认守卫或确认流程错误对象。","timing":"beforeConfirm抛错或Promise拒绝时发出；返回false只阻止确认，不发此事件。"}
  },
  "slotNotes": {
    "trigger": {
      "scope": "触发确认面板的原始控件；参数为open与aria对象，aria含aria-expanded、aria-controls、aria-haspopup。",
      "description": "保留原有按钮/链接语义，确认组件不代替业务操作。"
    }
  }
}
```

## 规则与适用条件

```json
{
  "rules": [
    {
      "id": "wb-popconfirm-rule-1",
      "title": "用途与边界",
      "text": "触发器附近的简单确认，可用一段正文说明影响。 复杂表单、长文本、高风险必须阅读的信息使用 Modal/Feedback Dialog。",
      "strength": "must",
      "status": "confirmed",
      "when": ["使用气泡确认 Popconfirm"],
      "references": []
    },
    {
      "id": "wb-popconfirm-rule-2",
      "title": "交互与状态",
      "text": "主体和尾巴复用 Popover 正式几何参数；视口不足翻转夹紧；aria-controls关联隔离浮层，支持在Modal内部使用。",
      "strength": "must",
      "status": "confirmed",
      "when": ["使用气泡确认 Popconfirm"],
      "references": []
    },
    {
      "id": "wb-popconfirm-rule-3",
      "title": "公开API",
      "text": "| 参数 | 合同 |\n| --- | --- |\n| open | 未传内部管理，传入后由update:open控制；disabled强制隐藏 |\n| placement | top（默认）、right、bottom、left及各自-start/-end，共12方位 |\n| type / showIcon | info（默认）、warning、danger、critical、error；图标默认true |\n| title / message | 必填标题，可选正文 |\n| confirmText / cancelText | 默认确认/取消 |\n| showCancel / confirmDisabled / cancelDisabled | 默认true/false/false |\n| pending / beforeConfirm | 外部忙碌状态；可选异步确认回调，false或抛错保持打开 |\n\ntrigger 插槽收到 {open,aria}，调用方必须将aria绑定到单一可聚焦按钮。事件 update:open(boolean)、confirm()（beforeConfirm成功后）、cancel('cancel'|'outside'|'escape'|'tab')、confirm-error(error)。事件监听器返回的Promise不作为确认守卫。\n\n打开时焦点进入首个可用操作（优先取消）；Escape/取消回到触发器，Tab沿触发器所在页面顺序离开。待处理时禁止重复确认和关闭。关闭受控浮层需父级接受update:open。",
      "strength": "must",
      "status": "confirmed",
      "when": ["使用气泡确认 Popconfirm"],
      "references": []
    }
  ],
  "dependencies": ["wb-button","wb-popover"],
  "foundationKeys": [
    "color-surface-overlay",
    "color-text-primary",
    "color-text-secondary",
    "color-info-primary",
    "color-warning",
    "color-alert",
    "color-error",
    "color-text-inverse",
    "font-headline-s",
    "font-body-m",
    "radius-md",
    "shadow-lg",
    "spacing-component-lg",
    "spacing-component-sm"
  ],
  "intro": "在触发元素附近确认一项轻量、局部且可立即判定的操作，用户确认后才由宿主执行业务动作。",
  "sections": [
    {"id":"selection","title":"选型","paragraphs":["用于删除单条、移除成员等明确的局部决定；高影响、不可逆或需要解释的决策应使用Modal。"],"bullets":[]},
    {
      "id": "structure",
      "title": "设计结构与排版",
      "paragraphs": ["trigger插槽保留原始操作入口；标题、说明和确认/取消按钮构成决策面板。pending表示业务确认处理中。"],
      "bullets": []
    },
    {
      "id": "interaction",
      "title": "交互与键盘",
      "paragraphs": ["确认与取消通过原生按钮操作；Escape关闭。disabled禁用整组，confirmDisabled/cancelDisabled可独立限制操作。"],
      "bullets": []
    },
    {
      "id": "responsibility",
      "title": "使用边界与职责",
      "paragraphs": ["组件公开入口为 WorkbenchPopconfirm（@workbench/ui-vue3）。当前资格：prototype-only；业务数据、持久化和流程决策由宿主承担。"],
      "bullets": []
    }
  ],
  "related": [{"label":"气泡确认 Popconfirm组件规范","href":"#rules"}]
}
```

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "controlled-example",
  "title": "删除草稿确认",
  "portability": "portable",
  "source": {
    "kind": "studio-official-usage",
    "ownerAssetId": "wb-popconfirm",
    "scenarioId": "popconfirm",
    "exampleId": "controlled-example",
    "codeSha256": "sha256:57d9c9138e71012d8e62e93805c43a712f9fdef8709f5765c3fb85f2bdb22c67"
  },
  "description": "删除草稿确认业务场景的完整Vue示例，包含公开组件导入和所需数据。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchPopconfirm, WorkbenchButton } from '@workbench/ui-vue3'
const open = ref(false)
const deleted = ref(false)
async function beforeConfirm() { return true }
</script>
<template>
  <WorkbenchPopconfirm v-model:open="open" title="删除草稿？" message="此操作会移除当前草稿。" confirm-text="删除" type="danger" :before-confirm="beforeConfirm" @confirm="deleted = true">
    <template #trigger="{ aria }"><WorkbenchButton v-bind="aria" appearance="secondary">删除草稿</WorkbenchButton></template>
  </WorkbenchPopconfirm>
  <output>{{ deleted ? '草稿已删除' : '' }}</output>
</template>
```
