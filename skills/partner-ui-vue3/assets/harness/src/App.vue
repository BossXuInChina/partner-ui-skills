<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router';
import { copy } from './content/zh-CN';
const route = useRoute();
</script>

<template>
  <div class="app-shell">
    <header v-if="!route.meta.template" class="app-header">
      <span>{{ copy.appName }}</span>
      <nav aria-label="页面导航">
        <RouterLink :to="{ name: 'blank' }">{{ copy.blankLink }}</RouterLink>
      </nav>
    </header>
    <RouterView />
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100dvh;
  color: var(--wb-color-text-primary);
  background: var(--wb-color-surface-page);
  font-size: var(--wb-font-body-m-font-size);
  line-height: var(--wb-font-body-m-line-height);
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--wb-spacing-component-lg);
  padding: var(--wb-spacing-layout-container-block) var(--wb-spacing-layout-container-inline);
  border-bottom: 1px solid var(--wb-color-border-separator);
}

a {
  color: var(--wb-color-text-action);
}

a:focus-visible {
  outline: 2px solid var(--wb-color-border-focus);
  outline-offset: var(--wb-spacing-component-xs);
}
</style>
