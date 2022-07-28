import { createRouter, createWebHistory } from "vue-router";

import Products from "../components/Products.vue";
import HelloWorld from "../components/HelloWorld.vue";

const routes = [
  {
    path: "/products",
    name: "Products",
    component: Products,
  },
  {
    path: "/",
    name: "HelloWorld",
    component: HelloWorld,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
