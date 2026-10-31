<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { defineAsyncComponent } from 'vue';
import {
  WorkbenchAlert,
  WorkbenchButton,
  WorkbenchButtonRadioGroup,
  WorkbenchCard,
  WorkbenchEmptyState,
  WorkbenchFooter,
  WorkbenchMetricCard,
  WorkbenchLoading,
  WorkbenchPedestalIcon,
  WorkbenchQuickAppCard,
  WorkbenchTabs,
  WorkbenchTag,
  WorkbenchTimeline,
  WorkbenchTopNav,
} from '@workbench/ui-vue3';
import MessagesHost from '@scaffold/feedback/MessagesHost.vue';
import { usePage } from './usePage';
import type { WorkbenchDashboardApi } from './api';
const WorkspaceSmartTag = defineAsyncComponent(() =>
  import('huawei-partner-ai-ui').then((module) => module.WorkspaceSmartTag),
);
const WorkspaceSmartCard = defineAsyncComponent(() =>
  import('huawei-partner-ai-ui').then((module) => module.WorkspaceSmartCard),
);
defineOptions({ name: 'WorkbenchDashboardPage' });
const props = defineProps<{ api: WorkbenchDashboardApi }>();
const {
  setTodoTab,
  updateActiveTab,
  nav,
  data,
  range,
  setRange,
  chart,
  todoTab,
  todoTabs,
  todos,
  feedback,
  loading,
  error,
  reload,
  metricIcon,
  onCardAction,
  onAllTodos,
  activateAssistant,
  processTodo,
  onAppActivate,
  onNavigate,
} = usePage(props.api);
const a11y = (label: string): Pick<HTMLAttributes, 'aria-label'> => ({ 'aria-label': label });

import { copy } from './locale/zh-CN';
</script>

