<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261031.1 (1255ff9747cef05c6558318547e69acbbf71b928) — do not edit. -->

# 搜索 Search — `WorkbenchSearch`

资产：`wb-search` · 类型：`component` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261031.1` · commit：`1255ff9747cef05c6558318547e69acbbf71b928` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-SEARCH-V1/search?view=preview)

用于提交文本搜索，可组合单侧或双侧单选筛选。搜索文本即时受控；是否执行查询由search事件触发。

公开入口：`@workbench/ui-vue3` → `WorkbenchSearch`

## 变体与状态

状态：`supported`。Studio controls, not public component props

[在 Studio 中查看](http://localhost:4173/preview/WB-SEARCH-V1/search?view=variants)

| 分组 | 案例 | id | Studio |
| --- | --- | --- | --- |
| 搜索类型 | 基础搜索 | searchType-basic | [案例](http://localhost:4173/preview/WB-SEARCH-V1/search?view=variants) |
| 搜索类型 | 全局搜索 | searchType-global | [案例](http://localhost:4173/preview/WB-SEARCH-V1/search?view=variants) |
| 搜索类型 | 前缀筛选 | searchType-filter-prefix | [案例](http://localhost:4173/preview/WB-SEARCH-V1/search?view=variants) |
| 搜索类型 | 后缀筛选 | searchType-filter-suffix | [案例](http://localhost:4173/preview/WB-SEARCH-V1/search?view=variants) |
| 搜索类型 | 前后缀筛选 | searchType-filter-both | [案例](http://localhost:4173/preview/WB-SEARCH-V1/search?view=variants) |
| 组件状态 | 默认 | demoState-default | [案例](http://localhost:4173/preview/WB-SEARCH-V1/search?view=variants) |
| 组件状态 | 悬浮 | demoState-hover | [案例](http://localhost:4173/preview/WB-SEARCH-V1/search?view=variants) |
| 组件状态 | 聚焦 | demoState-focus | [案例](http://localhost:4173/preview/WB-SEARCH-V1/search?view=variants) |
| 组件状态 | 已输入 | demoState-filled | [案例](http://localhost:4173/preview/WB-SEARCH-V1/search?view=variants) |
| 组件状态 | 展开 | demoState-open | [案例](http://localhost:4173/preview/WB-SEARCH-V1/search?view=variants) |
| 组件状态 | 禁用 | demoState-disabled | [案例](http://localhost:4173/preview/WB-SEARCH-V1/search?view=variants) |
| 搜索框样式 | 描边型 | variant-outlined | [案例](http://localhost:4173/preview/WB-SEARCH-V1/search?view=variants) |
| 搜索框样式 | 填充型 | variant-filled | [案例](http://localhost:4173/preview/WB-SEARCH-V1/search?view=variants) |
| 搜索图标位置 | 左侧 | searchIconPosition-left | [案例](http://localhost:4173/preview/WB-SEARCH-V1/search?view=variants) |
| 搜索图标位置 | 右侧 | searchIconPosition-right | [案例](http://localhost:4173/preview/WB-SEARCH-V1/search?view=variants) |
| 显示栅格 | 关闭 | showGrid-false | [案例](http://localhost:4173/preview/WB-SEARCH-V1/search?view=variants) |
| 显示栅格 | 开启 | showGrid-true | [案例](http://localhost:4173/preview/WB-SEARCH-V1/search?view=variants) |
| 显示前缀图标 | 关闭 | showPrefixIcon-false | [案例](http://localhost:4173/preview/WB-SEARCH-V1/search?view=variants) |
| 显示前缀图标 | 开启 | showPrefixIcon-true | [案例](http://localhost:4173/preview/WB-SEARCH-V1/search?view=variants) |
| 显示后缀图标 | 关闭 | showSuffixIcon-false | [案例](http://localhost:4173/preview/WB-SEARCH-V1/search?view=variants) |
| 显示后缀图标 | 开启 | showSuffixIcon-true | [案例](http://localhost:4173/preview/WB-SEARCH-V1/search?view=variants) |
| 禁用前缀筛选 | 关闭 | prefixDisabled-false | [案例](http://localhost:4173/preview/WB-SEARCH-V1/search?view=variants) |
| 禁用前缀筛选 | 开启 | prefixDisabled-true | [案例](http://localhost:4173/preview/WB-SEARCH-V1/search?view=variants) |
| 禁用后缀筛选 | 关闭 | suffixDisabled-false | [案例](http://localhost:4173/preview/WB-SEARCH-V1/search?view=variants) |
| 禁用后缀筛选 | 开启 | suffixDisabled-true | [案例](http://localhost:4173/preview/WB-SEARCH-V1/search?view=variants) |

### Studio 案例值（不是 props 映射）

```json
[
  {
    "id": "searchType-basic",
    "group": "搜索类型",
    "label": "基础搜索",
    "controls": {
      "searchType": "basic",
      "demoState": "default",
      "variant": "outlined",
      "searchIconPosition": "left",
      "showGrid": false,
      "showPrefixIcon": true,
      "showSuffixIcon": true,
      "prefixDisabled": false,
      "suffixDisabled": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-SEARCH-V1/search?view=variants"
  },
  {
    "id": "searchType-global",
    "group": "搜索类型",
    "label": "全局搜索",
    "controls": {
      "searchType": "global",
      "demoState": "default",
      "variant": "outlined",
      "searchIconPosition": "left",
      "showGrid": false,
      "showPrefixIcon": true,
      "showSuffixIcon": true,
      "prefixDisabled": false,
      "suffixDisabled": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-SEARCH-V1/search?view=variants"
  },
  {
    "id": "searchType-filter-prefix",
    "group": "搜索类型",
    "label": "前缀筛选",
    "controls": {
      "searchType": "filter-prefix",
      "demoState": "default",
      "variant": "outlined",
      "searchIconPosition": "left",
      "showGrid": false,
      "showPrefixIcon": true,
      "showSuffixIcon": true,
      "prefixDisabled": false,
      "suffixDisabled": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-SEARCH-V1/search?view=variants"
  },
  {
    "id": "searchType-filter-suffix",
    "group": "搜索类型",
    "label": "后缀筛选",
    "controls": {
      "searchType": "filter-suffix",
      "demoState": "default",
      "variant": "outlined",
      "searchIconPosition": "left",
      "showGrid": false,
      "showPrefixIcon": true,
      "showSuffixIcon": true,
      "prefixDisabled": false,
      "suffixDisabled": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-SEARCH-V1/search?view=variants"
  },
  {
    "id": "searchType-filter-both",
    "group": "搜索类型",
    "label": "前后缀筛选",
    "controls": {
      "searchType": "filter-both",
      "demoState": "default",
      "variant": "outlined",
      "searchIconPosition": "left",
      "showGrid": false,
      "showPrefixIcon": true,
      "showSuffixIcon": true,
      "prefixDisabled": false,
      "suffixDisabled": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-SEARCH-V1/search?view=variants"
  },
  {
    "id": "demoState-default",
    "group": "组件状态",
    "label": "默认",
    "controls": {
      "searchType": "basic",
      "demoState": "default",
      "variant": "outlined",
      "searchIconPosition": "left",
      "showGrid": false,
      "showPrefixIcon": true,
      "showSuffixIcon": true,
      "prefixDisabled": false,
      "suffixDisabled": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-SEARCH-V1/search?view=variants"
  },
  {
    "id": "demoState-hover",
    "group": "组件状态",
    "label": "悬浮",
    "controls": {
      "searchType": "basic",
      "demoState": "hover",
      "variant": "outlined",
      "searchIconPosition": "left",
      "showGrid": false,
      "showPrefixIcon": true,
      "showSuffixIcon": true,
      "prefixDisabled": false,
      "suffixDisabled": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-SEARCH-V1/search?view=variants"
  },
  {
    "id": "demoState-focus",
    "group": "组件状态",
    "label": "聚焦",
    "controls": {
      "searchType": "basic",
      "demoState": "focus",
      "variant": "outlined",
      "searchIconPosition": "left",
      "showGrid": false,
      "showPrefixIcon": true,
      "showSuffixIcon": true,
      "prefixDisabled": false,
      "suffixDisabled": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-SEARCH-V1/search?view=variants"
  },
  {
    "id": "demoState-filled",
    "group": "组件状态",
    "label": "已输入",
    "controls": {
      "searchType": "basic",
      "demoState": "filled",
      "variant": "outlined",
      "searchIconPosition": "left",
      "showGrid": false,
      "showPrefixIcon": true,
      "showSuffixIcon": true,
      "prefixDisabled": false,
      "suffixDisabled": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-SEARCH-V1/search?view=variants"
  },
  {
    "id": "demoState-open",
    "group": "组件状态",
    "label": "展开",
    "controls": {
      "searchType": "basic",
      "demoState": "open",
      "variant": "outlined",
      "searchIconPosition": "left",
      "showGrid": false,
      "showPrefixIcon": true,
      "showSuffixIcon": true,
      "prefixDisabled": false,
      "suffixDisabled": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-SEARCH-V1/search?view=variants"
  },
  {
    "id": "demoState-disabled",
    "group": "组件状态",
    "label": "禁用",
    "controls": {
      "searchType": "basic",
      "demoState": "disabled",
      "variant": "outlined",
      "searchIconPosition": "left",
      "showGrid": false,
      "showPrefixIcon": true,
      "showSuffixIcon": true,
      "prefixDisabled": false,
      "suffixDisabled": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-SEARCH-V1/search?view=variants"
  },
  {
    "id": "variant-outlined",
    "group": "搜索框样式",
    "label": "描边型",
    "controls": {
      "searchType": "basic",
      "demoState": "default",
      "variant": "outlined",
      "searchIconPosition": "left",
      "showGrid": false,
      "showPrefixIcon": true,
      "showSuffixIcon": true,
      "prefixDisabled": false,
      "suffixDisabled": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-SEARCH-V1/search?view=variants"
  },
  {
    "id": "variant-filled",
    "group": "搜索框样式",
    "label": "填充型",
    "controls": {
      "searchType": "basic",
      "demoState": "default",
      "variant": "filled",
      "searchIconPosition": "left",
      "showGrid": false,
      "showPrefixIcon": true,
      "showSuffixIcon": true,
      "prefixDisabled": false,
      "suffixDisabled": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-SEARCH-V1/search?view=variants"
  },
  {
    "id": "searchIconPosition-left",
    "group": "搜索图标位置",
    "label": "左侧",
    "controls": {
      "searchType": "basic",
      "demoState": "default",
      "variant": "outlined",
      "searchIconPosition": "left",
      "showGrid": false,
      "showPrefixIcon": true,
      "showSuffixIcon": true,
      "prefixDisabled": false,
      "suffixDisabled": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-SEARCH-V1/search?view=variants"
  },
  {
    "id": "searchIconPosition-right",
    "group": "搜索图标位置",
    "label": "右侧",
    "controls": {
      "searchType": "basic",
      "demoState": "default",
      "variant": "outlined",
      "searchIconPosition": "right",
      "showGrid": false,
      "showPrefixIcon": true,
      "showSuffixIcon": true,
      "prefixDisabled": false,
      "suffixDisabled": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-SEARCH-V1/search?view=variants"
  },
  {
    "id": "showGrid-false",
    "group": "显示栅格",
    "label": "关闭",
    "controls": {
      "searchType": "basic",
      "demoState": "default",
      "variant": "outlined",
      "searchIconPosition": "left",
      "showGrid": false,
      "showPrefixIcon": true,
      "showSuffixIcon": true,
      "prefixDisabled": false,
      "suffixDisabled": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-SEARCH-V1/search?view=variants"
  },
  {
    "id": "showGrid-true",
    "group": "显示栅格",
    "label": "开启",
    "controls": {
      "searchType": "basic",
      "demoState": "default",
      "variant": "outlined",
      "searchIconPosition": "left",
      "showGrid": true,
      "showPrefixIcon": true,
      "showSuffixIcon": true,
      "prefixDisabled": false,
      "suffixDisabled": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-SEARCH-V1/search?view=variants"
  },
  {
    "id": "showPrefixIcon-false",
    "group": "显示前缀图标",
    "label": "关闭",
    "controls": {
      "searchType": "filter-prefix",
      "demoState": "default",
      "variant": "outlined",
      "searchIconPosition": "left",
      "showGrid": false,
      "showPrefixIcon": false,
      "showSuffixIcon": true,
      "prefixDisabled": false,
      "suffixDisabled": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-SEARCH-V1/search?view=variants"
  },
  {
    "id": "showPrefixIcon-true",
    "group": "显示前缀图标",
    "label": "开启",
    "controls": {
      "searchType": "filter-prefix",
      "demoState": "default",
      "variant": "outlined",
      "searchIconPosition": "left",
      "showGrid": false,
      "showPrefixIcon": true,
      "showSuffixIcon": true,
      "prefixDisabled": false,
      "suffixDisabled": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-SEARCH-V1/search?view=variants"
  },
  {
    "id": "showSuffixIcon-false",
    "group": "显示后缀图标",
    "label": "关闭",
    "controls": {
      "searchType": "filter-suffix",
      "demoState": "default",
      "variant": "outlined",
      "searchIconPosition": "left",
      "showGrid": false,
      "showPrefixIcon": true,
      "showSuffixIcon": false,
      "prefixDisabled": false,
      "suffixDisabled": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-SEARCH-V1/search?view=variants"
  },
  {
    "id": "showSuffixIcon-true",
    "group": "显示后缀图标",
    "label": "开启",
    "controls": {
      "searchType": "filter-suffix",
      "demoState": "default",
      "variant": "outlined",
      "searchIconPosition": "left",
      "showGrid": false,
      "showPrefixIcon": true,
      "showSuffixIcon": true,
      "prefixDisabled": false,
      "suffixDisabled": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-SEARCH-V1/search?view=variants"
  },
  {
    "id": "prefixDisabled-false",
    "group": "禁用前缀筛选",
    "label": "关闭",
    "controls": {
      "searchType": "filter-prefix",
      "demoState": "default",
      "variant": "outlined",
      "searchIconPosition": "left",
      "showGrid": false,
      "showPrefixIcon": true,
      "showSuffixIcon": true,
      "prefixDisabled": false,
      "suffixDisabled": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-SEARCH-V1/search?view=variants"
  },
  {
    "id": "prefixDisabled-true",
    "group": "禁用前缀筛选",
    "label": "开启",
    "controls": {
      "searchType": "filter-prefix",
      "demoState": "default",
      "variant": "outlined",
      "searchIconPosition": "left",
      "showGrid": false,
      "showPrefixIcon": true,
      "showSuffixIcon": true,
      "prefixDisabled": true,
      "suffixDisabled": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-SEARCH-V1/search?view=variants"
  },
  {
    "id": "suffixDisabled-false",
    "group": "禁用后缀筛选",
    "label": "关闭",
    "controls": {
      "searchType": "filter-suffix",
      "demoState": "default",
      "variant": "outlined",
      "searchIconPosition": "left",
      "showGrid": false,
      "showPrefixIcon": true,
      "showSuffixIcon": true,
      "prefixDisabled": false,
      "suffixDisabled": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-SEARCH-V1/search?view=variants"
  },
  {
    "id": "suffixDisabled-true",
    "group": "禁用后缀筛选",
    "label": "开启",
    "controls": {
      "searchType": "filter-suffix",
      "demoState": "default",
      "variant": "outlined",
      "searchIconPosition": "left",
      "showGrid": false,
      "showPrefixIcon": true,
      "showSuffixIcon": true,
      "prefixDisabled": false,
      "suffixDisabled": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-SEARCH-V1/search?view=variants"
  }
]
```

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
    },
    {
      "id": "filled",
      "label": "已输入"
    },
    {
      "id": "open",
      "label": "展开"
    },
    {
      "id": "disabled",
      "label": "禁用"
    }
  ],
  "controls": [
    {
      "id": "variant",
      "label": "搜索框样式",
      "description": "切换描边型与填充型，保留尺寸、栅格和图标配置",
      "type": "select",
      "default": "outlined",
      "options": [
        {
          "value": "outlined",
          "label": "描边型"
        },
        {
          "value": "filled",
          "label": "填充型"
        }
      ]
    },
    {
      "id": "searchIconPosition",
      "label": "搜索图标位置",
      "description": "切换基础搜索及筛选搜索中的核心搜索图标位置",
      "type": "select",
      "default": "left",
      "options": [
        {
          "value": "left",
          "label": "左侧"
        },
        {
          "value": "right",
          "label": "右侧"
        }
      ]
    },
    {
      "id": "showGrid",
      "label": "显示栅格",
      "description": "显示统一栅格辅助层，检查默认跨度与窄轨道自动增跨",
      "type": "boolean",
      "default": false
    },
    {
      "id": "showPrefixIcon",
      "label": "显示前缀图标",
      "description": "控制筛选文字左侧的图标，关闭后收起图标间距",
      "type": "boolean",
      "default": true
    },
    {
      "id": "showSuffixIcon",
      "label": "显示后缀图标",
      "description": "独立控制后缀筛选文字左侧的图标",
      "type": "boolean",
      "default": true
    },
    {
      "id": "prefixDisabled",
      "label": "禁用前缀筛选",
      "description": "仅禁用该侧筛选，保留已选值，搜索输入和另一侧可用",
      "type": "boolean",
      "default": false
    },
    {
      "id": "suffixDisabled",
      "label": "禁用后缀筛选",
      "description": "仅禁用该侧筛选，保留已选值，搜索输入和另一侧可用",
      "type": "boolean",
      "default": false
    }
  ],
  "pilotControls": [
    {
      "id": "searchType",
      "label": "搜索类型",
      "type": "select",
      "default": "basic",
      "options": [
        {
          "value": "basic",
          "label": "基础搜索"
        },
        {
          "value": "global",
          "label": "全局搜索"
        },
        {
          "value": "filter-prefix",
          "label": "前缀筛选"
        },
        {
          "value": "filter-suffix",
          "label": "后缀筛选"
        },
        {
          "value": "filter-both",
          "label": "前后缀筛选"
        }
      ]
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
          "value": "focus",
          "label": "聚焦"
        },
        {
          "value": "filled",
          "label": "已输入"
        },
        {
          "value": "open",
          "label": "展开"
        },
        {
          "value": "disabled",
          "label": "禁用"
        }
      ],
      "intent": "state",
      "presentation": "state-buttons"
    },
    {
      "id": "variant",
      "label": "搜索框样式",
      "description": "切换描边型与填充型，保留尺寸、栅格和图标配置",
      "type": "select",
      "default": "outlined",
      "options": [
        {
          "value": "outlined",
          "label": "描边型"
        },
        {
          "value": "filled",
          "label": "填充型"
        }
      ]
    },
    {
      "id": "searchIconPosition",
      "label": "搜索图标位置",
      "description": "切换基础搜索及筛选搜索中的核心搜索图标位置",
      "type": "select",
      "default": "left",
      "options": [
        {
          "value": "left",
          "label": "左侧"
        },
        {
          "value": "right",
          "label": "右侧"
        }
      ]
    },
    {
      "id": "showGrid",
      "label": "显示栅格",
      "description": "显示统一栅格辅助层，检查默认跨度与窄轨道自动增跨",
      "type": "boolean",
      "default": false
    },
    {
      "id": "showPrefixIcon",
      "label": "显示前缀图标",
      "description": "控制筛选文字左侧的图标，关闭后收起图标间距",
      "type": "boolean",
      "default": true,
      "when": {
        "searchType": [
          "filter-prefix",
          "filter-both"
        ]
      }
    },
    {
      "id": "showSuffixIcon",
      "label": "显示后缀图标",
      "description": "独立控制后缀筛选文字左侧的图标",
      "type": "boolean",
      "default": true,
      "when": {
        "searchType": [
          "filter-suffix",
          "filter-both"
        ]
      }
    },
    {
      "id": "prefixDisabled",
      "label": "禁用前缀筛选",
      "description": "仅禁用该侧筛选，保留已选值，搜索输入和另一侧可用",
      "type": "boolean",
      "default": false,
      "when": {
        "searchType": [
          "filter-prefix",
          "filter-both"
        ]
      }
    },
    {
      "id": "suffixDisabled",
      "label": "禁用后缀筛选",
      "description": "仅禁用该侧筛选，保留已选值，搜索输入和另一侧可用",
      "type": "boolean",
      "default": false,
      "when": {
        "searchType": [
          "filter-suffix",
          "filter-both"
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
    }
  ],
  "presets": [
    {
      "id": "searchType-basic",
      "label": "搜索类型 · 基础搜索",
      "controls": {
        "searchType": "basic"
      }
    },
    {
      "id": "searchType-global",
      "label": "搜索类型 · 全局搜索",
      "controls": {
        "searchType": "global"
      }
    },
    {
      "id": "searchType-filter-prefix",
      "label": "搜索类型 · 前缀筛选",
      "controls": {
        "searchType": "filter-prefix"
      }
    },
    {
      "id": "searchType-filter-suffix",
      "label": "搜索类型 · 后缀筛选",
      "controls": {
        "searchType": "filter-suffix"
      }
    },
    {
      "id": "searchType-filter-both",
      "label": "搜索类型 · 前后缀筛选",
      "controls": {
        "searchType": "filter-both"
      }
    },
    {
      "id": "demoState-default",
      "label": "演示状态 · 默认",
      "controls": {
        "demoState": "default"
      }
    },
    {
      "id": "demoState-hover",
      "label": "演示状态 · 悬浮",
      "controls": {
        "demoState": "hover"
      }
    },
    {
      "id": "demoState-focus",
      "label": "演示状态 · 聚焦",
      "controls": {
        "demoState": "focus"
      }
    },
    {
      "id": "demoState-filled",
      "label": "演示状态 · 已输入",
      "controls": {
        "demoState": "filled"
      }
    },
    {
      "id": "demoState-open",
      "label": "演示状态 · 展开",
      "controls": {
        "demoState": "open"
      }
    },
    {
      "id": "demoState-disabled",
      "label": "演示状态 · 禁用",
      "controls": {
        "demoState": "disabled"
      }
    },
    {
      "id": "variant-outlined",
      "label": "搜索框样式 · 描边型",
      "controls": {
        "variant": "outlined"
      }
    },
    {
      "id": "variant-filled",
      "label": "搜索框样式 · 填充型",
      "controls": {
        "variant": "filled"
      }
    },
    {
      "id": "searchIconPosition-left",
      "label": "搜索图标位置 · 左侧",
      "controls": {
        "searchIconPosition": "left"
      }
    },
    {
      "id": "searchIconPosition-right",
      "label": "搜索图标位置 · 右侧",
      "controls": {
        "searchIconPosition": "right"
      }
    },
    {
      "id": "showGrid-true",
      "label": "显示栅格 · 开启",
      "controls": {
        "showGrid": true
      }
    },
    {
      "id": "showGrid-false",
      "label": "显示栅格 · 关闭",
      "controls": {
        "showGrid": false
      }
    },
    {
      "id": "showPrefixIcon-true",
      "label": "显示前缀图标 · 开启",
      "controls": {
        "showPrefixIcon": true,
        "searchType": "filter-prefix"
      }
    },
    {
      "id": "showPrefixIcon-false",
      "label": "显示前缀图标 · 关闭",
      "controls": {
        "showPrefixIcon": false,
        "searchType": "filter-prefix"
      }
    },
    {
      "id": "showSuffixIcon-true",
      "label": "显示后缀图标 · 开启",
      "controls": {
        "showSuffixIcon": true,
        "searchType": "filter-suffix"
      }
    },
    {
      "id": "showSuffixIcon-false",
      "label": "显示后缀图标 · 关闭",
      "controls": {
        "showSuffixIcon": false,
        "searchType": "filter-suffix"
      }
    },
    {
      "id": "prefixDisabled-true",
      "label": "禁用前缀筛选 · 开启",
      "controls": {
        "prefixDisabled": true,
        "searchType": "filter-prefix"
      }
    },
    {
      "id": "prefixDisabled-false",
      "label": "禁用前缀筛选 · 关闭",
      "controls": {
        "prefixDisabled": false,
        "searchType": "filter-prefix"
      }
    },
    {
      "id": "suffixDisabled-true",
      "label": "禁用后缀筛选 · 开启",
      "controls": {
        "suffixDisabled": true,
        "searchType": "filter-suffix"
      }
    },
    {
      "id": "suffixDisabled-false",
      "label": "禁用后缀筛选 · 关闭",
      "controls": {
        "suffixDisabled": false,
        "searchType": "filter-suffix"
      }
    }
  ]
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：文本搜索及前后缀筛选；多字段条件与关键字组合的综合搜索，字段菜单复用级联选择面板

**不适用**：本版本范围外的交互或未经验证的内部框架生产实现

官方来源 SFC：supported。

### 示例：受控搜索

id：`controlled-search` · portability：`portable` · owner：`wb-search`

完整示例由调用方持有搜索词并处理查询事件。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { ref } from "vue"
import { WorkbenchSearch } from "@workbench/ui-vue3"
const query = ref('')
const submitted = ref('')
function runSearch(value) { submitted.value = value }
</script>
<template>
  <WorkbenchSearch v-model="query" type="basic" @search="runSearch" />
  <p>最近提交：{{ submitted || "尚未搜索" }}</p>
</template>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-SEARCH-V1/search?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| appearance | String | standard | standard / global | standard或global外观配置。 |
| conditions | Array | {"kind":"function"} |  | 综合搜索结构化条件数组，每项含field、value及可选label。 |
| disabled | Boolean |  |  | 禁用搜索输入、筛选及清除操作。 |
| fields | Array | {"kind":"function"} |  | 综合搜索字段定义；可包含group、disabled及options选项。 |
| filterOptions | Array | {"kind":"function"} |  | 单侧筛选选项，结构为value、label及可选disabled。 |
| filterValue | String |  |  | 单侧筛选值；双侧模式分别使用prefixValue与suffixValue。 |
| helpText | String |  |  | 综合搜索帮助入口的说明内容。 |
| modelValue | String |  |  | 受控搜索文本，输入时即时更新。 |
| placeholder | String | 请输入搜索内容 |  | 搜索输入为空时显示的提示文案。 |
| prefixDisabled | Boolean |  |  | 单独禁用前缀筛选并关闭其展开面板。 |
| prefixOptions | Array | {"kind":"function"} |  | 前缀单选筛选项数组。 |
| prefixValue | String |  |  | 前缀筛选受控值。 |
| previewState | String | default |  | Studio演示状态参数。 |
| searchIconPosition | String | left | left / right | 搜索图标位于左侧或右侧。 |
| showPanel | Boolean |  |  | Studio演示面板显示控制，不作为业务数据。 |
| showPrefixIcon | Boolean | true |  | 控制前缀筛选文字左侧图标。 |
| showSuffixIcon | Boolean | true |  | 控制后缀筛选文字左侧图标。 |
| suffixDisabled | Boolean |  |  | 单独禁用后缀筛选并关闭其展开面板。 |
| suffixOptions | Array | {"kind":"function"} |  | 后缀单选筛选项数组。 |
| suffixValue | String |  |  | 后缀筛选受控值。 |
| type | String | basic |  | basic、filter-prefix、filter-suffix或filter-both，决定筛选段布局。 |
| variant | String | outlined | outlined / filled | outlined或filled表面样式。 |
| wrapConditions | Boolean |  |  | 综合条件标签是否换行展示。 |

### Events

- `update:modelValue`：新的搜索文本。；输入内容变化时实时发出。

- `update:filterValue`：新的筛选值。；单侧筛选选择变化时发出。

- `update:prefixValue`：新的前缀筛选值。；前缀筛选变化时发出。

- `update:suffixValue`：新的后缀筛选值。；后缀筛选变化时发出。

- `search`：普通、筛选及双侧模式为搜索文本；comprehensive模式为{ keyword, conditions }。；左侧搜索图标模式在输入或组合输入结束时实时发出（清除时发空字符串）；右侧图标模式通过Enter提交；comprehensive模式通过Enter提交。

- `clear`：无。；用户激活清除操作后发出，并同步清空文本。

- `filter-change`：所选筛选项；取消选择时为null。；选择或取消可用筛选项后发出。

- `update:conditions`：新的结构化条件数组。；综合搜索条件新增、删除或取消时发出。

- `condition-change`：当前结构化条件数组。；综合条件发生增删或值变化后发出。

### Slots

- `prefix-icon`：无插槽参数。；替换前缀筛选图标。

- `filter-icon`：无插槽参数。；提供筛选图标适配；可用于后续内部图标组件接入。

- `suffix-icon`：无插槽参数。；替换后缀筛选图标。

### 规则

### 基础搜索默认占4/12或8/24栅格；前后缀共存默认占6/12或12/2

id：`wb-search-rule-1` · must / confirmed

基础搜索默认占4/12或8/24栅格；前后缀共存默认占6/12或12/24栅格；单侧从4/12或8/24起算，按实际内容增跨。

**适用条件**：文本搜索及前后缀筛选

### 搜索核心最小宽度296px

id：`wb-search-rule-2` · must / confirmed

搜索核心最小宽度296px。所属轨道更宽时，核心随轨道拉伸。

**适用条件**：文本搜索及前后缀筛选

### 组合的实际最小宽度为“296px核心 + 所有筛选段实际宽度之和”

id：`wb-search-rule-3` · must / confirmed

组合的实际最小宽度为“296px核心 + 所有筛选段实际宽度之和”。默认跨度不足时，`SearchGridItem` 增加跨度，最多占满当前行。

**适用条件**：文本搜索及前后缀筛选

### 页面负责栅格、位置、断点和组合关系；`WorkbenchSearch` 

id：`wb-search-rule-4` · must / confirmed

页面负责栅格、位置、断点和组合关系；`WorkbenchSearch` 不推断页面布局。

**适用条件**：文本搜索及前后缀筛选

### 默认占位文案为“请输入搜索内容”

id：`wb-search-rule-5` · must / confirmed

默认占位文案为“请输入搜索内容”。聚焦保持1px描边，仅改变颜色。图标与文字垂直居中。

**适用条件**：文本搜索及前后缀筛选

### 核心高32px、圆角4px，复用 Select 的默认、Hover、Fo

id：`wb-search-rule-6` · must / confirmed

核心高32px、圆角4px，复用 Select 的默认、Hover、Focus、Disabled Fill 与 Border Token。

**适用条件**：文本搜索及前后缀筛选

### 搜索图标、清除图标和筛选图标为14px；筛选箭头为10px

id：`wb-search-rule-7` · must / confirmed

搜索图标、清除图标和筛选图标为14px；筛选箭头为10px。

**适用条件**：文本搜索及前后缀筛选

### 筛选段和搜索核心位于同一个圆角矩形容器内；筛选段没有独立交互描边

id：`wb-search-rule-8` · must / confirmed

筛选段和搜索核心位于同一个圆角矩形容器内；筛选段没有独立交互描边。前缀左右结构为 `12 + 14 + 4 + 文案 + 6 + 10 + 8`；后缀为 `8 + 14 + 4 + 文案 + 6 + 10 + 12`。

**适用条件**：文本搜索及前后缀筛选

### 默认未选文案为“筛选”，文字与图标使用各自的Secondary Toke

id：`wb-search-rule-9` · must / confirmed

默认未选文案为“筛选”，文字与图标使用各自的Secondary Token。悬浮、点击、聚焦及展开时文字与图标转Primary；已选或预设选项显示选项文案，失焦后文字保留Primary、图标恢复Secondary。展开箭头使用激活色，禁用时使用禁用色。

**适用条件**：文本搜索及前后缀筛选

### 双侧模式使用 `v-model:prefix-value` / `v-m

id：`wb-search-rule-10` · must / confirmed

双侧模式使用 `v-model:prefix-value` / `v-model:suffix-value` 和 `prefixOptions` / `suffixOptions`，两侧独立。分别通过 `prefix-icon` / `suffix-icon` Slot 注入图标，保留 `filter-icon` 回退。

**适用条件**：文本搜索及前后缀筛选

### 面板表面、宽度与选中勾

id：`wb-search-rule-11` · must / confirmed

面板距筛选段4px、无描边，使用color-surface-overlay和shadow-base；默认宽120px且不小于筛选段，单选选中勾14px。

**适用条件**：文本搜索及前后缀筛选

### 选项Hover使用弱填充

id：`wb-search-rule-12` · must / confirmed

选项Hover使用弱填充。单选选中项没有背景填充并显示勾；禁用项不可点击。

**适用条件**：文本搜索及前后缀筛选

### Tab进入输入框和筛选触发器；Enter执行搜索、展开面板或选择选项；方

id：`wb-search-rule-13` · must / confirmed

Tab进入输入框和筛选触发器；Enter执行搜索、展开面板或选择选项；方向键移动可用选项；Escape关闭面板。

**适用条件**：文本搜索及前后缀筛选

### 禁用选项会被方向键导航跳过

id：`wb-search-rule-14` · must / confirmed

禁用选项会被方向键导航跳过。

**适用条件**：文本搜索及前后缀筛选

### 搜索、清除和箭头图标当前由原型提供；筛选业务图标通过 Slot 注入

id：`wb-search-rule-15` · must / confirmed

搜索、清除和箭头图标当前由原型提供；筛选业务图标通过 Slot 注入。公司内部 UI 框架接入时由适配层映射，不改动本规范语义。

**适用条件**：文本搜索及前后缀筛选

### 本任务不实现搜索建议、远程搜索、历史记录或多选筛选

id：`wb-search-rule-16` · must / confirmed

本任务不实现搜索建议、远程搜索、历史记录或多选筛选。

**适用条件**：文本搜索及前后缀筛选

### 再次点击已选选项（或键盘Enter）取消该侧筛选，值更新为空字符串，`f

id：`wb-search-rule-17` · must / confirmed

再次点击已选选项（或键盘Enter）取消该侧筛选，值更新为空字符串，`filter-change` 返回 `null`，恢复“筛选”文案并关闭面板；另一侧保持原值。

**适用条件**：文本搜索及前后缀筛选

### 禁用填充只在整体容器绘制一次，搜索核心和筛选段透明，避免半透明Token

id：`wb-search-rule-18` · must / confirmed

禁用填充只在整体容器绘制一次，搜索核心和筛选段透明，避免半透明Token叠加导致色差。

**适用条件**：文本搜索及前后缀筛选

### `showPrefixIcon`、`showSuffixIcon` 默认

id：`wb-search-rule-19` · must / confirmed

`showPrefixIcon`、`showSuffixIcon` 默认为 `true`，分别控制两侧筛选文字左侧图标。关闭时一并移除图标与文字之间的间距，保留文字、箭头和选择行为。预览右侧提供对应独立开关。

**适用条件**：文本搜索及前后缀筛选

### `prefixDisabled` / `suffixDisabled` 

id：`wb-search-rule-20` · must / confirmed

`prefixDisabled` / `suffixDisabled` 默认为 `false`，独立禁用该侧筛选并关闭已展开面板，保留选值。文字与图标使用禁用色，Hover不变色，搜索核心与另一侧保持可用。整体 `disabled` 优先。右侧控制项提供对应开关。

**适用条件**：文本搜索及前后缀筛选

### 筛选图标和文字按默认、展开、选中状态切换颜色

id：`wb-search-rule-21` · must / confirmed

未选择默认态文字和图标均为二级色；展开时两者为一级色；选中后收起时文字保留一级色、图标恢复二级色，即使触发器仍保持焦点。展开箭头使用激活色。

**适用条件**：文本搜索及前后缀筛选

### Search前后缀筛选面板圆角

id：`wb-search-affix-panel-radius-20261025` · must / confirmed

Search前缀与后缀筛选面板主体使用Foundation radius-md（6px）；筛选触发器、搜索核心及选项行保持各自既有圆角。

**适用条件**：使用Search前缀或后缀筛选

### 组件依赖

`wb-checkbox`、`wb-tag`、`wb-popover`、`wb-tooltip`、`wb-cascader`

### Foundation 引用

`color-border`、`color-border-hover`、`color-border-focus`、`color-border-disabled`、`color-text-primary`、`color-text-placeholder`、`color-text-secondary`、`color-text-disabled`、`color-icon-primary`、`color-icon-secondary`、`color-icon-placeholder`、`color-icon-active`、`color-icon-disabled`、`color-fill-hover`、`color-fill-subtle-default`、`color-fill-subtle-disabled`、`color-surface-card-default`、`color-info-primary-subtle`、`spacing-component-xs`、`spacing-component-sm`、`spacing-component-md`、`spacing-component-lg`、`spacing-layout-container-inline`、`radius-sm`、`radius-lg`、`shadow-base`、`font-body-m`、`font-headline-m`、`color-surface-overlay`、`color-fill-default`、`color-fill-disabled`、`radius-md`

### 选型

基础检索使用type="basic"；条件筛选使用filter-prefix、filter-suffix或filter-both。

- 页面的栅格、位置、断点及组合布局由消费方决定，Search不推断页面布局。

- 正式WorkbenchSearch与Studio综合搜索演示的扩展能力需区分；仅使用公开API。

### 设计结构与排版

搜索核心最小宽度296px，高32px；筛选段与搜索核心共享整体容器。

- 前后缀可分别配置选项、当前值、禁用状态和图标显示。

- variant控制outlined或filled表面；appearance与type、搜索图标位置独立配置。

### 交互与键盘

搜索文本通过v-model实时更新；search事件表示执行搜索，不代表组件负责请求数据。

- Enter可执行搜索、展开筛选或选择选项；方向键浏览可用项，Escape关闭菜单。

- 已选筛选再次选择可取消，filter-change以null表示取消；另一侧值保持不变。

- clear清空搜索文本；禁用选项不会被点击或方向键选中。

### 使用边界与职责

Search只负责控件交互与事件，不连接远程服务、不维护查询结果或历史记录。

- 消费方监听search并执行查询，监听filter-change更新筛选状态。

- 不提供搜索建议、远程搜索、历史记录或多选筛选。

- 筛选业务图标可通过命名插槽注入；搜索、清除和箭头图标由组件提供。

### 包内关联引用

```json
[
  {
    "label": "搜索批准规范",
    "href": "#rules"
  }
]
```
