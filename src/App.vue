<template>
  <div id="app" :class="{ padding75: playList.length > 0 }">
    <!-- <keep-alive> -->
    <router-view :key="$route.fullPath" />
    <!-- </keep-alive> -->
    <Player />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Player from './player';
export default {
  name: 'App',
  components: { Player },
  computed: {
    ...mapGetters(['playList', 'fullScreen']),
  },
  methods: {
    lock() {
      // document.addEventListener('touchstart', touch.start);
      // document.addEventListener(
      //   'touchmove',
      //   onTouchMove,
      //   supportsPassive ? { passive: false } : false
      // );
      // document.body.classList.add(parent-hidden);
    },
    unlock() {
      // document.removeEventListener('touchstart', touch.start);
      // document.removeEventListener('touchmove', onTouchMove);
      // document.body.classList.remove(parent-hidden);
    },
  },
  watch: {
    fullScreen(val) {
      if (val) {
        document.body.classList.add('parent-hidden');
      } else {
        document.body.classList.remove('parent-hidden');
      }
    },
  },
};
</script>
<style scoped>
#app {
  font-size: 12px;
}
</style>
