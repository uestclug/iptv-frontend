<template>
  <v-dialog width="auto">
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-keyboard-outline" variant="plain" v-bind="props"></v-btn>
    </template>
    <v-card
      max-width="800px"
      title="按键操作"
      subtitle="您可以在视频播放界面按下对应按键以快捷执行操作。"
    >
      <v-card-text>
        <v-table>
          <thead>
            <tr>
              <th class="text-left">按键</th>
              <th class="text-left">功能</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="k in keys" :key="k.keyname">
              <td>
                <code>{{ k.keyname }}</code>
              </td>
              <td>{{ k.funct }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
const keys = [
  {
    keyname: "方向键上/下",
    funct: "切换频道",
  },
  {
    keyname: "方向键左/右",
    funct: "调整音量",
  },
  {
    keyname: "m",
    funct: "静音",
  },
];
</script>

<style></style>
