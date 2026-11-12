<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 按钮 Button — `WorkbenchButton`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-button`](<../../workbench/wb-button.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-button",
  "kind": "component",
  "version": "1.7.0",
  "summary": "用于提交、创建、编辑、取消与轻量披露等明确操作。按钮承载动作，不代替链接导航、互斥选择或内容页签。",
  "useWhen": ["操作入口","更多、展开与收起入口"],
  "avoidWhen": ["未经验证的内部框架生产实现","以颜色代替权限或错误说明"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchButton"},
  "props": {
    "appearance": {"type":"String","default":"primary","enum":["primary","secondary","text","icon"]},
    "variant": {"type":"String","default":"default","enum":["default","dashed"]},
    "size": {"type":"String","default":"32"},
    "textLayout": {"type":"String","default":"container","enum":["inline","container"]},
    "iconLayout": {"type":"String","default":"inline","enum":["inline","container"]},
    "disabled": {"type":"Boolean","default":false},
    "intent": {"type":"String","default":"action","enum":["action","drilldown"]},
    "drilldown": {"type":"String","default":"more","enum":["more","expand","collapse"]},
    "ariaLabel": {"type":"String","default":""},
    "previewState": {"type":"String","default":"default"}
  },
  "slots": ["icon","default"],
  "propNotes": {
    "appearance": "选择primary、secondary、text或icon外观。",
    "size": "按钮尺寸字符串；当前组件默认32，填充按钮支持28、32、36，文字与图标尺寸按组件契约使用。",
    "textLayout": "文字按钮默认 container，提供标准尺寸及透明内边距；inline 随行高且无内边距。",
    "iconLayout": "图标按钮默认 inline 贴合实际图标；container 使用32/24px标准点击区域。",
    "disabled": "禁用原生按钮交互。",
    "intent": "text外观的action或drilldown语义。",
    "drilldown": "披露箭头方向：more、expand或collapse。",
    "ariaLabel": "提供纯图标按钮的可访问名称。",
    "previewState": "Studio状态预览值；业务交互应由真实DOM状态和调用方逻辑管理。"
  },
  "slotNotes": {"default":{"scope":"无","description":"按钮可见文案。"},"icon":{"scope":"无","description":"primary / secondary 使用前置图标，text 使用尾部图标，icon 使用主体图标；drilldown 箭头由组件管理。省略 icon 插槽会移除图标占位，按钮仍遵循原有最小宽度。"}}
}
```

未声明或为空：events、eventDetails、slotDetails、slotPatterns、exposed、family、eventNotes（不代表支持）

## 规则与适用条件

