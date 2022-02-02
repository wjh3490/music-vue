<template>
  <song-item
    v-for="(song, index) in songList"
    :key="song.id"
    :songs="songList"
    :song="song"
    :index="index"
  />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { fetchArtistTop } from '@/api/singer';
import { splitString, arrayToString } from '@/utils';
import type { Song } from '@/types';
import SongItem from '@/components/common/SongItem.vue'
export default defineComponent({
  name: 'SingerHotSong',
  components: { SongItem },
  props: {
    active: {
      type: [String, Number],
      default: '0',
    },
  },

  setup(_, { expose }) {
    const store = useStore();
    const route = useRoute();
    const songList = ref<Array<Song>>([]);
    const flag = ref(true);

    const getDetail = async () => {
      const { id } = route.params;
      const { songs } = await fetchArtistTop(({ id } as { id: string }));
      for (let i = 0, length = songs.length; i < length; i++) {
        const song = {
          id: songs[i]['id'],
          name: songs[i]['name'],
          album: songs[i]['al']['name'],
          alia: splitString(songs[i]['alia']),
          artists: arrayToString(songs[i]['ar'], '、'),
          publishTime: songs[i]['publishTime'],
          picUrl: songs[i]['al']['picUrl'],
          privilege: {
            pl: songs[i]['privilege']['pl'],
            fee: songs[i]['fee'],
            flag: songs[i]['privilege']['flag'],
            maxbr: songs[i]['privilege']['maxbr'],
          },
        };
        songList.value.push(song);
      }
      flag.value = false;
    }

    expose({ getDetail, flag });
    return {
      songList,
    }
  },

});
</script>

<style lang="less" scoped>
</style>
