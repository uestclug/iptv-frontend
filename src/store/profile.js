import { defineStore } from "pinia";
import jwt_decode from "jwt-decode";

export const profileStore = defineStore("profile", {
  state: () => ({
    dark: null,
    compact: false,
    favorites: [],
    volume: 1,
    mute: false,
    token: null,
  }),
  actions: {
    isLogin() {
      return !!this.token;
    },
    login() {
      window.location.href =
        import.meta.env.VITE_LIVE_API_ENDPOINT + "redirect/user";
    },
    getUserInfo() {
      if (this.token) return jwt_decode(this.token);
      else return null;
    },
    toggleCompact() {
      this.compact = !this.compact;
    },
    getMute() {
      return this.mute;
    },
    toggleMute() {
      this.mute = !this.mute;
    },
    getVolume() {
      return this.volume;
    },
    incVolume(rev) {
      if (!rev)
        if (this.volume + 0.1 > 1) this.volume = 1;
        else this.volume += 0.1;
      else if (this.volume - 0.1 < 0) this.volume = 0;
      else this.volume -= 0.1;
    },
    getCompact() {
      return this.compact;
    },
    setFavorite(vid) {
      if (!this.favorites.includes(vid)) this.favorites.push(vid);
    },
    unsetFavorite(vid) {
      if (this.favorites.includes(vid))
        this.favorites = this.favorites.filter((i) => i !== vid);
    },
    isFavorite(vid) {
      return this.favorites.includes(vid);
    },
  },
  persist: {
    enabled: true,
  },
});
