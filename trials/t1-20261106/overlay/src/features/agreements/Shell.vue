<script setup lang="ts">
defineOptions({ name: 'AgreementShell' });
import { defineAsyncComponent, inject, nextTick, ref } from 'vue';
import { WorkbenchButton } from '@workbench/ui-vue3';
import { RouterView } from 'vue-router';
import { agreementApiKey } from './api';
const api = inject(agreementApiKey);
if (!api) throw new Error('AGREEMENT_API_REQUIRED');
const Assistant = defineAsyncComponent(() => import('./Assistant.vue'));
const open = ref(false);
const mounted = ref(false);
const trigger = ref<HTMLElement | null>(null);
function show() {
  mounted.value = true;
  open.value = true;
}
async function close() {
  open.value = false;
  await nextTick();
  trigger.value?.querySelector('button')?.focus();
}
</script>
<template>
  <div class="feature-page shell">
    <div class="content">
      <div ref="trigger" class="trigger">
        <WorkbenchButton @click="show">打开协议助手</WorkbenchButton>
      </div>
      <RouterView v-slot="{ Component }"><component :is="Component" :api="api" /></RouterView>
    </div>
    <Assistant v-if="mounted" v-show="open" :api="api" @close="close" />
  </div>
</template>
<style scoped>
.shell {
  display: flex;
  min-height: 100vh;
}
.content {
  flex: 1;
  min-width: 0;
}
.trigger {
  display: flex;
  justify-content: flex-end;
  padding: var(--wb-spacing-component-lg);
}
</style>
