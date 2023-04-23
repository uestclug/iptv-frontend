<template>
  <v-col
    class="mt-2"
    cols="12"
    :id="'playlist-' + cat.Name"
    v-intersect="intersect"
  >
    <v-card class="mb-1" @click="expand = !expand" rounded="lg" flat>
      <v-row no-gutters>
        <v-col>
          <v-card-title>
            <v-icon icon="mdi-playlist-play" start></v-icon>{{ cat.Name }}
          </v-card-title>
        </v-col>
        <v-spacer />
        <v-btn
          disabled
          variant="plain"
          :icon="expand ? 'mdi-arrow-up' : 'mdi-arrow-down'"
        />
      </v-row>
    </v-card>
  </v-col>
  <v-col
    v-for="ch in cat.Channels"
    :key="ch.Vid"
    :hidden="!expand"
    cols="12"
    sm="6"
    md="4"
    lg="4"
    xl="3"
  >
    <ChannelInfo :ch="ch" :cid="'Cid' in cat ? cat.Cid : null" />
  </v-col>
</template>

<script>
import ChannelInfo from "./ChannelInfo.vue";
import { playerStore } from "@/store/player";
export default {
  props: ["cat"],
  components: { ChannelInfo },
  data: () => ({
    expand: true,
    playerState: playerStore(),
  }),
  methods: {
    intersect() {
      this.playerState.selectedCat = this.cat.Name;
    },
  },
};
</script>

<style></style>
