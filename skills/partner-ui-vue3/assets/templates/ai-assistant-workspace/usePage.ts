import { computed, onMounted, onScopeDispose, reactive, ref, shallowRef, watch } from 'vue';
import type { BubbleContentRendererMatch } from '@opentiny/tiny-robot';
import type {
  Agreement,
  AgreementBusinessAction,
  ConversationHistoryOptions,
  WorkspaceNavigation,
  ChatWindowMode,
} from 'huawei-partner-ai-ui';
import { useMessages } from '@scaffold/feedback/useMessages';
import type { AssistantWorkspaceApi } from './api';
import {
  decodeAgreements,
  decodeInsights,
  isAgreement,
  type AgreementRange,
  type WorkspaceHistoryStorage,
  type WorkspaceNavigationTarget,
} from './types';
import { text } from './locale';
export interface WorkspacePageOptions {
  historyNamespace: string;
  storage?: WorkspaceHistoryStorage;
  persistHistory?: boolean;
}
export interface AssistantPanelHandle {
  canSendQuery(): boolean;
  sendQuery(query: string): Promise<boolean>;
  applyBusinessUpdate(agreement: Agreement): void;
}
const record = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === 'object';
const targets: readonly string[] = ['home', 'sales', 'service', 'renew', 'renewals', 'agreement'];
function navigationTarget(value: string): value is WorkspaceNavigationTarget {
  return targets.includes(value);
}
export function usePage(api: AssistantWorkspaceApi, options: WorkspacePageOptions) {
  if (!options.historyNamespace.trim()) throw new Error('WORKSPACE_HISTORY_NAMESPACE_REQUIRED');
  if (options.persistHistory && !options.storage) throw new Error('WORKSPACE_STORAGE_REQUIRED');
  const feedback = useMessages();
  const range = ref<AgreementRange>('90'),
    agreements = shallowRef<Agreement[]>([]),
    insights = shallowRef<ReturnType<typeof decodeInsights>>([]);
  const loading = ref(false),
    loadError = ref(false),
    submitting = ref(false),
    renewError = ref(false),
    ready = ref(false);
  const ai = reactive<{ open: boolean; mode: ChatWindowMode; full: boolean }>({
    open: true,
    mode: 'sidebar',
    full: false,
  });
  const activeTab = ref('sales');
  const panel = shallowRef<AssistantPanelHandle | null>(null),
    renderers = shallowRef<BubbleContentRendererMatch[]>([]),
    assistantError = ref(false);
  let loadController: AbortController | undefined,
    mutationController: AbortController | undefined,
    alive = true,
    epoch = 0,
    query = '';
  let failedRenew: { ids: readonly string[]; key: string } | undefined;
  const history: ConversationHistoryOptions = {
    namespace: options.historyNamespace,
    storage:
      options.persistHistory && options.storage
        ? options.storage
        : { read: async () => null, write: async () => {} },
  };
  async function navigate(
    target: WorkspaceNavigationTarget,
    params?: Readonly<Record<string, string>>,
  ) {
    try {
      await api.navigate(target, params);
    } catch {
      if (alive) feedback.show({ message: text.navigationUnavailable, type: 'warning' });
    }
  }
  function onNavigate(value: WorkspaceNavigation) {
    if (navigationTarget(value.target)) void navigate(value.target, value.params);
    else feedback.show({ message: text.navigationUnavailable, type: 'warning' });
  }
  async function load() {
    loadController?.abort();
    const controller = new AbortController();
    loadController = controller;
    const current = ++epoch;
    loading.value = true;
    loadError.value = false;
    try {
      const [rows, items] = await Promise.all([
        api.listAgreements({ range: range.value }, controller.signal),
        api.listInsights(controller.signal),
      ]);
      if (alive && !controller.signal.aborted && current === epoch) {
        agreements.value = decodeAgreements(rows);
        insights.value = decodeInsights(items);
      }
    } catch {
      if (alive && !controller.signal.aborted && current === epoch) loadError.value = true;
    } finally {
      if (alive && current === epoch) loading.value = false;
    }
  }
  async function renew(ids: readonly string[], retry = false) {
    if (submitting.value || !ids.length) return;
    const operation =
      retry && failedRenew ? failedRenew : { ids: [...ids], key: globalThis.crypto.randomUUID() };
    failedRenew = operation;
    const controller = new AbortController();
    mutationController = controller;
    submitting.value = true;
    renewError.value = false;
    try {
      const updates = decodeAgreements(
        await api.renew(operation.ids, {
          signal: controller.signal,
          idempotencyKey: operation.key,
        }),
      );
      if (!alive || controller.signal.aborted) return;
      const map = new Map(updates.map((row) => [row.id, row]));
      agreements.value = agreements.value.map((row) => map.get(row.id) ?? row);
      for (const row of updates) panel.value?.applyBusinessUpdate(row);
      failedRenew = undefined;
      feedback.show({ message: text.submitted, type: 'success' });
    } catch {
      if (alive && !controller.signal.aborted) renewError.value = true;
    } finally {
      if (alive) submitting.value = false;
    }
  }
  function retryRenew() {
    if (failedRenew) return renew(failedRenew.ids, true);
    return Promise.resolve();
  }
  async function flushQuery() {
    if (!query || !panel.value) return;
    const value = query;
    query = '';
    if (panel.value.canSendQuery()) {
      try {
        await panel.value.sendQuery(value);
      } catch {
        if (alive) feedback.show({ message: text.assistantLoadError, type: 'error' });
      }
    } else feedback.show({ message: text.assistantBusy, type: 'warning' });
  }
  function ask(value: string) {
    ai.open = true;
    query = value;
    void flushQuery();
  }
  function setPanel(value: unknown) {
    function isPanel(handle: unknown): handle is AssistantPanelHandle {
      return (
        record(handle) &&
        typeof handle.canSendQuery === 'function' &&
        typeof handle.sendQuery === 'function' &&
        typeof handle.applyBusinessUpdate === 'function'
      );
    }
    panel.value = isPanel(value) ? value : null;
  }
  watch(panel, () => {
    void flushQuery();
  });
  function onRowAction(value: unknown) {
    if (
      !record(value) ||
      !record(value.row) ||
      !record(value.action) ||
      typeof value.row.id !== 'string'
    )
      return;
    const id = value.row.id;
    const row = agreements.value.find((item) => item.id === id);
    if (!row) return;
    if (value.action.id === 'ask') ask(text.rowQuery(row.name));
    if (value.action.id === 'renew') void renew([row.id]);
  }
  function onBusiness(action: AgreementBusinessAction) {
    if (action.type === 'renew') void renew([action.agreement.id]);
    else void navigate('agreement', { id: action.agreement.id });
  }
  function statusLabel(row: unknown) {
    return isAgreement(row) ? row.status : '';
  }
  function statusTone(row: unknown): 'warning' | 'info' | 'success' {
    return isAgreement(row)
      ? row.status === '待续签'
        ? 'warning'
        : row.status === '审批中'
          ? 'info'
          : 'success'
      : 'info';
  }
  function setRange(value: unknown) {
    if (value === '30' || value === '90') range.value = value;
  }
  function navigateTab(value: unknown) {
    if (value === 'home' || value === 'sales' || value === 'service') {
      activeTab.value = value;
      void navigate(value);
    }
  }
  function breadcrumb(item: unknown, event?: unknown) {
    if (event instanceof Event) event.preventDefault();
    if (record(item) && item.id === 'sales') void navigate('sales');
    else if (record(item) && item.id === 'home') void navigate('home');
  }
  async function loadRenderers() {
    assistantError.value = false;
    try {
      const { createBusinessRenderers } = await import('@scaffold/ai/renderers');
      if (!alive) return;
      renderers.value = createBusinessRenderers({
        targets: {
          renew: (params) => {
            void navigate('renew', params);
          },
          renewals: (params) => {
            void navigate('renewals', params);
          },
        },
        openAgreement: (agreement) => {
          void navigate('agreement', { id: agreement.id });
        },
        unknownTarget: () =>
          feedback.show({ message: text.navigationUnavailable, type: 'warning' }),
      });
      ready.value = true;
    } catch {
      if (alive) assistantError.value = true;
    }
  }
  watch(range, () => {
    void load();
  });
  onMounted(() => {
    void load();
    void loadRenderers();
  });
  onScopeDispose(() => {
    alive = false;
    ++epoch;
    loadController?.abort();
    mutationController?.abort();
    query = '';
  });
  return {
    range,
    agreements,
    insights,
    loading,
    loadError,
    submitting,
    renewError,
    ready,
    ai,
    activeTab,
    panel,
    setPanel,
    renderers,
    assistantError,
    history,
    feedback,
    load,
    renew,
    retryRenew,
    ask,
    onNavigate,
    onRowAction,
    onBusiness,
    statusLabel,
    statusTone,
    setRange,
    navigateTab,
    breadcrumb,
    loadRenderers,
    renewAll: () =>
      renew(agreements.value.filter((row) => row.status === '待续签').map((row) => row.id)),
    insightTag: computed(() => ({
      fragments: [
        { text: text.week },
        { text: String(insights.value.length), emphasis: 'data' as const },
        { text: text.suggestions },
      ],
    })),
  };
}
