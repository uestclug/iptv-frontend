<template>
  <v-autocomplete
    hide-details
    v-model="channel"
    :items="getChannels()"
    prepend-inner-icon="mdi-magnify"
    :density="mobile ? 'comfortable' : 'compact'"
    item-title="Name"
    item-value="Vid"
    @update:model-value="watch"
    label="搜索..."
  >
    <template v-slot:item="{ props, item }">
      <v-list-item
        @click="watch(item?.raw?.Vid)"
        v-bind="props"
        :title="item?.raw?.Name"
        :subtitle="item?.raw?.Vid"
      ></v-list-item>
    </template>
  </v-autocomplete>
</template>

<script>
import { channelStore } from "@/store/channel";
export default {
  props: ["mobile"],
  methods: {
    watch(vid) {
      this.channel = null;
      this.$router.push("/play/" + vid);
    },
  },
  data: () => ({
    channel: null,
    getChannels: channelStore().getChannelList,
  }),
};
</script>

<style></style>
