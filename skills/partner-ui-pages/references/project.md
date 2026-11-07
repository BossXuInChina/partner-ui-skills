# JS 项目模式

适用于无需 npm install 的离线 Demo。作者使用 Vue 3 的组合方式，但文件是普通 ESM `.js`，不是需要 Vite 编译的 `.vue` SFC。预编译 Vue/Workbench/AI UI 运行时由 Skill 提供；随包纯 JS 编译工具只在生成阶段运行，不进入 Demo。

## 项目边界

```text
my-demo/
  project.json          项目入口、页面清单、样式及默认页面
  kit-lock.json         包身份、Vue/runtime 版本与 runtime 字节 hash
  app.js                应用壳与常驻 Block
  components/           props/emits 驱动的局部复用
  blocks/               有完整业务含义的组合区块
  pages/                页面编排与跳转
  state/                跨页共享数据、草稿和操作
  fixtures/             演示数据
  styles/               页面及组合布局
  AGENTS.md             项目消费约定
  out/                  多 JS 离线交付（生成）
  out-single/           单 HTML 交付（生成）
```

目录按职责组织；小项目也可用 `components.js`、`state.js`，工具不强制固定目录。不要把设计系统已有控件再实现一次；局部组件和业务 Block 保持边界。共用模块只有一个实例，页面切换不会重置 `state/`。页面本身在切换时卸载，因此希望保留的编辑草稿应在共享 state 中；常驻 AI 面板放在 app.js 并用 `v-show` 收起。

## Manifest 与锁

```json
{
  "schemaVersion": 1,
  "id": "partner-demo",
  "title": "伙伴经营工作台",
  "entry": "app.js",
  "startPage": "overview",
  "pages": [
    { "id": "overview", "label": "经营概览", "file": "pages/overview.js" },
    { "id": "partners", "label": "伙伴管理", "file": "pages/partners.js" }
  ],
  "styles": ["styles/app.css"]
}
```

`id`、页面 id 用小写字母开头，只含字母、数字和连字符。entry 和每个 page 默认导出一个 Vue 组件。页面依赖由静态 import 自动追踪，无需手写模块加载顺序。styles 依次应用，路径相对于项目根。

`new_project.mjs` 自动写 kit-lock.json。用不同版本或不同 runtime 字节的 Skill 构建会失败。真正升级消费包时，保留旧锁/验证证据，用新 Skill 生成临时项目取得新锁，审查 API 差异后更新旧项目并重跑旅程；不要为了消除错误直接改版本或 hash。

## 写组件与页面

```js
import { defineComponent, ref } from 'vue';
import { WorkbenchButton } from '@workbench/ui-vue3';
import { useProject } from 'partner-ui/project';
import Summary from '../blocks/BusinessSummary.js';

export default defineComponent({
  name: 'OverviewPage',
  components: { WorkbenchButton, Summary },
  setup() {
    const project = useProject();
    const count = ref(0);
    return { project, count };
  },
  template: `<section><Summary /><WorkbenchButton @click="count++">{{ count }}</WorkbenchButton></section>`,
});
```

- 支持静态 named/default/namespace import、re-export、相对 `.js`、`.json`，以及 png/jpg/jpeg/svg/webp/gif 资源默认导入。相对路径要带扩展名。
- 外部导入仅限 `vue`、`@workbench/ui-vue3`、`huawei-partner-ai-ui` 两个公开包根，以及下述原型 helpers。不允许源码深路径和未声明 npm 包。
- 用 Vue Options/Composition API；局部组件在 `components` 中注册。锁包组件也由 runtime 全局注册，但显式导入更便于审查和将来迁移。
- template 使用普通字符串或不含 JS `${...}` 插值的模板字符串；变量内容通过 Vue `{{ }}` / props / 指令传入。编译器检查真实 Vue 模板结构和指令；不通过正则切割 JS。
- 不支持 `.vue`、`.ts`、JSX、动态 import、require、eval、Function 构造器、import.meta、顶层 await 或循环依赖。循环共享状态提取到独立 state 模块。
- 数据和图片可导入，例如 `import rows from '../fixtures/rows.json'`、`import cover from '../media/cover.png'`，setup 返回 cover，模板用 `:src="cover"`。共享版输出本地资源，单 HTML 将其内联为 data URL。
- CSS 在 styles 清单登记；本地图片 `url(...)` 自动处理，禁止 CSS `@import` 和远端 URL。字体如需使用，请按随包原件许可处理；本模式的资产转换当前只支持上述图片格式。

