<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 走马灯 Carousel — `WorkbenchCarousel`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-carousel`](<../../workbench/wb-carousel.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-carousel",
  "kind": "component",
  "version": "1.0.1",
  "summary": "在一个内容区域轮播少量相互相关的内容项，当前索引受控并提供键盘与自动轮播行为。",
  "useWhen": ["在固定页面容器内循环展示多个图片或内容容器"],
  "avoidWhen": ["需要同时展示多张内容、触控拖拽、懒加载或生产运行时交付"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchCarousel"},
  "props": {
    "modelValue": {"type":"Number","default":0},
    "items": {"type":"Array","default":{"kind":"function"}},
    "ariaLabel": {"type":"String","default":"走马灯"},
    "disabled": {"type":"Boolean","default":false},
    "autoplay": {"type":"Boolean","default":true},
    "contentMotion": {"type":"Boolean","default":false},
    "showNavigation": {"type":"Boolean","default":true},
    "indicatorPlacement": {"type":"String","default":"overlay","enum":["overlay","below"]},
    "transitionStyle": {"type":"String","default":"fade","enum":["fade","slide"]}
  },
  "events": ["update:modelValue","change"],
  "eventDetails": null,
  "slots": ["slide","empty"],
  "slotDetails": null,
  "slotPatterns": [],
  "exposed": [],
  "family": [],
  "propNotes": {
    "modelValue": "当前项目的零基索引，由父级通过update:modelValue接收切换。",
    "items": "轮播内容集合；每项须有稳定唯一key。",
    "ariaLabel": "轮播区域的可访问名称。",
    "disabled": "禁用用户切换操作。",
    "contentMotion": "是否启用内容切换动效；尊重减少动态效果偏好。",
    "autoplay": "是否自动播放，默认开启；关闭后保留手动切换。",
    "showNavigation": "是否展示左右翻页按钮；关闭时保留指示器和键盘切换。",
    "indicatorPlacement": "指示器位置：overlay 位于内容内，below 位于内容下方并留出16px间距。",
    "transitionStyle": "切换方式：fade为渐显，slide为水平滑动。"
  },
  "eventNotes": {
    "update:modelValue": {"payload":"新的零基索引。","timing":"用户切换项目或自动轮播切换时发出。"},
    "change": {"payload":"按参数顺序提供新的零基索引及对应项目数据。","timing":"当前项目切换后发出，供宿主同步业务状态。"}
  },
  "slotNotes": {
    "slide": {"scope":"渲染当前项目内容；参数含item、index、selected。","description":"负责单项内容排版，不改变轮播索引控制。"},
    "empty": {"scope":"items为空时渲染空内容。","description":"仅用于无项目状态，不承担错误或加载反馈。"}
  }
}
```

## 规则与适用条件

