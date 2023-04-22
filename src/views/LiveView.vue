<template>
  <VideoPlayer
    :src="videoEndpoint + $route.params.cid + '/' + $route.params.vid + '.m3u8'"
  />
</template>

<script setup>
import { useKeypress } from "vue3-keypress";
import { profileStore } from "@/store/profile";
import VideoPlayer from "@/components/play/VideoPlayer.vue";

const videoEndpoint = import.meta.env.VITE_VIDEO_ENDPOINT;

const incVolume = profileStore().incVolume;

const toggleMute = profileStore().toggleMute;

useKeypress({
  keyEvent: "keydown",
  keyBinds: [
    {
      keyCode: 77, // m
      success: () => {
        toggleMute();
      },
    },
    {
      keyCode: "left",
      success: () => {
        incVolume(true);
      },
    },
    {
      keyCode: "right",
      success: () => {
        incVolume();
      },
    },
  ],
});
</script>
