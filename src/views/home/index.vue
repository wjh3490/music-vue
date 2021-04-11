<template>
  <div class="recommend">
    <RecommendSearch />
    <div class="recommend-swiper">
      <BaseSwiper
        :list="swiperList"
        :options="swiperOptions"
        :visible="true"
        v-slot="{ data }"
      >
        <img
          :data-index="data.targetId"
          :data-src="data.imageUrl"
          class="swiper-lazy swiper-img"
        />
        <div class="my-lazy-preloader"></div>
      </BaseSwiper>
    </div>
    <BaseNav />
    <BaseList :list="personalized" @list="pushDetails">
      <h3 class="recommend-type">热门推荐</h3></BaseList
    >
    <BaseList :list="newsong" @list="playSong">
      <h3 class="recommend-type">新碟上架</h3></BaseList
    >
  </div>
</template>

<script>
/*eslint-disable */
import RecommendSearch from '@/components/Recommend/RecommendSearch';
import { mapMutations, mapGetters } from 'vuex';
import {
  vGetPersonalized,
  vGetNewsong,
  vGetBanner,
  vGetDetail,
} from '@/api/recomment.js';
export default {
  name: 'Recommend',
  components: { RecommendSearch },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
        },
        on: {
          tap: (e) => {
            this.getDetail(e.target.dataset.index);
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
      if (code == 200) {
        const list = result.slice(6).reduce((acc, cur) => {
          const obj = {
            id: cur.id,
            picUrl: cur.picUrl,
            name: cur.name,
            playCount: cur.song.bMusic && cur.song.bMusic.playTime,
            singer: cur.song.artists[0]['name'],
          };
          acc.push(obj);
          return acc;
        }, []);
        this.newsong = list;
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
        this.setSequenceList(this.playList);
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
<style lang="less" scoped>
.recommend-type {
  margin-bottom: 10px;
}
.recommend-swiper {
  margin-top: 20px;
}
.recommend /deep/ .swiper-slide {
  position: relative;
  width: 90%;
  padding: 0 1.5%;
  margin-top: 6px;
}

.swiper-img {
  height: 140px;
  border-radius: 6px;
}
</style>
