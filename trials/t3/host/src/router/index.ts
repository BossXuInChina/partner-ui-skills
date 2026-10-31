import { createRouter, createWebHistory } from "vue-router";
export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/pages/HomePage.vue"),
    },
    {
      path: "/agreements",
      name: "agreements",
      component: () => import("@/pages/AgreementsPage.vue"),
    },
  ],
});
