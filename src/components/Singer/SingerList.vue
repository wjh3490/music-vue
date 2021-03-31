<template>
  <swiperSlide class="swiper-item">
    <ul class="singer-main-wrap">
      <li
        v-for="(item, index) in singerList"
        :key="index"
        @click.stop="getSingerDetail(item)"
        class="singer-main-item"
      >
        <div class="singer-main-index">
          <span
            class="singer-main-nownum"
            :class="{ 'singer-main-top3': index <= 2 }"
            >{{ (index + 1) | formatIndex }}</span
          >
          <span class="singer-main-rank">
            <span
              class="iconfont"
              :class="(item.lastRank - index) | formatRank"
            ></span>
            <span class="singer-main-num"
              >&nbsp;{{ Math.abs(item.lastRank - index) }}</span
            >
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
    </ul></swiperSlide
  >
</template>
<script>
import { vGetSinger } from '@/api/singer';
import { mapMutations, mapGetters } from 'vuex';
import { swiperSlide } from 'vue-awesome-swiper';
export default {
  name: 'SingerList',
  components: { swiperSlide },
  data() {
    return {
      singerList: [],
    };
  },
  filters: {
    formatIndex(index) {
      return (index + '').padStart(2, '0');
    },
    formatRank(rank) {
      if (rank > 0) return ['icon-jiantou', 'rankRose'];
      if (rank < 0) return ['icon-jiantou', 'rankLose'];
      if (rank == 0) return ['icon-line', 'rankEqual'];
    },
  },
  computed: {
    ...mapGetters(['singer']),
  },
  methods: {
    async getSingers(type) {
      const {
        code,
        list: { artists },
      } = await vGetSinger(type);
      if (code === 200) this.singerList = Object.freeze(artists);
    },
    getSingerDetail(singer) {
      const _singer = {
        id: singer.id,
        singerPic: singer.picUrl,
        name: singer.name,
      };

      this.setSinger(_singer);
      this.$router.push(
        `/details/${singer.id}?singerPic=${singer.picUrl}&name=${singer.name}&componentName=SingerDetail`
      );
    },
    ...mapMutations(['setSinger']),
  },
};
</script>
<style lang="less" scoped>
.singer {
  &-main {
    &-wrap {
      padding-bottom: 80px;
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
