<template>
    <div class="player-center">
        <player-circle />
    </div>
    <div class="normal-player-bottom" @touchmove.stop.prevent>
        <player-progress-bar />
        <player-control>
            <player-mode />
        </player-control>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PlayerCircle from '@/components/Player/PlayerCircle.vue'
import PlayerProgressBar from '@/components/Player/PlayerProgressBar.vue'
import PlayerControl from '@/components/Player/PlayerControl.vue'
import PlayerMode from '@/components/Player/PlayerMode.vue'
export default defineComponent({
    name: 'PlayerMain',
    components: {
        PlayerCircle,
        PlayerProgressBar,
        PlayerControl,
        PlayerMode,
    },
    setup() { },

})
</script>