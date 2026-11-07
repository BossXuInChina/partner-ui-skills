// 伙伴详情页面：共享草稿、确认保存、取消及返回；全部变更仅在本地内存中生效。
import { computed, defineComponent, ref } from 'vue';
import { WorkbenchButton, WorkbenchInput, WorkbenchModal } from '@workbench/ui-vue3';
import { useProject } from 'partner-ui/project';
import { draftFor, saveDraft } from '../state/store.js';
export default defineComponent({
  name: 'DetailPage', components: { WorkbenchButton, WorkbenchInput, WorkbenchModal },
  setup() {
    const project = useProject(), confirmOpen = ref(false), notice = ref('');
    const id = computed(() => project.route.params.id || 'P-001');
    const draft = computed(() => draftFor(id.value));
    function save() {
      const result = saveDraft(id.value);
      notice.value = result.ok ? '已保存到本地演示数据' : result.error;
      if (result.ok) confirmOpen.value = false;
    }
    return { project, draft, confirmOpen, notice, save };
  },
  template: `<div class="pui-stack">
    <header class="demo-page-head"><h1 class="pui-title-xl">伙伴详情</h1><WorkbenchButton v-if="project.pages.some(page => page.id === 'partners')" appearance="text" @click="project.navigate('partners')">返回伙伴列表</WorkbenchButton></header>
    <section v-if="draft" class="pui-surface pui-stack">
      <label class="demo-field">伙伴名称<WorkbenchInput v-model="draft.name" aria-label="编辑伙伴名称" /></label>
      <label class="demo-field">负责人<WorkbenchInput v-model="draft.owner" aria-label="编辑负责人" /></label>
      <div><WorkbenchButton :disabled="!draft.name.trim()" @click="confirmOpen = true">保存修改</WorkbenchButton></div>
    </section>
    <p v-else role="status">未找到该伙伴，请返回伙伴列表。</p>
    <p v-if="notice" role="status">{{ notice }}</p>
    <WorkbenchModal v-model="confirmOpen" title="确认保存伙伴资料" size="s">
      <p class="pui-text">本次修改仅保存到演示数据，不会提交到真实服务。</p>
      <template #footer><div class="pui-row"><WorkbenchButton appearance="secondary" @click="confirmOpen = false">取消</WorkbenchButton><WorkbenchButton @click="save">确认保存</WorkbenchButton></div></template>
    </WorkbenchModal>
  </div>`,
});
