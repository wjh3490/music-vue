<template>
  <section class="home-toplist">
    <router-link
      :to="`/playlist/${data.id}?type=1`"
      class="home-toplist-main"
      :style="{ backgroundColor: colorsRankMaps[index] }"
    >
      <img :src="data.coverImgUrl" alt class="home-toplist-figure" />
      <div class="home-toplist-songs">
        <div class="home-toplist-title">
          <b class="home-toplist-name">{{ data.name }}</b>
          _
          {{ data.updateFrequency }}
        </div>
        <div class="home-toplist-song-wrap">
          <div
            class="ellipsis home-toplist-song"
            v-for="(track, index) in data.tracks"
            :key="track.first"
          >
            <span class="home-toplist-song-rank">
              <b>0{{ index + 1 }}&nbsp;&nbsp;</b>
            </span>
            <span class="home-toplist-song-name">{{ track.first }}</span>
            -
            <span class="home-toplist-song=artist">{{ track.second }}</span>
          </div>
        </div>
      </div>
    </router-link>
  </section>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import { colorsRankMaps } from '@/utils'
interface HomeRank {
  id: number,
  coverImgUrl: string,
  name: string,
  updateFrequency: string,
  tracks: {
    first: string,
    second: string,
  }[]
}
export default defineComponent({
  name: "HomeTopList",
  props: {
    data: {
      type: Object as PropType<HomeRank>,
      default: () => { },
    },
    index: {
      type: [String, Number],
      default: 0,
    },

  },
  setup() {
    return { colorsRankMaps }
  }
});
</script>
<style scoped lang="less">
.home-toplist {
  &-main {
    display: flex;
    border-radius: 8px;
    overflow: hidden;
    background: #faefee;
    margin-right: 1rem;
  }
  &-name {
    font-size: 15px;
  }
  &-title {
    margin-bottom: 0.6rem;
  }
  &-songs {
    padding: 1rem 0;
    padding-right: 3rem;
    padding-left: 1rem;
    width: 22rem;
  }
  &-song {
    font-size: 14px;
    &-wrap {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 6rem;
    }
  }
  &-figure {
    width: 11rem;
    height: 11rem;
    border-radius: 0 8px 8px 0;
    box-shadow: 0 4px 4px 0 rgba(95, 101, 105, 0.6);
  }
}
</style>
