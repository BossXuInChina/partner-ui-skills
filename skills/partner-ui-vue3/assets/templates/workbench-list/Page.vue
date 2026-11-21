<script setup lang="ts">
import { WorkbenchFooter, WorkbenchTopNav } from '@workbench/ui-vue3';
import ListContent from './ListContent.vue';
import type { WorkbenchListApi } from './api';
import { usePage } from './usePage';
import type { WorkbenchListShell } from './types';

defineOptions({ name: 'WorkbenchListPage' });
const props = withDefaults(defineProps<{ api: WorkbenchListApi; shell?: WorkbenchListShell }>(), {
  shell: 'standalone',
});
const state = usePage(props.api);
const { loading, nav, updateActiveTab } = state;
</script>

<template>
  <div
    class="feature-page"
    :class="{ 'list-page-in-host': shell === 'host' }"
    :data-template-ready="loading ? 'false' : 'true'"
  >
    <WorkbenchTopNav
      v-if="shell === 'standalone'"
      :tabs="nav.tabs"
      :sites="nav.sites"
      :active-tab="nav.active"
      @update:active-tab="updateActiveTab"
    />
    <ListContent
      :state="state"
      :as="shell === 'host' ? 'div' : 'main'"
    />
    <WorkbenchFooter
      v-if="shell === 'standalone'"
      :registration="{ id: 'registration', label: '' }"
    />
  </div>
</template>

<style scoped>
.list-page-in-host {
  min-height: 0;
}
</style>
