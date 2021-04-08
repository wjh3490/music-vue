<template>
  <div class="normal-player">
    <div class="normal-player-main">
      <PlayerTitle @slide="slide" :index="index" />
      <swiper
        :options="swiperOptions"
        style="height:calc(100% - 40px)"
        ref="mySwiper"
      >
        <swiper-slide>
          <div class="player-center">
            <PlayerCircle :playingLyric="currentLyric[activeLyricIndex]" />
          </div>
          <div class="normal-player-bottom" @touchmove.stop.prevent="stopEvent">
            <PlayerProgressBar
              :duration="duration"
              :currentTime="currentTime"
              @progressBar="(currentTime) => (audio.currentTime = currentTime)"
              :lyricKeys="lyricKeys"
              :LyricScrollY.sync="LyricScrollY"
              :debounce.sync="debounce"
            />
            <div class="control-wrap">
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
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <PlayerLyric
            ref="lyric"
            :currentLyric="currentLyric"
            :activeLyricIndex="activeLyricIndex"
            @pause="$emit('pause')"
            :palyStatus="palyStatus"
          />
        </swiper-slide>
      </swiper>
    </div>

    <div class="blurBgMask">
      <div class="blurBg" v-lazy:background-image="currrenSong.picUrl"></div>
    </div>
  </div>
</template>

<script>
/*eslint-disable */

import { mapGetters, mapMutations } from 'vuex';
import { scrollToEase, scrollToSmooth } from '../../utils/index.js';
import components from '@/components/Player';
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
export default {
  name: 'NormalPlayer',
  components: { ...components, swiper, swiperSlide },
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
      swiperOptions: {
        on: {
          slideChange: (e) => {
            this.index = this.swiper.activeIndex;
          },
        },
        loop: false,
        watchSlidesVisibility: true, // 解决了swiper前面的一个不能提前加载的bug
      },

      index: 0,
    };
  },

  computed: {
    likeClass({ currrenSong, likeList }) {
      const flag = likeList.every((item) => item.id !== currrenSong.id);
      return flag ? 'icon-shoucang1' : 'icon-shoucang active_red';
    },
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    activeIndex() {
      this.$nextTick(() => {
        return this.swiper.activeIndex ? this.swiper.activeIndex : 0;
      });
    },
    ...mapGetters(['currrenSong', 'playing', 'fullScreen', 'likeList']),
  },
  updated() {
    // console.log('normal');
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
    stopEvent() {},
    slide(index) {
      if (this.swiper.activeIndex == index) return;
      this.swiper.slideTo(index, 0, false);
    },

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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: #fff;
}

.blurBg {
  width: 100%;
  height: 100%;
  filter: blur(50px)  brightness(0.5);
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-position: 50% center;
  background-size: auto 100%;
  transform: scale(1.5);
  transform-origin: center center;
  &.filterNone {
    filter: blur(0px);
  }
}
.blurBgMask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.6;
  background-color: rgba(0, 0, 0, 0.35);
  // background-color: rgba(0, 0, 0, 0.9);
  z-index: 9;
}
.normal-player-main {
  // position: absolute;
  // top: 0;
  // left: 0;
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 100;
  // padding-bottom: 100px;
}

.normal-player-bottom {
  position: absolute;
  bottom: 20px;
  width: 100%;
  // height: 80px;
  padding: 0 25px;
  .collect {
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

.player-center {
  height: 70%;
  position: relative;
  width: 100%;
  margin-top: 12px;
}
.control-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
