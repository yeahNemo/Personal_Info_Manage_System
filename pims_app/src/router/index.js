import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("../views/Login"),
  },
  {
    path: "/main",
    name: "main",
    component: () => import("../views/Layout"),
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("../views/Home"),
      },
      {
        path: "function",
        name: "function",
        component: () => import("../views/Function"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 解决vue页面之间跳转，页面不是在顶部的问题
    return { x: 0, y: 0 };
  },
});

export default router;
