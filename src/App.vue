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
  data() {
    return {
      y: 0,
      flag: true,
    };
  },
  computed: { ...mapGetters(['lockScroll']) },
  mounted() {
    this.body = document.body;
  },
  created(){console.log(88888888)},
  watch: {
    lockScroll(val) {
      if (this.flag) {
        this.y = document.body.scrollTop || document.documentElement.scrollTop;
        this.flag = false;
      }
      if (val == 0) {
        this.body.classList.remove('lock-scroll');
        this.body.style.top = 0;
        document.documentElement.scrollTop = this.y;
        this.flag = true;
      } else {
        if (!this.body.classList.contains('lock-scroll')) {
          this.body.style.top = -this.y + 'px';
          this.body.classList.add('lock-scroll');
          
        }
      }
    },
  },
};
</script>
<style>
.lock-scroll {
  position: fixed;
  left: 0;
  width: 100%;
}
</style>

<style scoped>
#app {
  font-size: 12px;
}
</style>
