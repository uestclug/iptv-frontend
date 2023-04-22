import { defineStore } from "pinia";

export const liveStore = defineStore("live", {
  state: () => ({
    lives: {
      Categories: [],
    },
  }),
  actions: {
    getLive(cid, vid) {
      for (let cat of this.channels.Categories)
        if (cat.Cid === cid)
          for (let ch of cat.Channels) if (ch.Vid === vid) return ch;
      return { Name: "未知频道", Vid: "unknown" };
    },
    fetchLives() {
      fetch("/lives.json")
        .then((res) => {
          return res.json();
        })
        .then((chs) => {
          this.channels = chs;
        })
        .catch(() => {
          this.channels = {
            Categories: [],
          };
        });
    },
  },
});
