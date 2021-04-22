<template>
  <div class="mall">
    <BaseBack title="数字专辑" />
    <nav class="mall-nav">
      <router-link to="/mall-shop" class="mall-nav-item">
        <span class="iconfont icon-icon mall-nav-icon"></span>
        <p class="mall-nav-title">畅销榜</p>
      </router-link>
      <router-link to="/mall-category" class="mall-nav-item">
        <span class="iconfont icon-category1 mall-nav-icon"></span>
        <p class="mall-nav-title">语种风格馆</p>
      </router-link>
      <div v class="mall-nav-item">
        <span class="iconfont icon-yigoumai mall-nav-icon"></span>
        <p class="mall-nav-title">已购</p>
      </div>
    </nav>
    <MallArea :list="news" v-if="news.length" key="news">
      <MallTitle title="最新上架" />
    </MallArea>

    <MallAlbum :list="albums" v-if="albums.length">
      <MallTitle title="数字专辑榜">
        <div class="mall-rank">
          <span
            :class="{ 'mall-rank-active': albumActive == 'daily' }"
            @click="handleChange('daily', 0)"
            >日榜</span
          >
          <span class="mall-rank-line"></span>
          <span
            :class="{ 'mall-rank-active': albumActive == 'week' }"
            @click="handleChange('week', 0)"
            >周榜</span
          >
          <span class="mall-rank-line"></span>
          <span
            :class="{ 'mall-rank-active': albumActive == 'total' }"
            @click="handleChange('total', 0)"
            >总榜</span
          >
        </div>
      </MallTitle>
    </MallAlbum>

    <MallAlbum :list="songs" v-if="songs.length">
      <MallTitle title="数字单曲榜">
        <div class="mall-rank">
          <span
            :class="{ 'mall-rank-active': songActive == 'daily' }"
            @click="handleChange('daily', 1)"
            >日榜</span
          >
          <span class="mall-rank-line"></span>
          <span
            :class="{ 'mall-rank-active': songActive == 'week' }"
            @click="handleChange('week', 1)"
            >周榜</span
          >
          <span class="mall-rank-line"></span>
          <span
            :class="{ 'mall-rank-active': songActive == 'total' }"
            @click="handleChange('total', 1)"
            >总榜</span
          >
        </div>
      </MallTitle>
    </MallAlbum>

    <MallArea :list="ZHList" v-if="ZHList.length" key="ZHList">
      <MallTitle :visible="false" title="华语新生力量" />
    </MallArea>
    <MallArea :list="EAList" v-if="EAList.length" key="EAList">
      <MallTitle :visible="false" title="欧美品质大碟" />
    </MallArea>
    <MallArea :list="KRList" v-if="KRList.length" key="KRList">
      <MallTitle :visible="false" title="韩国风向牌" />
    </MallArea>
    <MallArea :list="JPList" v-if="JPList.length" key="KRList">
      <MallTitle :visible="false" title="日本专辑推荐" />
    </MallArea>
  </div>
</template>
<script>
import {
  getAlbumSongsaleboard,
  getAlbumListStyle,
  getAlbumList,
} from '@/api/album';
import MallAlbum from '@/components/Mall/MallAlbum';
import MallTitle from '@/components/Mall/MallTitle';
import MallArea from '@/components/Mall/MallArea';
export default {
  name: 'Mall',
  components: { MallAlbum, MallTitle, MallArea },
  data() {
    return {
      albums: [],
      songs: [],
      albumActive: 'daily',
      songActive: 'daily',
      ZHList: [],
      EAList: [],
      KRList: [],
      JPList: [],
      news: [],
    };
  },
  created() {
    this.getAlbumsList();
    this.getSongsList();
    this.getAlbumStyle();
  },
  methods: {
    async getAlbumsList(type = 'daily', albumType = 0) {
      const { code, products } = await getAlbumSongsaleboard({
        type,
        albumType,
        limit: 3,
      });
      if (code == 200) {
        this.albums = this.splitList(products.slice(0, 12), 4);
      }
    },
    async getSongsList(type = 'daily', albumType = 1) {
      const { code, products } = await getAlbumSongsaleboard({
        type,
        albumType,
        limit: 12,
      });
      if (code == 200) {
        this.songs = this.splitList(products.slice(0, 12), 4);
      }
    },
    async getAlbumStyle() {
      const apis = [
        getAlbumListStyle({ area: 'Z_H', limit: 3 }),
        getAlbumListStyle({ area: 'E_A', limit: 3 }),
        getAlbumListStyle({ area: 'KR', limit: 3 }),
        getAlbumListStyle({ area: 'JP', limit: 3 }),
        getAlbumList({ limit: 6 }),
      ];
      const res = await Promise.all(apis);
      this.ZHList = res[0]['albumProducts'];
      this.EAList = res[1]['albumProducts'];
      this.KRList = res[2]['albumProducts'];
      this.JPList = res[3]['albumProducts'];
      this.news = res[4]['products'];
    },
    handleChange(type, albumType) {
      if (albumType == 0) {
        this.getAlbumsList(type, albumType);
        this.albumActive = type;
      } else {
        this.songActive = type;
        this.getSongsList(type, albumType);
      }
    },
    splitList(list, length) {
      let index = 0;
      let newArray = [];
      while (index < list.length) {
        newArray.push(list.slice(index, (index += length)));
      }
      return newArray;
    },
  },
};
</script>

<style lang="less" scoped>
.mall {
  padding-bottom: 60px;
  padding-top: 100px;
  &-rank {
    display: flex;
    align-items: center;
    font-size: 15px;
    &-line {
      height: 10px;
      width: 1px;
      background-color: #999;
      margin: 0 6px;
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
      margin-top: 6px;
    }
    &-icon {
      display: block;
      text-align: center;
      line-height: 50px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #169af3;
      color: #fff;
      font-size: 24px;
      box-shadow: 0 6px 6px 0 rgba(22, 154, 243, 0.3);
    }
  }
}
</style>
