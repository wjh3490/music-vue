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
        <div class="recommend-swiper-wrap" @click="handleAction(data)">
          <img
            :data-index="data.targetId"
            :data-src="data.imageUrl"
            class="swiper-lazy swiper-img"
          />
          <span
            class="recommend-swiper-title"
            :style="{ backgroundColor: colors[data.titleColor] }"
            >{{ data.typeTitle }}</span
          >
        </div>

        <div class="my-lazy-preloader"></div>
      </BaseSwiper>
    </div>
    <!-- 导航栏 -->
    <BaseNav />
    <!-- 推荐歌单 -->
    <HomeList :list="personalized" v-if="personalized.length">
      <HomeMore title="推荐歌单" link="/playlist" />
    </HomeList>
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
      @player="player"
      :palyStatus="palyStatus"
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
    <!-- 独家放送  -->
    <HomeList :list="videos">
      <HomeMore title="独家放送" link="" />
    </HomeList>
    <!-- 电台  -->
    <HomeList :list="list" round>
      <HomeMore>
        <div class="home-newsong-tabs">
          <div class="home-newsong-tab" v-for="tab in radio" :key="tab.tabIndex">
            <strong
              class="home-newsong-tabs-name"
              :class="{ 'home-newsong-active': activeRadio == tab.tabIndex }"
              >{{ tab.name }}</strong
            >
            <span
              class="home-newsong-tabs-line"
              v-if="tab.tabIndex != 2"
            ></span>
          </div>
        </div>
      </HomeMore>
    </HomeList>
    <!-- 热门MV  -->
    <HomeList :list="mvs" v-if="mvs.length">
      <HomeMore title="热门MV" link="" />
    </HomeList>
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
import { getVideos, getMVs, getDjs, getDjToplist } from '@/api/video';
import HomeTopList from '@/components/Home/HomeTopList';
import HomeMore from '@/components/Home/HomeMore';
import HomeNewSong from '@/components/Home/HomeNewSong';
import HomeList from '@/components/Home/HomeList';
import { splitList, getArtist } from '@/utils';
import { Song } from '@/utils/config';
export default {
  name: 'Home',
  components: {
    RecommendSearch,
    HomeTopList,
    HomeMore,
    HomeNewSong,
    HomeList,
  },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
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
      radio: [
        { tabIndex: 1, name: '广播电台' },
        { tabIndex: 2, name: '24小时播客' },
      ],
      activeTab: 1,
      activeRadio: 1,
      more: '更多新歌',
      link: '/songs/0',
      swiperList: [],
      personalized: [],
      newsong: [],
      toplists: [],
      albums: [],
      products: [],
      videos: [],
      mvs: [],
      djs: [],
      djToplist: [],
      list: [],
    };
  },

  computed: {
    palyStatus({ playing, currrenSong }) {
      return function(id) {
        if (currrenSong.id == id) {
          return playing ? 'icon-pause-full' : 'icon-bofang31';
        } else {
          return 'icon-bofang31';
        }
      };
    },
    ...mapGetters(['playList', 'playing', 'currrenSong']),
  },

  async created() {
    this.getSwiperList();
    this.getTopList();

    this.getNewsong();
    this.getNewAlbum();
    this.getAlbumList();

    this.Batchs();
    this.colors = {
      blue: '#169af3',
      red: '#ff3a3a',
    };
    this.$nextTick(() => (this.audio = document.getElementById('audio')));
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
    async getNewAlbum() {
      const { code, albums } = await getAlbumNewset({ limit: 6 });
      if (code == 200) {
        const list = albums.slice(0, 6).reduce((acc, cur) => {
          const { id, name, picUrl, artists } = cur;
          acc.push(
            new Song({
              id,
              name,
              picUrl,
              artists,
            })
          );
          return acc;
        }, []);
        this.albums = splitList(list, 3);
      }
    },
    async getAlbumList() {
      const { code, products } = await getAlbumList({ limit: 9 });

      if (code == 200) {
        const list = products.reduce((acc, cur) => {
          const { albumId, albumName, coverUrl, artistName } = cur;
          acc.push(
            new Song({
              id: albumId,
              name: albumName,
              picUrl: coverUrl,
              artists: [{ name: artistName }],
            })
          );
          return acc;
        }, []);
        this.products = splitList(list, 3);
      }
    },
    async getNewsong() {
      const { code, result } = await vGetNewsong({ limit: 30, offset: 1 });
      if (code == 200) {
        const list = result.reduce((acc, cur) => {
          const { id, name, picUrl, song } = cur;
          acc.push(
            new Song({
              id,
              name,
              picUrl,
              artists: song['artists'],
              album: song.album.name,
              privilege: {
                pl: song.privilege['pl'],
                fee: song.privilege['fee'],
                flag: song.privilege['flag'],
                maxbr: song.privilege['maxbr'],
              },
            })
          );
          return acc;
        }, []);
        this.newsong = splitList(list, 3);
      }
    },
    async Batchs() {
      const apis = [
        getDjs(),
        getDjToplist(),
        vGetPersonalized(),
        getVideos(),
        getMVs(),
      ];
      const res = await Promise.all(apis);
      this.djs = res[0]['djRadios'];
      this.djToplist = res[1]['toplist'];
      this.personalized = res[2]['result'];
      this.videos = res[3]['result'];
      this.mvs = res[4]['data'].map((item) => ({
        picUrl: item.cover,
        name: item.name,
      }));
      this.list = res[0]['djRadios'];
    },
    async player(id) {
      const index = this.playList.findIndex((item) => item.id == id);
      if (index >= 0) {
        if (id == this.currrenSong.id) {
          this.setPlaying(!this.playing);
          this.playing ? this.audio.play() : this.audio.pause();
        } else {
          this.setCurrrentIndex(index);
        }
      } else {
        const { songs, privileges } = await vGetDetail(id);
        const song = {
          id: songs[0]['id'],
          name: songs[0]['name'],
          picUrl: songs[0]['al']['picUrl'],
          artists: songs[0]['ar'],
          album: songs[0]['al']['name'],
          alia: songs[0]['alia'].join(''),
          privilege: {
            pl: privileges[0]['pl'],
            fee: privileges[0]['fee'],
            flag: privileges[0]['flag'],
            maxbr: privileges[0]['maxbr'],
          },
        };
        this.setPlay([new Song(song), ...this.playList]);
        this.setSequenceList(this.playList);
        this.setCurrrentIndex(0);
      }
    },
    handleAction(obj) {
      if (obj.targetType == 1) {
        this.player(obj.targetId);
      }
      if (obj.targetType == 10) {
        this.$router.push(`/album/${obj.targetId}`);
      }
    },
    handleChange(tab) {
      if (tab.tabIndex == this.activeTab) return;
      this.activeTab = tab.tabIndex;
      this.more = tab.more;
      this.link = tab.link;
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
.recommend {
  padding-bottom: 70px;
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
}
.recommend-swiper {
  &-wrap {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
  }
  &-title {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 1px 6px;
    color: #fff;
    border-radius: 8px 0 0 0;
  }
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
