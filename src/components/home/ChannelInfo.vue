<template>
  <v-hover v-slot="{ isHovering, props }">
    <div :class="getCompact() ? '' : 'mx-1'" v-bind="props">
      <v-card rounded="lg" flat @click="watch" v-if="!getCompact()">
        <v-overlay
          :model-value="isHovering"
          contained
          theme="light"
          class="align-center justify-center"
        >
          <v-card-title class="text-white">
            <v-icon
              class="ml-0"
              start
              size="large"
              icon="mdi-play"
              color="white"
            />
            点击播放</v-card-title
          >
        </v-overlay>
        <v-img
          aspect-ratio="1.7778"
          cover
          :src="snapshotEndpoint + ch.Vid + '.jpg'"
        >
          <template v-slot:error>
            <v-sheet color="grey" height="100%">
              <div class="d-flex align-center justify-center fill-height">
                <v-card-title>
                  <v-icon
                    start
                    size="large"
                    icon="mdi-alert-circle"
                    color="white"
                  />
                  预览暂不可用</v-card-title
                >
              </div>
            </v-sheet>
          </template>
          <template v-slot:placeholder>
            <v-sheet color="grey" height="100%">
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular size="x-large" indeterminate />
              </div>
            </v-sheet>
          </template>
        </v-img>
      </v-card>
      <v-card
        @click="watch"
        rounded="lg"
        :variant="getCompact() ? 'flat' : 'text'"
      >
        <v-card-title class="pb-1">
          {{ ch.Name }}
        </v-card-title>
        <v-card-subtitle class="mb-2"> 暂无节目单 </v-card-subtitle>
      </v-card>
    </div>
  </v-hover>
</template>

<script>
import { profileStore } from "@/store/profile";

export default {
  setup() {
    return {
      getCompact: profileStore().getCompact,
      snapshotEndpoint: import.meta.env.VITE_SNAPSHOT_ENDPOINT,
    };
  },
  props: ["ch", "cid"],
  data: () => ({
    overlay: false,
  }),
  methods: {
    watch() {
      if (this.cid) {
        this.$router.push("/live/" + this.cid + "/" + this.ch.Vid);
      } else this.$router.push("/play/" + this.ch.Vid);
    },
  },
};
</script>

<style></style>
