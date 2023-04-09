<template>
  <v-container class="text-center">
    <v-sheet class="my-6 py-6" rounded="lg">
      <v-row align="center">
        <v-col>
          <v-icon color="warning" size="128">mdi-alert</v-icon>
          <h1 class="display-2 primary--text">{{ error_obj.code }}</h1>

          <p>{{ error_obj.title }}</p>

          <v-btn class="my-4" to="/" color="warning" variant="outlined">
            返回主页
          </v-btn>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    errorobjs: {
      404: {
        code: 404,
        title: "您请求的资源不存在",
      },
    },
  }),
  computed: {
    error_obj() {
      if ("code" in this.$route.params)
        if (this.$route.params.code in this.errorobjs)
          return this.errorobjs[this.$route.params.code];
      return {
        code: "ERROR",
        title: "未知错误",
      };
    },
  },
};
</script>

<style></style>