```json
{
  "rules": [
    {
      "id": "wb-carousel-rule-1",
      "title": "使用边界",
      "text": "Carousel v1 每次只展示一个内容项，宽度由父页面容器决定，高度由调用方或 slide 内容提供。",
      "strength": "must",
      "status": "confirmed",
      "when": ["循环展示多个图片或内容容器"],
      "references": []
    },
    {
      "id": "wb-carousel-rule-2",
      "title": "交互合同",
      "text": "v-model 使用零基索引；存在多个内容项时每5秒循环，悬停、焦点、页面不可见和减少动态效果偏好会暂停。箭头、分页点、ArrowLeft、ArrowRight、Home 和 End 均可切换；首尾循环。分页指示器默认叠加在内容区内部，距底部24px；选择 below 变体时位于内容下方，间隔16px；可见标记间距恒为12px。每个轨道恰有一个16×8px选中胶囊，其余为8×8px圆点，因此内容总宽度在切换时不变：三项始终为56px。圆形翻页器定义为低强调导航图形：默认圆底为白色80%，悬停和按下为白色100%，禁用为白色50%；箭头默认使用 color-icon-secondary，悬停和按下使用 color-icon-primary，禁用使用 color-icon-disabled，并采用16px左右箭头图标。",
      "strength": "must",
      "status": "confirmed",
      "when": ["循环展示多个图片或内容容器"],
      "references": []
    },
    {
      "id": "wb-carousel-rule-3",
      "title": "调用方内容栅格",
      "text": "Carousel 不定义标题或副标题 API，调用方在 slide 内容层中提供业务文案。小于768px时内容层为单列并在两侧各保留80px翻页器避让带；768px起按16px沟槽与32px安全边距建立12列栅格，文案从第2列开始并占8列；1280px起改为24列并占12列。",
      "strength": "must",
      "status": "confirmed",
      "when": ["slide 包含主标题、副标题或业务文案"],
      "references": []
    }
  ],
  "dependencies": [],
  "foundationKeys": [
    "color-border-focus",
    "color-icon-hover",
    "color-icon-disabled",
    "color-icon-primary",
    "color-icon-secondary",
    "color-none",
    "color-text-inverse",
    "font-body-s",
    "font-body-m",
    "font-headline-l",
    "font-headline-xl",
    "font-headline-xxl",
    "radius-full",
    "spacing-component-md",
    "spacing-component-sm",
    "layout-grid-breakpoint-medium",
    "layout-grid-breakpoint-wide",
    "layout-grid-breakpoint-fixed",
    "layout-grid-columns-medium",
    "layout-grid-columns-wide",
    "layout-grid-gutter",
    "layout-grid-safe-edge",
    "layout-grid-max-width"
  ],
  "intro": "在一个内容区域轮播少量相互相关的内容项，当前索引受控并提供键盘与自动轮播行为。",
  "sections": [
    {"id":"selection","title":"选型","paragraphs":["用于精选内容、主视觉或关联卡片集合；内容需要同时比较、快速扫描或精确定位时优先使用列表、网格或分页。"],"bullets":[]},
    {
      "id": "structure",
      "title": "设计结构与排版",
      "paragraphs": ["items为稳定key的项目集合，modelValue是从0开始的当前索引。slide插槽接收item/index/selected，可用empty插槽自定义无数据状态。"],
      "bullets": []
    },
    {
      "id": "interaction",
      "title": "交互与键盘",
      "paragraphs": ["提供轮播原生控制键；autoplay默认开启，设为false后只允许手动切换。自动播放在鼠标悬停、键盘焦点、页面不可见或减少动态效果时暂停。"],
      "bullets": []
    },
    {
      "id": "responsibility",
      "title": "使用边界与职责",
      "paragraphs": ["组件公开入口为 WorkbenchCarousel（@workbench/ui-vue3）。当前资格：prototype-only；业务数据、持久化和流程决策由宿主承担。"],
      "bullets": []
    }
  ],
  "related": [{"label":"走马灯 Carousel组件规范","href":"#rules"}]
}
```

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "partner-announcement-carousel",
  "title": "工作台公告轮播",
  "portability": "portable",
  "source": {
    "kind": "studio-official-usage",
    "ownerAssetId": "wb-carousel",
    "scenarioId": "carousel",
    "exampleId": "partner-announcement-carousel",
    "codeSha256": "sha256:d8eec2525673e48ccc4280b1f9d8407069a801baf4f424e449e85bd2ce4390f9"
  },
  "description": "工作台公告轮播场景示例展示组件在该业务流程中的职责，并附可直接运行的Vue代码。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchCarousel } from '@workbench/ui-vue3'
const index = ref(0)
const items = [{ key: 'a', title: '服务公告', text: '本周服务时间调整。' }, { key: 'b', title: '产品更新', text: '工作台新增筛选能力。' }]
</script>
<template>
  <WorkbenchCarousel v-model="index" :items="items" aria-label="工作台公告">
    <template #slide="{ item }"><article><h3>{{ item.title }}</h3><p>{{ item.text }}</p></article></template>
    <template #empty><p>暂无公告</p></template>
  </WorkbenchCarousel>
</template>
```
