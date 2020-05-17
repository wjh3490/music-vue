<template>
  <div id="app">
    <header-title />
    <div class="nav">
      <ul>
        <router-link tag="li" :to="nav.to" v-for="nav in navs" :key="nav.name">
          <span>{{ nav.name }}</span>
        </router-link>
      </ul>
    </div>

  
      <keep-alive :include="['Recommend', 'Singer', 'Rank', 'Search']">
        <router-view :key="$route.path" class="app-router-view" />
      </keep-alive>
    
    <player />
  </div>
</template>

<script>
import 'vue-transition.css';
import HeaderTitle from './components/Header';
import Player from './player';
export default {
  name: 'App',
  components: {
    HeaderTitle,
    Player
  },
  data() {
    return {
      navs: [
        { name: '推荐', to: '/recomment' },
        { name: '排行榜', to: '/rank' },
        { name: '歌手', to: '/singer' },
        { name: '我', to: '/user' }
      ]
    };
  },
  // watch: {
  //   /*eslint-disable */
  //   $route: function(to, from) {
  //     console.log(to, from);
  //   }
  // }
};
</script>

<style lang="less" scoped>
// html,
// body,
// .app {
//
//   width: 100%;
//   height: 100%;
//   overflow: hidden;
// }
// #app {
//   background-color: #000;

// }

// #app .app-router-view {
//   position: absolute;
//   top: 116px;
//   left: 0;
//   bottom: 0;
//   right: 0;
//   overflow: hidden;
//   overflow-y: scroll;
//   backface-visibility: hidden;
//   transform: translate3d(0, 0, 0);
//   transform-style: preserve-3d;
//   visibility: visible;
// }
@base: 37.5rem;
#app {
  position: relative;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  // perspective: 1200px;
}

.router-link-active {
  span {
    border-bottom: 2 / @base solid #fff;
    color: #f1f1f1;
    font-weight: 700;
  }
}
.nav {
  position: sticky;
  top: 0;
  z-index: 3;
  padding-bottom: 1px;
  font-size: 16px;
  background: #169af3;
  margin-top: -1px;
  overflow: hidden;
  ul {
    display: flex;
    li {
      flex: 1;
      text-align: center;
      height: 44 / @base;
      line-height: 44 / @base;
      color: #f1f1f1;
      span {
        padding-bottom: 3 / @base;
      }
    }
  }
}
</style>
