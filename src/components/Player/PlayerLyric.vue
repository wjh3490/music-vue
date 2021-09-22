<template>
  <div class="lyric">
    <div class="lyric-wrap">
      <p class="lyric-singer">
        <!-- <marquee behavior="" direction="">{{ currentSong.name }}</marquee> -->
      </p>
      <p class="lyric-name">{{ currentSong.artists }}</p>
    </div>
    <div class="lyric-item" ref="lyricRef">
      <div class="empty1"></div>
      <div class="no-lyric" v-if="!lyricKeys.length">暂无歌词</div>
      <div
        v-for="(item, index) in currentLyric"
        :key="item.time"
        :ref="el => { if (el) activeLyricRef[index] = el }"
        class="lyrics"
      >
        <p :class="{ 'active-lyric': item.time == activeLyricIndex }">{{ item.lyric }}</p>
        <p v-if="item.tlyric">{{ item.tlyric }}</p>
      </div>

      <div class="empty"></div>
    </div>
    <div class="pause-wrap" @click.stop="setPlaying">
      <i class="pause iconfont control-icon" :class="playing ? 'icon-zanting11' : 'icon-bofang'"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed, nextTick } from 'vue'
import { useStore } from 'vuex'
import { scrollToEase } from '@/utils/index.js';
export default defineComponent({
  name: 'PlayerLyric',
  setup() {
    const store = useStore()
    const lyricRef = ref<any>(null);
    const activeLyricRef = ref([]);
    const currentLyric = computed(() => store.state.currentLyric);
    const currentSong = computed(() => store.getters.currentSong);
    const activeLyricIndex = computed(() => store.state.activeLyricIndex);
    const playing = computed(() => store.state.playing);
    const lyricKeys = computed(() => store.getters.lyricKeys);
    const LyricScrollY = computed(() => store.state.LyricScrollY);

    const scrollAnimate = () => {
      const activeElement = activeLyricRef.value[LyricScrollY.value];
      if (!activeElement) return;
      const start = lyricRef.value.scrollTop;
      const { offsetTop, offsetHeight } = activeElement;
      scrollToEase(lyricRef.value, start, offsetTop - 100 - offsetHeight);
    };
    const setPlaying = () => {
      store.commit('setPlaying', !playing)
    };

    watch(() => store.state.currentTime, (val) => {
      if (!lyricKeys.value.length) return;
      if (!store.state.fullScreen) return;
      if (lyricKeys.value[LyricScrollY.value] > ~~val) {
        if (store.state.debounce) {
          store.commit('setActiveLyricIndex', lyricKeys.value[Math.min(LyricScrollY.value - 1, lyricKeys.value.length - 1)])
          nextTick(scrollAnimate);
          store.commit('setDebounce', false);
        };
        return;
      };
      store.commit('setLyricScrollY', Math.min(LyricScrollY.value + 1, lyricKeys.value.length))
      store.commit('setActiveLyricIndex', lyricKeys.value[Math.min(LyricScrollY.value - 1, lyricKeys.value.length - 1)])
      nextTick(scrollAnimate)
    });
    watch(() => store.state.currrentIndex, () => {
      store.commit('setLyricScrollY', 0)
    });

    return {
      playing,
      lyricRef,
      lyricKeys,
      currentSong,
      currentLyric,
      activeLyricRef,
      activeLyricIndex,
      setPlaying,
    }
  },
});
</script>
<style scoped lang="less">
.lyric-wrap {
  padding: 0 5rem;
  color: #fff;
  .lyric-singer {
    font-size: 24px;
    color: #fff;
    font-weight: 700;
  }
  .lyric-name {
    color: rgba(225, 225, 225, 0.8);
    font-size: 16px;
    margin: 0.4rem 0;
  }
}
.lyric {
  width: 100%;
  height: calc(100% - 2.6rem);
  margin-top: 2.6rem;
  width: 100%;
  position: relative;

  .lyric-item {
    height: 65%;
    width: 100%;
    margin-top: 16px;
    overflow-x: hidden;
    overflow-y: scroll;
    padding-right: 0.7rem;
    box-sizing: content-box;
    transition: opacity 1s;
    -webkit-overflow-scrolling: touch;
    -webkit-mask-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.6) 10%,
      rgba(255, 255, 255, 1) 20%,
      rgba(255, 255, 255, 1) 75%,
      rgba(255, 255, 255, 0.6) 85%,
      rgba(255, 255, 255, 0) 100%
    );
    min-height: 25rem;
    .empty {
      height: 8rem;
    }
    .empty1 {
      height: 4rem;
    }
    p {
      padding: 0.4rem 2.3rem;
      transition: font-size 0.3s;
      &.active-lyric {
        color: rgba(238, 238, 113, 0.75);
        font-weight: 700;
        opacity: 1;
        font-size: 20px;
      }
    }
    .lyrics {
      font-size: 16px;
      text-align: left;
      color: rgba(225, 225, 225, 0.8);
      padding-bottom: 0.8rem;
    }
  }

  .no-lyric {
    line-height: 4rem;
    font-size: 16px;
    color: #fff;
    text-align: center;
  }
}

.pause {
  font-size: 40px;
  border-radius: 50%;
  text-align: center;
  margin-right: 30px;
  color: rgba(255, 255, 255, 0.8);
}
.pause-wrap {
  position: absolute;
  bottom: 2rem;
  right: 0;
  text-align: right;
}
</style>
