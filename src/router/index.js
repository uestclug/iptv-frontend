import { createRouter, createWebHistory } from "vue-router";
import { profileStore } from "@/store/profile";
import { adminStore } from "@/store/admin";
import { liveStore } from "@/store/live";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/login",
    name: "login",
    beforeEnter() {
      if (!profileStore().isLogin()) profileStore().login();
      else return { path: "/" };
    },
  },
  {
    path: "/auth",
    name: "auth",
    beforeEnter(to) {
      var hash = to.hash.split("&").reduce(function (res, item) {
        var parts = item.split("=");
        res[parts[0]] = parts[1];
        return res;
      }, {});
      profileStore().token = hash.access_token;
      liveStore().fetchLives();
      return { path: "/" };
    },
  },
  {
    path: "/auth_admin",
    name: "auth-admin",
    beforeEnter(to) {
      var hash = to.hash.split("&").reduce(function (res, item) {
        var parts = item.split("=");
        res[parts[0]] = parts[1];
        return res;
      }, {});
      adminStore().token = hash.access_token;
      if (adminStore().isLogin()) return { path: "/admin" };
      else return { path: "/" };
    },
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/views/AdminView.vue"),
    beforeEnter() {
      if (!adminStore().isLogin()) {
        adminStore().login();
      }
    },
  },
  {
    path: "/play/:vid",
    name: "play",
    component: () => import("@/views/PlayView.vue"),
  },
  {
    path: "/live/:cid/:vid",
    name: "live",
    component: () => import("@/views/LiveView.vue"),
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
