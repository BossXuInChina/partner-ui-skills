# 功能起点与注册图标工具

这两个入口只需 Node ≥22.12，不依赖全局 CLI。路径以完整独立 Skill 为准；维护源仓可直接运行同名脚本。附带 pnpm 11.22 的完整验证工程实际需要 Node ≥22.13；脚本在22.12运行的结果按脚本范围记录。

## new_feature.mjs

```sh
node <Skill根>/scripts/new_feature.mjs agreements --template workbench-list --out ./src/features/agreements
node <Skill根>/scripts/new_feature.mjs --help
```

`<name>` 为小写 kebab-case slug，最长64字符。`--template` 可选 `blank`（默认）、`workbench-list`、`workbench-detail`、`workbench-dashboard`、`ai-chat`、`ai-assistant-workspace`。省略 `--out` 时生成到当前目录下的 `<name>/`；`--json` 输出结果、文件清单和交付草稿。

父目录必须已存在；目标目录、文件及悬空符号链接都不会被覆盖。输出不得覆盖或进入 Skill 本身及输入 vendor。工具先在同一父目录准备完整源码，再通过目录 rename 发布；Windows 会先移除自己创建的空预留，目标已存在时仍拒绝覆盖。失败清理仅涉及自己的临时目录及空预留，不递归删除目标内容。并发写同一路径只有一个能成功。

生成内容：

- `pages/<template>/`：真实 Page、组合式逻辑、typed API/decoder、类型、文案、单测和开发 mocks。
- `scaffold/`：递归复制实际引用的起步模块；`@scaffold` 改为模块内相对路径，不改宿主 alias。
- `styles/layout.css`、标准 `data-*` 属性声明、`index.ts` 和 typed lazy `routes.ts`。
- `INTEGRATION.md`、`delivery.json`、由该 JSON 生成的 `DELIVERY.md`。

从功能 `index.ts` 取得 `createFeatureRoutes(api)` 并接入产品 router；AI 模板还接受 namespace/storage 选项。API 实现必填，默认不注入历史存储。工具不会安装依赖、启动应用、接后端或修改产品配置。生产入口不导入生成的 mocks；宿主仍需等价构建 guard 和真实验证。

包身份取自 `source.lock.json`，实际校验 tarball SHA-256 及公开 manifest/release 的版本和完整提交；资格声明原样保留。没有把组件库源码或 tarball 复制进功能。草稿中 `source.file` 相对原 Skill 锁根解释，`scope: skill-lock`、`copiedToFeature:false`；宿主完成 vendor/安装后更新实际位置与证据。

草稿的 `skillVersion:null`、API `assumed` 且 method/path 为 `null`、所有检查 `not-run`、实际 Vue/单实例及体积为未验证。复制模板不等于实际需求完成。按 [integration.md](integration.md) 接线、按 [testing.md](testing.md) 运行检查，再按 [delivery.md](delivery.md) 更新 JSON 与摘要。

## find_icon.mjs

```sh
node <Skill根>/scripts/find_icon.mjs 告警 --family status --size 12 --limit 5
node <Skill根>/scripts/find_icon.mjs --query "告警 镂空" --size 12x12 --json
node <Skill根>/scripts/find_icon.mjs --help
```

只读 Skill 的生成 `references/icons.json`。位置参数与 `--query` 的关键词按空格分词，所有词都须匹配；支持真实 key、name、alias、semantic/group 的文字检索，不做臆测翻译或替代。

| 参数       | 含义                                                                                      |
| ---------- | ----------------------------------------------------------------------------------------- |
| `--family` | 当前登记的 `system`、`status`、`file`、`empty`、`pedestal`。未知家族报错。                |
| `--size`   | 原生尺寸过滤，如 `24` 或 `24x24`；只匹配 confirmed 的 `native.width/height`，不缩放图标。 |
| `--limit`  | 正整数，默认20；只限制返回数量，`total` 仍为全部匹配数。                                  |
| `--json`   | 输出来源版本/完整提交、过滤条件、总数及实际匹配。                                         |

每条结果保留真实 key/name/alias、原生尺寸、导出/实际绘制尺寸，以及公开 import 和原始 props。原生尺寸和实际绘制 canvas 可能不同，选型时一起核对；不能用 requested size 推断新的图稿。无匹配返回空结果，不生成不存在的图标名。更多选择边界见 [icons.md](icons.md)。

## convert_prototype.mjs

```sh
node <Skill根>/scripts/convert_prototype.mjs --input prototype.html --out ./conversion-draft --project <已安装harness>
node <Skill根>/scripts/convert_prototype.mjs --help
```

仅适用于可取得原始 x-template/setup 的 `partner-ui-pages` 原型。使用目标或附带 harness 的本地 TypeScript/Vue 解析器和发布包公开类型，不读取维护仓、不安装或执行输入。已有目标不覆盖，父目录须存在。输出 guarded `Page.vue` 与保留原 setup/模块上下文、公开 imports、TODO 和问题的 `conversion.json`，始终 `needs-review`；不是可直接挂载的产品代码。详细人工迁移步骤与 guard 移除条件见 [conversion.md](conversion.md)。

## check_vue.mjs 与 smoke.mjs

```sh
node <Skill根>/scripts/check_vue.mjs <feature-dir> --json
node <Skill根>/scripts/check_vue.mjs --help
node <Skill根>/scripts/smoke.mjs --project <harness> --routes <routes.json>
node <Skill根>/scripts/smoke.mjs --help
```

前者只作静态 AST 规则检查；后者在 Vite dev、#app 与 main 约定下运行 headless 双视口 smoke。需要本地 harness 工具，规则、QA 网络桩、截图开关与检查范围见 [testing.md](testing.md)。两者均不代替真实 API、交互、平台和生产资格验证。
