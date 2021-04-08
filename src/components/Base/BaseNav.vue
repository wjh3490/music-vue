<template functional>
  <nav class="nav-conainer">
    <router-link
      :to="item.to"
      v-for="item in props.navList"
      :key="item.name"
      class="nav-item"
    >
      <span class="iconfont nav-icon" :class="item.icon"></span>
      <span class="nav-name">{{ item.name }}</span>
    </router-link>
  </nav>
</template>

<script>
export default {
  name: 'BaseNav',
  props: {
    navList: {
      type: Array,
      default: () => [
        { icon: 'icon-portrait', name: '歌手', to: '/singer' },
        { icon: 'icon-paiming', name: '排行榜', to: '/rank' },
        { icon: 'icon-fenlei', name: '歌单', to: '/playlist' },
        { icon: 'icon-fenlei', name: '推荐1', to: '/user' },
        { icon: 'icon-fenlei', name: '推荐2', to: '/user' },
      ],
    },
  },
};
</script>

<style lang="less" scoped>
@base: 37.5rem;

.nav-conainer {
  display: flex;
  font-size: 16px;
  margin-top: 20px;
  overflow: hidden;
  .nav-item {
    flex: 1;
    text-align: center;
    color: rgba(22, 154, 243, 0.85);
  }
  .nav-icon {
    font-size: 24px;
  }
  .nav-name {
    display: block;
    font-size: 13px;
    color: #000;
    margin-top:6px;
  }
}
</style>
