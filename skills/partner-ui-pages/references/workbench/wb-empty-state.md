<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261031.1 (af939228028791e24280015c5d48a35a658d40f3) — do not edit. -->

# 空状态 EmptyState — `WorkbenchEmptyState`

资产：`wb-empty-state` · 类型：`component` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261031.1` · commit：`af939228028791e24280015c5d48a35a658d40f3` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-EMPTY-STATE-V1/empty-state?view=preview)

在局部、卡片或页面没有可展示内容时解释原因，并提供恢复操作。

公开入口：`@workbench/ui-vue3` → `WorkbenchEmptyState`

## 变体与状态

状态：`unavailable`。声明值属于 Studio 案例数据，不自动等于公开组件 props。

包内未提供对应 Studio 路由。

unsupported：VARIANT_VIEW_MISSING：No current declared variants view/readingPilot is available; source declarations are retained.

### 包内声明

```json
{
  "states": [
    {
      "id": "no-data",
      "label": "暂无数据"
    },
    {
      "id": "no-results",
      "label": "搜索无结果"
    },
    {
      "id": "network-error",
      "label": "网络异常"
    },
    {
      "id": "load-failed",
      "label": "加载失败"
    },
    {
      "id": "forbidden",
      "label": "无权限"
    },
    {
      "id": "removed",
      "label": "内容已下架"
    },
    {
      "id": "expired",
      "label": "内容已失效"
    },
    {
      "id": "coming-soon",
      "label": "敬请期待"
    }
  ],
  "controls": [
    {
      "id": "level",
      "label": "空状态层级",
      "type": "select",
      "default": "card",
      "options": [
        {
          "value": "local",
          "label": "局部文字"
        },
        {
          "value": "card",
          "label": "卡片级"
        },
        {
          "value": "page",
          "label": "页面级"
        }
      ]
    },
    {
      "id": "size",
      "label": "插画尺寸",
      "type": "select",
      "default": "auto",
      "options": [
        {
          "value": "auto",
          "label": "随层级"
        },
        {
          "value": "small",
          "label": "小 64px"
        },
        {
          "value": "default",
          "label": "默认 120px"
        },
        {
          "value": "large",
          "label": "大 240px"
        }
      ]
    },
    {
      "id": "locale",
      "label": "语言",
      "type": "select",
      "default": "zh-CN",
      "options": [
        {
          "value": "zh-CN",
          "label": "简体中文"
        },
        {
          "value": "en-US",
          "label": "English"
        }
      ]
    },
    {
      "id": "showTitle",
      "label": "显示标题",
      "type": "boolean",
      "default": false
    },
    {
      "id": "showActions",
      "label": "显示操作按钮",
      "type": "boolean",
      "default": false
    },
    {
      "id": "secondary",
      "label": "次要按钮",
      "type": "boolean",
      "default": true
    },
    {
      "id": "busy",
      "label": "操作处理中",
      "type": "boolean",
      "default": false
    },
    {
      "id": "longText",
      "label": "超长文案",
      "type": "boolean",
      "default": false
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
      "id": "demoState",
      "label": "缺省类型",
      "type": "select",
      "default": "no-data",
      "options": [
        {
          "value": "no-data",
          "label": "暂无数据"
        },
        {
          "value": "no-results",
          "label": "搜索无结果"
        },
        {
          "value": "network-error",
          "label": "网络异常"
        },
        {
          "value": "load-failed",
          "label": "加载失败"
        },
        {
          "value": "forbidden",
          "label": "无权限"
        },
        {
          "value": "removed",
          "label": "内容已下架"
        },
        {
          "value": "expired",
          "label": "内容已失效"
        },
        {
          "value": "coming-soon",
          "label": "敬请期待"
        }
      ],
      "intent": "content-kind"
    },
    {
      "id": "level",
      "label": "空状态层级",
      "type": "select",
      "default": "card",
      "options": [
        {
          "value": "local",
          "label": "局部文字"
        },
        {
          "value": "card",
          "label": "卡片级"
        },
        {
          "value": "page",
          "label": "页面级"
        }
      ]
    },
    {
      "id": "size",
      "label": "插画尺寸",
      "type": "select",
      "default": "auto",
      "options": [
        {
          "value": "auto",
          "label": "随层级"
        },
        {
          "value": "small",
          "label": "小 64px"
        },
        {
          "value": "default",
          "label": "默认 120px"
        },
        {
          "value": "large",
          "label": "大 240px"
        }
      ]
    },
    {
      "id": "locale",
      "label": "语言",
      "type": "select",
      "default": "zh-CN",
      "options": [
        {
          "value": "zh-CN",
          "label": "简体中文"
        },
        {
          "value": "en-US",
          "label": "English"
        }
      ]
    },
    {
      "id": "showTitle",
      "label": "显示标题",
      "type": "boolean",
      "default": false,
      "when": {
        "level": [
          "card",
          "page"
        ]
      }
    },
    {
      "id": "showActions",
      "label": "显示操作按钮",
      "type": "boolean",
      "default": false,
      "when": {
        "level": [
          "card",
          "page"
        ]
      }
    },
    {
      "id": "secondary",
      "label": "次要按钮",
      "type": "boolean",
      "default": true,
      "when": {
        "level": [
          "card",
          "page"
        ],
        "showActions": [
          true
        ]
      }
    },
    {
      "id": "busy",
      "label": "操作处理中",
      "type": "boolean",
      "default": false
    },
    {
      "id": "longText",
      "label": "超长文案",
      "type": "boolean",
      "default": false
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
  "presets": [
    {
      "id": "demoState-no-data",
      "label": "演示状态 · 暂无数据",
      "controls": {
        "demoState": "no-data"
      }
    },
    {
      "id": "demoState-no-results",
      "label": "演示状态 · 搜索无结果",
      "controls": {
        "demoState": "no-results"
      }
    },
    {
      "id": "demoState-network-error",
      "label": "演示状态 · 网络异常",
      "controls": {
        "demoState": "network-error"
      }
    },
    {
      "id": "demoState-load-failed",
      "label": "演示状态 · 加载失败",
      "controls": {
        "demoState": "load-failed"
      }
    },
    {
      "id": "demoState-forbidden",
      "label": "演示状态 · 无权限",
      "controls": {
        "demoState": "forbidden"
      }
    },
    {
      "id": "demoState-removed",
      "label": "演示状态 · 内容已下架",
      "controls": {
        "demoState": "removed"
      }
    },
    {
      "id": "demoState-expired",
      "label": "演示状态 · 内容已失效",
      "controls": {
        "demoState": "expired"
      }
    },
    {
      "id": "demoState-coming-soon",
      "label": "演示状态 · 敬请期待",
      "controls": {
        "demoState": "coming-soon"
      }
    },
    {
      "id": "level-local",
      "label": "空状态层级 · 局部文字",
      "controls": {
        "level": "local"
      }
    },
    {
      "id": "level-card",
      "label": "空状态层级 · 卡片级",
      "controls": {
        "level": "card"
      }
    },
    {
      "id": "level-page",
      "label": "空状态层级 · 页面级",
      "controls": {
        "level": "page"
      }
    },
    {
      "id": "size-auto",
      "label": "插画尺寸 · 随层级",
      "controls": {
        "size": "auto"
      }
    },
    {
      "id": "size-small",
      "label": "插画尺寸 · 小 64px",
      "controls": {
        "size": "small"
      }
    },
    {
      "id": "size-default",
      "label": "插画尺寸 · 默认 120px",
      "controls": {
        "size": "default"
      }
    },
    {
      "id": "size-large",
      "label": "插画尺寸 · 大 240px",
      "controls": {
        "size": "large"
      }
    },
    {
      "id": "locale-zh-CN",
      "label": "语言 · 简体中文",
      "controls": {
        "locale": "zh-CN"
      }
    },
    {
      "id": "locale-en-US",
      "label": "语言 · English",
      "controls": {
        "locale": "en-US"
      }
    },
    {
      "id": "showTitle-true",
      "label": "显示标题 · 开启",
      "controls": {
        "showTitle": true,
        "level": "card"
      }
    },
    {
      "id": "showTitle-false",
      "label": "显示标题 · 关闭",
      "controls": {
        "showTitle": false,
        "level": "card"
      }
    },
    {
      "id": "showActions-true",
      "label": "显示操作按钮 · 开启",
      "controls": {
        "showActions": true,
        "level": "card"
      }
    },
    {
      "id": "showActions-false",
      "label": "显示操作按钮 · 关闭",
      "controls": {
        "showActions": false,
        "level": "card"
      }
    },
    {
      "id": "secondary-true",
      "label": "次要按钮 · 开启",
      "controls": {
        "secondary": true,
        "level": "card",
        "showActions": true
      }
    },
    {
      "id": "secondary-false",
      "label": "次要按钮 · 关闭",
      "controls": {
        "secondary": false,
        "level": "card",
        "showActions": true
      }
    },
    {
      "id": "busy-true",
      "label": "操作处理中 · 开启",
      "controls": {
        "busy": true
      }
    },
    {
      "id": "busy-false",
      "label": "操作处理中 · 关闭",
      "controls": {
        "busy": false
      }
    },
    {
      "id": "longText-true",
      "label": "超长文案 · 开启",
      "controls": {
        "longText": true
      }
    },
    {
      "id": "longText-false",
      "label": "超长文案 · 关闭",
      "controls": {
        "longText": false
      }
    }
  ]
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：空状态 Empty / EmptyState：局部信息、卡片或页面当前没有可展示内容；暂无数据、搜索无结果、网络异常、加载失败、无权限、内容已下架、内容已失效、敬请期待

**不适用**：请求仍在加载时应使用Loading或Skeleton；已有有效内容时不以空状态覆盖现有数据；未经生产接入验证作为生产交付

官方来源 SFC：unavailable。OFFICIAL_SFC_MISSING：No official usage SFC mentions this public asset. Scenario/story source was not substituted.

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-EMPTY-STATE-V1/empty-state?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| busy | Boolean | false |  | 禁用内建操作并暴露 aria-busy。 |
| description | String | {"kind":"undefined"} |  |  |
| level | String | card | local / card / page | local / card / page。 |
| live | String | off | off / polite |  |
| locale | String | zh-CN | zh-CN / en-US | zh-CN / en-US。 |
| primaryText | String |  |  |  |
| retry | Boolean | true |  |  |
| secondaryText | String |  |  |  |
| size | String | auto | auto / small / default / large | auto / small / default / large。 |
| title | String |  |  |  |
| type | String | no-data | no-data / no-results / network-error / load-failed / forbidden / removed / expired / coming-soon | 八类空状态语义。 |

### Events

- `retry`：type；点击内联重试入口。

- `primary`：MouseEvent；点击主操作。

- `secondary`：MouseEvent；点击次操作。

### Slots

- `illustration`：{ type, size }；替换卡片或页面插画。

- `title`：替换标题。

- `description`：{ type }；替换描述全文及内联操作。

- `actions`：{ size, busy }；替换操作区并管理忙碌态。

### 规则

### 层级与结构

id：`wb-empty-state-level` · must / confirmed

local只显示描述及错误内联重试；card与page可选插画、标题、说明、操作。组件不加外层padding或固定内容高度，由父容器负责空间和居中。

**适用条件**：使用空状态；empty state；EmptyState

### 独立原档插画

id：`wb-empty-state-native-illustration` · must / confirmed

复用WorkbenchEmptyIcon独立登记的24个SVG；按语义和64/120/240原档选择，不重绘、不改色、不以另一档缩放替代。auto在card取120、page取240；显式small/default/large取64/120/240。

**适用条件**：使用空状态；empty state；EmptyState

### 请求与忙碌边界

id：`wb-empty-state-request-boundary` · must / confirmed

加载中使用Loading或Skeleton；已有有效内容不被空状态覆盖。重试、创建、返回等业务由消费方处理；busy禁用内建重试及主次操作，自定义actions按插槽busy自行管理。

**适用条件**：使用空状态；empty state；EmptyState

### 默认文案与自定义

id：`wb-empty-state-content` · must / confirmed

8种语义提供中英文默认文案；network-error/load-failed默认末尾有可键盘访问的内联重试。description Prop或插槽替换整段默认内容，不再自动追加默认重试；local不显示按钮组。

**适用条件**：使用空状态；empty state；EmptyState

### 组件依赖

`wb-button`

### Foundation 引用

`color-text-primary`、`color-text-secondary`、`color-text-action`、`color-text-disabled`、`color-border-focus`、`font-body-s`、`font-body-m`、`font-headline-xs`、`font-headline-s`

### 层级与选型

local 仅展示描述；card 与 page 展示插画、可选标题及操作。加载过程使用 Loading 或 Skeleton。

### 语义、尺寸与语言

支持暂无数据、搜索无结果、网络异常、加载失败、无权限、已下架、已失效、即将上线。插画使用已登记的独立原始尺寸；locale 切换中英文。

### 操作与职责

网络异常和加载失败提供重试事件。busy 禁用内建操作；自定义 actions 插槽自行遵循 busy。请求、路由及恢复后的状态由调用方管理。
