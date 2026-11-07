---
name: partner-ui-pages
description: 用伙伴工作台 Workbench 与 AI UI 消费包制作离线演示原型。默认使用 Vue 3 多 JS 项目，按 components、blocks、pages 和 state 拆分，支持跨页状态、按需索引、共享资源离线目录及单 HTML 导出；也支持 PRD/截图转页面、改造已有 HTML。需要可集成的 Vue SFC 产品代码时使用 partner-ui-vue3。
---

# 伙伴工作台离线原型

新建或持续迭代复杂 Demo，默认走 **JS 项目模式**：普通 ESM `.js` + Vue 3 `defineComponent/setup/template`，由随包工具生成可直接双击的离线页面。消费端只需 Node 22.12+，无需 npm install 或联网。已有单 HTML 流程保持可用。

这是演示交付。真实 API、鉴权、产品工程与 SFC 模块交接使用 `partner-ui-vue3`；包资格以随附元数据为准，生成原型不授予生产资格。

## 选择入口

| 任务 | 读取 / 执行 |
| --- | --- |
| 新建 Demo、复杂单页、多页流程 | [references/project.md](references/project.md)，`scripts/new_project.mjs` |
| 修改现有 JS 项目 | 先 `project_index.mjs --query` 或 `--changed`，再读命中源码与 API |
| PRD / 截图转 Demo | 先列页面、状态、交互和资产映射；必要假设写入交付，随后走 JS 项目模式 |
| 改造已有 HTML / 保留六个经典模板 | [references/html-workflow.md](references/html-workflow.md)；转换器细节见 [restyle.md](references/restyle.md) |
| 查询组件、Block、Token 或图标 | `catalog.mjs` 定位条目，再读返回的 reference 路径 |

## JS 项目的默认流程

以下命令从 Skill 根目录执行；项目可以放在任意工作目录。

```sh
node scripts/new_project.mjs --out ./my-demo --title "伙伴经营工作台"
node scripts/project_index.mjs ./my-demo --query 伙伴
node scripts/catalog.mjs --name WorkbenchTable
node scripts/check_project.mjs ./my-demo
node scripts/emit_project.mjs ./my-demo
node scripts/emit_project.mjs ./my-demo --single
```

得到可编辑的 `app.js / components/ / blocks/ / pages/ / state/ / fixtures/ / styles/`、`project.json` 和 `kit-lock.json`。`out/index.html` 引用独立的本地 JS；`out-single/index.html` 是从同一源码生成的单 HTML。工具不会执行作者源码来构建或生成索引。

- **先查索引再读文件**：只读取相关页面、直接依赖及组件 API。不要把 runtime、工具链、生成目录或全部组件资料灌入上下文。
- `components/` 管 props/emits 驱动的局部复用；`blocks/` 管完整业务区块；`pages/` 管页面编排；`state/` 管跨页状态。项目局部组件/Block 不自动成为设计系统公共资产。
- 用 `project_index.mjs ./my-demo --changed blocks/PartnerList.js` 查看反向依赖和受影响页面；`--page partners` 定向检查/构建。交付前仍验证完整旅程。
- 静态检查会提示超过 350 行或 18 KB 的业务模块，按职责拆分，不为满足阈值机械切碎。短入口、准确依赖和可执行检查有助于有限上下文工作，但不承诺 128k Agent 的成功率。
- 输出是生成物，只改源码。已有输出被手改或包含额外文件时工具拒绝覆盖；改用新的输出目录或保留旧目录后再生成。

## 资产与视觉约束

1. 先查询真实公开资产/API；包内已有控件优先复用。组件、业务 Block、Pattern 与页面保持各自边界。缺失契约明确记录，不猜 props、事件或插槽。
2. 不覆盖 `.wb-*`、`.tr-*` 或 `.partner-ai *` 的内部颜色、字号、间距、圆角、图标和动效。组件内部 padding 保留；页面布局和业务组合间距遵守 Foundation Token 与命中规则。
3. 缺失资产才自建；外层标 `pui-custom`、`data-pui-name`，写明原因，仍使用 Token 与已登记图标。不要把一般页面布局标成缺陷。
4. AI 独立区域具有 `.partner-ai` 和明确高度。跨页保留会话的 Block 放在应用壳，收起使用 `v-show`；真正卸载时取消生成。helpers 仅作本地模拟。
5. 图表优先查 `WorkbenchChart`（bar、line、area、bar-horizontal、donut、pie、gauge、radar）；超出公开能力才采用自建方案。`WorkbenchTabs.size` 只支持 `small / large`，默认 `small`，不用 `medium`。页签不是站点路由导航。
6. 同一操作组最多一个主要填充按钮；操作与跳转使用正确语义。草稿由宿主管理，确认失败保留草稿；演示成功不能写成服务端完成。
7. 业务页、页头和页脚一起响应助手侧栏；依据容器宽度换列/折行，避免组件样式覆盖和重复页面边距。

## 验证与交付

- `check_project.mjs` 校验锁、静态依赖、导出、Vue 模板及已知字面量枚举；不等于 JS 语义、动态 props、完整 API、交互或视觉验收。详见 project.md 的边界。
- 浏览器真实打开两种 `file://` 交付，检查控制台与外部请求，并走通导航/深链/返回、筛选、草稿、保存/取消、AI 发送/停止/重试/收起。较小视口检查溢出；仅声称实际执行的覆盖。
- 有 Playwright 时可补运行 `node scripts/check_page.mjs my-demo/out/index.html --out shots/`；该工具不会自动遍历多页旅程。
- 交付可编辑源码、需要的离线输出、`delivery.json` 来源/hash 清单和实际验证结果。共享版分发完整 out 目录；单 HTML 可单独转发 index.html。注明本地数据、未连接服务及待确认项。

## 按需参考

- [project.md](references/project.md)：项目合同、命令、模块实例/路由、资产、导出与检查边界。
- [runtime-api.md](references/runtime-api.md)：现有 PartnerUI helpers、聊天模拟与旧模板写法。
- [workbench/index.md](references/workbench/index.md)、[ai-ui.md](references/ai-ui.md)：从锁包生成的组件资料；先用 catalog 定位目标。
- [design-rules.md](references/design-rules.md)、[patterns.md](references/patterns.md)、[tokens.md](references/tokens.md)、[icons.md](references/icons.md)：只读任务相关部分。
- 随包 `assets/gallery` 提供元数据生成图库，`node scripts/serve_gallery.mjs` 启动本地浏览；缺失案例保留说明，不推测补全。
- `scripts/toolchain` 是随包编译工具，不进入 Demo 或 Agent 业务上下文。`maintainer/` 和 vendor 仅用于维护重建，普通消费不用读取。
