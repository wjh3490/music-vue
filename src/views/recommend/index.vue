<template>
  <div class="recommend">
    <RecommendTitle />
    <BaseNav />
    <Swiper :swiperList="swiperList" :swiperOptions="swiperOptions" />

    <RecommendList
      title="热门推荐"
      :newsongs="personalized"
      @list="pushDetails"
    />

    <RecommendList title="新碟上架" :newsongs="newsong" @list="playSong" />
  </div>
</template>

<script>
/*eslint-disable */
import axios from 'axios'
import Swiper from '@/components/Recommend/RecommendSwiper';
import RecommendList from '@/components/Recommend/RecommendList';
import RecommendTitle from '@/components/Recommend/RecommendTitle';
import { mapMutations, mapGetters } from 'vuex';
import {
  vGetPersonalized,
  vGetNewsong,
  vGetBanner,
  vGetDetail,
  aa
} from '@/api/recomment.js';
export default {
  name: 'Recommend',
  components: { Swiper, RecommendList, RecommendTitle },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
        },
        on: {
          click: (e) => {
            this.getDetail(e.target.offsetParent.dataset.id);
          },
        },
        loop: true,
        autoplay: {
          delay: 2000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
        watchSlidesVisibility: true, // 解决了swiper前面的一个不能提前加载的bug
        lazy: {
          preloaderClass: 'my-lazy-preloader',
        }, // 懒加载开启
        // observer: true,
        // observeParents: true,
        slidesPerView: 'auto',
        centeredSlides: true,
      },
      swiperList: [],
      personalized: [],
      newsong: [],
    };
  },

  computed: {
    ...mapGetters(['playList']),
  },

  created() {
    this.getSwiperList();
    this.getPersonalized();
    this.getNewsong();
  },
  methods: {
    async getSwiperList() {
      const { code, banners } = await vGetBanner();

      if (code === 200) {
        this.swiperList = Object.freeze(banners);
      }
    },
    async getPersonalized() {
      const { code, result } = await vGetPersonalized();
      if (code === 200) {
        this.personalized = Object.freeze(result.splice(0, 15));
      }
    },
    async getNewsong() {
      const { code, result } = await vGetNewsong();
      if (code === 200) {
        result.forEach((item) => {
          const song = {
            id: item.id,
            name: item.name,
            picUrl: item.song.album.picUrl,
            singer: item.song.artists[0].name,
          };

          this.newsong.push(song);
        });

        this.newsong = Object.freeze(this.newsong.splice(0, 9));
      }
    },
    async getDetail(id) {
      const { songs } = await vGetDetail(id);
      if (!songs.length) {
        return;
      }
      const song = {
        id: songs[0].id,
        name: songs[0].name,
        picUrl: songs[0].al.picUrl,
        singer: songs[0].ar[0].name,
      };
      let index = this.playList.findIndex((item) => item.id === song.id);

      if (index >= 0) {
        this.setCurrrentIndex(index);
      } else {
        this.setPlay([song, ...this.playList]);
        this.setCurrrentIndex(0);
      }
    },
    playSong(item, index) {
      if (!Object.is(this.newsong, this.playList)) {
        this.setPlay(this.newsong);
        this.setSequenceList(this.newsong);
      }
      this.setCurrrentIndex(index);
    },
    pushDetails(singer) {
      const _singer = {
        id: singer.id,
        singerPic: singer.picUrl,
        name: singer.name,
      };
      this.setSinger(_singer);
      this.$router.push(
        `/details/${singer.id}?singerPic=${singer.picUrl}&name=${singer.name}&componentName=RecommendDetail`
      );
    },
    ...mapMutations([
      'setCurrrentIndex',
      'setPlay',
      'setFullScreen',
      'setSequenceList',
      'setSinger',
    ]),
  },
};
</script>
