<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 滚动条 Scrollbar — `WorkbenchScrollbar`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-scrollbar`](<../../workbench/wb-scrollbar.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-scrollbar",
  "kind": "component",
  "version": "1.1.0",
  "summary": "用于为受限内容区域提供覆盖式滚动指示与拖动控制。滚动内容仍由浏览器原生滚动机制处理。",
  "useWhen": ["小尺寸适用于空间受限、需要弱化视觉干扰或辅助性质的微型滚动场景，例如下拉选择框菜单、多行输入框、弹出气泡框内的滚动。","默认尺寸适用于全屏／主页面滚动、主体内容列表、表格的主体滚动区域、中大型弹窗、侧边抽屉等尺寸较大的独立层级，以及用户需要频繁拖拽或观察滚动位置的区域。"],
  "avoidWhen": ["未经适配验证的内部框架生产实现"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchScrollbar"},
  "props": {"label":{"type":"String","required":true},"describedby":{"type":"String"},"axis":{"type":"String","default":"vertical"},"size":{"type":"String","default":"default"},"state":{"type":"String"}},
  "slots": ["default"],
  "exposed": [{"name":"viewport","declaration":"viewport: HTMLElement | null | undefined;"},{"name":"measure","declaration":"measure(): void;"}],
  "propNotes": {"label":"必填的滚动区域可访问名称。","describedby":"关联说明元素的ID。","axis":"滚动方向：vertical或horizontal，默认vertical。","size":"轨道尺寸：small或default；large作为default兼容别名。","state":"Studio状态预览值，用于展示hover态。"},
  "slotNotes": {"default":{"scope":"无","description":"提供需要滚动的全部内容；内容尺寸由宿主和内容自然决定。"}}
}
```

未声明或为空：events、eventDetails、slotDetails、slotPatterns、family、eventNotes（不代表支持）

## 规则与适用条件

