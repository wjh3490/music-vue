<template>
  <base-back title="歌手榜" />
  <base-tabs
    :navList="countryOptions"
    :active="active"
    ref="tabRef"
    @tabs="handleSlide"
    @change="handleChange"
  />
  <base-swiper-items
    :list="countryOptions"
    :options="basicSwiperOptions"
    @slideChange="onSlideChange"
    @swiper="onSwiper"
  >
    <singer-list :ref="getRefs" />
  </base-swiper-items>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import SingerList from "@/components/Singer/SingerList.vue";
import useSwiper from '@/composables/useSwiper';
import { basicSwiperOptions, countryOptions } from '@/utils';

interface Detail {
  getSingers: (type: number) => void,
  flag: boolean
}
interface Tab {
  init: (time?: number) => void
}

export default defineComponent({
  name: "Singer",
  components: { SingerList },
  setup() {
    const tabRef = ref<Tab | null>(null)
    const singers = ref<Detail[]>([]);
    const {
      active,
      onSwiper,
      handleSlide,
      onSlideChange } = useSwiper();

    const handleChange = (index: number): void => {
      const id = countryOptions[index].id;
      singers.value[index].flag && singers.value[index].getSingers(id);
    }
    const getRefs = (el) => {
      singers.value.push(el)
    }
    onMounted(() => {
      singers.value[0].getSingers(1);
      (tabRef.value as Tab).init(0);
    })
    return {
      tabRef,
      active,
      countryOptions,
      basicSwiperOptions,
      getRefs,
      onSwiper,
      onSlideChange,
      handleChange,
      handleSlide
    };
  },
});
</script>

