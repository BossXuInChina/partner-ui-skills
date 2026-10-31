<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261031.1 (75b8e1c367077ff9a0e50ac7cb115868a2a7b3f6) — do not edit. -->

# 底托图标 — `WorkbenchPedestalIcon`

资产：`wb-pedestal-icon` · 类型：`component` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261031.1` · commit：`75b8e1c367077ff9a0e50ac7cb115868a2a7b3f6` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-PEDESTAL-ICONS-REGISTER-20261024/pedestal-icons?view=preview)

公开入口：`@workbench/ui-vue3` → `WorkbenchPedestalIcon`

## 变体与状态

状态：`unavailable`。声明值属于 Studio 案例数据，不自动等于公开组件 props。

包内未提供对应 Studio 路由。

unsupported：VARIANT_VIEW_MISSING：No current declared variants view/readingPilot is available; source declarations are retained.

### 包内声明

```json
{
  "states": [
    {
      "id": "ready",
      "label": "原始尺寸与配色"
    }
  ],
  "controls": [
    {
      "id": "query",
      "label": "搜索图标",
      "type": "text",
      "default": "",
      "description": "按语义名称、分类、调用名或Pixso节点ID搜索。"
    },
    {
      "id": "family",
      "label": "图标分类",
      "type": "select",
      "default": "",
      "options": [
        {
          "value": "",
          "label": "全部分类"
        },
        {
          "value": "38:145",
          "label": "圆底托图标/高饱和度"
        },
        {
          "value": "5688:1355",
          "label": "圆底托图标/低饱和度"
        },
        {
          "value": "397:346",
          "label": "圆角矩形底托图标/低饱和度"
        },
        {
          "value": "5694:105",
          "label": "圆角矩形底托图标/高饱和度"
        },
        {
          "value": "5694:1020",
          "label": "圆角矩形底托图标/高饱和度/备选"
        }
      ]
    },
    {
      "id": "darkSurface",
      "label": "深色底板",
      "type": "boolean",
      "default": false
    }
  ],
  "pilotControls": [
    {
      "id": "query",
      "label": "搜索图标",
      "type": "text",
      "default": "",
      "description": "按语义名称、分类、调用名或Pixso节点ID搜索。"
    },
    {
      "id": "family",
      "label": "图标分类",
      "type": "select",
      "default": "",
      "options": [
        {
          "value": "",
          "label": "全部分类"
        },
        {
          "value": "38:145",
          "label": "圆底托图标/高饱和度"
        },
        {
          "value": "5688:1355",
          "label": "圆底托图标/低饱和度"
        },
        {
          "value": "397:346",
          "label": "圆角矩形底托图标/低饱和度"
        },
        {
          "value": "5694:105",
          "label": "圆角矩形底托图标/高饱和度"
        },
        {
          "value": "5694:1020",
          "label": "圆角矩形底托图标/高饱和度/备选"
        }
      ]
    },
    {
      "id": "darkSurface",
      "label": "深色底板",
      "type": "boolean",
      "default": false
    }
  ],
  "presets": []
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：底托图标 PedestalIcon：使用Pixso已定义的圆形或圆角矩形底托及高低饱和度变体；状态分类、资源类型和默认人像需要带底托图标

**不适用**：需要纯系统图标或状态提示图标时使用对应独立图标组件；将占位咖啡杯解释为已确认业务语义；未经生产接入验证作为生产交付

官方来源 SFC：unavailable。OFFICIAL_SFC_MISSING：No official usage SFC mentions this public asset. Scenario/story source was not substituted.

## 使用规范与API

包内未提供对应 Studio 路由。

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| label | String |  |  |  |
| name * | String |  |  |  |

### 规则

### 底托图标原档

id：`wb-pedestal-icon-native-artwork` · must / confirmed

使用WorkbenchPedestalIcon按登记名称选择完整底托图标；保留原始40/48px设计框、SVG绘制、配色、透明留白与导出外溢，禁止缩放、改色或自行拼装底托和主体。

**适用条件**：底托图标；pedestal icon；WorkbenchPedestalIcon
