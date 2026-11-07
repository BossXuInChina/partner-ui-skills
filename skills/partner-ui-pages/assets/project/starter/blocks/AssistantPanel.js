// 常驻业务 Block：本地模拟 AI 会话。收起和换页保留消息，真正卸载时终止生成。
import { defineComponent, onBeforeUnmount } from 'vue';
import { ChatPanel } from 'huawei-partner-ai-ui';
import { createChatSession, chatRenderers } from 'partner-ui';
import { store } from '../state/store.js';
export default defineComponent({
  name: 'AssistantPanel', components: { ChatPanel },
  setup() {
    const failed = new Set();
    const chat = createChatSession({
      delay: 250,
      respond(query) {
        if (query.includes('模拟错误') && !failed.has(query)) { failed.add(query); throw new Error('演示错误，可点击重试'); }
        return '当前共管理 ' + store.partners.length + ' 家伙伴。你可以在伙伴管理中筛选记录，进入详情修改并保存。此回复为本地模拟，未连接真实服务。';
      },
    });
    onBeforeUnmount(() => chat.abort());
    return { chat, renderers: chatRenderers, store };
  },
  template: `<aside class="demo-assistant partner-ai" aria-label="AI 助手">
    <ChatPanel :messages="chat.messages" :processing="chat.processing" :error="chat.error" :aborted="chat.aborted" :renderers="renderers" closable
      @send="chat.send" @abort="chat.abort" @retry="chat.retry" @new-conversation="chat.reset" @close="store.assistantOpen = false" />
  </aside>`,
});
