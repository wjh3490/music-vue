<template>
  <div class="return" @click="$router.back()">
    <span class="iconfont icon-iconfont2"></span>
    <slot />
  </div>
</template>

<style scoped lang='less'>
@base: 37.5rem;
.return {
  position: absolute;
  left: 10 / @base;
  top: 50%;
  transform: translateY(-50%);
  z-index: 9;
  span {
    font-size: 20px;
    color: #fff;
  }
}
</style>
