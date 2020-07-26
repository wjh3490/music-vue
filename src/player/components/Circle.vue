<template>
  <div class="circle" @click.stop="$emit('update:visibleAllLyric', false)">
    <div class="bgc" :class="animationStatus">
      <img v-lazy="$store.getters.currrenSong.picUrl" class="bgc-img" alt />
    </div>
    <p class="currrent_lyric">{{ playingLyric }}</p>
    <div class="no-lyric" v-if="!currentLyric">暂无歌词</div>
  </div>
</template>

<script>
export default {
  name: 'CircleLyric',
  props: {
    currentLyric: [Object, String],
    animationStatus: String,
    playingLyric: String
  }
};
</script>
<style scoped lang="less">
@base: 37.5rem;
.circle {
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translate3d(0, -65%, 0);
  height: 400 / @base;
  left: 0;
  font-size: 0;
  .currrent_lyric {
    font-size: 14px;
    color: #eeee71;
    text-align: center;
    margin-top: 30 / @base;
    padding: 0 50 / @base;
  }
  .bgc {
    width: 300 / @base;
    height: 300 / @base;
    margin: 0 auto;
    margin-top: 50 / @base;
    border: 10 / @base solid rgba(0, 0, 0, 0.25);
    border-radius: 50%;
    overflow: hidden;
    animation: move 20s linear infinite;
    &.animation_pause {
      animation-play-state: paused;
    }
    .bgc-img {
      height: 100%;
      border-radius: 50%;
    }
  }
  .no-lyric {
    font-size: 14px;
    color: #fff;
    text-align: center;
  }
}
</style>
