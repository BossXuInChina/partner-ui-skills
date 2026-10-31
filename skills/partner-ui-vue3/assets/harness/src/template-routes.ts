import type { RouteLocationRaw, RouteRecordRaw } from 'vue-router';
import {
  createBlankTemplateApi,
  createAiChatTemplateApi,
  createAssistantWorkspaceTemplateApi,
  createWorkbenchDashboardTemplateApi,
  createWorkbenchDetailTemplateApi,
  createWorkbenchListTemplateApi,
} from './template-api';

export function createTemplateRoutes(
  navigate: (location: RouteLocationRaw) => void | Promise<unknown>,
): RouteRecordRaw[] {
  return [
    {
      path: '/templates/ai-chat',
      name: 'template-ai-chat',
      component: () => import('@templates/ai-chat/Page.vue'),
      meta: { template: true },
      props: () => ({
        api: createAiChatTemplateApi({ navigate }),
        historyNamespace: 'partner-template-ai-chat',
      }),
    },
    {
      path: '/templates/ai-assistant-workspace',
      name: 'template-ai-assistant-workspace',
      component: () => import('@templates/ai-assistant-workspace/Page.vue'),
      meta: { template: true },
      props: () => ({
        api: createAssistantWorkspaceTemplateApi({ navigate }),
        historyNamespace: 'partner-template-ai-assistant-workspace',
      }),
    },
    {
      path: '/templates/blank',
      name: 'template-blank',
      component: () => import('@templates/blank/Page.vue'),
      meta: { template: true },
      props: () => ({ api: createBlankTemplateApi({ navigate }) }),
    },
    {
      path: '/templates/workbench-list',
      name: 'template-workbench-list',
      component: () => import('@templates/workbench-list/Page.vue'),
      meta: { template: true },
      props: () => ({ api: createWorkbenchListTemplateApi({ navigate }) }),
    },
    {
      path: '/templates/workbench-detail',
      name: 'template-workbench-detail',
      component: () => import('@templates/workbench-detail/Page.vue'),
      meta: { template: true },
      props: (route) => ({
        api: createWorkbenchDetailTemplateApi({
          navigate,
          ...(typeof route.query.id === 'string' ? { agreementId: route.query.id } : {}),
        }),
      }),
    },
    {
      path: '/templates/workbench-dashboard',
      name: 'template-workbench-dashboard',
      component: () => import('@templates/workbench-dashboard/Page.vue'),
      meta: { template: true },
      props: () => ({ api: createWorkbenchDashboardTemplateApi({ navigate }) }),
    },
  ];
}
