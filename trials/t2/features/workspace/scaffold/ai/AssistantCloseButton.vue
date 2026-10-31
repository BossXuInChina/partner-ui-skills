<script lang="ts">
import { createVNode, defineComponent, h } from 'vue';
import { TrActionButton } from '@opentiny/tiny-robot';
import { AiIcon } from 'huawei-partner-ai-ui';
import { zhCN } from '../locale/zh-CN';

export default defineComponent({
  name: 'AssistantCloseButton',
  props: { label: { type: String, default: zhCN.assistant.close } },
  emits: { click: (event: MouseEvent) => Boolean(event) },
  setup(props, { emit }) {
    // Public native attributes fall through to TinyRobot's button. Its declaration
    // lists component props only, so use Vue's typed render API for native listeners.
    return () =>
      h(TrActionButton, {
        class: 'partner-ai',
        type: 'button',
        icon: createVNode(AiIcon, { name: 'panel.close' }, null, 0, null, true),
        'aria-label': props.label,
        title: props.label,
        onClick: (event: MouseEvent) => emit('click', event),
      });
  },
});
</script>
