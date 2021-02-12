<template>
  <header class="normal-player-header">
    <div class="normal-player-header-title">
      <p class="ellipsis normal-player-header-song_name">
        {{ currrenSong.name }}
      </p>
      <span class="ellipsis normal-player-header-singer_name">{{
        currrenSong.singer
      }}</span>
    </div>
    <div class="normal-player-header-return" @click="setFullScreen(false)">
      <span class="iconfont icon-iconfont2 normal-player-header-icon"></span>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  name: 'PlayerTitle',
  computed: {
    ...mapGetters(['currrenSong']),
  },
  methods: {
    ...mapMutations(['setFullScreen']),
  },
};
</script>

<style scoped lang="less">
@base: 37.5rem;
.normal-player-header {
  position: relative;
  &-title {
    padding: 10 / @base 50 / @base 0 50 / @base;
    font-size: 0;
    color: #fff;
    text-align: center;
  }
  &-song_name {
    font-size: 20px;
    padding-bottom: 5 / @base;
  }
  &-singer_name {
    font-size: 14px;
  }
  &-return {
    position: absolute;
    left: 5 / @base;
    top: 5 / @base;
    width: 40 / @base;
    height: 40 / @base;
    line-height: 40 / @base;
    text-align: center;
    transform: rotate(270deg);
  }
  &-icon {
    font-size: 20px;
    color: #fff;
  }
}
</style>
