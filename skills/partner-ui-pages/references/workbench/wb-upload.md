<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261031.1 (1255ff9747cef05c6558318547e69acbbf71b928) — do not edit. -->

# 文件上传 Upload — `WorkbenchUpload`

资产：`wb-upload` · 类型：`component` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261031.1` · commit：`1255ff9747cef05c6558318547e69acbbf71b928` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-UPLOAD-V1/upload?view=preview)

用于选择并管理文件记录，支持点击或拖拽入口、文本/精简/卡片列表。上传传输由消费方提供或显式提交。

公开入口：`@workbench/ui-vue3` → `WorkbenchUpload`

## 变体与状态

状态：`supported`。Studio controls, not public component props

[在 Studio 中查看](http://localhost:4173/preview/WB-UPLOAD-V1/upload?view=states)

| 分组 | 案例 | id | Studio |
| --- | --- | --- | --- |
| 组件状态 | 默认 | demoState-default | [案例](http://localhost:4173/preview/WB-UPLOAD-V1/upload?view=states) |
| 组件状态 | 悬浮 | demoState-hover | [案例](http://localhost:4173/preview/WB-UPLOAD-V1/upload?view=states) |
| 组件状态 | 激活 | demoState-active | [案例](http://localhost:4173/preview/WB-UPLOAD-V1/upload?view=states) |
| 组件状态 | 上传中 | demoState-uploading | [案例](http://localhost:4173/preview/WB-UPLOAD-V1/upload?view=states) |
| 组件状态 | 上传成功 | demoState-success | [案例](http://localhost:4173/preview/WB-UPLOAD-V1/upload?view=states) |
| 组件状态 | 上传失败 | demoState-error | [案例](http://localhost:4173/preview/WB-UPLOAD-V1/upload?view=states) |
| 组件状态 | 禁用 | demoState-disabled | [案例](http://localhost:4173/preview/WB-UPLOAD-V1/upload?view=states) |
| 组件状态 | 空列表 | demoState-empty | [案例](http://localhost:4173/preview/WB-UPLOAD-V1/upload?view=states) |
| 上传方式 | 点击上传 | mode-click | [案例](http://localhost:4173/preview/WB-UPLOAD-V1/upload?view=states) |
| 上传方式 | 拖拽上传 | mode-drag | [案例](http://localhost:4173/preview/WB-UPLOAD-V1/upload?view=states) |
| 文件列表 | 默认样式 | listType-text | [案例](http://localhost:4173/preview/WB-UPLOAD-V1/upload?view=states) |
| 文件列表 | 精简样式 | listType-compact | [案例](http://localhost:4173/preview/WB-UPLOAD-V1/upload?view=states) |
| 文件列表 | 卡片样式 | listType-card | [案例](http://localhost:4173/preview/WB-UPLOAD-V1/upload?view=states) |
| 精简列表背景 | 关闭 | background-false | [案例](http://localhost:4173/preview/WB-UPLOAD-V1/upload?view=states) |
| 精简列表背景 | 开启 | background-true | [案例](http://localhost:4173/preview/WB-UPLOAD-V1/upload?view=states) |
| 多文件上传 | 关闭 | multiple-false | [案例](http://localhost:4173/preview/WB-UPLOAD-V1/upload?view=states) |
| 多文件上传 | 开启 | multiple-true | [案例](http://localhost:4173/preview/WB-UPLOAD-V1/upload?view=states) |
| 首次上传失败演示 | 关闭 | simulateFailure-false | [案例](http://localhost:4173/preview/WB-UPLOAD-V1/upload?view=states) |
| 首次上传失败演示 | 开启 | simulateFailure-true | [案例](http://localhost:4173/preview/WB-UPLOAD-V1/upload?view=states) |

### Studio 案例值（不是 props 映射）

```json
[
  {
    "id": "demoState-default",
    "group": "组件状态",
    "label": "默认",
    "controls": {
      "demoState": "default",
      "mode": "click",
      "listType": "text",
      "background": false,
      "multiple": true,
      "simulateFailure": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-UPLOAD-V1/upload?view=states"
  },
  {
    "id": "demoState-hover",
    "group": "组件状态",
    "label": "悬浮",
    "controls": {
      "demoState": "hover",
      "mode": "click",
      "listType": "text",
      "background": false,
      "multiple": true,
      "simulateFailure": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-UPLOAD-V1/upload?view=states"
  },
  {
    "id": "demoState-active",
    "group": "组件状态",
    "label": "激活",
    "controls": {
      "demoState": "active",
      "mode": "click",
      "listType": "text",
      "background": false,
      "multiple": true,
      "simulateFailure": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-UPLOAD-V1/upload?view=states"
  },
  {
    "id": "demoState-uploading",
    "group": "组件状态",
    "label": "上传中",
    "controls": {
      "demoState": "uploading",
      "mode": "click",
      "listType": "text",
      "background": false,
      "multiple": true,
      "simulateFailure": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-UPLOAD-V1/upload?view=states"
  },
  {
    "id": "demoState-success",
    "group": "组件状态",
    "label": "上传成功",
    "controls": {
      "demoState": "success",
      "mode": "click",
      "listType": "text",
      "background": false,
      "multiple": true,
      "simulateFailure": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-UPLOAD-V1/upload?view=states"
  },
  {
    "id": "demoState-error",
    "group": "组件状态",
    "label": "上传失败",
    "controls": {
      "demoState": "error",
      "mode": "click",
      "listType": "text",
      "background": false,
      "multiple": true,
      "simulateFailure": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-UPLOAD-V1/upload?view=states"
  },
  {
    "id": "demoState-disabled",
    "group": "组件状态",
    "label": "禁用",
    "controls": {
      "demoState": "disabled",
      "mode": "click",
      "listType": "text",
      "background": false,
      "multiple": true,
      "simulateFailure": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-UPLOAD-V1/upload?view=states"
  },
  {
    "id": "demoState-empty",
    "group": "组件状态",
    "label": "空列表",
    "controls": {
      "demoState": "empty",
      "mode": "click",
      "listType": "text",
      "background": false,
      "multiple": true,
      "simulateFailure": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-UPLOAD-V1/upload?view=states"
  },
  {
    "id": "mode-click",
    "group": "上传方式",
    "label": "点击上传",
    "controls": {
      "demoState": "default",
      "mode": "click",
      "listType": "text",
      "background": false,
      "multiple": true,
      "simulateFailure": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-UPLOAD-V1/upload?view=states"
  },
  {
    "id": "mode-drag",
    "group": "上传方式",
    "label": "拖拽上传",
    "controls": {
      "demoState": "default",
      "mode": "drag",
      "listType": "text",
      "background": false,
      "multiple": true,
      "simulateFailure": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-UPLOAD-V1/upload?view=states"
  },
  {
    "id": "listType-text",
    "group": "文件列表",
    "label": "默认样式",
    "controls": {
      "demoState": "default",
      "mode": "click",
      "listType": "text",
      "background": false,
      "multiple": true,
      "simulateFailure": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-UPLOAD-V1/upload?view=states"
  },
  {
    "id": "listType-compact",
    "group": "文件列表",
    "label": "精简样式",
    "controls": {
      "demoState": "default",
      "mode": "click",
      "listType": "compact",
      "background": false,
      "multiple": true,
      "simulateFailure": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-UPLOAD-V1/upload?view=states"
  },
  {
    "id": "listType-card",
    "group": "文件列表",
    "label": "卡片样式",
    "controls": {
      "demoState": "default",
      "mode": "click",
      "listType": "card",
      "background": false,
      "multiple": true,
      "simulateFailure": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-UPLOAD-V1/upload?view=states"
  },
  {
    "id": "background-false",
    "group": "精简列表背景",
    "label": "关闭",
    "controls": {
      "demoState": "default",
      "mode": "click",
      "listType": "text",
      "background": false,
      "multiple": true,
      "simulateFailure": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-UPLOAD-V1/upload?view=states"
  },
  {
    "id": "background-true",
    "group": "精简列表背景",
    "label": "开启",
    "controls": {
      "demoState": "default",
      "mode": "click",
      "listType": "text",
      "background": true,
      "multiple": true,
      "simulateFailure": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-UPLOAD-V1/upload?view=states"
  },
  {
    "id": "multiple-false",
    "group": "多文件上传",
    "label": "关闭",
    "controls": {
      "demoState": "default",
      "mode": "click",
      "listType": "text",
      "background": false,
      "multiple": false,
      "simulateFailure": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-UPLOAD-V1/upload?view=states"
  },
  {
    "id": "multiple-true",
    "group": "多文件上传",
    "label": "开启",
    "controls": {
      "demoState": "default",
      "mode": "click",
      "listType": "text",
      "background": false,
      "multiple": true,
      "simulateFailure": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-UPLOAD-V1/upload?view=states"
  },
  {
    "id": "simulateFailure-false",
    "group": "首次上传失败演示",
    "label": "关闭",
    "controls": {
      "demoState": "default",
      "mode": "click",
      "listType": "text",
      "background": false,
      "multiple": true,
      "simulateFailure": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-UPLOAD-V1/upload?view=states"
  },
  {
    "id": "simulateFailure-true",
    "group": "首次上传失败演示",
    "label": "开启",
    "controls": {
      "demoState": "default",
      "mode": "click",
      "listType": "text",
      "background": false,
      "multiple": true,
      "simulateFailure": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-UPLOAD-V1/upload?view=states"
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
      "id": "active",
      "label": "激活"
    },
    {
      "id": "uploading",
      "label": "上传中"
    },
    {
      "id": "success",
      "label": "上传成功"
    },
    {
      "id": "error",
      "label": "上传失败"
    },
    {
      "id": "disabled",
      "label": "禁用"
    },
    {
      "id": "empty",
      "label": "空列表"
    }
  ],
  "controls": [
    {
      "id": "mode",
      "label": "上传方式",
      "type": "select",
      "default": "click",
      "options": [
        {
          "value": "click",
          "label": "点击上传"
        },
        {
          "value": "drag",
          "label": "拖拽上传"
        }
      ]
    },
    {
      "id": "listType",
      "label": "文件列表",
      "type": "select",
      "default": "text",
      "options": [
        {
          "value": "text",
          "label": "默认样式"
        },
        {
          "value": "compact",
          "label": "精简样式"
        },
        {
          "value": "card",
          "label": "卡片样式"
        }
      ]
    },
    {
      "id": "background",
      "label": "精简列表背景",
      "type": "boolean",
      "default": false
    },
    {
      "id": "multiple",
      "label": "多文件上传",
      "type": "boolean",
      "default": true
    },
    {
      "id": "simulateFailure",
      "label": "首次上传失败演示",
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
          "value": "active",
          "label": "激活"
        },
        {
          "value": "uploading",
          "label": "上传中"
        },
        {
          "value": "success",
          "label": "上传成功"
        },
        {
          "value": "error",
          "label": "上传失败"
        },
        {
          "value": "disabled",
          "label": "禁用"
        },
        {
          "value": "empty",
          "label": "空列表"
        }
      ],
      "intent": "state",
      "presentation": "state-buttons"
    },
    {
      "id": "mode",
      "label": "上传方式",
      "type": "select",
      "default": "click",
      "options": [
        {
          "value": "click",
          "label": "点击上传"
        },
        {
          "value": "drag",
          "label": "拖拽上传"
        }
      ]
    },
    {
      "id": "listType",
      "label": "文件列表",
      "type": "select",
      "default": "text",
      "options": [
        {
          "value": "text",
          "label": "默认样式"
        },
        {
          "value": "compact",
          "label": "精简样式"
        },
        {
          "value": "card",
          "label": "卡片样式"
        }
      ]
    },
    {
      "id": "background",
      "label": "精简列表背景",
      "type": "boolean",
      "default": false
    },
    {
      "id": "multiple",
      "label": "多文件上传",
      "type": "boolean",
      "default": true
    },
    {
      "id": "simulateFailure",
      "label": "首次上传失败演示",
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
      "id": "demoState-active",
      "label": "演示状态 · 激活",
      "controls": {
        "demoState": "active"
      }
    },
    {
      "id": "demoState-uploading",
      "label": "演示状态 · 上传中",
      "controls": {
        "demoState": "uploading"
      }
    },
    {
      "id": "demoState-success",
      "label": "演示状态 · 上传成功",
      "controls": {
        "demoState": "success"
      }
    },
    {
      "id": "demoState-error",
      "label": "演示状态 · 上传失败",
      "controls": {
        "demoState": "error"
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
      "id": "demoState-empty",
      "label": "演示状态 · 空列表",
      "controls": {
        "demoState": "empty"
      }
    },
    {
      "id": "mode-click",
      "label": "上传方式 · 点击上传",
      "controls": {
        "mode": "click"
      }
    },
    {
      "id": "mode-drag",
      "label": "上传方式 · 拖拽上传",
      "controls": {
        "mode": "drag"
      }
    },
    {
      "id": "listType-text",
      "label": "文件列表 · 默认样式",
      "controls": {
        "listType": "text"
      }
    },
    {
      "id": "listType-compact",
      "label": "文件列表 · 精简样式",
      "controls": {
        "listType": "compact"
      }
    },
    {
      "id": "listType-card",
      "label": "文件列表 · 卡片样式",
      "controls": {
        "listType": "card"
      }
    },
    {
      "id": "background-true",
      "label": "精简列表背景 · 开启",
      "controls": {
        "background": true
      }
    },
    {
      "id": "background-false",
      "label": "精简列表背景 · 关闭",
      "controls": {
        "background": false
      }
    },
    {
      "id": "multiple-true",
      "label": "多文件上传 · 开启",
      "controls": {
        "multiple": true
      }
    },
    {
      "id": "multiple-false",
      "label": "多文件上传 · 关闭",
      "controls": {
        "multiple": false
      }
    },
    {
      "id": "simulateFailure-true",
      "label": "首次上传失败演示 · 开启",
      "controls": {
        "simulateFailure": true
      }
    },
    {
      "id": "simulateFailure-false",
      "label": "首次上传失败演示 · 关闭",
      "controls": {
        "simulateFailure": false
      }
    }
  ]
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：文件上传 Upload相关交互与状态展示

**不适用**：未经独立生产接入与设计验收直接用于生产交付

官方来源 SFC：supported。

### 示例：手动提交文件

id：`manual-upload` · portability：`portable` · owner：`wb-upload`

选择与传输分开：例子保留ready记录，不依赖未定义服务或模拟成功。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { ref } from "vue"
import { WorkbenchUpload } from "@workbench/ui-vue3"
const files = ref([])
</script>
<template>
  <WorkbenchUpload v-model="files" mode="click" list-type="text" :auto-upload="false" label="附件" />
  <output>{{ files.length }} 个已选择文件</output>
</template>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-UPLOAD-V1/upload?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| accept | String | .doc,.xlsx,.pdf |  | 文件选择器可接受的扩展名或MIME约束。 |
| autoUpload | Boolean | true |  | 选择后是否自动发起传输。 |
| background | Boolean |  |  | 是否显示文件组背景。 |
| beforeUpload | Function | {"kind":"undefined"} |  | 上传前同步或异步准入判断入口。 |
| customRequest | Function | {"kind":"undefined"} |  | 消费方提供并返回传输结果的异步函数，接收{ file, record, signal, loaded, onProgress }；onProgress可接收百分比数字或{ loaded, total }。无函数时不模拟成功。 |
| disabled | Boolean |  |  | 禁用文件选择及文件操作。 |
| hint | String | {"kind":"undefined"} |  | 上传入口的辅助说明文案。 |
| label | String | 文件上传 |  | 上传控件的可访问名称。 |
| limit | Number | 0 |  | 文件数量上限；0表示不限制。 |
| listType | String | text | text / compact / card | text、compact或card列表样式。 |
| maxSize | Number | {"kind":"unknown","expression":"5 * 1024 * 1024"} |  | 单文件最大字节数。 |
| mode | String | click | click / drag | click或drag上传入口。 |
| modelValue | Array | {"kind":"function"} |  | 受控文件记录数组；每条记录应提供稳定id。 |
| multiple | Boolean | true |  | 是否允许一次选择多个文件。 |
| previewState | String | default |  | Studio状态演示参数，不代表业务状态存储。 |
| showTrigger | Boolean | true |  | 是否显示选择文件入口。 |

### Events

- `update:modelValue`：新的文件记录数组。；选择、状态更新或移除记录后同步发出。

- `change`：更新后的文件记录数组。；文件集合或记录状态变化时发出。

- `select`：逐个文件发出规范化记录，包含id、name、size、type、raw、status及percentage。；每个文件通过校验并加入列表后发出。

- `progress`：单个更新后的文件记录，percentage字段表示当前进度。；传输回调报告进度时发出。

- `success`：(record, result)：上传完成的文件记录及customRequest返回值。；customRequest成功完成时发出。

- `error`：(error, record)：传输错误对象及更新为失败状态的文件记录。；传输失败时发出。

- `reject`：{ file, reason, message }。；文件不符合准入规则时发出。

- `remove`：被移除的文件记录。；用户移除文件时发出。

- `pause`：暂停的文件记录。；上传任务暂停时发出。

- `resume`：继续上传的文件记录。；上传任务继续时发出。

- `preview`：待预览文件记录。；用户触发预览操作时发出。

- `download`：请求下载的文件记录。；用户激活下载操作时发出。

### 实例成员

- `selectFiles(source?: Iterable<File> | ArrayLike<File> | null): Promise<void>;`

- `submit(): Promise<void[]> | undefined;`

- `pause(file: {id: string | number; status?: string}): void;`

- `resume(file: {id: string | number}): void;`

- `retry(file: {id: string | number}): void;`

- `remove(file: {id: string | number}): void;`

### 同族导出：`WorkbenchUploadFileItem`

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| background | Boolean |  |  |  |
| disabled | Boolean |  |  |  |
| listType | String | text |  |  |
| previewState | String | default |  |  |

### Events

- `remove`

- `retry`

- `pause`

- `resume`

- `preview`

- `download`

### 同族导出：`WorkbenchUploadFileList`

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| background | Boolean |  |  |  |
| disabled | Boolean |  |  |  |
| files | Array | {"kind":"function"} |  |  |
| label | String | 附件列表 |  |  |
| listType | String | text |  |  |
| previewState | String | default |  |  |

### Events

- `remove`

- `retry`

- `pause`

- `resume`

- `preview`

- `download`

### 规则

包内未提供规则；不补写设计结论。

### 组件依赖

`wb-button`

### Foundation 引用

`color-text-primary`、`color-text-secondary`、`color-text-disabled`、`color-text-action`、`color-border`、`color-border-focus`、`color-fill-hover`、`color-surface-container`、`color-error`、`color-success`、`font-body-m`、`font-body-s`、`radius-sm`

### 选型

根据页面空间选择click或drag模式，并用listType选择text、compact或card列表。

- 需要图片缩略图网格时使用WorkbenchImageUpload。

- 文件扩展名图形由独立WorkbenchFileIcon资源组件提供。

### 设计结构与排版

WorkbenchUpload管理受控文件数组；单个文件记录包含稳定id、名称、大小、状态等字段。

- drag模式默认展示card列表；compact适合行内附件展示。

- limit为0表示不限制数量；展示用文件组数量不构成业务数量规则。

- 文件行的预览和下载操作由消费方处理。

### 交互与键盘

无transport时选择文件只产生ready记录并发出select，不模拟上传成功。

- customRequest负责传输；进度通过onProgress反馈。

- 上传中支持暂停、继续或取消；失败后可重试；删除或卸载会中止请求。

- beforeUpload用于上传前校验；拒绝项通过reject事件说明。

### 使用边界与职责

消费方负责服务端上传、鉴权、断点续传以及成功后的预览和下载处理。

- 暂停会中止当前请求，继续时重新调用customRequest并传入已传输量；真正断点续传由服务实现。

- 组件不擅自打开外部预览或下载地址。

- WorkbenchUpload、WorkbenchUploadFileItem/List及WorkbenchFileIcon资格和公开入口各自独立，勿以Studio演示替代正式API。

### 包内关联引用

```json
[
  {
    "label": "文件上传批准规范",
    "href": "#rules"
  },
  {
    "label": "文件图标资源",
    "href": "/preview/upload?view=icons"
  },
  {
    "label": "文件行与列表API",
    "href": "#family"
  }
]
```
