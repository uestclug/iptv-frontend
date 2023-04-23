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
    async fetchData(url, method = "GET", body = null) {
      let fetch_config = {
        method: method,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      };
      if (body) {
        fetch_config.body = JSON.stringify(body);
        fetch_config.headers["Content-type"] =
          "application/json; charset=UTF-8";
      }
      if (this.token)
        return await fetch(
          import.meta.env.VITE_LIVE_API_ENDPOINT + url,
          fetch_config
        );
      else return null;
    },
  },
  persist: {
    enabled: true,
  },
});
