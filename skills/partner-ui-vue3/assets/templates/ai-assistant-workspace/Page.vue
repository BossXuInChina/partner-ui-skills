<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import {
  WorkbenchTopNav,
  WorkbenchBreadcrumb,
  WorkbenchButton,
  WorkbenchTable,
  WorkbenchTag,
  WorkbenchButtonRadioGroup,
} from '@workbench/ui-vue3';
import MessagesHost from '@scaffold/feedback/MessagesHost.vue';
import type { AssistantWorkspaceApi } from './api';
import type { WorkspaceHistoryStorage } from './types';
import { usePage } from './usePage';
import { text, welcome, pills, prompts } from './locale';
defineOptions({ name: 'AiAssistantWorkspacePage' });
const props = defineProps<{
  api: AssistantWorkspaceApi;
  historyNamespace: string;
  storage?: WorkspaceHistoryStorage;
  persistHistory?: boolean;
}>();
const AssistantHostLayout = defineAsyncComponent(() =>
  import('huawei-partner-ai-ui').then((module) => module.AssistantHostLayout),
);
const WorkspaceSmartCard = defineAsyncComponent(() =>
  import('huawei-partner-ai-ui').then((module) => module.WorkspaceSmartCard),
);
const AgreementAssistantPanel = defineAsyncComponent(() =>
  import('huawei-partner-ai-ui').then((module) => module.AgreementAssistantPanel),
);
const AssistantCloseButton = defineAsyncComponent(
  () => import('@scaffold/ai/AssistantCloseButton.vue'),
);
const page = usePage(props.api, {
  historyNamespace: props.historyNamespace,
  storage: props.storage,
  persistHistory: props.persistHistory,
});
const {
  range,
  agreements,
  insights,
  loading,
  loadError,
  submitting,
  renewError,
  ready,
  ai,
  activeTab,
  setPanel,
  renderers,
  assistantError,
  history,
  feedback,
  insightTag,
} = page;
</script>
<template>
  <div
    class="feature-page workspace-host"
    :data-template-ready="ready && !loading ? 'true' : 'false'"
  >
    <AssistantHostLayout
      v-model:window-mode="ai.mode"
      v-model:fullscreen="ai.full"
      :open="ai.open"
      sidebar-behavior="push"
    >
      <template #navigation
        ><WorkbenchTopNav
          :tabs="text.tabs"
          :sites="text.sites"
          :active-tab="activeTab"
          @update:active-tab="page.navigateTab"
      /></template>
      <div class="workspace">
        <main class="feature-container feature-stack workspace-main">
          <WorkbenchBreadcrumb :items="text.crumbs" @navigate="page.breadcrumb" />
          <header class="page-head">
            <div>
              <h1 class="feature-title-xl">{{ text.title }}</h1>
              <p class="feature-text feature-muted">{{ text.description }}</p>
            </div>
            <div class="feature-row">
              <WorkbenchButton v-if="!ai.open" appearance="secondary" @click="ai.open = true">{{
                text.assistant
              }}</WorkbenchButton
              ><WorkbenchButton
                appearance="primary"
                :disabled="submitting || loading || !agreements.length"
                @click="page.renewAll"
                >{{ text.bulkRenew }}</WorkbenchButton
              >
            </div>
          </header>
          <div class="partner-ai smart-card">
            <WorkspaceSmartCard
              :title="text.insights"
              :items="insights"
              variant="outlined"
              :tag="insightTag"
              @navigate="page.onNavigate"
              @activate="page.ask(text.priorityQuery)"
            />
          </div>
          <section class="feature-surface feature-stack" :aria-busy="loading">
            <div class="feature-row feature-between">
              <h2 class="feature-title-m">{{ text.upcoming }}（{{ agreements.length }}）</h2>
              <div role="group" :aria-label="text.rangeLabel">
                <WorkbenchButtonRadioGroup
                  :model-value="range"
                  :items="text.rangeItems"
                  @update:model-value="page.setRange"
                />
              </div>
            </div>
            <p v-if="loading" role="status">{{ text.loading }}</p>
            <p v-else-if="loadError" role="alert">
              {{ text.loadError }}
              <WorkbenchButton @click="page.load">{{ text.retry }}</WorkbenchButton>
            </p>
            <p v-else-if="!agreements.length" role="status">{{ text.empty }}</p>
            <WorkbenchTable
              v-else
              :caption="text.tableCaption"
              :columns="text.columns"
              :rows="agreements"
              row-key="id"
              :row-actions="text.rowActions"
              @row-action="page.onRowAction"
              ><template #cell-status="{ row }"
                ><WorkbenchTag
                  :label="page.statusLabel(row)"
                  variant="status-subtle"
                  size="small"
                  :status="page.statusTone(row)" /></template
            ></WorkbenchTable>
            <p v-if="renewError" role="alert">
              {{ text.renewError }}
              <WorkbenchButton :disabled="submitting" @click="page.retryRenew">{{
                text.retry
              }}</WorkbenchButton>
            </p>
          </section>
        </main>
      </div>
      <template
        #assistant="{
          windowMode,
          fullscreen,
          toggleFullscreen,
          switchMode,
          dragStart,
          dragKeydown,
        }"
      >
        <div class="partner-ai assistant-frame" data-ai-component="AgreementAssistantPanel">
          <p v-if="assistantError" role="alert">
            {{ text.assistantLoadError }}
            <WorkbenchButton @click="page.loadRenderers">{{ text.retry }}</WorkbenchButton>
          </p>
          <AgreementAssistantPanel
            v-else-if="ready"
            :ref="setPanel"
            :adapter="api.assistant"
            business-action-mode="host"
            :window-mode="windowMode"
            :fullscreen="fullscreen"
            :welcome-entries="welcome"
            :suggestion-pills="pills"
            :message-prompts="prompts"
            :content-renderers="renderers"
            :history-options="history"
            @fullscreen-change="toggleFullscreen"
            @window-mode-change="switchMode"
            @window-drag-start="dragStart"
            @window-drag-keydown="dragKeydown"
            @workspace-navigate="page.onNavigate"
            @business-action="page.onBusiness"
            ><template #toolbar-end><AssistantCloseButton @click="ai.open = false" /></template
          ></AgreementAssistantPanel>
        </div>
      </template>
    </AssistantHostLayout>
    <MessagesHost :messages="feedback" />
  </div>
</template>
<style scoped>
.workspace-host {
  height: 100vh;
}
.workspace {
  height: 100%;
  overflow: auto;
}
.workspace-main {
  padding-block: var(--wb-spacing-component-lg) var(--wb-spacing-layout-section-gap-large);
}
.page-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--wb-spacing-component-lg);
}
.page-head p {
  margin: var(--wb-spacing-component-xs) 0 0;
}
.smart-card {
  height: auto;
  background: transparent;
}
.assistant-frame {
  height: 100%;
  min-height: 0;
}
</style>
