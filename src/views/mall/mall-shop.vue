<template>
  <div class="mall-shop">
    <g-head-nav :isFixed="true" title="畅销榜" />
    <nav class="mall-shop-nav">
      <span
        class="mall-shop-nav-item"
        :class="{ 'mall-shop-nav-active': albumType === 0 }"
        @click="albumType = 0"
      >数字专辑榜</span>
      <span
        class="mall-shop-nav-item"
        :class="{ 'mall-shop-nav-active': albumType === 1 }"
        @click="albumType = 1"
      >数字单曲榜</span>
    </nav>
    <g-tabs-nav
      :navList="mallNavOptions"
      :active="active"
      ref="tabRef"
      @tabs="(index) => (active = index)"
      @change="(e) => (type = mallNavMaps[e])"
    />
    <ul class="singer-main-wrap">
      <li v-for="(item, index) in albums" :key="item.albumId" class="singer-main-item">
        <div class="singer-main-index">
          <span
            class="singer-main-nownum"
            :class="{ 'singer-main-top3': index <= 2 }"
          >{{ index + 1 }}</span>
          <span class="singer-main-rank">
            <span class="iconfont" :class="formatRank(item.rankIncr)"></span>
            <span class="singer-main-num">&nbsp;{{ item.rankIncr === 0 ? '' : item.rankIncr }}</span>
          </span>
        </div>
        <div class="singer-main-avatar">
          <img v-lazy="item.coverUrl" alt class="singer-main-img" />
        </div>
        <div class="singer-main-name">
          <span class="singer-main-singer">{{ item.albumName }}</span>
          <span class="singer-main-score">{{ item.artistName }}</span>
          <span class="singer-main-saleNum">已售{{ item.saleNum }}张</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watchEffect } from 'vue';
import { fetchAlbumSongsaleboard } from '@/api/album';
import { mallNavOptions, mallNavMaps, formatRank } from '@/utils';
import { Tab } from '@/types';

interface Album {
  saleNum: number,
  artistName: string,
  albumName: string,
  coverUrl: string,
  rankIncr: number,
  albumId: number,
}

export default defineComponent({
  name: 'MallShop',
  setup() {
    const albums = ref<Album[]>([]);
    const active = ref(0)
    const type = ref('daily')
    const albumType = ref(0);
    const tabRef = ref<Tab | null>(null)

    const getData = async () => {
      const { products } = await fetchAlbumSongsaleboard({
        type: type.value,
        albumType: albumType.value,
        limit: 10,
      });
      albums.value = products;
    };
    watchEffect(getData);
    onMounted(() => {
      (tabRef.value as Tab).init(0);
    })
    return {
      type,
      tabRef,
      albums,
      active,
      albumType,
      mallNavMaps,
      mallNavOptions,
      formatRank,
    }
  },
});
</script>
<style lang="less" scoped>
.mall-shop {
  padding: 6rem 0;
  &-nav {
    display: flex;
    border: 0.1rem solid #169af3;
    width: 24rem;
    border-radius: 30px;
    justify-content: space-between;
    margin: 0 auto;
    &-item {
      font-size: 16px;
      padding: 0.4rem 0;
      border-radius: 14px;
      width: 50%;
      text-align: center;
      color: #169af3;
    }
    &-active {
      background-color: #169af3;
      color: #fff;
    }
  }
}

.singer {
  &-main {
    &-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
    }
    &-img {
      width: 8rem;
      height: 8rem;
      border-radius: 8px;
    }
    &-index {
      width: 5.5rem;
      display: flex;
      flex-direction: column;
      font-size: 18px;
    }
    &-name {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 1.5rem;
    }
    &-score,
    &-saleNum {
      margin-top: 0.6rem;
      color: #999;
    }
    &-singer {
      font-size: 16px;
    }
    &-nownum {
      color: #999;
      font-size: 18px;
      text-align: center;
    }
    &-rank {
      display: flex;
      align-items: center;
      margin-top: 0.4rem;
      justify-content: center;
    }
    &-top3 {
      color: #169af3;
      font-size: 26px;
    }
    &-num {
      font-size: 12px;
      color: #999;
    }
  }
}
.rankRose {
  color: #ff3a3a;
  font-size: 12px;
}
.rankLose {
  color: #169af3;
  font-size: 12px;
  transform: rotate(180deg);
}
.rankEqual {
  font-size: 12px;
  transform: scale(0.7);
  color: #999;
}
</style>
