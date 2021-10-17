<template>
    <section class="mini-cd" :class="{ active: !playing }">
        <div
            class="mini-cd-wrap"
            :style="{
                backgroundImage: `conic-gradient(#2010ff 0%, #20a0ff ${percent *
                    100}%, #fff ${percent * 100}%, #fff ${100 - percent * 100}%)`,
            }"
        ></div>
        <div class="mini-cd-bgc" :class="{ 'animation_pause': !playing }">
            <img :src="currentSong.picUrl" alt class="mini-cd-img" />
        </div>
    </section>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
export default defineComponent({
    name: 'MiniProgressBar',
    setup() {
        const store = useStore();
        const playing = computed(() => store.state.playing);
        const percent = computed(() => +(store.state.currentTime / store.state.duration).toFixed(2));
        const currentSong = computed(() => store.getters.currentSong);
        return {
            playing,
            percent,
            currentSong
        }
    }
})
</script>
<style lang="less" scoped>
.mini {
    &-cd {
        position: relative;
        border-radius: 50%;
        width: 56px;
        height: 56px;
        transition: all 0.5s;
        overflow: hidden;
        transform: translateY(-5px);
        &.active {
            transform: translateY(-1px) scale(0.8);
        }
        &-wrap {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
        }
        &-bgc {
            position: absolute;
            top: 0;
            left: 0;
            padding: 3px;
            overflow: hidden;
            animation: move 20s linear infinite;
            &.animation_pause {
                animation-play-state: paused;
            }
        }
        &-img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }
    }
}
</style>