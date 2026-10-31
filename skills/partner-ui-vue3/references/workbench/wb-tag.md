<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261031.1 (1255ff9747cef05c6558318547e69acbbf71b928) — do not edit. -->

# 标签 Tag — `WorkbenchTag`

资产：`wb-tag` · 类型：`component` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261031.1` · commit：`1255ff9747cef05c6558318547e69acbbf71b928` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-TAG-V1/tag?view=preview)

用短文本标记属性、状态、分类或运营信息；标签可为静态内容，也可明确设为可交互按钮。

公开入口：`@workbench/ui-vue3` → `WorkbenchTag`

## 变体与状态

状态：`unsupported`。声明值属于 Studio 案例数据，不自动等于公开组件 props。

[在 Studio 中查看](http://localhost:4173/preview/WB-TAG-V1/tag?view=variants)

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
      "id": "selected",
      "label": "选中"
    },
    {
      "id": "disabled",
      "label": "禁用"
    }
  ],
  "controls": [
    {
      "id": "showcase",
      "label": "预览内容",
      "type": "select",
      "default": "types",
      "options": [
        {
          "value": "types",
          "label": "六种类型"
        },
        {
          "value": "sizes",
          "label": "三种尺寸"
        },
        {
          "value": "layout",
          "label": "卡片与图片布局"
        }
      ]
    },
    {
      "id": "size",
      "label": "标签尺寸",
      "type": "select",
      "default": "medium",
      "options": [
        {
          "value": "small",
          "label": "小号 20px"
        },
        {
          "value": "medium",
          "label": "中号 24px"
        },
        {
          "value": "large",
          "label": "大号 28px"
        }
      ]
    }
  ],
  "pilotControls": [
    {
      "id": "variant",
      "label": "标签类型",
      "type": "select",
      "default": "basic",
      "options": [
        {
          "value": "basic",
          "label": "基础标签"
        },
        {
          "value": "status-subtle",
          "label": "浅色状态"
        },
        {
          "value": "status-dot",
          "label": "点状状态"
        },
        {
          "value": "status-primary",
          "label": "高强调状态"
        },
        {
          "value": "category",
          "label": "分类颜色"
        },
        {
          "value": "corner",
          "label": "运营角标"
        }
      ],
      "group": "类型与尺寸"
    },
    {
      "id": "size",
      "label": "标签尺寸",
      "type": "select",
      "default": "medium",
      "options": [
        {
          "value": "small",
          "label": "小号 20px"
        },
        {
          "value": "medium",
          "label": "中号 24px"
        },
        {
          "value": "large",
          "label": "大号 28px"
        }
      ],
      "group": "类型与尺寸"
    },
    {
      "id": "label",
      "label": "标签文案",
      "type": "text",
      "default": "云服务伙伴",
      "group": "内容"
    },
    {
      "id": "status",
      "label": "状态语义",
      "type": "select",
      "default": "info",
      "options": [
        {
          "value": "info",
          "label": "提示 / 待开始"
        },
        {
          "value": "success",
          "label": "成功"
        },
        {
          "value": "warning",
          "label": "提醒"
        },
        {
          "value": "alert",
          "label": "告警"
        },
        {
          "value": "error",
          "label": "错误"
        },
        {
          "value": "none",
          "label": "失效"
        }
      ],
      "group": "内容",
      "when": {
        "variant": [
          "status-subtle",
          "status-dot",
          "status-primary"
        ]
      }
    },
    {
      "id": "categoryIndex",
      "label": "分类颜色",
      "type": "select",
      "default": "1",
      "options": [
        {
          "value": "1",
          "label": "分类 1"
        },
        {
          "value": "2",
          "label": "分类 2"
        },
        {
          "value": "3",
          "label": "分类 3"
        },
        {
          "value": "4",
          "label": "分类 4"
        },
        {
          "value": "5",
          "label": "分类 5"
        },
        {
          "value": "6",
          "label": "分类 6"
        },
        {
          "value": "7",
          "label": "分类 7"
        },
        {
          "value": "8",
          "label": "分类 8"
        },
        {
          "value": "9",
          "label": "分类 9"
        },
        {
          "value": "10",
          "label": "分类 10"
        },
        {
          "value": "11",
          "label": "分类 11"
        },
        {
          "value": "12",
          "label": "分类 12"
        }
      ],
      "group": "内容",
      "when": {
        "variant": [
          "category"
        ]
      }
    },
    {
      "id": "cornerTone",
      "label": "角标语义",
      "type": "select",
      "default": "new",
      "options": [
        {
          "value": "new",
          "label": "新品"
        },
        {
          "value": "hot",
          "label": "热门"
        },
        {
          "value": "discount",
          "label": "折扣"
        },
        {
          "value": "off",
          "label": "下架"
        }
      ],
      "group": "内容",
      "when": {
        "variant": [
          "corner"
        ]
      }
    },
    {
      "id": "placement",
      "label": "角标位置",
      "type": "select",
      "default": "top-left",
      "options": [
        {
          "value": "top-left",
          "label": "左上角"
        },
        {
          "value": "top-right",
          "label": "右上角"
        }
      ],
      "group": "结构与插槽",
      "when": {
        "variant": [
          "corner"
        ]
      }
    },
    {
      "id": "action",
      "label": "标签操作",
      "type": "select",
      "default": "none",
      "options": [
        {
          "value": "none",
          "label": "无"
        },
        {
          "value": "add",
          "label": "新增"
        },
        {
          "value": "remove",
          "label": "删除"
        }
      ],
      "group": "结构与插槽",
      "when": {
        "variant": [
          "basic"
        ]
      }
    },
    {
      "id": "interactive",
      "label": "允许交互",
      "type": "boolean",
      "default": true,
      "group": "结构与插槽",
      "when": {
        "variant": [
          "basic",
          "status-subtle",
          "status-dot",
          "status-primary",
          "category"
        ]
      },
      "description": "基础标签切换选中；状态和分类标签触发操作，可检查悬浮、按下及键盘焦点。",
      "unless": {
        "variant": [
          "basic"
        ],
        "action": [
          "add"
        ]
      }
    },
    {
      "id": "disabled",
      "label": "禁用标签",
      "type": "boolean",
      "default": false,
      "group": "状态与内容",
      "when": {
        "variant": [
          "status-subtle",
          "status-dot",
          "status-primary",
          "category"
        ]
      }
    },
    {
      "id": "showIcon",
      "label": "显示图标插槽",
      "type": "boolean",
      "default": false,
      "group": "结构与插槽",
      "when": {
        "variant": [
          "basic",
          "status-primary"
        ]
      },
      "unless": {
        "variant": [
          "basic"
        ],
        "action": [
          "add",
          "remove"
        ]
      }
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
  "literalData": {
    "statuses": [
      {
        "value": "info",
        "label": "提示"
      },
      {
        "value": "success",
        "label": "成功"
      },
      {
        "value": "warning",
        "label": "提醒"
      },
      {
        "value": "alert",
        "label": "告警"
      },
      {
        "value": "error",
        "label": "错误"
      },
      {
        "value": "none",
        "label": "失效"
      }
    ],
    "families": [
      {
        "variant": "status-subtle",
        "title": "浅色状态",
        "description": "浅色承载层"
      },
      {
        "variant": "status-dot",
        "title": "点状状态",
        "description": "点状状态"
      },
      {
        "variant": "status-primary",
        "title": "高强调状态",
        "description": "高强调状态"
      }
    ],
    "categories": [
      "计划中",
      "已完成",
      "待开始",
      "进行中",
      "发生错误",
      "关机",
      "搁置中",
      "在途中",
      "网管管理",
      "运力总览",
      "副设备",
      "主设备"
    ],
    "corners": [
      {
        "tone": "new",
        "label": "新品",
        "placement": "top-left"
      },
      {
        "tone": "hot",
        "label": "热门",
        "placement": "top-right"
      },
      {
        "tone": "discount",
        "label": "折扣",
        "placement": "top-left"
      },
      {
        "tone": "off",
        "label": "下架",
        "placement": "top-right"
      }
    ],
    "sizes": [
      {
        "value": "small",
        "label": "小号 · 20px",
        "usage": "适用于列表缩略图、微型卡片。"
      },
      {
        "value": "medium",
        "label": "中号 · 24px",
        "usage": "适用于标准卡片、文章封面图。"
      },
      {
        "value": "large",
        "label": "大号 · 28px",
        "usage": "适用于大卡片、Banner 和详情页单栏大图。"
      }
    ]
  },
  "dynamicBindings": [
    "selected",
    "removed",
    "additions",
    "feedback"
  ],
  "explicitCaseIds": [],
  "loopExpressions": [
    "index in additions",
    "family in families",
    "item in statuses",
    "(label, index) in categories",
    "item in corners",
    "item in sizes"
  ]
}
```

