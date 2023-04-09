<template>
  <v-row>
    <ChannelPreviewGroup
      v-if="favoriteChannels.length"
      :chs="favoriteChannels"
      cat="收藏夹"
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
      :chs="cat.Channels"
      :cat="cat.Name"
    />
  </v-row>
</template>

<script setup>
import { channelStore } from "@/store/channel";
import ChannelPreviewGroup from "./ChannelPreviewGroup.vue";
const channels = channelStore().$state.channels;
const favoriteChannels = channelStore().getFavoriteChannels();
</script>
