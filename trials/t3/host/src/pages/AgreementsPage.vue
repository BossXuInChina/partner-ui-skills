<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { onMounted, onUnmounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import {
  WorkbenchAlert,
  WorkbenchButton,
  WorkbenchDraftListFilter,
  WorkbenchFormItem,
  WorkbenchInput,
  WorkbenchSelect,
  WorkbenchTable,
} from "@workbench/ui-vue3";
import { useWorkspaceStore } from "@/stores/workspace";
import {
  loadAgreements,
  statuses,
  type Agreement,
} from "@/services/agreements";
const { t } = useI18n();
const nameAttrs: Pick<HTMLAttributes, "aria-label"> = {
  "aria-label": t("agreements.name"),
};
const store = useWorkspaceStore();
const name = ref(store.agreementName),
  status = ref(store.agreementStatus);
const rows = ref<Agreement[]>([]),
  total = ref(0),
  loading = ref(false),
  error = ref(false);
const statusKeys = ["active", "renewal", "approval", "expired"] as const;
function statusLabel(value: unknown) {
  const index = statuses.findIndex((item) => item === value);
  const key = statusKeys[index];
  return key ? t(`agreements.statuses.${key}`) : "";
}
const options = [
  { value: "all", label: t("agreements.all") },
  ...statuses.map((value) => ({ value, label: statusLabel(value) })),
];
const columns = [
  { key: "id", field: "id", title: t("agreements.id"), width: 150 },
  {
    key: "name",
    field: "name",
    title: t("agreements.name"),
    primary: true,
    fluid: true,
  },
  {
    key: "partner",
    field: "partner",
    title: t("agreements.partner"),
    width: 180,
  },
  { key: "status", field: "status", title: t("agreements.status"), width: 120 },
  {
    key: "endDate",
    field: "endDate",
    title: t("agreements.endDate"),
    width: 150,
  },
];
let controller: AbortController | undefined;
async function reload() {
  controller?.abort();
  const current = new AbortController();
  controller = current;
  loading.value = true;
  error.value = false;
  try {
    const result = await loadAgreements(
      {
        name: store.agreementName,
        status: store.agreementStatus,
        page: store.agreementPage,
        pageSize: 5,
      },
      current.signal,
    );
    if (controller === current && !current.signal.aborted) {
      rows.value = result.items;
      total.value = result.total;
    }
  } catch {
    if (controller === current && !current.signal.aborted) {
      error.value = true;
      rows.value = [];
      total.value = 0;
    }
  } finally {
    if (controller === current && !current.signal.aborted)
      loading.value = false;
  }
}
function apply() {
  store.agreementName = name.value.trim();
  store.agreementStatus = status.value;
  store.agreementPage = 1;
  void reload();
}
function reset() {
  name.value = "";
  status.value = "all";
  apply();
}
function setStatus(value: unknown) {
  const next = Array.isArray(value) ? value[0] : undefined;
  status.value =
    typeof next === "string" && options.some((option) => option.value === next)
      ? next
      : "all";
}
function setPage(page: number) {
  store.agreementPage = page;
  void reload();
}
onMounted(reload);
onUnmounted(() => {
  controller?.abort();
  controller = undefined;
});
</script>
<template>
  <section>
    <h2>{{ t("agreements.title") }}</h2>
    <WorkbenchDraftListFilter :field-count="2" @apply="apply" @reset="reset">
      <WorkbenchFormItem :label="t('agreements.name')">
        <WorkbenchInput v-model="name" v-bind="nameAttrs" />
      </WorkbenchFormItem>
      <WorkbenchFormItem :label="t('agreements.status')">
        <WorkbenchSelect
          :model-value="[status]"
          :options="options"
          :label="t('agreements.status')"
          @update:model-value="setStatus"
        />
      </WorkbenchFormItem>
    </WorkbenchDraftListFilter>
    <div v-if="error">
      <WorkbenchAlert
        type="error"
        :message="t('agreements.error')"
        :show-close="false"
      />
      <WorkbenchButton @click="reload">{{
        t("agreements.retry")
      }}</WorkbenchButton>
    </div>
    <p v-if="loading" role="status">{{ t("agreements.loading") }}</p>
    <WorkbenchTable
      v-if="!error"
      :caption="t('agreements.title')"
      :columns="columns"
      :rows="rows"
      row-key="id"
      :total="total"
      :page="store.agreementPage"
      :page-size="5"
      :page-size-options="[5]"
      :loading="loading"
      :empty-kind="
        store.agreementName || store.agreementStatus !== 'all'
          ? 'filtered'
          : 'initial'
      "
      @update:page="setPage"
    >
      <template #cell-status="{ row }">{{ statusLabel(row.status) }}</template>
    </WorkbenchTable>
  </section>
</template>
