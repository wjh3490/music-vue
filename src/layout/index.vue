<template>
  <div class="layout-container">
    <header-title />
    <div class="nav">
      <ul class="nav-conainer">
        <router-link tag="li" :to="nav.to" v-for="nav in navs" :key="nav.name" class="nav-item">
          <span>{{ nav.name }}</span>
        </router-link>
      </ul>
    </div>

  
      <keep-alive>
        <router-view :key="$route.path" class="app-router-view" />
      </keep-alive>
    
   
  </div>
</template>

<script>
import HeaderTitle from '@/components/Header';

export default {
  name: 'Layout',
  components: {
    HeaderTitle
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
  }
};
</script>

<style lang="less" scoped>
@base: 37.5rem;
.layout-container {
  position: relative;
  height: 100%;
  min-height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
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
  .nav-conainer {
    display: flex;
    .nav-item {
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
