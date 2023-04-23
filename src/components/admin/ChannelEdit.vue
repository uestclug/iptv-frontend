<template>
  <v-card rounded="lg" flat>
    <v-card-title>
      <v-icon icon="mdi-broadcast" start />{{ ch.title }}
      <v-chip
        class="mx-1"
        label
        v-if="ch.visible"
        color="success"
        text="公开可见"
      />
      <v-chip
        class="mx-1"
        label
        :color="ch.enabled ? 'info' : 'red'"
        :text="ch.enabled ? '已启用' : '已禁用'"
      />
    </v-card-title>
    <v-card-text>
      <v-text-field
        class="my-1"
        density="compact"
        readonly
        label="串流名称"
        hide-details
        :model-value="ch.id"
        type="text"
      >
      </v-text-field>
      <v-text-field
        class="my-1"
        density="compact"
        label="串流地址"
        readonly
        hide-details
        :model-value="
          'rtmp://server/live?token=' + (showToken ? ch.token : '[REDACTED]')
        "
        :append-icon="showToken ? 'mdi-eye-off' : 'mdi-eye'"
        type="text"
        @click:append="showToken = !showToken"
      >
      </v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-dialog v-model="dialog.regen" width="auto">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            icon="mdi-reload"
            color="warning"
            variant="flat"
            rounded="lg"
          />
        </template>
        <v-card
          title="重置直播密钥"
          :subtitle="`您将要重置直播[${ch.title}]的密钥，真的要这样做吗？`"
        >
          <v-card-actions>
            <v-spacer />
            <v-btn @click="regenLive" color="warning">是的</v-btn>
            <v-btn @click="dialog.regen = false">不是</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn icon="mdi-eye-off" color="success" variant="flat" rounded="lg" />
      <v-btn
        icon="mdi-broadcast-off"
        color="info"
        variant="flat"
        rounded="lg"
      />
      <v-dialog v-model="dialog.delete" width="auto">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            icon="mdi-delete"
            color="red"
            variant="flat"
            rounded="lg"
          />
        </template>
        <v-card
          title="删除直播"
          :subtitle="`您将要删除直播[${ch.title}]，真的要这样做吗？`"
        >
          <v-card-actions>
            <v-spacer />
            <v-btn @click="deleteLive" color="red">是的</v-btn>
            <v-btn @click="dialog.delete = false">不是</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<script>
import { adminStore } from "@/store/admin";

export default {
  props: ["ch"],
  data: () => ({
    showToken: false,
    dialog: {
      delete: false,
      regen: false,
    },
  }),
  methods: {
    regenLive() {
      adminStore()
        .fetchData("admin/live/refresh", "POST", {
          id: this.ch.id,
        })
        .then(() => {
          location.reload();
        });
    },
    deleteLive() {
      adminStore()
        .fetchData("admin/live", "DELETE", {
          id: this.ch.id,
        })
        .then(() => {
          location.reload();
        });
    },
  },
};
</script>
