<template>
  <div
    class="singer-album"
    :class="active == 1 ? 'auto-height' : 'fixed-height'"
  >
    <ul class="singer-album-wrap">
      <li v-for="item in albums" :key="item.id" class="singer-album-item">
        <div class="singer-album-left">
          <img :src="item.picUrl" alt="" class="singer-album-figure" />
        </div>
        <div class="singer-album-right">
          <p class="singer-album-name">{{ item.name }}</p>
          <p class="singer-album-publishTime">{{ item.publishTime }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { queryArtistAlbum } from '@/api/singer';

export default {
  name: 'SingerAblum',
  props: {
    active: {
      type: [String, Number],
      default: '0',
    },
  },
  data() {
    return {
      albums: [],
    };
  },
  methods: {
    async getDetail() {
      const { hotAlbums } = await queryArtistAlbum(this.$route.params.id);
      this.albums = hotAlbums;
    },
  },
};
</script>

<style lang="less" scoped>
.singer-album {
  padding-left: 10px;
  overflow-x: hidden;
  &-item {
    display: flex;
    margin-bottom: 6px;
  }
  &-left {
    background: url('../../assets/imgs/digital-album.png') center right
      no-repeat;
    padding-right: 15px;
    background-size: 15px 100%;
  }
  &-figure {
    width: 60px;
    height: 60px;
  }
  &-name {
    font-size: 16px;
  }
  &-publishTime {
    margin-top: 7px;
    color: #888;
    font-size: 13px;
  }
}
.auto-height {
  height: auto;
}
.fixed-height {
  height: calc(100vh - 50px);
}
</style>
