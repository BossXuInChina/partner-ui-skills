<script setup lang="ts">
defineOptions({ name: 'AgreementList' });
import { computed, reactive } from 'vue';
import type { HTMLAttributes } from 'vue';
import { useRouter } from 'vue-router';
import {
  WorkbenchButton,
  WorkbenchInput,
  WorkbenchSelect,
  WorkbenchTable,
} from '@workbench/ui-vue3';
import type { AgreementApi } from './api';
import { useResource } from './useResource';
const props = defineProps<{ api: AgreementApi }>();
const router = useRouter();
const draft = reactive({ keyword: '', status: 'all' });
const query = reactive({ ...draft, page: 1, pageSize: 10 });
const { data, loading, error, reload } = useResource((signal) =>
  props.api.list({ ...query }, signal),
);
const rows = computed(() => (data.value?.items ?? []).map((item) => ({ ...item })));
const inputAttrs: Pick<HTMLAttributes, 'aria-label'> = {
  'aria-label': '名称或编号',
};
const columns = [
  { key: 'id', title: '协议编号', field: 'id' },
  { key: 'name', title: '协议名称', field: 'name', primary: true },
  { key: 'partner', title: '伙伴', field: 'partner' },
  { key: 'owner', title: '负责人', field: 'owner' },
  { key: 'status', title: '状态', field: 'status' },
  { key: 'endDate', title: '到期日期', field: 'endDate' },
];
const options = [
  { value: 'all', label: '全部' },
  ...['生效中', '待续签', '审批中', '已到期'].map((value) => ({
    value,
    label: value,
  })),
];
function search() {
  Object.assign(query, draft, { page: 1 });
  void reload();
}
function reset() {
  Object.assign(draft, { keyword: '', status: 'all' });
  search();
}
function setStatus(value: unknown) {
  if (Array.isArray(value) && typeof value[0] === 'string') draft.status = value[0];
}
function page(value: number) {
  query.page = value;
  void reload();
}
function setPageSize(value: number) {
  query.pageSize = value;
  query.page = 1;
  void reload();
}
void reload();
</script>
<template>
  <main class="feature-container feature-stack">
    <h1 class="feature-title-xl">协议管理</h1>
    <section class="feature-surface feature-stack">
      <div class="filters">
        <label
          >名称或编号<WorkbenchInput
            :model-value="draft.keyword"
            v-bind="inputAttrs"
            @update:model-value="draft.keyword = String($event)" /></label
        ><label
          >状态<WorkbenchSelect
            :model-value="[draft.status]"
            :options="options"
            label="状态"
            @update:model-value="setStatus" /></label
        ><WorkbenchButton @click="search">搜索</WorkbenchButton
        ><WorkbenchButton appearance="secondary" @click="reset">重置</WorkbenchButton>
      </div>
      <p v-if="loading" role="status">加载中…</p>
      <p v-else-if="error" role="alert">
        加载失败 <WorkbenchButton @click="reload">重试</WorkbenchButton>
      </p>
      <template v-else
        ><WorkbenchTable
          :columns="columns"
          :rows="rows"
          caption="协议列表"
          row-key="id"
          :total="data?.total ?? 0"
          :page="query.page"
          :page-size="query.pageSize"
          @update:page="page"
          @update:page-size="setPageSize"
          ><template #cell-name="{ row }"
            ><button
              class="link"
              @click="router.push('/agreements/' + encodeURIComponent(String(row.id)))"
            >
              {{ row.name }}
            </button></template
          ></WorkbenchTable
        >
        <p v-if="!data?.items.length" role="status">暂无协议</p></template
      >
    </section>
  </main>
</template>
<style scoped>
.filters {
  display: flex;
  align-items: end;
  gap: var(--wb-spacing-component-lg);
  flex-wrap: wrap;
}
.filters label {
  display: grid;
  gap: var(--wb-spacing-component-sm);
}
.link {
  border: 0;
  background: transparent;
  color: var(--wb-color-text-action);
  cursor: pointer;
  font: inherit;
}
</style>
