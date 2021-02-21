<template>
  <div class="mini" @click.stop="$store.commit('setFullScreen', true)">
    <div class="circle1" :class="{active: !playing}">
      <div class="svg" :style="{'background-image':`conic-gradient(#20a0ff 0%, #2010ff ${percent*100}%, #fff ${percent*100}%, #fff ${100 - percent*100}%)`}"></div>
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

      <div class="bgc" :class="animationStatus">
        <img v-lazy="currrenSong.picUrl" alt class="bgc-img" />
      </div>
    </div>  

    <div class="mini-desc">
      <p class="ellipsis mini-player-name">{{ currrenSong.name }}</p>
      <p class="ellipsis mini-player-singer">{{ currrenSong.singer }}</p>
    </div>

   
    <div class="audio-icon unselectable">
      <template v-for="item in audioIcon">
      <div :class="{active: !playing}" class="column" :style="{animationDelay: `${item.time}s`}" :key="item.time"></div>
      </template>
    </div>
     <div class="control">
      <i
        @click.stop="$emit('pause')"
        class="pause iconfont mini-control-icon mini-icon-commom"
        :class="palyStatus"
      ></i>
      <i
        @click.stop="$emit('next')"
        class="next iconfont icon-next mini-icon-commom"
      ></i>

      <i
        class="iconfont icon-iconsMusicyemianbofangmoshiPlayList mini_collect-icon mini-icon-commom"
        @click.stop="$emit('handlePlayListVisible')"
      ></i>
    </div>
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
      default: 0
    }
  },
  data() {
    return {
      audioIcon: [
        { time: -1.2 },
        { time: 0 },
        { time: -1.5 },
        { time: -0.9 },
        { time: -0.6 }
      ]
    };
  },
    updated() {
    console.log('PlayerMini')
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

    ...mapGetters(['currrenSong', 'fullScreen', 'playing'])
  }
};
</script>
<style scoped lang="less">
.mini {
  position: fixed;
  left: 0;
  bottom: -2px;

  width: 100%;
  height: 56px;
  background-color: #fff;
  box-shadow: rgba(0, 69, 189, 0.1) 0px 0px 6px 0px;
  z-index: 10;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .circle1 {
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
    .svg {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }

    .bgc {
      position: absolute;
      top: 0;
      left: 0;
      // right: 0;
      // bottom: 0;
      // margin: auto;

      padding: 3px;
      overflow: hidden;
      animation: move 20s linear infinite;
      &.animation_pause {
        animation-play-state: paused;
        // transform: scale(0.8);
      }
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
  }

  .control {
    width: 98px;
    .mini-icon-commom {
      display: inline-block;
      color: #169af3;
      vertical-align: middle;
    }
    .icon-next {
      font-size: 22px;
      margin: 0 12px 0 8px;
      transform: rotate(180deg);
    }
    .mini_collect-icon {
      font-size: 28px;
    }
    .mini-control-icon {
      font-size: 26px;
    }
  }

  .mini-desc {
    // padding: 6px 120px 0 95px;
    width: 90px;
    font-size: 0;
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
    width: 18px;
    height: 18px;
    min-width: 18px;
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
</style>
