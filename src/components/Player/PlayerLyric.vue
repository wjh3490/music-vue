<template>
  <div class="lyric">
    <div class="lyric-wrap">
      <p class="lyric-singer">
        <marquee behavior="" direction="">{{ currrenSong.name }}</marquee>
      </p>
      <p class="lyric-name">{{ currrenSong.singer }}</p>
    </div>
    <div class="lyric-item" ref="lyricList">
      <div class="empty" ref="empty"></div>
      <div class="no-lyric" v-if="!currentLyric">暂无歌词</div>
      <p
        ref="lyricLine"
        v-for="(key, value) in currentLyric"
        :key="value"
        :class="{ 'active-lyric': value == activeLyricIndex }"
      >
        {{ key }}
      </p>
      <div class="empty"></div>
    </div>
    <div class="pause-wrap">
      <i
        @click.stop="$emit('pause')"
        class="pause iconfont  control-icon"
        :class="palyStatus"
      ></i>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'PlayerLyric',
  props: {
    currentLyric: [Object, String],
    activeLyricIndex: String,
    palyStatus: String,
  },
  computed: {
    ...mapGetters(['currrenSong']),
  },
};
</script>
<style scoped lang="less">
.lyric-wrap {
  padding: 0 50px;
  color: #fff;
  .lyric-singer {
    font-size: 24px;
    color: #fff;
    font-weight: 700;
  }
  .lyric-name {
    color: rgba(225, 225, 225, 0.8);
    font-size: 16px;
    margin: 4px 0;
  }
}
.lyric {
  width: 100%;
  height: calc(100% - 30px);
  margin-top: 30px;
  width: 100%;
  position: relative;

  .lyric-item {
    height: 70%;
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    padding-right: 7px;
    box-sizing: content-box;
    transition: opacity 1s;
    -webkit-overflow-scrolling: touch;
    -webkit-mask-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.6) 15%,
      rgba(255, 255, 255, 1) 25%,
      rgba(255, 255, 255, 1) 75%,
      rgba(255, 255, 255, 0.6) 85%,
      rgba(255, 255, 255, 0) 100%
    );
    min-height: 250px;
    .empty {
      height: 80px;
    }

    p {
      font-size: 16px;
      padding: 8px 50px;
      text-align: left;
      color: rgba(225, 225, 225, 0.8);
      &.active-lyric {
        color: rgba(238, 238, 113, 0.75);
        font-weight: 700;
        opacity: 1;
        transition: all 0.2s;
        font-size: 20px;
        // transform: translate3d(25px, 0, 0) scale(1.2);
      }
    }
  }

  .no-lyric {
    line-height: 40px;
    font-size: 16px;
    color: #fff;
    text-align: center;
  }
}
.rotateY {
  transform: rotateY(180deg);
}
.visible {
  opacity: 0;
}
.pause {
  font-size: 18px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
  text-align: center;
  margin-right: 30px;
  color: rgba(255, 255, 255, 0.8);
  background-color: rgba(0, 0, 0, 0.25);
}
.pause-wrap {
  position: absolute;
  bottom: 20px;
  right: 0;
  text-align: right;
}
</style>
