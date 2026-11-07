# Partner UI Skills

独立的伙伴工作台消费与复查仓库：`partner-ui-pages` 用多 JS 项目制作离线原型（保留单 HTML 导出），`partner-ui-vue3` 面向 Vue 3 业务模块，`partner-ui-review` 复查消费页面。组件 API 资料仍只由 `source.lock.json` 锁定的两个发布包生成；组件按需运行时另使用显式锁定的源码补充输入，见下文。已提供独立打包、共享资料、产品模块 scaffold、六份 Vue SFC 模板及验证工程；历史三项新会话交付试验不自动代表新功能验收；本地候选包的独立版本见各 Skill 的 skill.json。

```sh
pnpm install --frozen-lockfile
pnpm verify:lock
pnpm build
```

`build` 重新计算生成结果，发现手工修改、缺失文件或额外组件页就失败，不会悄悄覆盖。输出为 `dist/partner-ui-pages.zip`、`dist/partner-ui-vue3.zip` 和 `dist/partner-ui-review.zip`；解压后的每个文件夹可独立安装，随附锁定 tarball 和共享参考。原型 Skill 自带离线运行时；维护者可在其文件夹安装依赖后运行 `pnpm build:runtime`。

维护升级时先更新 `vendor/`、锁中的版本/SHA-256/完整 commit 和根依赖路径，再运行 `pnpm install`、`pnpm generate`，评审生成差异并执行 `pnpm test`、`pnpm test:templates`、`pnpm verify:harness`、`pnpm build`。`generate` 是明确的再生成命令；普通构建只检查漂移。发布频率由用户决定，仓库没有推送、注册表发布或自动升级动作。

`source.lock.json.studioBaseURLs` 是本机开发服务默认地址，可按实际服务修改后再生成；生成参考中的 Studio 路径来自包。两包当前处于开发通道，资料保留其资格声明。两包均发布结构化组件元数据；AI 参考记录16个组件及真实未知项，图库由公开元数据生成，不从源仓推测补齐。

原始六个 HTML 模板、页面脚本、原型 helpers 与 HarmonyOS 字体字节保留。字体只以原始文件随原型分发，未转换或内联到运行时；具体声明见原型 Skill 的字体目录。包来源与输入迁移记录在 `build/input-provenance.json`。

Vue 验证工程位于打包后的 `dist/partner-ui-vue3/assets/harness`。`pnpm verify:harness` 使用它自己的冻结依赖，执行类型、Lint、格式、规则、组件与组合逻辑测试、生产构建、预览及六路双视口 smoke，并实际验证 mock 拒绝路径。QA 网络桩只在独立 Node 测试进程注入，生产导入图不含 mocks；公司的真实 API 仍未验证。普通参考/原型测试不重复安装此工程。

## 多 JS 离线项目 · Pages 0.3.0

在独立 Skill 根目录执行，无需 npm install：

```sh
node scripts/new_project.mjs --out ./my-demo --title "伙伴经营工作台"
node scripts/project_index.mjs ./my-demo --query 伙伴
node scripts/catalog.mjs --name WorkbenchTable
node scripts/check_project.mjs ./my-demo
node scripts/emit_project.mjs ./my-demo
node scripts/emit_project.mjs ./my-demo --single
```

源码按 components、blocks、pages、state、fixtures 和 styles 分开；`out/index.html` 加载多个本地 JS，`out-single/index.html` 可单独分享。支持页面依赖闭包、反向依赖查询、跨页共享状态与真实组件。上述兼容命令保留完整 runtime；组件按需导出使用下面的显式选项。详见 [项目合同](skills/partner-ui-pages/references/project.md)。

维护者运行 `pnpm test:projects` 可复查模块合同、独立消费和两种 file:// 交付的完整示例旅程。模块化为有限上下文提供按需读取边界，128k Agent 多轮任务成功率尚无基准结论。

