// 业务 Block：标准筛选与表格；仅发出 open 意图，由所属页面导航。
import { computed, defineComponent } from 'vue';
import { WorkbenchDraftListFilter, WorkbenchInput, WorkbenchTable, WorkbenchLink } from '@workbench/ui-vue3';
import { store } from '../state/store.js';
export default defineComponent({
  name: 'PartnerList', components: { WorkbenchDraftListFilter, WorkbenchInput, WorkbenchTable, WorkbenchLink },
  emits: ['open'],
  setup() {
    const rows = computed(() => store.partners.filter(item => item.name.includes(store.filterApplied.trim())));
    const columns = [{ key: 'name', title: '伙伴名称', field: 'name' }, { key: 'region', title: '所属区域', field: 'region' }, { key: 'owner', title: '负责人', field: 'owner' }];
    function apply() { store.filterApplied = store.filterDraft; }
    function reset() { store.filterDraft = store.filterApplied = ''; }
    return { store, rows, columns, apply, reset };
  },
  template: `<section class="pui-surface pui-stack">
    <WorkbenchDraftListFilter :field-count="1" @apply="apply" @reset="reset">
      <label class="demo-field">伙伴名称<WorkbenchInput v-model="store.filterDraft" aria-label="筛选伙伴名称" @keydown.enter="apply" /></label>
    </WorkbenchDraftListFilter>
    <WorkbenchTable caption="伙伴列表" :columns="columns" :rows="rows" row-key="id" :total="rows.length" :empty-kind="store.filterApplied ? 'filtered' : 'initial'">
      <template #cell-name="{ row }"><WorkbenchLink :href="'#/detail?id=' + row.id" @click.prevent="$emit('open', row.id)">{{ row.name }}</WorkbenchLink></template>
    </WorkbenchTable>
  </section>`,
});
