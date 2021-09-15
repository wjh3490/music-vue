<template>
  <div class="singer-container">
    <base-back title="歌单广场" />
    <base-tabs
      :navList="navList"
      :active="active"
      ref="tab"
      @tabs="handleSwiper"
      @change="handleChange"
    />
    <base-swiper-items
      v-slot="{ index }"
      :list="navList"
      :options="swiperOptions"
      @slideChange="onSlideChange"
      @swiper="onSwiper"
    >
      <play-list-recommend v-if="index === 0" :ref="el => { if (el) playlist[index] = el }" />
      <play-list-main v-else :ref="el => { if (el) playlist[index] = el }" />
    </base-swiper-items>
  </div>
</template>
<script lang="ts">
import {defineComponent, ref, onMounted, nextTick } from 'vue'
import PlayListMain from '@/components/PlayList/PlayListMain.vue';
import PlayListRecommend from '@/components/PlayList/PlayListRecommend.vue';
import { getPlaylist } from '@/api/playlist.js';
import { swiperOptions } from "./swiperItemsOptions";
export default defineComponent({
  name: 'PlayList',
  components: { PlayListMain, PlayListRecommend },
  setup() {
    const swiper = ref<any>(null);
    const onSwiper = (sw: Element) => {
      swiper.value = sw
    }
    const playlist = ref<any>([])
    const tab = ref<any>(null)

    const active = ref<number>(0);
    const onSlideChange = () => {
      active.value = swiper.value.activeIndex;
    };
    const handleChange = (index: number) => {
      const id = navList.value[index]['id'];
      playlist.value[index].getSingers(id)
    }
    const navList = ref([])
    const getList = async () => {
      const { tags } = await getPlaylist();
      navList.value = [{ name: '推荐', id: 100 }, ...tags];
      nextTick(() => {
        tab.value.init(0)
        playlist.value[0].getSingers()
      })
    }
    const handleSwiper = (index: number) => {
      if (active.value == index) return;
      swiper.value.slideTo(index, 200, false);
    }
    onMounted(getList)
    return {
      playlist,
      tab,
      active,
      swiperOptions,
      navList,
      onSwiper,
      onSlideChange,
      handleChange,
      handleSwiper,
      getList,
    };
  },
});
</script>
