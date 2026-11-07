// 局部展示组件：复用 WorkbenchCard，只接收数据，不读取业务 store 或导航。
import { defineComponent } from 'vue';
import { WorkbenchCard } from '@workbench/ui-vue3';
export default defineComponent({
  name: 'MetricTile', components: { WorkbenchCard },
  props: { label: { type: String, required: true }, value: { type: [String, Number], required: true }, hint: String },
  template: `<div><WorkbenchCard size="m"><div class="demo-metric"><span class="pui-muted">{{ label }}</span><strong class="pui-title-xl pui-num">{{ value }}</strong><span class="pui-muted">{{ hint }}</span></div></WorkbenchCard></div>`,
});
