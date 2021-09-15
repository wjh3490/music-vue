<template>
  <div class="rank">
    <base-back title="排行榜" :isFixed="true" />
    <div class="rank-wrap">
      <div class="rank-title">
        <strong>官方榜</strong>
      </div>
      <ul class="rank-items">
        <router-link
          v-for="(item, index) in ranks"
          :to="`/playlist/${item.id}?type=1`"
          tag="li"
          class="rank-item"
          :key="index"
        >
          <div class="rank-item-right">
            <p
              class="rank-item-track ellipsis"
              v-for="(track, index) in item.tracks"
              :key="track.first"
            >
              <b>{{ index + 1 }}.</b>
              {{ track.first }}
              <span class="rank-item-name">- {{ track.second }}</span>
            </p>
          </div>
          <div class="rank-item-left">
            <img :src="item.coverImgUrl" :alt="item.name" class="rank-img" />
          </div>
        </router-link>
      </ul>
    </div>

    <div class="others-wrap">
      <div v-for="item in others" :key="item.name" class="other-">
        <div class="others-title">
          <strong>{{ item.name }}</strong>
        </div>
        <div class="others-items">
          <router-link
            v-for="item1 in item.list"
            :key="item1.id"
            :to="`/playlist/${item1.id}?type=1`"
            class="others-item ellipsis"
          >
            <img :src="item1.coverImgUrl" alt class="others-img" />
            <p class="others-name ellipsis">{{ item1.name }}</p>
            <span class="others-updateFrequency ellipsis">
              {{
                item1.updateFrequency
              }}
            </span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

interface Track {
  first: string,
  second: string,
  updateFrequency: string,
  coverImgUrl: string
  name: string,
  id: number
}

interface Rank {
  id: number,
  coverImgUrl: string,
  name: string,
  tracks: Array<Pick<Track, 'first' | 'second'>>,
};

interface Other {
  name: string,
  id: number,
  list: Array<Omit<Track, 'first' | 'second'>>,
}

import { defineComponent, onMounted, ref } from "vue";
import { fetchRankList } from "@/api/rank";
export default defineComponent({
  name: "Rank",
  setup() {
    const others = ref<Other[]>([]);
    const ranks = ref<Rank[]>([]);
    const getList = async () => {
      const { list } = await fetchRankList();
      const rank = list.filter(
        <T extends "length">({ tracks }: { tracks: T }) => tracks?.length
      );
      ranks.value = rank || [];
      const index = list.findIndex(
        <T extends "length">({ tracks }: { tracks: T }) =>
          tracks && !tracks.length
      );
      others.value.push({ id: 1, name: "曲风榜", list: list.splice(index, 7) });
      others.value.push({ id: 2, name: "全球榜", list: list.splice(index, 9) });
      others.value.push({ id: 3, name: "精选榜", list: list.splice(index, 6) });
      others.value.push({ id: 4, name: "特色榜", list: list.splice(index) });
    };
    onMounted(getList);
    return {
      others,
      ranks,
    };
  },
});
</script>
<style scoped lang="less">
.rank {
  background: #f2f6fa;
  padding-bottom: 20px;
  padding-top: 65px;
  &-wrap {
    padding: 0 15px;
  }
  &-title {
    font-size: 16px;
  }

  &-item {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 15px;
    border-radius: 10px;
    overflow: hidden;
    &-left {
      width: 108px;
      height: 108px;
      overflow: hidden;
    }
    &-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 108px;
      padding: 15px;
      background-color: #fff;
    }
    &-name {
      color: #808080;
    }
    &-track {
      color: #000;
      width: 205px;
    }
  }
}

.others {
  &-wrap {
    padding: 0 15px;
  }
  &-img {
    width: 108px;
    height: 108px;
    border-radius: 10px;
  }
  &-title {
    font-size: 16px;
    margin-top: 15px;
  }
  &-items {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: center;
  }
  &-item {
    position: relative;
    width: 108px;
    margin-top: 15px;
  }
  &-updateFrequency {
    position: absolute;
    top: 3px;
    right: 3px;
    color: #fff;
    padding: 0px 6px;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.3);
    font-size: 12px;
  }
  &-name {
    text-align: center;
    margin-top: 8px;
  }
}
</style>
