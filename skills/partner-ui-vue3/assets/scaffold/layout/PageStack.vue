<script setup lang="ts">
withDefaults(defineProps<{ space?: 'sm' | 'md' | 'lg' | 'xl' }>(), {
  space: 'lg',
});
</script>
<template>
  <div class="page-stack" :class="`page-stack--${space}`"><slot /></div>
</template>
<style scoped>
.page-stack {
  display: flex;
  flex-direction: column;
  gap: var(--page-stack-gap);
}
.page-stack--sm {
  --page-stack-gap: var(--wb-spacing-component-sm);
}
.page-stack--md {
  --page-stack-gap: var(--wb-spacing-component-md);
}
.page-stack--lg {
  --page-stack-gap: var(--wb-spacing-component-lg);
}
.page-stack--xl {
  --page-stack-gap: var(--wb-spacing-component-xl);
}
</style>
