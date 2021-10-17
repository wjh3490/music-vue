<template>
    <i class="iconfont icon-shanchu song-del-btn" @click="handleDel"></i>
</template>
<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { useStore } from 'vuex'
import type { Song } from '@/types'

export default defineComponent({
    name: 'SongListDelete',
    props: {
        song: {
            type: Object as PropType<Song>,
            default: () => { }
        }
    },
    setup(props) {
        const store = useStore()
        const playList = computed(() => store.state.playList)
        const handleDel = () => {
            store.dispatch('delSong', props.song)
            if (playList?.value?.length === 0) store.commit('setPlayListVisible', false)
        }
        return {
            handleDel
        }
    }
})
</script>
<style scoped>
.song-del-btn {
    font-size: 24px;
}
</style>