## 组件按需导出预览 · 2026-11-07

在新生成的项目上启用 `--components`，消费端只需要 Node，不需要 npm install 或网络：

```sh
node scripts/emit_project.mjs ./my-demo --components
node scripts/emit_project.mjs ./my-demo --components --single
node scripts/emit_project.mjs ./my-demo --components --page partners
```

分别生成 `out-components/`、`out-components-single/` 或指定页的依赖闭包。组件、内部模块、所属完整样式、原始图标及相关资源一起选择；Vue 和基础 Token 为共享底座。两种交付共用相同运行时和 `closureHash`，`component-report.json` 记录来源、内部依赖、样式归属、图标与实际字节。构建工具只随消费包提供，不进入 Demo。

消费包的 `assets/components/catalog.json` 指向按组件命名的 JS/CSS。内部代码和共享样式按来源收拢，图标资产单独保存。存储布局保留模块级依赖关系，构建仍按实际使用选择资源。

动态组件/图标与可选聊天 renderer 使用项目 `resources.json` 明确范围，不自动退回全量。脚手架已经提供 `renderers: []`，保留 ChatPanel 原生文本回复。维护实现、声明格式、源码补充锁及验证边界见 [组件按需打包说明](build/components/README.md)。本轮保持 Skill 指令和版本元数据不变，以独立 preview 归档交付；既有版本归档不覆盖。

## 从包生成的 Partner UI 图库

`pnpm generate` 刷新锁包参考、原型 runtime 与图库；`pnpm build` 验证漂移并打包。`pnpm gallery:serve` 在本地 HTTP 服务浏览生成的 `shared/gallery`，静态产物也随三个 Skill 放入 `assets/gallery`。图库代码只维护通用浏览器，不维护组件清单；76 个当前条目及 API 均由锁包生成。案例 controls 与公开 props 分别保存，不对未推导项编造默认预览。

两包的 `components.schema.json` 原始字节由 source.lock.componentsSchemaSha256 校验。维护仓仍是组件规范源头，消费参考和图库只使用 vendor 的发布产物；源码补充仅用于可复现的组件资源编译，不扩展公开 API 或晋升资格。

## 本地交付

`pnpm package:release` 先校验生成漂移，再产出 `dist/partner-ui-pages-0.3.0.zip`、`dist/partner-ui-vue3-0.2.1.zip`、`dist/partner-ui-review-0.1.6.zip` 和 `dist/release-manifest.json`。清单记录实际字节 SHA-256、包版本及完整来源提交；普通 ZIP 与版本 ZIP 字节相同。该命令不推送或上传。

[维护升级](maintenance.md) 规定“升级公开包 → 再生成 → 新会话重跑 T1–T3 → 更新清单/归档”；[CHANGELOG](CHANGELOG.md) 记录本批内容。可审查试验与复跑入口位于 trials/t1、trials/t2、trials/t3，历史收据只支持其记录的来源，不代表真实公司环境。

## 历史页面复查候选 · 2026-11-06（不是当前来源状态）

新增 `skills/partner-ui-review`，版本 0.1.5；Vue Skill 为 0.1.1，pages 保持 0.1.0。构建和本地交付生成三个独立 ZIP；发布清单记录各自版本和相同合格来源锁。静态引擎维护于 `shared/static`，生成器分发，禁止手改生成副本。

本批未升级来源锁：目标 Workbench `20261104.5` 的所有发布元数据均标记 `sourceHasLocalChanges=true`，无法通过既有验证。保留 Workbench/AI UI `20261031.1`；新包引用核对、模板/harness 与新锁 T1–T3 资格不可称完成。页面 Demo 的切换图标是已知陈旧资料错误，仍会导致 check:ui/verify 非零。

复查命令、自动测量边界及 AI 交接见 [review Skill](skills/partner-ui-review/SKILL.md)。截图和测量是候选证据，未验证项必须随报告交付。
