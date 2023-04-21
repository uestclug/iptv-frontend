<template>
  <VideoPlayer
    :src="
      videoEndpoint +
      ($route.params.cid
        ? $route.params.cid + '/' + $route.params.vid + '.m3u8'
        : $route.params.vid + '/index.m3u8')
    "
    :presrc="
      snapshotEndpoint +
      ($route.params.cid
        ? $route.params.cid + '/' + $route.params.vid + '.jpg'
        : $route.params.vid + '.jpg')
    "
  />
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useKeypress } from "vue3-keypress";
import { channelStore } from "@/store/channel";
import { profileStore } from "@/store/profile";
import VideoPlayer from "@/components/play/VideoPlayer.vue";

const route = useRoute();
const router = useRouter();
const videoEndpoint = import.meta.env.VITE_VIDEO_ENDPOINT;

const snapshotEndpoint = import.meta.env.VITE_SNAPSHOT_ENDPOINT;

const incVolume = profileStore().incVolume;

const getNextChannel = channelStore().getNextChannel;

const toggleMute = profileStore().toggleMute;

const getChannelLink = channelStore().getChannelLink;

const nextChannel = () => {
  router.push("/play/" + getChannelLink(getNextChannel(route.params.vid)));
};

const prevChannel = () => {
  router.push(
    "/play/" + getChannelLink(getNextChannel(route.params.vid, true))
  );
};

useKeypress({
  keyEvent: "keydown",
  keyBinds: [
    {
      keyCode: "down",
      success: prevChannel,
    },
    // {
    //   keyCode: "esc",
    //   success: router.push("/"),
    // },
    {
      keyCode: 77, // m
      success: () => {
        toggleMute();
      },
    },
    {
      keyCode: "up",
      success: nextChannel,
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
