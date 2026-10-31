# Partner UI Skills

独立的伙伴工作台消费仓库：`partner-ui-pages` 制作离线 HTML 原型，`partner-ui-vue3` 面向 Vue 3 业务模块。组件资料只由 `source.lock.json` 锁定的两个发布包生成。已提供独立打包、共享资料、产品模块 scaffold、六份 Vue SFC 模板及验证工程；完整交付工作流按后续计划补齐。

```sh
pnpm install --frozen-lockfile
pnpm verify:lock
pnpm build
```

`build` 重新计算生成结果，发现手工修改、缺失文件或额外组件页就失败，不会悄悄覆盖。输出为 `dist/partner-ui-pages.zip` 和 `dist/partner-ui-vue3.zip`；解压后的每个文件夹可独立安装，随附锁定 tarball 和共享参考。原型 Skill 自带离线运行时；维护者可在其文件夹安装依赖后运行 `pnpm build:runtime`。

维护升级时先更新 `vendor/`、锁中的版本/SHA-256/完整 commit 和根依赖路径，再运行 `pnpm install`、`pnpm generate`，评审生成差异并执行 `pnpm test`、`pnpm test:templates`、`pnpm verify:harness`、`pnpm build`。`generate` 是明确的再生成命令；普通构建只检查漂移。发布频率由用户决定，仓库没有推送、注册表发布或自动升级动作。

`source.lock.json.studioBaseURLs` 是本机开发服务默认地址，可按实际服务修改后再生成；生成参考中的 Studio 路径来自包。两包当前处于开发通道，资料保留其资格声明。AI UI 当前未发布结构化组件元数据，AI 参考页明确记录这一缺口，不从源仓推测补齐。

原始六个 HTML 模板、页面脚本、原型 helpers 与 HarmonyOS 字体字节保留。字体只以原始文件随原型分发，未转换或内联到运行时；具体声明见原型 Skill 的字体目录。包来源与输入迁移记录在 `build/input-provenance.json`。

Vue 验证工程位于打包后的 `dist/partner-ui-vue3/assets/harness`。`pnpm verify:harness` 使用它自己的冻结依赖，执行类型、Lint、格式、规则、组件与组合逻辑测试、生产构建、预览及六路双视口 smoke，并实际验证 mock 拒绝路径。QA 网络桩只在独立 Node 测试进程注入，生产导入图不含 mocks；公司的真实 API 仍未验证。普通参考/原型测试不重复安装此工程。
