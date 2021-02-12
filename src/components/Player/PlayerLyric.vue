<template>
  <div
    class="lyric"
    @click.stop="$emit('update:visibleAllLyric', true)"
    :class="{ rotateY: !visibleAllLyric }"
  >
    <div
      class="lyric-item"
      ref="lyricList"
      :class="{ visible: visibleAllLyric }"
    >
      <div class="empty" ref="empty"></div>
      <div class="no-lyric" v-if="!currentLyric">暂无歌词</div>
      <!-- :class="{ yellow: value < parseInt(currentTime) }" -->
      <p
        ref="lyricLine"
        v-for="(key, value) in currentLyric"
        :key="value"
        :class="{ 'active-lyric': value === activeLyricIndex }"
      >
        {{ key }}
      </p>
      <div class="empty"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayerLyric',
  props: {
    currentLyric: [Object, String],
    activeLyricIndex: String,
    visibleAllLyric: Boolean,
  },
    updated() {
    console.log('PlayerLyric')
  },
};
</script>
<style scoped lang="less">
@base: 37.5rem;

.lyric {
  position: absolute;
  transition: all 1s;

  width: 100%;
  top: 50%;
  transform: translate(0, -65%) rotateY(0deg);
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
    transform: rotateY(180deg);
    transition: opacity 1s;
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
        transition: all 0.2s;
        transform: scale(1.2);
      }
    }
  }

  .no-lyric {
    font-size: 16px;
    color: #fff;
    text-align: center;
  }
}
.rotateY {
  transform: translate(0, -65%) rotateY(180deg);
}
.visible {
  opacity: 0;
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
