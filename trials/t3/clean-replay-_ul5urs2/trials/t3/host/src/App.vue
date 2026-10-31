<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
<template>
  <div class="app-shell">
    <header>
      <h1>{{ t("app.title") }}</h1>
      <nav :aria-label="t('app.navigation')">
        <RouterLink to="/">{{ t("home.title") }}</RouterLink>
        <RouterLink to="/agreements">{{ t("agreements.title") }}</RouterLink>
      </nav>
    </header>
    <main><RouterView /></main>
  </div>
</template>
