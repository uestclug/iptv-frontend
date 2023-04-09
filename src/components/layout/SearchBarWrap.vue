<template>
  <v-responsive max-width="260" class="hidden-sm-and-down mx-4">
    <SearchBar :mobile="false" />
  </v-responsive>
  <v-menu
    class="hidden-md-and-up"
    v-model="searchPopup"
    :close-on-content-click="false"
    location="bottom"
    width="100%"
  >
    <template v-slot:activator="{ props }">
      <v-btn
        class="hidden-md-and-up"
        icon="mdi-magnify"
        @click="toggleSearch"
        variant="plain"
        v-bind="props"
      ></v-btn>
    </template>

    <v-card>
      <SearchBar :mobile="true" />
    </v-card>
  </v-menu>
</template>

<script>
import SearchBar from "./SearchBar.vue";

export default {
  components: { SearchBar },
  data: () => ({ searchPopup: false }),
  methods: {
    toggleSearch() {
      this.searchPopup = !this.searchPopup;
    },
  },
};
</script>

<style></style>
