<template>
    <div class="new-songs">
        <div class="new-songs-bg" :style="{ backgroundPositionY: index * 25 + '%' }">
            <div class="new-songs-desc">
                <p class="new-songs-cn">{{ data?.name || '' }}</p>
                <p class="new-songs-en">{{ data?.en || '' }} Music</p>
            </div>
            <div class="new-songs-all">
                <b>播放全部</b>
                <span v-if="!!songs.length">({{songs.length}}首)</span>
            </div>
        </div>
        <base-song-list :songs="songs" :visible="true" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { fetchTopSong } from '@/api/songs';
import { arrayToString } from '@/utils';
import type { Song } from '@/types';
export default defineComponent({
    name: 'SongsNewSongList',
    props: {
        index: { type: Number, default: 1, },
        data: { type: Object, default: () => { } }
    },
    setup(_, { expose }) {
        const flag = ref(true);
        const songs = ref<Song[]>([]);
        const getSongs = async (type: number) => {
            const { data } = await fetchTopSong({ type });
            let list: Song[] = [];
            for (let i = 0, length = data.length; i < length; i++) {
                const item = data[i];
                const song: Song = {
                    id: item.id,
                    name: item.name,
                    album: item.album?.name,
                    artists: arrayToString(item.artists),
                    picUrl: item.album?.picUrl,
                    privilege: {
                        pl: item.privilege?.pl || '',
                        fee: item.privilege?.fee || '',
                        flag: item.privilege?.flag || '',
                        maxbr: item.privilege?.maxbr || '',
                    },
                };
                list.push(song);
            }
            songs.value = list;
            flag.value = false;
        }
        expose({ flag, getSongs })
        return {
            songs,
        }
    },
})
</script>

<style lang="less">
.new-songs {
    height: calc(100vh - 10rem);
    overflow-y: auto;
    &-bg {
        position: relative;
        width: 100%;
        height: 20rem;
        background: url(../../assets/imgs/bg.jpg) no-repeat;

        background-size: 100% 500%;
        background-position: 0 25%;
        overflow: hidden;
        &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0rem;
            background-color: rgba(0, 0, 0, 0.2);
        }
    }
    &-desc {
        position: absolute;
        left: 1.6rem;
        bottom: 7rem;
        color: #fff;
    }
    &-cn {
        font-size: 26px;
        font-weight: 700;
    }
    &-en {
        font-size: 16px;
    }
    &-all {
        position: relative;
        z-index: 10;
        height: 5rem;
        margin-top: 16rem;
        padding: 1rem 0 0 1rem;
        background-color: #fff;
        border-radius: 16px 16px 0 0;
        font-size: 16px;
    }
}
</style>