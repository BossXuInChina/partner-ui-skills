<script setup lang="ts">
defineOptions({ name: 'AgreementAssistant' });
import { AgreementAssistantPanel } from 'huawei-partner-ai-ui';
import AssistantCloseButton from '@scaffold/ai/AssistantCloseButton.vue';
import type { AgreementApi } from './api';
const props = defineProps<{ api: AgreementApi }>();
defineEmits<{ close: [] }>();
const history = {
  namespace: 'agreements',
  storage: props.api.storage ?? { read: async () => null, write: async () => {} },
};
</script>
<template>
  <aside class="partner-ai assistant" aria-label="协议助手">
    <AgreementAssistantPanel
      :adapter="api.assistant"
      business-action-mode="host"
      :history-options="history"
    >
      <template #toolbar-end><AssistantCloseButton @click="$emit('close')" /></template>
    </AgreementAssistantPanel>
  </aside>
</template>
<style scoped>
.assistant {
  width: 400px;
  height: 100vh;
  flex: none;
}
</style>
