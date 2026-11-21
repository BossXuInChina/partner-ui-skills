# 协议列表功能模块

以原版协议管理 HTML 为基线。`Page.vue` 负责页壳，`ListContent.vue` 提供面包屑、标题、操作、筛选、表格与分页。两种接入方式共用正文、`usePage.ts` 状态和注入的 API。

## 路由与宿主

在 Skill 根执行以下命令，将输出路径替换为消费工程中尚未创建的目录。输出的父目录须已存在。

```bash
node scripts/new_feature.mjs agreements --template workbench-list --out "<消费工程绝对路径>/agreements"
```

- 独立页从生成的 `index.ts` 使用 `createFeatureRoutes(api)`，自带导航和页脚。
- 已有工作台用 `createFeatureRoutes(api, { shell: 'host' })`。直接组合时传 `<Page :api="api" shell="host" />`。宿主提供导航、主内容滚动区和唯一页脚。内容与页脚放在同一个滚动视口中，宿主让短页页脚贴底、长页页脚随内容滚到末尾。页面在此模式下随内容自然撑开。
- 使用生成的 `index.ts` 时会引入共享布局样式，直接导入 SFC 时也需引入这份样式。应用入口引入一次 `@workbench/ui-vue3/styles.css` 并提供获批字体。生成器已将 `@scaffold` 引用改成相对路径。

## 改字段时的接入点

| 场景     | 改动位置                                                                                                                                                                                                                                                                                                                                                                         |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 协议管理 | 使用默认页面。表头与列配置在 `usePage.ts` 的 `columns`，定制单元格在 `ListContent.vue` 的 `#cell-列键`。保留唯一 `id` 行键与一列可伸缩的主列。分页总数继续来自全部过滤结果，当前页行来自 `pageRows`。                                                                                                                                                                            |
| 续签列表 | 状态、关键词照旧。增加 `Filter.within30Days: boolean`，初始及重置为 `false`。在 `#extra` 中使用 `WorkbenchCheckbox`，通过 `:model-value="draft.within30Days"` 和 `@update:model-value="draft.within30Days = $event === true"` 绑定草稿，设置 `label="未来 30 天到期"`。在页头与列表卡之间增加 `WorkbenchAlert`，以完整加载数据的到期数为提醒。续签文案集中在 `locale/zh-CN.ts`。 |
| 最终客户 | 扩展 `Agreement.finalCustomer`，并在 `decodeAgreements` 校验新增字段。旧记录缺省时可用可选字段，筛选和显示时将缺省视为空字符串。把 `{ key: 'finalCustomer', title: '最终客户', field: 'finalCustomer', width: 140, ellipsis: true }` 插到合作伙伴列后。增加 `Filter.finalCustomer: string`，初始及重置为空。                                                                     |

第三个字段放在 `ListContent.vue` 的 `<ListFilter>` 内，保留默认槽中的关键词和状态。例如最终客户使用下列插槽。

```vue
<template #extra>
  <WorkbenchFormItem label="最终客户">
    <WorkbenchInput
      v-model="draft.finalCustomer"
      v-bind="{ ...a11y('最终客户'), onKeydown: onKeywordKeydown }"
    />
  </WorkbenchFormItem>
</template>
```

有 `#extra` 时，模板使用自己的外层网格排列三个控件和原查询、重置动作。筛选容器宽度达到 968px 时全同行，第三项和按钮分用原动作列。656–967px 时前两个字段一行，第三项与动作在第二行。更窄时，字段顺排、动作最后右对齐，结果表始终在筛选区之后。两字段默认组合继续使用 `WorkbenchDraftListFilter` 的公开布局。添加更多字段时在模板外层决定布局，或按 Workbench 的 1–4 项布局接入并验证动作区换行。

两个扩展都需要将新增字段加入 `draft`、`applied` 和重置初始值。仅在 `filtered` 中读取已应用的值，并让 `hasAppliedFilters` 识别新增条件，用于正确的结果空态。继续由 `applyFilter` 提交整个草稿、返回第一页并清除选择，由 `resetFilter` 恢复所有条件。最终客户可先将关键词与字段值 trim 后归一大小写，再作包含匹配。30 天筛选与提醒共用同一个日期判断，以业务时区取今天，比较合法的日历日期，从当天到第 30 天均包含，排除已到期、超过 30 天或无有效到期日的记录。样例数据至少覆盖第 -1、0、30、31 天及空日期。

## API 与数据

`load(signal)` 返回完整的 `Agreement[]`。模板在客户端过滤、排序和分页，服务端分页需要相应调整加载与状态契约。`create(input, context)` 返回服务端生成的完整行，`renew(ids, context)` 返回实际更新行。`terminate(id, context)` 在服务端完成后移除行。`exportRows(rows, context)` 在实际导出完成后 resolve。`openDetail(row)` 由宿主导航。

- `api.ts` 定义待确认的 DTO 和操作契约。宿主提供真实的 URL、鉴权、权限、路由、下载和幂等支持。HTTP 适配器先用 decoder 校验 `unknown` 响应，再交给页面。
- `requests.ts` 在作用域释放时取消请求，阻止并发提交和迟到响应。失败后显式重试，同一失败意图复用 `OperationContext.idempotencyKey`。
- `mocks/` 保存原示例数据和可注入的开发 API。测试显式设置 `VITE_ENABLE_MOCKS=true`，生产入口保留 mock guard。模块不使用浏览器持久化，依赖来源及资格见交付 `source.lock.json`。

## 定向验证

`__tests__/usePage.test.ts` 覆盖筛选、排序、分页、选择、创建、续签、终止、失败重试、导出、取消与 DTO。页面根的 `data-template-ready` 供浏览器等待初次加载完成。改第三字段后，在 1280 和 1440 视口确认草稿输入时表格行数不变、查询与重置同行、表格起点保持、分页与空结果可用。已有宿主同时检查只有一套导航与页脚，并验证内容区独立滚动与短页页脚贴底。
