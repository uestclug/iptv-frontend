<template>
  <v-app>
    <main-nav v-if="!('vid' in $route.params && player.fullscreen)" />
    <v-main
      :class="
        theme.global.name.value
          ? theme.global.current.value.dark
            ? 'bg-grey-darken-3'
            : 'bg-grey-lighten-3'
          : 'bg-grey-lighten-3'
      "
    >
      <div
        class="navbackground"
        :style="{
          backgroundColor: theme.global.name.value
            ? theme.global.current.value.dark
              ? 'rgb(var(--v-theme-surface))'
              : 'Gainsboro'
            : 'Gainsboro',
        }"
      />
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import MainNav from "./components/layout/MainNav.vue";
import { useTheme } from "vuetify";
import { profileStore } from "@/store/profile";
import { playerStore } from "@/store/player";
import { channelStore } from "./store/channel";
import { liveStore } from "./store/live";
const theme = useTheme();
channelStore().fetchChannels();
liveStore().fetchLives();
if (profileStore().$state.dark)
  theme.global.name.value = profileStore().$state.dark;
const player = playerStore();
</script>

<style>
.navbackground {
  z-index: 999;
  height: 200px;
  width: 100%;
  position: fixed;
  top: -200px;
}
</style>
