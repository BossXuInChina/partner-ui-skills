import type { RouteRecordRaw } from 'vue-router';
import type { AssistantWorkspaceApi } from './pages/ai-assistant-workspace/api';
import type { WorkspaceHistoryStorage } from './pages/ai-assistant-workspace/types';

export function createFeatureRoutes(
  api: AssistantWorkspaceApi,
  options: {
    historyNamespace?: string;
    storage?: WorkspaceHistoryStorage;
    persistHistory?: boolean;
  } = {},
): RouteRecordRaw[] {
  return [
    {
      path: '/workspace',
      name: 'workspace',
      component: () => import('./pages/ai-assistant-workspace/Page.vue'),
      props: () => ({
        api,
        historyNamespace: options.historyNamespace ?? 'partner-feature-workspace',
        ...(options.storage ? { storage: options.storage } : {}),
        persistHistory: options.persistHistory ?? false,
      }),
    },
  ];
}
