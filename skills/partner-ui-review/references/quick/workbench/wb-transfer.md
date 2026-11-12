<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 穿梭框 Transfer — `WorkbenchTransfer`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-transfer`](<../../workbench/wb-transfer.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-transfer",
  "kind": "component",
  "version": "1.0.0",
  "summary": "用于在可选集合与已选集合之间转移项目，支持手动确认与自动移动模式。",
  "useWhen": ["穿梭框 Transfer相关交互与状态展示"],
  "avoidWhen": ["未经独立生产接入与设计验收直接用于生产交付"],
  "status": {"maturity":"prototype-validated","deliveryEligibility":"prototype-only"},
  "source": {
    "package": "@workbench/ui-vue3",
    "version": "0.2.0-prototype.20261106.7",
    "commit": "6dad97e7a215069b5841b1f4413f80c1c587c1cc"
  },
  "unsupported": null,
  "usageStatus": "supported",
  "usageUnsupported": [],
  "variantStatus": "supported",
  "variantUnsupported": [],
  "caseSemantics": "Studio controls, not public component props"
}
```

## 公开 API

以下字段来自包内声明。null 表示来源为空或未声明，不代表支持；不猜测签名、嵌套类型或动态 slot 名。

```json
{
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchTransfer"},
  "props": {
    "items": {"type":"Array","default":{"kind":"function"}},
    "modelValue": {"type":"Array","default":{"kind":"undefined"}},
    "defaultValue": {"type":"Array","default":{"kind":"function"}},
    "checkedKeys": {"type":"Object","default":{"kind":"undefined"}},
    "defaultCheckedKeys": {"type":"Object","default":{"kind":"function"}},
    "mode": {"type":"String","default":"manual","enum":["manual","auto"]},
    "titles": {"type":"Array","default":{"kind":"function"}},
    "searchable": {"type":"Boolean"},
    "pagination": {"type":"Boolean","default":true},
    "pageSize": {"type":"Number","default":6},
    "defaultExpandedKeys": {"type":"Array","default":{"kind":"function"}},
    "disabled": {"type":"Boolean"},
    "label": {"type":"String","default":"穿梭框"}
  },
  "events": ["update:modelValue","update:checkedKeys","change","check","search","page-change"],
  "eventDetails": null,
  "slots": ["item","empty"],
  "slotDetails": null,
  "slotPatterns": [],
  "exposed": [{"name":"move","declaration":"move(side: 'source' | 'target', requested?: (string | number)[]): void;"}],
  "family": [
    {
      "assetId": "wb-transfer",
      "independentApproval": false,
      "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchTransferPanel"},
      "props": {
        "items": {"type":"Array","required":true},
        "title": {"type":"String","required":true},
        "side": {"type":"String","required":true},
        "mode": {"type":"String","required":true},
        "checkedKeys": {"type":"Array","required":true},
        "disabled": {"type":"Boolean"},
        "searchable": {"type":"Boolean"},
        "pagination": {"type":"Boolean"},
        "pageSize": {"type":"Number"},
        "defaultExpandedKeys": {"type":"Array"}
      },
      "events": ["check","move","search","page-change"],
      "slots": ["item","empty"],
      "slotPatterns": [],
      "exposed": []
    }
  ],
  "propNotes": {
    "items": "候选树形项目；每个节点需有稳定key与label，可嵌套children。",
    "modelValue": "受控目标侧叶子key数组。",
    "defaultValue": "非受控目标值初始数组。",
    "checkedKeys": "受控的source/target已勾选key对象。",
    "defaultCheckedKeys": "非受控两侧初始勾选状态。",
    "mode": "manual先勾选后移动；auto勾选时自动移动。",
    "titles": "左右面板标题数组。",
    "searchable": "是否显示面板搜索。",
    "pagination": "是否在手动模式显示分页。",
    "pageSize": "每页项目数。",
    "defaultExpandedKeys": "树形项目的初始展开key。",
    "label": "穿梭框可访问名称。",
    "disabled": "禁用勾选与项目转移。"
  },
  "eventNotes": {
    "update:modelValue": {"payload":"更新后的目标侧叶子key数组。","timing":"项目移动后发出。"},
    "update:checkedKeys": {"payload":"{ source, target }两侧勾选key对象。","timing":"任一侧勾选状态改变后发出。"},
    "change": {"payload":"新目标key数组、方向right/left及移动key数组。","timing":"项目从一侧成功移动到另一侧后发出。"},
    "check": {"payload":"侧别source/target及该侧勾选key数组。","timing":"该侧勾选状态更新后发出。"},
    "search": {"payload":"侧别及搜索文本。","timing":"任一侧搜索内容变化时发出。"},
    "page-change": {"payload":"侧别及页码信息。","timing":"任一侧分页变化时发出。"}
  },
  "slotNotes": {
    "item": {"scope":"{ item, side }；side为source或target。","description":"自定义每个候选或已选项内容。"},
    "empty": {"scope":"{ side, search }；side为source或target，search为该侧当前搜索文本。","description":"自定义某一侧无数据时的内容。"}
  }
}
```

