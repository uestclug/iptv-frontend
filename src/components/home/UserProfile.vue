<template>
  <v-card
    class="my-2"
    rounded="lg"
    flat
    :title="'您好，' + profile().name"
    append-icon="mdi-account"
  />
</template>

<script setup>
import { profileStore } from "@/store/profile";

const profile = profileStore().getUserInfo;
</script>
