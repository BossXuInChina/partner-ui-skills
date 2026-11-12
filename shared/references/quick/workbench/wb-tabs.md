<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 页签 Tabs — `WorkbenchTabs`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-tabs`](<../../workbench/wb-tabs.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-tabs",
  "kind": "component",
  "version": "1.0.0",
  "summary": "用于切换相互关联的平级内容面板。需要互斥设置值但不切换内容面板时使用ButtonRadioGroup。",
  "useWhen": ["同一上下文内平级内容切换"],
  "avoidWhen": ["站点路由导航、异步加载时直接自动激活","未经验证的内部 UI 框架或生产交付"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchTabs"},
  "props": {
    "modelValue": {"type":["String","Number"],"required":true},
    "items": {"type":"Array","required":true},
    "variant": {"type":"String","default":"basic","enum":["basic","divider","rail","segment"]},
    "size": {"type":"String","default":"small","enum":["small","large"]},
    "align": {"type":"String","default":"start","enum":["start","center"]},
    "ariaLabel": {"type":"String","default":"页签"},
    "addable": {"type":"Boolean","default":false}
  },
  "events": ["update:modelValue","change","add","remove"],
  "slots": ["tab","panel"],
  "propNotes": {
    "modelValue": "当前唯一选中值，必填。",
    "items": "必填页签数组；value唯一、label提供可访问名称，可选disabled与closable。",
    "variant": "basic、divider、rail或segment。",
    "size": "small或large。",
    "ariaLabel": "页签列表可访问名称。",
    "addable": "显示可新增页签的入口；只支持basic、divider、rail。"
  },
  "eventNotes": {
    "update:modelValue": {"payload":"新选中的String或Number value。","timing":"选择启用项后发出。"},
    "change": {"payload":"被选中的item对象。","timing":"选中值变化后发出。"},
    "add": {"payload":"无。","timing":"激活新增入口后发出；调用方创建新item并更新items。"},
    "remove": {"payload":"请求移除的item对象。","timing":"启用且closable的basic页签被关闭时发出；组件保留数据所有权给调用方。"}
  },
  "slotNotes": {"tab":{"scope":"{ item, selected }","description":"自定义页签标签；保留可访问标签与选中状态。"},"panel":{"scope":"{ item }","description":"渲染当前选中项的内容面板；内容数据和草稿由调用方维护。"}}
}
```

未声明或为空：eventDetails、slotDetails、slotPatterns、exposed、family（不代表支持）

## 规则与适用条件

```json
{
  "rules": [
    {"id":"wb-tabs-rule-1","title":"选型边界","text":"同一上下文内平级内容切换；不适用于站点路由导航、异步加载时直接自动激活","strength":"must","status":"confirmed","when":["同一上下文内平级内容切换"],"references":[]},
    {
      "id": "wb-tabs-rule-2",
      "title": "交互与调用合同",
      "text": "`v-model` 必须对应 items 中可用的唯一 value；label 为可访问名称，disabled 项不可选择。tab 插槽接收 item、selected，panel 插槽接收 item；切换后只保留当前 panel 插槽内容，业务草稿由父级托管。溢出项经左右方向键/Home/End 激活后，焦点转移到“更多”菜单按钮；按钮说明包含当前项，tabpanel 直接以当前项命名。更多支持方向键续接、向下打开、Escape 回焦点；离开组件关闭菜单。宽度恢复时焦点从更多恢复到当前页签。",
      "strength": "must",
      "status": "confirmed",
      "when": ["同一上下文内平级内容切换"],
      "references": []
    },
    {
      "id": "wb-tabs-rule-3",
      "title": "复用边界",
      "text": "页签是带面板关联的自动激活模型，不等同于 Button 或站点导航。更多菜单为该模型内的入口，负责溢出选中项的焦点接续和宽度恢复；首版保留内部结构，复用 Foundation 文字、状态、阴影与圆角。",
      "strength": "must",
      "status": "confirmed",
      "when": ["同一上下文内平级内容切换"],
      "references": []
    }
  ],
  "foundationKeys": ["color-border-focus","color-border-separator","color-brand","color-fill-hover","color-surface-card-default","color-surface-overlay","color-surface-page","color-text-disabled","color-text-primary","color-text-secondary","font-body-l","font-body-m","radius-full","radius-sm","shadow-sm","spacing-component-lg","spacing-component-sm","spacing-component-xs"],
  "intro": "用于切换相互关联的平级内容面板。需要互斥设置值但不切换内容面板时使用ButtonRadioGroup。",
  "sections": [
    {
      "id": "placement",
      "title": "样式与嵌套",
      "paragraphs": ["basic用于卡片或面板内的平级内容；divider用于页面级导航；rail与segment用于有层级依据的嵌套页面。最多三级嵌套，层级顺序根据容器背景选择。"],
      "bullets": ["basic默认且最常用。文本保持单行，调用方为长标签预留宽度。","空间不足时尾部自动折叠为更多，仍通过同一个modelValue切换面板。"]
    },
    {
      "id": "content",
      "title": "数据与键盘",
      "paragraphs": ["items的value必须唯一，label为可访问名称；disabled项不可选择。方向键、Home和End按自动激活模型切换，并跳过禁用项。"],
      "bullets": ["panel插槽只呈现当前项内容；面板草稿由父级托管。","closable仅适用于basic；组件发出remove请求，不会直接修改items。addable显示新增入口，调用方创建并更新项目。"]
    }
  ]
}
```

未声明或为空：dependencies、related（不代表支持）

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "application-sections",
  "title": "申请详情页签",
  "portability": "portable",
  "source": {"kind":"studio-official-usage","ownerAssetId":"wb-tabs","scenarioId":"tabs","exampleId":"application-sections","codeSha256":"sha256:4acf11bbf504e75619c5360c6bb59dd861a5f50460b7b6cd7d8dd53fbb368785"},
  "description": "面板根据当前页签值显示相应平级信息；切换后的业务数据由父级决定。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchTabs } from '@workbench/ui-vue3'
const active = ref('summary')
const tabs = [
  { value: 'summary', label: '申请摘要' },
  { value: 'materials', label: '提交材料' },
  { value: 'history', label: '审核记录' },
]
</script>
<template>
  <WorkbenchTabs v-model="active" :items="tabs" aria-label="申请详情">
    <template #panel="{ item }"><section><h2>{{ item.label }}</h2><p>展示{{ item.label }}对应的申请信息。</p></section></template>
  </WorkbenchTabs>
</template>
```
