---
name: partner-ui-vue3
description: 用伙伴工作台 Workbench 与 AI UI 消费包，把需求、PRD 或既有原型实现为 Vue 3 业务模块。需要可维护的 Vue 源码时使用；离线 HTML 演示使用 partner-ui-pages。
---

# 伙伴工作台 Vue 3

以随包锁定的组件和元数据实现业务模块；宿主负责路由、API、鉴权和数据保存。当前交付包处于开发通道，不能以检查通过替代生产批准。

先查 `references/workbench/index.md` 选资产，再按对应页核对公开 props、事件和插槽。`references/ai-ui.md` 记录 AI UI 当前可取得的元数据范围。完整 SFC 官方示例直接用于 Vue 文件；有明确不可移植原因的记录应回到 Studio 核对。

生产模块只使用真实组件与 Token，不依赖全局 `PartnerUI` 或演示 mock。已有原型中的 x-template、模拟会话和转换器属于原型工具，需要转为模块自己的状态、类型契约与注入 transport。功能代码必须覆盖加载、空、错误、取消和关键键盘路径；API 未提供时明确标为 assumed。

选择 Vue 3.5.13；通过 `vendor/` 中锁定 tarball 和 `file:` 安装两个组件包，保留 SHA-256 与 source commit。宿主提供批准字体，历史存储默认注入且生产关闭持久化。发布频率由用户决定。

已提供包锁、生成参考、`assets/scaffold/` 产品模块起步代码和 `assets/harness/` 验证工程（用法见各自 README）；业务模板及交付检查将在对应实施阶段加入。不得把当前参考包描述为已完成业务交付验证。