## 规则与适用条件

```json
{
  "rules": [],
  "dependencies": ["wb-checkbox","wb-pagination"],
  "foundationKeys": [
    "color-text-primary",
    "color-text-secondary",
    "color-text-disabled",
    "color-text-placeholder",
    "color-text-action",
    "color-border",
    "color-border-hover",
    "color-border-focus",
    "color-border-disabled",
    "color-border-separator",
    "color-fill-hover",
    "color-fill-disabled",
    "color-surface-container",
    "color-icon-primary",
    "color-icon-secondary",
    "font-body-m",
    "font-body-s",
    "radius-sm",
    "radius-lg",
    "font-headline-s",
    "color-fill-subtle-disabled"
  ],
  "intro": "用于在可选集合与已选集合之间转移项目，支持手动确认与自动移动模式。",
  "sections": [
    {
      "id": "selection",
      "title": "选型",
      "paragraphs": ["当用户需要同时查看候选项和已选项并进行迁移时使用Transfer。少量选项的直接选择优先使用多选控件。"],
      "bullets": ["manual允许先勾选再确认移动；auto在勾选时立即移动。","items支持树形结构；searchable与pagination分别控制搜索和分页。"]
    },
    {
      "id": "structure",
      "title": "设计结构与排版",
      "paragraphs": ["modelValue保存目标侧叶子key数组；面板标题由titles设置。"],
      "bullets": ["默认页大小为6；pagination仅在manual模式中生效。","expandedKeys适用于树形数据的初始展开路径。","item与empty插槽可自定义行内容及空列表。"]
    },
    {
      "id": "interaction",
      "title": "交互与键盘",
      "paragraphs": ["选择操作更新checkedKeys；执行移动后change提供新目标值、移动方向和项目key。"],
      "bullets": ["输出按原始items数据顺序稳定排列，不按用户勾选顺序排序。","树形父项移动会包含可用叶子；禁用项不能移动。","search与page-change带有source/target侧别，供消费方分别处理。"]
    },
    {
      "id": "responsibility",
      "title": "使用边界与职责",
      "paragraphs": ["消费方提供稳定key与显示label，并持有目标值及可选的受控勾选状态。"],
      "bullets": [
        "modelValue省略时用defaultValue初始化非受控目标值；checkedKeys可单独受控。",
        "组件不负责查询远程数据或持久化选择结果。",
        "WorkbenchTransferPanel是辅助面板API，通常直接使用主组件。"
      ]
    }
  ],
  "related": [{"label":"穿梭框规范","href":"#rules"},{"label":"单侧面板API","href":"#family"}]
}
```

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "team-transfer",
  "title": "团队成员选择",
  "portability": "portable",
  "source": {
    "kind": "studio-official-usage",
    "ownerAssetId": "wb-transfer",
    "scenarioId": "transfer",
    "exampleId": "team-transfer",
    "codeSha256": "sha256:6050b7cdcbf3e2016570fbf085ef49b14a02cd8564f0fd8d2c11b58f5bb535b8"
  },
  "description": "受控的已选key数组和候选项本地定义。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { ref } from "vue"
import { WorkbenchTransfer } from "@workbench/ui-vue3"
const members = ref(['lin'])
const items = [{ key: 'lin', label: '林晓' }, { key: 'chen', label: '陈宁' }, { key: 'zhou', label: '周敏' }]
</script>
<template>
  <WorkbenchTransfer v-model="members" :items="items" :pagination="false" />
  <output>已选 {{ members.length }} 人</output>
</template>
```
