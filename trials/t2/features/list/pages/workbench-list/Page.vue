<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { ref } from 'vue';
import {
  WorkbenchAlert,
  WorkbenchBreadcrumb,
  WorkbenchButton,
  WorkbenchDatePicker,
  WorkbenchDraftListFilter,
  WorkbenchFeedbackDialog,
  WorkbenchFooter,
  WorkbenchForm,
  WorkbenchFormItem,
  WorkbenchInput,
  WorkbenchLink,
  WorkbenchManagementFormModal,
  WorkbenchSelect,
  WorkbenchTable,
  WorkbenchTag,
  WorkbenchTopNav,
} from '@workbench/ui-vue3';
import MessagesHost from '../../scaffold/feedback/MessagesHost.vue';
import { usePage } from './usePage';
import type { WorkbenchListApi } from './api';
defineOptions({ name: 'WorkbenchListPage' });
const props = defineProps<{ api: WorkbenchListApi }>();
const {
  setCreateOpen,
  setConfirmOpen,
  setKeyword,
  onKeywordKeydown,
  updateActiveTab,
  nav,
  crumbs,
  columns,
  statusOptions,
  rowActions,
  draft,
  applied,
  sort,
  page,
  pageSize,
  selected,
  loading,
  busy,
  error,
  reload,
  filtered,
  pageRows,
  feedback,
  applyFilter,
  resetFilter,
  setStatus,
  updateSort,
  confirm,
  onRowAction,
  confirmHandler,
  batchRenew,
  openDetail,
  statusLabel,
  rowTone,
  formatAmount,
  exportList,
  createOpen,
  form,
  validation,
  openCreate,
  setCreateField,
  setCreateEndDate,
  saveCreate,
  preventNavigation,
} = usePage(props.api);
const formRef = ref<{ submit(event?: Event): Promise<unknown> } | null>(null);
const submitForm = () => {
  void formRef.value?.submit();
};
const keywordEvents: Pick<HTMLAttributes, 'aria-label' | 'onKeydown'> = {
  'aria-label': copy.text27,
  onKeydown: onKeywordKeydown,
};
const a11y = (label: string): Pick<HTMLAttributes, 'aria-label'> => ({ 'aria-label': label });

import { copy } from './locale/zh-CN';
</script>