```json
{
  "rules": [
    {
      "id": "wb-scrollbar-rule-1",
      "title": "Small（小尺寸）：轨道10px，默认可见滑块4px、两侧各3px；Hover",
      "text": "Small（小尺寸）：轨道10px，默认可见滑块4px、两侧各3px；Hover/拖动可见滑块6px、两侧各2px。",
      "strength": "must",
      "status": "confirmed",
      "when": ["滚动条尺寸选择"],
      "references": []
    },
    {
      "id": "wb-scrollbar-rule-2",
      "title": "Default（默认尺寸）：轨道14px，默认可见滑块6px、两侧各4px；Ho",
      "text": "Default（默认尺寸）：轨道14px，默认可见滑块6px、两侧各4px；Hover/拖动可见滑块10px、两侧各2px。",
      "strength": "must",
      "status": "confirmed",
      "when": ["滚动条尺寸选择"],
      "references": []
    },
    {
      "id": "wb-scrollbar-rule-3",
      "title": "小尺寸适用于空间受限、需要弱化视觉干扰或辅助性质的微型滚动场景，例如下拉选择框菜",
      "text": "小尺寸适用于空间受限、需要弱化视觉干扰或辅助性质的微型滚动场景，例如下拉选择框菜单、多行输入框、弹出气泡框内的滚动。",
      "strength": "must",
      "status": "confirmed",
      "when": ["滚动条尺寸选择"],
      "references": []
    },
    {
      "id": "wb-scrollbar-rule-4",
      "title": "默认尺寸适用于全屏／主页面滚动、主体内容列表、表格的主体滚动区域、中大型弹窗、侧",
      "text": "默认尺寸适用于全屏／主页面滚动、主体内容列表、表格的主体滚动区域、中大型弹窗、侧边抽屉等尺寸较大的独立层级，以及用户需要频繁拖拽或观察滚动位置的区域。",
      "strength": "must",
      "status": "confirmed",
      "when": ["滚动条尺寸选择"],
      "references": []
    },
    {
      "id": "wb-scrollbar-rule-5",
      "title": "水平和纵向对称应用，滑块四边等宽透明边框，radius-full，确保可见端部为",
      "text": "水平和纵向对称应用，滑块四边等宽透明边框，radius-full，确保可见端部为半圆。",
      "strength": "must",
      "status": "confirmed",
      "when": ["滚动条尺寸选择"],
      "references": []
    },
    {
      "id": "wb-scrollbar-rule-6",
      "title": "浅色默认#191919/20%，深色默认#F3F3F3/30%；悬浮及拖动使用c",
      "text": "默认#DFDFDF；悬浮及拖动使用color-scrollbar-thumb-fill-hover（#AEAEAE）。",
      "strength": "must",
      "status": "confirmed",
      "when": ["滚动条尺寸选择"],
      "references": []
    },
    {
      "id": "wb-scrollbar-rule-7",
      "title": "`WorkbenchScrollbar.vue` 提供覆盖式轨道，不参与内容排版",
      "text": "`WorkbenchScrollbar.vue` 提供覆盖式轨道，不参与内容排版。显隐、Hover与拖动不改变内容可用宽高和宿主面板尺寸；尺寸与内容变化由ResizeObserver重新测量。",
      "strength": "must",
      "status": "confirmed",
      "when": ["滚动条尺寸选择"],
      "references": []
    },
    {
      "id": "wb-scrollbar-rule-8",
      "title": "`axis`: vertical（默认）或horizontal；`size`: ",
      "text": "`axis`: vertical（默认）或horizontal；`size`: small或default（默认）；large保留为default的兼容别名；`label`必填，`describedby`可选；默认Slot为滚动内容。宿主约束尺寸，主内容及页面级使用default，辅助微型区域显式使用small。",
      "strength": "must",
      "status": "confirmed",
      "when": ["滚动条尺寸选择"],
      "references": []
    },
    {
      "id": "wb-scrollbar-rule-9",
      "title": "滚动内容保持浏览器原生滚动，隐藏原生滚动条；覆盖轨道支持Pointer拖动、轨道",
      "text": "滚动内容保持浏览器原生滚动，隐藏原生滚动条；覆盖轨道支持Pointer拖动、轨道点击、捕获释放。区域可Tab聚焦，支持方向键、PageUp/Down、Home/End，触屏及滚轮使用原生滚动。非溢出时无轨道，滑块长度随可见内容比例变化。",
      "strength": "must",
      "status": "confirmed",
      "when": ["滚动条尺寸选择"],
      "references": []
    },
    {
      "id": "wb-scrollbar-rule-10",
      "title": "宿主在内容边缘安排固定内边距，避免边缘交互控件与轨道重叠，不随滚动条显隐切换内边",
      "text": "宿主在内容边缘安排固定内边距，避免边缘交互控件与轨道重叠，不随滚动条显隐切换内边距。",
      "strength": "must",
      "status": "confirmed",
      "when": ["滚动条尺寸选择"],
      "references": []
    },
    {
      "id": "wb-scrollbar-rule-11",
      "title": "`scrollbar.css`仍供textarea等原生控件使用：wb-scro",
      "text": "`scrollbar.css`仍供textarea等原生控件使用：wb-scrollbar保留原生小尺寸，wb-scrollbar--large为历史默认尺寸样式类，提供尺寸和Hover；单独使用CSS类不提供覆盖式布局保证，宿主须管理稳定空间。Firefox原生样式只能thin降级，精确尺寸应使用覆盖式组件。",
      "strength": "must",
      "status": "confirmed",
      "when": ["滚动条尺寸选择"],
      "references": []
    },
    {
      "id": "wb-scrollbar-rule-12",
      "title": "预览含默认尺寸水平表格、小尺寸气泡内容滚动、默认尺寸页面视口；演示内容尺寸不是正",
      "text": "预览含默认尺寸水平表格、小尺寸气泡内容滚动、默认尺寸页面视口；演示内容尺寸不是正式布局Token。",
      "strength": "must",
      "status": "confirmed",
      "when": ["滚动条尺寸选择"],
      "references": []
    }
  ],
  "foundationKeys": ["color-border","color-border-hover","color-border-focus","color-border-disabled","color-text-primary","color-text-placeholder","color-text-secondary","color-text-disabled","color-icon-placeholder","color-icon-secondary","color-icon-primary","color-icon-active","color-icon-disabled","color-fill-hover","color-fill-subtle-default","color-fill-subtle-disabled","color-surface-card-default","color-info-primary-subtle","spacing-component-xs","spacing-component-sm","spacing-component-md","spacing-component-lg","spacing-layout-container-inline","radius-sm","radius-lg","shadow-base","font-body-m","font-headline-m","color-error","font-body-s","color-scrollbar-thumb-fill-hover","radius-full"],
  "intro": "用于为受限内容区域提供覆盖式滚动指示与拖动控制。滚动内容仍由浏览器原生滚动机制处理。",
  "sections": [
    {"id":"container","title":"容器与适用范围","paragraphs":["宿主负责约束滚动视口尺寸、内容和边缘留白；Scrollbar覆盖轨道不参与排版。内容未溢出时不显示轨道。"],"bullets":["default适合主内容区，small适合下拉菜单、文本框等辅助小区域。","水平与垂直方向使用同一轴向参数；避免交互内容贴近滚动轨道。"]},
    {"id":"keyboard","title":"键盘与可访问性","paragraphs":["滚动区域可Tab聚焦；方向键、PageUp/PageDown、Home/End可控制滚动。触屏和滚轮继续使用浏览器原生滚动。"],"bullets":["label是必需的区域名称；describedby可关联补充说明。"]}
  ]
}
```

未声明或为空：dependencies、related（不代表支持）

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "bounded-content",
  "title": "受限内容滚动",
  "portability": "portable",
  "source": {
    "kind": "studio-official-usage",
    "ownerAssetId": "wb-scrollbar",
    "scenarioId": "scrollbar",
    "exampleId": "bounded-content",
    "codeSha256": "sha256:1b0ab1e4885e87a2b051a38e6bbc155fc4e4463fc0d2fcca2d5917acb30372f9"
  },
  "description": "视口高度由调用方样式约束，长内容触发垂直滚动。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { WorkbenchScrollbar } from '@workbench/ui-vue3'
const entries = ['申请进度', '所需材料', '联系人信息', '审批记录', '补充说明']
</script>
<template>
  <div class="scroll-region">
    <WorkbenchScrollbar label="申请详情内容">
      <section v-for="entry in entries" :key="entry"><h2>{{ entry }}</h2><p>查看与{{ entry }}相关的信息和处理说明。</p></section>
    </WorkbenchScrollbar>
  </div>
</template>
<style scoped>
.scroll-region { block-size: 12rem; }
</style>
```
