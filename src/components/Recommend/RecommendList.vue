<template>
  <div class="recommend-list-container">
    <h3 class="recommend-list-title">{{ title }}</h3>
    <ul class="recommend-list-main">
      <li
        v-for="(item, index) in newsongs"
        :key="index"
        @click.stop="$emit('list', item, index)"
        class="recommend-list-item"
      >
        <div class="recommend-list-pic">
          <img v-lazy="item.picUrl" alt />
          <div class="recommend-list-mask" v-if="item.playCount">
            {{ item.playCount | filterNum }} 在听
          </div>
        </div>
        <p class="desc recommend-name clamp">{{ item.name }}</p>
        <p class="recommend-name">{{ item.singer }}</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'RecommendList',
  filters: {
    filterNum(val) {
      let num;
      if (val >= 10000) {
        num = `${(val / 10000).toFixed(1)}万`;
      }
      if (val >= 100000000) {
        num = `${(val / 100000000).toFixed(1)}亿`;
      }
      return num;
    },
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    newsongs: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped lang="less">
@base: 37.5rem;
.recommend-list {
  &-title {
    padding: 3% 0;
    padding-left: 7/4%;
  }
  &-main {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }
  &-item {
    width: 31%;
    height: 100%;
    padding: 7/4% 0;
    border-radius: 6 / @base;
  }
  &-pic {
    position: relative;
  }
  &-mask {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 22 / @base;
    line-height: 22 / @base;
    background: rgba(0, 0, 0, 0.5);
    color: #ccc;
    text-align: center;
  }
}
</style>
