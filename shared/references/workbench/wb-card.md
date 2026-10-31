<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261031.1 (75b8e1c367077ff9a0e50ac7cb115868a2a7b3f6) — do not edit. -->

# 卡片 Card — `WorkbenchCard`

资产：`wb-card` · 类型：`component` · 资产合同版本：`1.0.4`

包：`@workbench/ui-vue3@0.2.0-prototype.20261031.1` · commit：`75b8e1c367077ff9a0e50ac7cb115868a2a7b3f6` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-CARD-V1/card?view=preview)

用边界清晰的容器组织相关内容、元信息和操作；展示、运营操作与导航卡片有各自明确语义。

公开入口：`@workbench/ui-vue3` → `WorkbenchCard`

## 变体与状态

状态：`unsupported`。声明值属于 Studio 案例数据，不自动等于公开组件 props。

[在 Studio 中查看](http://localhost:4173/preview/WB-CARD-V1/card?view=sizes)

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
      "default": "all",
      "options": [
        {
          "value": "all",
          "label": "全部案例"
        },
        {
          "value": "basic",
          "label": "基础类型"
        },
        {
          "value": "metrics",
          "label": "数值卡片"
        },
        {
          "value": "information",
          "label": "信息卡片"
        },
        {
          "value": "media",
          "label": "图文卡片"
        },
        {
          "value": "quick-app",
          "label": "快捷应用卡片"
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
      "default": "basic",
      "options": [
        {
          "value": "basic",
          "label": "基础类型"
        },
        {
          "value": "metrics",
          "label": "数值卡片"
        },
        {
          "value": "information",
          "label": "信息卡片"
        },
        {
          "value": "media",
          "label": "图文卡片"
        },
        {
          "value": "quick-app",
          "label": "快捷应用卡片"
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
      "group": "类型与布局",
      "when": {
        "previewContent": [
          "basic",
          "information",
          "media"
        ]
      }
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

### 定制画廊来源清单（unsupported）

```json
{
  "literalData": {},
  "dynamicBindings": [],
  "explicitCaseIds": [],
  "loopExpressions": [
    "group in ['布局', '内容结构']",
    "item in blockVariants.filter((v) => v.group === group)",
    "state in [\n          { id: 'default', title: '默认' },\n          { id: 'hover', title: '悬浮' },\n          { id: 'focus', title: '聚焦' },\n        ]"
  ]
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：展示一组独立内容；在卡片内部承载多个独立操作；整张卡片作为单一原生地址跳转入口

**不适用**：在整卡跳转内部嵌套按钮、链接或其他交互控件；把Card尺寸用作非栅格环境中的固定像素宽度；未经验证的内部框架生产实现

官方来源 SFC：partial。

### 示例：辅助信息与操作区共存

id：`operation-footer-actions` · portability：`portable` · owner：`wb-card`

进度、更新时间等放入footer；操作按钮放入actions，两者分别按实际内容启用。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { WorkbenchButton, WorkbenchCard } from '@workbench/ui-vue3'
</script>
<template>
  <WorkbenchCard variant="operation" size="xxl">
    <template #header>项目审核</template>
    <p>项目资料已填写，等待提交审核。</p>
    <template #footer><p>更新时间：今天 10:24</p></template>
    <template #actions><WorkbenchButton appearance="primary" size="28">提交审核</WorkbenchButton></template>
  </WorkbenchCard>
</template>
```

### 示例：项目摘要卡片

id：`project-summary-card` · portability：`portable` · owner：`wb-card`

项目摘要卡片场景示例展示组件在该业务流程中的职责，并附可直接运行的Vue代码。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { WorkbenchCard, WorkbenchCardGrid } from '@workbench/ui-vue3'
const cards = [{ id: 1, title: '项目概览', text: '查看项目进展与成员。' }, { id: 2, title: '账单', text: '管理付款方式与发票。' }]
</script>
<template>
  <WorkbenchCardGrid>
    <WorkbenchCard v-for="card in cards" :key="card.id" variant="display-white" size="m">
      <template #header>{{ card.title }}</template><p>{{ card.text }}</p>
    </WorkbenchCard>
  </WorkbenchCardGrid>
</template>
```

### 示例：数值 Block · 独立调用

id：`metric-block` · portability：`unsupported` · owner：`wb-card`

公共包入口与预览完全相同，当前保持prototype-only资格。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

unsupported：TARGET_NOT_RENDERED：The official SFC does not statically render the requested public component or a public member of its asset family.

### 示例：信息 Block · 辅助内容与真实操作

id：`information-block` · portability：`unsupported` · owner：`wb-card`

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

unsupported：TARGET_NOT_RENDERED：The official SFC does not statically render the requested public component or a public member of its asset family.

### 示例：图文 Block · 原封面与内容结构

id：`media-block` · portability：`unsupported` · owner：`wb-card`

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

unsupported：TARGET_NOT_RENDERED：The official SFC does not statically render the requested public component or a public member of its asset family.

### 示例：快捷应用 Block · 原生导航

id：`quick-app-block` · portability：`unsupported` · owner：`wb-card`

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

unsupported：TARGET_NOT_RENDERED：The official SFC does not statically render the requested public component or a public member of its asset family.

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-CARD-V1/card?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| href | String | {"kind":"undefined"} |  | navigation卡片的真实目标地址；其他variant不会生成链接。 |
| rel | String | {"kind":"undefined"} |  | navigation链接的关系属性；新窗口使用安全关系值。 |
| size | String | xxxl | s / m / l / xl / xxl / xxxl | 卡片的s至xxxl尺寸档位，影响布局尺寸，不改变内容语义。 |
| target | String | {"kind":"undefined"} |  | navigation链接的打开目标。 |
| variant | String | display-white | display-white / display-tinted / operation / navigation | display-white、display-tinted用于展示；operation用于包含独立操作；navigation用于整卡链接。 |

### Slots

- `header`：卡片头部标题或元信息。；需与正文区分层级；右侧异类操作应按规范分组。

- `default`：卡片主要内容。；由业务组件决定正文、表格或信息结构。

- `footer`：补充元数据或状态。；与actions独立，可同时存在且排在actions之前；关闭footer不会移除操作按钮。单独使用时保留普通底部间距。

- `actions`：卡片底部操作。；用于按钮组或文字操作，关闭后保留footer；内容到操作区间距及底部内边距均为24px，导航卡禁止该插槽。

### 同族导出：`WorkbenchCardGrid`

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| showGrid | Boolean | false |  |  |

### Slots

- `default`

### 规则

### 四种固定外观

id：`wb-card-appearance` · must / confirmed

display-white为白底无描边无阴影，display-tinted为灰底无描边无阴影，operation为白底1px描边无阴影，navigation为白底无描边并使用交互阴影。

**适用条件**：选择Card外观

### 统一Card内边距与多卡间距

id：`wb-card-spacing` · must / confirmed

Card左右内边距24px、顶部20px；无actions时底部20px，有actions时正文到Action及Action到底部均为24px。仅有元数据footer不触发Action间距；多张Card由CardGrid以16px统一间距排列。

**适用条件**：展示Card或CardGrid

### 整卡跳转使用原生链接

id：`wb-card-navigation` · must / confirmed

navigation必须提供href并渲染原生a；默认shadow-sm，Hover时替换为shadow-md。Navigation内部不得嵌套按钮、链接或其他交互控件。

**适用条件**：整张Card作为唯一跳转入口

### 卡内多操作不提升Card根节点

id：`wb-card-operation` · must / confirmed

operation只提供白底描边容器，操作由内部Button、Link或表单控件独立承担；Card根节点不响应点击或键盘激活。 actions插槽负责底部操作且使用24px正文间距与24px底部内边距；footer元数据不视作actions。 同时提供footer元数据与actions时先显示footer，actions置于底部。

**适用条件**：Card内部存在多个操作

### 六档栅格尺寸

id：`wb-card-size` · must / confirmed

s、m、l、xl、xxl、xxxl在24列CardGrid中分别占3、4、6、8、12、24列；12列区间保持目标列数但最大为12列；小于768px统一满宽。

**适用条件**：Card位于WorkbenchCardGrid内

### 可选栅格覆盖层

id：`wb-card-grid-visibility` · must / confirmed

CardGrid通过showGrid显示当前实际的1、12或24列轨道；覆盖层不接收指针事件，不改变Card排布与交互。

**适用条件**：评审或调试Card栅格跨度

**包内引用**：["wb-card-size"]

### Header右侧异类组件分组

id：`wb-card-header-slot-groups` · must / confirmed

Header右侧插槽同时嵌入不同类型组件时，相邻异类组件之间使用1×14px的color-border-separator-subtle竖分隔线，分隔线与左右组件均保持12px间距；单一类型不展示分隔线。

**适用条件**：Header右侧插槽包含多种不同类型组件

### 底部文字按钮视觉左对齐

id：`wb-card-footer-text-action-align` · must / confirmed

底部插槽包含文字按钮时，文字按钮容器向左偏移8px以抵消按钮水平留白，使按钮文字与正文视觉左对齐；其他底部内容不应用该偏移。

**适用条件**：Card底部插槽包含文字按钮

### Foundation 引用

`color-surface-card-default`、`color-surface-card-tinted`、`color-border`、`color-border-focus`、`color-border-separator-subtle`、`color-fill-selected`、`spacing-layout-container-inline`、`spacing-layout-container-block`、`spacing-dialog-padding-block-end-with-actions`、`spacing-layout-action-gap`、`spacing-layout-card-gap`、`spacing-component-md`、`spacing-component-sm`、`radius-lg`、`shadow-sm`、`shadow-md`、`font-body-s`、`layout-grid-breakpoint-medium`、`layout-grid-breakpoint-wide`、`layout-grid-columns-medium`、`layout-grid-columns-wide`

### 选型

卡片适合内容分组和摘要入口；需要可点击导航时用navigation并提供真实href；卡片内有多个独立操作时使用operation，避免整卡链接包裹交互控件。

### 设计结构与排版

variant决定展示、浅色展示、操作或导航职责；size决定尺寸落位。header、正文、footer元数据、actions操作区职责不同；Grid负责响应式排列。

footer与actions可同时存在，顺序为正文、底部辅助内容、底部操作区。新版操作卡片中两者独立配置，关闭其中一项不会影响另一项；按钮应放入actions。

### 交互与键盘

只有navigation卡片产生原生链接，可通过键盘激活并显示焦点。Navigation内部禁止嵌套按钮、链接、输入控件或actions插槽。

### 使用边界与职责

组件公开入口为 WorkbenchCard（@workbench/ui-vue3）。当前资格：prototype-only；业务数据、持久化和流程决策由宿主承担。

### 四类 Block 与 Pattern

数值、信息、图文、快捷应用是四类已登记Block。单行、多行、单列、表面与内容结构是各自配置；四种基础variant继续属于WorkbenchCard Component。四类Block已登记为Catalog资产并通过公共包导出，当前资格仍为prototype-only；人工逐项视觉验收单列。

跨卡片编排、批量操作和导航协同归Pattern：父Grid管理卡片间16px间距，卡片管理内部24/20留白。出现实际重复使用场景后再登记Pattern。

### Block 通用 API

title:string；信息、图文支持display-white/display-tinted/operation/navigation；数值和快捷应用仅支持display-white。size:s/m/l/xl/xxl/xxxl（默认xxxl）；信息与图文导航使用href、target、rel。headerActions和actions均为Action[]，默认[]；footer为null或metadata/progress对象，默认null。结构顺序固定为header、正文、footer、actions。

Action = { id:string, label:string, appearance?:primary/secondary/text/icon, icon?:已登记图标名, disabled?:boolean }。action事件返回{id,source:header/actions,event:MouseEvent}，业务执行与持久化由调用方负责。

footer = {kind:metadata,text:string} | {kind:progress,value:number,label?:string} | null；进度归一到0至100并提供原生progress语义。辅助内容与动作各自启用，关闭后移除对应容器。

共同slots为header、header-actions、footer、actions。存在内容的slot覆盖同名props；空slot不留下占位。导航模式只渲染数据驱动的被动内容，忽略所有可注入交互的slots与操作数组；缺少href时沿用基础Card的展示降级。

### 四类 Block 数据与插槽

- WorkbenchMetricCard：layout=row/multi/column，items: {id,label,value?:string|number|null,truncate?:boolean}[]。默认row/[]；数值0保留，缺省值显示破折号。icon和item slot取得{item,index}；empty slot用于空列表。

- WorkbenchInformationCard：structure=icon/text-action（默认icon），bodySize=14（默认14，正文固定使用Body M），description:string和tags:string[]。icon、content slot定制对应区域；footer进度独立传入。

- WorkbenchMediaCard：mediaKind=image/video（默认image），mediaLabel:string，badge:string，bodySize=14（默认14，正文固定使用Body M），description、tags。media和content slot定制封面与正文；header-actions放在正文标题右侧。封面默认204高、卡片最大608宽。

- WorkbenchQuickAppCard：layout=row/multi/column，items:{id,label,icon?,href?,target?,rel?,disabled?}[]。默认row/[]；有href为原生a，缺href为原生button，activate返回{item,event}且不阻止链接默认导航。item slot取得{item,index}，不嵌套交互；empty slot定制空内容。

### 容器响应式与有意调整

数值项按图示、间距和标签所需宽度自适应列数，单行最多6列、多行最多4列，窄容器逐步减少至1列；快捷应用继续使用单行6→3列、多行4→2列的容器断点，单列上限218。CardGrid仍使用768/1280容器断点。

图文默认示例不附辅助文字，底部按钮使用actions；辅助内容可按需单独配置。快捷应用新增真实链接、按钮、禁用和键盘焦点。其余默认视觉按冻结原版逐项对照，原版保留独立入口。

### 包内关联引用

```json
[
  {
    "label": "卡片 Card组件规范",
    "href": "#rules"
  }
]
```
