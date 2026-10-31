import { defineAsyncComponent, markRaw, onMounted, onScopeDispose, ref, shallowRef } from 'vue';
import type { BubbleContentRendererMatch } from '@opentiny/tiny-robot';
import { useChatSession } from '@scaffold/chat/useChatSession';
import { useMessages } from '@scaffold/feedback/useMessages';
import { chatErrorMessage } from '@scaffold/locale/zh-CN';
import type { AiChatApi } from './api';
import { isRegionSalesPart, type ChatHistoryStorage } from './types';
import { text } from './locale';
export interface AiChatPageOptions {
  historyNamespace: string;
  storage?: ChatHistoryStorage;
}
export function usePage(api: AiChatApi, options: AiChatPageOptions) {
  if (!options.historyNamespace.trim()) throw new Error('CHAT_HISTORY_NAMESPACE_REQUIRED');
  const session = useChatSession(api, {
    partValidator: isRegionSalesPart,
    ...(options.storage
      ? {
          storage: {
            read: () => options.storage!.read(options.historyNamespace),
            write: (snapshot) => options.storage!.write(options.historyNamespace, snapshot),
          },
        }
      : {}),
  });
  let alive = true;
  onScopeDispose(() => {
    alive = false;
  });
  const feedback = useMessages();
  async function navigate(
    target: Parameters<AiChatApi['navigate']>[0],
    params?: Readonly<Record<string, string>>,
  ) {
    try {
      await api.navigate(target, params);
    } catch {
      feedback.show({ message: text.navigationUnavailable, type: 'warning' });
    }
  }
  const renderers = shallowRef<BubbleContentRendererMatch[]>([]);
  const ready = ref(false),
    rendererError = ref(false),
    activeTab = ref('sales');
  async function loadRenderers() {
    rendererError.value = false;
    try {
      const { createBusinessRenderers } = await import('@scaffold/ai/renderers');
      if (!alive) return;
      renderers.value = [
        ...createBusinessRenderers({
          targets: {
            report: (params) => {
              void navigate('report', params);
            },
          },
          openAgreement: (agreement) => {
            void navigate('agreement', { id: agreement.id });
          },
          unknownTarget: () =>
            feedback.show({ message: text.navigationUnavailable, type: 'warning' }),
        }),
        {
          find: (_message, part) => isRegionSalesPart(part),
          renderer: markRaw(defineAsyncComponent(() => import('./RegionSalesRenderer.vue'))),
          priority: -40,
        },
      ];
      ready.value = true;
    } catch {
      if (alive) rendererError.value = true;
    }
  }
  function navigateTab(value: unknown) {
    if (value === 'home' || value === 'sales' || value === 'service') {
      activeTab.value = value;
      void navigate(value);
    }
  }
  function breadcrumb(_item: unknown, event?: unknown) {
    if (event instanceof Event) event.preventDefault();
    void navigate('home');
  }
  onMounted(() => {
    void loadRenderers();
  });
  return {
    session,
    feedback,
    renderers,
    ready,
    rendererError,
    loadRenderers,
    activeTab,
    navigateTab,
    breadcrumb,
    errorMessage: () => (session.error.value ? chatErrorMessage(session.error.value) : ''),
    historyNamespace: options.historyNamespace,
  };
}
