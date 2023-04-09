<template>
  <v-container class="d-flex align-center">
    <v-row>
      <v-col cols="12" sm="12" md="4" lg="4" xl="3" xxl="2">
        <div style="position: sticky; top: 88px">
          <SiteMotd />
          <ChannelNav class="hidden-sm-and-down" />
          <MainFooter class="hidden-sm-and-down" />
        </div>
      </v-col>
      <v-col>
        <ChannelPreviewGrid />
      </v-col>
      <v-col cols="12" class="hidden-md-and-up">
        <MainFooter />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import ChannelNav from "@/components/home/ChannelNav.vue";
import ChannelPreviewGrid from "@/components/home/ChannelPreviewGrid.vue";
import MainFooter from "@/components/home/MainFooter.vue";
import SiteMotd from "@/components/home/SiteMotd.vue";
</script>