## 页面与 helpers

`import { ProjectView, useProject } from 'partner-ui/project'`：

- `ProjectView` 放在应用壳内，渲染当前页面。
- `useProject()` 返回 `{ id, title, pages, route, navigate }`。`route` 是只读响应对象，包含 `page` 和字符串值的 `params`。
- `navigate('detail', { id: 'P-001' })` 生成 `#/detail?id=P-001`；浏览器前进、后退和直接深链可用。无效/损坏 hash 回到当前交付的 startPage。未知目标 id 会报错。
- `--page` 导出后 pages 只包含所选页。跨页按钮先检查 `project.pages`，提供隐藏/未包含说明，不假装目标页已导出。完整交付不要使用此裁剪模式。

`import { createChatSession, chatRenderers, mockAgreementAdapter, mockStream, overlays, welcomeIcon } from 'partner-ui'`：

这些是原型 helpers，契约见 runtime-api.md。`chatRenderers` 是数组，不是函数；`createChatSession.respond()` 返回字符串或有 `type` 的内容项。正式服务接入应使用产品 Skill，不把 mock 当服务端能力。

## 按需上下文与命令

以下命令从 Skill 根执行，输入项目目录可用绝对路径。

```sh
# 创建可编辑三页示例；已存在目录会拒绝覆盖
node scripts/new_project.mjs --out ./my-demo --title "伙伴经营工作台"

# 查项目：简述、行数/字节数、导出、依赖、反向依赖和受影响页面
node scripts/project_index.mjs ./my-demo --query 伙伴
node scripts/project_index.mjs ./my-demo --changed components/MetricTile.js

# 查真实锁包契约；--name 返回 props/events/slots 和完整文档路径
node scripts/catalog.mjs --query 表格
node scripts/catalog.mjs --name WorkbenchTable

# 定向检查和交付；全量检查不带 --page
node scripts/check_project.mjs ./my-demo --page partners
node scripts/emit_project.mjs ./my-demo --page partners
node scripts/emit_project.mjs ./my-demo
node scripts/emit_project.mjs ./my-demo --single
```

默认 out、out-single、out-<page>，定向单 HTML 为 out-<page>-single；`--out <目录>` 可指定其他目录。索引直接从当前源码计算，out/project-index.json 是交付快照。索引仅含可达模块；未接入 entry/pages 的文件不被假装已使用。`check_project` 的 largeModules 是拆分提示，不是失败或量化的 Agent 稳定性指标。

共享版保持独立脚本，浏览器用经典 `<script src>` 加载，避开 file:// 下 ESM 请求限制。每个源模块编译到隔离工厂中，通过受控依赖表加载并缓存；不是把代码拼成共享全局变量。单 HTML 将相同 JS 字节编码为内嵌 data URL，同时内联样式；体积略增，但源码中的 HTML/script 字符串不会破坏文档结构。生成阶段不执行项目源码；Node 编译工具随 Skill 提供，不需要消费端安装依赖。

按需闭包针对项目业务模块，当前 Vue/Workbench/AI runtime 仍完整打包。不能把业务模块拆分称为组件库 tree-shaking，也不能仅凭文件变小就声称 128k Agent 成功率提高；需要独立多轮任务基准验证。

## 验证边界与交付

- 静态检查：锁匹配、路径边界/缺失依赖、循环依赖、导出存在性、Vue template 编译、已知字面量枚举和 CSS 资源。静态表达式以外的 props 值、业务算法、render 函数、运行时动态组件和外部请求不是完整静态证明。
- 离线资产通过声明式 import/CSS url 才进入闭包。手写 fetch、脚本创建外链、模板硬编码路径需要浏览器检查；不要将生成成功写成“保证零网络”。
- 输出含 delivery.json（来源锁、源码 hash、输出字节/hash）和 project-index.json；时间戳不参与构建，未修改输入得到相同输出。重复生成只覆盖本工具拥有且未手改的目录。单 HTML 的 index.html 可单独分享，清单供审查留档。
- 浏览器检查完整多页与单 HTML：控制台、外部请求、深链/前进/后退、筛选/空态、跨页草稿、保存/取消、AI 回复/停止/重试/收起恢复，以及桌面/窄视口溢出。只把实际执行的结果写进报告。
- 项目源码、消费包、生成 Demo 和库维护仓是不同交付层。保留可编辑项目；不要只交付编译后的 JS。
