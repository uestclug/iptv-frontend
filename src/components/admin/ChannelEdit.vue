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
      <v-btn icon="mdi-reload" color="warning" variant="flat" rounded="lg" />
      <v-btn icon="mdi-eye-off" color="success" variant="flat" rounded="lg" />
      <v-btn
        icon="mdi-broadcast-off"
        color="info"
        variant="flat"
        rounded="lg"
      />
      <v-btn icon="mdi-delete" color="red" variant="flat" rounded="lg" />
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["ch"],
  data: () => ({
    showToken: false,
  }),
};
</script>
