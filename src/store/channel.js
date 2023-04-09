import { defineStore } from "pinia";
import { saveAs } from "file-saver";
import { profileStore } from "./profile";

export const channelStore = defineStore("channel", {
  state: () => ({
    channels: {
      Categories: [],
    },
  }),
  actions: {
    getFavoriteChannels() {
      const profile = profileStore();
      const favoriteChannelIDs = profile.favorites;
      let ret = [];
      for (const vid of favoriteChannelIDs) ret.push(this.getChannel(vid));
      return ret;
    },
    getCategoryList() {
      let ret = [];
      for (let cat of this.channels.Categories) ret.push(cat.Name);
      return ret;
    },
    getChannelList() {
      let ret = [];
      for (let cat of this.channels.Categories)
        for (let ch of cat.Channels) ret.push(ch);
      return ret;
    },
    getChannel(vid) {
      for (let cat of this.channels.Categories)
        for (let ch of cat.Channels) if (ch.Vid === vid) return ch;
      return { Name: "未知频道", Vid: "unknown" };
    },
    getPlaylistFile() {
      var str = "#EXTM3U\n";
      for (const cat of this.channels.Categories)
        for (const ch of cat.Channels)
          str += `#EXTINF:0 tvg-name="${
            ch.Vid
          }" tvg-language="Chinese" tvg-country="CN" tvg-id="${
            ch.Vid
          }" group-title="${ch.Name}",${ch.Name}\n${
            import.meta.env.VITE_VIDEO_ENDPOINT
          }${ch.Vid}/index.m3u8\n`;
      var blob = new Blob([str], {
        type: "text/plain;charset=utf-8",
      });
      saveAs(blob, "playlist.m3u8");
    },
    fetchChannels() {
      fetch("/channels.json")
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
