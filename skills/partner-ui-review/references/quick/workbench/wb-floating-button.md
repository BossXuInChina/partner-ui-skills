<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 悬浮按钮 FloatingButton — `WorkbenchFloatingButton`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-floating-button`](<../../workbench/wb-floating-button.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-floating-button",
  "kind": "component",
  "version": "1.0.0",
  "summary": "用于帮助、反馈、评价或返回顶部等全局辅助入口。不要替代主业务提交操作或持久化导航。",
  "useWhen": ["全局辅助入口、帮助、评分和返回顶部。"],
  "avoidWhen": ["主业务提交放在页面操作区；不要用此组件替代导航或持久化业务状态。","未经验证的公司内部UI框架或生产交付"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchFloatingButton"},
  "props": {
    "variant": {"type":"String","default":"single","enum":["single","group"]},
    "items": {"type":"Array","default":{"kind":"function"}},
    "expanded": {"type":"Boolean","default":{"kind":"undefined"}},
    "ratings": {"type":"Object","default":{"kind":"undefined"}},
    "defaultVisibleCount": {"type":"Number","default":{"kind":"undefined"}},
    "showBackToTop": {"type":"Boolean","default":false},
    "ariaLabel": {"type":"String","default":"悬浮快捷操作"}
  },
  "events": ["update:expanded","action","back-to-top","rating-change","update:ratings"],
  "eventDetails": null,
  "slots": ["icon"],
  "slotDetails": null,
  "slotPatterns": [{"kind":"unknown","expression":"singleItem.popoverType"},{"kind":"unknown","expression":"item.popoverType"}],
  "exposed": [],
  "family": [],
  "propNotes": {
    "variant": "single或group；group少于两项时退回single表现。",
    "items": "悬浮入口项目数组；每项id唯一，包含label及icon等配置。",
    "expanded": "展开状态；传入时受控并响应update:expanded。",
    "ratings": "id到0–10整数分的受控评分映射。",
    "defaultVisibleCount": "group默认显示数量；未传时显示全部。",
    "showBackToTop": "是否显示独立的返回顶部入口。",
    "ariaLabel": "悬浮操作区域的可访问名称。"
  },
  "eventNotes": {
    "update:expanded": {"payload":"boolean。","timing":"展开或收起分组时发出；受控调用方应同步状态。"},
    "action": {"payload":"被激活的item对象。","timing":"启用的非评分入口被激活时发出。"},
    "back-to-top": {"payload":"无。","timing":"触发返回顶部滚动后发出。"},
    "update:ratings": {"payload":"新的id到分值映射对象。","timing":"评分变化后发出；受控调用方应保存映射。"},
    "rating-change": {"payload":"{ item, score }，其中score为0–10整数。","timing":"评分项改变时发出。"}
  },
  "slotNotes": {
    "icon": {"scope":"{ item }","description":"自定义当前项目图标；保留按钮可访问名称。"},
    "singleItem.popoverType": {"scope":"{ item }","description":"动态名称与项目popoverType一致，替换该项目气泡内容。"},
    "item.popoverType": {"scope":"{ item }","description":"分组项目的动态气泡内容槽，名称由对应item.popoverType决定。"}
  }
}
```

## 规则与适用条件

