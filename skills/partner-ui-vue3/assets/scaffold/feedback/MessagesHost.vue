<script setup lang="ts">
import { GlobalMessageStack } from '@workbench/ui-vue3';
import { computed } from 'vue';
import type { MessagesController } from './useMessages';
const props = withDefaults(defineProps<{ messages: MessagesController; autoClose?: number }>(), {
  autoClose: 2000,
});
const stackItems = computed(() => [...props.messages.items.value]);
</script>
<template>
  <GlobalMessageStack
    :items="stackItems"
    :auto-close="autoClose"
    @dismiss="messages.dismiss"
    @checkbox="messages.checkbox"
  />
</template>
