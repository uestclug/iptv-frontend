<template>
  <v-card variant="tonal" rounded="lg" flat>
    <v-card-actions class="justify-center">
      <v-dialog v-model="dialog" width="auto">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" prepend-icon="mdi-plus" stacked
            >增加新频道</v-btn
          >
        </template>
        <v-card min-width="400px">
          <v-card-title>添加直播</v-card-title>
          <v-card-text>
            <v-text-field label="标题" v-model="create.title" />
            <v-text-field label="直播 ID (可选)" v-model="create.id" />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn :disabled="!canpost" @click="addLive" color="success"
              >创建</v-btn
            >
            <v-btn @click="dialog = false">取消</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<script>
import { adminStore } from "@/store/admin";

export default {
  data: () => ({
    dialog: false,
    create: {
      id: null,
      title: null,
    },
  }),
  computed: {
    canpost() {
      return !!this.create.title;
    },
  },
  methods: {
    addLive() {
      adminStore()
        .fetchData("admin/live", "POST", this.create)
        .then(() => {
          location.reload();
        });
    },
  },
};
</script>
