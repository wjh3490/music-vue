<template>
    <div class="content-wrap" @click.stop="handleAction(content.targetType, content.targetId)">
        <img v-lazy="content.imageUrl" class="swiper-lazy content-img" />
        <span
            class="content-title"
            :style="{ backgroundColor: colorsMaps[content.titleColor] }"
        >{{ content.typeTitle }}</span>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { fetchSongDetail } from '@/api/recomment'
import { colorsMaps, arrayToString } from '@/utils'

interface Content {
    imageUrl: string,
    titleColor: string,
    typeTitle: string,
    targetType: number,
    targetId: number,
}

export default defineComponent({
    name: 'HomeSwiperContent',
    props: {
        content: {
            type: Object as PropType<Content>,
            default: () => { }
        },
    },
    setup() {
        const router = useRouter()
        const store = useStore()
        const handleAction = (type: number, id: number): void => {
            if (type === 1) {
                handlePlay(id);
            }
            if (type === 10) {
                router.push({ name: 'Album', params: { id } });
            }
        };
        const handlePlay = async (id: number) => {
            const index = store.state.playList.findIndex((item) => item.id === id);
            if (index >= 0) {
                if (id !== store.getters.currentSong.id) {
                    store.commit('setCurrrentIndex', index)
                }
            } else {
                const { songs, privileges } = await fetchSongDetail({id});
                const song = {
                    id: songs[0]?.id,
                    name: songs[0]?.name,
                    picUrl: songs[0]?.al?.picUrl,
                    artists: arrayToString(songs[0]?.ar ?? []),
                    album: songs[0]?.al?.name,
                    alia: arrayToString(songs[0]?.alia ?? []),
                    privilege: {
                        pl: privileges[0]?.pl,
                        fee: privileges[0]?.fee,
                        flag: privileges[0]?.flag,
                        maxbr: privileges[0]?.maxbr,
                    },
                };
                store.commit('setPlay', [song, store.state.playList]);
                store.commit('setSequenceList', store.state.playList);
                store.commit('setCurrrentIndex', 0);
            }
        }
        return {
            colorsMaps,
            handleAction
        }
    }
})
</script>
<style lang="less" scoped>
.content {
    &-img {
        height: 14rem;
    }
    &-wrap {
        position: relative;
        overflow: hidden;
        border-radius: 8px;
    }
    &-title {
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 0.1rem 0.6rem;
        color: #fff;
        border-radius: 8px 0 0 0;
    }
}
</style>