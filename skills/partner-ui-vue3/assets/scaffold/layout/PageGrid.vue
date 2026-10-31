<template>
  <div class="page-grid"><slot /></div>
</template>
<style scoped>
.page-grid {
  display: grid;
  grid-template-columns: repeat(var(--wb-layout-grid-columns-medium), minmax(0, 1fr));
  gap: var(--wb-layout-grid-gutter);
}
/* The published layout-grid-breakpoint-wide token is 1280px; CSS variables cannot be media conditions. */
@media (min-width: 1280px) {
  .page-grid {
    grid-template-columns: repeat(var(--wb-layout-grid-columns-wide), minmax(0, 1fr));
  }
}
</style>
