# 组件按需离线消费

本实现借鉴 eKit 的静态根入口、明确的动态范围和资源闭包。CSS 进一步按源码归属选择，不保留整套聚合组件样式。消费端只需要 Node 22.12+；测试使用 Node 24.21。默认兼容导出仍保持原行为，显式 `--components` 启用本轮预览能力。Skill 指令和版本元数据未改。

## 使用

在解压后的 `partner-ui-pages` 根目录：

```sh
node scripts/new_project.mjs --out ./my-demo --id my-demo
node scripts/emit_project.mjs ./my-demo --components
node scripts/emit_project.mjs ./my-demo --components --single
node scripts/emit_project.mjs ./my-demo --components --page partners
```

共享交付为 `out-components/index.html` + 选中运行时 + 多个业务 JS/CSS；单 HTML 为 `out-components-single/index.html`，该文件可以单独复制。都使用经典脚本，支持直接 `file://` 打开，无须 ESM 本地服务。两个模式共用相同 JS/CSS 字节与闭包标识，单 HTML 仅改变嵌入方式。

业务源码仍按 `components/`、`blocks/`、`pages/`、`state/`、`fixtures/`、`styles/` 组织。Agent 通过已有 `project_index.mjs` 和 `catalog.mjs` 查询相关源码/API；不要把生成模块、资源索引或构建工具读入业务上下文。模块边界可以减少需要读取的代码，尚未测量 128k Agent 长程成功率。

消费包内的 `assets/components/catalog.json` 按组件名列出预编译 JS 和直属 CSS，例如 `components/workbench/WorkbenchButton.js` 和 `components/workbench/WorkbenchButton.css`。组件 JS 是打包输入，业务项目仍使用公开具名导入。共享样式和内部代码收在 `internal/` 的压缩包中，Workbench 原始 SVG 按图标家族保存，AI artwork 单独索引。公开组件可以依赖共享样式，因此只有拥有独立样式的组件会有同名 CSS。

资源布局升级后，新项目由 `new_project.mjs` 生成新的 `kit-lock.json`。旧项目可继续使用原归档。迁移时先比较新旧锁中的 Vue、发布包和完整运行时哈希，再将项目的组件资源包锁更新为新值并重跑验证。若项目额外固定了 `project.json.componentResources`，同步更新该字段。

## 选择规则

公共具名导入、模板中的已注册组件和静态 namespace 属性确定根入口。未使用页面不进入 `--page` 的业务闭包，但根应用的常驻助手仍然属于闭包。一个被选择的组件保留其完整状态、内部控件、响应式规则、伪类、动画及资源；不按当前 props 或首屏 DOM 删除实现。

动态范围在项目 `resources.json` 中声明，例如：

```json
{
  "schemaVersion": 1,
  "components": ["WorkbenchButton", "AiSummaryCard"],
  "icons": ["system:/ic_arrow_right_line#2:141", "ai:smart.mark"],
  "renderers": ["ai-summary"]
}
```

- `components` 补充字符串动态组件、namespace 间接引用及运行时模板可能用到的**公开组件名**。相对 JS 文件仍必须有静态 import；未声明动态 import/require/eval 不受支持。
- `icons` 使用 `system:`、`status:`、`file:`、`empty:`、`pedestal:` 或 `ai:` 前缀。静态图标名及已选组件内部的固定图标自动收集；动态 `:name`、动态 `welcomeIcon()` 和复杂数据计算应明确声明。保留原 SVG/artwork 字节、替代名称及原生尺寸变体，不重画图标。声明不是允许任意运行时名称，新增可能值须重建。
- `renderers` 控制导入 `chatRenderers` 时的可选内容类型：`pui-template`、`pui-html`、`ai-summary`、`business-navigation`、`agreement-table`。`[]` 只保留 ChatPanel 自身的原生 renderer。`pui-template` 还要求明确 `components` 范围。

已识别的动态入口缺少声明、未知组件/图标/renderer、全局 `PartnerUI` 绕过导入，以及资源哈希不符都会失败。静态分析不可能推导任意业务计算；复杂数据来源必须主动声明其资源全集。没有隐式全量回退。旧 HTML/旧 helper 工作流使用原完整导出，不受此边界影响。

## 维护构建与来源

维护者需要本仓冻结依赖；消费者不需要安装它们。

1. `source.lock.json` 继续锁发布 tarball、公开 API 和资格。
2. `sources.lock.json` 额外锁三个源码归档的提交、版本和 SHA-256。自有源码来自发布记录 `sourceHasLocalChanges=false` 的对应提交；TinyRobot 0.5.1 对应 npm 的 gitHead。归档位于 `vendor/offline-*.tar.gz`，源码编译不依赖兄弟 checkout。
3. Vue SFC 在维护侧预编译。依赖解析记录为独立模块，公共聚合入口的具名导入解析到其声明的导出目标，防止未选模块的初始化与聚合 CSS 被带入。Vue 只使用一个锁定实例；TinyRobot 与它的 SVG 依赖保留正确版本关系。
4. SFC CSS 与显式样式 import 按文件归属记录。TinyRobot 使用源码中的组件样式文件。AI 历史聚合 CSS 使用 `ai-style-owners.json` 复核归属，合同同时校验样式和组件源码；未使用的旧页面外壳不进入组件导出。保持基础、厂商、组件覆盖的顺序，保留 scoped 标识、CSS Modules、媒体规则和所有状态。
5. `assets/components` 保存命名组件文件、资源包和校验清单。内部模块、样式段和资产按字节范围索引，保留逻辑模块边界、CSS 顺序和原始资产字节。构建前校验压缩包和各条目，展开后继续用原依赖图裁剪。随包 esbuild WASM 用当前 `process.execPath` 启动子进程。工具及完整资源库存不进入 Demo。
6. 消费侧先从根入口构建代码，依据实际保留模块选择样式和图标，再生成最终运行时。Vue（含 JS 模板所需编译能力）、基础 Token 和页面脚手架为共享底座；组件内部依赖可能使实际包含的公共控件多于显式导入项。

`component-report.json` 记录根、renderer、模块、CSS、图标、资产、实际输出字节、内容哈希和源码补充身份。`provenance.components` 表示这些公共契约所在的模块被使用；同文件导出的公共 helper 可能共用模块，不能把该字段当作屏幕上的实例数量。`delivery.json` 记录输出文件哈希。`kit-lock.json` 同时固定完整运行时及组件资源包身份。

```sh
pnpm install --frozen-lockfile
pnpm generate
pnpm test:components
pnpm test
pnpm test:templates
pnpm check:generated
```

验证包含全部公开导出的编译、无关资源缺席、内部依赖、动态边界、资源完整性、三组原包截图/样式对照，以及隔离目录中无 node_modules 的 WASM 构建和两种真实 file:// 业务/AI 旅程。截图对照覆盖代表性状态，不是所有组件全部状态的视觉认证。未因此重新获得 Vue harness、历史 T1–T3、跨浏览器、真实企业 API 或生产发布资格。

本轮不调用会写入原版本文件名的 `package:release`，仅交付独立 preview ZIP 和实际验证报告；原 0.3.0 归档保持不变。
