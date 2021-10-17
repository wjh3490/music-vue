<template>
    <section v-for="item in (isProp ? playLists : list)" :key="item.id" class="search_playlist-item">
        <figure>
            <img v-lazy="item.coverImgUrl" class="search_playlist-coverImgUrl" />
        </figure>
        <div class="search_playlist-right ellipsis">
            <p class="search_playlist-name ellipsis">{{ item.name }}</p>
            <div class="search_playlist-detail ellipsis">
                {{ item.trackCount }}首音乐&nbsp;
                by {{ item?.creator?.nickname }}&nbsp;
                播放 {{ item.playCount }}次&nbsp;
            </div>
        </div>
    </section>
</template>
<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';
import { useRoute } from 'vue-router';
import { fetchCloudsearch } from '@/api/search';

export interface PlayList {
    coverImgUrl: string,
    name: string,
    trackCount: number,
    playCount: number,
    id: number,
    creator: { nickname?: string }
}

export default defineComponent({
    name: 'SearchPlaylist',
    props: {
        isProp: {
            type: Boolean,
            default: false
        },
        playLists: {
            type: Array as PropType<PlayList[]>,
            default: () => []
        }
    },
    setup(_, { expose }) {
        const flag = ref(true);
        const route = useRoute();
        const list = ref<Array<PlayList>>([]);
        const getDetail = async () => {
            const { result: { playlists } } = await fetchCloudsearch({
                type: 1000,
                keywords: route?.query?.keyword as string
            });
            list.value = playlists;
            flag.value = false;
        };

        expose({ getDetail, flag });

        return { list };
    },
});
</script>
<style lang="less" scoped>
.search_playlist {
    &-item {
        display: flex;
        align-items: center;
        margin-bottom: 1.5rem;
        padding: 0 1.5rem;
        color: #333;
    }
    &-coverImgUrl {
        width: 5rem;
        height: 5rem;
        border-radius: 6px;
        margin-right: 1rem;
    }
    &-name {
        font-size: 14px;
    }
    &-detail {
        font-size: 12px;
    }
}
</style>
