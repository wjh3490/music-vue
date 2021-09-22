<template>
  <div class="mall padding60 paddingtop60">
    <g-head-nav :isFixed="true" title="数字专辑" />
    <navigation :navList="mallNavOptions" type="primary" />

    <g-card title="最新上架">
      <mall-area :list="news" />
    </g-card>

    <g-card v-for="num in 2" :title="num === 1 ? '数字专辑榜' : '数字单曲榜'" :key="'t' + num">
      <g-swiper-items
        v-slot="{ data, index }"
        :list="num === 1 ? albums : songs"
        :options="{
          watchSlidesVisibility: true,
          centeredSlides: true,
          slidesPerView: 'auto',
        }"
      >
        <mall-album :list="data" :num="index" />
      </g-swiper-items>
      <template #right>
        <div class="mall-rank">
          <template v-for="(item, index) in mallOptions" :key="'s'+item.time">
            <span
              :class="{ 'mall-rank-active': (num === 1 ? albumActive : songActive) === item.time }"
              @click="handleChange(item.time, num)"
            >{{ item.rank }}</span>
            <span v-if="index !== 2" class="mall-rank-line"></span>
          </template>
        </div>
      </template>
    </g-card>

    <g-card v-for="item in list" :title="item.title" :key="item.title">
      <mall-area :list="item.albums" />
    </g-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
import {
  fetchAlbumList,
  fetchAlbumListStyle,
  fetchAlbumSongsaleboard,
} from '@/api/album';
import MallAlbum from '@/components/Mall/MallAlbum.vue';
import MallArea from '@/components/Mall/MallArea.vue';
import Navigation from '@/components/common/Navigation.vue';
import { mallNavOptions, mallOptions, nameMaps, splitList } from '@/utils'

interface Mall {
  title: string,
  albums: any[],
}

export default defineComponent({
  name: 'Mall',
  components: { Navigation, MallAlbum, MallArea },
  setup() {
    const albumActive = ref('daily');
    const songActive = ref('daily');
    const list = ref<Mall[]>([]);
    const state = reactive({
      albums: [],
      songs: [],
      news: [],
    });
    const fetchAlbumsList = async (type = 'daily', albumType = 0) => {
      const { products } = await fetchAlbumSongsaleboard({
        type,
        albumType,
        limit: 3,
      });
      state.albums = splitList(products.slice(0, 12), 4);
    }
    const getSongsList = async (type = 'daily', albumType = 1) => {
      const { products } = await fetchAlbumSongsaleboard({
        type,
        albumType,
        limit: 12,
      });
      state.songs = splitList(products.slice(0, 12), 4);
    }
    const fetchAlbumStyle = async () => {
      const apis = [
        fetchAlbumListStyle({ area: 'Z_H', limit: 3 }),
        fetchAlbumListStyle({ area: 'E_A', limit: 3 }),
        fetchAlbumListStyle({ area: 'KR', limit: 3 }),
        fetchAlbumListStyle({ area: 'JP', limit: 3 }),
      ];
      const data = await Promise.all(apis);
      data.forEach(({ albumProducts }, index: number) => {
        list.value.push({ title: nameMaps[index], albums: albumProducts } as Mall)
      })
    }
    const getNewAblums = async () => {
      const { products } = await fetchAlbumList({ limit: 6 });
      state.news = products
    }
    const handleChange = (type: string, albumType: number) => {
      if (albumType === 1) {
        if (albumActive.value === type) return;
        fetchAlbumsList(type, albumType - 1);
        albumActive.value = type;
      } else {
        if (songActive.value === type) return;
        getSongsList(type, albumType - 1);
        songActive.value = type;
      }
    }
    onMounted(() => {
      fetchAlbumsList();
      getSongsList();
      fetchAlbumStyle();
      getNewAblums()
    })
    return {
      list,
      songActive,
      albumActive,
      mallOptions,
      mallNavOptions,
      ...toRefs(state),
      handleChange
    }
  },
});
</script>

<style lang="less" scoped>
.mall {
  &:deep(.swiper-slide) {
    width: 35rem !important;
  }
  &:deep(.mall-area-item) {
    &:nth-child(n + 4) {
      margin-top: 1.2rem;
    }
  }
  &-rank {
    display: flex;
    align-items: center;
    font-size: 15px;
    &-line {
      height: 1rem;
      width: 0.1rem;
      background-color: #999;
      margin: 0 0.6rem;
    }
    &-active {
      color: #169af3;
    }
  }
  &-nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    &-item {
      text-align: center;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    &-title {
      margin-top: 0.6rem;
    }
    &-icon {
      display: block;
      text-align: center;
      line-height: 5rem;
      width: 5rem;
      height: 5rem;
      border-radius: 50%;
      background-color: #169af3;
      color: #fff;
      font-size: 24px;
      box-shadow: 0 0.6rem 0.6rem 0 rgba(22, 154, 243, 0.3);
    }
  }
}
</style>
