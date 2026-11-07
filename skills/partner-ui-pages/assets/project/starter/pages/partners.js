// 伙伴列表页面：将业务 Block 的打开意图映射到页面路由。
import { defineComponent, ref } from 'vue';
import { useProject } from 'partner-ui/project';
import PartnerList from '../blocks/PartnerList.js';
export default defineComponent({
  name: 'PartnersPage', components: { PartnerList },
  setup() {
    const project = useProject(), note = ref('');
    function open(id) {
      if (project.pages.some(page => page.id === 'detail')) project.navigate('detail', { id });
      else note.value = '当前交付仅包含伙伴管理页，详情未导出。';
    }
    return { open, note };
  },
  template: `<div class="pui-stack"><h1 class="pui-title-xl">伙伴管理</h1><PartnerList @open="open" /><p v-if="note" role="status">{{ note }}</p></div>`,
});
