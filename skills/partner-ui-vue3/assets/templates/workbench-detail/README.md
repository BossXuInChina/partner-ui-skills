# 协议详情功能模块

原始视觉基线：`skills/partner-ui-pages/assets/templates/workbench-detail.html`。`Page.vue` 以预编译 Vue SFC 交付，公开组件从包根导入，布局与原业务交互保留。

```vue
<script setup lang="ts">
import Page from './workbench-detail/Page.vue';
import type { WorkbenchDetailApi } from './workbench-detail/api';
defineProps<{ api: WorkbenchDetailApi }>();
</script>

<template>
  <Page :api="api" />
</template>
```

## API 与数据

宿主在 API 闭包中绑定当前协议 ID。`load(signal)` 返回 `{ agreement, files, history }` 或 `null`（明确无数据）；`save(agreement, context)` / `renew(id, context)` 返回服务端完整 `AgreementDetail`；`copy(id, context)` 返回新协议，由宿主完成实际复制；`exportPdf(id, context)` 由宿主完成实际下载。

`agreement.updatedAt` 和 `agreement.renewalNotice` 是协议对象字段，非响应根字段。文件 `id/name/status` 为字符串，`size` 为非负有限数字；记录 `id/time/title` 为字符串。保留编辑/只读切换、必填校验、取消还原、跨页签保存、续签确认、附件及操作记录。保存和续签后采用服务端返回状态，不在客户端伪造审核结果。

## 接入边界

- `Page.vue` 的 `api` prop 必填；`api.ts` 是 **assumed** 类型契约，不代表公司后端已确认。Host 提供 URL、鉴权、权限、路由和实际下载能力；本模块不指定服务基址。
- `usePage.ts` 管理页面状态；`requests.ts` 在作用域释放时取消请求，阻止并发提交和迟到响应。失败后由用户显式重试，同一失败意图复用 `OperationContext.idempotencyKey`；后端应实际消费幂等键。
- HTTP 适配器应先调用导出的 decoder 校验 `unknown` 响应，再交给页面。错误显示集中在 `locale/zh-CN.ts`；业务内容来自 API。
- `mocks/` 仅提供原 HTML 的 seed 和显式注入的开发实现。生产 Page/composable 不导入 mocks；测试须显式设置 `VITE_ENABLE_MOCKS=true`，生产构建保持 mock guard 开启。
- 应用入口各引入一次 Workbench 和 AI UI 的公开样式，并引入共享 `feature-*` 布局样式。配置 `@scaffold` 指向交付 scaffold；不要复制组件内部 CSS 或重复导入样式。
- 不写浏览器持久化，不携带字体；宿主提供批准字体。包版本、来源和当前生产资格以交付 `source.lock.json` / vendor 元数据为准，此模板不改变组件包的资格。

## 定向验证

5 项组合式函数测试覆盖字段校验与取消快照、等待服务端与重复保存、续签确认及实际复制/导出调用、错误/无数据/离开取消、附件/记录/金额/状态 DTO 负例。

在附带 harness 中，显式启用开发测试数据后执行该目录 `__tests__`。页面根 `data-template-ready` 在初始加载时为 `false`，成功、明确错误或空数据后为 `true`，供宿主浏览器测试等待。独立打包、网络 fixture、浏览器交互和视觉比对由整体验证工程负责，不能用组合式函数测试代替。
