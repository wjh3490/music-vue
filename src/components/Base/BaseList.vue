<template>
  <div class="base-list-container">
    <slot />
    <ul class="base-list-main" :class="list.length % 3 == 2 ? 'base-list-last' : ''">
      <li
        v-for="(item, index) in list"
        :key="index"
        @click.stop="$emit('list', item, index)"
        class="base-list-item"
      >
        <div class="base-list-pic">
          <img v-lazy="item.picUrl" alt />
          <div class="base-list-mask">
            <div>
              <span class="iconfont icon-erji"></span>
              <span> {{ item.playCount | filterNum }} </span>
            </div>
            <span class="iconfont icon-bofang"></span>
          </div>
        </div>
        <p class="desc base-list-name clamp">{{ item.name }}</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'BaseList',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped lang="less">
.base-list {
  &-container {
    margin-top: 24px;
    padding: 0 15px;
  }
  &-main {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  &-last {
    &::after {
      content: '';
      width: 109px;
      margin-bottom: 20px;
    }
  }
  &-item {
    width: 109px;
    margin-bottom: 20px;
  }
  &-pic {
    position: relative;
    height: 109px;
    overflow: hidden;
    border-radius: 8px;
  }
  &-name {
    margin-top: 8px;
  }
  &-mask {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 4px;
    left: 0;
    width: 100%;
    color: #fff;
    padding: 0 8px;
  }
}
</style>
