# 工作台概览功能模块

原始视觉基线：`skills/partner-ui-pages/assets/templates/workbench-dashboard.html`。`Page.vue` 以预编译 Vue SFC 交付，公开组件从包根导入，布局与原业务交互保留。

```vue
<script setup lang="ts">
import Page from './workbench-dashboard/Page.vue';
import type { WorkbenchDashboardApi } from './workbench-dashboard/api';
defineProps<{ api: WorkbenchDashboardApi }>();
</script>

<template>
  <Page :api="api" />
</template>
```

## API 与数据

`load(signal)` 返回 `DashboardData`；`perform(action, context)` 接收报表、全部待办、单项处理、应用和 AI 导航等类型化意图。宿主维护目标到权限、路由或服务动作的映射，业务组件不执行任意 URL。

`expiringAgreements` / `expiryWindowDays` 在响应根字段，名称、指标、更新时间、建议、待办和公告均来自响应。decoder 校验所有被页面消费的数组项、图表有限数值及等长序列、枚举和导航参数。`approvedDashboardIcons` 是从当前锁定包公开 `icons.json` 核实的 9 个本模板名称；宿主须映射到此子集，扩展时先核实当前锁定包。未知图标进入错误态，不把整个图标注册表带入业务路由。

保留 6/12 月切换、待办分类、禁用快捷应用、智慧洞察及公告。SVG 是原模板业务图表，使用包 Token；暂未接入 TinyVue 图表。所有操作成功提示都等待宿主 API resolve。

## 接入边界

- `Page.vue` 的 `api` prop 必填；`api.ts` 是 **assumed** 类型契约，不代表公司后端已确认。Host 提供 URL、鉴权、权限、路由和实际下载能力；本模块不指定服务基址。
- `usePage.ts` 管理页面状态；`requests.ts` 在作用域释放时取消请求，阻止并发提交和迟到响应。失败后由用户显式重试，同一失败意图复用 `OperationContext.idempotencyKey`；后端应实际消费幂等键。
- HTTP 适配器应先调用导出的 decoder 校验 `unknown` 响应，再交给页面。错误显示集中在 `locale/zh-CN.ts`；业务内容来自 API。
- `mocks/` 仅提供原 HTML 的 seed 和显式注入的开发实现。生产 Page/composable 不导入 mocks；测试须显式设置 `VITE_ENABLE_MOCKS=true`，生产构建保持 mock guard 开启。
- 应用入口各引入一次 Workbench 和 AI UI 的公开样式，并引入共享 `feature-*` 布局样式。配置 `@scaffold` 指向交付 scaffold；不要复制组件内部 CSS 或重复导入样式。
- 不写浏览器持久化，不携带字体；宿主提供批准字体。包版本、来源和当前生产资格以交付 `source.lock.json` / vendor 元数据为准，此模板不改变组件包的资格。

## 定向验证

5 项组合式函数测试覆盖两档图表及待办过滤、类型化导航与禁用应用、真实失败和空图表、离开取消、所有数组项/图标/枚举/数值 decoder 负例。

在附带 harness 中，显式启用开发测试数据后执行该目录 `__tests__`。页面根 `data-template-ready` 在初始加载时为 `false`，成功、明确错误或空数据后为 `true`，供宿主浏览器测试等待。独立打包、网络 fixture、浏览器交互和视觉比对由整体验证工程负责，不能用组合式函数测试代替。
