<template>
  <div class="singer-mv" :class="active == 2 ? 'auto-height' : 'fixed-height'">
    <section class="singer-mv-section" v-for="item in mvList" :key="item.id">
      <div class="singer-mv-wrap">
        <div class="singer-mv-main" :style="{ backgroundImage: `url(${item.imgurl})` }"></div>
        <div class="singer-mv-figure">
          <img :src="item.imgurl" alt class="singer-mv-img" />
          <span class="singer-mv-border"></span>
          <span class="singer-mv-border"></span>
          <span class="singer-mv-border"></span>
          <span class="singer-mv-border"></span>
        </div>
        <div class="singer-mv-desc">
          <span>{{ item.publishTime }}</span>
          <span>{{ formatTime((item.duration / 1000)) }}</span>
        </div>
      </div>

      <div class="singer-mv-info">
        <p class="singer-mv-name ellipsis">{{ item.name }}</p>
        <p class="singer-mv-count">
          <span class="iconfont icon-erji"></span>
          {{ filterNum(item.playCount) }}
        </p>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { fetchArtistMv } from '@/api/singer';
import { useRoute } from 'vue-router';
import { filterNum, formatTime } from '@/utils'
interface MV{
  id: number,
  imgurl: string,
  publishTime: number,
  duration: number,
  playCount: number,
  name: string,
}
export default defineComponent({
  name: 'SingerMV',
  props: {
    active: {
      type: [String, Number],
      default: '0',
    },
  },
  setup(_, { expose }) {
    const route = useRoute();
    const flag = ref(true)
    let mvList = ref<MV[]>([]);
    const getDetail = async () => {
      const { mvs } = await fetchArtistMv(route.params.id);
      mvList.value = mvs;
      flag.value = false;
    };
    expose({ getDetail, flag })
    return { mvList, formatTime, filterNum }
  },
});
</script>
<style lang="less" scoped>
.singer-mv {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 1.5rem;
  padding-bottom: 7rem;
  &-section {
    width: 16.5rem;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 2px 4px 0 rgba(95, 101, 105, 0.1);
    margin-bottom: 1.5rem;
  }
  &-border {
    position: absolute;
    width: 1rem;
    height: 1rem;
    border: 0.2rem solid #fff;
    border-bottom-width: 0px;
    border-right-width: 0px;
    border-radius: 2px;
    &:nth-of-type(1) {
      top: -0.1rem;
      left: -0.1rem;
    }
    &:nth-of-type(2) {
      top: -0.1rem;
      right: -0.1rem;
      transform: rotate(90deg);
    }
    &:nth-of-type(3) {
      right: -0.1rem;
      bottom: -0.1rem;
      transform: rotate(180deg);
    }
    &:nth-of-type(4) {
      left: -0.1rem;
      bottom: -0.1rem;
      transform: rotate(270deg);
    }
  }
  &-wrap {
    position: relative;
    height: 21rem;
  }
  &-main {
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
    filter: blur(6px);
    background-size: 100% 100%;
    width: 16.5rem;
    height: 21rem;
    &::after {
      content: "";
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
    width: 15rem;
    height: 8rem;
  }
  &-desc {
    position: absolute;
    bottom: 1rem;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    z-index: 99;
    color: #ccc;
    padding: 0 0.8rem;
  }
  &-info {
    padding: 0.8rem;
  }
  &-count {
    margin-top: 1.5rem;
    color: #a7a3a3;
  }
}
.auto-height {
  height: auto;
}
.fixed-height {
  height: calc(100vh - 5rem);
}
</style>
