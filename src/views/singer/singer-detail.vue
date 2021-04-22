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
      :count="info"
      ref="tabs"
      color="#a7a3a3"
      lineColor="#000"
      lineWidth="45px"
      lineHeight="2px"
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
            :cover="info.cover"
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
    SingerInfo,
  },
  data() {
    return {
      active: 0,
      background: '',
      name: '',
      navList: [
        { id: 1, name: '歌曲', icon: 'musicSize' },
        { id: 2, name: '专辑', icon: 'albumSize' },
        { id: 3, name: '视频', icon: 'mvSize' },
        { id: 4, name: '关于TA', icon: '' },
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
      info: {
        cover: '',
        albumSize: '',
        identifyTag: '',
        musicSize: '',
        mvSize: '',
        name: '',
        identify: { imageDesc: '', imageUrl: '' },
      },
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
  created() {
    this.getSingerInfo();
  },
  mounted() {
    this.singerDetail = this.$refs.singerDetail;
    this.singerDetail[0].getDetail();
    this.$refs.tabs.init();

    document.addEventListener('scroll', this.scroll);
    this.$once('beforeDestory', () =>
      document.addEventListener('scroll', this.scroll)
    );
  },
  methods: {
    async getSingerInfo() {
      const { id } = this.$route.params;
      const {
        code,
        data: { artist, identify },
      } = await queryArtistDetail(id);
      if (code == 200) {
        const {
          cover,
          albumSize,
          identifyTag = [],
          musicSize,
          mvSize,
          name,
        } = artist;
        this.info = {
          cover,
          albumSize,
          identifyTag: (identifyTag && identifyTag.join(' / ')) || '',
          musicSize,
          mvSize,
          name,
          identify,
        };
      }
    },
    scroll() {
      this.background = `rgba(0,0,0,${Math.min(
        document.documentElement.scrollTop / 150,
        1
      )})`;
      if (document.documentElement.scrollTop > 150) {
        this.name = this.info.name;
      } else {
        this.name = '';
      }
    },
    handleChange(index, old) {
      console.log(index, old);
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
