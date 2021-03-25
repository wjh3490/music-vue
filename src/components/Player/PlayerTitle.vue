<template>
  <header class="normal-player-header">
    <div class="normal-player-header-return" @click="setFullScreen(false)">
      <span class="iconfont icon-iconfont2 normal-player-header-icon"></span>
    </div>
    <div class="normal-player-header-control">
      <span @click="$emit('slide', 0)" :class="{ activeIndex: index == 0 }"
        >歌曲</span
      >
      <span class="normal-player-header-line">|</span>
      <span @click="$emit('slide', 1)" :class="{ activeIndex: index == 1 }"
        >歌词</span
      >
    </div>
  </header>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  name: 'PlayerTitle',
  props: {
    index: {
      default: 0,
    },
  },
  computed: {
    ...mapGetters(['currrenSong']),
  },
  methods: {
    ...mapMutations(['setFullScreen']),
  },
};
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
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    .activeIndex {
      color: #fff;
      font-size: 20px;
    }
  }
  &-return {
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    transform: rotate(270deg);
  }
  &-icon {
    font-size: 20px;
    color: #fff;
  }
  &-line {
    margin: 0 7px;
    height: 12px;
    overflow: hidden;
  }
}
</style>
