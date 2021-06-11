import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/list",
    alias: "/list",
    name: "list",
    component: () => import("@/components/ItemList.vue"),
  },
  {
    path: "/detail/:id",
    alias: "/detail/:id",
    name: "detail",
    component: () => import("@/components/ItemDetail.vue"),
  },
  {
    path: "/add",
    alias: "/add",
    name: "add",
    component: () => import("@/components/AddItem.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
