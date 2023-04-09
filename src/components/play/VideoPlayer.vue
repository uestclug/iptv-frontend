<template>
  <video-player
    @mounted="player"
    @fullscreenchange="onfullscreen"
    @error="onError"
    liveui
    language="zh-CN"
    :src="src"
    :poster="presrc"
    playsinline
    preferFullWindow
    autoplay
    responsive
    fill
    controls
  />
  <v-banner
    v-if="error_popup"
    position="absolute"
    style="bottom: 0; z-index: 999"
    lines="three"
    stacked
    icon="mdi-wifi-strength-alert-outline"
    color="warning"
  >
    <template v-slot:text>
      <b>视频无法加载</b>
      <br />
      视频因格式不支持或者服务器或网络的问题无法加载
    </template>

    <template v-slot:actions>
      <v-btn to="/"> 返回主页 </v-btn>
    </template>
  </v-banner>
</template>

<script>
import { defineComponent } from "vue";
import { VideoPlayer } from "@videojs-player/vue";
import { playerStore } from "@/store/player";
import "video.js/dist/video-js.css";
export default defineComponent({
  components: {
    VideoPlayer,
  },
  data: () => ({
    playerObj: null,
    playerState: playerStore(),
    error_popup: false,
  }),
  methods: {
    player(attr) {
      this.playerObj = attr;
    },
    onError() {
      this.error_popup = true;
    },
    onfullscreen() {
      if (this.playerObj.player.isFullscreen())
        this.playerState.fullscreen = true;
      else this.playerState.fullscreen = false;
    },
  },
  props: ["src", "presrc"],
});
</script>
