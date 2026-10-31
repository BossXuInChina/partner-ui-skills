# Partner UI Vue 3

将需求、PRD 或既有伙伴工作台原型实现为可维护的 Vue 3 功能模块。入口是 [SKILL.md](SKILL.md)；离线 HTML 演示使用兄弟 Skill `partner-ui-pages`。本 Skill 消费锁定的 Workbench 与 AI UI 包，真实 API、公司平台及生产资格仍按 [assumptions.md](references/assumptions.md) 分别确认。

## 选择工作流

| 输入                    | 入口与结果                                                                                                                      |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| 需求 / PRD              | 形成页面、组件映射、API 草案与状态图，再实现功能模块；交付项见 [delivery.md](references/delivery.md)。                          |
| `partner-ui-pages` 原型 | 按 [conversion.md](references/conversion.md) 把原型行为移植为 SFC、状态与注入 API，并做视觉对照。其他来源的 HTML 作为需求输入。 |
| 已有产品仓库            | 先按仓库约定接入路由、状态、transport 和校验；组件集成见 [integration.md](references/integration.md)。                          |
| 现有 Vue 代码审查       | 运行规则、类型和 Lint，按规则报告；审查本身不授权重写。验证边界见 [testing.md](references/testing.md)。                         |

组件选型从 [Workbench 索引](references/workbench/index.md) 开始，图标查 [icons.md](references/icons.md)，Token 查 [tokens.md](references/tokens.md)。AI 会话、面板和 renderer 接入查 [ai-ui-vue.md](references/ai-ui-vue.md)。

## 模板与起步代码

[assets/templates](assets/templates) 提供六份 SFC 源码模板：

| 模板                     | harness 路由                        | 主要行为                               |
| ------------------------ | ----------------------------------- | -------------------------------------- |
| `workbench-list`         | `/templates/workbench-list`         | 过滤、排序、分页、选择与协议操作。     |
| `workbench-detail`       | `/templates/workbench-detail`       | 详情、编辑校验、提交、续签与附件展示。 |
| `workbench-dashboard`    | `/templates/workbench-dashboard`    | 指标、图表、待办、快捷应用和情报。     |
| `ai-assistant-workspace` | `/templates/ai-assistant-workspace` | 协议工作区与协议专用助手。             |
| `ai-chat`                | `/templates/ai-chat`                | 通用会话、停止/重试和结构化 renderer。 |
| `blank`                  | `/templates/blank`                  | 最小页面和宿主注入的主操作。           |

每个 `Page.vue` 的 typed `api` 必填。AI 模板另需独立 `historyNamespace`，存储保持可选且默认关闭。生产入口不导入 `mocks/`；原 HTML seed 仅用于单测或独立 QA 网络 fixture。

[assets/scaffold](assets/scaffold/README.md) 包含会话状态、SSE transport、取消、renderers、关闭按钮、反馈及宿主布局起步代码。模板与 scaffold 的原件会在打包时复制到 harness 的 `src/templates/`、`src/scaffold/`，通过 `@templates`、`@scaffold` 引用。

## 运行独立验证工程

以下命令针对生成或解压后的完整 Skill，安装仅需其 `assets/harness` 依赖；无需在 Skill 根安装维护工具。消费包维护源仓先运行自身 `pnpm build`，再进入产物 `dist/partner-ui-vue3`；不要直接运行缺少生成文件的源模板目录。

从独立 Skill 根目录执行：

```sh
cd assets/harness
pnpm install --frozen-lockfile
pnpm exec playwright install chromium
pnpm verify
pnpm test:browser
```

`verify` 串联类型、Lint、格式、规则、单测、生产构建和六路开发模式 QA smoke；`test:browser` 另外验证已构建预览的基础空白路由。浏览器均为 headless。`route-chunks.json` 记录实际静态、动态、共享 JS 与资源字节，以及 TinyRobot 初始依赖位置。

```sh
pnpm dev
pnpm run smoke:fixtures --evidence
```

`dev` 不自动提供后端。harness 自带的 `VITE_TEMPLATE_API_BASE=/__template-api` 属于 assumed 验证配置；`smoke:fixtures` 明确在 QA Node 进程使用网络桩。接真实服务后可运行 `pnpm smoke`。成功截图仅在 `--evidence` 或证据环境变量开启时保存；失败保留诊断。原字体视觉 QA 的可选参数和各检查细节见 [harness README](assets/harness/README.md) 与 [testing.md](references/testing.md)。

目前可用规则检查与 smoke 工具；`new_feature`、`find_icon`、`convert_prototype` 自动化入口尚未交付，当前按对应参考和模板实现。

## 包锁与交付边界

生成后的独立 Skill 根包含 `source.lock.json`、`vendor/` 和安装锁文件；版本、完整 SHA-256 与来源提交由锁定结果决定。参考从包的公开元数据生成，维护组件事实回到 Studio/AI UI 入口。不要读取维护仓内部路径或手改生成参考。

应用入口统一导入 Workbench、TinyRobot 公开样式、AI UI 样式，保留此顺序；代码中的 AI 面板仍按需加载。字体由宿主通过 `--partner-ui-host-font-family` 提供，功能模块没有字体文件。历史持久化默认关闭；生产构建拒绝 mock 标志及 mock 模块进入导入图。

交付功能源码、需求/API 状态、包来源、实际检查结果和限制，使用 [delivery.md](references/delivery.md) 的清单。当前 Workbench prototype、AI UI dev 状态保持不变；本地验证通过不代表真实公司 API、平台或生产资格已验收。发布频率及外部发布动作由用户决定。
