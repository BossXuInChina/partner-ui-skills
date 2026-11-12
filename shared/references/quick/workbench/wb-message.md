<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 全局提示 Message — `WorkbenchMessage`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-message`](<../../workbench/wb-message.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-message",
  "kind": "component",
  "version": "1.1.0",
  "summary": "先用单条代表消息试用全局或对话框内位置，再并列比较七种语义与附件；此页保留完整公开API、业务边界和原专题说明。",
  "useWhen": ["用户操作后的短暂成功、错误或处理中反馈，无标题。"],
  "avoidWhen": ["长期内容使用 Alert；右上角多条通知使用 Notification。","未经验证的公司内部UI框架或生产交付"],
  "status": {"maturity":"prototype-validated","deliveryEligibility":"prototype-only"},
  "source": {
    "package": "@workbench/ui-vue3",
    "version": "0.2.0-prototype.20261106.7",
    "commit": "6dad97e7a215069b5841b1f4413f80c1c587c1cc"
  },
  "unsupported": null,
  "usageStatus": "supported",
  "usageUnsupported": [],
  "variantStatus": "unsupported",
  "variantUnsupported": [
    {
      "code": "CUSTOM_VARIANT_GALLERY",
      "reason": "A custom gallery or indirect scenario factory owns the rendered cases; manifest declarations are preserved, but are not claimed as an exhaustive portable gallery."
    }
  ],
  "caseSemantics": null
}
```

## 公开 API

以下字段来自包内声明。null 表示来源为空或未声明，不代表支持；不猜测签名、嵌套类型或动态 slot 名。

```json
{
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchMessage"},
  "props": {
    "modelValue": {"type":"Boolean","default":false},
    "type": {"type":"String","default":"info","enum":["info","success","warning","danger","critical","error","loading"]},
    "message": {"type":"String","required":true},
    "messageKey": {"type":["String","Number"],"default":""},
    "linkLabel": {"type":"String","default":""},
    "linkHref": {"type":"String","default":""},
    "checkboxLabel": {"type":"String","default":""},
    "checkboxChecked": {"type":"Boolean","default":false},
    "showIcon": {"type":"Boolean","default":true},
    "showClose": {"type":"Boolean","default":true},
    "placement": {"type":"String","default":"global","enum":["global","dialog"]},
    "autoClose": {"type":"Number","default":{"kind":"undefined"}}
  },
  "events": ["update:modelValue","update:checkboxChecked","close","link"],
  "eventDetails": null,
  "slots": [],
  "slotDetails": null,
  "slotPatterns": [],
  "exposed": [],
  "family": [
    {
      "assetId": "wb-message",
      "independentApproval": false,
      "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"GlobalMessageStack"},
      "props": {"items":{"type":"Array","default":{"kind":"function"}},"autoClose":{"type":"Number","default":{"kind":"undefined"}}},
      "events": ["dismiss","link","checkbox"],
      "slots": [],
      "slotPatterns": [],
      "exposed": []
    }
  ],
  "propNotes": {
    "modelValue": "单条提示是否显示。",
    "type": "反馈语义类型，如info、success、warning、danger、critical、error或loading。",
    "message": "必需正文；保持短句。",
    "messageKey": "提示实例键；内容相同但键变化时重置计时。",
    "linkLabel": "尾部链接文案，需与linkHref配对。",
    "linkHref": "尾部链接真实导航地址。",
    "checkboxLabel": "可选受控复选项文案。",
    "checkboxChecked": "复选项当前值，变化由父级更新。",
    "showIcon": "是否显示类型图标。",
    "showClose": "是否显示关闭入口。",
    "placement": "global传送到全局层；dialog定位于对话框内。",
    "autoClose": "自动关闭毫秒数；0表示常驻，loading始终常驻。"
  },
  "eventNotes": {
    "update:modelValue": {"payload":"新的可见状态。","timing":"关闭或超时后发出false。"},
    "update:checkboxChecked": {"payload":"复选框新的布尔值。","timing":"用户切换“不再提示”选项时发出。"},
    "close": {"payload":"关闭原因timeout或button。","timing":"超时或用户关闭后发出。"},
    "link": {"payload":"包含href的导航信息对象。","timing":"用户激活链接时发出；不阻止浏览器原生导航。"}
  },
  "slotNotes": {}
}
```

## 规则与适用条件

