<template>
  <g-head-nav :background="background" :title="name" isFixed color="#fff" />
  <singer-info :info="info" />
  <g-tabs-nav
    :navList="singerOptions"
    :active="active"
    :style="{
      position: 'sticky',
      top: '5rem',
    }"
    :lineStyle="{
      color: '#a7a3a3',
      backgroundColor: '#000',
      width: '45px',
      height: '2px',
    }"
    :count="info"
    ref="tabRef"
    @tabs="handleSlide"
    @change="handleChange"
  />

  <main class="detail-main">
    <g-swiper-items
      v-slot="{ data, index }"
      :list="singerOptions"
      :options="basicSwiperOptions"
      @slideChange="onSlideChange"
      @swiper="onSwiper"
    >
      <div
        :class="[
        active === index ? 'auto-height' : 'fixed-height',
        index !== 0 && 'singer-wrap']"
      >
        <component :active="active" :is="data.component" :ref="getRefs" />
      </div>
    </g-swiper-items>
  </main>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router';
import debounce from 'lodash.debounce';
import useSwiper from '@/composables/useSwiper';
import { fetchArtistDetail } from '@/api/singer';
import { basicSwiperOptions, singerOptions } from '@/utils'
import { StrKeys, Tab } from '@/types';
import SingerInfo from '@/components/Singer/SingerInfo.vue';
import SingerAbout from '@/components/Singer/SingerAbout.vue';
import SingerAlbum from '@/components/Singer/SingerAlbum.vue';
import SingerHotSong from '@/components/Singer/SingerHotSong.vue';
import SingerMV from '@/components/Singer/SingerMV.vue';

interface Detail {
  getDetail: () => void,
  flag: boolean
}

interface Info {
  cover: string,
  albumSize: string | number,
  identifyTag: string,
  musicSize: string | number,
  mvSize: string | number,
  name: string
  identify: { imageDesc: string, imageUrl: string },
}
interface State {
  info: Info
}
export default defineComponent({
  name: 'SingerDetail',
  components: {
    SingerAbout,
    SingerAlbum,
    SingerHotSong,
    SingerMV,
    SingerInfo,
  },
  setup() {
    const route = useRoute();
    const components = ref<Detail[]>([]);
    const tabRef = ref<Tab | null>(null);
    const name = ref('');
    const background = ref('');
    let scrollList: StrKeys<null> = {};
    const state: State = reactive({
      info: {
        cover: '',
        albumSize: '',
        identifyTag: '',
        musicSize: '',
        mvSize: '',
        name: '',
        identify: { imageDesc: '', imageUrl: '', actionUrl: '' },
      }
    });
    const {
      active,
      onSwiper,
      handleSlide,
      onSlideChange,
    } = useSwiper();
    const getRefs = (el) => {
      components.value.push(el)
    }
    const getSingerInfo = async () => {
      const { id } = route.params;
      const {
        data: { artist, identify = { imageDesc: '', imageUrl: '' } },
      } = await fetchArtistDetail(id);
      const {
        cover,
        albumSize,
        identifyTag = [],
        musicSize,
        mvSize,
        name,
      } = artist;
      state.info = {
        cover,
        albumSize,
        identifyTag: (identifyTag?.join(' / ')) ?? '',
        musicSize,
        mvSize,
        name,
        identify,
      };
    }
    const scroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      background.value = `rgba(0,0,0,${Math.min(
        scrollTop / 150,
        1
      )})`;
      if (scrollTop > 150) {
        name.value = state.info?.name ?? '';
      } else {
        name.value = '';
      }
    }
    const handleChange = (index: number, oldIndex: number) => {
      const current = components.value[index];
      current.flag && current.getDetail();
      if (document.documentElement.scrollTop < 240) {
        scrollList = {};
        return;
      }
      scrollList[oldIndex] = document.documentElement.scrollTop;
      document.documentElement.scrollTop = scrollList[index] || 240;
    }

    onMounted(() => {
      document.addEventListener('scroll', debounce(scroll, 17));
      components.value[0].getDetail();
      getSingerInfo();
      (tabRef.value as Tab).init(0);
    })
    onUnmounted(() => {
      document.removeEventListener('scroll', scroll);
    })
    return {
      basicSwiperOptions,
      singerOptions,
      background,
      tabRef,
      active,
      name,
      ...toRefs(state),
      onSlideChange,
      handleChange,
      handleSlide,
      onSwiper,
      getRefs,
    }
  },
});
</script>
<style scoped>
.singer-wrap {
  padding: 0 1.5rem;
}
.auto-height {
  height: auto;
}
.fixed-height {
  height: calc(100vh - 5rem);
}
</style>
