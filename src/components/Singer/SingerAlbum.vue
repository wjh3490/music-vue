<template>
  <div
    class="singer-album"
    :class="active == 1 ? 'auto-height' : 'fixed-height'"
  >
    <ul class="singer-album-wrap">
      <router-link
        tag="li"
        :to="`/album/${item.id}`"
        v-for="item in albums"
        :key="item.id"
        class="singer-album-item"
      >
        <div class="singer-album-left">
          <img v-lazy="item.picUrl" alt="" class="singer-album-figure" />
        </div>
        <div class="singer-album-right">
          <p class="singer-album-name ellipsis">{{ item.name }}</p>
          <p class="singer-album-publishTime">
            <span>{{ item.publishTime | parseTime('{y}-{m}-{d}') }}</span>
            <span class="singer-album-size">{{ item.size }}首</span>
          </p>
        </div>
        <span class="iconfont icon-youjiantou"></span>
      </router-link>
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
  padding-right: 10px;
  overflow-x: hidden;
  padding-bottom: 70px;
  &-item {
    display: flex;
    margin-bottom: 10px;
    align-items: center;
    justify-content: space-between;
  }
  &-left {
    width: 60px;
    height: 60px;
    margin-right: 15px;
    border-radius: 6px;
    overflow: hidden;
  }
  &-right {
    flex: 1;
  }
  &-figure {
    width: 60px;
    height: 60px;
  }
  &-name {
    font-size: 16px;
  }
  &-publishTime {
    margin-top: 4px;
    color: #888;
    font-size: 13px;
    display: flex;
    align-items: center;
  }
  &-size {
    margin-left: 10px;
  }
}
.auto-height {
  height: auto;
}
.fixed-height {
  height: calc(100vh - 50px);
}
</style>
