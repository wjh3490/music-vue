<template>
  <swiper :options="options" ref="swiper" v-if="list.length > 0">
    <swiper-slide
      :data-id="item.targetId"
      v-for="(item, index) in list"
      :key="item.id"
      ref="swiperSlide"
    >
      <slot :data="item" :index="index" />
    </swiper-slide>

    <template v-if="visible">
      <div
        class="swiper-pagination"
        slot="pagination"
        v-for="(item1, index) in list"
        :key="index"
      ></div>
    </template>
  </swiper>
</template>
<script>
export default {
  name: 'BaseSwiper',
  props: {
    options: {
      type: Object,
      default: () => {},
    },
    list: {
      type: Array,
      default: () => [],
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    swiper() {
      return this.$refs.swiper.swiper;
    },
    swiperSlide() {
      return this.$refs.swiperSlide;
    },
  },
};
</script>
<style lang="less" scoped>
.my-lazy-preloader {
  background: url('../../assets/imgs/default.jpg') center;
  background-size: 100%;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
}
</style>
