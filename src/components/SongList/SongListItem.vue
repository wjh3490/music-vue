<template>
    <li class="song-item" @click.stop="handlePlay">
        <div class="song-container">
            <div :class="active" class="song-wrap ellipsis">
                <span :class="active" class="song-name">{{ data.name }}</span>
                <span v-if="data.alia" :class="active" class="song-alia">&nbsp;({{ data.alia }})</span>
                &nbsp;
                <privilege :privilege="data.privilege" />&nbsp;-&nbsp;
                <span :class="active" class="song-artists">{{ data.artists }}</span>
            </div>
            <play-bytes :song="data" />
        </div>
        <song-list-delete :song="data" />
    </li>
</template>
<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { useStore } from 'vuex'
import type { Song } from '@/types'
import Privilege from '../common/Privilege.vue'
import PlayBytes from './PlayBytes.vue'
import SongListDelete from './SongListDelete.vue'

export default defineComponent({
    name: 'SongListItem',
    components: { Privilege, PlayBytes, SongListDelete },
    props: {
        data: {
            type: Object as PropType<Song>,
            default: () => { }
        },
        index: Number
    },
    setup(props) {
        const store = useStore()
        const currentSong = computed(() => store.getters.currentSong)
        const active = computed(() => store.getters.currentSong === props.data && 'song-active')
        const handlePlay = () => { store.commit('setCurrrentIndex', props.index) }

        return { active, currentSong, handlePlay, }
    }
})
</script>
<style scoped lang="less">
.song {
    &-item {
        display: flex;
        align-items: center;
        padding: 1.2rem 1.6rem 1.2rem 0;
        height: 5rem;
        justify-content: space-between;
        border-bottom: 0.01rem solid rgba(225, 225, 225, 0.5);
    }
    &-container {
        display: flex;
        width: 92%;
    }
    &-wrap {
        max-width: 82%;
    }
    &-artists {
        font-size: 12px;
        color: rgba(225, 225, 225, 0.8);
    }
    &-active {
        color: #169af3;
    }
}
</style>
