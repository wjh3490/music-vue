<template>
  <!-- <div class="player" v-show="playList.length > 0"> -->
    <normal-player v-show="fullScreen" />
    <!-- <mini-player v-show="!fullScreen" /> -->
  <!-- </div> -->
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import NormalPlayer from '@/components/Player/NormalPlayer.vue';
import MiniPlayer from '@/components/Player/MiniPlayer.vue';
import { useStore } from 'vuex';
export default defineComponent({
  name: 'Player',
  components: {
    MiniPlayer,
    NormalPlayer,
  },
  setup() {
    const store = useStore();
    const fullScreen = computed(() => store.getters.fullScreen);
    const playList = computed(() => store.getters.playList);
    return {
      fullScreen,
      playList
    }
  }
});
</script>
