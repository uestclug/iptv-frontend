<template>
  <v-dialog width="auto">
    <template v-slot:activator="{ props }">
      <v-btn
        icon="mdi-file-download-outline"
        variant="plain"
        v-bind="props"
      ></v-btn>
    </template>
    <v-card max-width="400px">
      <v-card-text class="text-center">
        <v-icon color="info" icon="mdi-download" size="88"></v-icon>
      </v-card-text>
      <v-card-title class="text-center"> 下载 .m3u8 播放列表文件 </v-card-title>
      <v-card-text class="text-center">
        您可以在各类支持的设备和播放器中观看本站内容。
      </v-card-text>
      <v-divider class="mt-2" />
      <v-btn size="large" prepend-icon="mdi-download" @click="getPlaylistFile"
        >下载</v-btn
      >
    </v-card>
  </v-dialog>
</template>

<script>
import { channelStore } from "@/store/channel";

export default {
  setup() {
    return {
      getChannel: channelStore().getChannel,
      getPlaylistFile: channelStore().getPlaylistFile,
    };
  },
};
</script>

<style></style>