## 使用场景

[在 Studio 中查看](http://localhost:4173/preview/WB-TAG-V1/tag?view=examples)

**适用**：标记对象属性、短状态、分类或卡片运营信息

**不适用**：表达长句、承载复杂操作或替代按钮；未经验证的生产目标

官方来源 SFC：supported。

### 示例：可筛选状态标签

id：`controlled-example` · portability：`portable` · owner：`wb-tag`

可筛选状态标签业务场景的完整Vue示例，包含公开组件导入和所需数据。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchTag } from '@workbench/ui-vue3'
const selected = ref(false)
</script>
<template>
  <WorkbenchTag label="已归档" variant="basic" interactive :selected="selected" @select="selected = !selected" />
</template>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-TAG-V1/tag?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| action | String | none | none / add / remove | Basic标签的none/add/remove动作形式。 |
| categoryIndex | Number | 1 |  | category类标签编号，支持1至12的整数。 |
| cornerTone | String | new | new / hot / discount / off | corner标签的new/hot/discount/off语义。 |
| disabled | Boolean | false |  | 阻止交互并显示禁用状态。 |
| interactive | Boolean | false |  | 是否渲染为可操作按钮；静态展示保持非聚焦。 |
| label * | String \| Number |  |  | 标签显示文本或数字；必填，长内容按组件规则截断并保留全文提示。 |
| placement | String | top-left | top-left / top-right | 角标位于左上或右上。 |
| selected | Boolean | false |  | Basic交互标签的选中状态。 |
| size | String | medium | small / medium / large | small/medium/large三档尺寸。 |
| status | String | info | waiting / info / success / warning / alert / error / none | status类标签的语义状态色。 |
| variant | String | basic | basic / status-subtle / status-dot / category / corner / status-primary | basic、状态、分类、角标等视觉语义。 |

