<script setup lang="ts">
import { computed } from 'vue';
import { useMessageContent, type BubbleContentRendererProps } from '@opentiny/tiny-robot';
import { BusinessNavigationCard } from 'huawei-partner-ai-ui';
import { isNavigationPart } from '../parts';
import { useBusinessRendererActions } from '../renderer-context';
import { zhCN } from '../../locale/zh-CN';
const props = defineProps<BubbleContentRendererProps>();
const { content } = useMessageContent(props);
const part = computed(() => (isNavigationPart(content.value) ? content.value : null));
const actions = useBusinessRendererActions();
</script>
<template>
  <div class="partner-ai">
    <BusinessNavigationCard
      v-if="part"
      :title="part.title"
      :description="part.description"
      :target="part.target"
      @navigate="actions.navigate"
    />
    <p v-else role="status">{{ zhCN.assistant.unsupportedContent }}</p>
  </div>
</template>
