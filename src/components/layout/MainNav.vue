<template>
  <v-app-bar
    :extension-height="mdAndUp || $route.name === 'play' ? 0 : 48"
    flat
  >
    <v-container class="d-flex align-center">
      <v-avatar class="hidden-xs mx-4" rounded="0" size="32">
        <v-img src="/icons/icon.svg" />
      </v-avatar>
      <v-app-bar-title style="flex: none" v-if="$route.name === 'play'">
        <b class="hidden-md-and-down">IPTV @ UESTC</b>
        <template v-if="$route.name === 'play'">
          <v-btn
            icon="mdi-arrow-left"
            class="hidden-sm-and-up"
            @click="$router.push('/')"
            variant="plain"
          ></v-btn>
          <span class="mx-2 hidden-md-and-down"> | </span
          >{{ getChannel($route.params.vid).Name }}
          <v-btn
            :icon="
              isFavorite($route.params.vid) ? 'mdi-star' : 'mdi-star-outline'
            "
            @click="
              isFavorite($route.params.vid)
                ? unsetFavorite($route.params.vid)
                : setFavorite($route.params.vid)
            "
            variant="plain"
          ></v-btn>
          <v-btn
            icon="mdi-playlist-play"
            class="hidden-xs"
            @click="$router.push('/')"
            variant="plain"
          ></v-btn>
        </template>
      </v-app-bar-title>
      <v-app-bar-title style="flex: none" v-else>
        <b>IPTV @ UESTC</b>
      </v-app-bar-title>

      <v-spacer />

      <SearchBarWrap />
      <div :class="$route.name === 'play' ? 'hidden-xs' : ''">
        <v-btn
          icon="mdi-theme-light-dark"
          @click="toggleTheme"
          variant="plain"
        ></v-btn>
        <v-btn
          v-if="$route.name === 'home'"
          :icon="
            getCompact()
              ? 'mdi-view-grid-outline'
              : 'mdi-format-list-bulleted-square'
          "
          @click="toggleCompact"
          variant="plain"
        ></v-btn>

        <DownloadPlaylist />
      </div>
    </v-container>
    <template v-slot:extension v-if="$route.name === 'home'">
      <v-slide-group
        :model-value="slideIdx"
        class="hidden-md-and-up"
        center-active
        show-arrows
      >
        <v-slide-group-item
          v-for="n in categoryList()"
          :key="n"
          v-slot="{ isSelected }"
        >
          <v-btn
            class="ma-2"
            rounded
            :color="isSelected ? 'primary' : undefined"
            v-scroll-to="{ el: '#playlist-' + n, offset: -114 }"
          >
            {{ n }}
          </v-btn>
        </v-slide-group-item>
      </v-slide-group>
    </template>
  </v-app-bar>
</template>

<script>
import { useTheme } from "vuetify";
import { channelStore } from "@/store/channel";
import { profileStore } from "@/store/profile";
import { playerStore } from "@/store/player";
import SearchBarWrap from "./SearchBarWrap.vue";
import DownloadPlaylist from "./DownloadPlaylist.vue";
import { useDisplay } from "vuetify";

export default {
  components: { SearchBarWrap, DownloadPlaylist },
  setup() {
    const theme = useTheme();
    const { mdAndUp } = useDisplay();
    let catList = channelStore().getCategoryList();
    if (profileStore().favorites.length) catList.unshift("收藏夹");
    return {
      getChannel: channelStore().getChannel,
      categoryList: channelStore().getCategoryList,
      isFavorite: profileStore().isFavorite,
      setFavorite: profileStore().setFavorite,
      getCompact: profileStore().getCompact,
      toggleCompact: profileStore().toggleCompact,
      unsetFavorite: profileStore().unsetFavorite,
      mdAndUp: mdAndUp,
      playerState: playerStore(),
      toggleTheme: () => {
        theme.global.name.value = theme.global.current.value.dark
          ? "light"
          : "dark";
        profileStore().$state.dark = theme.global.name.value;
      },
    };
  },
  computed: {
    slideIdx() {
      if (!this.playerState.selectedCat) return -1;
      //return 0;
      //console.log(this.categoryList.findIndex)
      return this.categoryList().findIndex(
        (v) => v == this.playerState.selectedCat
      );
    },
  },
};
</script>
