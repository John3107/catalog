import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "catalog",
  },
  {
    path: "/catalog",
    redirect: "catalog/filter",
  },
  {
    path: "/catalog/:slug",
    name: "catalog",
    component: () => import("@/modules/catalog/index.vue"),
  },
  {
    path: "/catalog/product/:slug",
    name: "product",
    component: () => import("@/modules/product/index.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
