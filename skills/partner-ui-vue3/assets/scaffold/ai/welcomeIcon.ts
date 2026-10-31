import { defineComponent, h, markRaw, type Component } from 'vue';
import { WorkbenchSystemIcon, WorkbenchPedestalIcon } from '@workbench/ui-vue3';

export function welcomeIcon(name: string, kind: 'system' | 'pedestal' = 'system'): Component {
  return markRaw(
    defineComponent({
      name: 'AssistantWelcomeIcon',
      setup: () => () =>
        kind === 'pedestal' ? h(WorkbenchPedestalIcon, { name }) : h(WorkbenchSystemIcon, { name }),
    }),
  );
}
