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
    fetch(import.meta.env.VITE_LIVE_API_ENDPOINT + "admin/list", {
      headers: {
        Authorization: `Bearer ${adminStore().token}`,
      },
    })
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
