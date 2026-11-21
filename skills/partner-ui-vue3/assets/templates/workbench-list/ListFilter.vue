<script setup lang="ts">
import { WorkbenchButton, WorkbenchDraftListFilter } from '@workbench/ui-vue3';

const emit = defineEmits<{ apply: []; reset: [] }>();
const apply = () => emit('apply');
const reset = () => emit('reset');
const draftLayout = { fieldCount: 2, onApply: apply, onReset: reset };
</script>

<template>
  <div :class="{ 'extended-filter': $slots.extra }">
    <component
      :is="$slots.extra ? 'div' : WorkbenchDraftListFilter"
      v-bind="$slots.extra ? { class: 'filter-layout' } : draftLayout"
    >
      <slot />
      <div
        v-if="$slots.extra"
        class="filter-tail"
      >
        <slot name="extra" />
        <div class="filter-actions">
          <WorkbenchButton
            appearance="secondary"
            @click="reset"
            >重置</WorkbenchButton
          >
          <WorkbenchButton @click="apply">查询</WorkbenchButton>
        </div>
      </div>
    </component>
  </div>
</template>

<style scoped>
.extended-filter {
  container-type: inline-size;
  min-inline-size: 0;
}
.filter-layout,
.filter-tail {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-items: end;
  gap: var(--wb-spacing-component-lg);
  min-inline-size: 0;
}
.filter-actions {
  display: flex;
  justify-self: end;
  gap: var(--wb-spacing-component-sm);
}

@container (width >= 656px) {
  .filter-layout,
  .filter-tail {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .filter-tail {
    grid-column: 1 / -1;
  }
}

@container (width >= 968px) {
  .filter-layout {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .filter-tail {
    grid-column: auto;
    grid-template-columns: minmax(0, 1fr) auto;
  }
}
</style>
