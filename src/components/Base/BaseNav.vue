<template functional>
  <ul class="nav-conainer">
    <router-link
      :to="nav.to"
      v-for="nav in props.navList"
      :key="nav.name"
      class="nav-item"
    >
      <span>{{ nav.name }}</span>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: 'BaseNav',
  props: {
    navList: {
      type: Array,
      default: () => [
        { name: '推荐', to: '/recommend' },
        { name: '排行榜', to: '/rank' },
        { name: '歌手', to: '/singers' },
        { name: '我', to: '/user' },
      ],
    },
  },
};
</script>

<style lang="less" scoped>
@base: 37.5rem;

.nav-conainer {
  position: sticky;
  top: 0;
  display: flex;
  z-index: 3;
  padding-bottom: 1px;
  font-size: 16px;
  background: #169af3;
  margin-top: -1px;
  overflow: hidden;
  .nav-item {
    flex: 1;
    text-align: center;
    height: 44px;
    line-height: 44px;
    color: #f1f1f1;
    span {
      padding-bottom: 3px;
    }
  }
}
.router-link-active {
  span {
    border-bottom: 2px solid #fff;
    color: #f1f1f1;
    font-weight: 700;
  }
}
</style>
