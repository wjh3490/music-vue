<template>
  <swiper v-bind="options">
    <swiper-slide v-for="(item, index) in list" :key="item[keyValue] || index">
      <slot :data="item" :index="index"/>
    </swiper-slide>
  </swiper>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { Lazy, Autoplay, Pagination, EffectCoverflow } from "swiper";
import "swiper/swiper-bundle.min.css";
SwiperCore.use([Lazy, Autoplay, Pagination, EffectCoverflow]);
export default defineComponent({
  name: "GSwiperItems",
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    list: {
      type: Array as PropType<any>,
      default: () => [],
    },
    options: {
      type: Object,
      default: () => { },
    },
    keyValue: {
      type: String,
      default: "id",
    },
  },
});
</script>
