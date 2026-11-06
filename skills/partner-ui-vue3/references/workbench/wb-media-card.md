<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 图文卡片 Block — `WorkbenchMediaCard`

资产：`wb-media-card` · 类型：`block` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-CARD-BLOCKS-REGISTER-20261025/media-card?view=preview)

公开入口：`@workbench/ui-vue3` → `WorkbenchMediaCard`

## 变体与状态

状态：`unsupported`。声明值属于 Studio 案例数据，不自动等于公开组件 props。

[在 Studio 中查看](http://localhost:4173/preview/WB-CARD-BLOCKS-REGISTER-20261025/media-card?view=sizes)

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
      "id": "focus",
      "label": "聚焦"
    }
  ],
  "controls": [
    {
      "id": "headerSlot",
      "label": "Header 右侧插槽",
      "description": "配置标题右侧操作区；整卡跳转示例不放置内部操作。",
      "type": "select",
      "default": "example",
      "options": [
        {
          "value": "example",
          "label": "案例默认"
        },
        {
          "value": "none",
          "label": "无"
        },
        {
          "value": "icon",
          "label": "图标按钮"
        },
        {
          "value": "text",
          "label": "文字按钮"
        },
        {
          "value": "both",
          "label": "图标＋文字按钮"
        }
      ]
    },
    {
      "id": "footerSlot",
      "label": "底部插槽",
      "description": "适用于非跳转卡片；按钮统一左对齐，关闭插槽时高度随内容收缩。",
      "type": "select",
      "default": "example",
      "options": [
        {
          "value": "example",
          "label": "案例默认"
        },
        {
          "value": "none",
          "label": "无"
        },
        {
          "value": "metadata",
          "label": "辅助信息"
        },
        {
          "value": "progress",
          "label": "进度条"
        },
        {
          "value": "buttons",
          "label": "操作按钮组"
        },
        {
          "value": "text",
          "label": "文字按钮"
        }
      ]
    },
    {
      "id": "previewContent",
      "label": "预览内容",
      "description": "默认平铺全部案例，也可聚焦查看一类卡片；同类变体并排对照。",
      "type": "select",
      "default": "media",
      "options": [
        {
          "value": "media",
          "label": "图文卡片"
        }
      ]
    },
    {
      "id": "size",
      "label": "栅格尺寸",
      "description": "调整基础类型卡片的栅格跨度；组合案例保留各自适合的展示宽度。",
      "type": "select",
      "default": "xxl",
      "options": [
        {
          "value": "s",
          "label": "S · 3栅格"
        },
        {
          "value": "m",
          "label": "M · 4栅格"
        },
        {
          "value": "l",
          "label": "L · 6栅格"
        },
        {
          "value": "xl",
          "label": "XL · 8栅格"
        },
        {
          "value": "xxl",
          "label": "XXL · 12栅格"
        },
        {
          "value": "xxxl",
          "label": "XXXL · 24栅格"
        }
      ]
    },
    {
      "id": "showGrid",
      "label": "显示栅格",
      "description": "显示统一栅格辅助层，并跟随CardGrid当前实际的1、12或24列轨道",
      "type": "boolean",
      "default": false
    }
  ],
  "pilotControls": [
    {
      "id": "previewContent",
      "label": "内容场景",
      "description": "预览仅显示当前类型的一个实例；完整结构对照在变体页。",
      "type": "select",
      "default": "media",
      "options": [
        {
          "value": "media",
          "label": "图文卡片"
        }
      ],
      "group": "类型与布局"
    },
    {
      "id": "variant",
      "label": "卡片类型",
      "type": "select",
      "default": "display-white",
      "options": [
        {
          "value": "display-white",
          "label": "白底展示"
        },
        {
          "value": "display-tinted",
          "label": "灰底展示"
        },
        {
          "value": "operation",
          "label": "操作卡片"
        },
        {
          "value": "navigation",
          "label": "整卡导航"
        }
      ],
      "group": "类型与布局"
    },
    {
      "id": "size",
      "label": "栅格尺寸",
      "description": "调整基础类型卡片的栅格跨度；组合案例保留各自适合的展示宽度。",
      "type": "select",
      "default": "xxl",
      "options": [
        {
          "value": "s",
          "label": "S · 3栅格"
        },
        {
          "value": "m",
          "label": "M · 4栅格"
        },
        {
          "value": "l",
          "label": "L · 6栅格"
        },
        {
          "value": "xl",
          "label": "XL · 8栅格"
        },
        {
          "value": "xxl",
          "label": "XXL · 12栅格"
        },
        {
          "value": "xxxl",
          "label": "XXXL · 24栅格"
        }
      ],
      "group": "类型与布局",
      "when": {
        "previewContent": [
          "basic"
        ]
      }
    },
    {
      "id": "layout",
      "label": "内容布局",
      "type": "select",
      "default": "row",
      "options": [
        {
          "value": "row",
          "label": "单行"
        },
        {
          "value": "multi",
          "label": "多行"
        },
        {
          "value": "column",
          "label": "单列"
        }
      ],
      "group": "类型与布局",
      "when": {
        "previewContent": [
          "metrics",
          "quick-app"
        ]
      }
    },
    {
      "id": "structure",
      "label": "信息结构",
      "type": "select",
      "default": "icon",
      "options": [
        {
          "value": "icon",
          "label": "底托图标"
        },
        {
          "value": "text-action",
          "label": "标题操作"
        }
      ],
      "group": "类型与布局",
      "when": {
        "previewContent": [
          "information"
        ]
      }
    },
    {
      "id": "mediaKind",
      "label": "封面类型",
      "type": "select",
      "default": "video",
      "options": [
        {
          "value": "video",
          "label": "视频"
        },
        {
          "value": "image",
          "label": "热门图片"
        }
      ],
      "group": "类型与布局",
      "when": {
        "previewContent": [
          "media"
        ]
      }
    },
    {
      "id": "showTitle",
      "label": "显示标题",
      "type": "boolean",
      "default": true,
      "group": "内容",
      "when": {
        "previewContent": [
          "metrics",
          "information",
          "media",
          "quick-app"
        ]
      }
    },
    {
      "id": "titleText",
      "label": "自定义标题",
      "description": "留空使用原案例标题；关闭显示标题可移除标题。",
      "type": "text",
      "default": "",
      "group": "内容",
      "when": {
        "previewContent": [
          "metrics",
          "information",
          "media",
          "quick-app"
        ],
        "showTitle": [
          true
        ]
      }
    },
    {
      "id": "contentMode",
      "label": "内容边界",
      "type": "select",
      "default": "standard",
      "options": [
        {
          "value": "standard",
          "label": "原有内容"
        },
        {
          "value": "long",
          "label": "长文本"
        },
        {
          "value": "empty",
          "label": "缺省内容"
        }
      ],
      "group": "内容",
      "when": {
        "previewContent": [
          "metrics",
          "information",
          "media",
          "quick-app"
        ]
      }
    },
    {
      "id": "showTags",
      "label": "显示标签",
      "type": "boolean",
      "default": true,
      "group": "内容",
      "when": {
        "previewContent": [
          "information",
          "media"
        ],
        "contentMode": [
          "standard",
          "long"
        ]
      }
    },
    {
      "id": "metricCount",
      "label": "数值项数量",
      "type": "range",
      "default": 6,
      "min": 0,
      "max": 14,
      "step": 1,
      "group": "内容",
      "when": {
        "previewContent": [
          "metrics"
        ],
        "contentMode": [
          "standard",
          "long"
        ]
      }
    },
    {
      "id": "appCount",
      "label": "应用数量",
      "type": "range",
      "default": 6,
      "min": 0,
      "max": 9,
      "step": 1,
      "group": "内容",
      "when": {
        "previewContent": [
          "quick-app"
        ],
        "contentMode": [
          "standard",
          "long"
        ]
      }
    },
    {
      "id": "headerSlot",
      "label": "Header 右侧插槽",
      "description": "配置标题右侧操作区；整卡跳转示例不放置内部操作。",
      "type": "select",
      "default": "example",
      "options": [
        {
          "value": "example",
          "label": "案例默认"
        },
        {
          "value": "none",
          "label": "无"
        },
        {
          "value": "icon",
          "label": "图标按钮"
        },
        {
          "value": "text",
          "label": "文字按钮"
        },
        {
          "value": "both",
          "label": "图标＋文字按钮"
        }
      ],
      "group": "插槽与操作",
      "when": {
        "variant": [
          "display-white",
          "display-tinted",
          "operation"
        ]
      }
    },
    {
      "id": "footerSlot",
      "label": "底部辅助内容",
      "description": "配置footer中的辅助信息或进度；操作卡片的底部操作区独立配置，关闭辅助内容不会移除按钮。",
      "type": "select",
      "default": "example",
      "options": [
        {
          "value": "example",
          "label": "案例默认"
        },
        {
          "value": "none",
          "label": "无"
        },
        {
          "value": "metadata",
          "label": "辅助信息"
        },
        {
          "value": "progress",
          "label": "进度条"
        }
      ],
      "group": "插槽与操作",
      "unless": {
        "previewContent": [
          "basic"
        ],
        "variant": [
          "navigation"
        ]
      }
    },
    {
      "id": "actionsSlot",
      "label": "底部操作区",
      "description": "独立控制actions；案例默认保留操作卡按钮和图文动作，其他组合不显示操作。",
      "type": "select",
      "default": "example",
      "options": [
        {
          "value": "example",
          "label": "案例默认"
        },
        {
          "value": "buttons",
          "label": "操作按钮组"
        },
        {
          "value": "text",
          "label": "文字按钮"
        },
        {
          "value": "none",
          "label": "无"
        }
      ],
      "group": "插槽与操作",
      "when": {
        "variant": [
          "display-white",
          "display-tinted",
          "operation"
        ]
      },
      "unless": {
        "previewContent": [
          "basic"
        ],
        "variant": [
          "display-white",
          "display-tinted"
        ]
      }
    },
    {
      "id": "appState",
      "label": "应用状态",
      "type": "select",
      "default": "default",
      "options": [
        {
          "value": "default",
          "label": "可用"
        },
        {
          "value": "disabled",
          "label": "末项禁用"
        }
      ],
      "group": "状态",
      "when": {
        "previewContent": [
          "quick-app"
        ],
        "variant": [
          "display-white",
          "display-tinted",
          "operation"
        ],
        "contentMode": [
          "standard",
          "long"
        ],
        "appCount": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9
        ]
      },
      "intent": "state",
      "presentation": "state-buttons"
    },
    {
      "id": "showGrid",
      "label": "显示栅格",
      "description": "显示统一栅格辅助层，并跟随CardGrid当前实际的1、12或24列轨道",
      "type": "boolean",
      "default": false,
      "group": "容器",
      "when": {
        "previewContent": [
          "basic"
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

## 使用场景

包内未提供对应 Studio 路由。

**适用**：需要以稳定数据接口复用图文卡片结构、布局和独立底部区域

**不适用**：跨卡片业务流程、持久化与编排应由宿主/Pattern管理；未经人工视觉签收或生产接入验证即宣称可生产交付

官方来源 SFC：supported。

### 示例：图文 Block · 原封面与内容结构

id：`media-block` · portability：`portable` · owner：`wb-card`

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { WorkbenchMediaCard } from '@workbench/ui-vue3'
</script>
<template><WorkbenchMediaCard title="联合服务团队交付实践" media-kind="image" media-label="伙伴联合解决方案图片" badge="热门" :body-size="14" :tags="['交付案例']" description="合作团队共同完成项目部署与运维交接。" :actions="[{id:'view',label:'查看详情'}]" @action="({id}) => console.log(id)" /></template>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-CARD-BLOCKS-REGISTER-20261025/media-card?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| actions | Array | {"kind":"function"} |  |  |
| badge | String |  |  |  |
| bodySize | Number | 14 |  |  |
| description | String |  |  |  |
| footer | Object | null |  |  |
| headerActions | Array | {"kind":"function"} |  |  |
| href | String | {"kind":"undefined"} |  |  |
| mediaKind | String | image | image / video |  |
| mediaLabel | String |  |  |  |
| rel | String | {"kind":"undefined"} |  |  |
| size | String | xxxl | s / m / l / xl / xxl / xxxl |  |
| tags | Array | {"kind":"function"} |  |  |
| target | String | {"kind":"undefined"} |  |  |
| title | String |  |  |  |
| variant | String | display-white | display-white / display-tinted / operation / navigation |  |

### Events

- `action`

### Slots

- `header`

- `footer`

- `actions`

- `media`

- `content`

- `header-actions`

### 规则

### 固定区域与独立操作

id：`wb-media-card-structure` · must / confirmed

按header、正文、footer、actions组织；footer辅助信息与actions独立配置，关闭或空插槽不留下占位。

**适用条件**：图文卡片组合

### 原生导航与职责边界

id：`wb-media-card-navigation` · must / confirmed

navigation保留原生href，内部仅被动内容，禁止嵌套交互；业务保存和跨卡片编排归宿主。

**适用条件**：整卡导航

### 组件依赖

`wb-card`、`wb-button`、`wb-tag`

### Foundation 引用

`color-text-primary`、`color-text-secondary`、`font-body-m`、`font-body-s`、`spacing-component-sm`、`spacing-component-md`、`spacing-component-lg`
