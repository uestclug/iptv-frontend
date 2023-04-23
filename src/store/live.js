import { defineStore } from "pinia";
import { profileStore } from "./profile";

export const liveStore = defineStore("live", {
  state: () => ({
    channels: {
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
    getCategoryList() {
      let ret = [];
      for (let cat of this.channels.Categories) ret.push(cat.Name);
      return ret;
    },
    fetchLives() {
      if (profileStore().token)
        fetch(import.meta.env.VITE_LIVE_API_ENDPOINT + "user/list", {
          headers: {
            Authorization: `Bearer ${profileStore().token}`,
          },
        })
          .then((res) => {
            return res.json();
          })
          .then((chs) => {
            if ("Categories" in chs) this.channels = chs;
            else profileStore().token = null;
          })
          .catch(() => {
            profileStore().token = null;
          });
    },
  },
});
