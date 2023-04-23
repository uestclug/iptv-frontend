<template>
  <v-app-bar :extension-height="mdAndUp || isVideoPage ? 0 : 48" flat>
    <v-container class="d-flex align-center">
      <v-avatar class="hidden-xs mx-4" rounded="0" size="32">
        <v-img src="/icons/icon.svg" />
      </v-avatar>
      <v-app-bar-title style="flex: none" v-if="isVideoPage">
        <b class="hidden-md-and-down">IPTV @ UESTC</b>
        <template v-if="isVideoPage">
          <v-btn
            icon="mdi-arrow-left"
            class="hidden-sm-and-up"
            @click="$router.push('/')"
            variant="plain"
          ></v-btn>
          <span class="mx-2 hidden-md-and-down"> | </span>
          {{
            isPlayPage
              ? getChannel($route.params.vid).Name
              : getLive($route.params.cid, $route.params.vid).Name
          }}
          <v-tooltip text="收藏" location="bottom" v-if="isPlayPage">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                :icon="
                  isFavorite($route.params.vid)
                    ? 'mdi-star'
                    : 'mdi-star-outline'
                "
                @click="
                  isFavorite($route.params.vid)
                    ? unsetFavorite($route.params.vid)
                    : setFavorite($route.params.vid)
                "
                variant="plain"
              ></v-btn>
            </template>
          </v-tooltip>

          <v-tooltip text="返回播放列表" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                icon="mdi-playlist-play"
                class="hidden-xs"
                @click="$router.push('/')"
                variant="plain"
              ></v-btn>
            </template>
          </v-tooltip>
        </template>
      </v-app-bar-title>
      <v-app-bar-title style="flex: none" v-else>
        <b>IPTV @ UESTC</b>
      </v-app-bar-title>

      <v-spacer />

      <SearchBarWrap />
      <div :class="isVideoPage ? 'hidden-xs' : ''">
        <v-tooltip text="切换主题" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon="mdi-theme-light-dark"
              @click="toggleTheme"
              variant="plain"
            ></v-btn>
          </template>
        </v-tooltip>
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
        <KeyboardHelp v-if="isVideoPage" />
        <DownloadPlaylist v-if="isPlayPage" />
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
        <v-slide-group-item
          v-for="n in liveCategoryList()"
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
import KeyboardHelp from "./KeyboardHelp.vue";
import { liveStore } from "@/store/live";

export default {
  components: { SearchBarWrap, DownloadPlaylist, KeyboardHelp },
  setup() {
    const theme = useTheme();
    const { mdAndUp } = useDisplay();
    let catList = channelStore().getCategoryList();
    if (profileStore().favorites.length) catList.unshift("收藏夹");
    return {
      getChannel: channelStore().getChannel,
      getLive: liveStore().getLive,
      categoryList: channelStore().getCategoryList,
      liveCategoryList: liveStore().getCategoryList,
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
    isVideoPage() {
      return this.$route.name === "play" || this.$route.name === "live";
    },
    isLivePage() {
      return this.$route.name === "live";
    },
    isPlayPage() {
      return this.$route.name === "play";
    },
    slideIdx() {
      if (!this.playerState.selectedCat) return -1;
      return this.categoryList().findIndex(
        (v) => v == this.playerState.selectedCat
      );
    },
  },
};
</script>
