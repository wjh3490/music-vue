<template functional>
  <div class="home-title-wrap">
    <slot>
      <strong class="home-title-name">{{ props.title }}</strong>
    </slot>
    <router-link :to="props.link" class="home-title-more">
      <slot name="more">
        <span>{{ props.more }}</span>
      </slot>
      <span class="iconfont icon-youjiantou"></span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'HomeMore',
  props: {
    title: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '',
    },
    more: {
      type: String,
      default: '更多',
    },
  },
};
</script>
<style scoped lang="less">
.home-title {
  &-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 15px;
  }
  &-name {
    font-size: 18px;
  }
  &-more {
    padding: 2px 10px;
    border-radius: 20px;
    border: 1px solid #ccc;
    color: #333;
    font-size: 14px;
  }
}
.icon-youjiantou {
  font-size: 12px;
}
</style>
