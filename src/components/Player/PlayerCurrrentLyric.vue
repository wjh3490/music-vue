
<template>
    <div class="currrent_lyric">
        {{
            currentLyric
                ? currentLyric?.lyric
                : '暂无歌词'
        }}
    </div>
    <div class="currrent_lyric" v-if="currentLyric?.tlyric">{{ currentLyric.tlyric }}</div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
export default defineComponent({
    name: 'PlayerCurrrentLyric',
    setup() {
        const store = useStore();
        const currentLyric = computed(() => store.state.currentLyric[store.state.LyricScrollY]);
        return {
            currentLyric
        }
    }
})
</script>
<style scoped>
.currrent_lyric {
    font-size: 14px;
    color: rgba(225, 225, 225, 0.8);
  }
</style>