<template functional>
  <div class="mall-title">
    <div class="mall-title-left">
      <b>{{ props.title }}</b>
      <b class="iconfont icon-youjiantou" v-if="props.visible"></b>
    </div>
    <div class="mall-title-right">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: 'MallTitle',
  props: {
    title: {
      type: String,
      default: '',
    },
    visible: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
<style lang="less" scoped>
.mall-title {
  display: flex;
  padding: 0 15px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
  margin-top: 30px;
  &-left {
    font-size: 18px;
    display: flex;
    align-items: center;
  }
}
.icon-youjiantou {
  margin-left: 6px;
}
</style>
