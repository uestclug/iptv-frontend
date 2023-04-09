<template>
  <v-col class="mt-2" cols="12" :id="'playlist-' + cat" v-intersect="intersect">
    <v-card class="mb-1" @click="expand = !expand" rounded="lg" flat>
      <v-row no-gutters>
        <v-col>
          <v-card-title>
            <v-icon icon="mdi-playlist-play" start></v-icon>{{ cat }}
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
    v-for="ch in chs"
    :key="ch.Vid"
    :hidden="!expand"
    cols="12"
    sm="6"
    md="4"
    lg="4"
    xl="3"
  >
    <ChannelInfo :ch="ch" />
  </v-col>
</template>

<script>
import ChannelInfo from "./ChannelInfo.vue";
import { playerStore } from "@/store/player";
export default {
  props: ["chs", "cat"],
  components: { ChannelInfo },
  data: () => ({
    expand: true,
    playerState: playerStore(),
  }),
  methods: {
    intersect() {
      this.playerState.selectedCat = this.cat;
    },
  },
};
</script>

<style></style>
