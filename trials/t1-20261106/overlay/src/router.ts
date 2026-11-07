import { createRouter, createWebHistory } from 'vue-router';
import type { RouterHistory } from 'vue-router';
export function createAppRouter(history: RouterHistory = createWebHistory()) {
  return createRouter({
    history,
    routes: [
      { path: '/', redirect: '/agreements' },
      {
        path: '/agreements',
        component: () => import('./features/agreements/Shell.vue'),
        children: [
          { path: '', component: () => import('./features/agreements/List.vue') },
          { path: ':id', component: () => import('./features/agreements/Detail.vue') },
        ],
      },
    ],
  });
}
