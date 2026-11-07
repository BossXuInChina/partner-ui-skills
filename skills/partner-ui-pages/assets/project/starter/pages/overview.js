// 经营概览页面：组合业务摘要，提供伙伴管理入口。
import { defineComponent } from 'vue';
import { WorkbenchButton } from '@workbench/ui-vue3';
import { useProject } from 'partner-ui/project';
import BusinessSummary from '../blocks/BusinessSummary.js';
export default defineComponent({
  name: 'OverviewPage', components: { WorkbenchButton, BusinessSummary },
  setup() { return { project: useProject() }; },
  template: `<div class="pui-stack">
    <header class="demo-page-head"><div><h1 class="pui-title-xl">经营概览</h1><p class="pui-muted">查看伙伴经营数据，跟进合作进展。</p></div><WorkbenchButton v-if="project.pages.some(page => page.id === 'partners')" @click="project.navigate('partners')">管理伙伴</WorkbenchButton></header>
    <BusinessSummary />
    <section class="pui-surface pui-stack"><h2 class="pui-title-m">待办指引</h2><p class="pui-text">在伙伴管理中选择伙伴，编辑后确认保存；返回列表查看更新。AI 助手可在不同页面间保留会话。</p></section>
  </div>`,
});
