<template>
  <div class="singer-album">
    <ul class="singer-album-wrap">
      <router-link
        v-for="item in albums"
        :to="{ name: 'Album', params: { id: item.id } }"
        :key="item.id"
        tag="li"
        class="singer-album-item"
      >
        <div class="singer-album-left">
          <img v-lazy="item.picUrl" alt class="singer-album-figure" />
        </div>
        <div class="singer-album-right">
          <p class="singer-album-name ellipsis">{{ item.name }}</p>
          <p class="singer-album-publishTime">
            <span>{{ parseTime(item.publishTime, '{y}-{m}-{d}') }}</span>
            <span class="singer-album-size">{{ item.size }}首</span>
          </p>
        </div>
        <span class="iconfont icon-youjiantou"></span>
      </router-link>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { fetchArtistAlbum } from '@/api/singer';
import { parseTime } from '@/utils'
interface Album {
  id: number,
  picUrl: string,
  name: string,
  size: number,
  publishTime: number,
}
export default defineComponent({
  name: 'SingerAblum',
  props: {
    active: {
      type: [String, Number],
      default: '0',
    },
  },
  setup(_, { expose }) {
    const flag = ref(true);
    const route = useRoute();
    let albums = ref<Array<Album>>([]);
    const getDetail = async () => {
      const { hotAlbums } = await fetchArtistAlbum(route.params.id);
      albums.value = hotAlbums;
      flag.value = false;
    };

    expose({ getDetail, flag });

    return { albums, parseTime };
  },
});
</script>

<style lang="less" scoped>
.singer-album {
  &-item {
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
    justify-content: space-between;
  }
  &-left {
    width: 6rem;
    height: 6rem;
    margin-right: 1.5rem;
    border-radius: 6px;
    overflow: hidden;
  }
  &-right {
    flex: 1;
  }
  &-figure {
    width:6rem;
    height:6rem;
  }
  &-name {
    font-size: 16px;
  }
  &-publishTime {
    margin-top: 0.4rem;
    color: #888;
    font-size: 13px;
    display: flex;
    align-items: center;
  }
  &-size {
    margin-left:1rem;
  }
}
</style>
