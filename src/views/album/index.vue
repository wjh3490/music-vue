<template>
  <g-head-nav background="transparent" :title="title" color="#fff" isFixed />
  <BaseBackGround :info="info" :opacity="opacity" />
  <song-item
    v-for="(song, index) in songData"
    :key="song.id"
    :song="song"
    :songs="songData"
    :index="index"
  />
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import debounce from 'lodash.debounce';
import { fetchAlbum } from '@/api/album';
import { arrayToString, splitString } from '@/utils';
import type { Song, StrKeys } from '@/types';
import SongItem from '@/components/common/SongItem.vue';
import BaseBackGround from '@/components/base/BaseBackGround.vue'
const msg = {
  artist: '',
  alias: '',
  subscribedCount: 0,
  commentCount: 0,
  shareCount: 0,
  description: '',
  name: '',
  coverImgUrl: '',
  publishTime: 0,
  id: '',
}

export default defineComponent({
  name: 'Album',
  components: { SongItem, BaseBackGround },
  setup() {
    const route = useRoute();
    const songData = ref<Song[]>([]);
    const info = ref<StrKeys<string>>(msg)
    const opacity = ref(1);
    const title = ref('专辑')
    const getList = async () => {
      const { id } = route.params;
      const { songs, album } = await fetchAlbum({ id: id as string });
      const _info: StrKeys<string> = {
        artist: arrayToString(album.artists),
        alias: splitString(album.alias),
        subscribedCount: album.info.likedCount || 0,
        commentCount: album.info.commentCount || 0,
        shareCount: album.info.shareCount || 0,
        description: album.description,
        name: album.name || '',
        coverImgUrl: album.picUrl,
        publishTime: album.publishTime,
        id: album.artist.id,
      };
      info.value = _info;

      

      let list: Song[] = [];
      for (let i = 0, length = songs.length; i < length; i++) {
        const song = {
          id: songs[i]['id'],
          name: songs[i]['name'],
          album: songs[i]['al']['name'],
          artists: arrayToString(songs[i]['ar']),
          picUrl: songs[i]['al']['picUrl'],
          publishTime: album.publishTime,
          alia: splitString(songs[i]['alia']),
          privilege: {
            pl: songs[i]['privilege']['pl'],
            fee: songs[i]['fee'],
            flag: songs[i]['privilege']['flag'],
            maxbr: songs[i]['privilege']['maxbr'],
          },
        }
        list.push(song);
      }
      songData.value = list;
    }
    const handldeScroll = () => {
      opacity.value = Math.max(1 - document.documentElement.scrollTop / 200, 0);
      if (document.documentElement.scrollTop > 150) {
        title.value = info.value.name as string;
      } else {
        title.value = "专辑";
      }
    }
    onMounted(() => {
      getList();
      document.addEventListener('scroll', debounce(handldeScroll, 17));
    })
    onUnmounted(() => {
      document.removeEventListener('scroll', handldeScroll);
    })

    return {
      songData,
      title,
      opacity,
      info
    }
  },
});
</script>
