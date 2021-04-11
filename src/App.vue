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
export default {
  name: 'App',
  components: { Player },
};
</script>
<style scoped>
#app {
  font-size: 12px;
}
</style>
