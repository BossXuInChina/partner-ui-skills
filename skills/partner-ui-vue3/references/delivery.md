# 功能模块与交付清单

用于交付可维护 Vue 代码；在已有产品仓库中，沿用其目录、路由、HTTP 客户端、状态管理、文案和测试约定。以下是新功能的默认结构，按实际需求取用，不能为填满目录新增无用代码。

```text
src/features/<feature>/
  index.ts                    功能公开入口
  routes.ts                   懒加载页面、AI target 到路由的有限映射
  pages/<Page>.vue            script setup + TypeScript，组合与布局
  components/<Block>.vue      包中缺少的业务组件
  composables/use<Page>.ts    状态、取消、提交防重、显式重试
  api/client.ts               注入 transport/配置的 typed API
  api/types.ts                provided 或 assumed DTO
  ai/                        按需加载的 adapter、SFC renderers
  mocks/                     显式开发入口或测试使用
  locale/zh-CN.ts             或产品已有 i18n
  __tests__/                 状态与接口行为测试
  delivery.json              机器清单
  DELIVERY.md                从机器清单导出的人读摘要
```

复制模板时保留 `Page.vue`、`usePage.ts`、`api.ts`、`types.ts` 等相邻模块也可以。`assets/templates/` 的六份模板都要求宿主注入 API；`assets/scaffold/` 是可复制的产品辅助代码，不是组件库源码。共享状态、公共入口和 alias 由宿主接入，见 [integration.md](integration.md)。

## delivery.json 契约

清单以实际交付文件、锁定包和本次验证为依据。所有下列顶层字段必需；不适用的集合为 `[]`，未测数据为 `null` 并说明原因，不能填 `0` 或假设通过。

| 字段                                     | 必需内容与口径                                                                                                                                                                                                                                                                                      |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `feature`, `skillVersion`, `generatedAt` | 功能标识、实际 Skill 交付版本、ISO 8601 UTC 时间；Skill 尚无独立版本声明时 `skillVersion: null` 并列入限制，不把组件版本、`source.lock.runtimeVersion` 或维护工具版本当 Skill 版本。                                                                                                                |
| `packages[]`                             | 每个消费包的 `name`、`version`、`source`、完整 `sourceCommit`、`sourceHasLocalChanges`、`status`。tarball 来源记录文件及实际 SHA-256；registry 来源记录 registry、包名/版本及可核实的 integrity。Git 身份未知保留 `null`，不借宿主仓身份。`status` 只转录包元数据的原有资格声明；未声明不补成批准。 |
| `vue`                                    | `peerRequired`（按包分别记录）、实际 `resolved`、安装树与打包/浏览器证据支持的 `singleInstance`。未验证用 `null`，不能仅凭 overrides 写 `true`。                                                                                                                                                    |
| `pages[]`                                | `{route, file, components[]}`，路由与文件对应实际公开入口；组件记录公开导出名。                                                                                                                                                                                                                     |
| `customComponents[]`                     | `{name, file, reason, suggestedPackageComponent}`；没有合适包组件时说明理由，替代候选没有则 `null`。                                                                                                                                                                                                |
| `api[]`                                  | `{name, method, path, status}`；`status` 仅 `provided` / `assumed`。未确认路径用 `null`，不能把 harness 路径描述成公司 API。可附契约文档、鉴权与取消说明。                                                                                                                                          |
| `requirements[]`                         | `{id, text, files[], status}`；`status` 仅 `done` / `assumed` / `to-confirm`，并附必要证据。实现了 assumed API 的调用不等于真实接口接入完成。                                                                                                                                                       |
| `checks[]`                               | `{name, command, result, durationMs}`；注明本次真实范围、时间和证据路径。未运行用 `not-run` / `null`；定向通过不写为完整通过。                                                                                                                                                                      |
| `bundle`                                 | `{routeChunksKb[], notes}`；逐路由记录入口、静态/动态闭包、共享 chunk 与字节口径，可附原始报告路径。无测量保留 `null`。                                                                                                                                                                             |
| `knownLimits[]`                          | 未验证目标平台、API、浏览器范围、性能归因、生产资格及其他实际限制。                                                                                                                                                                                                                                 |

`sourceHasLocalChanges` 从包内 stamp 复制；无法取得为 `null`。校验 tarball SHA 与包内版本/commit 均和 `source.lock.json` 一致。不能从包外工作目录推测其来源，也不读取维护仓内部补资料。

