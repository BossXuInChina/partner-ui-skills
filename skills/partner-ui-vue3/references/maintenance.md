# 维护与升级

发布频率由用户决定。本仓只消费公开 tarball，维护仓是组件事实源头；消费参考和图库不能反向成为组件 API 真值。

## 升级一次包

1. 在包维护流程完成变更、门禁与干净构建，取得公开 tarball。由发布元数据核对包名、版本、完整 sourceCommit、sourceHasLocalChanges 和资格；未知保持未知，不改成批准。把批准用于本批消费的 tarball 放入本仓 vendor，记录实际 SHA-256。
2. 同步 source.lock.json 的包路径、版本、SHA、完整 commit 和受控 buildDate；若 schema 改变，同时核对两包公开 schema 原始字节和 pin。同步根依赖和 harness 的 file 路径，更新锁文件后再冻结安装。不要读取维护仓源码来填消费缺口。
3. 先运行 pnpm verify:lock，再 pnpm generate。评审 API、Token、图标、案例、资格、SFC 示例及图库差异；controls 不是 props，缺失或不支持必须保留原因。生成文件不手改。
4. 执行 pnpm test、pnpm test:templates、pnpm verify:harness、pnpm build，按实际影响补包消费或浏览器检查；不删除断言或用定向通过冒充全量。运行完整 pnpm 工程当前需 Node22.13+；22.12声明差异仍待工具链项统一。
5. 在三个全新消费会话重跑 T1–T3：协议 PRD→列表/详情/助手、两份 partner-ui-pages 原型→SFC、Pinia+axios+@alias+vue-i18n 现仓接入。仅使用当前独立 Skill 与目标仓。旧试验的来源锁不符时应拒绝复跑；为新包建立新的试验输入快照并适配，保留旧收据，不把改锁当作验收。完成类型/Lint/规则/单测/构建、相关 headless 行为、两尺寸 smoke；转换另做原型对照。修订绊点文档后复测。
6. 为各功能更新真实 delivery.json，并从它生成人读 DELIVERY.md。文件路径、实际验证路由、包来源、耗时和限制逐项核对；未测保留 null 与原因，不把 QA 网络桩称为真实服务。
7. 按变更更新各 Skill 的 skill.json 与 CHANGELOG.md；Skill版本、组件包版本和原型 runtimeVersion 独立管理。运行 pnpm package:release，得到两份带 Skill 版本的 ZIP 与 dist/release-manifest.json。校验 ZIP 中的 Skill 名称/版本、来源锁及 tar SHA；版本归档必须与普通构建归档字节相同。旧清单只属于对应字节。
8. 向用户交付本地候选归档、清单和实际验证结论。外部上传、推送、注册表发布或生产资格变更由当次授权决定，本命令不执行这些动作。

## 独立交付使用者

在完整 Skill 根查看 skill.json、source.lock.json 和 vendor。原型直接使用离线模板；Vue功能在 assets/harness 冻结安装（保留 workspace/vendor 相对布局）后验证。维护源仓的 package:release 与 T1–T3 位于独立 partner-ui-skills 仓，不要求业务项目复制整套维护工具。

图标只查注册数据，字体由宿主按许可使用。HarmonyOS 字体不得转换、子集化；AI 产品模块不携带字体。图库需要本地 HTTP，node scripts/serve_gallery.mjs 不要求安装依赖。
