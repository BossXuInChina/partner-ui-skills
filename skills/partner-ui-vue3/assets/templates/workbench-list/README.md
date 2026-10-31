# 协议列表功能模块

原始视觉基线：`skills/partner-ui-pages/assets/templates/workbench-list.html`。`Page.vue` 以预编译 Vue SFC 交付，公开组件从包根导入，布局与原业务交互保留。

```vue
<script setup lang="ts">
import Page from './workbench-list/Page.vue';
import type { WorkbenchListApi } from './workbench-list/api';
defineProps<{ api: WorkbenchListApi }>();
</script>

<template>
  <Page :api="api" />
</template>
```

## API 与数据

`load(signal)` 返回完整 `Agreement[]`，当前过滤、排序、分页在客户端进行；如需服务端分页，必须修改此 assumed 契约与相应状态逻辑。`create(input, context)` 返回服务端生成的完整行；`renew(ids, context)` 返回实际更新行；`terminate(id, context)` 在服务端完成后移除行；`exportRows(rows, context)` 仅在真实导出完成后 resolve。`openDetail(row)` 由宿主导航。

保留草稿/应用过滤、状态筛选、金额与到期日排序、分页、跨页选择、新建必填校验、续签、终止确认及导出。新建/变更的结果以 API 返回为准。

## 接入边界

- `Page.vue` 的 `api` prop 必填；`api.ts` 是 **assumed** 类型契约，不代表公司后端已确认。Host 提供 URL、鉴权、权限、路由和实际下载能力；本模块不指定服务基址。
- `usePage.ts` 管理页面状态；`requests.ts` 在作用域释放时取消请求，阻止并发提交和迟到响应。失败后由用户显式重试，同一失败意图复用 `OperationContext.idempotencyKey`；后端应实际消费幂等键。
- HTTP 适配器应先调用导出的 decoder 校验 `unknown` 响应，再交给页面。错误显示集中在 `locale/zh-CN.ts`；业务内容来自 API。
- `mocks/` 仅提供原 HTML 的 seed 和显式注入的开发实现。生产 Page/composable 不导入 mocks；测试须显式设置 `VITE_ENABLE_MOCKS=true`，生产构建保持 mock guard 开启。
- 应用入口各引入一次 Workbench 和 AI UI 的公开样式，并引入共享 `feature-*` 布局样式。配置 `@scaffold` 指向交付 scaffold；不要复制组件内部 CSS 或重复导入样式。
- 不写浏览器持久化，不携带字体；宿主提供批准字体。包版本、来源和当前生产资格以交付 `source.lock.json` / vendor 元数据为准，此模板不改变组件包的资格。

## 定向验证

6 项组合式函数测试覆盖筛选排序分页与选择、创建校验与重复提交、批量变更与确认、失败重试幂等、失败导出不通知成功、离开取消与 DTO 负例。

在附带 harness 中，显式启用开发测试数据后执行该目录 `__tests__`。页面根 `data-template-ready` 在初始加载时为 `false`，成功、明确错误或空数据后为 `true`，供宿主浏览器测试等待。独立打包、网络 fixture、浏览器交互和视觉比对由整体验证工程负责，不能用组合式函数测试代替。
