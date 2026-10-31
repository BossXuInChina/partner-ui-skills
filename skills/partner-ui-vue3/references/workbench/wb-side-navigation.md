<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261031.1 (1255ff9747cef05c6558318547e69acbbf71b928) — do not edit. -->

# 侧边导航 Side Navigation — `WorkbenchSideNavigation`

资产：`wb-side-navigation` · 类型：`component` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261031.1` · commit：`1255ff9747cef05c6558318547e69acbbf71b928` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-SIDE-NAV-V1/side-navigation?view=preview)

用于页面内的一级、二级导航及更深层级展开。当前选中页面由消费方控制；折叠与展开状态可受控。

公开入口：`@workbench/ui-vue3` → `WorkbenchSideNavigation`

## 变体与状态

状态：`supported`。Studio controls, not public component props

[在 Studio 中查看](http://localhost:4173/preview/WB-SIDE-NAV-V1/side-navigation?view=variants)

| 分组 | 案例 | id | Studio |
| --- | --- | --- | --- |
| 显示栅格 | 关闭 | showGrid-false | [案例](http://localhost:4173/preview/WB-SIDE-NAV-V1/side-navigation?view=variants) |
| 显示栅格 | 开启 | showGrid-true | [案例](http://localhost:4173/preview/WB-SIDE-NAV-V1/side-navigation?view=variants) |
| 展示类型 | 收起态 | displayType-collapsed | [案例](http://localhost:4173/preview/WB-SIDE-NAV-V1/side-navigation?view=variants) |
| 展示类型 | 展开态 | displayType-expanded | [案例](http://localhost:4173/preview/WB-SIDE-NAV-V1/side-navigation?view=variants) |
| 展示类型 | 二级菜单展开 | displayType-submenu-expanded | [案例](http://localhost:4173/preview/WB-SIDE-NAV-V1/side-navigation?view=variants) |
| 选中菜单 | 工作台首页 | selectedItem-home | [案例](http://localhost:4173/preview/WB-SIDE-NAV-V1/side-navigation?view=variants) |
| 选中菜单 | 商机管理 | selectedItem-opportunity-list | [案例](http://localhost:4173/preview/WB-SIDE-NAV-V1/side-navigation?view=variants) |
| 选中菜单 | 经营绩效 | selectedItem-performance | [案例](http://localhost:4173/preview/WB-SIDE-NAV-V1/side-navigation?view=variants) |
| 选中菜单 | 伙伴与成员管理 | selectedItem-partners | [案例](http://localhost:4173/preview/WB-SIDE-NAV-V1/side-navigation?view=variants) |
| 显示展开按钮 | 关闭 | collapsible-false | [案例](http://localhost:4173/preview/WB-SIDE-NAV-V1/side-navigation?view=variants) |
| 显示展开按钮 | 开启 | collapsible-true | [案例](http://localhost:4173/preview/WB-SIDE-NAV-V1/side-navigation?view=variants) |
| 深层面板 | 悬浮双列面板 | panelMode-flyout | [案例](http://localhost:4173/preview/WB-SIDE-NAV-V1/side-navigation?view=variants) |
| 深层面板 | 弹出菜单面板 | panelMode-popup | [案例](http://localhost:4173/preview/WB-SIDE-NAV-V1/side-navigation?view=variants) |
| 深层面板 | 四列搜索面板 | panelMode-columns | [案例](http://localhost:4173/preview/WB-SIDE-NAV-V1/side-navigation?view=variants) |
| 弹出面板密度 | 小尺寸 | panelDensity-small | [案例](http://localhost:4173/preview/WB-SIDE-NAV-V1/side-navigation?view=variants) |
| 弹出面板密度 | 默认尺寸 | panelDensity-default | [案例](http://localhost:4173/preview/WB-SIDE-NAV-V1/side-navigation?view=variants) |
| 弹出面板密度 | 大尺寸 | panelDensity-large | [案例](http://localhost:4173/preview/WB-SIDE-NAV-V1/side-navigation?view=variants) |
| 显示悬浮面板前缀图标 | 关闭 | showFlyoutIcons-false | [案例](http://localhost:4173/preview/WB-SIDE-NAV-V1/side-navigation?view=variants) |
| 显示悬浮面板前缀图标 | 开启 | showFlyoutIcons-true | [案例](http://localhost:4173/preview/WB-SIDE-NAV-V1/side-navigation?view=variants) |
| 显示侧栏右侧分割线 | 关闭 | showDivider-false | [案例](http://localhost:4173/preview/WB-SIDE-NAV-V1/side-navigation?view=variants) |
| 显示侧栏右侧分割线 | 开启 | showDivider-true | [案例](http://localhost:4173/preview/WB-SIDE-NAV-V1/side-navigation?view=variants) |
| 顶部展开按钮 | 关闭 | topToggle-false | [案例](http://localhost:4173/preview/WB-SIDE-NAV-V1/side-navigation?view=variants) |
| 顶部展开按钮 | 开启 | topToggle-true | [案例](http://localhost:4173/preview/WB-SIDE-NAV-V1/side-navigation?view=variants) |
| 侧栏标题 | 关闭 | showTitle-false | [案例](http://localhost:4173/preview/WB-SIDE-NAV-V1/side-navigation?view=variants) |
| 侧栏标题 | 开启 | showTitle-true | [案例](http://localhost:4173/preview/WB-SIDE-NAV-V1/side-navigation?view=variants) |

### Studio 案例值（不是 props 映射）

```json
[
  {
    "id": "showGrid-false",
    "group": "显示栅格",
    "label": "关闭",
    "controls": {
      "showGrid": false,
      "displayType": "submenu-expanded",
      "selectedItem": "opportunity-list",
      "collapsible": true,
      "panelMode": "flyout",
      "panelDensity": "default",
      "showFlyoutIcons": true,
      "showDivider": true,
      "topToggle": false,
      "showTitle": false,
      "previewWidth": 1440
    },
    "studioPath": "/preview/WB-SIDE-NAV-V1/side-navigation?view=variants"
  },
  {
    "id": "showGrid-true",
    "group": "显示栅格",
    "label": "开启",
    "controls": {
      "showGrid": true,
      "displayType": "submenu-expanded",
      "selectedItem": "opportunity-list",
      "collapsible": true,
      "panelMode": "flyout",
      "panelDensity": "default",
      "showFlyoutIcons": true,
      "showDivider": true,
      "topToggle": false,
      "showTitle": false,
      "previewWidth": 1440
    },
    "studioPath": "/preview/WB-SIDE-NAV-V1/side-navigation?view=variants"
  },
  {
    "id": "displayType-collapsed",
    "group": "展示类型",
    "label": "收起态",
    "controls": {
      "showGrid": false,
      "displayType": "collapsed",
      "selectedItem": "opportunity-list",
      "collapsible": true,
      "panelMode": "flyout",
      "panelDensity": "default",
      "showFlyoutIcons": true,
      "showDivider": true,
      "topToggle": false,
      "showTitle": false,
      "previewWidth": 1440
    },
    "studioPath": "/preview/WB-SIDE-NAV-V1/side-navigation?view=variants"
  },
  {
    "id": "displayType-expanded",
    "group": "展示类型",
    "label": "展开态",
    "controls": {
      "showGrid": false,
      "displayType": "expanded",
      "selectedItem": "opportunity-list",
      "collapsible": true,
      "panelMode": "flyout",
      "panelDensity": "default",
      "showFlyoutIcons": true,
      "showDivider": true,
      "topToggle": false,
      "showTitle": false,
      "previewWidth": 1440
    },
    "studioPath": "/preview/WB-SIDE-NAV-V1/side-navigation?view=variants"
  },
  {
    "id": "displayType-submenu-expanded",
    "group": "展示类型",
    "label": "二级菜单展开",
    "controls": {
      "showGrid": false,
      "displayType": "submenu-expanded",
      "selectedItem": "opportunity-list",
      "collapsible": true,
      "panelMode": "flyout",
      "panelDensity": "default",
      "showFlyoutIcons": true,
      "showDivider": true,
      "topToggle": false,
      "showTitle": false,
      "previewWidth": 1440
    },
    "studioPath": "/preview/WB-SIDE-NAV-V1/side-navigation?view=variants"
  },
  {
    "id": "selectedItem-home",
    "group": "选中菜单",
    "label": "工作台首页",
    "controls": {
      "showGrid": false,
      "displayType": "submenu-expanded",
      "selectedItem": "home",
      "collapsible": true,
      "panelMode": "flyout",
      "panelDensity": "default",
      "showFlyoutIcons": true,
      "showDivider": true,
      "topToggle": false,
      "showTitle": false,
      "previewWidth": 1440
    },
    "studioPath": "/preview/WB-SIDE-NAV-V1/side-navigation?view=variants"
  },
  {
    "id": "selectedItem-opportunity-list",
    "group": "选中菜单",
    "label": "商机管理",
    "controls": {
      "showGrid": false,
      "displayType": "submenu-expanded",
      "selectedItem": "opportunity-list",
      "collapsible": true,
      "panelMode": "flyout",
      "panelDensity": "default",
      "showFlyoutIcons": true,
      "showDivider": true,
      "topToggle": false,
      "showTitle": false,
      "previewWidth": 1440
    },
    "studioPath": "/preview/WB-SIDE-NAV-V1/side-navigation?view=variants"
  },
  {
    "id": "selectedItem-performance",
    "group": "选中菜单",
    "label": "经营绩效",
    "controls": {
      "showGrid": false,
      "displayType": "submenu-expanded",
      "selectedItem": "performance",
      "collapsible": true,
      "panelMode": "flyout",
      "panelDensity": "default",
      "showFlyoutIcons": true,
      "showDivider": true,
      "topToggle": false,
      "showTitle": false,
      "previewWidth": 1440
    },
    "studioPath": "/preview/WB-SIDE-NAV-V1/side-navigation?view=variants"
  },
  {
    "id": "selectedItem-partners",
    "group": "选中菜单",
    "label": "伙伴与成员管理",
    "controls": {
      "showGrid": false,
      "displayType": "submenu-expanded",
      "selectedItem": "partners",
      "collapsible": true,
      "panelMode": "flyout",
      "panelDensity": "default",
      "showFlyoutIcons": true,
      "showDivider": true,
      "topToggle": false,
      "showTitle": false,
      "previewWidth": 1440
    },
    "studioPath": "/preview/WB-SIDE-NAV-V1/side-navigation?view=variants"
  },
  {
    "id": "collapsible-false",
    "group": "显示展开按钮",
    "label": "关闭",
    "controls": {
      "showGrid": false,
      "displayType": "submenu-expanded",
      "selectedItem": "opportunity-list",
      "collapsible": false,
      "panelMode": "flyout",
      "panelDensity": "default",
      "showFlyoutIcons": true,
      "showDivider": true,
      "topToggle": false,
      "showTitle": false,
      "previewWidth": 1440
    },
    "studioPath": "/preview/WB-SIDE-NAV-V1/side-navigation?view=variants"
  },
  {
    "id": "collapsible-true",
    "group": "显示展开按钮",
    "label": "开启",
    "controls": {
      "showGrid": false,
      "displayType": "submenu-expanded",
      "selectedItem": "opportunity-list",
      "collapsible": true,
      "panelMode": "flyout",
      "panelDensity": "default",
      "showFlyoutIcons": true,
      "showDivider": true,
      "topToggle": false,
      "showTitle": false,
      "previewWidth": 1440
    },
    "studioPath": "/preview/WB-SIDE-NAV-V1/side-navigation?view=variants"
  },
  {
    "id": "panelMode-flyout",
    "group": "深层面板",
    "label": "悬浮双列面板",
    "controls": {
      "showGrid": false,
      "displayType": "submenu-expanded",
      "selectedItem": "opportunity-list",
      "collapsible": true,
      "panelMode": "flyout",
      "panelDensity": "default",
      "showFlyoutIcons": true,
      "showDivider": true,
      "topToggle": false,
      "showTitle": false,
      "previewWidth": 1440
    },
    "studioPath": "/preview/WB-SIDE-NAV-V1/side-navigation?view=variants"
  },
  {
    "id": "panelMode-popup",
    "group": "深层面板",
    "label": "弹出菜单面板",
    "controls": {
      "showGrid": false,
      "displayType": "submenu-expanded",
      "selectedItem": "opportunity-list",
      "collapsible": true,
      "panelMode": "popup",
      "panelDensity": "default",
      "showFlyoutIcons": true,
      "showDivider": true,
      "topToggle": false,
      "showTitle": false,
      "previewWidth": 1440
    },
    "studioPath": "/preview/WB-SIDE-NAV-V1/side-navigation?view=variants"
  },
  {
    "id": "panelMode-columns",
    "group": "深层面板",
    "label": "四列搜索面板",
    "controls": {
      "showGrid": false,
      "displayType": "submenu-expanded",
      "selectedItem": "opportunity-list",
      "collapsible": true,
      "panelMode": "columns",
      "panelDensity": "default",
      "showFlyoutIcons": true,
      "showDivider": true,
      "topToggle": false,
      "showTitle": false,
      "previewWidth": 1440
    },
    "studioPath": "/preview/WB-SIDE-NAV-V1/side-navigation?view=variants"
  },
  {
    "id": "panelDensity-small",
    "group": "弹出面板密度",
    "label": "小尺寸",
    "controls": {
      "showGrid": false,
      "displayType": "submenu-expanded",
      "selectedItem": "opportunity-list",
      "collapsible": true,
      "panelMode": "flyout",
      "panelDensity": "small",
      "showFlyoutIcons": true,
      "showDivider": true,
      "topToggle": false,
      "showTitle": false,
      "previewWidth": 1440
    },
    "studioPath": "/preview/WB-SIDE-NAV-V1/side-navigation?view=variants"
  },
  {
    "id": "panelDensity-default",
    "group": "弹出面板密度",
    "label": "默认尺寸",
    "controls": {
      "showGrid": false,
      "displayType": "submenu-expanded",
      "selectedItem": "opportunity-list",
      "collapsible": true,
      "panelMode": "flyout",
      "panelDensity": "default",
      "showFlyoutIcons": true,
      "showDivider": true,
      "topToggle": false,
      "showTitle": false,
      "previewWidth": 1440
    },
    "studioPath": "/preview/WB-SIDE-NAV-V1/side-navigation?view=variants"
  },
  {
    "id": "panelDensity-large",
    "group": "弹出面板密度",
    "label": "大尺寸",
    "controls": {
      "showGrid": false,
      "displayType": "submenu-expanded",
      "selectedItem": "opportunity-list",
      "collapsible": true,
      "panelMode": "flyout",
      "panelDensity": "large",
      "showFlyoutIcons": true,
      "showDivider": true,
      "topToggle": false,
      "showTitle": false,
      "previewWidth": 1440
    },
    "studioPath": "/preview/WB-SIDE-NAV-V1/side-navigation?view=variants"
  },
  {
    "id": "showFlyoutIcons-false",
    "group": "显示悬浮面板前缀图标",
    "label": "关闭",
    "controls": {
      "showGrid": false,
      "displayType": "submenu-expanded",
      "selectedItem": "opportunity-list",
      "collapsible": true,
      "panelMode": "flyout",
      "panelDensity": "default",
      "showFlyoutIcons": false,
      "showDivider": true,
      "topToggle": false,
      "showTitle": false,
      "previewWidth": 1440
    },
    "studioPath": "/preview/WB-SIDE-NAV-V1/side-navigation?view=variants"
  },
  {
    "id": "showFlyoutIcons-true",
    "group": "显示悬浮面板前缀图标",
    "label": "开启",
    "controls": {
      "showGrid": false,
      "displayType": "submenu-expanded",
      "selectedItem": "opportunity-list",
      "collapsible": true,
      "panelMode": "flyout",
      "panelDensity": "default",
      "showFlyoutIcons": true,
      "showDivider": true,
      "topToggle": false,
      "showTitle": false,
      "previewWidth": 1440
    },
    "studioPath": "/preview/WB-SIDE-NAV-V1/side-navigation?view=variants"
  },
  {
    "id": "showDivider-false",
    "group": "显示侧栏右侧分割线",
    "label": "关闭",
    "controls": {
      "showGrid": false,
      "displayType": "submenu-expanded",
      "selectedItem": "opportunity-list",
      "collapsible": true,
      "panelMode": "flyout",
      "panelDensity": "default",
      "showFlyoutIcons": true,
      "showDivider": false,
      "topToggle": false,
      "showTitle": false,
      "previewWidth": 1440
    },
    "studioPath": "/preview/WB-SIDE-NAV-V1/side-navigation?view=variants"
  },
  {
    "id": "showDivider-true",
    "group": "显示侧栏右侧分割线",
    "label": "开启",
    "controls": {
      "showGrid": false,
      "displayType": "submenu-expanded",
      "selectedItem": "opportunity-list",
      "collapsible": true,
      "panelMode": "flyout",
      "panelDensity": "default",
      "showFlyoutIcons": true,
      "showDivider": true,
      "topToggle": false,
      "showTitle": false,
      "previewWidth": 1440
    },
    "studioPath": "/preview/WB-SIDE-NAV-V1/side-navigation?view=variants"
  },
  {
    "id": "topToggle-false",
    "group": "顶部展开按钮",
    "label": "关闭",
    "controls": {
      "showGrid": false,
      "displayType": "submenu-expanded",
      "selectedItem": "opportunity-list",
      "collapsible": true,
      "panelMode": "flyout",
      "panelDensity": "default",
      "showFlyoutIcons": true,
      "showDivider": true,
      "topToggle": false,
      "showTitle": false,
      "previewWidth": 1440
    },
    "studioPath": "/preview/WB-SIDE-NAV-V1/side-navigation?view=variants"
  },
  {
    "id": "topToggle-true",
    "group": "顶部展开按钮",
    "label": "开启",
    "controls": {
      "showGrid": false,
      "displayType": "submenu-expanded",
      "selectedItem": "opportunity-list",
      "collapsible": true,
      "panelMode": "flyout",
      "panelDensity": "default",
      "showFlyoutIcons": true,
      "showDivider": true,
      "topToggle": true,
      "showTitle": false,
      "previewWidth": 1440
    },
    "studioPath": "/preview/WB-SIDE-NAV-V1/side-navigation?view=variants"
  },
  {
    "id": "showTitle-false",
    "group": "侧栏标题",
    "label": "关闭",
    "controls": {
      "showGrid": false,
      "displayType": "submenu-expanded",
      "selectedItem": "opportunity-list",
      "collapsible": true,
      "panelMode": "flyout",
      "panelDensity": "default",
      "showFlyoutIcons": true,
      "showDivider": true,
      "topToggle": false,
      "showTitle": false,
      "previewWidth": 1440
    },
    "studioPath": "/preview/WB-SIDE-NAV-V1/side-navigation?view=variants"
  },
  {
    "id": "showTitle-true",
    "group": "侧栏标题",
    "label": "开启",
    "controls": {
      "showGrid": false,
      "displayType": "submenu-expanded",
      "selectedItem": "opportunity-list",
      "collapsible": true,
      "panelMode": "flyout",
      "panelDensity": "default",
      "showFlyoutIcons": true,
      "showDivider": true,
      "topToggle": false,
      "showTitle": true,
      "previewWidth": 1440
    },
    "studioPath": "/preview/WB-SIDE-NAV-V1/side-navigation?view=variants"
  }
]
```

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
      "id": "showGrid",
      "label": "显示栅格",
      "description": "显示统一页面栅格辅助层，检查展开侧栏的4列跨度。",
      "type": "boolean",
      "default": false
    },
    {
      "id": "displayType",
      "label": "展示类型",
      "type": "select",
      "default": "submenu-expanded",
      "options": [
        {
          "value": "collapsed",
          "label": "收起态"
        },
        {
          "value": "expanded",
          "label": "展开态"
        },
        {
          "value": "submenu-expanded",
          "label": "二级菜单展开"
        }
      ]
    },
    {
      "id": "selectedItem",
      "label": "选中菜单",
      "type": "select",
      "default": "opportunity-list",
      "options": [
        {
          "value": "home",
          "label": "工作台首页"
        },
        {
          "value": "opportunity-list",
          "label": "商机管理"
        },
        {
          "value": "performance",
          "label": "经营绩效"
        },
        {
          "value": "partners",
          "label": "伙伴与成员管理"
        }
      ]
    },
    {
      "id": "collapsible",
      "label": "显示展开按钮",
      "type": "boolean",
      "default": true
    },
    {
      "id": "panelMode",
      "label": "深层面板",
      "type": "select",
      "default": "flyout",
      "options": [
        {
          "value": "flyout",
          "label": "悬浮双列面板"
        },
        {
          "value": "popup",
          "label": "弹出菜单面板"
        },
        {
          "value": "columns",
          "label": "四列搜索面板"
        }
      ]
    },
    {
      "id": "panelDensity",
      "label": "弹出面板密度",
      "type": "select",
      "default": "default",
      "options": [
        {
          "value": "small",
          "label": "小尺寸"
        },
        {
          "value": "default",
          "label": "默认尺寸"
        },
        {
          "value": "large",
          "label": "大尺寸"
        }
      ]
    },
    {
      "id": "showFlyoutIcons",
      "label": "显示悬浮面板前缀图标",
      "description": "统一显示或隐藏悬浮双列面板所有选项的前缀图标。",
      "type": "boolean",
      "default": true
    },
    {
      "id": "showDivider",
      "label": "显示侧栏右侧分割线",
      "type": "boolean",
      "default": true
    },
    {
      "id": "topToggle",
      "label": "顶部展开按钮",
      "type": "boolean",
      "default": false
    },
    {
      "id": "showTitle",
      "label": "侧栏标题",
      "type": "boolean",
      "default": false
    },
    {
      "id": "previewWidth",
      "label": "预览宽度",
      "description": "拖动验证4栅格宽度和断点切换。",
      "type": "range",
      "target": "viewport-width",
      "default": 1440,
      "min": 768,
      "max": 1921,
      "step": 1,
      "unit": "px",
      "marks": [
        768,
        1279,
        1280,
        1440,
        1920,
        1921
      ]
    }
  ],
  "pilotControls": [
    {
      "id": "showGrid",
      "label": "显示栅格",
      "description": "显示统一页面栅格辅助层，检查展开侧栏的4列跨度。",
      "type": "boolean",
      "default": false
    },
    {
      "id": "displayType",
      "label": "展示类型",
      "type": "select",
      "default": "submenu-expanded",
      "options": [
        {
          "value": "collapsed",
          "label": "收起态"
        },
        {
          "value": "expanded",
          "label": "展开态"
        },
        {
          "value": "submenu-expanded",
          "label": "二级菜单展开"
        }
      ]
    },
    {
      "id": "selectedItem",
      "label": "选中菜单",
      "type": "select",
      "default": "opportunity-list",
      "options": [
        {
          "value": "home",
          "label": "工作台首页"
        },
        {
          "value": "opportunity-list",
          "label": "商机管理"
        },
        {
          "value": "performance",
          "label": "经营绩效"
        },
        {
          "value": "partners",
          "label": "伙伴与成员管理"
        }
      ]
    },
    {
      "id": "collapsible",
      "label": "显示展开按钮",
      "type": "boolean",
      "default": true
    },
    {
      "id": "panelMode",
      "label": "深层面板",
      "type": "select",
      "default": "flyout",
      "options": [
        {
          "value": "flyout",
          "label": "悬浮双列面板"
        },
        {
          "value": "popup",
          "label": "弹出菜单面板"
        },
        {
          "value": "columns",
          "label": "四列搜索面板"
        }
      ]
    },
    {
      "id": "panelDensity",
      "label": "弹出面板密度",
      "type": "select",
      "default": "default",
      "options": [
        {
          "value": "small",
          "label": "小尺寸"
        },
        {
          "value": "default",
          "label": "默认尺寸"
        },
        {
          "value": "large",
          "label": "大尺寸"
        }
      ]
    },
    {
      "id": "showFlyoutIcons",
      "label": "显示悬浮面板前缀图标",
      "description": "统一显示或隐藏悬浮双列面板所有选项的前缀图标。",
      "type": "boolean",
      "default": true
    },
    {
      "id": "showDivider",
      "label": "显示侧栏右侧分割线",
      "type": "boolean",
      "default": true
    },
    {
      "id": "topToggle",
      "label": "顶部展开按钮",
      "type": "boolean",
      "default": false
    },
    {
      "id": "showTitle",
      "label": "侧栏标题",
      "type": "boolean",
      "default": false
    },
    {
      "id": "previewWidth",
      "label": "预览宽度",
      "description": "拖动验证4栅格宽度和断点切换。",
      "type": "range",
      "target": "viewport-width",
      "default": 1440,
      "min": 768,
      "max": 1921,
      "step": 1,
      "unit": "px",
      "marks": [
        768,
        1279,
        1280,
        1440,
        1920,
        1921
      ]
    }
  ],
  "presets": [
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
      "id": "displayType-collapsed",
      "label": "展示类型 · 收起态",
      "controls": {
        "displayType": "collapsed"
      }
    },
    {
      "id": "displayType-expanded",
      "label": "展示类型 · 展开态",
      "controls": {
        "displayType": "expanded"
      }
    },
    {
      "id": "displayType-submenu-expanded",
      "label": "展示类型 · 二级菜单展开",
      "controls": {
        "displayType": "submenu-expanded"
      }
    },
    {
      "id": "selectedItem-home",
      "label": "选中菜单 · 工作台首页",
      "controls": {
        "selectedItem": "home"
      }
    },
    {
      "id": "selectedItem-opportunity-list",
      "label": "选中菜单 · 商机管理",
      "controls": {
        "selectedItem": "opportunity-list"
      }
    },
    {
      "id": "selectedItem-performance",
      "label": "选中菜单 · 经营绩效",
      "controls": {
        "selectedItem": "performance"
      }
    },
    {
      "id": "selectedItem-partners",
      "label": "选中菜单 · 伙伴与成员管理",
      "controls": {
        "selectedItem": "partners"
      }
    },
    {
      "id": "collapsible-true",
      "label": "显示展开按钮 · 开启",
      "controls": {
        "collapsible": true
      }
    },
    {
      "id": "collapsible-false",
      "label": "显示展开按钮 · 关闭",
      "controls": {
        "collapsible": false
      }
    },
    {
      "id": "panelMode-flyout",
      "label": "深层面板 · 悬浮双列面板",
      "controls": {
        "panelMode": "flyout"
      }
    },
    {
      "id": "panelMode-popup",
      "label": "深层面板 · 弹出菜单面板",
      "controls": {
        "panelMode": "popup"
      }
    },
    {
      "id": "panelMode-columns",
      "label": "深层面板 · 四列搜索面板",
      "controls": {
        "panelMode": "columns"
      }
    },
    {
      "id": "panelDensity-small",
      "label": "弹出面板密度 · 小尺寸",
      "controls": {
        "panelDensity": "small"
      }
    },
    {
      "id": "panelDensity-default",
      "label": "弹出面板密度 · 默认尺寸",
      "controls": {
        "panelDensity": "default"
      }
    },
    {
      "id": "panelDensity-large",
      "label": "弹出面板密度 · 大尺寸",
      "controls": {
        "panelDensity": "large"
      }
    },
    {
      "id": "showFlyoutIcons-true",
      "label": "显示悬浮面板前缀图标 · 开启",
      "controls": {
        "showFlyoutIcons": true
      }
    },
    {
      "id": "showFlyoutIcons-false",
      "label": "显示悬浮面板前缀图标 · 关闭",
      "controls": {
        "showFlyoutIcons": false
      }
    },
    {
      "id": "showDivider-true",
      "label": "显示侧栏右侧分割线 · 开启",
      "controls": {
        "showDivider": true
      }
    },
    {
      "id": "showDivider-false",
      "label": "显示侧栏右侧分割线 · 关闭",
      "controls": {
        "showDivider": false
      }
    },
    {
      "id": "topToggle-true",
      "label": "顶部展开按钮 · 开启",
      "controls": {
        "topToggle": true
      }
    },
    {
      "id": "topToggle-false",
      "label": "顶部展开按钮 · 关闭",
      "controls": {
        "topToggle": false
      }
    },
    {
      "id": "showTitle-true",
      "label": "侧栏标题 · 开启",
      "controls": {
        "showTitle": true
      }
    },
    {
      "id": "showTitle-false",
      "label": "侧栏标题 · 关闭",
      "controls": {
        "showTitle": false
      }
    }
  ]
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：管理应用多层级与频繁切换导航；可收起侧栏及三级四级面板

**不适用**：移动端正式导航；超过四级或跨刷新持久化需求；未经验证的Vue2或内部框架生产调用

官方来源 SFC：supported。

### 示例：受控侧边导航

id：`controlled-sidebar` · portability：`portable` · owner：`wb-side-navigation`

调用方保存选中项和展开项，并接管路由。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { ref } from "vue"
import { WorkbenchSideNavigation } from "@workbench/ui-vue3"
const activeItem = ref('overview')
const expandedItems = ref(['workspace'])
const items = [{ id: 'workspace', label: '工作空间', children: [{ id: 'overview', label: '总览' }] }]
function selectItem(item) { activeItem.value = item.id }
</script>
<template>
  <WorkbenchSideNavigation v-model:active-item="activeItem" v-model:expanded-items="expandedItems" :items="items" @select="selectItem" />
</template>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-SIDE-NAV-V1/side-navigation?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| activeItem | String |  |  | 受控当前选中项标识。 |
| ariaLabel | String | 侧边导航 |  | 导航区域的可访问名称。 |
| collapsed | Boolean | false |  | 受控整体折叠状态。 |
| collapsible | Boolean | true |  | 是否提供底部折叠操作。 |
| expandedItems | Array | {"kind":"function"} |  | 受控已展开项标识数组。 |
| items | Array | {"kind":"function"} |  | 层级导航数据；每项使用id、label及可选children。 |
| panelDensity | String | default | small / default / large | 弹出菜单密度：small、default或large。 |
| panelMode | String | flyout | flyout / popup / columns | 深层面板模式：flyout、popup或columns。 |
| showDivider | Boolean | true |  | 是否展示分隔线。 |
| showFlyoutIcons | Boolean | true |  | 是否在flyout子菜单中展示图标。 |
| title | String |  |  | 侧边导航可选标题。 |
| topToggle | Boolean | false |  | 是否显示顶部折叠控制。 |
| width | String |  |  | 指定侧栏宽度；为空时遵循组件默认栅格宽度。 |

### Events

- `update:collapsed`：新的布尔折叠状态。；用户切换整体折叠状态后发出。

- `update:activeItem`：新的选中项标识。；用户选中导航项后发出。

- `update:expandedItems`：新的展开项标识数组。；用户展开或收起层级时发出。

- `select`：被选中导航项。；用户激活导航项时发出。

### 实例成员

- `toggle(): void;`

- `closePanel(restoreFocus?: boolean): void;`

### 规则

### 侧栏基础尺寸

id：`wb-side-navigation-dimensions` · must / confirmed

主菜单与二级菜单固定48px；无标题时首行距顶部12px；标题展示时标题与一级图标左对齐，标题到水平分割线24px，分割线到首个一级菜单4px；内容左右16px、图文和箭头间距12px；一级统一显示16px线性图标，缺省使用宫格图标兜底；二级不显示图标，文字与一级文字对齐。箭头10px、文字font-body-m。默认宽度遵循页面栅格，在24列页面占4栅格，允许width指定更宽尺寸；收起宽48px。右侧纵向分割线默认显示，可用showDivider=false隐藏。

**适用条件**：侧边导航

### 选中和交互状态

id：`wb-side-navigation-states` · must / confirmed

Hover与焦点铺满整行且无圆角；选中使用color-fill-selected灰底。左侧2×12px品牌红胶囊只标识最终选中的叶子页面路径；仅打开带子级的菜单不显示红条，同一时间最多一个侧栏菜单项显示红条。展开态一级图标保持color-icon-primary；仅在整体折叠态，当前选中项及其所属一级菜单图标使用color-brand，其他一级图标保持默认色。箭头采用/ic_arrow_right_line#2:141 SVG。

**适用条件**：侧边导航

### 四级导航与面板

id：`wb-side-navigation-hierarchy` · must / confirmed

前两级在侧栏内展开，第三级及第四级用flyout双列描述面板、popup菜单面板、columns四列搜索面板展示。columns四级菜单默认文字使用color-text-secondary，悬浮时显示灰色底，选中后文字使用brand色；右侧收藏在off线性图标与on面性图标间切换，on使用color-warning。popup提供small/default/large密度；侧栏菜单48px不随密度改变。popup选中文字保持color-text-primary，右侧仅为当前选中项显示完成/尺寸=12图标，不为祖先重复显示勾选。

**适用条件**：侧边导航

### 受控状态与展开历史

id：`wb-side-navigation-state-ownership` · must / confirmed

collapsed、expandedItems、activeItem均受控；整体收起不清除已展开父级及选中叶子。topToggle可选或由宿主调用toggle方法；底部按钮collapsible可选。

**适用条件**：侧边导航

### 边线与阴影边界

id：`wb-side-navigation-decoration` · must / confirmed

基础侧栏无阴影且无圆角，只在内侧右边绘制0.5px color-border-separator线，亮色为DFDFDF。深层面板才使用shadow-r-sm或popup的shadow-base。

**适用条件**：侧边导航

### 键盘与可访问性

id：`wb-side-navigation-keyboard` · must / confirmed

使用nav、ul、button；aria-current与aria-expanded关联真实状态。方向键与Home/End移动同级焦点，Right打开、Left返回，Escape关闭面板并回焦点。

**适用条件**：侧边导航

### 注册与交付资格

id：`wb-side-navigation-eligibility` · must / confirmed

用户授权后正式注册Catalog和Vue3公共导出。交付范围为preview-vue3，Vue2及生产目标未验证。不得宣称生产可用。

**适用条件**：侧边导航

### 组件依赖

`wb-button`、`wb-search`

### Foundation 引用

`color-brand`、`color-fill-hover`、`color-fill-selected`、`color-surface-container`、`color-text-primary`、`color-text-secondary`、`color-icon-primary`、`color-icon-hover`、`color-icon-active`、`color-border-focus`、`color-border-separator`、`font-body-m`、`font-body-s`、`radius-xs`、`radius-sm`、`radius-md`、`radius-full`、`shadow-r-sm`、`shadow-base`、`spacing-component-xs`、`spacing-component-sm`、`spacing-component-md`、`spacing-component-lg`

### 选型

用于同一产品区域的层级页面导航；全站站点切换使用WorkbenchTopNav。

- panelMode选择flyout、popup或columns深层面板呈现。

- 需要四级搜索及收藏入口时使用columns；简单层级使用flyout。

### 设计结构与排版

items定义导航层级；width可指定侧栏宽度，默认按布局栅格计算。

- 主菜单48px行高；整体折叠时宽48px。

- 深层面板显示模式、密度与图标由panelMode及相关属性配置。

- 基础侧栏无阴影与圆角，右侧使用分隔线。

### 交互与键盘

collapsed、expandedItems与activeItem支持受控；展开父项不会清除已选叶子。

- 方向键和Home/End移动同级焦点；Right展开、Left返回、Escape关闭面板。

- topToggle控制顶部折叠入口；collapsible控制底部折叠能力。

### 使用边界与职责

侧边导航发出选中值，不执行宿主路由或权限判断。

- 消费方维护导航数据、当前页面及展开路径。

- activeItem应表示最终选中的叶子页面；只展开父项不会显示叶子选中标记。

- 当前交付为preview-vue3；不声明Vue2或生产适配资格。

### 包内关联引用

```json
[
  {
    "label": "侧边导航规范",
    "href": "#rules"
  }
]
```
