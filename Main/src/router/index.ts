import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  // {
  //   path: "/login",
  //   name: "Login",
  //   component: () => import("@/views/login/index.vue"),
  //   meta: {
  //     hidden: true,
  //   },
  // },
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/index",
    name: "Index",
    component: () => import("@/views/Layout.vue"),
    // component: () => import("@/components/HelloWorld.vue"),
    children: [
      {
        path: "helloworld",
        name: "HelloWorld",
        component: () => import("@/components/HelloWorld.vue"),
      },
      {
        path: "errorPreview",
        name: "ErrorPreview",
        component: () => import("@/views/ErrorPreview.vue"),
      },
      {
        path: "test",
        name: "Test",
        component: () => import("@/views/Test.vue"),
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
