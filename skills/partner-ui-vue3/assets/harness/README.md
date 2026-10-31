# Vue 功能验证工程

从独立 Skill 的 `assets/harness` 目录执行：

```sh
pnpm install --frozen-lockfile
pnpm typecheck
pnpm lint
pnpm format:check
pnpm test:unit
pnpm build
pnpm test:browser
```

浏览器检查复用生产构建，通过本地 preview 验证空白路由，保持 headless。开发使用 `pnpm dev`。两个组件包从 Skill 的 `vendor/` 安装；Vue 和其运行时/编译依赖固定为 3.5.13，Vite 同时配置 dedupe。包样式只在 `src/main.ts` 各导入一次；宿主提供批准字体。

开发 mock 需要显式设置 `VITE_ENABLE_MOCKS=true`，并从独立 mock 模块注入业务接口。任何构建模式都拒绝启用 mock 标志及实际导入的 `src/**/mocks/` 或 `*.mock.*` 模块；未导入的 fixture 文件不会阻止构建。根维护仓库的 `pnpm verify:harness` 在隔离副本中实际验证这些失败路径，不修改交付入口。

此工程用于功能验证。产品模块起步代码原件位于 Skill 的 `assets/scaffold/`，打包时复制到此工程 `src/scaffold/`，由 `@scaffold` 别名供测试使用。给产品时把起步代码复制进功能模块，由产品维护；修改原件后需要同步验证副本。业务模板随后加入，公司的平台接入、真实 API 和生产批准需要对应契约与验收。
