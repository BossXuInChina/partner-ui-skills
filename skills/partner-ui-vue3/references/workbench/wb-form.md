<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261031.1 (af939228028791e24280015c5d48a35a658d40f3) — do not edit. -->

# 表单 Form — `WorkbenchForm`

资产：`wb-form` · 类型：`component` · 资产合同版本：`1.0.2`

包：`@workbench/ui-vue3@0.2.0-prototype.20261031.1` · commit：`af939228028791e24280015c5d48a35a658d40f3` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-FORM-V1/form?view=preview)

用于编排字段、同步校验与提交。业务model始终由调用方持有；WorkbenchFormItem统一负责字段标签、必填语义与反馈。

公开入口：`@workbench/ui-vue3` → `WorkbenchForm`

## 变体与状态

状态：`unsupported`。声明值属于 Studio 案例数据，不自动等于公开组件 props。

[在 Studio 中查看](http://localhost:4173/preview/WB-FORM-V1/form?view=variants)

unsupported：CUSTOM_VARIANT_GALLERY：A custom gallery or indirect scenario factory owns the rendered cases; manifest declarations are preserved, but are not claimed as an exhaustive portable gallery.

### 包内声明

```json
{
  "states": [
    {
      "id": "editable",
      "label": "可编辑表单"
    },
    {
      "id": "readonly",
      "label": "只读表单"
    },
    {
      "id": "mixed",
      "label": "混合表单"
    },
    {
      "id": "disabled",
      "label": "禁用表单"
    }
  ],
  "controls": [
    {
      "id": "previewWidth",
      "type": "range",
      "target": "viewport-width",
      "label": "页面宽度",
      "description": "调整预览画布宽度，检查Form内容区的1/2/3/4列容器响应。",
      "default": 1440,
      "min": 480,
      "max": 1920,
      "step": 1,
      "unit": "px",
      "marks": [
        656,
        968,
        1280,
        1856
      ]
    },
    {
      "id": "labelPosition",
      "type": "select",
      "label": "标签排列方式",
      "description": "上下排列节约横向空间；左右排列节约纵向空间并将标签右对齐。",
      "default": "top",
      "options": [
        {
          "value": "top",
          "label": "上下排列"
        },
        {
          "value": "left",
          "label": "左右排列"
        }
      ]
    },
    {
      "id": "labelLength",
      "type": "select",
      "label": "标签长度",
      "default": "random",
      "options": [
        {
          "value": "random",
          "label": "随机标签长度"
        },
        {
          "value": "same",
          "label": "相同标签长度"
        }
      ]
    },
    {
      "id": "showGrid",
      "type": "boolean",
      "label": "显示栅格",
      "description": "仅在录入控件或只读数据区域显示统一的12列栅格辅助层，不覆盖标签。",
      "default": false
    }
  ],
  "pilotControls": [
    {
      "id": "demoState",
      "label": "组件状态",
      "type": "select",
      "default": "editable",
      "options": [
        {
          "value": "editable",
          "label": "可编辑表单"
        },
        {
          "value": "readonly",
          "label": "只读表单"
        },
        {
          "value": "mixed",
          "label": "混合表单"
        },
        {
          "value": "disabled",
          "label": "禁用表单"
        }
      ],
      "intent": "state",
      "presentation": "state-buttons"
    },
    {
      "id": "previewWidth",
      "type": "range",
      "target": "viewport-width",
      "label": "页面宽度",
      "description": "调整预览画布宽度，检查Form内容区的1/2/3/4列容器响应。",
      "default": 1440,
      "min": 480,
      "max": 1920,
      "step": 1,
      "unit": "px",
      "marks": [
        656,
        968,
        1280,
        1856
      ]
    },
    {
      "id": "labelPosition",
      "type": "select",
      "label": "标签排列方式",
      "description": "上下排列节约横向空间；左右排列节约纵向空间并将标签右对齐。",
      "default": "top",
      "options": [
        {
          "value": "top",
          "label": "上下排列"
        },
        {
          "value": "left",
          "label": "左右排列"
        }
      ]
    },
    {
      "id": "labelLength",
      "type": "select",
      "label": "标签长度",
      "default": "random",
      "options": [
        {
          "value": "random",
          "label": "随机标签长度"
        },
        {
          "value": "same",
          "label": "相同标签长度"
        }
      ]
    }
  ],
  "presets": [
    {
      "id": "demoState-editable",
      "label": "演示状态 · 可编辑表单",
      "controls": {
        "demoState": "editable"
      }
    },
    {
      "id": "demoState-readonly",
      "label": "演示状态 · 只读表单",
      "controls": {
        "demoState": "readonly"
      }
    },
    {
      "id": "demoState-mixed",
      "label": "演示状态 · 混合表单",
      "controls": {
        "demoState": "mixed"
      }
    },
    {
      "id": "demoState-disabled",
      "label": "演示状态 · 禁用表单",
      "controls": {
        "demoState": "disabled"
      }
    },
    {
      "id": "labelPosition-top",
      "label": "标签排列方式 · 上下排列",
      "controls": {
        "labelPosition": "top"
      }
    },
    {
      "id": "labelPosition-left",
      "label": "标签排列方式 · 左右排列",
      "controls": {
        "labelPosition": "left"
      }
    },
    {
      "id": "labelLength-random",
      "label": "标签长度 · 随机标签长度",
      "controls": {
        "labelLength": "random"
      }
    },
    {
      "id": "labelLength-same",
      "label": "标签长度 · 相同标签长度",
      "controls": {
        "labelLength": "same"
      }
    }
  ]
}
```

### 定制画廊来源清单（unsupported）

```json
{
  "literalData": {
    "cases": [
      {
        "value": "top",
        "label": "顶部标签 · 可编辑",
        "state": "editable",
        "labelPosition": "top"
      },
      {
        "value": "left",
        "label": "左侧标签 · 可编辑",
        "state": "editable",
        "labelPosition": "left"
      },
      {
        "value": "readonly",
        "label": "左侧标签 · 只读",
        "state": "readonly",
        "labelPosition": "left"
      },
      {
        "value": "mixed",
        "label": "左侧标签 · 混合模式",
        "state": "mixed",
        "labelPosition": "left"
      },
      {
        "value": "disabled",
        "label": "禁用表单",
        "state": "disabled",
        "labelPosition": "top"
      },
      {
        "value": "required",
        "label": "必填校验 · 空值提交",
        "state": "editable",
        "labelPosition": "top",
        "formCase": "required"
      },
      {
        "value": "format-error",
        "label": "格式校验 · 邮箱错误",
        "state": "editable",
        "labelPosition": "top",
        "formCase": "format-error"
      }
    ]
  },
  "dynamicBindings": [],
  "explicitCaseIds": [
    "item.value"
  ],
  "loopExpressions": [
    "item in cases"
  ]
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：需要编排结构化字段、同步校验反馈、只读展示和提交操作的表单。

**不适用**：异步远程校验、多步骤流程编排或由组件内部持有业务值。

官方来源 SFC：supported。

### 示例：同步校验表单

id：`validated-form` · portability：`portable` · owner：`wb-form`

受控数据与同步规则完整定义；提交行为由调用方处理。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { reactive, ref } from "vue"
import { WorkbenchForm, WorkbenchFormItem, WorkbenchInput } from "@workbench/ui-vue3"
const model = reactive({ name: "" })
const notice = ref('')
const rules = [{ required: true, trigger: "blur", message: "请输入姓名" }]
function submitForm({ model }) { notice.value = `已提交：${model.name}` }
function showInvalid({ errors }) { notice.value = `请修正 ${errors.length} 项` }
</script>
<template>
  <WorkbenchForm title="联系人" :model="model" @submit="submitForm" @invalid="showInvalid">
    <WorkbenchFormItem label="姓名" prop="name" :rules="rules">
      <WorkbenchInput v-model="model.name" aria-label="姓名" />
    </WorkbenchFormItem>
  </WorkbenchForm>
  <output>{{ notice }}</output>
</template>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-FORM-V1/form?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| density | String | comfortable | comfortable / compact |  |
| disabled | Boolean |  |  | 禁用表单中的可编辑字段。 |
| labelPosition | String | top | top / left | 字段标签置于top或left；left标签保留字段开头、超长时尾部省略，再将显示内容右对齐，悬浮或键盘聚焦查看全文。 |
| labelWidth | String | var(--wb-asset-wb-form-label-width) |  | 左右标签使用的标签宽度。 |
| mode | String | editable | readonly / editable / mixed | editable、readonly或mixed；mixed时由各FormItem决定字段模式。 |
| model * | Object |  |  | 由调用方持有的表单数据对象。 |
| showGrid | Boolean |  |  | Studio布局检查辅助项，不是业务视觉功能。 |
| singleLine | Boolean |  |  | 调整字段排列为单行布局。 |
| title * | String |  |  | 可选表单标题。 |
| titleVisible | Boolean | true |  |  |

### Events

- `submit`：{ model }，提交时的表单数据对象。；整组校验通过后发出。

- `invalid`：{ valid, errors }，包含验证状态及错误信息。；整组校验未通过时发出。

### Slots

- `default`：无插槽参数。；放置WorkbenchFormItem或WorkbenchFormGroup字段内容。

- `actions`：无插槽参数。；放置表单操作；组件不自动创建提交按钮。

### 实例成员

- `validate(): Promise<FormValidation>;`

- `resetValidation(): void;`

- `focusFirstInvalid(): void;`

- `submit(event?: Event): Promise<FormValidation | undefined>;`

### 同族导出：`WorkbenchFormGroup`

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| label | String |  |  |  |
| nested | Boolean |  |  |  |

### Slots

- `default`

### 同族导出：`WorkbenchFormItem`

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| formatter | Function |  |  |  |
| hint | String |  |  |  |
| label * | String |  |  |  |
| labelPosition | String | top | top / left |  |
| labelWidth | String | var(--wb-asset-wb-form-label-width) |  |  |
| message | String |  |  |  |
| mode | String |  |  / readonly / editable |  |
| modelValue |  | {"kind":"undefined"} |  |  |
| prop | String |  |  |  |
| required | Boolean |  |  |  |
| rules | Array | {"kind":"function"} |  |  |
| size | String |  |  / s / base / m / l / xl |  |
| validateStatus | String |  |  / error |  |

### Slots

- `readonly`

- `readonly-actions`

- `default`

### 实例成员

- `validate(trigger?: string): {prop: string; status: '' | 'error'; message: string};`

- `reset(): void;`

- `focus(): void;`

- `readonly status: '' | 'error';`

### 规则

### 职责与受控模型

id：`wb-form-rule-1` · must / confirmed

Form编排整组布局、同步校验和提交，model由调用方持有。FormItem可独立配置required/hint/validateStatus/message；位于Form内时必须提供prop点路径并接入model/rules。独立字段不自动获得整表校验。

**适用条件**：使用表单编排结构化字段

### 校验与提交合同

id：`wb-form-rule-2` · must / confirmed

rules支持required和同步validator，trigger支持blur/change；校验只保留Error状态并阻断提交，聚焦首个可编辑失败项。只读字段不参与提交校验。validateStatus仅支持空值或error，message是外部受控错误反馈并优先实时显示。validator抛错或返回Promise均转为Error结果，Promise不作为通过；本版不执行异步校验。

**适用条件**：校验或提交表单

### 公开API、Slots与事件

id：`wb-form-rule-3` · must / confirmed

Form props：title、titleVisible（默认true，false时标题视觉隐藏并保留可访问名称）、model、density(comfortable/compact，仅readonly紧凑行距，默认comfortable)、mode(editable/readonly/mixed)、labelPosition(top/left)、labelWidth、singleLine、showGrid；默认Slot放字段，actions Slot放操作；submit({model})和invalid({valid,errors})事件；ref暴露validate、resetValidation、focusFirstInvalid、submit。FormItem props：label、prop（Form内必填）、modelValue、required、hint、labelPosition、labelWidth、mode、size(s/base/m/l/xl)、rules、validateStatus(仅error或空值)、message、formatter；编辑态默认Slot获得status、message、describedBy、labelledBy、invalid、required；只读态readonly和readonly-actions Slot获得value、displayValue、prop、model，默认显示格式化文本；ref暴露validate、reset、focus和只读status。校验反馈仅错误文案，不显示图标或其他符号。FormGroup props：label、nested，默认Slot放字段。

**适用条件**：调用Form、FormItem或FormGroup

### 布局与只读边界

id：`wb-form-rule-4` · must / confirmed

内容区按656/968/1280px容器断点进入2/3/4列；显式size切换12单位跨度2/4/6/8/10。左右标签默认96px并与32px控件槽对齐；FormItem内Select填满控件槽，独立Select保留默认宽度；FormItem内Rating的星星按钮高32px，单行评分字段使用无可见描述形态，独立Rating尺寸不变；单列布局的actions位于末行右侧，顶部标签布局的同排actions对齐控件底边；nested缩进16px。readonly渲染语义文本而非禁用控件，mixed由字段mode选择只读或编辑。showGrid仅用于预览检查。

**适用条件**：配置表单布局或只读展示

### 必填星复用8×22px共享SVG

id：`wb-form-rule-5` · must / confirmed

WorkbenchFormItem复用WorkbenchRequiredMark共享SVG；8×22px画布与标签正文行高一致，图形内置纵向光学位置及#E02128颜色。画布在标签行盒中垂直居中并悬挂于文字左侧，不挤压标签或控件对齐。

**适用条件**：字段配置required或required校验规则

### 字段可用宽度与整行组合

id：`wb-form-field-width-20261026` · must / confirmed

FormItem内Select与日期选择器填满控件槽，独立使用保留自身默认宽度，日期面板尺寸不随字段变化。需整行的说明字段由父布局跨全部列；xl仍为10/12跨度，不等于整行。预览容器不裁剪左侧必填标记。

**适用条件**：FormItem内组合录入控件

### 组件依赖

`wb-tooltip`

### Foundation 引用

`color-text-primary`、`color-text-secondary`、`color-error`、`color-border-focus`、`spacing-component-xs`、`spacing-component-sm`、`spacing-component-lg`、`spacing-layout-content-gap`、`font-body-s`、`font-body-m`、`font-headline-xs`、`font-headline-s`

### 选型

需要整组字段编排、校验和提交时使用WorkbenchForm；独立字段可单独使用WorkbenchFormItem。

- WorkbenchFormGroup用于给一组字段添加可选标题和嵌套缩进。

- mixed模式适用于同一表单中部分只读、部分可编辑的场景。

### 设计结构与排版

Form默认插槽放字段，actions插槽放提交等操作；FormItem通过prop点路径读取model值并注册到整组管理。

- 默认列数随内容宽度响应；可用FormItem size指定12单位网格跨度。

- 只读字段显示标签和格式化文本，不以disabled控件模拟。

- showGrid仅供Studio检查布局。

### 交互与键盘

rules使用同步required或validator校验；触发时机可配置为blur、change或二者。

- 提交时校验整组字段，失败后聚焦第一个可编辑的无效字段。

- 验证只保留错误状态；外部validateStatus/message可控反馈并优先于本地规则。

- ref可调用validate、resetValidation、focusFirstInvalid与submit。

### 使用边界与职责

调用方负责更新model值；resetValidation只重置校验状态，不会重置业务数据。

- 异步校验、数组路径语法、多步骤表单及生产框架适配不在当前能力范围。

- 同步validator返回空字符串表示通过；字符串或false表示失败，Promise会明确报不支持异步校验。

- WorkbenchFormItem独立使用时由调用方提供modelValue或可校验值；不加入整表提交注册。

### 包内关联引用

```json
[
  {
    "label": "字段职责与表单规范",
    "href": "#rules"
  },
  {
    "label": "字段辅助组件API",
    "href": "#family"
  }
]
```
