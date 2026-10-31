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
pnpm check:rules
pnpm smoke:fixtures
```

预览浏览器复用生产构建验证基础空白路由；smoke 使用开发模式，访问六个 `/templates/<name>` 路由并检查 Vue 警告、AI scope 和面板高度。两者均 headless。`pnpm smoke:fixtures` 显式启用独立 QA 进程的网络桩；`pnpm smoke` 用实际配置的服务。默认成功不写截图，`--evidence` 才保存证据，失败保留诊断。

开发使用 `pnpm dev`。两个组件包从 Skill 的 `vendor/` 安装；Vue 及其运行时/编译依赖固定为 3.5.13，Vite 配置 dedupe。样式在 `src/main.ts` 一次导入，顺序为 Workbench、TinyRobot 的公开 `dist/style.css`、AI UI，保证异步 AI 组件加载后样式仍一致。宿主通过 `--partner-ui-host-font-family` 提供批准字体，覆盖页面和 Teleport 弹层；此功能工程没有字体文件。

开发 mock 需要显式设置 `VITE_ENABLE_MOCKS=true`，并从独立 mock 模块注入业务接口。任何构建模式都拒绝启用 mock 标志及实际导入的 `src/**/mocks/` 或 `*.mock.*` 模块；未导入的 fixture 文件不会阻止构建。根维护仓库的 `pnpm verify:harness` 在隔离副本中实际验证这些失败路径，不修改交付入口。

单元测试通过 `.env.test` 明确开启 mock 标志，生产构建仍关闭。`pnpm verify` 串联类型、Lint、格式、规则、单测、生产构建和显式 QA smoke。构建输出 `route-chunks.json`，分别记录每路由的静态、动态及共享资源，观测 TinyRobot 所处位置，不以拆包文件数冒充首屏性能。

起步代码原件位于 Skill 的 `assets/scaffold/`，六份模板位于 `assets/templates/`；打包时分别复制到此工程 `src/scaffold/`、`src/templates/`，用 `@scaffold`、`@templates` 引用。产品宿主注入各模板的 typed API；此 harness 的 `.env.*` 配置与 HTTP/SSE 路径属于 assumed 验证契约，不能直接当作公司 API。历史持久化默认关闭。公司的平台接入、真实 API 和生产批准仍需要对应契约与验收。
