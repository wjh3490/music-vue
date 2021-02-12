<template>
  <div id="app" :class="{ padding75: playList.length > 0 }">
    <!-- <keep-alive> -->
      <router-view :key="$route.path" />
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
    ...mapGetters(['playList']),
  },
};
</script>
<style scoped>
#app {
  font-size: 12px;
}
</style>
