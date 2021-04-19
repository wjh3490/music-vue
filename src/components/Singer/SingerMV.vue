<template>
  <div class="singer-mv" :class="active == 2 ? 'auto-height' : 'fixed-height'">
    <section class="singer-mv-section" v-for="item in mvs" :key="item.id">
      <div class="singer-mv-wrap">
        <div
          class="singer-mv-main"
          :style="{ backgroundImage: `url(${item.imgurl})` }"
        ></div>
        <div class="singer-mv-figure">
          <img :src="item.imgurl" alt="" class="singer-mv-img" />
          <span class="singer-mv-border"></span>
          <span class="singer-mv-border"></span>
          <span class="singer-mv-border"></span>
          <span class="singer-mv-border"></span>
        </div>
        <div class="singer-mv-desc">
          <span>{{ item.publishTime }}</span>
          <span>{{ (item.duration / 1000) | format }}</span>
        </div>
      </div>

      <div class="singer-mv-info">
        <p class="singer-mv-name ellipsis">
          {{ item.name }}
        </p>
        <p class="singer-mv-count">
          <span class="iconfont icon-erji"></span>
          {{ item.playCount | filterNum }}
        </p>
      </div>
    </section>
  </div>
</template>
<script>
import { queryArtistMv } from '@/api/singer';
export default {
  name: 'SingerMV',
  props: {
    active: {
      type: [String, Number],
      default: '0',
    },
  },
  data() {
    return {
      mvs: [],
    };
  },
  methods: {
    async getDetail() {
      const { code, mvs } = await queryArtistMv(this.$route.params.id);
      if (code == 200) this.mvs = mvs;
    },
  },
};
</script>
<style lang="less" scoped>
.singer-mv {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 15px;
  padding-bottom: 70px;
  &-section {
    width: 165px;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 2px 4px 0 rgba(95, 101, 105, 0.1);
    margin-bottom: 15px;
  }
  &-border {
    position: absolute;
    width: 10px;
    height: 10px;
    border: 2px solid #fff;
    border-bottom-width: 0px;
    border-right-width: 0px;
    border-radius: 2px;
    &:nth-of-type(1) {
      top: -1px;
      left: -1px;
    }
    &:nth-of-type(2) {
      top: -1px;
      right: -1px;
      transform: rotate(90deg);
    }
    &:nth-of-type(3) {
      right: -1px;
      bottom: -1px;
      transform: rotate(180deg);
    }
    &:nth-of-type(4) {
      left: -1px;
      bottom: -1px;
      transform: rotate(270deg);
    }
  }
  &-wrap {
    position: relative;
    height: 210px;
  }
  &-main {
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
    filter: blur(6px);
    background-size: 100% 100%;
    width: 165px;
    height: 210px;
    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3);
    }
  }
  &-figure {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    z-index: 999;
  }
  &-img {
    position: relative;
    z-index: 99;
    width: 150px;
    height: 80px;
  }
  &-desc {
    position: absolute;
    bottom: 10px;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    z-index: 99;
    color: #ccc;
    padding: 0 8px;
  }
  &-info {
    padding: 8px;
  }
  &-count {
    margin-top: 15px;
    color: #a7a3a3;
  }
}
.auto-height {
  height: auto;
}
.fixed-height {
  height: calc(100vh - 50px);
}
</style>
