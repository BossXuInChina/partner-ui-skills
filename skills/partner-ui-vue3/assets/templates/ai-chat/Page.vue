<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import {
  WorkbenchTopNav,
  WorkbenchBreadcrumb,
  WorkbenchButton,
  WorkbenchCard,
} from '@workbench/ui-vue3';
import MessagesHost from '@scaffold/feedback/MessagesHost.vue';
import type { AiChatApi } from './api';
import type { ChatHistoryStorage } from './types';
import { usePage } from './usePage';
import { text, welcome, pills, prompts } from './locale';
defineOptions({ name: 'AiChatPage' });
const props = defineProps<{
  api: AiChatApi;
  historyNamespace: string;
  storage?: ChatHistoryStorage;
}>();
const ChatPanel = defineAsyncComponent(() =>
  import('huawei-partner-ai-ui').then((module) => module.ChatPanel),
);
const {
  session,
  feedback,
  renderers,
  ready,
  rendererError,
  loadRenderers,
  activeTab,
  navigateTab,
  breadcrumb,
  errorMessage,
} = usePage(props.api, { historyNamespace: props.historyNamespace, storage: props.storage });
const { messages, processing, aborted } = session;
</script>
<template>
  <div class="feature-page chat-page" :data-template-ready="ready ? 'true' : 'false'">
    <WorkbenchTopNav
      :tabs="text.tabs"
      :sites="text.sites"
      :active-tab="activeTab"
      @update:active-tab="navigateTab"
    />
    <main class="feature-container feature-stack chat-main">
      <WorkbenchBreadcrumb :items="text.crumbs" @navigate="breadcrumb" />
      <div class="feature-grid chat-layout">
        <aside class="feature-span-6 feature-stack">
          <WorkbenchCard variant="display-white">
            <template #header
              ><h2 class="feature-title-m">{{ text.title }}</h2></template
            >
            <p class="feature-text feature-muted">{{ text.description }}</p>
          </WorkbenchCard>
          <WorkbenchCard variant="display-white">
            <template #header
              ><h2 class="feature-title-s">{{ text.quickTitle }}</h2></template
            >
            <div class="feature-stack quick-questions">
              <WorkbenchButton
                v-for="query in text.quick"
                :key="query"
                appearance="text"
                intent="drilldown"
                drilldown="more"
                :disabled="processing"
                @click="session.send(query)"
                >{{ query }}</WorkbenchButton
              >
            </div>
          </WorkbenchCard>
        </aside>
        <section
          class="feature-span-18 partner-ai chat-frame"
          data-ai-component="ChatPanel"
          :aria-label="text.title"
        >
          <div v-if="rendererError" role="alert">
            {{ text.rendererError }}
            <WorkbenchButton @click="loadRenderers">{{ text.retry }}</WorkbenchButton>
          </div>
          <ChatPanel
            v-else-if="ready"
            :messages="messages"
            :processing="processing"
            :error="errorMessage()"
            :aborted="aborted"
            :renderers="renderers"
            :welcome-entries="welcome"
            :suggestion-pills="pills"
            :message-prompts="prompts"
            @send="session.send"
            @abort="session.abort"
            @retry="session.retry"
            @new-conversation="session.reset"
          />
        </section>
      </div>
    </main>
    <MessagesHost :messages="feedback" />
  </div>
</template>
<style scoped>
.chat-layout {
  align-items: start;
}
.quick-questions {
  --feature-gap: var(--wb-spacing-component-sm);
}
.chat-main {
  padding-block: var(--wb-spacing-component-lg) var(--wb-spacing-layout-section-gap-large);
}
.chat-frame {
  height: calc(100vh - 180px);
  min-height: 560px;
  border-radius: var(--wb-radius-lg);
  overflow: hidden;
  box-shadow: var(--wb-shadow-sm);
}
</style>
