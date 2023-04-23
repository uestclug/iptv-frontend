import { defineStore } from "pinia";
import jwt_decode from "jwt-decode";
import router from "@/router";

export const adminStore = defineStore("admin", {
  state: () => ({
    token: null,
  }),
  actions: {
    isLogin() {
      return !!this.token;
    },
    login() {
      window.location.href =
        import.meta.env.VITE_LIVE_API_ENDPOINT + "redirect/admin";
    },
    logout() {
      this.token = null;
      router.push("/");
    },
    getUserInfo() {
      if (this.token) return jwt_decode(this.token);
      else return null;
    },
  },
  persist: {
    enabled: true,
  },
});
