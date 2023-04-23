<template>
  <v-container>
    <ChannelList :channels="channels" />
  </v-container>
</template>

<script>
import ChannelList from "@/components/admin/ChannelList.vue";
import { adminStore } from "@/store/admin";

export default {
  data: () => ({
    channels: [],
  }),
  mounted() {
    adminStore()
      .fetchData("admin/list")
      .then((res) => {
        return res.json();
      })
      .then((chs) => {
        if ("error" in chs) adminStore().login();
        else this.channels = chs;
      })
      .catch(() => {
        adminStore().login();
      });
  },
  components: { ChannelList },
};
</script>