### Events

- `select`：{ label, selected, event }；selected仅在Basic类型中表示本次切换后的状态。；可交互标签激活时发出；selected仅在Basic中表示选中切换。

- `add`：{ label, event }。；action为add的交互标签激活时发出。

- `remove`：{ label, event }。；独立关闭按钮触发时发出；点击标签正文不删除。

### Slots

- `icon`：标签前缀图标内容。；用现有语义图标表达类别，不复制标签文字；Basic前置图标为10px，直接选择已登记的原生尺寸资产。

### 规则

### 展示类归属

id：`wb-tag-display-category` · must / confirmed

Tag属于展示类组件；表格、徽标、结构树、时间轴和头像在后续正式入库时也归入展示类。

**适用条件**：组织Workbench组件资产

### 六种标签类型

id：`wb-tag-types` · must / confirmed

支持基础、Subtle状态、点状状态、分类、角标和Primary状态六种类型。

**适用条件**：使用Tag

### 操作由父级受控

id：`wb-tag-controlled-actions` · must / confirmed

添加、删除和选择只发出事件，Tag不维护业务标签集合。

**适用条件**：使用可操作Tag

### 七字符截断

id：`wb-tag-truncation` · must / confirmed

超过7个用户可见字符时显示前7个字符加省略号，复用WorkbenchTooltip显示全文提示并绑定可访问描述；不使用原生title或伪元素提示。

**适用条件**：标签文本过长

### 独立主题颜色矩阵

id：`wb-tag-theme` · must / confirmed

Light与Dark使用本资产批准的颜色矩阵；Selected描边始终引用color-border-focus。

**适用条件**：展示Tag颜色与状态

### 组件依赖

`wb-tooltip`

### Foundation 引用

`color-text-primary`、`color-text-disabled`、`color-icon-primary`、`color-icon-disabled`、`color-border-focus`、`radius-sm`、`font-body-s`、`spacing-component-xs`、`spacing-component-sm`

### 选型

用于紧凑分类与状态标注；需要过滤集合时把interactive标签作为选择控件使用并由父级管理状态；多段说明不要塞入标签。

### 设计结构与排版

variant决定基础、状态、分类或角标形态；size决定密度。Basic类型支持add/remove/selected；状态与分类标签可通过interactive触发操作并显示悬浮、按下和焦点，选中视觉仅属于Basic。角标用于静态附着展示。

### 交互与键盘

interactive时渲染原生按钮并支持键盘激活；disabled阻断事件。静态标签不进入Tab序列。超过7个可见字符时保留前7个字符并省略；全文提示复用WorkbenchTooltip，悬浮或键盘聚焦时显示，Escape关闭，不叠加原生title或伪元素提示。

### 使用边界与职责

组件公开入口为 WorkbenchTag（@workbench/ui-vue3）。当前资格：prototype-only；业务数据、持久化和流程决策由宿主承担。

### 包内关联引用

```json
[
  {
    "label": "标签 Tag组件规范",
    "href": "#rules"
  }
]
```