下面是**结构示例**：包身份来自当前锁，检查及体积故意标为未运行。复制后必须替换功能、文件、时间和本次证据；它不是一次已完成交付的记录。

```json
{
  "feature": "partner-dashboard",
  "skillVersion": null,
  "generatedAt": "2026-10-31T00:00:00.000Z",
  "packages": [
    {
      "name": "@workbench/ui-vue3",
      "version": "0.2.0-prototype.20261031.1",
      "source": {
        "kind": "tarball",
        "file": "vendor/workbench-ui-vue3-0.2.0-prototype.20261031.1.tgz",
        "sha256": "4d933ca4a8d2a0a6f421f7141c6d6250eb4ba2b7b394018bd80044d3e95acdbf"
      },
      "sourceCommit": "1255ff9747cef05c6558318547e69acbbf71b928",
      "sourceHasLocalChanges": false,
      "status": {
        "channel": "development",
        "developmentEligible": true,
        "stableEligible": false,
        "targetProductionEligible": false
      }
    },
    {
      "name": "huawei-partner-ai-ui",
      "version": "0.3.1-dev.20261031.1",
      "source": {
        "kind": "tarball",
        "file": "vendor/huawei-partner-ai-ui-0.3.1-dev.20261031.1.tgz",
        "sha256": "02a88ac3fa07f1bd78fe725562ea9a2ddf39d3b2ed512b5194dd970dbd8ce153"
      },
      "sourceCommit": "5911a7dbcd15854eabacc4f3679a6100c400dd5f",
      "sourceHasLocalChanges": false,
      "status": {}
    }
  ],
  "vue": {
    "peerRequired": {
      "@workbench/ui-vue3": ">=3.5.13 <=3.5.42",
      "huawei-partner-ai-ui": ">=3.5.13 <=3.5.42"
    },
    "resolved": "3.5.13",
    "singleInstance": null
  },
  "pages": [
    {
      "route": "/dashboard",
      "file": "pages/DashboardPage.vue",
      "components": [
        "WorkbenchMetricCard",
        "WorkbenchTabs",
        "WorkspaceSmartCard"
      ]
    }
  ],
  "customComponents": [
    {
      "name": "SalesTrend",
      "file": "components/SalesTrend.vue",
      "reason": "业务销售额与目标率组合图，使用 Token 的 SVG；本交付未接入产品图表库",
      "suggestedPackageComponent": null
    }
  ],
  "api": [
    {
      "name": "loadDashboard",
      "method": "GET",
      "path": null,
      "status": "assumed"
    }
  ],
  "requirements": [
    {
      "id": "R1",
      "text": "展示经营指标并切换六个月/十二个月趋势",
      "files": ["pages/DashboardPage.vue", "composables/useDashboard.ts"],
      "status": "to-confirm"
    }
  ],
  "checks": [
    {
      "name": "typecheck",
      "command": "pnpm typecheck",
      "result": "not-run",
      "durationMs": null
    }
  ],
  "bundle": {
    "routeChunksKb": [
      {
        "route": "/dashboard",
        "entryFiles": [],
        "staticKb": null,
        "dynamicKb": null,
        "sharedFiles": []
      }
    ],
    "notes": ["未构建；KB 约定为未压缩 rawBytes / 1024，不是网络传输或运行时间"]
  },
  "knownLimits": [
    "当前独立 Skill 尚无版本声明；skillVersion 保持 null",
    "当前 AI UI release 元数据没有生产资格声明",
    "目标平台、真实 API、单 Vue 实例和整体验证尚未确认；没有生产批准"
  ]
}
```

## 验证与摘要

按 [testing.md](testing.md) 记录类型、lint、规则、单测、构建和 headless smoke；转换任务另记录原 HTML 与 SFC 的视觉比对。`route-chunks.json` 记录未压缩产物图：静态、动态与应用入口闭包分别计数，共享 chunk 不跨路由相加。保留 TinyRobot 实际落在业务路由闭包中的发现；懒加载声明不等于包内依赖已分离。体积报告不代替加载性能测试。

`DELIVERY.md` 从 `delivery.json` 导出功能/页面、自定义组件、API 假设、检查结论、体积与已知限制；不要手写第二套状态。当前没有专用清单生成器，可在交付步骤按字段生成该摘要，确保两份一致。

区分三件事：本地模块检查通过、目标平台与真实 API 验收、生产发布批准。清单只能记录各自实际证据，不能相互替代。发布频率由用户决定。
