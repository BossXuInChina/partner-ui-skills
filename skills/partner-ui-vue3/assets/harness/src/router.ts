import { createRouter, createWebHistory } from 'vue-router';
import type { Router, RouterHistory } from 'vue-router';
import BlankPage from './pages/BlankPage.vue';
import { createTemplateRoutes } from './template-routes';

export function createAppRouter(history: RouterHistory = createWebHistory()) {
  const router: Router = createRouter({
    history,
    routes: [
      { path: '/', redirect: { name: 'blank' } },
      { path: '/blank', name: 'blank', component: BlankPage },
      ...createTemplateRoutes((location) => router.push(location)),
      { path: '/:pathMatch(.*)*', redirect: { name: 'blank' } },
    ],
  });
  return router;
}
