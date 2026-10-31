<script setup lang="ts">
import { copy } from '../content/zh-CN';
</script>

<template>
  <main class="blank-page" aria-labelledby="blank-page-title">
    <h1 id="blank-page-title">{{ copy.blankTitle }}</h1>
    <p>{{ copy.blankDescription }}</p>
  </main>
</template>

<style scoped>
.blank-page {
  padding: var(--wb-spacing-layout-container-block) var(--wb-spacing-layout-container-inline);
}

h1 {
  margin: 0 0 var(--wb-spacing-component-lg);
  font-size: var(--wb-font-headline-l-font-size);
  font-weight: var(--wb-font-headline-l-font-weight);
  line-height: var(--wb-font-headline-l-line-height);
}

p {
  margin: 0;
  color: var(--wb-color-text-secondary);
}
</style>
