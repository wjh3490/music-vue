<template>
    <div class="search_multiple-wrap">
        <template v-for="(item, index) in multiplesList" :key="item.value">
            <div
                v-if="!!(multiples[item.value]?.[item.value] ?? []).length"
                :class="[`search_multiple-${item.value}`, 'search_multiple-card']"
            >
                <h3 class="search_multiple-title">{{ item.title }}</h3>
                <component
                    :is="item.component"
                    :[item.value]="multiples[item.value]?.[item.value] ?? []"
                    v-bind="item.props"
                />
                <p class="search_multiple-more" @click="handleClick(index)">{{ multiples[item.value]?.moreText }}</p>
            </div>
        </template>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { fetchCloudsearch } from '@/api/search';
import { splitString, arrayToString } from '@/utils'
import type { Song, StrKeys } from '@/types'
import type { Album } from '@/components/common/AlbumItem.vue'
import type { Artist } from './SearchSingers.vue'
import type { PlayList } from './SearchPlaylist.vue'
import SearchAlbums from './SearchAlbums.vue'
import SearchSingers from './SearchSingers.vue'
import SearchSongs from './SearchSongs.vue'
import SearchPlaylist from './SearchPlaylist.vue'
const multiplesList = [
    {
        component: 'SearchSongs',
        props: { isProp: true, hide: false },
        title: '单曲',
        value: 'songs'
    },
    {
        component: 'SearchPlaylist',
        props: { isProp: true, },
        title: '歌单',
        value: 'playLists'
    },
    {
        component: 'SearchSingers',
        props: { isProp: true, },
        title: '艺人',
        value: 'artists'
    },
    {
        component: 'SearchAlbums',
        props: { isProp: true, },
        title: '专辑',
        value: 'albums'
    },
]
interface Multiples {
    albums: StrKeys<string> & { albums?: Array<Album> },
    artists: StrKeys<string> & { artists?: Array<Artist> },
    playLists: StrKeys<string> & { playLists?: Array<PlayList> },
    songs: StrKeys<string> & { songs?: Array<Song> },
}
export default defineComponent({
    name: 'SearchMultiple',
    components: {
        SearchSongs,
        SearchAlbums,
        SearchSingers,
        SearchPlaylist,
    },
    emit: ['change'],
    setup(_, { expose , emit}) {
        const flag = ref(true);
        const route = useRoute();
        const multiples = reactive<Multiples>({
            albums: {},
            artists: {},
            playLists: {},
            songs: {},
        })
        const getDetail = async () => {
            const { result: { album, artist, playList, song } } = await fetchCloudsearch({
                type: 1018,
                keywords: route?.query?.keyword as string
            });
            multiples.albums = album
            multiples.artists = artist
            multiples.playLists = playList
            multiples.songs = formatSongs(song)
            flag.value = false;
        };
        const formatSongs = ({ songs: _songs, ...rest }) => {
            let songs: Song[] = []
            for (let i = 0, length = _songs.length; i < length; i++) {
                const song = {
                    id: _songs[i]?.id,
                    name: _songs[i]?.name,
                    album: _songs[i]?.al?.name,
                    alia: splitString(_songs[i]['alia']),
                    artists: arrayToString(_songs[i]?.ar ?? [], '/'),
                    picUrl: _songs[i]?.al?.picUrl,
                    privilege: {
                        fee: _songs[i]['fee'],
                        pl: 0,
                        flag: 0,
                        maxbr: 0,
                    },
                };
                songs.push(song);
            }
            return ({ songs, ...rest } as Multiples['songs'])
        }
        const handleClick = (i: number) => {
            emit('change', i)
        }
        expose({ getDetail, flag });

        return { multiples, multiplesList,handleClick };
    },
});
</script>
<style lang="less" scoped>
.search_multiple {
    &-wrap {
        background-color: #e8e8e8;
        padding: 1.5rem;
        min-height: 100vh;
    }
    &-card {
        background-color: #fff;
        border-radius: 10px;
        padding: 1rem 0;
        margin-bottom: 1.5rem;
        overflow: hidden;
    }

    &-songs,
    &-albums {
        padding: 1rem 1.5rem;
        .search_multiple-title {
            padding-left: 0;
            padding-right: 0;
        }
    }
    &-title {
        padding: 0 1.5rem;
        padding-bottom: 1.5rem;
        font-size: 18px;
    }
    &-more {
        text-align: center;
        color: #a59797f5;
        padding-top: 1rem;
        border-top: 0.01rem solid #a59797f5;
        margin: 0 -1.5rem;
    }
}
</style>
