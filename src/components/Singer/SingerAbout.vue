<template>
  <section class="singer-about-info" v-if="info.briefDesc">
    <h2>歌手资料</h2>
    <div class="singer-about-briefDesc">{{ info.briefDesc }}</div>
  </section>
  <section class="singer-about-represent" v-if="info.topicData.length">
    <h2>代表作品</h2>
    <div v-for="item in info.topicData" :key="item.id" class="singer-about-represent-item">
      <img v-lazy="item.coverUrl" alt class="singer-about-represent-left" />
      <div class="singer-about-represent-right">
        <p class="singer-about-represent-mainTitle">{{ item.mainTitle }}</p>
        <p class="singer-about-represent-tag ellipsis">标签: {{ item.tags.join(',') }}</p>
        <span class="singer-about-represent-read">
          {{ item.categoryName || '' }}, 阅读
          {{ filterNum(item.readCount) }}
        </span>
      </div>
    </div>
  </section>
  <section
    v-if="simiArtists.length"
    class="singer-about-samilar"
    @touchmove.stop
    @touchstart.stop
    @scroll.stop
  >
    <h2>相似歌手</h2>
    <div class="singer-about-samilar-main">
      <div class="singer-about-samilar-scroller">
        <ul class="singer-about-samilar-wrap">
          <li v-for="artist in simiArtists" :key="artist.id" class="singer-about-samilar-item">
            <router-link :to="{ name: 'SingerDetail', params: { id: artist.id } }">
              <img v-lazy="artist.img1v1Url" alt class="singer-about-samilar-figure" />
              <span class="singer-about-samilar-name">{{ artist.name }}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent, shallowReactive, toRefs, ref } from 'vue';
import { fetchArtistDesc, fetchArtistSimi } from '@/api/singer';
import { useRoute, RouteParams } from 'vue-router';
import { filterNum } from '@/utils';
interface Artists {
  coverUrl: string,
  mainTitle: string,
  categoryName: string,
  readCount: number,
  name: string,
  tags: [],
  id: number,
}
interface Info {
  topicData: Artists[], briefDesc: string
};
interface SimiArtists {
  img1v1Url: string,
  name: string,
  id: string,
}
export default defineComponent({
  name: 'SingerAbout',
  props: {
    active: {
      type: [String, Number],
      default: '0',
    },
  },
  setup(_, { expose }) {
    const route = useRoute();
    const flag = ref(true);
    const state: { simiArtists: SimiArtists[], info: Info } = shallowReactive({
      info: { topicData: [], briefDesc: '' },
      simiArtists: [],
    })
    const getSingerInfo = async (id: string) => {
      const { topicData, briefDesc } = await fetchArtistDesc(id);
      state.info = {
        topicData,
        briefDesc,
      }
    }
    const getSimiSinger = async (id: string) => {
      const { artists, } = await fetchArtistSimi(id);
      state.simiArtists = artists;
    }
    const getDetail = () => {
      const { id } = route.params as RouteParams;
      getSingerInfo(id as string);
      getSimiSinger(id as string);
      flag.value = false;

    }

    expose({ getDetail, flag });

    return {
      filterNum,
      ...toRefs(state)
    }
  },
});
</script>
<style lang="less" scoped>
.singer-about {
  &-briefDesc {
    color: #a59797f5;
    margin-top: 1rem;
    font-size: 14px;
  }
  &-samilar {
    margin-top: 2rem;
    &-main {
      height: 13.6rem;
      overflow: hidden;
      margin-top: 1rem;
    }
    &-scroller {
      height: 14.6rem;
      overflow-x: scroll;
    }
    &-wrap {
      margin-top: 1rem;
      white-space: nowrap;
      display: flex;
    }
    &-item {
      margin: 0 1.5rem;
      text-align: center;
    }
    &-name {
      display: inline-block;
      margin-top: 0.6rem;
      font-size: 14px;
    }
    &-figure {
      width: 8rem;
      height: 8rem;
      border-radius: 50%;
    }
  }
  &-represent {
    margin-top: 2rem;
    &-item {
      display: flex;
      align-items: center;
      margin-top: 1rem;
    }
    &-left {
      width: 10rem;
      height: 10rem;
      border-radius: 10px;
    }
    &-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 1.2rem;
    }
    &-mainTitle {
      font-size: 16px;
    }
    &-read {
      color: #a59797f5;
      font-size: 13px;
      margin-top: 0.5rem;
    }
    &-tag {
      width: 22rem;
      color: #a59797f5;
      margin-top: 0.5rem;
      font-size: 13px;
    }
  }
}
</style>
