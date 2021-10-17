<template>
  <header class="normal-player-header">
    <div class="normal-player-header-return" @click="handleFullScreen">
      <span class="iconfont icon-iconfont2 normal-player-header-icon"></span>
    </div>
    <div class="normal-player-header-control">
      <span @click="$emit('slide', 0)" :class="{ activeIndex: index === 0 }">推荐</span>
      <span class="normal-player-header-line"></span>
      <span @click="$emit('slide', 1)" :class="{ activeIndex: index === 1 }">歌曲</span>
      <span class="normal-player-header-line"></span>
      <span @click="$emit('slide', 2)" :class="{ activeIndex: index === 2 }">歌词</span>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
export default defineComponent({
  name: 'PlayerTabs',
  props: {
    index: {
      type: Number,
      default: 1,
    },
  },
  emits: ['slide'],
  setup() {
    const store = useStore();
    const handleFullScreen = () => {
      store.commit('setlockScroll', -1)
      store.commit('setFullScreen', false)
    };
    return {
      handleFullScreen
    }
  },
});
</script>

<style scoped lang="less">
.normal-player-header {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &-control {
    flex: 1;
    color: rgba(225, 225, 225, 0.8);
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    .activeIndex {
      color: #fff;
    }
  }
  &-return {
    width: 4rem;
    height: 4rem;
    line-height: 4rem;
    text-align: center;
    transform: rotate(270deg);
  }
  &-icon {
    font-size: 20px;
    color: #fff;
  }
  &-line {
    margin: 0 0.7rem;
    height: 0.6rem;
    width: 0.1rem;
    overflow: hidden;
    background-color: rgba(225, 225, 225, 0.8);
  }
}
</style>
