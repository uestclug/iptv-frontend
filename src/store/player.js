import { defineStore } from "pinia";

export const playerStore = defineStore("player", {
  state: () => ({
    fullscreen: false,
    selectedCat: null,
  }),
});
