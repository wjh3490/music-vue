<template>
  <div class="mall-shop">
    <BaseBack title="畅销榜" />
    <nav class="mall-shop-nav">
      <span
        class="mall-shop-nav-item"
        @click="handleChange('albumType', 0)"
        :class="{ 'mall-shop-nav-active': albumType == 0 }"
        >数字专辑榜</span
      >
      <span
        class="mall-shop-nav-item"
        @click="handleChange('albumType', 1)"
        :class="{ 'mall-shop-nav-active': albumType == 1 }"
        >数字单曲榜</span
      >
    </nav>
    <BaseTabs
      :navList="navList"
      :active="active"
      lineHeight="0.053rem"
      @change="(e) => handleChange('type', e)"
      @tabs="(index) => (active = index)"
      position="relative"
      top="0"
      ref="tabs"
    />
    <ul class="singer-main-wrap">
      <li
        v-for="(item, index) in albums"
        :key="index"
        @click.stop="getSingerDetail(item)"
        class="singer-main-item"
      >
        <div class="singer-main-index">
          <span
            class="singer-main-nownum"
            :class="{ 'singer-main-top3': index <= 2 }"
            >{{ index + 1 }}</span
          >
          <span class="singer-main-rank">
            <span class="iconfont" :class="formatRank(item.rankIncr)"></span>
            <span class="singer-main-num"
              >&nbsp;{{ item.rankIncr == 0 ? '' : item.rankIncr }}</span
            >
          </span>
        </div>
        <div class="singer-main-avatar">
          <img v-lazy="item.coverUrl" alt class="singer-main-img" />
        </div>
        <div class="singer-main-name">
          <span class="singer-main-singer">{{ item.albumName }}</span>
          <span class="singer-main-score">
            {{ item.artistName }}
          </span>
          <span class="singer-main-saleNum">已售{{ item.saleNum }}张</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { getAlbumSongsaleboard } from '@/api/album';
export default {
  name: 'MallShop',
  data() {
    return {
      albums: [],
      active: 0,
      type: 'daily',
      albumType: 0,
      navList: [
        { id: 'daily', name: '日榜' },
        { id: 'week', name: '周榜' },
        { id: 'year', name: '2021年榜' },
        { id: 'total', name: '总榜' },
      ],
    };
  },
  mounted() {
    this.$refs.tabs.init();
    this.handleChange('daily', 0);
  },
  filters: {
    formatIndex(index) {
      return (index + '').padStart(2, '0');
    },
  },
  methods: {
    async handleChange(type, index) {
      if (type == 'type') {
        this.type = this.navList[index]['id'];
      } else {
        this.albumType = index;
      }
      const { products, code } = await getAlbumSongsaleboard({
        type: this.type,
        albumType: this.albumType,
        limit: 10,
      });
      if (code == 200) this.albums = products;
    },
    formatRank(rank) {
      if (rank > 0) return ['icon-jiantou', 'rankRose'];
      if (rank < 0) return ['icon-jiantou', 'rankLose'];
      if (rank == 0) return ['icon-line', 'rankEqual'];
    },
  },
};
</script>
<style lang="less" scoped>
.mall-shop {
  padding: 60px 0;
  &-nav {
    display: flex;
    border: 1px solid #169af3;
    width: 240px;
    border-radius: 30px;
    justify-content: space-between;
    margin: 0 auto;
    &-item {
      font-size: 16px;
      padding: 4px 0;
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
      margin-top: 10px;
    }
    &-img {
      width: 80px;
      height: 80px;
      border-radius: 8px;
    }
    &-index {
      width: 55px;
      display: flex;
      flex-direction: column;
      font-size: 18px;
    }
    &-name {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 15px;
    }
    &-score,
    &-saleNum {
      margin-top: 6px;
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
      margin-top: 4px;
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
