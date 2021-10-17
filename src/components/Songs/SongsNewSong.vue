<template>
  <div class="paddingtop90">
    <g-tabs-nav
      :navList="topSongOptions"
      :active="active"
      :isFixed="true"
      :style="{
        top: '5rem'
      }"
      ref="tabRef"
      @tabs="handleSlide"
    />
    <g-swiper-items
      v-slot="{ index, data }"
      :index="index"
      :list="topSongOptions"
      :options="basicSwiperOptions"
      @slideChange="onSlideChange"
      @swiper="onSwiper"
    >
      <songs-new-song-list :ref="getRefs" :data="data" :index="index + 1" />
    </g-swiper-items>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import useSwiper from '@/composables/useSwiper';
import { topSongOptions, topSongMaps, basicSwiperOptions } from '@/utils';
import type { Tab } from '@/types';
import SongsNewSongList from './SongsNewSongList.vue';

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
      const _songs = songs.value
      _songs[val].flag && _songs[val].getSongs(topSongMaps[val]);
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
