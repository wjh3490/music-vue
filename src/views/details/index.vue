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

    beforeEnter(el) {
      let rect = this.dom.getBoundingClientRect();
      let y = -(window.innerHeight - rect.y - rect.height / 2 - 50);
      let x = -150;
      el.style.transform = `translate3d(${x}px, ${y}px,0)`;
    },
    enter(el, done) {
      el.offsetWidth;
      el.style.transform = 'translate3d(0, 0,0)';
      el.style.transition = 'all .6s cubic-bezier(0.49, -0.29, 0.75, 0.41)';
      done();
    },
    afterEnter() {
      this.musicIcon = false;
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
  //     left: 15 / @base;
  //   }
  //   h1 {
  //     bottom: 35 / @base;
  //     width: 80%;
  //     font-weight: 500;
  //     font-size: 24px;
  //   }
  //   p {
  //     bottom: 22 / @base;
  //     font-size: 14px;
  //   }
  // }
}
.musicIcon {
  position: fixed;
  bottom: 50 / @base;
  transform: translate3d(-50%, 0, 0);
  left: 50%;
  z-index: 9999;

  i {
    // font-size: 24px;
    color: #169af3;
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
