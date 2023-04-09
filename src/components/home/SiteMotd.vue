<template>
  <v-card
    class="my-2"
    rounded="lg"
    flat
    append-icon="mdi-bullhorn"
    title="公告"
    :text="motd"
  >
  </v-card>
</template>

<script>
export default {
  data: () => ({
    motd: "公告获取中...",
  }),
  mounted() {
    fetch("/motd.txt")
      .then((res) => {
        return res.text();
      })
      .then((t) => {
        this.motd = t;
      })
      .catch(() => {
        this.motd = "公告获取失败。";
      });
  },
};
</script>

<style></style>
