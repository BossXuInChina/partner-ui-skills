<template>
  <div class="page-container"><slot /></div>
</template>
<style scoped>
.page-container {
  box-sizing: border-box;
  width: 100%;
  max-width: calc(var(--wb-layout-grid-max-width) + 2 * var(--wb-layout-grid-safe-edge));
  margin-inline: auto;
  padding-inline: var(--wb-layout-grid-safe-edge);
}
</style>
