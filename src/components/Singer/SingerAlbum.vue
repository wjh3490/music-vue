<template>
    <ul>
      <album-item v-for="item in albums" :key="item.id" :data="item" />
    </ul>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import { fetchArtistAlbum } from '@/api/singer';
import { parseTime } from '@/utils'
import AlbumItem from '@/components/common/AlbumItem.vue'
import type { Album } from '@/components/common/AlbumItem.vue'

export default defineComponent({
  name: 'SingerAblum',
  components: { AlbumItem },
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
