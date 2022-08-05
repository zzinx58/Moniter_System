import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/zzinx58",
    name: "Zzinx58",
    component: () => import("@/views/Zzinx58.vue"),
  },
    {
    path: "/collect",
    name: "Collect",
    component: () => import("@/views/Collect.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
