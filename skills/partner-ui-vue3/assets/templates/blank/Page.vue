<script setup lang="ts">
import { reactive } from 'vue';
import {
  WorkbenchAlert,
  WorkbenchBreadcrumb,
  WorkbenchButton,
  WorkbenchFooter,
  WorkbenchTopNav,
} from '@workbench/ui-vue3';
import type { BlankApi } from './api';
import { copy } from './locale';
import { usePage } from './usePage';

defineOptions({ name: 'BlankTemplatePage' });

const props = defineProps<{ api: BlankApi }>();
const emit = defineEmits<{ secondary: [] }>();
const { count, busy, error, primary } = usePage(props.api);
const nav = reactive({
  active: 'home',
  tabs: [
    { value: 'home', label: copy.home },
    { value: 'sales', label: copy.sales },
    { value: 'service', label: copy.service },
  ],
  sites: [{ value: 'partner', label: copy.site }],
});
const crumbs = [
  { id: 'home', label: copy.home, href: '#' },
  { id: 'cur', label: copy.title },
];
function navigate(...args: unknown[]) {
  const event = args[1];
  if (event instanceof Event) event.preventDefault();
}
function activate(value: unknown) {
  if (typeof value === 'string' && nav.tabs.some((item) => item.value === value))
    nav.active = value;
}
</script>

<template>
  <div class="feature-page" data-template-ready="true">
    <WorkbenchTopNav
      :active-tab="nav.active"
      :tabs="nav.tabs"
      :sites="nav.sites"
      @update:active-tab="activate"
    />
    <main class="feature-container feature-stack blank-main" aria-labelledby="template-blank-title">
      <WorkbenchBreadcrumb :items="crumbs" @navigate="navigate" />
      <h1 id="template-blank-title" class="feature-title-xl">{{ copy.title }}</h1>
      <section class="feature-surface feature-stack">
        <p class="feature-text">{{ copy.intro }}</p>
        <div class="feature-row">
          <WorkbenchButton appearance="primary" :disabled="busy" @click="primary">{{
            copy.primary
          }}</WorkbenchButton>
          <WorkbenchButton appearance="secondary" @click="emit('secondary')">{{
            copy.secondary
          }}</WorkbenchButton>
          <span class="feature-text feature-muted" aria-live="polite">{{ copy.count(count) }}</span>
        </div>
        <WorkbenchAlert v-if="error" type="error" :message="error" :show-close="false" />
      </section>
    </main>
    <WorkbenchFooter :registration="{ id: 'registration', label: '' }" />
  </div>
</template>

<style scoped>
.blank-main {
  padding-block: var(--wb-spacing-component-lg) var(--wb-spacing-layout-section-gap-large);
}
</style>
