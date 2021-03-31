<template>
  <div id="app">
    <keep-alive :include="['Singers']">
      <router-view :key="$route.fullPath" />
    </keep-alive>
    <Player />
  </div>
</template>

<script>
import Player from './player';
import axios from 'axios';
export default {
  name: 'App',
  components: { Player },
  created() {
    // axios.get('https://netease-cloud-music-api-gilt.vercel.app/playlist/detail/dynamic?id=2884035'); //
    axios.get('https://netease-cloud-music-api-gilt.vercel.app/artist/desc?id=5781'); //
    axios.get('https://netease-cloud-music-api-gilt.vercel.app/artist/detail?id=5781'); //
  },
};
</script>
<style scoped>
#app {
  font-size: 12px;
}
</style>
