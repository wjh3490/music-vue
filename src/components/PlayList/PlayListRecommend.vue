<template>
  <div class="play-scrollbar play">
    <play-list-banner />
    <base-list :list="list" @list="getSingerDetail" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import PlayListBanner from './PlayListBanner.vue';
import { getRecommendPlaylist } from '@/api/playlist';
export default defineComponent({
  name: 'PlayListRecommend',
  components: { PlayListBanner },
  setup(_, { expose }) {
    const { setSinger } = useStore()
    const router = useRouter()
    const list = ref([])

    const getSingers = async () => {
      const { result } = await getRecommendPlaylist();
      list.value = result.reduce((acc, cur) => {
        const obj = {
          id: cur.id,
          picUrl: cur.picUrl,
          playCount: cur.playCount,
          name: cur.name,
        };
        acc.push(obj);
        return acc;
      }, []);
    }
    const getSingerDetail = (singer) => {
      const _singer = {
        id: singer.id,
        singerPic: singer.picUrl,
        name: singer.name,
      };

      setSinger(_singer);
      router.push(`/playlist/${singer.id}?type=0`);
    }
    expose({ getSingers })
    return {
      list,
      getSingerDetail
    }
  }
});
</script>
