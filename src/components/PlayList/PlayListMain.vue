<template>
  <MallArea :list="list" @list="getSingerDetail"  class="playList-content"/>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { fetchPlaylistDetail } from '@/api/playlist';
import MallArea from '@/components/Mall/MallArea.vue'
export default defineComponent({
  name: 'PlayListMain',
  components: { MallArea },
  props: ['id'],
  setup(_, { expose }) {
    const store = useStore();
    const router = useRouter();
    const list = ref([]);
    const getSingers = async (type) => {
      const {
        playlist: { tracks },
      } = await fetchPlaylistDetail(type);
      list.value = tracks.reduce((acc, cur) => {
        const obj = {
          id: cur.id,
          coverUrl: cur.al.picUrl,
          playCount: cur.dt,
          albumName: cur.name,
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
      store.commit('setSinger', _singer);
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
<style lang="less" scoped>
.playList-content{
  &:deep(.mall-area-item) {
    margin-top: 1.6rem;
  }
}
</style>