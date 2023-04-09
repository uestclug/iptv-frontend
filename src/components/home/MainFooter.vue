<template>
  <div class="text-center">
    <v-footer rounded="lg" class="my-2 justify-center">
      <v-card-subtitle>
        Powered by UESTC LUG &copy; {{ new Date().getFullYear() }}
        <br />
        感谢北邮人提供视频源
      </v-card-subtitle>
    </v-footer>
    <v-card-subtitle> IP: {{ ip }} </v-card-subtitle>
    <v-btn
      icon="mdi-github"
      href="https://github.com/UESTClug"
      variant="plain"
    ></v-btn>
    <v-btn
      icon="mdi-email"
      variant="plain"
      href="mailto:iptv@uestclug.org"
    ></v-btn>
  </div>
</template>

<script>
export default {
  data: () => ({ ip: "获取中..." }),
  mounted() {
    fetch("https://iptv.uestc.edu.cn/ip/")
      .then((res) => {
        return res.text();
      })
      .then((ipr) => {
        this.ip = ipr;
      })
      .catch(() => {
        this.ip = "未知";
      });
  },
};
</script>

<style></style>
