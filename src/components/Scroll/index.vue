<template>
  <div class="inner_item" @scroll="scroll">
    <div class="top" :style="{ background: `rgba(22, 154, 243, ${percent})` }">
      <div class="top_title" v-show="showText">{{ $route.query.name }}</div>
      <Return />
    </div>
    <div
      class="singerPic"
      ref="singerPic"
      v-lazy:background-image="$route.query.singerPic"
    >
      <h1 class="ellipsis">{{ $route.query.name }}</h1>
      <p v-if="playCount > 0">{{ playCount | filterNum }}听过</p>
      <div class="mask"></div>
    </div>

    <div
      class="out"
      @touchstart="songStart"
      @touchmove="songMove"
      @touchend="songEnd"
    >
      <songList :songs="songs" @player="player" />
    </div>
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
    >
      <div class="musicIcon" v-show="musicIcon">
        <i class="iconfont icon-yinle"></i>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import songList from '../SongList';
import Return from '../Return';
export default {
  name:'Scroll',
  components: {
    songList,
    Return
  },
  filters: {
    filterNum(val) {
      let num;
      if (val >= 10000) {
        num = `${(val / 10000).toFixed(1)}万`;
      }
      if (val >= 100000000) {
        num = `${(val / 100000000).toFixed(1)}亿`;
      }
      return num;
    }
  },
  props: {
    songs: Array,
    playCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      startY: '',
      showText: false,
      percent: 0,
      scrollTop: 0,
      musicIcon: false,
      dom: null
    };
  },
  computed: {
    ...mapGetters([
      'playList',
      'currrenSong',
      'fullScreen',
      'singer',
      'currrentIndex'
    ])
  },

  mounted() {
    this.offsetHeight = this.$refs.singerPic.offsetHeight;
  },
  methods: {
    beforeEnter(el) {
      let rect = this.dom.getBoundingClientRect();

      let y = -(window.innerHeight - rect.y - rect.height / 2 - 50);
      let x = -150;

      el.style.transform = `translate3d(${x}px, ${y}px,0)`;
    },
    enter(el, done) {
      /* eslint-disable-next-line */
      el.offsetWidth;
      el.style.transform = 'translate3d(0, 0,0)';
      el.style.transition = 'all .6s cubic-bezier(0.49, -0.29, 0.75, 0.41)';
      done();
    },
    afterEnter() {
      this.musicIcon = false;
    },
    scroll(e) {
      this.percent = Math.min(e.target.scrollTop / this.offsetHeight, 1);
      this.scrollTop = e.target.scrollTop;
      if (e.target.scrollTop > this.offsetHeight) {
        this.showText = true;
      } else {
        this.showText = false;
      }
    },
    songStart(e) {
      this.startY = e.touches[0].clientY;
    },
    songMove(e) {
      let disY = Math.min(e.touches[0].clientY - this.startY, 400);
      if (disY > 0 && this.scrollTop === 0) {
        this.$refs.singerPic.style.height = this.offsetHeight + disY / 6 + 'px';
        this.$refs.singerPic.style.backgroundPositionY = -50 + disY / 10 + 'px';
        this.$refs.singerPic.style.transition = 'none';
      }
    },
    songEnd() {
      this.$refs.singerPic.style.height = this.offsetHeight + 'px';
      this.$refs.singerPic.style.backgroundPositionY = -50 + 'px';
      this.$refs.singerPic.style.transition = 'all .3s';
    },

    player(index, ele) {
      this.musicIcon = true;
      this.dom = ele;
      this.setPlay(this.songs);
      this.setSequenceList(this.songs);
      this.setCurrrentIndex(index);
      // this.setFullScreen(true)
    },
    ...mapMutations([
      'setCurrrentIndex',
      'setPlay',
      'setFullScreen',
      'setSequenceList'
    ])
  }
};
</script>
<style scoped lang="less">
@base: 37.5rem;
.inner_item {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: scroll;
  overflow-x: hidden;
  z-index: 10;
  .top {
    position: fixed;
    top: 0;
    left: 0;
    height: 50 / @base;
    width: 100%;
    z-index: 1;
    .top_title {
      position: absolute;
      top: 50%;
      transform: translate3d(0, -50%, 0);
      left: 46 / @base;
      font-size: 14px;
      color: #fff;
    }
  }
  .singerPic {
    height: 250px;
    overflow: hidden;
    background-position: center -50px;
    background-repeat: no-repeat;
    background-size: 100% 400px;
    position: relative;
    color: #fff;
    .mask {
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.1);
    }
    h1,
    p {
      position: absolute;
      left: 15 / @base;
    }
    h1 {
      bottom: 35 / @base;
      width: 80%;
      font-weight: 500;
      font-size: 24px;
    }
    p {
      bottom: 22 / @base;
      font-size: 14px;
    }
  }
}
.musicIcon {
  position: fixed;
  bottom: 50 / @base;
  transform: translate3d(-50%, 0, 0);
  left: 50%;
  z-index: 9999;

  i {
    font-size: 24px;
    color: #169af3;
  }
}
.out {
  border-radius: 5px;
  position: relative;
  top: -8px;
  background: #fff;
}
</style>
>
