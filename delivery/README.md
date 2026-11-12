# Skill 安装包归档

这里按 Skill 分目录保存可分发的独立 ZIP；旧版本和历史预览包保留原始字节。每个 ZIP 解压后包含独立的 Skill 文件夹，不需要维护仓库。功能运行依赖及客户端安装方式见包内说明。

当前经 Windows 和 macOS 基础使用及浏览器冒烟验证的预览包：

- [partner-ui-pages](partner-ui-pages/partner-ui-pages-0.3.1-preview.20261112.1.zip)
- [partner-ui-vue3](partner-ui-vue3/partner-ui-vue3-0.2.2-preview.20261112.1.zip)
- [partner-ui-review](partner-ui-review/partner-ui-review-0.1.7-preview.20261112.1.zip)
- [design-requirement-canvas](design-requirement-canvas/design-requirement-canvas-1.1.1-preview.20261112.1.zip)

完整历史和每个 ZIP 的 SHA-256、字节数与来源类别见 [index.json](index.json)。其中 `github-release` / `github-prerelease` 表示已核对 GitHub 对应 Release 资产的校验和；`local-history` 代表本机保留的历史包，不据此推断其曾公开发布或重新验收；`validated-build` 记录本次通过双系统冒烟验证的构建包。原始清单位于 [provenance](provenance/)，其中各批次清单中的文件名按原始交付保留，不因本目录布局或下述重命名而改写。

**Review 0.1.6 的两个原件不同：** `partner-ui-review-0.1.6.zip` 对应 2026-11-06 GitHub Release；`partner-ui-review-0.1.6-local-20261108.zip` 是 2026-11-08 本地包，其 ZIP 内声明仍为 0.1.6。两者分别保留、校验，不能视为同一构建。

在仓库根目录运行 `pnpm verify:delivery` 可验证全部已登记包的字节数和 SHA-256，并发现未登记的 ZIP。新增交付先在干净源码提交上运行 `pnpm package:release`，再运行 `pnpm archive:delivery`；脚本核验清单、ZIP 完整性与 Skill 身份，将四个包和原始清单归档。已有文件同名但内容不同时会拒绝覆盖，需先区分版本；归档后审查并提交 `delivery/` 的变更。构建和归档不会自动推送或发布。

历史及预览包的能力范围以各自清单和原记录为准；归档不改变其验证结果或生产资格。
