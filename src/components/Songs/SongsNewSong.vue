<template>
  <div class="paddingtop90">
    <base-tabs
      :navList="topSongOptions"
      :active="active"
      :isFixed="true"
      :style="{
        top: '5rem'
      }"
      ref="tabRef"
      @tabs="handleSlide"
    />
    <base-swiper-items
      v-slot="{ index, data }"
      :index="index"
      :list="topSongOptions"
      :options="basicSwiperOptions"
      @slideChange="onSlideChange"
      @swiper="onSwiper"
    >
      <songs-new-song-list :ref="getRefs" :data="data" :index="index + 1" />
    </base-swiper-items>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import SongsNewSongList from './SongsNewSongList.vue';
import { topSongOptions, topSongMaps, basicSwiperOptions } from '@/utils';
import useSwiper from '@/composables/useSwiper';
import type { Tab } from '@/types';

interface Song {
  getSongs: (type: number | string) => void,
  flag: boolean,
}
export default defineComponent({
  name: 'SongsNewSong',
  components: { SongsNewSongList },
  setup() {
    const songs = ref<Song[]>([]);
    const tabRef = ref<Tab | null>(null);

    const {
      active,
      onSwiper,
      handleSlide,
      onSlideChange,
    } = useSwiper();
    const getRefs = (el) => {
      songs.value.push(el)
    }

    watch(active, (val) => {
      songs.value[val].flag && songs.value[val].getSongs(topSongMaps[val]);
    })
    onMounted(() => {
      songs.value[0].getSongs(7);
      (tabRef.value as Tab).init(0);
    })

    return {
      tabRef,
      active,
      topSongOptions,
      basicSwiperOptions,
      getRefs,
      onSwiper,
      handleSlide,
      onSlideChange,
    }
  },

});
</script>
