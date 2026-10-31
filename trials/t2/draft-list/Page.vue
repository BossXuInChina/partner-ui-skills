<script setup lang="ts">
// NEEDS REVIEW: static extraction only. This guard intentionally blocks mounting.
// Replace fixtures/helpers, add typed APIs/states and complete conversion.md before removing it.
import { GlobalMessageStack } from "@workbench/ui-vue3";
import { WorkbenchBreadcrumb } from "@workbench/ui-vue3";
import { WorkbenchButton } from "@workbench/ui-vue3";
import { WorkbenchCollapse } from "@workbench/ui-vue3";
import { WorkbenchCollapseItem } from "@workbench/ui-vue3";
import { WorkbenchDatePicker } from "@workbench/ui-vue3";
import { WorkbenchDraftListFilter } from "@workbench/ui-vue3";
import { WorkbenchFeedbackDialog } from "@workbench/ui-vue3";
import { WorkbenchFooter } from "@workbench/ui-vue3";
import { WorkbenchForm } from "@workbench/ui-vue3";
import { WorkbenchFormItem } from "@workbench/ui-vue3";
import { WorkbenchInput } from "@workbench/ui-vue3";
import { WorkbenchLink } from "@workbench/ui-vue3";
import { WorkbenchManagementFormModal } from "@workbench/ui-vue3";
import { WorkbenchSelect } from "@workbench/ui-vue3";
import { WorkbenchTable } from "@workbench/ui-vue3";
import { WorkbenchTag } from "@workbench/ui-vue3";
import { WorkbenchTopNav } from "@workbench/ui-vue3";
import { computed as __vue_computed } from "vue";
import { reactive as __vue_reactive } from "vue";
import { ref as __vue_ref } from "vue";
// TODO(conversion.md#mount): PartnerUI.mount (mount)
throw new Error('PROTOTYPE_CONVERSION_NEEDS_REVIEW');
function __prototypeMigrationRequired(_source: string): never { throw new Error('PROTOTYPE_HELPER_NEEDS_MIGRATION'); }
const nav = __vue_reactive({
      active: 'sales',
      tabs: [{ value: 'home', label: '首页' }, { value: 'programs', label: '伙伴计划' }, { value: 'marketing', label: '营销' }, { value: 'sales', label: '销售' }, { value: 'service', label: '服务' }],
      sites: [{ value: 'partner', label: '企业伙伴网站' }],
    })
    const crumbs = [{ id: 'home', label: '首页', href: '#' }, { id: 'sales', label: '销售', href: '#' }, { id: 'cur', label: '协议管理' }]

    const rows = __vue_ref(seed)
    const statusTone = { 生效中: 'success', 待续签: 'warning', 审批中: 'info', 已到期: 'none' }
    const statusOptions = [{ value: 'all', label: '全部状态' }, ...statuses.map((s) => ({ value: s, label: s }))]
    const columns = [
      { key: 'id', title: '协议编号', field: 'id', width: 150 },
      { key: 'name', title: '协议名称', field: 'name', primary: true, fluid: true, ellipsis: true },
      { key: 'partner', title: '合作伙伴', field: 'partner', width: 140 },
      { key: 'endDate', title: '到期日期', field: 'endDate', width: 130, sortable: true },
      { key: 'amount', title: '金额（元）', field: 'amount', width: 140, align: 'end', sortable: true },
      { key: 'status', title: '状态', field: 'status', width: 110 },
    ]
    const rowActions = (row) => [
      { id: 'view', label: '查看' },
      { id: 'renew', label: '续签', disabled: row.status === '审批中' },
      { id: 'stop', label: '终止' },
    ]

    const draft = __vue_reactive({ keyword: '', status: 'all' })
    const applied = __vue_reactive({ keyword: '', status: 'all' })
    const sort = __vue_ref(null)
    const page = __vue_ref(1)
    const pageSize = __vue_ref(10)
    const selected = __vue_ref([])
    const loading = __vue_ref(false)

    const filtered = __vue_computed(() => {
      const k = applied.keyword.trim()
      let list = rows.value.filter((r) => (!k || [r.id, r.name, r.partner].some((v) => v.includes(k))) && (applied.status === 'all' || r.status === applied.status))
      if (sort.value) {
        const { key, direction } = sort.value
        const f = direction === 'asc' ? 1 : -1
        list = [...list].sort((a, b) => (a[key] > b[key] ? f : a[key] < b[key] ? -f : 0))
      }
      return list
    })
    const pageRows = __vue_computed(() => filtered.value.slice((page.value - 1) * pageSize.value, page.value * pageSize.value))

    const messages = __vue_ref([])
    function notify(message, type = 'success') { messages.value = [{ id: Date.now(), message, type }, ...messages.value] }
    function dismiss(e) { messages.value = messages.value.filter((m) => m.id !== e.id) }

    function applyFilter() {
      loading.value = true
      setTimeout(() => { Object.assign(applied, draft); page.value = 1; selected.value = []; loading.value = false }, 400)
    }
    function resetFilter() { Object.assign(draft, { keyword: '', status: 'all' }); applyFilter() }

    const confirm = __vue_reactive({ open: false, message: '', row: null })
    function onRowAction({ row, action }) {
      if (action.id === 'view') openDetail(row)
      if (action.id === 'renew') { row.status = '审批中'; notify(`已提交「${row.name}」的续签申请`) }
      if (action.id === 'stop') Object.assign(confirm, { open: true, row, message: `终止后「${row.name}」将无法继续履约，此操作不可撤销。` })
    }
    async function confirmHandler(action) {
      if (action.id === 'ok') { rows.value = rows.value.filter((r) => r !== confirm.row); notify('协议已终止') }
      return true
    }
    function batchRenew(keys) { rows.value.forEach((r) => { if (keys.includes(r.id) && r.status !== '审批中') r.status = '审批中' }); notify(`已提交 ${keys.length} 份协议的续签申请`); selected.value = [] }
    function openDetail(row) { notify(`打开详情：${row.name}`, 'info') }
    function exportList() { notify(`已导出 ${filtered.value.length} 条记录`) }

    const createOpen = __vue_ref(false)
    const form = __vue_reactive({ name: '', partner: '', endDate: '' })
    function openCreate() { Object.assign(form, { name: '', partner: '', endDate: '' }); createOpen.value = true }
    function saveCreate() {
      rows.value = [{ id: `HT-2026-${String(rows.value.length + 200).padStart(4, '0')}`, name: form.name, partner: form.partner, endDate: form.endDate || '—', amount: 0, status: '审批中' }, ...rows.value]
      createOpen.value = false
      notify('协议已创建')
    }

