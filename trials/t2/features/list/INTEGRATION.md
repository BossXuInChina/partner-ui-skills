# list 接入起点

此目录未安装依赖、未改宿主配置，所有检查均未运行。工具脚本可在Node22.12执行；附带pnpm11.22验证工程实际需要Node22.13+，产品遵循自身工具链约定。按宿主已有 router/store/transport/i18n/测试约定接入；API 契约在 pages/workbench-list/api.ts，当前为 assumed。真实 URL/鉴权/decoder/幂等与权限由宿主实现并注入，不能直接使用 harness 的验证端点。

## 文件与路由

从本模块 index.ts 导入 createFeatureRoutes(api)，把返回记录接入宿主 router；Page 按需加载，路由为 /list。Page 可通过 loadFeaturePage() 动态加载后直接组合使用。不要静态导入整个 AI 页面来替代懒路由。

已复制所选模板的源码、单测和 mocks，仅递归复制实际需要的 scaffold。@scaffold 引用已改成模块内相对路径，不要求宿主增加或覆盖同名全局 alias。feature-dom.d.ts 仅声明标准 data-* DOM 属性；确保宿主 tsconfig 包含本目录。生产入口不导入 mocks 或测试；测试数据必须明确启用，产品构建需保留等价 mock guard。

index.ts 引入 styles/layout.css。应用入口各导入一次 Workbench CSS；需要 AI 的实际调用顺序参见 Skill integration.md。字体由宿主通过 --partner-ui-host-font-family 提供，功能无字体。

## 依赖与来源

依赖安装位置由宿主确定，工具不会执行安装。以下 tarball 来自原 Skill 的 vendor/，未复制进本功能：

- @workbench/ui-vue3@0.2.0-prototype.20261031.1: file:<Skill根>/vendor/workbench-ui-vue3-0.2.0-prototype.20261031.1.tgz; SHA-256 ec8ed28188210781fe9d8aab582e41f736a99efc0740a8f6e79deb94e98ba82a
- huawei-partner-ai-ui@0.3.1-dev.20261031.1: file:<Skill根>/vendor/huawei-partner-ai-ui-0.3.1-dev.20261031.1.tgz; SHA-256 69045605688b022f114788274991a36f3910eeadd92f876e5407b5b7f2cf75d7

Vue 目标3.5.13；router使用宿主的vue-router 4，Vue peer范围见delivery.json。直接使用TinyRobot组件/类型的功能须在产品声明@opentiny/tiny-robot@0.5.1；当前scaffold关闭按钮使用其公开TrActionButton。不要依赖传递依赖恰好可解析。API/测试按实际消费还需要Vue、Vitest、@vue/test-utils和宿主现有SFC构建工具。

交付草稿的 source.file 按原 Skill 锁根解析（scope=skill-lock），不声称本目录已经包含或安装tarball。宿主vendor并安装后更新真实位置、resolved Vue和单实例证据。

## 验证后更新清单

用宿主实际命令完成类型、Lint、规则、单测、构建及headless smoke；check_vue.mjs可对本目录运行。先确认业务加载/空/错误/取消/防重/显式重试和键盘路径。

若沿用附带routeChunkReport，在验证工程副本配置实际位置，例如 routes:[{route:'/list',file:'src/features/list/pages/workbench-list/Page.vue',business:true}]；不要保留默认六路归因来验证单个模块。插件不在本次生成物中复制。

记录实际路由静态/动态/共享闭包与TinyRobot位置，再把delivery.json的not-run/null改为真实结果；当前API、平台、视觉对照与生产资格均未验证。DELIVERY.md须从更新后的delivery.json重新生成，保持一致。
