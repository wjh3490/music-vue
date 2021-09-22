<template>
  <div class="head-nav" :class="{ isFixed }" :style="{ color, background, opacity }">
    <span class="iconfont icon-iconfont2 head-nav-left" @click="$router.back()"></span>
    <div class="head-nav-middle ellipsis">
      <slot>
        <b>{{ title }}</b>
      </slot>
    </div>
    <span class="head-nav-right">
      <slot name="right" />
    </span>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'GHeadNav',
  props: {
    isFixed: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    background: {
      type: String,
      default: '#fff',
    },
    opacity: {
      type: Number,
      default: 1,
    },
    color: {
      type: String,
      default: '',
    },
  },
});
</script>

<style scoped lang="less">
.isFixed {
  position: fixed;
  top: 0;
  left: 0;
}
.head-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5rem;
  line-height: 5rem;
  width: 100%;
  z-index: 99;
  color: #000;
  overflow: hidden;
  &-left,
  &-right {
    height: 100%;
    width: 5rem;
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
