import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Index",
    component: () => import("@/Test"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