```json
{
  "rules": [
    {
      "id": "wb-message-rule-1",
      "title": "用途与边界",
      "text": "用户操作后的短暂成功、错误或处理中反馈，无标题。 长期内容使用 Alert；右上角多条通知使用 Notification。",
      "strength": "must",
      "status": "confirmed",
      "when": ["使用全局提示 Message"],
      "references": []
    },
    {
      "id": "wb-message-rule-2",
      "title": "交互与状态",
      "text": "悬停与焦点独立暂停计时，两者都离开才恢复剩余时间；更换消息内容、键、类型或时长重新计时。链接不关闭，卸载清理定时器。",
      "strength": "must",
      "status": "confirmed",
      "when": ["使用全局提示 Message"],
      "references": []
    },
    {
      "id": "wb-message-rule-3",
      "title": "公开API",
      "text": "| 参数 | 合同 |\n| --- | --- |\n| modelValue | Boolean，默认 false；受控显示 |\n| type | info（默认）、success、warning、danger、critical、error、loading |\n| message / messageKey | 必填正文；可选 String/Number 实例键，相同正文的新键重置完整停留时间 |\n| linkLabel / linkHref / showIcon / showClose | 链接文案与真实地址成对提供；图标和关闭按钮默认true |\n| checkboxLabel / checkboxChecked | 可选“不再提示”文案；受控选中值，默认false |\n| placement | global（默认，Teleport到body）/ dialog（父级相对定位内容内） |\n| autoClose | 毫秒；全局默认2000，对话框有关闭2000、无关闭7000；0常驻；loading始终常驻 |\n\n事件：`update:modelValue(false)`、`update:checkboxChecked(boolean)`、`close('timeout'|'button')`、`link({href})`。非法时长回退该布局默认值。\n\nGlobalMessageStack：items 按最新在前，id 必填且唯一；新项进入顶部时短暂保留前一项，使其按 Notification 的 move 动效下移，200ms 后发送 dismiss({id,reason:'replaced'}) 请求退出，稳定态只保留最新一条。条目含 id、message、messageKey、type、linkLabel、linkHref、checkboxLabel、checkboxChecked、showIcon、showClose；autoClose 默认2000，loading常驻。事件 dismiss({id,reason:'timeout'|'button'|'replaced'})、link({id,href})、checkbox({id,checked})。父级必须按id删除或更新受控复选值，不要依赖组件修改数组。\n\n正文默认按内容保持单行，最大宽度452px；空间不足时正文自然换行，链接标签不可拆分，复选框整体换至下一行并与正文起点对齐。图标和关闭按钮始终对齐正文第一行中心。",
      "strength": "must",
      "status": "confirmed",
      "when": ["使用全局提示 Message"],
      "references": []
    },
    {
      "id": "wb-message-real-navigation",
      "title": "真实导航链接",
      "text": "链接文案与linkHref成对提供，复用WorkbenchLink和Link状态链；原生导航与link事件同时保留，事件不阻止默认导航。缺地址时不渲染伪链接。",
      "strength": "must",
      "status": "confirmed",
      "when": ["提示内容包含导航入口"],
      "references": []
    }
  ],
  "dependencies": ["wb-link","wb-scrollbar"],
  "foundationKeys": [
    "color-info-primary",
    "color-success",
    "color-warning",
    "color-alert",
    "color-error",
    "color-surface-overlay",
    "color-surface-page",
    "color-text-primary",
    "color-text-inverse",
    "color-icon-primary",
    "color-icon-hover",
    "color-border-focus",
    "radius-lg",
    "radius-full",
    "shadow-lg",
    "font-body-m",
    "font-body-s",
    "spacing-component-sm",
    "spacing-component-md",
    "spacing-component-lg",
    "icon-size-16",
    "color-icon-active"
  ],
  "intro": "先用单条代表消息试用全局或对话框内位置，再并列比较七种语义与附件；此页保留完整公开API、业务边界和原专题说明。",
  "sections": [
    {"id":"selection","title":"选型","paragraphs":["用于短时成功、错误或处理中反馈；持续可见的页面说明用Alert，右上角多条通知用Notification。"],"bullets":[]},
    {
      "id": "structure",
      "title": "设计结构与排版",
      "paragraphs": ["modelValue控制单条提示显示；GlobalMessageStack按id维护全局消息队列。链接需同时提供文案和真实地址，复选值由父级受控。"],
      "bullets": []
    },
    {"id":"interaction","title":"交互与键盘","paragraphs":["关闭按钮与链接使用原生键盘语义；悬停或焦点暂停计时，离开后继续剩余时间。链接保留浏览器导航。"],"bullets":[]},
    {
      "id": "responsibility",
      "title": "使用边界与职责",
      "paragraphs": ["组件公开入口为 WorkbenchMessage（@workbench/ui-vue3）。当前资格：prototype-only；业务数据、持久化和流程决策由宿主承担。"],
      "bullets": []
    }
  ],
  "related": [{"label":"全局提示 Message组件规范","href":"#rules"}]
}
```

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "controlled-example",
  "title": "设置保存成功提示",
  "portability": "portable",
  "source": {
    "kind": "studio-official-usage",
    "ownerAssetId": "wb-message",
    "scenarioId": "message",
    "exampleId": "controlled-example",
    "codeSha256": "sha256:9a235f1ae72356b20ed6effa4193c8ac8a1930e88dfb6ce3c552ea5413ee6fa5"
  },
  "description": "设置保存成功提示业务场景的完整Vue示例，包含公开组件导入和所需数据。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchMessage } from '@workbench/ui-vue3'
const visible = ref(true)
const checked = ref(false)
</script>
<template>
  <WorkbenchMessage v-model="visible" type="success" message="设置已保存" checkbox-label="不再提示" v-model:checkbox-checked="checked" :auto-close="0" />
</template>
```
