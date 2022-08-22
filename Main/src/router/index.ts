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
    path: "/show",
    name: "Show",
    component: () => import("@/views/ShowData.vue")
  },
  {
    path: "/teamlist",
    name: "TeamList",
    component: () => import("@/views/TeamList/index.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