<template>
  <div class="feature-page" :data-template-ready="loading ? 'false' : 'true'">
    <WorkbenchTopNav
      :tabs="nav.tabs"
      :sites="nav.sites"
      :active-tab="nav.active"
      @update:active-tab="updateActiveTab"
    />

    <main
      class="feature-container feature-section"
      style="
        padding-block: var(--wb-spacing-layout-section-gap)
          var(--wb-spacing-layout-section-gap-large);
      "
    >
      <WorkbenchAlert
        v-if="error"
        type="error"
        :message="error"
        :show-close="false"
      /><WorkbenchButton v-if="error" appearance="secondary" @click="reload">{{
        copy.text31
      }}</WorkbenchButton>
      <div v-if="loading" role="status" :aria-label="copy.loading"><WorkbenchLoading /></div>
      <template v-else>
        <header class="page-head">
          <div>
            <h1 class="feature-title-xl">{{ data.greeting }}</h1>
            <p class="feature-text feature-muted">
              {{ data.organization }} · {{ data.partnerLevel }}
            </p>
          </div>
          <div class="partner-ai" style="height: auto; background: transparent">
            <WorkspaceSmartTag
              :fragments="[
                { text: copy.text13 },
                { text: data.expiringAgreements + copy.text14, emphasis: 'data' },
                { text: copy.text15 + data.expiryWindowDays + copy.text16 },
              ]"
              @activate="activateAssistant"
            />
          </div>
        </header>

        <div class="feature-grid" style="align-items: start">
          <div class="feature-span-16 feature-stack">
            <WorkbenchMetricCard
              :title="copy.text17"
              layout="row"
              :items="data.metrics"
              :header-actions="[{ id: 'more', label: copy.report, appearance: 'text' }]"
              :footer="{ kind: 'metadata', text: copy.text18 + data.updatedAt }"
              @action="onCardAction"
            >
              <template #icon="{ item }"
                ><WorkbenchPedestalIcon :name="metricIcon(item)"
              /></template>
            </WorkbenchMetricCard>

            <WorkbenchCard variant="display-white">
              <template #header
                ><h2 class="feature-title-m">{{ copy.text32 }}</h2></template
              >
              <div class="trend feature-custom" :data-feature-name="copy.text19">
                <div class="trend-head">
                  <div class="legend feature-text-s">
                    <span
                      ><i style="background: var(--wb-color-info-primary)"></i
                      >{{ copy.text33 }}</span
                    >
                    <span
                      ><i style="background: var(--wb-color-success)"></i>{{ copy.text34 }}</span
                    >
                  </div>
                  <WorkbenchButtonRadioGroup
                    :model-value="range"
                    :items="[
                      { value: '6', label: copy.text20 },
                      { value: '12', label: copy.text21 },
                    ]"
                    v-bind="a11y(copy.text22)"
                    @update:model-value="setRange"
                  />
                </div>
                <WorkbenchEmptyState v-if="!chart.bars.length" type="no-data" level="local" />
                <svg
                  v-else
                  :viewBox="`0 0 ${chart.w} ${chart.h}`"
                  role="img"
                  :aria-label="copy.text23"
                >
                  <line class="axis" :x1="0" :x2="chart.w" :y1="chart.h - 24" :y2="chart.h - 24" />
                  <g v-for="(b, i) in chart.bars" :key="b.m">
                    <rect
                      class="bar"
                      :class="{ 'is-last': i === chart.bars.length - 1 }"
                      :x="b.x"
                      :y="b.y"
                      :width="b.bw"
                      :height="b.bh"
                      rx="2"
                    />
                    <text class="label" :x="b.x + b.bw / 2" :y="chart.h - 6" text-anchor="middle">
                      {{ b.m }}
                    </text>
                  </g>
                  <polyline class="line" :points="chart.line" />
                </svg>
              </div>
            </WorkbenchCard>

            <WorkbenchCard variant="display-white">
              <template #header>
                <div class="feature-row feature-between" style="width: 100%">
                  <h2 class="feature-title-m">{{ copy.text35 }}</h2>
                  <WorkbenchButton
                    appearance="text"
                    intent="drilldown"
                    drilldown="more"
                    @click="onAllTodos"
                    >{{ copy.text07 }}</WorkbenchButton
                  >
                </div>
              </template>
              <WorkbenchTabs
                :model-value="todoTab"
                :items="todoTabs"
                variant="divider"
                v-bind="a11y(copy.text24)"
                @update:model-value="setTodoTab"
              />
              <div v-if="todos.length">
                <div v-for="t in todos" :key="t.id" class="todo-item">
                  <div class="todo-main">
                    <WorkbenchTag
                      :label="t.type"
                      variant="status-subtle"
                      size="small"
                      :status="t.tone"
                    />
                    <span class="feature-text">{{ t.title }}</span>
                  </div>
                  <div class="feature-row">
                    <span class="feature-text-s">{{ t.date }}</span>
                    <WorkbenchButton appearance="text" size="28" @click="processTodo(t)">{{
                      copy.text36
                    }}</WorkbenchButton>
                  </div>
                </div>
              </div>
              <WorkbenchEmptyState v-else type="no-data" level="local" :title="copy.text25" />
            </WorkbenchCard>
          </div>
          <div class="feature-span-8 feature-stack">
            <WorkbenchQuickAppCard
              :title="copy.text26"
              layout="multi"
              :items="data.apps"
              @activate="onAppActivate"
            />

            <div class="partner-ai" style="height: auto; background: transparent">
              <WorkspaceSmartCard
                :title="copy.text27"
                :items="data.insights"
                variant="outlined"
                :tag="{
                  fragments: [
                    { text: copy.text28 },
                    { text: String(data.insights.length), emphasis: 'data' },
                    { text: copy.text29 },
                  ],
                }"
                @navigate="onNavigate"
                @activate="activateAssistant"
              />
            </div>

            <WorkbenchCard variant="display-white">
              <template #header
                ><h2 class="feature-title-m">{{ copy.text30 }}</h2></template
              >
              <WorkbenchTimeline :items="data.notices" node-type="dot" :label="copy.text30" />
            </WorkbenchCard>
          </div>
        </div>
      </template>
    </main>

    <WorkbenchFooter :registration="{ id: 'registration', label: '' }" />
    <MessagesHost :messages="feedback" />
  </div>
</template>

<style scoped>
.page-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--wb-spacing-component-lg);
}
.page-head p {
  margin: var(--wb-spacing-component-xs) 0 0;
}

.trend {
  display: flex;
  flex-direction: column;
  gap: var(--wb-spacing-component-md);
  height: 100%;
}
.trend-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--wb-spacing-component-md);
}
.trend svg {
  width: 100%;
  height: auto;
  display: block;
}
.trend .axis {
  stroke: var(--wb-color-border-separator);
  stroke-width: 1;
}
.trend .label {
  fill: var(--wb-color-text-secondary);
  font-size: var(--wb-font-caption-m-font-size);
}
.trend .bar {
  fill: var(--wb-color-info-primary);
}
.trend .bar.is-last {
  fill: var(--wb-color-brand);
}
.trend .line {
  fill: none;
  stroke: var(--wb-color-success);
  stroke-width: 2;
}
.legend {
  display: flex;
  gap: var(--wb-spacing-component-lg);
}
.legend i {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: var(--wb-radius-full);
  margin-inline-end: var(--wb-spacing-component-xs);
}
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--wb-spacing-component-md);
  padding-block: var(--wb-spacing-component-md);
  border-bottom: 1px solid var(--wb-color-border-separator-subtle);
}
.todo-item:last-child {
  border-bottom: 0;
}
.todo-main {
  display: flex;
  align-items: center;
  gap: var(--wb-spacing-component-sm);
  min-width: 0;
}
</style>