</script>

<template>
<WorkbenchTopNav :tabs="nav.tabs" :sites="nav.sites" v-model:active-tab="nav.active" />

  <main class="pui-container pui-stack" style="padding-block: var(--wb-spacing-component-lg) var(--wb-spacing-layout-section-gap-large)">
    <WorkbenchBreadcrumb :items="crumbs" @navigate="(item, e) => e?.preventDefault()" />

    <!-- 标题区：标题左、操作右；同页只保留一个主要按钮 -->
    <header class="page-head">
      <div>
        <h1 class="pui-title-xl">协议管理</h1>
        <p class="pui-text pui-muted">管理与合作伙伴签订的协议，跟踪到期与续签进度。（演示数据）</p>
      </div>
      <div class="pui-row">
        <WorkbenchButton appearance="secondary" @click="exportList">导出</WorkbenchButton>
        <WorkbenchButton appearance="primary" @click="openCreate">新建协议</WorkbenchButton>
      </div>
    </header>

    <section class="pui-surface pui-stack">
      <!-- 先编辑条件、再点查询 -->
      <WorkbenchDraftListFilter :field-count="2" @apply="applyFilter" @reset="resetFilter">
        <label class="filter-field pui-text">关键词
          <WorkbenchInput v-model="draft.keyword" aria-label="关键词" placeholder="协议名称 / 编号 / 伙伴" @keydown.enter="applyFilter" />
        </label>
        <WorkbenchFormItem label="协议状态">
          <WorkbenchSelect :model-value="[draft.status]" :options="statusOptions" label="协议状态" teleport-panel
            @update:model-value="draft.status = $event[0] || 'all'" />
        </WorkbenchFormItem>
      </WorkbenchDraftListFilter>

      <WorkbenchTable
        caption="协议列表" :columns="columns" :rows="pageRows" row-key="id"
        :total="filtered.length" v-model:page="page" v-model:page-size="pageSize" :page-size-options="[5, 10, 20]"
        :sort="sort" @update:sort="sort = $event; page = 1"
        selectable v-model:selected-row-keys="selected"
        :row-actions="rowActions" @row-action="onRowAction"
        :loading="loading" :empty-kind="applied.keyword || applied.status !== 'all' ? 'filtered' : 'initial'">
        <template #cell-name="{ row }"><WorkbenchLink href="#" @click.prevent="openDetail(row)">{{ row.name }}</WorkbenchLink></template>
        <template #cell-status="{ row }"><WorkbenchTag :label="row.status" variant="status-subtle" size="small" :status="statusTone[row.status]" /></template>
        <template #cell-amount="{ row }"><span class="pui-num">{{ row.amount.toLocaleString('zh-CN') }}</span></template>
        <template #batch-actions="{ selectedRowKeys }">
          <WorkbenchButton appearance="text" @click="batchRenew(selectedRowKeys)">批量续签</WorkbenchButton>
        </template>
      </WorkbenchTable>
    </section>

    <!-- 说明区：演示数据、自建组件、待确认项 -->
    <WorkbenchCollapse class="notes">
      <WorkbenchCollapseItem title="页面说明">
        <p class="pui-text">数据为本地演示数据，未连接真实服务。新建组件：无。</p>
      </WorkbenchCollapseItem>
    </WorkbenchCollapse>
  </main>

  <WorkbenchFooter :registration="{ id: 'registration', label: '' }" />

  <!-- 新建：单层管理表单弹窗 -->
  <WorkbenchManagementFormModal v-model="createOpen" title="新建协议">
    <WorkbenchForm ref="form" title="协议信息" :title-visible="false" :model="form" @submit="saveCreate">
      <WorkbenchFormItem label="协议名称" prop="name" required :rules="[{ required: true, message: '请输入协议名称' }]">
        <WorkbenchInput v-model="form.name" aria-label="协议名称" placeholder="请输入" />
      </WorkbenchFormItem>
      <WorkbenchFormItem label="合作伙伴" prop="partner" required :rules="[{ required: true, message: '请输入合作伙伴' }]">
        <WorkbenchInput v-model="form.partner" aria-label="合作伙伴" placeholder="请输入" />
      </WorkbenchFormItem>
      <WorkbenchFormItem label="到期日期" prop="endDate">
        <WorkbenchDatePicker v-model="form.endDate" aria-label="到期日期" />
      </WorkbenchFormItem>
    </WorkbenchForm>
    <template #footer>
      <div class="pui-row" style="justify-content: flex-end">
        <WorkbenchButton appearance="secondary" @click="createOpen = false">取消</WorkbenchButton>
        <WorkbenchButton appearance="primary" @click="$refs.form.submit()">保存</WorkbenchButton>
      </div>
    </template>
  </WorkbenchManagementFormModal>

  <!-- 危险操作确认 -->
  <WorkbenchFeedbackDialog v-model="confirm.open" type="warning" title="确认终止协议？" :message="confirm.message"
    :primary-action="{ id: 'ok', label: '终止' }" :secondary-action="{ id: 'cancel', label: '取消' }"
    :action-handler="confirmHandler" />

  <GlobalMessageStack :items="messages" @dismiss="dismiss" />
</template>

<style scoped>
/* TODO(conversion.md#layout): review source CSS and host font/layout boundaries. */
/* 页面布局只用 Foundation Token；组件内部样式不覆盖。 */
    .page-head { display: flex; align-items: center; justify-content: space-between; gap: var(--wb-spacing-component-lg); }
    .page-head p { margin: var(--wb-spacing-component-xs) 0 0; }
    .filter-field { display: flex; flex-direction: column; gap: var(--wb-spacing-component-sm); min-width: 0; }
    .notes { margin-top: var(--wb-spacing-layout-section-gap); }
</style>
