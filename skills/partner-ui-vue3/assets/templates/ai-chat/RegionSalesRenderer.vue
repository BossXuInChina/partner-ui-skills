<script setup lang="ts">
import { computed } from 'vue';
import { useMessageContent, type BubbleContentRendererProps } from '@opentiny/tiny-robot';
import { WorkbenchTable } from '@workbench/ui-vue3';
import { isRegionSalesPart } from './types';
import { text } from './locale';
const props = defineProps<BubbleContentRendererProps>();
const { content } = useMessageContent(props);
const part = computed(() => (isRegionSalesPart(content.value) ? content.value : null));
</script>
<template>
  <WorkbenchTable
    v-if="part"
    :caption="text.tableCaption"
    :columns="text.columns"
    :rows="part.rows"
    row-key="region"
  />
  <p v-else role="status">{{ text.unsupported }}</p>
</template>
