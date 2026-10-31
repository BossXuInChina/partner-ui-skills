import { createRouter, createWebHistory } from 'vue-router';
import type { RouterHistory } from 'vue-router';
import BlankPage from './pages/BlankPage.vue';

export function createAppRouter(history: RouterHistory = createWebHistory()) {
  return createRouter({
    history,
    routes: [
      { path: '/', redirect: { name: 'blank' } },
      { path: '/blank', name: 'blank', component: BlankPage },
      { path: '/:pathMatch(.*)*', redirect: { name: 'blank' } },
    ],
  });
}
