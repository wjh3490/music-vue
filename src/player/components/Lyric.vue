<template>
  <div class="lyric" @click.stop="$emit('update:visibleAllLyric', true)">
    <div class="lyric-item" ref="lyricList">
      <div class="empty" ref="empty"></div>
      <div class="no-lyric" v-if="!currentLyric">暂无歌词</div>
      <!-- :class="{ yellow: value < parseInt(currentTime) }" -->
      <p
        ref="lyricLine"
        v-for="(key, value) in currentLyric"
        :key="value"
        :class="{'active-lyric' : value === activeLyricIndex }"
      >
        {{ key }}
      </p>
      <div class="empty"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Lyric',
  props: {
    currentLyric: [Object, String],
    activeLyricIndex: String
  }
};
</script>
<style scoped lang="less">
@base: 37.5rem;

.lyric {
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translate3d(0, -65%, 0);
  height: 400 / @base;
  left: 0;
  // background-color: pink;
  width: 100%;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.6) 15%,
    rgba(255, 255, 255, 1) 25%,
    rgba(255, 255, 255, 1) 75%,
    rgba(255, 255, 255, 0.6) 85%,
    rgba(255, 255, 255, 0) 100%
  );
  .lyric-item {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    padding-right: 7 / @base;
    box-sizing: content-box;
    .empty {
      height: 150 / @base;
    }

    p {
      font-size: 14px;
      padding: 8 / @base 50 / @base;
      text-align: center;
      color: rgba(225, 225, 225, 0.8);
      &.active-lyric {
        color: #eeee71;
        opacity: 1;
      }
    }
  }

  .no-lyric {
    font-size: 16px;
    color: #fff;
    text-align: center;
  }
}
//  <transition name="fade1">
//       <div
//         class="circle"
//         v-show="showBgc"
//         @click.stop="$emit('update:showBgc', false)"
//       >
//         <div class="bgc" :class="animationStatus">
//           <img v-lazy="$store.getters.currrenSong.picUrl" alt />
//         </div>
//         <p class="currrent_lyric">{{ playingLyric }}</p>
//         <div class="no-lyric" v-if="!currentLyric">暂无歌词</div>
//       </div>
//     </transition>
</style>
