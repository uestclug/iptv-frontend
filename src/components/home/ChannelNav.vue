<template>
  <v-card
    flat
    rounded="lg"
    class="my-2"
    append-icon="mdi-playlist-play"
    title="分类"
  >
    <v-list rounded="lg">
      <v-list-item
        :active="playerStore().selectedCat === '收藏夹'"
        v-scroll-to="{ el: '#playlist-收藏夹', offset: -64 }"
        link
      >
        <v-list-item-title> 收藏夹 </v-list-item-title>
        <template v-slot:append>
          <v-chip>{{ favoriteChannels.length }}</v-chip>
        </template>
      </v-list-item>

      <v-divider class="my-2"></v-divider>

      <v-list-item
        :active="playerStore().selectedCat === cat.Name"
        v-scroll-to="{ el: '#playlist-' + cat.Name, offset: -64 }"
        v-for="cat in channels.Categories"
        :key="cat.Name"
        link
      >
        <v-list-item-title>
          {{ cat.Name }}
        </v-list-item-title>
        <template v-slot:append>
          <v-chip>{{ cat.Channels.length }}</v-chip>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup>
import { channelStore } from "@/store/channel";
import { playerStore } from "@/store/player";
const channels = channelStore().$state.channels;
const favoriteChannels = channelStore().getFavoriteChannels();
</script>
