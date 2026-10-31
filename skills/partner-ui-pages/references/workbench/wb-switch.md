<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261031.1 (1255ff9747cef05c6558318547e69acbbf71b928) — do not edit. -->

# 开关 Switch — `WorkbenchSwitch`

资产：`wb-switch` · 类型：`component` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261031.1` · commit：`1255ff9747cef05c6558318547e69acbbf71b928` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-SWITCH-V1/switch?view=preview)

用于即时切换一个布尔设置。切换后由调用方保存状态并决定后续业务影响。

公开入口：`@workbench/ui-vue3` → `WorkbenchSwitch`

## 变体与状态

状态：`unsupported`。声明值属于 Studio 案例数据，不自动等于公开组件 props。

[在 Studio 中查看](http://localhost:4173/preview/WB-SWITCH-V1/switch?view=variants)

unsupported：CUSTOM_VARIANT_GALLERY：A custom gallery or indirect scenario factory owns the rendered cases; manifest declarations are preserved, but are not claimed as an exhaustive portable gallery.

### 包内声明

```json
{
  "states": [
    {
      "id": "off",
      "label": "关闭"
    },
    {
      "id": "on",
      "label": "开启"
    },
    {
      "id": "loading-on",
      "label": "开启处理中"
    },
    {
      "id": "loading-off",
      "label": "关闭处理中"
    },
    {
      "id": "disabled-off",
      "label": "关闭禁用"
    },
    {
      "id": "disabled-on",
      "label": "开启禁用"
    }
  ],
  "controls": [],
  "pilotControls": [
    {
      "id": "initialOn",
      "type": "boolean",
      "label": "初始开启",
      "default": false,
      "group": "状态与内容"
    },
    {
      "id": "busy",
      "type": "boolean",
      "label": "加载中",
      "default": false,
      "group": "状态与内容"
    },
    {
      "id": "unavailable",
      "type": "boolean",
      "label": "禁用",
      "default": false,
      "group": "状态与内容"
    },
    {
      "id": "label",
      "type": "text",
      "label": "开关文字",
      "default": "启用自动同步",
      "group": "内容"
    },
    {
      "id": "showLabel",
      "type": "boolean",
      "label": "显示文字",
      "default": true,
      "group": "展示选项"
    },
    {
      "id": "previewWidth",
      "label": "预览容器宽度",
      "type": "range",
      "default": 1280,
      "min": 320,
      "max": 1600,
      "step": 1,
      "unit": "px",
      "target": "viewport-width",
      "group": "容器",
      "marks": [
        390,
        768,
        1280,
        1440
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
    "examples"
  ],
  "explicitCaseIds": [
    "item.id"
  ],
  "loopExpressions": [
    "item in examples"
  ]
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：即时开启或关闭一个布尔配置

**不适用**：提交后才生效的多项选择或不可立即撤销的操作

官方来源 SFC：supported。

### 示例：开启通知

id：`notification-switch` · portability：`portable` · owner：`wb-switch`

开关代表即时生效的通知偏好，保存值由调用方持有。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchSwitch } from '@workbench/ui-vue3'
const notifications = ref(true)
</script>
<template>
  <WorkbenchSwitch v-model="notifications" label="接收审批进度通知" name="notifications" />
  <output>通知{{ notifications ? '已开启' : '已关闭' }}</output>
</template>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-SWITCH-V1/switch?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| ariaDescribedby | String |  |  | 关联补充说明的ID。 |
| ariaLabel | String |  |  | 可访问名称；优先于label。 |
| disabled | Boolean |  |  | 阻止用户切换。 |
| invalid | Boolean |  |  | 声明错误状态。 |
| label | String |  |  | 可见开关名称。 |
| loading | Boolean |  |  | 显示加载状态并阻止切换。 |
| modelValue | Boolean |  |  | 当前布尔值。 |
| name | String |  |  | 原生checkbox表单字段名。 |
| value | String | on |  | 提交到FormData的字符串值，默认on。 |

### Events

- `update:modelValue`：新的Boolean值。；用户通过点击或Space改变状态时发出。

### 规则

### 受控布尔合同

id：`wb-switch-rule-1` · must / confirmed

modelValue为受控布尔值，点击或Space通过update:modelValue返回新值。label显示可见名称，显式ariaLabel优先，无可见名称时回退为“开关”。name和value沿用原生checkbox表单语义。

**适用条件**：即时布尔配置

### 禁用与加载

id：`wb-switch-rule-2` · must / confirmed

disabled或loading均阻止切换；loading保留当前开关值、设置aria-busy并在滑块内复用Loading。

**适用条件**：异步切换

### 组件依赖

`wb-loading`

### Foundation 引用

`color-border-focus`、`color-fill-disabled`、`color-icon-disabled`、`color-icon-inverse`、`color-icon-primary`、`color-none`、`color-text-disabled`、`color-text-primary`、`radius-full`、`spacing-component-sm`

### 状态与交互

点击或Space切换受控modelValue。loading与disabled都会阻止状态变化；loading保留当前值并声明忙碌状态。

- 传入label提供可见名称；无可见名称时通过ariaLabel命名。

- name与value使控件遵循原生checkbox表单语义。

### 使用边界

仅用于可以立即生效的布尔设置。需要提交多字段配置时使用表单控件，不用开关代替保存动作。
