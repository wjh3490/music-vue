<template>
  <div class="detail-container">
    <div class="inner_item" @scroll="scroll">
      <BaseBack :isFixed="true" :background="`rgba(22, 154, 243, ${percent})`">
        <span style="color:#fff;fontSize:14px" v-show="showText">{{
          $route.query.name
        }}</span>
      </BaseBack>
      <DetailBackGround />
      <DetailSongList :songs="songs" @player="player" />
      <div>
        <div v-for="(item, index) in balls" :key="index">
          <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
          >
            <div class="musicIcon ball" v-show="item.show">
              <i class="iconfont icon-yinle inner inner-hook"></i>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/*eslint-disable */
import { mapMutations, mapGetters } from 'vuex';
import { recommentSongs } from '@/api/recomment';
import { singerSongs } from '@/api/singer';
import { rankSongs } from '@/api/rank';
import DetailBackGround from '@/components/Detail/DetailBackGround';
import DetailSongList from '@/components/Detail/DetailSongList';
export default {
  name: 'Detail',
  components: { DetailSongList, DetailBackGround },
  data() {
    return {
      songs: [],
      playCount: 0,
      showText: false,
      percent: 0,
      scrollTop: 0,
      musicIcon: false,
      dom: null,
      balls: [
        { show: false },
        { show: false },
        { show: false },
        { show: false },
        { show: false },
      ],
      dropBalls: [],
    };
  },
  computed: {
    ...mapGetters([
      'playList',
      'currrenSong',
      'fullScreen',
      'singer',
      'currrentIndex',
    ]),
  },
  created() {
    const { query, params } = this.$route;
    this[query.componentName](params.id);
  },
  methods: {
    async RankDetail(id) {
      const {
        code,
        playlist: { playCount, tracks },
      } = await rankSongs(id);
      if (code === 200) this.getSongs(tracks);
    },
    async RecommendDetail(id) {
      const {
        code,
        playlist: { playCount, tracks },
      } = await recommentSongs(id);
      if (code === 200) this.getSongs(tracks, playCount);
    },
    async SingerDetail(id) {
      const { code, hotSongs } = await singerSongs(id);
      if (code === 200) this.getSongs(hotSongs);
    },

    getSongs(list, count = 0) {
      let songs = [];
      list.forEach((ele) => {
        const song = {
          id: ele.id,
          name: ele.name,
          singer: ele.ar[0].name,
          picUrl: ele.al.picUrl,
        };
        this.playCount = count;
        songs.push(song);
      });

      this.songs = Object.freeze(songs);
    },
    drop(el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          this.dropBalls.push(ball);
          return;
        }
      }
    },

    beforeEnter(el) {
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect();
          let x = 120
          let y = -(window.innerHeight - rect.top - 50);
          el.style.display = '';
          el.style.webkitTransform = `translate3d(0,${y}px,0)`;
          el.style.transform = `translate3d(0,${y}px,0)`;
          el.style.transition = 'all .8s';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
          inner.style.transform = `translate3d(${x}px,0,0)`;
          inner.style.transition = 'all .8s';
          console.log(el.style.transform, x);
        }
      }
    },
    enter(el, done) {
      let rf = el.offsetHeight;
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0,0,0)';
        el.style.transform = 'translate3d(0,0,0)';
        el.style.transition = 'all .8s cubic-bezier(.62,-0.1,.86,.57)';
        let inner = el.getElementsByClassName('inner-hook')[0];
        inner.style.webkitTransform = 'translate3d(0,0,0)';
        inner.style.transform = 'translate3d(0,0,0)';
        inner.style.transition = 'all .8s linear';
        el.addEventListener('transitionend', done);
        // done();
      });
    },

    afterEnter(el) {
      let ball = this.dropBalls.shift();
      if (ball) {
        ball.show = false;
        el.style.display = 'none';
      }
    },
    scroll(e) {
      this.percent = Math.min(e.target.scrollTop / 400, 1);
      this.scrollTop = e.target.scrollTop;
      if (e.target.scrollTop > 400) {
        this.showText = true;
      } else {
        this.showText = false;
      }
    },
    player(index, ele) {
      this.drop(ele);
      this.musicIcon = true;
      this.dom = ele;
      if (!Object.is(this.songs, this.playList)) {
        this.setPlay(this.songs);
        this.setSequenceList(this.songs);
      }
      this.setCurrrentIndex(index);
      // this.setFullScreen(true)
    },
    ...mapMutations([
      'setCurrrentIndex',
      'setPlay',
      'setFullScreen',
      'setSequenceList',
    ]),
  },
};
</script>
<style scoped lang="less">
@base: 37.5rem;
.inner_item {
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  .top {
    position: fixed;
    top: 0;
    left: 0;
    height: 50px;
    width: 100%;
    z-index: 1;
    .top_title {
      position: absolute;
      top: 50%;
      transform: translate3d(0, -50%, 0);
      left: 46px;
      font-size: 14px;
      color: #fff;
    }
  }
  // .singerPic {
  //   height: 250px;
  //   overflow: hidden;
  //   background-position: center -50px;
  //   background-repeat: no-repeat;
  //   background-size: 100% 400px;
  //   position: relative;
  //   color: #fff;
  //   .mask {
  //     position: absolute;
  //     width: 100%;
  //     height: 100%;
  //     background: rgba(0, 0, 0, 0.1);
  //   }
  //   h1,
  //   p {
  //     position: absolute;
  //     left: 15px;
  //   }
  //   h1 {
  //     bottom: 35px;
  //     width: 80%;
  //     font-weight: 500;
  //     font-size: 24px;
  //   }
  //   p {
  //     bottom: 22px;
  //     font-size: 14px;
  //   }
  // }
}
.musicIcon {
  position: fixed;
  bottom: 35px;
  left: 100px;
  z-index: 9999;
  // transition: all 1s cubic-bezier(0.49, -0.29 0.45, 0.41);

  i {
    font-size: 30px;
    color: #169af3;
    font-weight: 700;
  }
}
.out {
  border-radius: 5px;
  position: relative;
  top: -8px;
  background: #fff;
}

.img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}
</style>
>
