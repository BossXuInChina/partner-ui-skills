<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261031.1 (af939228028791e24280015c5d48a35a658d40f3) — do not edit. -->

# 头像 Avatar — `WorkbenchAvatar`

资产：`wb-avatar` · 类型：`component` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261031.1` · commit：`af939228028791e24280015c5d48a35a658d40f3` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-AVATAR-V1/avatar?view=preview)

用于呈现用户或事物身份标识。点击、菜单和导航行为由外围具名按钮或链接负责。

公开入口：`@workbench/ui-vue3` → `WorkbenchAvatar`

## 变体与状态

状态：`unsupported`。声明值属于 Studio 案例数据，不自动等于公开组件 props。

[在 Studio 中查看](http://localhost:4173/preview/WB-AVATAR-V1/avatar?view=states)

unsupported：CUSTOM_VARIANT_GALLERY：A custom gallery or indirect scenario factory owns the rendered cases; manifest declarations are preserved, but are not claimed as an exhaustive portable gallery.

### 包内声明

```json
{
  "states": [
    {
      "id": "default",
      "label": "默认头像"
    },
    {
      "id": "color",
      "label": "彩色头像"
    },
    {
      "id": "image",
      "label": "图片头像"
    },
    {
      "id": "icon",
      "label": "图标头像"
    },
    {
      "id": "group",
      "label": "头像组"
    }
  ],
  "controls": [
    {
      "id": "size",
      "label": "尺寸",
      "type": "select",
      "default": "60",
      "options": [
        {
          "value": "24",
          "label": "24"
        },
        {
          "value": "40",
          "label": "40"
        },
        {
          "value": "60",
          "label": "60"
        },
        {
          "value": "80",
          "label": "80"
        },
        {
          "value": "120",
          "label": "120"
        }
      ]
    },
    {
      "id": "color",
      "label": "背景色",
      "type": "select",
      "default": "default",
      "options": [
        {
          "value": "default",
          "label": "默认渐变"
        },
        {
          "value": "blue",
          "label": "蓝色"
        },
        {
          "value": "cyan",
          "label": "青色"
        },
        {
          "value": "indigo",
          "label": "靛色"
        },
        {
          "value": "green",
          "label": "绿色"
        },
        {
          "value": "orange",
          "label": "橙色"
        },
        {
          "value": "purple",
          "label": "紫色"
        }
      ]
    },
    {
      "id": "text",
      "label": "头像文字",
      "type": "text",
      "default": "A"
    },
    {
      "id": "groupCount",
      "label": "头像组人数",
      "type": "select",
      "default": "3",
      "options": [
        {
          "value": "2",
          "label": "2"
        },
        {
          "value": "3",
          "label": "3"
        },
        {
          "value": "4",
          "label": "4"
        },
        {
          "value": "5",
          "label": "5"
        }
      ]
    },
    {
      "id": "groupLayout",
      "label": "排列方式",
      "type": "select",
      "default": "row",
      "options": [
        {
          "value": "row",
          "label": "单行"
        },
        {
          "value": "multiline",
          "label": "多行（三人/四人）"
        }
      ]
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
      "unit": "px"
    }
  ],
  "pilotControls": [
    {
      "id": "size",
      "label": "尺寸",
      "type": "select",
      "default": "60",
      "options": [
        {
          "value": "24",
          "label": "24"
        },
        {
          "value": "40",
          "label": "40"
        },
        {
          "value": "60",
          "label": "60"
        },
        {
          "value": "80",
          "label": "80"
        },
        {
          "value": "120",
          "label": "120"
        }
      ],
      "when": {
        "demoState": [
          "default",
          "color",
          "image",
          "icon"
        ]
      }
    },
    {
      "id": "color",
      "label": "背景色",
      "type": "select",
      "default": "default",
      "options": [
        {
          "value": "default",
          "label": "默认渐变"
        },
        {
          "value": "blue",
          "label": "蓝色"
        },
        {
          "value": "cyan",
          "label": "青色"
        },
        {
          "value": "indigo",
          "label": "靛色"
        },
        {
          "value": "green",
          "label": "绿色"
        },
        {
          "value": "orange",
          "label": "橙色"
        },
        {
          "value": "purple",
          "label": "紫色"
        }
      ],
      "when": {
        "demoState": [
          "default",
          "color"
        ]
      }
    },
    {
      "id": "text",
      "label": "头像文字",
      "type": "text",
      "default": "A",
      "when": {
        "demoState": [
          "default",
          "color",
          "image"
        ]
      }
    },
    {
      "id": "groupCount",
      "label": "头像组人数",
      "type": "select",
      "default": "3",
      "options": [
        {
          "value": "2",
          "label": "2"
        },
        {
          "value": "3",
          "label": "3"
        },
        {
          "value": "4",
          "label": "4"
        },
        {
          "value": "5",
          "label": "5"
        }
      ],
      "when": {
        "demoState": [
          "group"
        ]
      }
    },
    {
      "id": "groupLayout",
      "label": "排列方式",
      "type": "select",
      "default": "row",
      "options": [
        {
          "value": "row",
          "label": "单行"
        },
        {
          "value": "multiline",
          "label": "多行（三人/四人）",
          "when": {
            "groupCount": [
              "3",
              "4"
            ]
          }
        }
      ],
      "when": {
        "demoState": [
          "group"
        ]
      }
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
      "unit": "px"
    },
    {
      "id": "demoState",
      "label": "头像样本",
      "type": "select",
      "default": "default",
      "options": [
        {
          "value": "default",
          "label": "默认头像"
        },
        {
          "value": "color",
          "label": "彩色头像"
        },
        {
          "value": "image",
          "label": "图片头像"
        },
        {
          "value": "icon",
          "label": "图标头像"
        },
        {
          "value": "group",
          "label": "头像组"
        }
      ],
      "group": "状态与内容",
      "intent": "example"
    }
  ],
  "presets": []
}
```

### 定制画廊来源清单（unsupported）

```json
{
  "literalData": {
    "sizes": [
      24,
      40,
      60,
      80,
      120
    ]
  },
  "dynamicBindings": [
    "groupItems"
  ],
  "explicitCaseIds": [],
  "loopExpressions": [
    "size in sizes",
    "count in [2, 3, 4, 5]",
    "count in [3, 4]"
  ]
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：以文字、图标或图片标识用户和事物；通讯录、表格或顶部导航的头像与头像组

**不适用**：用头像代替有明确名称的交互按钮；未经生产接入验证直接作为生产包交付

官方来源 SFC：supported。

### 示例：审核人身份

id：`reviewer-identity` · portability：`portable` · owner：`wb-avatar`

展示单个审核人头像和多人头像组，交互行为由外部控件提供。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { WorkbenchAvatar, WorkbenchAvatarGroup } from '@workbench/ui-vue3'
const reviewers = [
  { id: 'a', text: '张明', label: '张明' },
  { id: 'b', text: '林悦', label: '林悦', color: 'blue' },
  { id: 'c', text: '陈杰', label: '陈杰', color: 'green' },
]
</script>
<template>
  <WorkbenchAvatar :size="40" text="张明" label="审核人张明" />
  <WorkbenchAvatarGroup :items="reviewers" label="共同审核人" />
</template>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-AVATAR-V1/avatar?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| color | String | default |  | 已支持的背景颜色名称。 |
| icon | Boolean |  |  | 显示内置或插槽人像图形。 |
| label | String |  |  | 完整可访问名称；未传时使用文本或“用户头像”。 |
| size | Number \| String | 60 |  | 头像尺寸24、40、60、80或120，默认60；可传对应数字字符串。 |
| src | String |  |  | 可选图片地址；加载失败回退显示内容。 |
| text | String | A |  | 调用方提供的1–2字素显示文本，默认A。 |

### Events

- `error`：原生图片加载Event。；src图片加载失败时发出；组件回退到文本或人像。

### Slots

- `icon`：无；替换头像内置人像内容；槽内容应作为装饰图形使用。

### 同族导出：`WorkbenchAvatarGroup`

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| items | Array | {"kind":"function"} |  |  |
| label | String | 头像组 |  |  |
| layout | String | row |  |  |

### 规则

包内未提供规则；不补写设计结论。

### Foundation 引用

`color-text-inverse`、`radius-full`、`font-headline-xxs`、`font-headline-s`、`font-headline-xl`

### 身份与图片回退

有src时优先显示居中裁切头像图；加载失败回退到文本或内置人像。text由调用方提供一个或两个字素，不自动推断姓名缩写。

- label提供完整可访问身份名称。

- icon无图片时显示人像；icon槽可替换人像图形。

### 尺寸与组合

单头像size支持24、40、60、80、120；color支持default、blue、cyan、indigo、green、orange、purple。

- WorkbenchAvatarGroup是同族辅助组件：单行固定24px头像；multiline仅对3或4人启用。

- 头像仅提供身份语义，不带点击或菜单行为。