```json
{
  "rules": [
    {
      "id": "wb-floating-button-rule-1",
      "title": "用途与边界",
      "text": "全局辅助入口、帮助、评分和返回顶部。 主业务提交放在页面操作区；不要用此组件替代导航或持久化业务状态。",
      "strength": "must",
      "status": "confirmed",
      "when": ["使用悬浮按钮 FloatingButton"],
      "references": []
    },
    {
      "id": "wb-floating-button-rule-2",
      "title": "交互与状态",
      "text": "主要点击区域48px，固定右32px/底178px；分组2–6项为已验证范围。返回顶部距离主组24px，滚动最近可滚动祖先。气泡支持hover/focus-visible及Escape；减少动态效果下停止动画和光滑滚动。",
      "strength": "must",
      "status": "confirmed",
      "when": ["使用悬浮按钮 FloatingButton"],
      "references": []
    },
    {
      "id": "wb-floating-button-rule-3",
      "title": "公开API",
      "text": "| 参数 | 合同 |\n| --- | --- |\n| variant | single（默认）/ group；group只有一项时回退圆形single |\n| items | 默认[]；每项唯一id、label、disabled?、iconType?、icon?、popoverType?、title?、description? |\n| expanded | 未传内部管理，传入后受控update:expanded |\n| defaultVisibleCount | 未传显示全部；有限值取整限制0–items.length，非有限值显示全部 |\n| showBackToTop | 默认false，独立于按钮数量，group内显示 |\n| ratings | 可选{id:score}，受控评分；未传内部管理，分数0–10整数 |\n| ariaLabel | 默认悬浮快捷操作 |\n\n事件：update:expanded(boolean)、action(item)、back-to-top()、update:ratings(map)、rating-change({item,score})。\n插槽：icon({item})替换图标；以popoverType命名的插槽({item})提供业务弹层，例如greeting/qrcode。内置label、info、rating；业务文案、二维码数据由调用方提供，无内置品牌与下载目标。\n\n评分支持方向键、Home/End和单一Tab入口；ratings可外部初始化、修改、清空。禁用项不打开气泡或触发评分。",
      "strength": "must",
      "status": "confirmed",
      "when": ["使用悬浮按钮 FloatingButton"],
      "references": []
    }
  ],
  "dependencies": [],
  "foundationKeys": [
    "color-surface-page",
    "color-surface-overlay",
    "color-surface-card-default",
    "color-fill-hover",
    "color-icon-primary",
    "color-icon-disabled",
    "color-text-primary",
    "color-text-secondary",
    "color-border-separator-subtle",
    "color-border-focus",
    "radius-lg",
    "radius-sm",
    "radius-full",
    "shadow-sm",
    "shadow-lg",
    "font-body-s",
    "font-body-m",
    "font-headline-xxl",
    "spacing-component-sm",
    "spacing-component-md",
    "spacing-component-xl"
  ],
  "intro": "用于帮助、反馈、评价或返回顶部等全局辅助入口。不要替代主业务提交操作或持久化导航。",
  "sections": [
    {
      "id": "scope",
      "title": "场景与结构",
      "paragraphs": ["single呈现单个入口，group呈现一组辅助入口。每项使用稳定且唯一的id、清晰label及已登记icon语义；popoverType可选择label、info或rating内容。"],
      "bullets": ["帮助、政策与客服可使用info说明；rating用于0至10分评价。","主按钮位置与页面滚动容器由调用方安排；返回顶部会滚动最近的可滚动祖先。"]
    },
    {
      "id": "controlled",
      "title": "受控状态与键盘",
      "paragraphs": ["expanded和ratings未传入时由组件内部维护；传入时调用方需响应对应update事件。禁用项目不触发操作或评分。"],
      "bullets": ["入口使用单一Tab点位；评分内部支持方向键、Home和End。","提供icon槽或按popoverType提供具名内容槽时，内容范围由调用方负责。"]
    }
  ],
  "related": null
}
```

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "help-and-rating",
  "title": "帮助与评价入口",
  "portability": "portable",
  "source": {
    "kind": "studio-official-usage",
    "ownerAssetId": "wb-floating-button",
    "scenarioId": "floating-button",
    "exampleId": "help-and-rating",
    "codeSha256": "sha256:3f8ca86bc0d3fff83bd14e6551f459c4556b9c63e308e473e028f1f530f6f425"
  },
  "description": "受控展开与评分状态，入口项目、评分回调和结果反馈均由调用方定义。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchFloatingButton } from '@workbench/ui-vue3'
const expanded = ref(true)
const ratings = ref({})
const items = [
  { id: 'help', label: '帮助', icon: 'help', popoverType: 'info', title: '需要帮助？', description: '查看服务指南或联系支持团队。' },
  { id: 'rating', label: '评价', icon: 'rating', popoverType: 'rating', title: '评价本次服务' },
]
const message = ref('')
function onAction(item) { message.value = `已触发：${item.label}` }
function onRatingChange({ score }) { message.value = `当前评分：${score}` }
</script>
<template>
  <WorkbenchFloatingButton variant="group" :items="items" v-model:expanded="expanded" v-model:ratings="ratings" @action="onAction" @rating-change="onRatingChange" />
  <output aria-live="polite">{{ message }}</output>
</template>
```
