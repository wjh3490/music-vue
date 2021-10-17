<template>
    <div class="song-list-mode">
        <div class="song-list-mode-wrap" @click.stop.prevent="handleModeChange">
            <i :class="modeMap[0]" class="iconfont mode-icon"></i>&nbsp;
            <span>{{ modeMap[1] }}</span>
        </div>
        <div class="song-list-mode-wrap" @click.stop.prevent="handleClearAll">
            <span>清空全部</span>&nbsp;
            <i class="iconfont icon-shanchu"></i>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { useStore } from 'vuex'
import type { Song } from '@/types'
import { modeMaps } from '@/utils'
import toast from '../common/Toast'
import dialog from '../common/Dialog'

export default defineComponent({
    name: 'SongListMode',
    props: {
        song: {
            type: Object as PropType<Song>,
            default: () => { }
        }
    },
    setup() {
        const store = useStore()
        const mode = computed(() => store.state.mode)
        const modeMap = computed(() => modeMaps[mode.value])
        let index = 0

        const handleModeChange = () => {
            index++
            if (index > 2) index = 0;
            store.commit('setMode', index)
            toast({ content: modeMap?.value[1] })
        }
        const handleClearAll = async () => {
            store.commit('setlockScroll', 1)
            try {
                await dialog({ content: '是否要删除全部' })
                store.dispatch('clearAll')
                store.commit('setPlaying', false)
                store.commit('setPlayListVisible', false)
            } catch (error) { }
        }
        return { modeMap, handleClearAll, handleModeChange }
    },
})
</script>
<style lang="less" scoped>
.song-list {
    &-mode {
        display: flex;
        align-items: center;
        padding: 1.2rem 1.6rem;
        height: 5rem;
        justify-content: space-between;
        border-bottom: 0.1rem solid rgba(225, 225, 225, 0.5);
        &-wrap {
            display: flex;
            align-items: center;
        }
    }
}
.icon-shanchu {
    font-size: 24px;
}
.mode-icon {
    font-size: 18px;
}
</style>