```json
{
  "rules": [
    {
      "id": "wb-button-height",
      "title": "32px 默认高度",
      "text": "默认高度32px；填充按钮36px用于全局操作，28px用于复合组件的紧凑操作。尺寸选择与文字字号分别判断。文字按钮另有可选的无容器变体 textLayout=inline，高度随文字行高。",
      "strength": "default",
      "status": "confirmed",
      "when": ["使用按钮"],
      "references": []
    },
    {"id":"wb-button-text-size","title":"14px 默认文字字号","text":"列表、表格操作列及卡片右上角的操作和下钻默认使用14px，不因处于复合组件内部自动缩小。","strength":"default","status":"confirmed","when":["使用按钮"],"references":[]},
    {
      "id": "wb-button-min-width",
      "title": "填充按钮三档最小宽度",
      "text": "填充按钮 S、M、L 分别对应28、32、36px高度，最小宽度分别为72、88、96px；内容超过最小宽度时允许按钮自然撑宽。该规则不扩展到文字按钮与图标按钮。",
      "strength": "must",
      "status": "confirmed",
      "when": ["使用填充按钮"],
      "references": ["wb-button-height"]
    },
    {
      "id": "wb-button-small-text",
      "title": "12px 慎用",
      "text": "14px文字按钮用于主要内容区、高频操作和标准卡片。12px仅建议用于高密度、次要辅助区或空间极受限的场景，如空状态轻量引导、极次要全局辅助状态栏；慎用并控制在2–4个汉字，点击区域不小于24×24px。",
      "strength": "recommendation",
      "status": "confirmed",
      "when": ["使用按钮"],
      "references": []
    },
    {
      "id": "wb-button-intent",
      "title": "颜色表达用途",
      "text": "操作类文字默认蓝色；下钻/披露类默认黑色。两者Hover统一使用color-text-action-hover，Pressed/Expanded统一使用color-text-action-active；操作类禁用使用color-text-action-disabled，下钻/披露类禁用使用color-text-disabled。更多配右箭头、展开配下箭头、收起配上箭头。",
      "strength": "must",
      "status": "confirmed",
      "when": ["使用按钮"],
      "references": []
    },
    {"id":"wb-button-border","title":"主要与次要外观","text":"主要按钮纯色填充且无描边；次要按钮保留描边，主次不通过混用尺寸表达。","strength":"must","status":"confirmed","when":["使用按钮"],"references":[]},
    {"id":"wb-button-equal-width","title":"填充按钮组合建议同宽","text":"同组填充按钮字数不同时建议按最长内容等宽、同高；由父级布局实现，不靠空格、不要求全站统一宽度。","strength":"recommendation","status":"confirmed","when":["使用按钮"],"references":[]},
    {
      "id": "wb-button-icon",
      "title": "图文与点击区域",
      "text": "填充按钮L/M/S前置图标分别14/14/12px，图文间距4px。文字与下拉按钮尾部箭头统一10px、间距6px。纯图标按钮默认无容器，贴合实际图标；导航等需要标准点击区域时使用 iconLayout=container，32/24px容器分别使用20/14px图标；均提供可访问名称。",
      "strength": "must",
      "status": "confirmed",
      "when": ["使用按钮"],
      "references": []
    },
    {"id":"wb-button-semantics","title":"交互语义","text":"状态操作使用按钮，真实地址下钻使用链接或路由语义；保留键盘、可见焦点和禁用行为，展开收起同步aria-expanded。","strength":"must","status":"confirmed","when":["使用按钮"],"references":[]},
    {
      "id": "wb-button-state-mapping",
      "title": "已定稿的状态与图标映射",
      "text": "以Pixso组件变体为准：主要按钮Default/Pressed使用color-brand，Hover使用color-brand-hover，Disabled使用color-brand-disabled。次要按钮Hover/Pressed均保持color-fill-subtle-default，并将1px描边改为color-border-hover。图标按钮Hover/Pressed均透明，分别使用color-icon-hover和color-icon-active。操作类文字按钮使用color-text-action、color-text-action-hover、color-text-action-active、color-text-action-disabled；下钻类默认color-text-primary、禁用color-text-disabled，Hover/Pressed沿用文字操作状态链，aria-expanded=true持续使用active色。文字与下拉按钮箭头均10px、间距6px；纯图标按钮默认贴合实际图标，container变体32/24px分别配20/14px图标。",
      "strength": "must",
      "status": "confirmed",
      "when": ["精确状态色映射","描边粗细","文字图标尺寸"],
      "references": []
    },
    {
      "id": "wb-button-async",
      "title": "本版本未支持的能力",
      "text": "Button提供主要、次要、文字、图标及次要下拉触发入口；下拉入口复用secondary外观、intent=drilldown与方向箭头，展开状态由调用方控制，菜单由独立Dropdown负责。当前版本不提供Loading、异步防重复提交或Danger；Pixso实际组件集中无告警变体，不依据残留标题推断实现。",
      "strength": "must",
      "status": "confirmed",
      "when": ["加载中按钮","异步提交","危险操作"],
      "references": []
    },
    {
      "id": "wb-button-padding",
      "title": "Pixso三档左右内边距",
      "text": "填充按钮L/M/S左右内边距20/16/12px；文字按钮各尺寸均8px，无容器变体 textLayout=inline 为0；图标按钮默认贴合图标，container变体通过固定正方形容器居中。",
      "strength": "must",
      "status": "confirmed",
      "when": ["使用按钮"],
      "references": ["wb-button-height"]
    },
    {
      "id": "wb-button-text-drilldown-usage",
      "title": "文字下钻入口与点击区域",
      "text": "文字按钮默认使用标准容器（32/28px高、左右8px）；卡片或页签头部的操作、下钻入口可显式使用 textLayout=inline，仅占文字行高且无内边距。更多等操作使用 intent=drilldown、drilldown=more，保留键盘和焦点反馈；真实地址跳转使用链接组件。",
      "strength": "recommendation",
      "status": "confirmed",
      "when": ["卡片或页签头部下钻入口"],
      "references": []
    }
  ],
  "foundationKeys": ["color-brand","color-brand-hover","color-brand-focus","color-brand-disabled","color-fill-default","color-fill-subtle-default","color-fill-subtle-disabled","color-text-primary","color-text-inverse","color-text-action","color-text-action-hover","color-text-action-active","color-text-action-disabled","color-text-disabled","color-icon-primary","color-icon-hover","color-icon-active","color-icon-disabled","color-border-focus","color-border-separator","color-surface-card-default","color-info-primary-subtle","spacing-component-xs","spacing-component-sm","spacing-component-md","spacing-component-lg","radius-sm","radius-lg","radius-full","shadow-sm","font-body-s","font-body-m","font-headline-xs","font-headline-m","icon-size-12","icon-size-16","icon-size-20","color-border","color-border-hover","color-border-disabled"],
  "intro": "用于提交、创建、编辑、取消与轻量披露等明确操作。按钮承载动作，不代替链接导航、互斥选择或内容页签。",
  "sections": [
    {"id":"selection","title":"选型与文案","paragraphs":["主要按钮突出当前区块最重要的操作；次要按钮承载并列操作；文字按钮用于轻量动作或下钻；纯图标按钮只在图标含义明确且可访问名称完整时使用。"],"bullets":["同一操作组通常只突出一个主要动作。","按钮宽度与位置由调用方布局决定；文案应以动作动词开头。"]},
    {
      "id": "text-drilldown",
      "title": "文字下钻入口与点击区域",
      "paragraphs": ["卡片或页签头部的更多、查看历史等动作使用 appearance=text、intent=drilldown、drilldown=more。文字按钮默认保留标准容器；这类头部入口使用 textLayout=inline，仅占文字行高且无内边距。两者均保留悬停、按下和焦点反馈。"],
      "bullets": ["需要真实地址跳转时使用链接组件。","复用同一业务位置与事件时可组合为Block，组件本身仍由Button负责。"]
    },
    {
      "id": "states",
      "title": "尺寸与状态",
      "paragraphs": ["size选择已提供的按钮尺寸；图标按钮默认无容器，导航等需要标准点击区域时使用 iconLayout=container。primary、secondary、text、icon分别对应不同视觉职责。状态预览值previewState用于Studio检查，不代替真实禁用状态。"],
      "bullets": ["异步提交、加载与危险操作不属于当前组件接口。","披露状态由调用方通过aria-expanded表达，drilldown控制箭头方向。"]
    }
  ]
}
```

未声明或为空：dependencies、related（不代表支持）

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "primary-action",
  "title": "主要操作按钮",
  "portability": "portable",
  "source": {"kind":"studio-official-usage","ownerAssetId":"wb-button","scenarioId":"button","exampleId":"primary-action","codeSha256":"sha256:90a538c0f3fc920c67e4e3620d8c90c3ce2a2e967b9e2313e4ec2005a35727ce"},
  "description": "最小可运行的创建操作示例，应用状态由调用方管理。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchButton } from '@workbench/ui-vue3'
const created = ref(false)
function createApplication() { created.value = true }
</script>
<template>
  <WorkbenchButton :disabled="created" @click="createApplication">{{ created ? '已创建' : '创建申请' }}</WorkbenchButton>
  <output aria-live="polite">{{ created ? '申请已创建' : '等待操作' }}</output>
</template>
```
