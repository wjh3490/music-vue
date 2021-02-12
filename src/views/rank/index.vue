<template>
  <div class="rank">
    <BaseNav />
    <ul class="rank-list">
      <li
        v-for="(item, index) in rankList"
        :key="index"
        @click.stop="getRankSongs(item)"
        class="rank-item"
      >
        <div class="pic">
          <img v-lazy="item.url" alt class="rank-img" />
        </div>
        <div class="desc">
          <h3>{{ item.name }}</h3>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  name: 'Rank',
  data() {
    return {
      rankList: [
        { name: '新歌榜', url: require('../../assets/imgs/1.jpg'), idx: 0 },
        { name: '国电榜', url: require('../../assets/imgs/2.jpg'), idx: 1 },
        { name: '说唱榜', url: require('../../assets/imgs/3.jpg'), idx: 2 },
        { name: '热歌榜', url: require('../../assets/imgs/4.jpg'), idx: 3 },
        { name: '原创榜', url: require('../../assets/imgs/5.jpg'), idx: 4 },
        { name: '飙升榜', url: require('../../assets/imgs/6.jpg'), idx: 5 },
      ],
    };
  },

  methods: {
    getRankSongs(item) {
      this.setSinger({
        name: item.name,
        id: item.idx,
        singerPic: item.url,
      });
      this.$router.push(
        `/details/${item.idx}?singerPic=${item.url}&name=${item.name}&componentName=RankDetail`
      );
    },
    ...mapMutations(['setSinger']),
  },
};
</script>
<style scoped lang="less">
@base: 37.5rem;
.rank {
  background: #f2f3f4;
  .rank-list {
    .rank-item {
      display: flex;
      padding: 10 / @base;

      .pic {
        flex: 1;
        .rank-img {
          border-radius: 6 / @base;
        }
      }
      .desc {
        flex: 2;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
