<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261031.1 (75b8e1c367077ff9a0e50ac7cb115868a2a7b3f6) — do not edit. -->

# 页脚 Footer — `WorkbenchFooter`

资产：`wb-footer` · 类型：`component` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261031.1` · commit：`75b8e1c367077ff9a0e50ac7cb115868a2a7b3f6` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-FOOTER-V1/footer?view=preview)

展示页面级版权、备案和法律入口；链接导航由浏览器处理，宿主可监听条目选择。

公开入口：`@workbench/ui-vue3` → `WorkbenchFooter`

## 变体与状态

状态：`unsupported`。声明值属于 Studio 案例数据，不自动等于公开组件 props。

[在 Studio 中查看](http://localhost:4173/preview/WB-FOOTER-V1/footer?view=variants)

unsupported：CUSTOM_VARIANT_GALLERY：A custom gallery or indirect scenario factory owns the rendered cases; manifest declarations are preserved, but are not claimed as an exhaustive portable gallery.

### 包内声明

```json
{
  "states": [
    {
      "id": "ready",
      "label": "默认"
    },
    {
      "id": "disabled",
      "label": "入口禁用"
    },
    {
      "id": "long",
      "label": "长版权文案"
    },
    {
      "id": "empty",
      "label": "仅版权备案"
    }
  ],
  "controls": [
    {
      "id": "copyright",
      "label": "版权文案",
      "type": "text",
      "default": "版权所有©华为技术有限公司 1998-2026。保留一切权利。"
    },
    {
      "id": "showRegistration",
      "label": "显示备案信息",
      "type": "boolean",
      "default": true
    },
    {
      "id": "linkPreset",
      "label": "页脚入口",
      "type": "select",
      "default": "standard",
      "options": [
        {
          "value": "standard",
          "label": "标准四入口"
        },
        {
          "value": "extended",
          "label": "六入口换行测试"
        },
        {
          "value": "none",
          "label": "不显示入口"
        }
      ]
    },
    {
      "id": "navigation",
      "label": "入口交互",
      "type": "select",
      "default": "action",
      "options": [
        {
          "value": "action",
          "label": "业务事件"
        },
        {
          "value": "native",
          "label": "原生页内链接"
        }
      ]
    },
    {
      "id": "previewWidth",
      "label": "预览宽度",
      "description": "支持拖动、手动输入及断点快捷定位。",
      "type": "range",
      "target": "viewport-width",
      "default": 1440,
      "min": 320,
      "max": 3000,
      "step": 1,
      "unit": "px",
      "marks": [
        360,
        768,
        799,
        800,
        1920,
        1921,
        3000
      ]
    }
  ],
  "pilotControls": [
    {
      "id": "demoState",
      "type": "select",
      "label": "组件状态",
      "default": "ready",
      "options": [
        {
          "value": "ready",
          "label": "默认"
        },
        {
          "value": "disabled",
          "label": "入口禁用"
        },
        {
          "value": "long",
          "label": "长版权文案"
        },
        {
          "value": "empty",
          "label": "仅版权备案"
        }
      ],
      "group": "状态与内容",
      "intent": "state",
      "presentation": "state-buttons"
    },
    {
      "id": "copyright",
      "label": "版权文案",
      "type": "text",
      "default": "版权所有©华为技术有限公司 1998-2026。保留一切权利。"
    },
    {
      "id": "showRegistration",
      "label": "显示备案信息",
      "type": "boolean",
      "default": true
    },
    {
      "id": "linkPreset",
      "label": "页脚入口",
      "type": "select",
      "default": "standard",
      "options": [
        {
          "value": "standard",
          "label": "标准四入口"
        },
        {
          "value": "extended",
          "label": "六入口换行测试"
        },
        {
          "value": "none",
          "label": "不显示入口"
        }
      ]
    },
    {
      "id": "navigation",
      "label": "入口交互",
      "type": "select",
      "default": "action",
      "options": [
        {
          "value": "action",
          "label": "业务事件"
        },
        {
          "value": "native",
          "label": "原生页内链接"
        }
      ]
    }
  ],
  "presets": []
}
```

### 定制画廊来源清单（unsupported）

```json
{
  "literalData": {},
  "dynamicBindings": [
    "feedback"
  ],
  "explicitCaseIds": [],
  "loopExpressions": [
    "item in extended"
  ]
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：页脚 Footer相关交互与状态展示

**不适用**：未经独立生产接入与设计验收直接用于生产交付

官方来源 SFC：supported。

### 示例：产品法律与备案页脚

id：`legal-and-registration-footer` · portability：`portable` · owner：`wb-footer`

产品法律与备案页脚场景示例展示组件在该业务流程中的职责，并附可直接运行的Vue代码。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { WorkbenchFooter } from '@workbench/ui-vue3'
const registration = { id: 'registration', label: '备案信息' }
const links = [{ id: 'privacy', label: '隐私政策', href: '/privacy' }, { id: 'terms', label: '服务条款' }]
function onSelect(item) { window.alert(item.label) }
</script>
<template>
  <WorkbenchFooter copyright="© 2026 示例公司" :registration="registration" :links="links" @select="onSelect" />
</template>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-FOOTER-V1/footer?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| copyright | String | {"kind":"reference","name":"footerCopyright"} |  | 版权文本；不传时采用组件默认值。 |
| disabled | Boolean | false |  | 整体禁用可操作入口，但保留静态版权与备案信息。 |
| links | Array | {"kind":"function"} |  | 入口数组；条目含id、label及可选href、target、rel、disabled。 |
| registration | Object | {"kind":"function"} |  | 备案条目对象或null；可包含id、label及导航地址字段。 |

### Events

- `select`：被选择的条目对象。；激活任一未禁用条目时发出；带href的条目同时保留浏览器原生导航。

### Slots

- `copyright`：自定义版权信息内容。；仅替换版权区域，不改变备案或法律入口。

### 规则

包内未提供规则；不补写设计结论。

### Foundation 引用

`font-body-s`、`color-text-primary`、`color-text-secondary`、`color-text-disabled`、`color-surface-page`、`color-border-focus`、`spacing-component-sm`、`spacing-component-lg`、`spacing-component-xl`、`spacing-screen-edge-compact`、`spacing-screen-edge-expanded`、`layout-grid-max-width`

### 选型

用于页面或产品外壳的末尾辅助信息和法律入口；主导航、页内操作或独立反馈使用对应导航和按钮组件。

### 设计结构与排版

copyright为版权文案，registration为备案条目，links为入口集合。备案无地址时作为文本；法律项无href时作为事件按钮。copyright插槽可替代版权文案。

### 交互与键盘

有href的项目保留原生链接语义；无href的可操作条目使用按钮语义。disabled项目不可聚焦和触发。

### 使用边界与职责

组件公开入口为 WorkbenchFooter（@workbench/ui-vue3）。当前资格：prototype-only；业务数据、持久化和流程决策由宿主承担。

### 包内关联引用

```json
[
  {
    "label": "页脚 Footer组件规范",
    "href": "#rules"
  }
]
```
