<template>
  <router-view :key="$route.fullPath" />
  <div v-show="!!playList.length">
    <normal-player v-show="fullScreen" />
    <mini-player v-show="!fullScreen" />
  </div>

  <!-- <PlaySongs /> -->
  <vue-audio />
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from 'vuex';
import Player from './player/index.vue';
import NormalPlayer from '@/components/Player/NormalPlayer.vue';
import MiniPlayer from '@/components/Player/MiniPlayer.vue';
// import PlaySongs from '@/components/PlaySongs.vue';
import VueAudio from '@/components/Audio/index.vue';

export default defineComponent({
  name: 'App',
  components: { VueAudio, Player, NormalPlayer, MiniPlayer },
  setup() {
    const store = useStore();
    const fullScreen = computed(() => store.state.fullScreen);
    const playList = computed(() => store.state.playList);

    return {
      fullScreen,
      playList,
    }
  }
})
</script>


