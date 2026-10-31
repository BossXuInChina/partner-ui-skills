import type { RouteRecordRaw } from 'vue-router';
import type { WorkbenchListApi } from './pages/workbench-list/api';

export function createFeatureRoutes(api: WorkbenchListApi): RouteRecordRaw[] {
  return [
    {
      path: '/list',
      name: 'list',
      component: () => import('./pages/workbench-list/Page.vue'),
      props: () => ({ api }),
    },
  ];
}
