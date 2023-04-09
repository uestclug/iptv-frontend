import { defineStore } from "pinia";

export const profileStore = defineStore("profile", {
  state: () => ({
    dark: null,
    compact: false,
    favorites: [],
  }),
  actions: {
    toggleCompact() {
      this.compact = !this.compact;
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
