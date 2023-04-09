import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/play/:vid",
    name: "play",
    component: () => import("@/views/PlayView.vue"),
  },
  {
    path: "/error/:code",
    name: "error",
    component: () => import("@/views/ErrorView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/error/404",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
