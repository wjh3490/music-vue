<template>
  <div class="detail-container">
    <BaseBack :background="background" :title="name" color="#fff" />
    <SingerInfo :info="info" />

    <BaseTabs
      :navList="navList"
      @tabs="handleScroll"
      :active="active"
      @change="handleChange"
      position="sticky"
      top="1.33rem"
      ref="tabs"
    />

    <main class="detail-main">
      <swiper :options="swiperOptions" ref="mySwiper" v-if="navList.length > 0">
        <swiper-slide
          :data-id="item.targetId"
          v-for="item in navList"
          :key="item.id"
        >
          <component
            :is="currentTabComponent(item.id)"
            ref="singerDetail"
            :active="active"
          ></component>
        </swiper-slide>
      </swiper>
    </main>
  </div>
</template>
<script>
/*eslint-disable */
import { mapMutations, mapGetters } from 'vuex';
import { queryArtistDetail, queryArtistDesc, queryArtist } from '@/api/singer';
import SingerInfo from '@/components/Singer/SingerInfo';
import DetailSongList from '@/components/Detail/DetailSongList';
import SingerAbout from '@/components/Singer/SingerAbout';
import SingerAlbum from '@/components/Singer/SingerAlbum';
import SingerHotSong from '@/components/Singer/SingerHotSong';
import SingerMV from '@/components/Singer/SingerMV';
const componentName = {
  1: 'SingerHotSong',
  2: 'SingerAlbum',
  3: 'SingerMV',
  4: 'SingerAbout',
};
export default {
  name: 'SingerDetail',
  components: {
    SingerAbout,
    SingerAlbum,
    SingerHotSong,
    SingerMV,
    DetailSongList,
    SingerInfo,
  },
  data() {
    return {
      active: 0,
      background: '',
      name: '',
      navList: [
        { id: 1, name: '歌曲' },
        { id: 2, name: '专辑' },
        { id: 3, name: '视频' },
        { id: 4, name: '关于TA' },
      ],
      scrollList: {},
      swiperOptions: {
        on: {
          slideChange: () => {
            this.active = this.swiper.activeIndex;
          },
        },
        loop: false,
        watchSlidesVisibility: true,
      },
      songs: [],
      info: {
        nickname: '',
        subscribedCount: 0,
        commentCount: 0,
        description: 0,
        name: '',
        coverImgUrl: '',
        avatarUrl: '',
      },
      playCount: 0,
      showText: false,
      percent: 0,
      scrollTop: 0,
      musicIcon: false,
      dom: null,
      info: {},
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
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    currentTabComponent() {
      return function(id) {
        return componentName[id];
      };
    },
    ...mapGetters([
      'playList',
      'currrenSong',
      'fullScreen',
      'singer',
      'currrentIndex',
    ]),
  },
  mounted() {
    this.singerDetail = this.$refs.singerDetail;
    this.singerDetail[0].getDetail();
    this.$refs.tabs.init();
    this.getPlaylist();
    document.addEventListener('scroll', this.scroll);
    this.$once('beforeDestory', () =>
      document.addEventListener('scroll', this.scroll)
    );
  },
  methods: {
    scroll() {
      this.background = `rgba(0,0,0,${document.documentElement.scrollTop /
        150})`;
      if (document.documentElement.scrollTop > 150) {
        this.name = this.info.name;
      } else {
        this.name = '';
      }
    },
    async getPlaylist() {
      const { id } = this.$route.params;
      const {
        code,
        data: { artist },
      } = await queryArtistDetail(id);
      if (code == 200) {
        this.info = artist;
      }
    },
    getArtist(artist) {
      return artist.reduce((acc, cur) => {
        acc.push(cur.name);
        return acc;
      }, []);
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
          let x = 120;
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
    handleChange(index, old) {
      this.singerDetail[index].getDetail();
      if (document.documentElement.scrollTop < 240) {
        this.scrollList = {};
        return;
      }
      this.scrollList[old] = document.documentElement.scrollTop;
      document.documentElement.scrollTop = this.scrollList[index] || 240;
    },
    handleScroll(index) {
      if (this.active == index) return;
      this.swiper.slideTo(index, 0, false);
    },
    // player(index, ele) {
    //   this.drop(ele);
    //   this.musicIcon = true;
    //   this.dom = ele;
    //   if (!Object.is(this.songs, this.playList)) {
    //     this.setPlay(this.songs);
    //     this.setSequenceList(this.songs);
    //   }
    //   this.setCurrrentIndex(index);
    //   // this.setFullScreen(true)
    // },
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
.detail {
  &-nav {
    width: 100%;
    position: sticky;
    top: 50px;
    font-size: 16px;
    background-color: #fff;
    z-index: 99;
    &-wrap {
      height: 40px;
      display: flex;

      align-items: center;
    }
    &-item {
      flex: 1;
      text-align: center;
      font-weight: 600;
      &.active {
        color: #169af3;
      }
    }
    &-line {
      width: 25%;
      text-align: center;
      height: 3px;
      transition: all 0.3s;
      &::after {
        content: '';
        display: block;
        height: 100%;
        width: 30px;
        margin: 0 auto;
        background-color: #169af3;
        border-radius: 3px;
      }
    }
  }
}

.musicIcon {
  position: fixed;
  bottom: 35px;
  left: 100px;
  z-index: 9999;
  i {
    font-size: 30px;
    color: #169af3;
    font-weight: 700;
  }
}
</style>
>
