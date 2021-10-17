<template>
    <player-circle />
    <div class="normal-player-bottom" @touchmove.stop.prevent>
        <player-progress-bar />
        <player-control v-model:visible="visible" />
        <player-mode v-model:visible="visible" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import PlayerCircle from '@/components/Player/PlayerCircle.vue'
import PlayerProgressBar from '@/components/Player/PlayerProgressBar.vue'
import PlayerControl from '@/components/Player/PlayerControl.vue'
import PlayerMode from '@/components/Player/PlayerMode.vue'
export default defineComponent({
    name: 'PlayerMain',
    props: {
        index: {
            type: Number,
            default: 0,
        }
    },
    components: {
        PlayerCircle,
        PlayerProgressBar,
        PlayerControl,
        PlayerMode,
    },
    setup() {
        const visible = ref(false);
        return {
            visible
        }
    },

})
</script>