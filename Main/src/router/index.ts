import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// import Layout from "@/views/Layout.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/zzzinx58/Login.vue"),
  },
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/index",
    name: "DashBoard",
    component: () => import("@/views/Layout.vue"),
    children: [
      {
        path: "zzinx58",
        component: () => import("@/views/Zzinx58.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
