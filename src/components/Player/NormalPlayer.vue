<template>
  <div class="normal-player">
    <div class="normal-player-main">
      <PlayerTitle />
      <PlayerLyric
        ref="lyric"
        :currentLyric="currentLyric"
        :visibleAllLyric.sync="visibleAllLyric"
        :activeLyricIndex="activeLyricIndex"
      />

      <PlayerCircle
        :animationStatus="animationStatus"
        :currentLyric="currentLyric"
        :visibleAllLyric.sync="visibleAllLyric"
        :playingLyric="currentLyric[activeLyricIndex]"
      />
      <div class="bottom">
        <PlayerMode
          @changeMode="(mode) => $emit('mode', mode)"
          :swichMode="swichMode.icon"
        />
        <PlayerControl
          @pause="$emit('pause')"
          @next="$emit('next')"
          @pre="$emit('pre')"
          :palyStatus="palyStatus"
        />

        <div class="collect" @click="$emit('handlePlayListVisible')">
          <i
            class="iconfont icon-iconsMusicyemianbofangmoshiPlayList collect-icon"
          ></i>
        </div>

        <div class="like" @click="likeMode" :class="running">
          <span class="iconfont like-icon" :class="likeClass"></span>
        </div>
      </div>

      <PlayerProgressBar
        :duration="duration"
        :currentTime="currentTime"
        @progressBar="(currentTime) => (audio.currentTime = currentTime)"
        :lyricKeys="lyricKeys"
        :LyricScrollY.sync="LyricScrollY"
        :debounce.sync="debounce"
      />
    </div>
    <div
      :class="visibleAllLyric ? '' : 'filterNone'"
      class="blurBg"
      v-lazy:background-image="currrenSong.picUrl"
    ></div>
    <div class="blurBgMask"></div>
  </div>
</template>

<script>
/*eslint-disable */

import { mapGetters, mapMutations } from 'vuex';
import { scrollToEase, scrollToSmooth } from '../../utils/index.js';
import components from '@/components/Player';
export default {
  name: 'NormalPlayer',
  components,
  props: {
    palyStatus: String,
    animationStatus: String,
    currentTime: Number,
    duration: Number,
    audio: [Object, String, HTMLAudioElement],
    swichMode: [Object, String],
    lyricKeys: Array,
    currentLyric: [Object, String],
  },
  data() {
    return {
      visibleAllLyric: true,
      running: '',
      flag: null,
      activeLyricIndex: '0',
      LyricScrollY: 0,
      debounce: false,
    };
  },

  computed: {
    likeClass({ currrenSong, likeList }) {
      const flag = likeList.every((item) => item.id !== currrenSong.id);
      return flag ? 'icon-shoucang1' : 'icon-shoucang active_red';
    },
    ...mapGetters(['currrenSong', 'playing', 'fullScreen', 'likeList']),
  },
  updated() {
    console.log('normal');
  },
  watch: {
    currentTime(val) {
      if (!this.currentLyric) return;
      if (!this.fullScreen) return;
      if (this.lyricKeys[this.LyricScrollY] > Math.floor(val)) {
        if (this.debounce) {
          this.activeLyricIndex = this.lyricKeys[this.LyricScrollY - 1];
          this.scrollAnimate(this.LyricScrollY);
          this.debounce = false;
        }
        return;
      }
      let filterLyric = [];
      filterLyric = this.lyricKeys.filter((item) => item <= Math.floor(val));
      this.LyricScrollY = filterLyric.length;
      this.activeLyricIndex = filterLyric.pop();
      this.scrollAnimate(this.LyricScrollY);
    },
  },
  mounted() {
    this.el = this.$refs.lyric.$refs.lyricList;
  },
  methods: {
    scrollAnimate() {
      this.$nextTick(() => {
        const start = this.el.scrollTop;
        const activeLyric = document.querySelector('.active-lyric');
        const { offsetTop, offsetHeight } = activeLyric;
        scrollToEase(this.el, start, offsetTop - 150 - offsetHeight);
      });
    },
    scrollToSmooth() {
      scrollToSmooth(this.el, 0);
    },
    likeMode() {
      if (!this.flag) {
        this.running = 'running';
        this.flag = setTimeout(() => {
          this.running = '';
          this.flag = null;
        }, 300);
      }
      const list = this.likeList;
      const index = list.findIndex((item) => item.id === this.currrenSong.id);
      if (index > -1) {
        list.splice(index, 1);
      } else {
        list.unshift(this.currrenSong);
      }

      localStorage.setItem('likeList', JSON.stringify(list));
      this.setLikeList(list);
      this.$once('hook:beforeDestroy', function() {
        clearTimeout(this.flag);
      });
    },
    ...mapMutations(['setPlaying', 'setLikeList']),
  },
};
</script>
<style lang="less">
.normal-player {
  position: fixed;
  bottom: 0;
  top: 0;
  right: 0;
  left: 0;
  z-index: 10;
  background-color: #fff;
}

.blurBg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  filter: blur(90px);
  background-size: 100% 100%;
  background-position: center;
  z-index: -1;
  &.filterNone {
    filter: blur(0px);
  }
}
.blurBgMask {
  width: 100%;
  height: 100%;
  opacity: 0.6;
  background-color: #292a2b;
  background-color: rgba(0, 0, 0, 0.35);
  z-index: 9;
}
.normal-player-main {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
}

.bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;

  .control {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    i {
      display: inline-block;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      color: #fff;
      font-size: 16px;
      text-align: center;
      line-height: 30px;
      vertical-align: middle;
      &.pause {
        font-size: 25px;
        width: 50px;
        height: 50px;
        line-height: 50px;
        margin: 0 10px;
      }
      &.next {
        transform: rotate(180deg);
      }
    }
  }

  .collect {
    position: absolute;
    right: 35px;
    top: 50%;
    font-size: 0;
    transform: translateY(-50%);

    color: #fff;
    .collect-icon {
      font-size: 24px;
    }
  }
  .like {
    position: absolute;
    top: -4px;
    right: 35px;

    &.running {
      animation: pulse 0.3s ease-in-out;
    }
    .like-icon {
      font-size: 22px;
      color: #fff;
      &.active_red {
        color: #f0746b;
      }
    }
  }
}
</style>
