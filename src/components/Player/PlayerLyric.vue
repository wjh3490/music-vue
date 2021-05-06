<template>
  <div class="lyric">
    <div class="lyric-wrap">
      <p class="lyric-singer">
        <marquee behavior="" direction="">{{ currrenSong.name }}</marquee>
      </p>
      <p class="lyric-name">{{ currrenSong.artists }}</p>
    </div>
    <div class="lyric-item" ref="lyricList">
      <div class="empty1" ref="empty"></div>
      <div class="no-lyric" v-if="!lyricKeys.length">暂无歌词</div>
      <div
        ref="lyricLine"
        v-for="(key, value) in currentLyric"
        :key="value"
        class="lyrics"
      >
        <p :class="{ 'active-lyric': value == activeLyricIndex }">
          {{ key['lyric'] }}
        </p>
        <p v-if="key['tlyric']">{{ key['tlyric'] }}</p>
      </div>

      <div class="empty"></div>
    </div>
    <div class="pause-wrap" @click.stop="setPlaying(!playing)">
      <i
        class="pause iconfont  control-icon"
        :class="playing ? 'icon-zanting11' : 'icon-bofang'"
      ></i>
    </div>
  </div>
</template>

<script>
import { scrollToEase, scrollToSmooth } from '@/utils/index.js';
import { mapGetters, mapMutations } from 'vuex';
export default {
  name: 'PlayerLyric',
  computed: {
    ...mapGetters([
      'currentTime',
      'currrenSong',
      'playing',
      'fullScreen',
      'currentLyric',
      'lyricKeys',
      'LyricScrollY',
      'debounce',
      'activeLyricIndex',
    ]),
  },
  watch: {
    currentTime(val) {
      if (!this.lyricKeys.length) return;
      if (!this.fullScreen) return;
      if (this.lyricKeys[this.LyricScrollY] > Math.floor(val)) {
        if (this.debounce) {
          this.setActiveLyricIndex(this.lyricKeys[this.LyricScrollY - 1]);
          this.scrollAnimate(this.LyricScrollY);
          this.setDebounce(false);
        }
        return;
      }
      let filterLyric = [];
      filterLyric = this.lyricKeys.filter((item) => item <= Math.floor(val));
      this.setLyricScrollY(filterLyric.length);
      this.setActiveLyricIndex(filterLyric.pop());
      this.scrollAnimate(this.LyricScrollY);
    },
  },
  mounted() {
    this.el = this.$refs.lyricList;
  },
  methods: {
    scrollAnimate() {
      this.$nextTick(() => {
        const activeLyric = document.querySelector('.active-lyric');
        if (!activeLyric) return;
        const start = this.el.scrollTop;
        const { offsetTop, offsetHeight } = activeLyric;
        scrollToEase(this.el, start, offsetTop - 100 - offsetHeight);
      });
    },
    scrollToSmooth() {
      scrollToSmooth(this.el, 0);
    },
    ...mapMutations([
      'setActiveLyricIndex',
      'setDebounce',
      'setLyricScrollY',
      'setPlaying',
      'setDebounce',
    ]),
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
  height: calc(100% - 26px);
  margin-top: 26px;
  width: 100%;
  position: relative;

  .lyric-item {
    height: 65%;
    width: 100%;
    margin-top: 16px;
    overflow-x: hidden;
    overflow-y: scroll;
    padding-right: 7px;
    box-sizing: content-box;
    transition: opacity 1s;
    -webkit-overflow-scrolling: touch;
    -webkit-mask-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.6) 10%,
      rgba(255, 255, 255, 1) 20%,
      rgba(255, 255, 255, 1) 75%,
      rgba(255, 255, 255, 0.6) 85%,
      rgba(255, 255, 255, 0) 100%
    );
    min-height: 250px;
    .empty {
      height: 80px;
    }
    .empty1 {
      height: 40px;
    }
    p {
      padding: 4px 23px;
      transition: font-size 0.3s;
      &.active-lyric {
        color: rgba(238, 238, 113, 0.75);
        font-weight: 700;
        opacity: 1;
        font-size: 20px;
      }
    }
    .lyrics {
      font-size: 16px;
      text-align: left;
      color: rgba(225, 225, 225, 0.8);
      padding-bottom: 8px;
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
  font-size: 40px;
  border-radius: 50%;
  text-align: center;
  margin-right: 30px;
  color: rgba(255, 255, 255, 0.8);
}
.pause-wrap {
  position: absolute;
  bottom: 20px;
  right: 0;
  text-align: right;
}
</style>
