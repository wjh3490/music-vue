<template>
  <div class="singer-songs" :class="active == 0 ? 'auto-height' : 'fixed-height'">
    <base-song-list :songs="songList" @play="handlePlay" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import isEqual from 'lodash.isequal'
import { fetchArtistTop } from '@/api/singer';
import { splitString, arrayToString } from '@/utils';
import type { Song } from '@/types'
export default defineComponent({
  name: 'SingerHotSong',
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
      const { songs } = await fetchArtistTop(id);
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
    const handlePlay = (index) => {
      if (!isEqual(songList.value, store.state.playList)) {
        store.commit('setPlay', songList.value)
        store.commit('setSequenceList', songList.value)
      }
      store.commit('setCurrrentIndex', index)
    }
    expose({ getDetail, flag });
    return {
      songList,
      handlePlay,
    }
  },

});
</script>

<style lang="less" scoped>
.singer-songs {
  overflow-x: hidden;
}
.auto-height {
  height: auto;
}
.fixed-height {
  height: calc(100vh - 50px);
}
</style>
