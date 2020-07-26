<template>
  <div id="app">
    <router-view  />
    <player />
  </div>
</template>

<script>
import Player from './player';
export default {
  name: 'App',
  components: { Player }
};
</script>

<style scoped>
#app {
  height: 100%;
}
</style>
