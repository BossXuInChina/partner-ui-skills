<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { WorkbenchButton } from "@workbench/ui-vue3";
import { useWorkspaceStore } from "@/stores/workspace";
const { t } = useI18n();
const store = useWorkspaceStore();
const { visits } = storeToRefs(store);
</script>
<template>
  <section>
    <h2>{{ t("home.title") }}</h2>
    <p role="status">{{ t("home.visits", { count: visits }) }}</p>
    <WorkbenchButton @click="store.recordVisit">{{
      t("home.record")
    }}</WorkbenchButton>
  </section>
</template>
