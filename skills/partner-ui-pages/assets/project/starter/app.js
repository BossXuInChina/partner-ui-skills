// 应用壳：页级导航与常驻 AI 助手；业务逻辑由 pages / blocks / state 管理。
import { defineComponent } from 'vue';
import { WorkbenchButton, WorkbenchLink } from '@workbench/ui-vue3';
import { ProjectView, useProject } from 'partner-ui/project';
import AssistantPanel from './blocks/AssistantPanel.js';
import { store } from './state/store.js';

export default defineComponent({
  name: 'PartnerDemo',
  components: { WorkbenchButton, WorkbenchLink, ProjectView, AssistantPanel },
  setup() { return { project: useProject(), store }; },
  template: `
    <div class="demo-shell pui-page">
      <header class="demo-header">
        <strong class="pui-title-m">{{ project.title }}</strong>
        <nav class="demo-nav" aria-label="页面导航">
          <WorkbenchLink v-for="page in project.pages" :key="page.id"
            :href="'#/' + page.id" :aria-current="project.route.page === page.id ? 'page' : undefined">{{ page.label }}</WorkbenchLink>
        </nav>
        <WorkbenchButton appearance="secondary" @click="store.assistantOpen = !store.assistantOpen">
          {{ store.assistantOpen ? '收起 AI 助手' : '打开 AI 助手' }}
        </WorkbenchButton>
      </header>
      <div class="demo-layout" :class="{ 'demo-layout--assistant': store.assistantOpen }">
        <main class="demo-main"><ProjectView /></main>
        <AssistantPanel v-show="store.assistantOpen" />
      </div>
      <footer class="demo-footer pui-muted">演示数据 · 未连接真实服务 · 本地修改在刷新后重置</footer>
    </div>`,
});
