<template>
  <div class="return" :class="{ isFixed }" :style="{ background }">
    <span
      class="iconfont icon-iconfont2 return-left"
      @click="$router.back()"
    ></span>
    <div class="return-middle">
      <slot />
    </div>
    <span class="return-right">
      <slot name="right" />
    </span>
  </div>
</template>
<script>
export default {
  name: 'BaseBack',
  props: {
    isFixed: {
      type: Boolean,
      default: false,
    },
    background: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped lang="less">
.isFixed {
  position: fixed;
  position: fixed;
  top: 0;
  left: 0;
}
.return {
  display: flex;
  justify-content: space-between;
  height: 50px;
  line-height: 50px;
  width: 100%;
  z-index: 1;
  &-left,
  &-right {
    height: 100%;
    width: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
  }
  &-middle {
    flex: 1;
  }
}
</style>
