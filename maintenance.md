# 维护与升级

发布频率由用户决定。组件参考和图库只消费发布 tarball，维护仓是组件事实源头；消费资料不能反向成为组件 API 真值。按需运行时额外使用 `build/components/sources.lock.json` 声明的源码补充归档：自有包严格对应干净发布的 sourceCommit，TinyRobot 对应 npm 发布记录的 gitHead。归档校验后只在本仓缓存中编译，不读取兄弟 checkout 的实时工作树。

## 升级一次包

1. 在包维护流程完成变更、门禁与干净构建，取得公开 tarball。由发布元数据核对包名、版本、完整 sourceCommit、sourceHasLocalChanges 和资格；未知保持未知，不改成批准。把批准用于本批消费的 tarball 放入本仓 vendor，记录实际 SHA-256。
2. 同步 source.lock.json 的包路径、版本、SHA、完整 commit 和受控 buildDate；若 schema 改变，同时核对两包公开 schema 原始字节和 pin。同步根依赖和 harness 的 file 路径，更新锁文件后再冻结安装。不要读取维护仓源码来填消费缺口。
3. 先运行 pnpm verify:lock，再 pnpm generate。评审 API、Token、图标、案例、资格、SFC 示例及图库差异；controls 不是 props，缺失或不支持必须保留原因。生成文件不手改。
4. 执行 pnpm test、pnpm test:templates、pnpm verify:harness、pnpm build，按实际影响补包消费或浏览器检查；不删除断言或用定向通过冒充全量。运行完整 pnpm 工程当前需 Node22.13+；22.12声明差异仍待工具链项统一。
5. 在三个全新消费会话重跑 T1–T3：协议 PRD→列表/详情/助手、两份 partner-ui-pages 原型→SFC、Pinia+axios+@alias+vue-i18n 现仓接入。仅使用当前独立 Skill 与目标仓。旧试验的来源锁不符时应拒绝复跑；为新包建立新的试验输入快照并适配，保留旧收据，不把改锁当作验收。完成类型/Lint/规则/单测/构建、相关 headless 行为、两尺寸 smoke；转换另做原型对照。修订绊点文档后复测。
6. 为各功能更新真实 delivery.json，并从它生成人读 DELIVERY.md。文件路径、实际验证路由、包来源、耗时和限制逐项核对；未测保留 null 与原因，不把 QA 网络桩称为真实服务。
7. 按变更更新各 Skill 的 skill.json 与 CHANGELOG.md；Skill版本、组件包版本和原型 runtimeVersion 独立管理。运行 pnpm package:release，得到三份带 Skill 版本的 ZIP 与 dist/release-manifest.json。校验 ZIP 中的 Skill 名称/版本、来源锁及 tar SHA；版本归档必须与普通构建归档字节相同。旧清单只属于对应字节。
8. 向用户交付本地候选归档、清单和实际验证结论。外部上传、推送、注册表发布或生产资格变更由当次授权决定，本命令不执行这些动作。

## 独立交付使用者

在完整 Skill 根查看 skill.json、source.lock.json 和 vendor。新建复杂原型默认使用 partner-ui-pages 的 JS 项目模式（Node 22.12+、无 npm install），旧离线模板仍可用；Vue 功能在 assets/harness 冻结安装（保留 workspace/vendor 相对布局）后验证。维护源仓的 package:release 与 T1–T3 位于独立 partner-ui-skills 仓，不要求业务项目复制整套维护工具。

JS 项目工具维护在 Pages/scripts/project，生成编译器和公开 API 索引由 build/project-assets.mjs 管理。修改后执行 pnpm test:projects；它包含独立消费、依赖闭包、失败路径及两种 file:// 交付的实际浏览器旅程。再执行根测试、旧 HTML 模板检查、生成漂移与打包检查。新会话 128k 长程稳定性评估需另行建立基准，不能由静态检查或模块数推断通过。

组件资源由 `build/components/build.mjs` 和 `assets.mjs` 生成，随 `pnpm generate` 更新，随 `pnpm check:generated` 校验。AI 聚合样式的归属合同同时锁住 CSS 和组件源码，改变来源必须复核 `ai-style-owners.json`；不得用当前 Demo 的 DOM 反推、删除组件状态样式。更新后运行 `pnpm test:components`、根测试和旧模板检查；报告源码闭包、真实 file:// 交互、截图对照及未执行的独立 Vue harness/T1–T3，不能相互替代。详见 [组件打包维护说明](build/components/README.md)。

图标只查注册数据，字体由宿主按许可使用。HarmonyOS 字体不得转换、子集化；AI 产品模块不携带字体。图库需要本地 HTTP，node scripts/serve_gallery.mjs 不要求安装依赖。
