# Partner UI JS project

先运行 Skill 的 `project_index.mjs <本项目> --query <需求词>`，只读取命中的页面、直接依赖和相应公共 API 文档。改动后用 `--changed pages/detail.js` 查看反向依赖及受影响页面。索引实时生成，不维护另一份组件清单。

- `components/`：局部可复用展示与输入组合，通过 props / emits 通信。
- `blocks/`：完整业务区块；可连接共享状态，组合包内组件及局部组件。
- `pages/`：页面编排和跳转；只在 `project.json` 登记入口，不把多页内容放回 app.js。
- `state/`：跨页共享状态及业务操作；`fixtures/`：本地演示数据；`styles/`：组合布局。
- 使用普通 JS ESM、Vue `defineComponent/setup` 和静态 `template` 字符串。导入 `vue`、两个包的公开根入口或相对文件。查 `catalog.mjs --name <组件名>` 后按 reference 路径读真实 props / events / slots。
- `kit-lock.json` 锁定消费包和运行时；先检查来源，不手工改锁以消除报错。
- `check_project.mjs` 做静态检查；`emit_project.mjs` 输出多 JS 离线工程，`--single` 从同一源码输出单 HTML。可用 `--page <id>` 做定向构建；最终仍构建、走查完整旅程。
- 只编辑源码。不要读取或修改 out*/、runtime、scripts/toolchain 等生成/工具文件来完成业务需求。大文件（350 行或 18 KB）是拆分提示，不是强制切碎目标。
- 交付前真实浏览器验证 `file://` 的导航、深链、筛选、草稿、保存/取消、AI 发送/停止/重试及收起再打开。静态通过不等于交互或视觉验收。
- 演示数据不代表服务端结果；现有 components / blocks 是本项目局部资产，不自动变成设计系统公共资产。
