<template>
  <ul class="singer-main-wrap">
    <li
      v-for="(item, index) in singerList"
      :key="item.id"
      @click.stop="getSingerDetail(item)"
      class="singer-main-item"
    >
      <div class="singer-main-index">
        <span
          class="singer-main-nownum"
          :class="{ 'singer-main-top3': index <= 2 }"
        >{{ formatIndex(index + 1) }}</span>
        <span class="singer-main-rank">
          <span class="iconfont" :class="formatRank(item.lastRank - index)"></span>
          <span class="singer-main-num">
            &nbsp;{{
              item.lastRank - index === 0 ? '' : Math.abs(item.lastRank - index)
            }}
          </span>
        </span>
      </div>
      <div class="singer-main-avatar">
        <img v-lazy="item.img1v1Url" alt class="singer-main-img" />
      </div>
      <div class="singer-main-name">
        <span class="singer-main-singer">{{ item.name }}</span>
        <span class="singer-main-score">
          <span class="iconfont icon-redu"></span>
          <span>&nbsp;{{ item.score }}</span>
        </span>
      </div>
    </li>
  </ul>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router';
import { vGetSinger } from '@/api/singer';
import { formatIndex, formatRank } from '@/utils';

interface Singer {
  id: number,
  lastRank: number,
  score: number,
  name: string,
  img1v1Url: string,
}
export default defineComponent({
  name: 'SingerList',
  setup(_, { expose }) {
    const store = useStore();
    const router = useRouter();
    const singerList = ref<Singer[]>([]);
    const flag = ref(true);

    const getSingers = async (type: number) => {
      const {
        list: { artists },
      } = await vGetSinger(type);
      singerList.value = Object.freeze(artists);
      flag.value = false;
    }
    const getSingerDetail = (singer: any) => {
      const _singer = {
        id: singer.id,
        singerPic: singer.picUrl,
        name: singer.name,
      };
      store.commit('setSinger', _singer);
      router.push({ name: 'SingerDetail', params: { id: singer.id } });
    }
    expose({ getSingers, flag });
    return {
      singerList,
      formatRank,
      formatIndex,
      getSingerDetail,
    }
  },
});
</script>
<style lang="less" scoped>
.singer {
  &-main {
    &-wrap {
      height: calc(100vh - 9.4rem);
      padding-top: 15px;
      padding-bottom: 80px;
      overflow-y: scroll;
      overflow-x: hidden;
      // padding-bottom: 80px;
    }
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
    &-score {
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
    }
    &-num {
      font-size: 12px;
      color: #999;
    }
  }
}
.swiper {
  height: calc(100vh - 40px);
}
.swiper-item {
  overflow-y: auto;
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
