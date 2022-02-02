<template>
  <div class="recommend">
    <home-search />
    <!-- 轮播图 -->
    <g-swiper-items v-slot="{ data }" :list="swiperList" :options="homeSwiperOptions">
      <home-swiper-content :content="data" />
    </g-swiper-items>
    <!-- 导航栏 -->
    <navigation :navList="homeNavOptions" />
    <!-- 推荐歌单 -->
    <g-card title="推荐歌单" to="/playlist">
      <home-list :list="personalized" />
    </g-card>
    <!-- 排行榜 -->
    <g-card title="排行榜" to="/rank">
      <g-swiper-items
        v-slot="{ data, index }"
        :list="toplists"
        :options="topListSwiperOptions"
        model="id"
      >
        <home-top-list :data="data" :index="index" />
      </g-swiper-items>
    </g-card>
    <!--  新歌  新碟  数字专辑  -->
    <g-card :to="tabLinkMaps[activeTab]">
      <template #title>
        <status-tabs
          :list="hometabOptions"
          :active="activeTab"
          :normal-style="{
            color: '#999',
            fontSize: '1.6rem',
            fontWeight: 700
          }"
          active-color="#333"
          @change="handleTabChange"
        />
      </template>
      <g-swiper-items
        v-for="item in multipleList"
        v-show="item.type === activeTab"
        v-slot="{ data }"
        :key="item.type"
        :list="item.list"
        :options="topListSwiperOptions"
        model="id"
      >
        <home-new-song :data="data" :type="item.type" />
      </g-swiper-items>
    </g-card>
    <!-- 独家放送  -->
    <g-card title="独家放送">
      <home-list :list="videos" />
    </g-card>
    <!-- 电台  -->
    <g-card :show-more="false">
      <template #title>
        <div class="home-newsong-tabs">
          <h3 class="home-newsong-active">广播电台</h3>
          <span class="home-newsong-tabs-line"></span>
          <h3>24小时播客</h3>
        </div>
      </template>
      <home-list :list="list" round v-if="list.length" />
    </g-card>
    <!-- 热门MV  -->
    <g-card title="热门MV">
      <home-list :list="mvs" />
    </g-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { fetchBanner, fetchNewsong } from "@/api/recomment";
import { fetchRankList } from "@/api/rank";
import { fetchNewAlbumset, fetchAlbumList } from "@/api/album";
import useBatch from "@/composables/home/useBatch";
import dialog from '@/components/common/Dialog/index'
import toast from '@/components/common/Toast/index'
import {
  homeNavOptions,
  homeSwiperOptions,
  topListSwiperOptions,
  tabLinkMaps,
  hometabOptions,
  splitList,
  arrayToString
} from '@/utils'
import Navigation from '@/components/common/Navigation.vue';
import StatusTabs from '@/components/common/StatusTabs.vue'
import HomeSearch from "@/components/Home/HomeSearch.vue";
import HomeTopList from "@/components/Home/HomeTopList.vue";
import HomeNewSong from "@/components/Home/HomeNewSong.vue";
import HomeList from "@/components/Home/HomeList.vue";
import HomeSwiperContent from "@/components/Home/HomeSwiperContent.vue";
interface multipleType {
  list: Array<{ [key: string]: string | number }>;
  type: string;
};
interface Item {
  id: number;
  name: string;
  picUrl: string;
  artists: string;
  album?: string;
  song?: { [key: string]: any }
};

export default defineComponent({
  name: "Home",
  components: {
    StatusTabs,
    Navigation,
    HomeSearch,
    HomeTopList,
    HomeNewSong,
    HomeList,
    HomeSwiperContent,
  },
  setup() {
    const swiperList = ref([]);
    const toplists = ref([]);
    const activeTab = ref<any>("song");
    const multipleList = ref<multipleType[]>([]);

    const state = useBatch();
    const getBanners = async () => {
      const { banners } = await fetchBanner();
      swiperList.value = banners;
    };
    const getTopList = async () => {
      const { list } = await fetchRankList();
      const toplist = list.filter((item) => item.tracks?.length);
      toplists.value = toplist;
    };
    const getItem = (
      id: number,
      name: string,
      picUrl: string,
      artists: string,
      album: string
    ): Item =>
    ({
      id,
      name,
      picUrl,
      artists: Array.isArray(artists) ? arrayToString(artists) : artists,
      album
    })
    const getAlbums = async () => {
      const { albums } = await fetchNewAlbumset({ limit: 6 });
      const list = albums.slice(0, 6).reduce((acc: Array<Item>, cur: any) => {
        const { id, name, picUrl, artists } = cur;
        acc.push(getItem(id, name, picUrl, artists, ''))
        return acc;
      }, []);
      multipleList.value.push({ list: splitList(list, 3), type: "album", });
    };
    const getDigitalAlbums = async () => {
      const { products } = await fetchAlbumList({ limit: 9 });
      const list = products.reduce((acc: Array<Item>, cur: any) => {
        const { albumId, albumName, coverUrl, artistName } = cur;
        acc.push(getItem(albumId, albumName, coverUrl, artistName, ''));
        return acc;
      }, []);
      multipleList.value.push({ list: splitList(list, 3), type: "digitalbum", });
    };
    const getNewsongs = async () => {
      const { result } = await fetchNewsong({ limit: 12, offset: 1 });
      const list = result.reduce((acc: Array<Item>, cur: any) => {
        const { id, name, picUrl, song } = cur;
        acc.push({ ...getItem(id, name, picUrl, song.artists, song?.album?.name), song });
        return acc;
      }, []);
      multipleList.value.push({ list: splitList(list, 3), type: "song", });
    };
    const handleTabChange = (id: string): void => {
      activeTab.value = id;
    };
    onMounted(() => {
      getBanners();
      getTopList()
      getAlbums()
      getDigitalAlbums()
      getNewsongs()
    });
    return {
      homeSwiperOptions,
      topListSwiperOptions,
      hometabOptions,
      swiperList,
      tabLinkMaps,
      activeTab,
      multipleList,
      homeNavOptions,
      handleTabChange,
      toplists,
      ...state,
    };
  },
});
</script>
<style lang="less" scoped>
.recommend {
  padding-bottom: 70px;
}
.recommend-swiper {
  margin-top: 20px;
}
.recommend &:deep(.swiper-slide) {
  position: relative;
  width: 90% !important;
  padding: 0 1.5%;
  margin-top: 6px;
}

.icon-youjiantou {
  font-size: 12px;
}
.home-newsong {
  &-tabs {
    display: flex;
    align-items: center;
    color: #999;
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
