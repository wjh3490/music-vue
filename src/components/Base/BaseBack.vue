<template>
  <div
    class="return"
    :class="{ isFixed }"
    :style="{ color, background, opacity }"
   
  >
    <span
      class="iconfont icon-iconfont2 return-left"
      @click="$router.back()"
    ></span>
    <div class="return-middle ellipsis">
      <b>{{ title }}</b>
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
      default: true,
    },
    title: String,
    background: {
      type: String,
      default: '#fff',
    },
    opacity: {
      type: Number,
      default: 1,
    },
    color: String,
    
  },
};
</script>

<style scoped lang="less">
.isFixed {
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
  z-index: 99;
  color: #000;
  overflow: hidden;
  &-left,
  &-right {
    height: 100%;
    width: 50px;
    text-align: center;
    font-size: 20px;
  }
  &-middle {
    flex: 1;
    text-align: center;
    font-size: 18px;
  }
}
</style>
