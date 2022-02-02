<template>
    <div class="search_songs-wrap">
        <song-item
            v-for="(song, index) in (isProp ? songs : songList)"
            :key="song.id"
            :songs="isProp ? songs : songList"
            :song="song"
            :index="index"
            :highlight="true"
            :hide="hide"
        />
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import { useRoute } from 'vue-router'
import { fetchCloudsearch } from '@/api/search'
import type { Song } from '@/types'
import { splitString, arrayToString } from '@/utils'
import SongItem from '@/components/common/SongItem.vue'

export default defineComponent({
    name: 'SearchSongs',
    props: {
        isProp: {
            type: Boolean,
            default: false
        },
        songs: {
            type: Array as PropType<Song[]>,
            default: () => []
        },
        hide: {
            type: Boolean,
            default: false
        }
    },
    components: { SongItem },
    setup(_, { expose }) {
        const flag = ref(true);
        const route = useRoute();
        const songList = ref<Array<Song>>([]);
        const getDetail = async () => {
            const { result: { songs = [] } } = await fetchCloudsearch({
                type: 1,
                keywords: route?.query?.keyword as string
            });
            for (let i = 0, length = songs.length; i < length; i++) {
                const song = {
                    id: songs[i]['id'],
                    name: songs[i]['name'],
                    album: songs[i]['album']['name'],
                    alia: splitString(songs[i]['alia']),
                    artists: arrayToString(songs[i]['artists'], '/'),
                    picUrl: songs[i]?.al?.picUrl,
                    privilege: {
                        fee: songs[i]['fee'],
                        pl: 0,
                        flag: 0,
                        maxbr: 0,
                    },
                };
                songList.value.push(song);
            }
            flag.value = false;
        };

        expose({ getDetail, flag });

        return { songList };
    },
});
</script>
<style lang="less" scoped>
.search_songs-wrap {
    padding: 0 1.5rem;
}
</style>
