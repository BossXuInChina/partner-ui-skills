// 业务 Block：将伙伴数据转换成概览指标，组合展示组件。
import { computed, defineComponent } from 'vue';
import MetricTile from '../components/MetricTile.js';
import { store } from '../state/store.js';
export default defineComponent({
  name: 'BusinessSummary', components: { MetricTile },
  setup() {
    const revenue = computed(() => store.partners.reduce((sum, item) => sum + item.revenue, 0));
    return { store, revenue };
  },
  template: `<section class="demo-metrics" aria-label="经营指标">
    <MetricTile label="合作伙伴" :value="store.partners.length" hint="当前伙伴数量" />
    <MetricTile label="累计营收（元）" :value="revenue.toLocaleString('zh-CN')" hint="本地演示统计" />
    <MetricTile label="覆盖区域" :value="new Set(store.partners.map(item => item.region)).size" hint="按伙伴区域汇总" />
  </section>`,
});
