<script setup lang="ts">
defineOptions({ name: 'AgreementDetail' });
import { watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { WorkbenchButton } from '@workbench/ui-vue3';
import type { AgreementApi } from './api';
import { useResource } from './useResource';
const props = defineProps<{ api: AgreementApi }>();
const route = useRoute();
const router = useRouter();
const { data, loading, error, reload } = useResource((signal) =>
  props.api.detail(String(route.params.id), signal),
);
watch(
  () => route.params.id,
  () => {
    void reload();
  },
  { immediate: true },
);
</script>
<template>
  <main class="feature-container feature-stack">
    <WorkbenchButton appearance="secondary" @click="router.push('/agreements')"
      >返回列表</WorkbenchButton
    >
    <h1 class="feature-title-xl">协议详情</h1>
    <section class="feature-surface">
      <p v-if="loading" role="status">加载中…</p>
      <p v-else-if="error" role="alert">
        加载失败 <WorkbenchButton @click="reload">重试</WorkbenchButton>
      </p>
      <dl v-else-if="data">
        <dt>协议编号</dt>
        <dd>{{ data.id }}</dd>
        <dt>协议名称</dt>
        <dd>{{ data.name }}</dd>
        <dt>伙伴</dt>
        <dd>{{ data.partner }}</dd>
        <dt>负责人</dt>
        <dd>{{ data.owner }}</dd>
        <dt>期限</dt>
        <dd>{{ data.startDate }} 至 {{ data.endDate }}</dd>
        <dt>状态</dt>
        <dd>{{ data.status }}</dd>
      </dl>
    </section>
  </main>
</template>
