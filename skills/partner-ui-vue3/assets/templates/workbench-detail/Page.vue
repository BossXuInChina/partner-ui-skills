<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { nextTick, ref } from 'vue';
import {
  WorkbenchAlert,
  WorkbenchBreadcrumb,
  WorkbenchButton,
  WorkbenchDatePicker,
  WorkbenchDropdown,
  WorkbenchEmptyState,
  WorkbenchFeedbackDialog,
  WorkbenchFooter,
  WorkbenchForm,
  WorkbenchFormGroup,
  WorkbenchFormItem,
  WorkbenchInput,
  WorkbenchLoading,
  WorkbenchSelect,
  WorkbenchSteps,
  WorkbenchSwitch,
  WorkbenchTabs,
  WorkbenchTag,
  WorkbenchTimeline,
  WorkbenchTopNav,
  WorkbenchUploadFileList,
} from '@workbench/ui-vue3';
import MessagesHost from '@scaffold/feedback/MessagesHost.vue';
import { usePage } from './usePage';
import type { WorkbenchDetailApi } from './api';
defineOptions({ name: 'WorkbenchDetailPage' });
const props = defineProps<{ api: WorkbenchDetailApi }>();
const {
  setAutoRenew,
  setRenewOpen,
  setTab,
  updateActiveTab,
  nav,
  crumbs,
  statusTone,
  typeOptions,
  model,
  editing,
  tab,
  tabs,
  steps,
  stepIndex,
  files,
  history,
  moreItems,
  renewOpen,
  feedback,
  loading,
  busy,
  error,
  loaded,
  reload,
  validation,
  startEdit,
  cancelEdit,
  setField,
  setType,
  setEndDate,
  formatType,
  formatAmount,
  formatAutoRenew,
  save,
  renew,
  onMore,
  preventNavigation,
} = usePage(props.api);
const formRef = ref<{ submit(event?: Event): Promise<unknown> } | null>(null);
const submitForm = async () => {
  setTab('info');
  await nextTick();
  await formRef.value?.submit();
};
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

    <template v-if="loaded"
      ><main
        class="feature-container feature-stack"
        style="
          padding-block: var(--wb-spacing-component-lg) var(--wb-spacing-layout-section-gap-large);
        "
      >
        <WorkbenchAlert
          v-if="error"
          type="error"
          :message="error"
          :show-close="false"
        /><WorkbenchButton v-if="error" appearance="secondary" @click="reload">{{
          copy.text41
        }}</WorkbenchButton>
        <WorkbenchBreadcrumb :items="crumbs" @navigate="preventNavigation" />

        <header class="page-head">
          <div>
            <h1 class="feature-title-xl">{{ model.name }}</h1>
            <div class="meta">
              <WorkbenchTag
                :label="model.status"
                variant="status-subtle"
                size="small"
                :status="statusTone[model.status]"
              />
              <span class="feature-text-s"
                >{{ model.id }} {{ copy.text42 }} {{ model.updatedAt }}</span
              >
            </div>
          </div>
          <div class="feature-row">
            <WorkbenchDropdown :items="moreItems" v-bind="a11y(copy.text25)" @action="onMore"
              ><template #trigger>{{ copy.text43 }}</template></WorkbenchDropdown
            >
            <WorkbenchButton v-if="!editing" appearance="secondary" @click="startEdit">{{
              copy.text44
            }}</WorkbenchButton>
            <WorkbenchButton
              appearance="primary"
              :disabled="editing || model.status !== '待续签'"
              @click="renewOpen = true"
              >{{ copy.text45 }}</WorkbenchButton
            >
          </div>
        </header>

        <WorkbenchAlert
          v-if="model.status === '待续签'"
          type="warning"
          placement="page"
          :show-close="false"
          :message="model.renewalNotice"
        />

        <section class="feature-surface">
          <WorkbenchSteps
            :items="steps"
            :model-value="stepIndex"
            :current="stepIndex"
            v-bind="a11y(copy.text26)"
          />
        </section>

        <section class="feature-surface feature-stack">
          <WorkbenchTabs
            :model-value="tab"
            :items="tabs"
            variant="basic"
            size="large"
            v-bind="a11y(copy.text06)"
            @update:model-value="setTab"
          />

          <WorkbenchAlert
            v-if="validation"
            type="error"
            :message="validation"
            :show-close="false"
          />
          <WorkbenchForm
            v-if="tab === 'info'"
            ref="formRef"
            :title="copy.text13"
            :title-visible="false"
            :model="model"
            :mode="editing ? 'mixed' : 'readonly'"
            label-position="left"
            @submit="save"
          >
            <WorkbenchFormGroup :label="copy.text27">
              <WorkbenchFormItem
                :label="copy.text28"
                prop="name"
                required
                :rules="[{ required: true, message: copy.requiredName }]"
              >
                <WorkbenchInput
                  :model-value="model.name"
                  v-bind="a11y(copy.text28)"
                  @update:model-value="setField('name', $event)"
                />
              </WorkbenchFormItem>
              <WorkbenchFormItem :label="copy.text29" prop="type" :formatter="formatType">
                <WorkbenchSelect
                  :model-value="[model.type]"
                  :options="typeOptions"
                  :label="copy.text29"
                  teleport-panel
                  @update:model-value="setType"
                />
              </WorkbenchFormItem>
              <WorkbenchFormItem :label="copy.text30" prop="endDate">
                <WorkbenchDatePicker
                  :model-value="model.endDate"
                  v-bind="a11y(copy.text30)"
                  @update:model-value="setEndDate"
                />
              </WorkbenchFormItem>
              <WorkbenchFormItem :label="copy.text31" prop="amount" :formatter="formatAmount">
                <WorkbenchInput
                  :model-value="String(model.amount)"
                  v-bind="a11y(copy.text31)"
                  @update:model-value="setField('amount', $event)"
                />
              </WorkbenchFormItem>
            </WorkbenchFormGroup>
            <WorkbenchFormGroup :label="copy.text32">
              <WorkbenchFormItem :label="copy.text33" prop="partner" mode="readonly" />
              <WorkbenchFormItem
                :label="copy.text34"
                prop="owner"
                required
                :rules="[{ required: true, message: copy.requiredOwner }]"
              >
                <WorkbenchInput
                  :model-value="model.owner"
                  v-bind="a11y(copy.text34)"
                  @update:model-value="setField('owner', $event)"
                />
              </WorkbenchFormItem>
              <WorkbenchFormItem :label="copy.text35" prop="autoRenew" :formatter="formatAutoRenew">
                <WorkbenchSwitch
                  :model-value="model.autoRenew"
                  v-bind="a11y(copy.text35)"
                  @update:model-value="setAutoRenew"
                />
              </WorkbenchFormItem>
            </WorkbenchFormGroup>
          </WorkbenchForm>

          <WorkbenchUploadFileList v-else-if="tab === 'files'" :files="files" />

          <WorkbenchTimeline v-else :items="history" node-type="dot" :label="copy.text15" />
        </section>
      </main>

      <div v-if="editing" class="action-bar">
        <div class="feature-container">
          <span class="feature-text-s">{{ copy.text46 }}</span>
          <div class="feature-row">
            <WorkbenchButton
              appearance="secondary"
              size="36"
              :disabled="busy"
              @click="cancelEdit"
              >{{ copy.text47 }}</WorkbenchButton
            >
            <WorkbenchButton appearance="primary" size="36" :disabled="busy" @click="submitForm">{{
              copy.text48
            }}</WorkbenchButton>
          </div>
        </div>
      </div>

      <WorkbenchFooter v-else :registration="{ id: 'registration', label: '' }" />

      <WorkbenchFeedbackDialog
        :model-value="renewOpen"
        type="info"
        :title="copy.text36"
        :message="copy.text37"
        :primary-action="{ id: 'ok', label: copy.text38 }"
        :secondary-action="{ id: 'cancel', label: copy.text39 }"
        :action-handler="renew"
        @update:model-value="setRenewOpen" />
      <MessagesHost :messages="feedback"
    /></template>
    <main v-else class="feature-container">
      <div v-if="loading" role="status" :aria-label="copy.text40"><WorkbenchLoading /></div>
      <WorkbenchAlert
        v-else-if="error"
        type="error"
        :message="error"
        :show-close="false"
      /><WorkbenchEmptyState v-else type="no-data" level="page" /><WorkbenchButton
        v-if="error"
        appearance="secondary"
        @click="reload"
        >{{ copy.text41 }}</WorkbenchButton
      >
    </main>
  </div>
</template>

<style scoped>
.page-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--wb-spacing-component-lg);
}
.page-head .meta {
  display: flex;
  align-items: center;
  gap: var(--wb-spacing-component-sm);
  margin-top: var(--wb-spacing-component-xs);
}

.action-bar {
  position: sticky;
  bottom: 0;
  z-index: 2;
  background: var(--wb-color-surface-container);
  box-shadow: var(--wb-shadow-t-m);
  padding-block: var(--wb-spacing-page-action-bar-padding-block);
}
.action-bar .feature-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--wb-spacing-component-lg);
}
</style>
