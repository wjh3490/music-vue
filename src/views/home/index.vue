<template>
  <div class="recommend">
    <RecommendSearch />
    <!-- 轮播图 -->
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
    <!-- 导航栏 -->
    <BaseNav />
    <!-- 推荐歌单 -->
    <HomePlayList :list="personalized" v-if="personalized.length">
      <HomeMore title="推荐歌单" link="/playlist" />
    </HomePlayList>
    <!-- 排行榜 -->
    <HomeTopList :list="toplists" v-if="toplists.length">
      <HomeMore title="排行榜" link="/rank" />
    </HomeTopList>
    <!--  新歌  新碟  数字专辑  -->
    <HomeNewSong
      v-if="newsong.length"
      :products="products"
      :songs="newsong"
      :albums="albums"
      :tabs="tabs"
      :activeTab="activeTab"
    >
      <HomeMore :link="link" :more="more">
        <div class="home-newsong-tabs">
          <div
            class="home-newsong-tab"
            v-for="tab in tabs"
            :key="tab.tabIndex"
            @click="handleChange(tab)"
          >
            <strong
              class="home-newsong-tabs-name"
              :class="{ 'home-newsong-active': activeTab == tab.tabIndex }"
              >{{ tab.name }}</strong
            >
            <span
              class="home-newsong-tabs-line"
              v-if="tab.tabIndex != 3"
            ></span>
          </div>
        </div>
      </HomeMore>
    </HomeNewSong>
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
import { rankTopList } from '@/api/rank';
import { getAlbumNewset, getAlbumList } from '@/api/album';
import HomeTopList from '@/components/Home/HomeTopList';
import HomeMore from '@/components/Home/HomeMore';
import HomeNewSong from '@/components/Home/HomeNewSong';
import HomePlayList from '@/components/Home/HomePlayList';
export default {
  name: 'Home',
  components: {
    RecommendSearch,
    HomeTopList,
    HomeMore,
    HomeNewSong,
    HomePlayList,
  },
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
      tabs: [
        { link: '/songs/0', more: '更多新歌', tabIndex: 1, name: '新歌' },
        { link: '/songs/1', more: '更多新碟', tabIndex: 2, name: '新碟' },
        { link: '/mall', more: '更多数专', tabIndex: 3, name: '数字专辑' },
      ],
      activeTab: 1,
      more: '更多新歌',
      link: '/songs/0',
      swiperList: [],
      personalized: [],
      newsong: [],
      toplists: [],
      albums: [],
      products: [],
    };
  },

  computed: {
    ...mapGetters(['playList']),
  },

  async created() {
    await getAlbumNewset();
    this.getSwiperList();
    this.getPersonalized();
    this.getNewsong();
    this.getTopList();
    this.getNewAlbum();
    this.getAlbumList();
  },
  methods: {
    async getTopList() {
      const { list } = await rankTopList();
      const toplists = list.filter((item) => item.tracks && item.tracks.length);
      this.toplists = toplists;
    },
    async getSwiperList() {
      const { code, banners } = await vGetBanner();
      if (code === 200) {
        this.swiperList = banners;
      }
    },
    async getPersonalized() {
      const { code, result } = await vGetPersonalized();
      if (code === 200) {
        this.personalized = result.splice(0, 6);
      }
    },
    async getNewAlbum() {
      const { code, albums } = await getAlbumNewset();
      if (code == 200) {
        const list = albums.slice(0, 6).reduce((acc, cur) => {
          const album = {
            id: cur.id,
            name: cur.name,
            picUrl: cur.picUrl,
            album: this.getArtist(cur.artists).join('、'),
            artists: '',
            privilege: {
              pl: '',
              fee: '',
              flag: '',
              maxbr: '',
            },
          };
          acc.push(album);
          return acc;
        }, []);
        this.albums = this.splitList(list, 3);
      }
    },
    async getAlbumList() {
      const { code, products } = await getAlbumList();
      if (code == 200) {
        const list = products.slice(0, 9).reduce((acc, cur) => {
          const product = {
            id: cur.albumId,
            name: cur.albumName,
            picUrl: cur.coverUrl,
            album: cur.artistName,
            artists: '',
            privilege: {
              pl: '',
              fee: '',
              flag: '',
              maxbr: '',
            },
          };
          acc.push(product);
          return acc;
        }, []);
        this.products = this.splitList(list, 3);
      }
    },
    async getNewsong() {
      const { code, result } = await vGetNewsong();
      if (code == 200) {
        const list = result.slice(0, 6).reduce((acc, cur) => {
          const song = {
            id: cur.id,
            name: cur.name,
            picUrl: cur.picUrl,
            album: cur.song.album.name,
            artists: this.getArtist(cur.song.artists).join('、'),
            privilege: {
              pl: cur.song.privilege['pl'],
              fee: cur.song.privilege['fee'],
              flag: cur.song.privilege['flag'],
              maxbr: cur.song.privilege['maxbr'],
            },
          };
          acc.push(song);
          return acc;
        }, []);
        this.newsong = this.splitList(list, 3);
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
    handleChange(tab) {
      if (tab.tabIndex == this.activeTab) return;
      this.activeTab = tab.tabIndex;
      this.more = tab.more;
      this.link = tab.link;
    },
    playSong(item, index) {
      if (!Object.is(this.newsong, this.playList)) {
        this.setPlay(this.newsong);
        this.setSequenceList(this.newsong);
      }
      this.setCurrrentIndex(index);
    },
    splitList(list, length) {
      let index = 0;
      let newArray = [];
      while (index < list.length) {
        newArray.push(list.slice(index, (index += length)));
      }
      return newArray;
    },
    getArtist(artist) {
      return artist.reduce((acc, cur) => {
        acc.push(cur.name);
        return acc;
      }, []);
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
.recommend-swiper /deep/ .swiper-slide {
  position: relative;
  width: 90%;
  padding: 0 1.5%;
  margin-top: 6px;
}

.swiper-img {
  height: 140px;
  border-radius: 6px;
}

.icon-youjiantou {
  font-size: 12px;
}
.home-newsong {
  &-tabs {
    display: flex;
    align-items: center;
    color: #999;
    &-name {
      font-size: 18px;
    }
    &-line {
      margin: 0 8px;
      height: 13px;
      width: 1px;
      background: #999;
    }
  }
  &-tab {
    display: flex;
    align-items: center;
  }
  &-active {
    color: #333;
  }
}
</style>
