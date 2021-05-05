<template>
  <div id="app">
    <router-view :key="$route.fullPath" />
    <Player />
    <PlaySongs />
    <Audio />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Player from './player';
import PlaySongs from '@/components/PlaySongs';
import Audio from '@/components/Audio';
export default {
  name: 'App',
  components: { Audio, Player, PlaySongs },
  computed: { ...mapGetters(['lockScroll']) },
  mounted() {
    this.body = document.body;
  },
  watch: {
    lockScroll(val) {
      if (val == 0) {
        this.body.classList.remove('lock-scroll');
      } else {
        if (!this.body.classList.contains('lock-scroll')) {
          this.body.classList.add('lock-scroll');
        }
      }
    },
  },
};
</script>
<style>
.lock-scroll {
  overflow: hidden !important;
}
</style>

<style scoped>
#app {
  font-size: 12px;
}
</style>
