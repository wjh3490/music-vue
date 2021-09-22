<template>
  <g-head-nav title="歌单广场" />
  <g-tabs-nav
    :navList="navList"
    :active="active"
    ref="tab"
    @tabs="handleSwiper"
    @change="handleChange"
  />
  <g-swiper-items
    v-slot="{ index }"
    :list="navList"
    :options="basicSwiperOptions"
    @slideChange="onSlideChange"
    @swiper="onSwiper"
  >
    <play-list-recommend v-if="index === 0" :ref="el => { if (el) playlist[index] = el }" />
    <play-list-main v-else :ref="el => { if (el) playlist[index] = el }" />
  </g-swiper-items>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, nextTick } from 'vue'
import { fetchPlaylist } from '@/api/playlist';
import { basicSwiperOptions } from "@/utils";
import PlayListMain from '@/components/PlayList/PlayListMain.vue';
import PlayListRecommend from '@/components/PlayList/PlayListRecommend.vue';
export default defineComponent({
  name: 'PlayList',
  components: { PlayListMain, PlayListRecommend },
  setup() {
    const active = ref<number>(0);
    const swiper = ref<any>(null);
    const playlist = ref<any>([])
    const tab = ref<any>(null);
    const navList = ref<any[]>([]);

    const onSwiper = (sw: Element) => {
      swiper.value = sw
    }
    const onSlideChange = () => {
      active.value = swiper.value.activeIndex;
    };
    const handleChange = (index: number) => {
      const id = navList.value[index]['id'];
      playlist.value[index].getSingers(id)
    }
    const getList = async () => {
      const { tags } = await fetchPlaylist();
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
      basicSwiperOptions,
      navList,
      onSwiper,
      onSlideChange,
      handleChange,
      handleSwiper,
    };
  },
});
</script>
