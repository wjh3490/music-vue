<template>
  <div
    class="circle"
    @click.stop="$emit('update:visibleAllLyric', false)"
    :class="{ rotateY: !visibleAllLyric }"
  >
    <div class="bgc" :class="[animationStatus, {animation_none: !visibleAllLyric}]">
      <img v-lazy="$store.getters.currrenSong.picUrl" class="bgc-img" alt />
    </div>
    <p class="currrent_lyric">{{ playingLyric }}</p>
    <div class="no-lyric" v-if="!currentLyric">暂无歌词</div>
  </div>
</template>

<script>
export default {
  name: 'PlayerCircle',
  props: {
    currentLyric: [Object, String],
    animationStatus: String,
    playingLyric: String,
    visibleAllLyric: Boolean,
  },
  updated() {
    console.log('circle')
  },

};
</script>
<style scoped lang="less">
@base: 37.5rem;

.circle {
  position: absolute;
  transition: all 1s;
  z-index: 1;
  backface-visibility: hidden;
  width: 100%;
  top: 50%;
  transform: translate(0, -65%) rotateY(0deg);
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
    &.animation_none {
      animation: none;
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
.rotateY {
  transform: translate(0, -65%) rotateY(180deg);
}
</style>
