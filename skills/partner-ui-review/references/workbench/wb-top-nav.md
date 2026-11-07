<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 顶部导航 Top Navigation — `WorkbenchTopNav`

资产：`wb-top-nav` · 类型：`component` · 资产合同版本：`1.0.2`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-TOP-NAV-V1/top-nav?view=preview)

组织站点切换、业务页签、搜索、通知与账户入口，适配桌面、折叠桌面和移动宽度。

公开入口：`@workbench/ui-vue3` → `WorkbenchTopNav`

## 变体与状态

状态：`unsupported`。声明值属于 Studio 案例数据，不自动等于公开组件 props。

[在 Studio 中查看](http://localhost:4173/preview/WB-TOP-NAV-V1/top-nav?view=variants)

unsupported：CUSTOM_VARIANT_GALLERY：A custom gallery or indirect scenario factory owns the rendered cases; manifest declarations are preserved, but are not claimed as an exhaustive portable gallery.

### 包内声明

```json
{
  "states": [
    {
      "id": "ready",
      "label": "默认"
    }
  ],
  "controls": [
    {
      "id": "navState",
      "label": "导航状态",
      "type": "select",
      "default": "workbench-authenticated",
      "options": [
        {
          "value": "portal-guest",
          "label": "门户官网 · 未登录"
        },
        {
          "value": "portal-authenticated",
          "label": "门户官网 · 已登录"
        },
        {
          "value": "workbench-authenticated",
          "label": "伙伴工作台 · 已登录"
        }
      ]
    },
    {
      "id": "actionPreset",
      "label": "右侧操作配置",
      "type": "select",
      "default": "default",
      "options": [
        {
          "value": "default",
          "label": "默认组合"
        },
        {
          "value": "full",
          "label": "完整工作台组合"
        },
        {
          "value": "pending",
          "label": "待认证账户组合"
        },
        {
          "value": "guest",
          "label": "门户登录注册组合"
        },
        {
          "value": "search",
          "label": "搜索"
        },
        {
          "value": "language",
          "label": "语言"
        },
        {
          "value": "login-register",
          "label": "登录注册图标"
        },
        {
          "value": "certified",
          "label": "已认证账户"
        },
        {
          "value": "favorite",
          "label": "收藏"
        },
        {
          "value": "help",
          "label": "帮助"
        },
        {
          "value": "message",
          "label": "消息"
        },
        {
          "value": "assistant",
          "label": "智能助手"
        },
        {
          "value": "menu",
          "label": "菜单"
        },
        {
          "value": "close",
          "label": "关闭"
        },
        {
          "value": "login",
          "label": "登录按钮"
        },
        {
          "value": "register",
          "label": "注册按钮"
        }
      ]
    },
    {
      "id": "actionsDisabled",
      "label": "禁用右侧操作",
      "type": "boolean",
      "default": false
    },
    {
      "id": "badgeValue",
      "label": "通知角标",
      "type": "select",
      "default": "9",
      "options": [
        {
          "value": "0",
          "label": "隐藏（0）"
        },
        {
          "value": "9",
          "label": "个位数（9）"
        },
        {
          "value": "99",
          "label": "两位数（99）"
        },
        {
          "value": "150",
          "label": "超限（150 / 99+）"
        },
        {
          "value": "dot",
          "label": "红点"
        }
      ]
    },
    {
      "id": "previewWidth",
      "label": "预览宽度",
      "description": "拖动查看顶部导航在不同断点下的响应效果。",
      "type": "range",
      "target": "viewport-width",
      "default": 1440,
      "min": 375,
      "max": 3000,
      "step": 1,
      "unit": "px",
      "marks": [
        375,
        768,
        1024,
        1440,
        1920,
        3000
      ]
    }
  ],
  "pilotControls": [
    {
      "id": "navState",
      "label": "导航身份与场景",
      "type": "select",
      "default": "workbench-authenticated",
      "options": [
        {
          "value": "portal-guest",
          "label": "门户官网 · 未登录"
        },
        {
          "value": "portal-authenticated",
          "label": "门户官网 · 已登录"
        },
        {
          "value": "workbench-authenticated",
          "label": "伙伴工作台 · 已登录"
        }
      ],
      "intent": "context"
    },
    {
      "id": "actionPreset",
      "label": "右侧操作配置",
      "type": "select",
      "default": "default",
      "options": [
        {
          "value": "default",
          "label": "默认组合"
        },
        {
          "value": "full",
          "label": "完整工作台组合"
        },
        {
          "value": "pending",
          "label": "待认证账户组合"
        },
        {
          "value": "guest",
          "label": "门户登录注册组合"
        },
        {
          "value": "search",
          "label": "搜索"
        },
        {
          "value": "language",
          "label": "语言"
        },
        {
          "value": "login-register",
          "label": "登录注册图标"
        },
        {
          "value": "certified",
          "label": "已认证账户"
        },
        {
          "value": "favorite",
          "label": "收藏"
        },
        {
          "value": "help",
          "label": "帮助"
        },
        {
          "value": "message",
          "label": "消息"
        },
        {
          "value": "assistant",
          "label": "智能助手"
        },
        {
          "value": "menu",
          "label": "菜单"
        },
        {
          "value": "close",
          "label": "关闭"
        },
        {
          "value": "login",
          "label": "登录按钮"
        },
        {
          "value": "register",
          "label": "注册按钮"
        }
      ]
    },
    {
      "id": "actionsDisabled",
      "label": "禁用右侧操作",
      "type": "boolean",
      "default": false
    },
    {
      "id": "badgeValue",
      "label": "通知角标",
      "type": "select",
      "default": "9",
      "options": [
        {
          "value": "0",
          "label": "隐藏（0）"
        },
        {
          "value": "9",
          "label": "个位数（9）"
        },
        {
          "value": "99",
          "label": "两位数（99）"
        },
        {
          "value": "150",
          "label": "超限（150 / 99+）"
        },
        {
          "value": "dot",
          "label": "红点"
        }
      ]
    },
    {
      "id": "previewWidth",
      "label": "预览宽度",
      "description": "拖动查看顶部导航在不同断点下的响应效果。",
      "type": "range",
      "target": "viewport-width",
      "default": 1440,
      "min": 375,
      "max": 3000,
      "step": 1,
      "unit": "px",
      "marks": [
        375,
        768,
        1024,
        1440,
        1920,
        3000
      ]
    }
  ],
  "presets": [
    {
      "id": "navState-portal-guest",
      "label": "导航状态 · 门户官网 · 未登录",
      "controls": {
        "navState": "portal-guest"
      }
    },
    {
      "id": "navState-portal-authenticated",
      "label": "导航状态 · 门户官网 · 已登录",
      "controls": {
        "navState": "portal-authenticated"
      }
    },
    {
      "id": "navState-workbench-authenticated",
      "label": "导航状态 · 伙伴工作台 · 已登录",
      "controls": {
        "navState": "workbench-authenticated"
      }
    },
    {
      "id": "actionPreset-default",
      "label": "右侧操作配置 · 默认组合",
      "controls": {
        "actionPreset": "default"
      }
    },
    {
      "id": "actionPreset-full",
      "label": "右侧操作配置 · 完整工作台组合",
      "controls": {
        "actionPreset": "full"
      }
    },
    {
      "id": "actionPreset-pending",
      "label": "右侧操作配置 · 待认证账户组合",
      "controls": {
        "actionPreset": "pending"
      }
    },
    {
      "id": "actionPreset-guest",
      "label": "右侧操作配置 · 门户登录注册组合",
      "controls": {
        "actionPreset": "guest"
      }
    },
    {
      "id": "actionPreset-search",
      "label": "右侧操作配置 · 搜索",
      "controls": {
        "actionPreset": "search"
      }
    },
    {
      "id": "actionPreset-language",
      "label": "右侧操作配置 · 语言",
      "controls": {
        "actionPreset": "language"
      }
    },
    {
      "id": "actionPreset-login-register",
      "label": "右侧操作配置 · 登录注册图标",
      "controls": {
        "actionPreset": "login-register"
      }
    },
    {
      "id": "actionPreset-certified",
      "label": "右侧操作配置 · 已认证账户",
      "controls": {
        "actionPreset": "certified"
      }
    },
    {
      "id": "actionPreset-favorite",
      "label": "右侧操作配置 · 收藏",
      "controls": {
        "actionPreset": "favorite"
      }
    },
    {
      "id": "actionPreset-help",
      "label": "右侧操作配置 · 帮助",
      "controls": {
        "actionPreset": "help"
      }
    },
    {
      "id": "actionPreset-message",
      "label": "右侧操作配置 · 消息",
      "controls": {
        "actionPreset": "message"
      }
    },
    {
      "id": "actionPreset-assistant",
      "label": "右侧操作配置 · 智能助手",
      "controls": {
        "actionPreset": "assistant"
      }
    },
    {
      "id": "actionPreset-menu",
      "label": "右侧操作配置 · 菜单",
      "controls": {
        "actionPreset": "menu"
      }
    },
    {
      "id": "actionPreset-close",
      "label": "右侧操作配置 · 关闭",
      "controls": {
        "actionPreset": "close"
      }
    },
    {
      "id": "actionPreset-login",
      "label": "右侧操作配置 · 登录按钮",
      "controls": {
        "actionPreset": "login"
      }
    },
    {
      "id": "actionPreset-register",
      "label": "右侧操作配置 · 注册按钮",
      "controls": {
        "actionPreset": "register"
      }
    },
    {
      "id": "actionsDisabled-true",
      "label": "禁用右侧操作 · 开启",
      "controls": {
        "actionsDisabled": true
      }
    },
    {
      "id": "actionsDisabled-false",
      "label": "禁用右侧操作 · 关闭",
      "controls": {
        "actionsDisabled": false
      }
    },
    {
      "id": "badgeValue-0",
      "label": "通知角标 · 隐藏（0）",
      "controls": {
        "badgeValue": "0"
      }
    },
    {
      "id": "badgeValue-9",
      "label": "通知角标 · 个位数（9）",
      "controls": {
        "badgeValue": "9"
      }
    },
    {
      "id": "badgeValue-99",
      "label": "通知角标 · 两位数（99）",
      "controls": {
        "badgeValue": "99"
      }
    },
    {
      "id": "badgeValue-150",
      "label": "通知角标 · 超限（150 / 99+）",
      "controls": {
        "badgeValue": "150"
      }
    },
    {
      "id": "badgeValue-dot",
      "label": "通知角标 · 红点",
      "controls": {
        "badgeValue": "dot"
      }
    }
  ]
}
```

### 定制画廊来源清单（unsupported）

```json
{
  "literalData": {
    "states": [
      {
        "id": "portal-guest",
        "label": "门户 · 未登录"
      },
      {
        "id": "portal-authenticated",
        "label": "门户 · 已登录"
      },
      {
        "id": "workbench-authenticated",
        "label": "工作台 · 已登录"
      }
    ]
  },
  "dynamicBindings": [
    "samples",
    "action",
    "badge"
  ],
  "explicitCaseIds": [
    "'navState-' + item.id"
  ],
  "loopExpressions": [
    "item in samples"
  ]
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：需要站点、业务页签、全局检索和账户入口的页首导航。

**不适用**：局部卡片或页面内分段导航；使用 Tabs。

官方来源 SFC：supported。

### 示例：站点与页签导航

id：`site-navigation` · portability：`portable` · owner：`wb-top-nav`

完整的受控导航值由调用方持有；链接由浏览器自然导航。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { ref } from "vue"
import { WorkbenchTopNav } from "@workbench/ui-vue3"
const activeTab = ref('overview')
const currentSite = ref('partner')
const tabs = [{ value: 'overview', label: '总览', href: '/overview' }]
const sites = [{ value: 'partner', label: '伙伴中心' }]
function selectSite(value) { currentSite.value = value }
</script>
<template>
  <WorkbenchTopNav v-model:active-tab="activeTab" :current-site="currentSite" :tabs="tabs" :sites="sites" @select-site="selectSite" />
</template>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-TOP-NAV-V1/top-nav?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| actions | Array | null |  | 自定义顶部操作项。 |
| activeTab | String | home |  | 受控当前业务页签。 |
| currentLanguage | String | zh-CN |  | 受控当前语言value。 |
| currentSite | String | partner |  | 受控当前站点value。 |
| languages | Array | {"kind":"function"} |  | 语言菜单项。 |
| mode | String | workbench | portal / workbench | workbench或portal导航模式。 |
| sites | Array | {"kind":"function"} |  | 站点选项数组，支持value、label与可选href。 |
| tabMenus | Object | {"kind":"function"} |  | 按tab value映射的分组入口菜单。 |
| tabs | Array | {"kind":"function"} |  | 页签项数组，支持value、label与可选href。 |
| userMenuItems | Array | {"kind":"function"} |  | 账户菜单动作项。 |
| userState | String | authenticated | guest / authenticated | authenticated或guest账户呈现状态。 |

### Events

- `update:activeTab`：新的页签value。；用户选择业务页签后发出。

- `select-site`：站点value。；用户选择站点后发出。

- `select-language`：语言value。；用户选择语言后发出。

- `select-user-action`：账户动作value。；用户选择账户菜单项后发出。

- `select-tab-entry`：{ tab, value }。；用户选择分组页签菜单项后发出。

- `navigate`：导航上下文，包含kind、value及可能的href。；用户激活导航入口时通知；href锚点仍由浏览器处理。

- `search`：无参数；组件不在该事件中提交查询文本。；用户提交顶部搜索后发出。

- `notification`：无。；用户激活通知入口后发出。

- `login`：无。；访客激活登录入口后发出。

- `register`：无。；访客激活注册入口后发出。

- `action`：{ type, id, pressed }；pressed仅favorite动作提供当前布尔状态，其他动作该值为undefined。；用户激活自定义动作时发出。

### 规则

### 真实导航与旁路事件

id：`wb-top-nav-navigation` · must / confirmed

tabs、sites 与 tabMenus 条目的 href 为可选真实地址。提供 href 时渲染 a 并保留浏览器默认导航，同时发出 navigate({kind,value,href,...})；未提供 href 时保留受控选择事件。

**适用条件**：导航项带 href

### 披露与动作边界

id：`wb-top-nav-disclosure` · must / confirmed

站点、语言、账户、搜索、通知及移动菜单入口使用 button；它们仅披露面板或发出动作事件，不承担页面导航。

**适用条件**：使用顶部导航

### 人工批准的导航字体例外

id：`wb-top-nav-typography-exceptions` · must / confirmed

品牌标题和移动菜单标题以 font-headline-m（18/500/0em）为基准，并保留本资产 brand-title-line-height=28px；Mega 大标题以 font-display-s（500/0em）为基准，并保留本资产 mega-heading-font-size=32px、mega-heading-line-height=48px。子业务标题完整使用 font-headline-s（16/24/500/0em）。

**适用条件**：渲染顶部导航标题

### Top Navigation普通与Mega菜单圆角

id：`wb-top-nav-menu-radius-20261025` · must / confirmed

Top Navigation普通菜单主体与Mega菜单主体统一使用Foundation radius-md（6px）；站点切换面板及站点条目保持原值，菜单触发器保持原值。

**适用条件**：显示Top Navigation语言、账户、更多或Mega菜单

### 组件依赖

`wb-avatar`

### Foundation 引用

`color-brand`、`color-fill-default`、`color-fill-hover`、`color-fill-subtle-default`、`color-text-primary`、`color-text-secondary`、`color-text-inverse`、`color-icon-primary`、`color-icon-secondary`、`color-icon-hover`、`color-border`、`color-border-focus`、`color-border-separator`、`color-border-separator-subtle`、`color-surface-overlay`、`color-scrim-modal`、`color-error`、`spacing-component-xs`、`spacing-component-sm`、`spacing-component-md`、`spacing-component-lg`、`spacing-layout-section-gap-large`、`spacing-screen-edge-compact`、`spacing-screen-edge-expanded`、`radius-full`、`radius-lg`、`radius-sm`、`radius-md`、`shadow-sm`、`font-body-s`、`font-body-m`、`font-body-l`、`icon-size-12`、`icon-size-16`、`icon-size-20`、`icon-size-24`、`icon-size-48`、`font-headline-m`、`font-headline-s`、`font-display-s`、`layout-grid-max-width`、`layout-grid-columns-medium`、`layout-grid-columns-wide`

### 选型

用于应用或门户级全局导航；局部页面内导航应使用对应的侧边导航或页签组件。

- mode选择workbench或portal导航模式；userState区分authenticated与guest。

- 需要菜单分组时使用tabMenus，站点与语言菜单独立配置。

### 设计结构与排版

tabs、sites及languages以value和label描述；tabs/sites可带href成为真实锚点。

- 有href时保留浏览器原生导航，不由组件拦截。

- actions可自定义操作入口；账户、搜索与通知的动作交给消费方处理。

### 交互与键盘

菜单入口负责披露或触发动作；链接仍遵循原生Enter导航。

- 方向键、Escape与焦点恢复用于菜单披露，不改变链接默认行为。

- activeTab、currentSite和currentLanguage为受控当前值，需响应对应更新或选择事件。

### 使用边界与职责

TopNav提供导航结构，不负责页面路由实现、账户认证、搜索服务或通知数据。

- href应使用宿主应用可访问的目标地址；navigate事件适合旁路监听或埋点。

- 头像账户入口复用WorkbenchAvatar；生产资格仍需按资产交付边界确认。

### 包内关联引用

```json
[
  {
    "label": "顶部导航规范",
    "href": "#rules"
  }
]
```
