<template>
  <v-row>
    <v-col cols="12" lg="6" v-for="ch in channels" :key="ch.id">
      <ChannelEdit :ch="ch" />
    </v-col>
    <v-col cols="12" lg="6">
      <ChannelAdd />
    </v-col>
  </v-row>
</template>

<script>
import ChannelEdit from "./ChannelEdit.vue";
import ChannelAdd from "./ChannelAdd.vue";
export default {
  components: { ChannelEdit, ChannelAdd },
  props: ["channels"],
};
</script>
