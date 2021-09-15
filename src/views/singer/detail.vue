<template>
  <div class="detail-container">
    <base-back :background="background" :title="name" isFixed color="#fff" />
    <singer-info :info="info" />
    <base-tabs
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
      <base-swiper-items
        v-slot="{ data }"
        :list="singerOptions"
        :options="basicSwiperOptions"
        @slideChange="onSlideChange"
        @swiper="onSwiper"
      >
        <component :active="active" :is="data.component" :ref="getRefs" />
      </base-swiper-items>
    </main>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router';
import debounce from 'lodash.debounce';
import { fetchArtistDetail } from '@/api/singer.js';
import SingerInfo from '@/components/Singer/SingerInfo.vue';
import SingerAbout from '@/components/Singer/SingerAbout.vue';
import SingerAlbum from '@/components/Singer/SingerAlbum.vue';
import SingerHotSong from '@/components/Singer/SingerHotSong.vue';
import SingerMV from '@/components/Singer/SingerMV.vue';
import useSwiper from '@/composables/useSwiper';
import { basicSwiperOptions, singerOptions } from '@/utils'
import { StrKeys, Tab } from '@/types';
interface Detail {
  getDetail: () => void,
  flag: boolean
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
    const state = reactive({
      info: {
        cover: '',
        albumSize: '',
        identifyTag: '',
        musicSize: '',
        mvSize: '',
        name: '',
        identify: { imageDesc: '', imageUrl: '' },
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
      background.value = `rgba(0,0,0,${Math.min(
        document.documentElement.scrollTop / 150,
        1
      )})`;
      if (document.documentElement.scrollTop > 150) {
        name.value = state.info?.name ?? '';
      } else {
        name.value = '';
      }
    }
    const handleChange = (index: number, old: number) => {
      components.value[index].flag && components.value[index].getDetail();
      if (document.documentElement.scrollTop < 240) {
        scrollList = {};
        return;
      }
      scrollList[old] = document.documentElement.scrollTop;
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
<style scoped lang="less">
.detail {
  &-nav {
    width: 100%;
    position: sticky;
    top: 50px;
    font-size: 16px;
    background-color: #fff;
    z-index: 99;
    &-wrap {
      height: 40px;
      display: flex;

      align-items: center;
    }
    &-item {
      flex: 1;
      text-align: center;
      font-weight: 600;
      &.active {
        color: #169af3;
      }
    }
    &-line {
      width: 25%;
      text-align: center;
      height: 3px;
      transition: all 0.3s;
      &::after {
        content: "";
        display: block;
        height: 100%;
        width: 30px;
        margin: 0 auto;
        background-color: #169af3;
        border-radius: 3px;
      }
    }
  }
}

.musicIcon {
  position: fixed;
  bottom: 35px;
  left: 100px;
  z-index: 9999;
  i {
    font-size: 30px;
    color: #169af3;
    font-weight: 700;
  }
}
</style>
>
