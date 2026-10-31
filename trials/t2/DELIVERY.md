# 原型转换交付

已交付两个可维护 Vue 3 + TypeScript 功能模块及可复跑独立 harness 叠加层：列表与续签 AI 工作台。实际转换器提取稿及逐项映射见 `draft-list/`、`draft-ai/`、`MIGRATION.md`；最终源码使用随包已迁移模板，并对照提取项复核。API、鉴权、导航及宿主均属假设；开发数据只作为外部 QA fixture。

## 验证

冻结安装 Vue 3.5.13；`pnpm run verify` 全部通过：严格类型、lint、格式、规则、15 个测试文件共 85 项、生产构建、6 路双视口 smoke。规则有 1 条其他模板动态图标警告；产物有大块告警。验证总耗时 21.997 秒。浏览器另检查列表筛选和新建弹窗、AI 快捷问题及结构化答复，详见 `evidence/interactions.json`。

两份原型与最终 SFC 均以随包字体、fixture 数据在 1440×900 与 1280×800 实际 headless 截取对照；无页面异常或坏图。1440 代表性原图、最终图、并排图和未遮盖差异图在 `evidence/`。列表最终页省略演示数据后缀与底部“页面说明”，因此页脚上移约 58px；工作台省略演示说明，其主要布局在所检视口一致。此为工程视觉复核，不是用户视觉批准。1280 截图未保留，检查结果留在 `visual-results.json`。

## 重跑

在本目录运行 `./prepare.sh`，从同级 dist 复制独立 Skill 与原型到忽略的 `.work/`、叠加源码并冻结安装。随后在 `.work/skill/assets/harness` 运行 `pnpm run verify`；根目录运行 `node interaction.mjs` 和 `node visual.mjs`。只有设置 `PARTNER_UI_EVIDENCE=1` 才写成功截图；再运行 `python3 make-comparisons.py`（需 Pillow）生成并排和差异图。脚本使用本机端口 17932–17934 并在结束时关闭服务。实际测试路径为 `/templates/workbench-list` 和 `/templates/ai-assistant-workspace`，功能公开路由是 `/list` 和 `/workspace`。

## 限制

真实服务与权限、实际产品宿主、跨浏览器/设备、性能和生产资格均未验证。包资格与原始字节体积见 `delivery.json` 和 `evidence/route-chunks.json`；依赖树只发现 Vue 3.5.13，构建图仅见一组 3.5.13 runtime 模块，浏览器 app 为 3.5.13；预打包内部代码无法单独归因。页面不会将模拟成功当成真实服务完成。

重跑前 `prepare.sh` 校验当前与缓存 Skill 的 source lock 以及原型文件、runtime 和字体的 SHA-256；不匹配立即失败。交互断言失败返回非零退出码。
