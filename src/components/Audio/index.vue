<template>
  <audio
    :src="src"
    id="audio"
    ref="audio"
    @timeupdate="audioTimeUpdate"
    @ended="handleEnd"
    @canplay="canplay"
    @error="songReady = true"
    @play="ready"
  ></audio>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref, watch } from 'vue'
import { useStore } from 'vuex';
import { playMode, parseLyric, formatLyrics, shuffle } from '@/utils';
import { fetchSong, fetchLyric } from '@/api/songs';

export default defineComponent({
  name: 'VueAudio',
  setup() {
    const store = useStore();
    const src = ref('');
    const songReady = ref(false);
    const audio = ref<any>(null);

    const audioTimeUpdate = (e: Event) => {
      store.commit('setCurrentTime', (e.target as HTMLAudioElement).currentTime)
    };
    const canplay = () => {
      nextTick(() => store.commit('setDuration', audio.value.duration));
    };
    const getLyric = async (id: number) => {
      const res = await fetchLyric(id);
      const currentLyric = parseLyric(res.lrc.lyric) || {};
      const currentTLyric = parseLyric(res.tlyric.lyric) || {};
      const lyrics = formatLyrics(currentLyric, currentTLyric);
      store.commit('setCurrentLyric', lyrics);
    };

    const handleEnd = () => {
      if (store.state.playList.length === 1) store.commit('setMode', playMode.loop);
      store.state.mode === playMode.loop ? handleLoop() : handleNext();
    };
    const handleLoop = () => {
      store.commit('setCurrentTime', 0)
      store.commit('setLyricScrollY', 0)
      nextTick(() => audio.value.play())
    };
    const handleNext = () => {
      store.dispatch('actionNext')
    };
    const setCurrrentIndex = (index: number) => {
      store.commit('setCurrrentIndex', index)
    };
    const resetCurrentIndex = (list) => {
      const index = list.findIndex((item) => item.id === store.getters.currentSong.id);
      setCurrrentIndex(index);
    };
    const getNewList = (mode: number) => {
      const list =
        (mode === playMode.random
          ? shuffle(store.state.sequenceList)
          : store.state.sequenceList);
      resetCurrentIndex(list);
      store.commit('setPlay', list)
    };
    const ready = () => { };

    watch(() => store.getters.currentSong, async (newSong) => {
      const res = await fetchSong(newSong.id);
      if (!res.data[0].url) {
        src.value = `https://music.163.com/song/media/outer/url?id=${newSong.id}.mp3`;
      } else {
        src.value = res.data[0].url;
      }
      getLyric(newSong.id)
      store.commit('setPlaying', true)
      store.commit('setLyricScrollY', 0)
      store.commit('setCurrentTime', 0)
      nextTick(() => audio.value.play())
    })
    watch(() => store.state.playing, (val) => {
      if (val) {
        nextTick(() => audio.value.play());
      } else {
        nextTick(() => audio.value.pause());
      }
    })
    watch(() => store.state.mode, getNewList)

    return {
      src,
      audio,
      songReady,
      ready,
      canplay,
      handleEnd,
      audioTimeUpdate,
    }
  },
});
</script>
<style scoped lang="less">
@base: 37.5rem;
.player {
  position: relative;
  z-index: 100;
}
</style>
