<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 通知提醒 Notification — `WorkbenchNotification`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-notification`](<../../workbench/wb-notification.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-notification",
  "kind": "component",
  "version": "1.1.0",
  "summary": "在页面固定通知区域呈现需要用户留意的异步事件，支持短时自动消失、链接和队列管理。",
  "useWhen": ["右上角非阻断操作通知，可以包含标题、描述和链接。"],
  "avoidWhen": ["阻断确认使用 Feedback Dialog；只需短句操作结果使用 Message。","未经验证的公司内部UI框架或生产交付"],
  "status": {"maturity":"prototype-validated","deliveryEligibility":"prototype-only"},
  "usageStatus": "supported",
  "variantStatus": "unsupported",
  "variantUnsupported": [
    {
      "code": "CUSTOM_VARIANT_GALLERY",
      "reason": "A custom gallery or indirect scenario factory owns the rendered cases; manifest declarations are preserved, but are not claimed as an exhaustive portable gallery."
    }
  ]
}
```

未声明或为空：unsupported、usageUnsupported、caseSemantics（不代表支持）

## 公开 API

包内声明原样列出；null 与“未声明或为空”字段不代表支持，不猜测签名、嵌套类型或动态 slot 名。

```json
{
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchNotification"},
  "props": {"items":{"type":"Array","default":{"kind":"function"}},"surface":{"type":"String","default":"default","enum":["default","subtle"]},"duration":{"type":"Number","default":5000}},
  "events": ["dismiss","link"],
  "propNotes": {"items":"通知数据数组；每项需要唯一稳定id。","surface":"default或subtle通知表面样式。","duration":"可见通知的停留毫秒数；修改后可见项重新计时。"},
  "eventNotes": {"dismiss":{"payload":"{id,reason}，reason为button、timeout或overflow。","timing":"关闭、超时或超出可见数量时发出；父级负责从items移除。"},"link":{"payload":"{id,href}导航信息。","timing":"通知链接激活时发出，原生导航继续执行。"}}
}
```

未声明或为空：eventDetails、slots、slotDetails、slotPatterns、exposed、family、slotNotes（不代表支持）

## 规则与适用条件

```json
{
  "rules": [
    {
      "id": "wb-notification-rule-1",
      "title": "用途与边界",
      "text": "右上角非阻断操作通知，可以包含标题、描述和链接。 阻断确认使用 Feedback Dialog；只需短句操作结果使用 Message。",
      "strength": "must",
      "status": "confirmed",
      "when": ["使用通知提醒 Notification"],
      "references": []
    },
    {"id":"wb-notification-rule-2","title":"交互与状态","text":"鼠标和键盘焦点任一位于通知内均暂停，离开后续计剩余时长；无关条目变化不重启计时；删除与卸载清理计时。","strength":"must","status":"confirmed","when":["使用通知提醒 Notification"],"references":[]},
    {
      "id": "wb-notification-rule-3",
      "title": "公开API",
      "text": "| 参数 | 合同 |\n| --- | --- |\n| items | 默认[]；按新到旧排列，id必填且唯一 |\n| 条目 | id、type(info/success/warning/danger/critical/error)、title、description、linkLabel、linkHref；链接文案与真实导航地址成对提供；showIcon/showClose未传视为true |\n| surface | default（默认浮层背景）/ subtle（语义浅色） |\n| duration | 默认5000毫秒；0常驻，负数或非有限值回退5000 |\n\n事件：`dismiss({id,reason:'button'|'timeout'|'overflow'})`、`link({id,href})`。链接保留浏览器默认导航，事件只用于埋点或旁路监听。最多显示前三条，所有越界条目各发一次 overflow；父级负责移除。id在存续期间代表同一通知，发送新通知请用新id。修改duration对当前可见条目重置完整时长，同时保留悬停/焦点暂停。",
      "strength": "must",
      "status": "confirmed",
      "when": ["使用通知提醒 Notification"],
      "references": []
    },
    {
      "id": "wb-notification-real-navigation",
      "title": "真实导航链接",
      "text": "链接文案与linkHref成对提供，复用WorkbenchLink和Link状态链；原生导航与link事件同时保留，事件不阻止默认导航。缺地址时不渲染伪链接。",
      "strength": "must",
      "status": "confirmed",
      "when": ["提示内容包含导航入口"],
      "references": []
    }
  ],
  "dependencies": ["wb-link"],
  "foundationKeys": ["color-info-primary","color-info-secondary-subtle","color-success","color-success-primary-subtle","color-warning","color-warning-subtle","color-alert","color-alert-subtle","color-error","color-error-subtle","color-surface-overlay","color-text-primary","color-text-secondary","color-text-inverse","color-icon-primary","color-icon-hover","color-border-focus","radius-lg","shadow-lg","font-body-m","font-body-s","font-headline-s","spacing-component-xs","spacing-component-sm","spacing-component-lg","color-icon-active"],
  "intro": "在页面固定通知区域呈现需要用户留意的异步事件，支持短时自动消失、链接和队列管理。",
  "sections": [
    {"id":"selection","title":"选型","paragraphs":["用于异步任务完成、后台更新等可并列事件；单次即时反馈用Message，页面内持续说明用Alert。"],"bullets":[]},
    {"id":"structure","title":"设计结构与排版","paragraphs":["items为带稳定id的受控通知集合；最多呈现前三条，溢出通过事件通知父级清理。surface选择默认或浅色表面，duration控制停留时间。"],"bullets":[]},
    {"id":"interaction","title":"交互与键盘","paragraphs":["通知内悬停或焦点均暂停计时；链接保留原生导航。卸载和移除条目会清理计时。"],"bullets":[]},
    {"id":"responsibility","title":"使用边界与职责","paragraphs":["组件公开入口为 WorkbenchNotification（@workbench/ui-vue3）。当前资格：prototype-only；业务数据、持久化和流程决策由宿主承担。"],"bullets":[]}
  ],
  "related": [{"label":"通知提醒 Notification组件规范","href":"#rules"}]
}
```

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "controlled-example",
  "title": "同步完成通知",
  "portability": "portable",
  "source": {
    "kind": "studio-official-usage",
    "ownerAssetId": "wb-notification",
    "scenarioId": "notification",
    "exampleId": "controlled-example",
    "codeSha256": "sha256:6169dbe4b8f996a968f165833193aa44f786fb3ea0a5b8e849ca2c59d5b4d1d2"
  },
  "description": "同步完成通知业务场景的完整Vue示例，包含公开组件导入和所需数据。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchNotification } from '@workbench/ui-vue3'
const items = ref([{ id: 'sync-1', message: '同步已完成', type: 'success', linkLabel: '查看结果', linkHref: '/results' }])
function dismiss({ id }) { items.value = items.value.filter(item => item.id !== id) }
</script>
<template><WorkbenchNotification :items="items" :duration="5000" @dismiss="dismiss" /></template>
```