<template>
  <div class="feature-page" :data-template-ready="loading ? 'false' : 'true'">
    <WorkbenchTopNav
      :tabs="nav.tabs"
      :sites="nav.sites"
      :active-tab="nav.active"
      @update:active-tab="updateActiveTab"
    />

    <main
      class="feature-container feature-stack"
      style="
        padding-block: var(--wb-spacing-component-lg) var(--wb-spacing-layout-section-gap-large);
      "
    >
      <WorkbenchAlert
        v-if="error"
        type="error"
        :message="error"
        :show-close="false"
      /><WorkbenchButton v-if="error" appearance="secondary" @click="reload">{{
        copy.text36
      }}</WorkbenchButton>
      <WorkbenchBreadcrumb :items="crumbs" @navigate="preventNavigation" />

      <header class="page-head">
        <div>
          <h1 class="feature-title-xl">{{ copy.text07 }}</h1>
          <p class="feature-text feature-muted">{{ copy.text37 }}</p>
        </div>
        <div class="feature-row">
          <WorkbenchButton appearance="secondary" @click="exportList">{{
            copy.text38
          }}</WorkbenchButton>
          <WorkbenchButton appearance="primary" @click="openCreate">{{
            copy.text31
          }}</WorkbenchButton>
        </div>
      </header>

      <section class="feature-surface feature-stack">
        <WorkbenchDraftListFilter :field-count="2" @apply="applyFilter" @reset="resetFilter">
          <label class="filter-field feature-text"
            >{{ copy.text27 }}
            <WorkbenchInput
              :model-value="draft.keyword"
              v-bind="keywordEvents"
              :placeholder="copy.text28"
              @update:model-value="setKeyword"
            />
          </label>
          <WorkbenchFormItem :label="copy.text29">
            <WorkbenchSelect
              :model-value="[draft.status]"
              :options="statusOptions"
              :label="copy.text29"
              teleport-panel
              @update:model-value="setStatus"
            />
          </WorkbenchFormItem>
        </WorkbenchDraftListFilter>

        <WorkbenchTable
          v-model:page="page"
          v-model:page-size="pageSize"
          v-model:selected-row-keys="selected"
          :caption="copy.text30"
          :columns="columns"
          :rows="pageRows"
          row-key="id"
          :total="filtered.length"
          :page-size-options="[5, 10, 20]"
          :sort="sort"
          selectable
          :row-actions="rowActions"
          :loading="loading"
          :empty-kind="applied.keyword || applied.status !== 'all' ? 'filtered' : 'initial'"
          @update:sort="updateSort"
          @row-action="onRowAction"
        >
          <template #cell-name="{ row }"
            ><WorkbenchLink href="#" @click.prevent="openDetail(row)">{{
              row.name
            }}</WorkbenchLink></template
          >
          <template #cell-status="{ row }"
            ><WorkbenchTag
              :label="statusLabel(row)"
              variant="status-subtle"
              size="small"
              :status="rowTone(row)"
          /></template>
          <template #cell-amount="{ row }"
            ><span class="feature-num">{{ formatAmount(row.amount) }}</span></template
          >
          <template #batch-actions="{ selectedRowKeys }">
            <WorkbenchButton appearance="text" @click="batchRenew(selectedRowKeys)">{{
              copy.text39
            }}</WorkbenchButton>
          </template>
        </WorkbenchTable>
      </section>
    </main>

    <WorkbenchFooter :registration="{ id: 'registration', label: '' }" />

    <WorkbenchManagementFormModal
      :model-value="createOpen"
      :title="copy.text31"
      @update:model-value="setCreateOpen"
    >
      <WorkbenchAlert v-if="validation" type="error" :message="validation" :show-close="false" />
      <WorkbenchForm
        ref="formRef"
        :title="copy.text32"
        :title-visible="false"
        :model="form"
        @submit="saveCreate"
      >
        <WorkbenchFormItem
          :label="copy.text13"
          prop="name"
          required
          :rules="[{ required: true, message: copy.requiredName }]"
        >
          <WorkbenchInput
            :model-value="form.name"
            v-bind="a11y(copy.text13)"
            :placeholder="copy.text33"
            @update:model-value="setCreateField('name', $event)"
          />
        </WorkbenchFormItem>
        <WorkbenchFormItem
          :label="copy.text14"
          prop="partner"
          required
          :rules="[{ required: true, message: copy.requiredPartner }]"
        >
          <WorkbenchInput
            :model-value="form.partner"
            v-bind="a11y(copy.text14)"
            :placeholder="copy.text33"
            @update:model-value="setCreateField('partner', $event)"
          />
        </WorkbenchFormItem>
        <WorkbenchFormItem :label="copy.text15" prop="endDate">
          <WorkbenchDatePicker
            :model-value="form.endDate"
            v-bind="a11y(copy.text15)"
            @update:model-value="setCreateEndDate"
          />
        </WorkbenchFormItem>
      </WorkbenchForm>
      <template #footer>
        <div class="feature-row" style="justify-content: flex-end">
          <WorkbenchButton appearance="secondary" :disabled="busy" @click="createOpen = false">{{
            copy.text35
          }}</WorkbenchButton>
          <WorkbenchButton appearance="primary" :disabled="busy" @click="submitForm">{{
            copy.text40
          }}</WorkbenchButton>
        </div>
      </template>
    </WorkbenchManagementFormModal>

    <WorkbenchFeedbackDialog
      :model-value="confirm.open"
      type="warning"
      :title="copy.text34"
      :message="confirm.message"
      :primary-action="{ id: 'ok', label: copy.text20 }"
      :secondary-action="{ id: 'cancel', label: copy.text35 }"
      :action-handler="confirmHandler"
      @update:model-value="setConfirmOpen"
    />

    <MessagesHost :messages="feedback" />
  </div>
</template>

<style scoped>
.page-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--wb-spacing-component-lg);
}
.page-head p {
  margin: var(--wb-spacing-component-xs) 0 0;
}
.filter-field {
  display: flex;
  flex-direction: column;
  gap: var(--wb-spacing-component-sm);
  min-width: 0;
}
</style>
