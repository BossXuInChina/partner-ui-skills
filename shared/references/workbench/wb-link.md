<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261031.1 (af939228028791e24280015c5d48a35a658d40f3) — do not edit. -->

# 文字链接 Link — `WorkbenchLink`

资产：`wb-link` · 类型：`component` · 资产合同版本：`1.1.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261031.1` · commit：`af939228028791e24280015c5d48a35a658d40f3` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-LINK-V1/link?view=preview)

用于跳转到页面、资源或地址。提交、切换、展开和收起等状态操作应使用Button。

公开入口：`@workbench/ui-vue3` → `WorkbenchLink`

## 变体与状态

状态：`unsupported`。声明值属于 Studio 案例数据，不自动等于公开组件 props。

[在 Studio 中查看](http://localhost:4173/preview/WB-LINK-V1/link?view=variants)

unsupported：CUSTOM_VARIANT_GALLERY：A custom gallery or indirect scenario factory owns the rendered cases; manifest declarations are preserved, but are not claimed as an exhaustive portable gallery.

### 包内声明

```json
{
  "states": [
    {
      "id": "default",
      "label": "默认"
    },
    {
      "id": "hover",
      "label": "悬浮"
    },
    {
      "id": "pressed",
      "label": "按下"
    },
    {
      "id": "focus",
      "label": "聚焦"
    },
    {
      "id": "disabled",
      "label": "禁用"
    }
  ],
  "controls": [
    {
      "id": "showIcon",
      "label": "显示左侧图标",
      "description": "显示已确认的12px左侧图标和4px图文间距",
      "type": "boolean",
      "default": false
    }
  ],
  "pilotControls": [
    {
      "id": "showIcon",
      "label": "显示左侧图标",
      "description": "显示已确认的12px左侧图标和4px图文间距",
      "type": "boolean",
      "default": false
    },
    {
      "id": "demoState",
      "label": "组件状态",
      "type": "select",
      "default": "default",
      "options": [
        {
          "value": "default",
          "label": "默认"
        },
        {
          "value": "hover",
          "label": "悬浮"
        },
        {
          "value": "pressed",
          "label": "按下"
        },
        {
          "value": "focus",
          "label": "聚焦"
        },
        {
          "value": "disabled",
          "label": "禁用"
        }
      ],
      "group": "状态与内容",
      "intent": "state",
      "presentation": "state-buttons"
    },
    {
      "id": "previewWidth",
      "label": "预览宽度",
      "type": "range",
      "target": "viewport-width",
      "default": 1280,
      "min": 390,
      "max": 1920,
      "step": 1,
      "unit": "px",
      "group": "布局"
    }
  ],
  "presets": []
}
```

### 定制画廊来源清单（unsupported）

```json
{
  "literalData": {},
  "dynamicBindings": [],
  "explicitCaseIds": [],
  "loopExpressions": []
}
```

## 使用场景

[在 Studio 中查看](http://localhost:4173/preview/WB-LINK-V1/link?view=scenes)

**适用**：表格中的页面或资源跳转；正文中的内嵌链接；独立文字链接

**不适用**：提交、切换、展开收起或其他状态操作；未经验证的内部框架生产实现

官方来源 SFC：supported。

### 示例：资源导航链接

id：`resource-link` · portability：`portable` · owner：`wb-link`

展示真实资源目标；如使用前端路由，可在click事件中接管导航。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchLink } from '@workbench/ui-vue3'
const notice = ref('')
function handleNavigation(event) {
  event.preventDefault()
  notice.value = '已请求打开申请详情'
}
</script>
<template>
  <WorkbenchLink href="/applications/42" @click="handleNavigation">查看申请详情</WorkbenchLink>
  <output aria-live="polite">{{ notice }}</output>
</template>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-LINK-V1/link?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| disabled | Boolean | false |  | 禁用链接交互和点击事件。 |
| href * | String |  |  | 必填的原生链接地址。 |
| rel | String | {"kind":"undefined"} |  | 原生链接关系；使用_blank时建议由调用方设置noopener。 |
| target | String | {"kind":"undefined"} |  | 原生链接目标，例如_blank。 |

### Events

- `click`：原生MouseEvent。；启用状态下激活链接时发出；禁用状态不发出。

### Slots

- `icon`：无；可选左侧图标；组件不提供右侧图标入口。

- `default`：无；链接可见文字，应能独立说明导航目的。

### 规则

### 链接负责真实跳转

id：`wb-link-semantic-boundary` · must / confirmed

页面、资源或地址跳转使用Link；提交、切换、展开收起等状态操作使用Button，不以文字外观混淆两类语义。

**适用条件**：选择Link或Button

### 字号跟随场景上下文

id：`wb-link-context-typography` · must / confirmed

Link不提供尺寸档位，不覆盖字号、行高、字重或字间距；表格、内嵌文本和独立文本中的排版均继承父级上下文。

**适用条件**：使用Link

### 默认无下划线，交互态有下划线

id：`wb-link-state-decoration` · must / confirmed

默认态不带下划线；悬浮、按下、键盘聚焦和禁用态显示1px下划线，下划线偏移2px。默认使用color-link，悬浮使用color-link-hover，按下使用color-link-active，禁用使用color-link-disabled。

**适用条件**：展示Link交互状态

### 左侧图标12px

id：`wb-link-leading-icon` · must / confirmed

Link可配置左侧12px图标，图标无额外安全边距，与文字间距4px，并通过currentColor同步文字颜色。

**适用条件**：Link配置图标

### 禁用链接不可交互

id：`wb-link-disabled` · must / confirmed

禁用Link移除有效href，设置aria-disabled且退出Tab顺序；不得导航或发出click事件。

**适用条件**：Link禁用

### Foundation 引用

`color-link`、`color-link-hover`、`color-link-active`、`color-link-disabled`、`color-border-focus`、`spacing-component-xs`、`icon-size-12`、`color-text-primary`、`color-text-secondary`、`color-border-separator`、`color-fill-subtle-default`、`color-surface-card-default`、`radius-sm`、`radius-lg`、`shadow-sm`、`font-body-s`、`font-body-m`、`font-headline-m`

### 链接语义

WorkbenchLink渲染真实链接，必须提供href。target与rel透传原生链接能力；路由拦截和导航状态由调用方决定。

- 独立链接默认继承上下文排版，不提供尺寸属性。

- 仅在确有必要时通过icon槽放置左侧图标；禁用链接不可聚焦、跳转或发出click。

### 可访问性

链接文案应准确说明目的；避免使用“点击这里”等脱离上下文的名称。

- 导航使用链接，执行动作使用按钮。
