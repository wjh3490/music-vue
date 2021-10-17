<template>
    <span v-if="song.id == currentSong.id" class="song-byte-wrap">
        <span class="audio-icon unselectable">
            <span
                v-for="item in byteOptions"
                :key="item.time"
                :class="{ active: !playing }"
                :style="{ animationDelay: `${item.time}s` }"
                class="column"
            ></span>
        </span>
    </span>
</template>
<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { useStore } from 'vuex'
import type { Song } from '@/types'
import { byteOptions } from '@/utils'
export default defineComponent({
    name: 'SongListItem',
    props: {
        song: {
            type: Object as PropType<Song>,
            default: () => { }
        }
    },
    setup() {
        const store = useStore()
        const playing = computed(() => store.state.playing)
        const currentSong = computed(() => store.getters.currentSong)
        
        return { playing, currentSong, byteOptions }
    },
})
</script>
<style lang="less" scoped>
.song-byte-wrap {
    display: inline-block;
    margin-left: 1.2rem;
}
.audio-icon {
    position: relative;
    display: flex;
    height: 15px;
    align-items: center;
    overflow: hidden;
    .column {
        width: 2px;
        height: 100%;
        margin-left: 2px;
        background-color: #169af3;
        animation: play 0.9s linear infinite alternate;
        &.active {
            animation-play-state: paused;
        }
    }
}
</style>
