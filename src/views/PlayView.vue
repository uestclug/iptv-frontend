<template>
  <VideoPlayer
    :src="videoEndpoint + $route.params.vid + '/index.m3u8'"
    :presrc="snapshotEndpoint + $route.params.vid + '.jpg'"
  />
</template>

<script setup>
import { useKeypress } from "vue3-keypress";
import VideoPlayer from "@/components/play/VideoPlayer.vue";

const videoEndpoint = import.meta.env.VITE_VIDEO_ENDPOINT;

const snapshotEndpoint = import.meta.env.VITE_SNAPSHOT_ENDPOINT;

const nextChannel = ({ keyCode }) => {
  console.log(keyCode);
};

const prevChannel = ({ keyCode }) => {
  console.log(keyCode);
};

const downVolume = ({ keyCode }) => {
  console.log(keyCode);
};

const upVolume = ({ keyCode }) => {
  console.log(keyCode);
};

useKeypress({
  keyEvent: "keydown",
  keyBinds: [
    {
      keyCode: "down",
      success: nextChannel,
    },
    {
      keyCode: "up",
      success: prevChannel,
    },
    {
      keyCode: "left",
      success: downVolume,
    },
    {
      keyCode: "right",
      success: upVolume,
    },
  ],
});
</script>

<style></style>
