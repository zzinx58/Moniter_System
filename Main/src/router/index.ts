import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/",
    redirect: "/csstest",
  },
  {
    path: "/csstest",
    name: "CSSTest",
    component: () => import("@/views/CSSTest.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
