<template>
  <v-autocomplete
    hide-details
    v-model="channel"
    :items="getChannels()"
    return-object
    prepend-inner-icon="mdi-magnify"
    :density="mobile ? 'comfortable' : 'compact'"
    item-title="Name"
    @update:model-value="watch"
    label="搜索..."
  >
    <template v-slot:item="{ props, item }">
      <v-list-item
        @click="watch(item?.raw)"
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
    watch(ch) {
      this.channel = null;
      this.$router.push("/play/" + this.getChannelLink(ch.Vid));
    },
  },
  data: () => ({
    channel: null,
    getChannels: channelStore().getChannelList,
    getChannelLink: channelStore().getChannelLink,
  }),
};
</script>

<style></style>
