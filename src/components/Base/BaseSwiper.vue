<template>
  <div>
    <swiper :options="options" style="margin: 0 20px">
      <swiperSlide> </swiperSlide>
    </swiper>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
export default {
  name: 'BaseSwiper',
  components: { swiper, swiperSlide },
  props: {
    options: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      swiperOptions: {
        effect: 'coverflow',
        slidesPerView: '3',
        spaceBetween: '-20%',
        centeredSlides: true,
        loop: true,
        loopSlides: 2,
        coverflowEffect: {
          rotate: 0, // 旋转的角度
          stretch: 0, // 拉伸   图片间左右的间距和密集度
          depth: 130, // 深度   切换图片间上下的间距和密集度
          modifier: 4, // 修正值 该值越大前面的效果越明显
          slideShadows: false,
        },
      },
    };
  },
};
</script>
<style lang="less" scoped></style>
