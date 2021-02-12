<template>
  <div class="swiper">
    <swiper :options="swiperOptions" v-if="swiperList.length > 0">
      <swiper-slide
        v-for="(item, index) in swiperList"
        :key="index"
        class="sw"
        :data-id="item.targetId"
      >
        <img :data-src="item.imageUrl" class="swiper-lazy swiper-img" />
        <div class="my-lazy-preloader"></div>
      </swiper-slide>

      <div
        class="swiper-pagination"
        slot="pagination"
        v-for="(item, index) in swiperList"
        :key="index"
      ></div>
    </swiper>
  </div>
</template>

<script>
/*eslint-disable */
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';

export default {
  name: 'Swiper',
  components: {
    swiper,
    swiperSlide,
  },
  props: {
    swiperList: Array,
    swiperOptions: Object,
  },
};
</script>
<style scoped lang="less">
@color: #169af3;
@base: 37.5rem;
.my-lazy-preloader {
  background: url('../../assets/imgs/default.jpg') center;
  background-size: 100%;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
}
.swiper {
  background-color: @color;
}
.swiper /deep/ .swiper-slide {
  position: relative;
  width: 90%;
  padding: 0 1.5%;
  margin-top: 6 / @base;
}
.swiper /deep/ .swiper-pagination-bullet {
  background: #f1f1f1;
}
.swiper /deep/ .swiper-pagination-bullet-active {
  background: @color;
}
.swiper .swiper-img {
  height: 140 / @base;
  border-radius: 6 / @base;
}
</style>
