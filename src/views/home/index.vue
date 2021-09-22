<template>
  <div class="recommend">
    <home-search />
    <!-- 轮播图 -->
    <g-swiper-items v-slot="{ data }" :list="swiperList" :options="homeSwiperOptions">
      <div class="recommend-swiper-wrap">
        <img v-lazy="data.imageUrl" class="swiper-lazy swiper-img" @click="gotoPath(data)" />
        <span
          class="recommend-swiper-title"
          :style="{ backgroundColor: colorsMaps[data.titleColor] }"
        >{{ data.typeTitle }}</span>
      </div>
      <div class="my-lazy-preloader"></div>
    </g-swiper-items>
    <!-- 导航栏 -->
    <navigation :navList="homeNavOptions"/>
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
        <div class="home-newsong-tabs" @click="handleTabChange">
          <h3 :class="{ 'home-newsong-active': activeTab === 'song' }" data-type="song">新歌</h3>
          <span class="home-newsong-tabs-line" @click.stop></span>
          <h3 :class="{ 'home-newsong-active': activeTab === 'album' }" data-type="album">新碟</h3>
          <span class="home-newsong-tabs-line" @click.stop></span>
          <h3
            :class="{ 'home-newsong-active': activeTab === 'digitalbum' }"
            data-type="digitalbum"
          >数字专辑</h3>
        </div>
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
        <home-new-song :data="data" @play="(id) => handlePlay(id, item.type)"/>
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
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { vGetBanner, vGetDetail } from "@/api/recomment.js";
import { fetchRankList } from "@/api/rank.js";
import HomeSearch from "@/components/Home/HomeSearch.vue";
import HomeTopList from "@/components/Home/HomeTopList.vue";
import HomeNewSong from "@/components/Home/HomeNewSong.vue";
import HomeList from "@/components/Home/HomeList.vue";
import Navigation from '@/components/common/Navigation.vue';
import useMultiple from "@/composables/home/useMultiple";
import useBatch from "@/composables/home/useBatch";
import { homeNavOptions, homeSwiperOptions, topListSwiperOptions, colorsMaps, tabLinkMaps } from '@/utils'

export default defineComponent({
  name: "Home",
  components: { Navigation, HomeSearch, HomeTopList, HomeNewSong, HomeList },
  setup() {
    const router = useRouter();
    const store = useStore();
    const swiperList = ref([]);
    const toplists = ref([]);
    const audio = document.getElementById('audio') as HTMLAudioElement;

    const { multipleList, activeTab, handleTabChange } = useMultiple();
    const state = useBatch();
    const getBanners = async () => {
      const { banners } = await vGetBanner();
      swiperList.value = banners;
    };
    const getTopList = async () => {
      const { list } = await fetchRankList();
      const toplist = list.filter((item) => item.tracks?.length);
      toplists.value = toplist;
    };
    const gotoPath = (path): void => {
      if (path.targetType == 1) {
          handlePlay(path.targetId);
      }
      if (path.targetType == 10) {
        router.push({ name: 'Album', params: { id: path.targetId } });
      }
    };
    const handlePlay = async (id: number, type: string) => {
      if(type !== 'song') return;
      const index = store.state.playList.findIndex((item) => item.id == id);
      if (index >= 0) {
        if (id == store.getters.currentSong.id) {
          store.commit('setPlaying', !store.state.playing)
          store.state.playing ? audio.play() : audio.pause();
        } else {
           store.commit('setCurrrentIndex', index)
        }
      } else {
        const { songs, privileges } = await vGetDetail(id);
        const song = {
          id: songs[0]['id'],
          name: songs[0]['name'],
          picUrl: songs[0]['al']['picUrl'],
          artists: songs[0]['ar'],
          album: songs[0]['al']['name'],
          alia: songs[0]['alia'],
          privilege: {
            pl: privileges[0]['pl'],
            fee: privileges[0]['fee'],
            flag: privileges[0]['flag'],
            maxbr: privileges[0]['maxbr'],
          },
        };
        store.commit('setPlay', [song, store.state.playList]);
        store.commit('setSequenceList', store.state.playList);
        store.commit('setCurrrentIndex', 0);
      }
    }
    
    onMounted(() => {
      getBanners();
      getTopList()
    });

    return {
      homeSwiperOptions,
      topListSwiperOptions,
      swiperList,
      colorsMaps,
      tabLinkMaps,
      activeTab,
      multipleList,
      homeNavOptions,
      handleTabChange,
      gotoPath,
      toplists,
      ...state,
      handlePlay,
    };
  },
});
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
.recommend &:deep(.swiper-slide) {
  position: relative;
  width: 90% !important;
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
