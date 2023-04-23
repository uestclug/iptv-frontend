<template>
  <v-row>
    <ChannelPreviewGroup
      v-if="favoriteChannels.Channels.length"
      :cat="favoriteChannels"
    />
    <v-col v-if="!channels.Categories.length">
      <v-alert
        color="warning"
        variant="tonal"
        icon="mdi-lan-disconnect"
        title="频道列表加载失败"
        text="请检查您的网络，或向管理员反馈。"
      >
      </v-alert>
    </v-col>
    <ChannelPreviewGroup
      v-for="cat in channels.Categories"
      :key="cat.Name"
      :cat="cat"
    />
    <ChannelPreviewGroup
      v-for="cat in lives.Categories"
      :key="cat.Name"
      :cat="cat"
    />
  </v-row>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { channelStore } from "@/store/channel";
import { liveStore } from "@/store/live";
import ChannelPreviewGroup from "./ChannelPreviewGroup.vue";

const { channels: channels } = storeToRefs(channelStore());
const { channels: lives } = storeToRefs(liveStore());
const favoriteChannels = channelStore().getFavoriteChannels();
</script>
