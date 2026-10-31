<script setup lang="ts">
import { computed } from 'vue';
import { useMessageContent, type BubbleContentRendererProps } from '@opentiny/tiny-robot';
import { AgreementTable } from 'huawei-partner-ai-ui';
import { isAgreementsPart } from '../parts';
import { useBusinessRendererActions } from '../renderer-context';
import { zhCN } from '../../locale/zh-CN';
const props = defineProps<BubbleContentRendererProps>();
const { content } = useMessageContent(props);
const part = computed(() => (isAgreementsPart(content.value) ? content.value : null));
const actions = useBusinessRendererActions();
</script>
<template>
  <div class="partner-ai">
    <AgreementTable v-if="part" :agreements="part.agreements" @open="actions.openAgreement" />
    <p v-else role="status">{{ zhCN.assistant.unsupportedContent }}</p>
  </div>
</template>
