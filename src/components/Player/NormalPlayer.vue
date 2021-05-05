<template>
  <transition name="scale">
    <div
      class="normal-player"
      :style="{ backgroundImage: `url(${currrenSong.picUrl})` }"
    >
      <div class="normal-player-main">
        <PlayerTabs @slide="slide" :index="index" />
        <swiper
          :options="swiperOptions"
          style="height:calc(100% - 40px)"
          ref="mySwiper"
        >
          <swiper-slide>
            <PlayerInfo
              :index="index"
              :flag="flag"
              @change="(e) => (flag = e)"
            />
          </swiper-slide>
          <swiper-slide>
            <div class="player-center">
              <PlayerCircle />
            </div>
            <div class="normal-player-bottom" @touchmove.stop.prevent>
              <PlayerProgressBar />
              <PlayerControl>
                <PlayerMode />
              </PlayerControl>
            </div>
          </swiper-slide>
          <swiper-slide>
            <PlayerLyric />
          </swiper-slide>
        </swiper>
      </div>
      <!-- <div class="blurBgMask">
        <div class="blurBg"></div>
      </div> -->
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex';
import components from '@/components/Player';
export default {
  name: 'NormalPlayer',
  components,
  data() {
    return {
      visibleAllLyric: true,
      swiperOptions: {
        on: {
          slideChange: () => {
            this.index = this.swiper.activeIndex;
          },
        },
        loop: false,
        watchSlidesVisibility: true,
      },
      index: 0,
      flag: true,
    };
  },

  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    ...mapGetters(['currrenSong', 'fullScreen', 'songInfo']),
  },
  watch: {
    fullScreen(val) {
      if (val) this.slide(1);
    },
    currrenSong() {
      this.flag = true;
    },
  },
  methods: {
    slide(index) {
      if (this.swiper.activeIndex == index) return;
      this.swiper.slideTo(index, 0, false);
    },
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
  z-index: 1000;
  transition: background-image 0.4s;
  background: no-repeat 50% / cover;
}

.blurBg {
  width: 100%;
  height: 100%;
  // background-size: 100% 100%;
  // background-position: center;
  // background-repeat: no-repeat;
  // background-position: 50% center;
  transition: background-image 0.4s;
  background: no-repeat 50% / cover;
  // transform: scale(1.5);
  // transform-origin: center center;
  // filter: blur(65px);
  // opacity: 0.6;
}
.blurBgMask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.6;
  z-index: 9;
}
.normal-player-main {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 100;
  backdrop-filter: blur(40px) brightness(0.65);
  -webkit-backdrop-filter: blur(40px) brightness(0.65);
}
.normal-player-bottom {
  position: absolute;
  bottom: 20px;
  width: 100%;
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
