<template>
  <router-view :key="$route.fullPath" />
  <div v-show="!!playList.length">
    <normal-player />
    <mini-player />
  </div>
  <vue-audio />
  <song-list />
</template>
<script lang="ts">
import { defineComponent, computed, watch } from 'vue'
import { useStore } from 'vuex';
import NormalPlayer from '@/components/Player/NormalPlayer.vue';
import MiniPlayer from '@/components/Player/MiniPlayer.vue';
import VueAudio from '@/components/Audio/index.vue';
import SongList from '@/components/SongList/index.vue';

export default defineComponent({
  name: 'App',
  components: { VueAudio, NormalPlayer, MiniPlayer, SongList },
  setup() {
    const store = useStore();
    const playList = computed(() => store.state.playList);
    let flag: boolean = true;
    const body: any = document.body;
    let scrollTop = 0;
    
    watch(() => store.state.lockScroll, (val) => {
      if (flag) {
        scrollTop = body.scrollTop || document.documentElement.scrollTop;
        flag = false;
      }
      if (val === 0) {
        body.classList.remove('lock-scroll');
        body.style.top = 0;
        document.documentElement.scrollTop = scrollTop
        flag = true;
      } else {
        if (!body.classList.contains('lock-scroll')) {
          body.style.top = -scrollTop + 'px';
          body.classList.add('lock-scroll');
        }
      }
    })
    return {
      playList,
    }
  }
})
</script>
