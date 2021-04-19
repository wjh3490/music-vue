<template functional>
  <section class="mall-area">
    <slot />
    <div class="mall-area-wrap">
      <div
        class="mall-area-item"
        v-for="item in props.list"
        :key="item.albumId"
      >
        <figure class="mall-area-figure" :class="props.className">
          <img class="mall-area-pic" v-lazy="item.coverUrl" alt="" />
        </figure>
        <p class="mall-area-name ellipsis">{{ item.albumName }}</p>
        <p class="mall-area-artist ellipsis">{{ item.artistName }}</p>
        <p class="mall-area-price ellipsis">¥ {{ item.price }}</p>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'MallArea',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    className: {
      type: String,
      default: 'mall-area-dystyle',
    },
  },
};
</script>
<style lang="less" scoped>
.mall-area {
  &-wrap {
    display: flex;
    padding: 0 14px;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  &-item {
    margin-top: 12px;
  }
  &-figure {
    background: url('../../assets/imgs/type_cd.png') no-repeat;
    background-position: right center;
    box-sizing: content-box;
    overflow: hidden;
  }
  &-dystyle {
    width: 95px;
    padding-right: 15px;
    height: 95px;
    background-size: 90px 90px;
  }
  &-pic {
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
  &-name {
    margin-top: 6px;
    width: 100px;
  }
  &-artist {
    color: #999;
    width: 100px;
  }
  &-price {
    color: #c20c0c;
    width: 100px;
  }
}
</style>
