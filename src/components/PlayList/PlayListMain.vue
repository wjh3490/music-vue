<template>
  <base-list :list="list" @list="getSingerDetail" />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { getPlaylistDetail } from '@/api/playlist';
export default defineComponent({
  name: 'PlayListMain',
  props: ['id'],
  setup(_, { expose }) {
    const { setSinger } = useStore()
    const router = useRouter()
    const list = ref([]);
    const getSingers = async (type) => {
      const {
        playlist: { tracks },
      } = await getPlaylistDetail(type);
      list.value = tracks.reduce((acc, cur) => {
        const obj = {
          id: cur.id,
          picUrl: cur.al.picUrl,
          playCount: cur.dt,
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
      router.push(`/playlist/${singer.id}`);
    }
    expose({ getSingers });
    return {
      list,
      getSingerDetail
    }
  }
});
</script>
