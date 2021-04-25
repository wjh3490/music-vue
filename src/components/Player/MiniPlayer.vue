<template>
  <div
    class="mini-container"
    @click.stop="$store.commit('setFullScreen', true)"
  >
    <section class="mini-cd" :class="{ active: !playing }">
      <div
        class="mini-cd-wrap"
        :style="{
          'background-image': `conic-gradient(#20a0ff 0%, #2010ff ${percent *
            100}%, #fff ${percent * 100}%, #fff ${100 - percent * 100}%)`,
        }"
      ></div>
      <div class="mini-cd-bgc" :class="animationStatus">
        <img :src="currrenSong.picUrl" alt class="mini-cd-img" />
      </div>
    </section>

    <section class="mini-desc ellipsis">
      <p class=" mini-player-name ellipsis">{{ currrenSong.name }} - {{ currrenSong.artists }}</p>
      <!-- <p class=" mini-player-singer ellipsis"></p> -->
    </section>

    <div class="control">
      <!-- <div class="audio-icon unselectable">
        <template v-for="item in audioIcon">
          <div
            :class="{ active: !playing }"
            class="column"
            :style="{ animationDelay: `${item.time}s` }"
            :key="item.time"
          ></div>
        </template>
      </div> -->
      <i
        @click.stop="$emit('pause')"
        class="pause iconfont mini-control-icon mini-icon-commom"
        :class="playing ? 'icon-pause-full' : 'icon-bofang31'"
      ></i>
      <i
        @click.stop="$emit('next')"
        class="next iconfont icon-qianjin mini-icon-commom"
      ></i>

      <i
        class="iconfont icon-iconsMusicyemianbofangmoshiPlayList mini_collect-icon mini-icon-commom"
        @click.stop="$emit('handlePlayListVisible')"
      ></i>
    </div>
    <!-- <svg viewBox="0 0 100 100"  class="svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:rgb(32,160,255);stop-opacity:1" />
            <stop offset="100%" style="stop-color:rgb(32,16,255);stop-opacity:1" />
          </linearGradient>
        </defs>
        <path d="
        M 50 50
        m 0 -47
        a 47 47 0 1 1 0 94
        a 47 47 0 1 1 0 -94
        "
        stroke="#888" 
        stroke-width="6" 
        fill="none"
        style="stroke-dashoffset: 0px;"
          :style="{strokeDasharray:`${perimeter}px, ${perimeter}px`}"
        >
        
        </path>
        <path d="
        M 50 50
        m 0 -47
        a 47 47 0 1 1 0 94
        a 47 47 0 1 1 0 -94
        " 
        stroke="url(#grad1)" 
        stroke-linecap="round" 
        fill="none"
        stroke-width="6" 
        :style="strokeDasharray"
        style="stroke-dashoffset: 0px">
        </path>
      </svg> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'PlayerMini',
  props: {
    animationStatus: String,
    palyStatus: String,
    percent: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      audioIcon: [
        { time: -1.2 },
        { time: 0 },
        { time: -1.5 },
        { time: -0.9 },
        { time: -0.6 },
      ],
    };
  },
  computed: {
    // strokeDasharray() {
    //   return {
    //     strokeDasharray: `${this.percent.toFixed(2) * this.perimeter}px, ${
    //       this.perimeter
    //     }px`
    //   };
    // },
    // perimeter() {
    //   return 2 * Math.PI * 50;
    // },
    ...mapGetters(['currrenSong', 'fullScreen', 'playing']),
  },
};
</script>
<style scoped lang="less">
.mini {
  &-container {
    position: fixed;
    left: 0;
    bottom: 0px;
    width: 100%;
    height: 56px;
    background-color: #fff;
    box-shadow: rgba(0, 69, 189, 0.1) 0px 0px 6px 0px;
    z-index: 99;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;

    .control {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100px;
      .mini-icon-commom {
        display: inline-block;
        color: #169af3;
        vertical-align: middle;
      }
      .icon-qianjin {
        font-size: 26px;
        // margin: 0 12px 0 8px;
      }
      .mini_collect-icon {
        font-size: 28px;
      }
      .mini-control-icon {
        font-size: 26px;
      }
    }
    .mini-desc {
      flex: 1;
      margin: 0 10px;
      .mini-player-name {
        font-size: 14px;
      }
      .mini-player-singer {
        font-size: 12px;
        color: #888;
      }
    }
    .audio-icon {
      position: relative;
      display: flex;
      height: 20px;
      align-items: center;
      overflow: hidden;
      .column {
        width: 2px;
        height: 100%;
        margin-left: 2px;
        background-color: #169af3;
        animation: play 0.9s linear infinite alternate;
        &.active {
          animation-play-state: paused;
        }
      }
    }
  }
  &-cd {
    position: relative;
    border-radius: 50%;
    width: 56px;
    height: 56px;
    transition: all 0.5s;
    overflow: hidden;
    transform: translateY(-5px);
    &.active {
      transform: translateY(-1px) scale(0.8);
    }
    &-wrap {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
    &-bgc {
      position: absolute;
      top: 0;
      left: 0;
      padding: 3px;
      overflow: hidden;
      animation: move 20s linear infinite;
      &.animation_pause {
        animation-play-state: paused;
      }
    }
    &-img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
}
</style>
