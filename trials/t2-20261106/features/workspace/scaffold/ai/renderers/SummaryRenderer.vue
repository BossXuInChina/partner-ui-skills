<script setup lang="ts">
import { computed } from 'vue';
import { useMessageContent, type BubbleContentRendererProps } from '@opentiny/tiny-robot';
import { AiSummaryCard } from 'huawei-partner-ai-ui';
import { isSummaryPart } from '../parts';
import { zhCN } from '../../locale/zh-CN';
const props = defineProps<BubbleContentRendererProps>();
const { content } = useMessageContent(props);
const part = computed(() => (isSummaryPart(content.value) ? content.value : null));
</script>
<template>
  <div class="partner-ai">
    <AiSummaryCard v-if="part" :text="part.text" />
    <p v-else role="status">{{ zhCN.assistant.unsupportedContent }}</p>
  </div>
</template>
