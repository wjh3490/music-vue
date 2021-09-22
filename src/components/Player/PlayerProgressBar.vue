<template>
  <div class="proress-wrap">
    <div class="currentTime">{{ currentTime }}</div>
    <div class="proress-line-wrap">
      <div class="proress-bar" ref="progressRef" @click.stop.prevent="hanleClick">
        <div
          ref="progressBarRef"
          :style="{ transform: `translate3d(${percent - 100}%,0,0)` }"
          class="line-bar"
        >
          <div
            class="ball"
            ref="progressBall"
            @touchstart.stop="handleTouchStart"
            @touchmove.stop.passive="handleTouchMove"
            @touchend.stop="handleTouchEnd"
          >
            <div class="tip" v-show="visible">{{ tips }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="duration">{{ duration }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onUnmounted, onMounted, nextTick, } from 'vue';;
import { useStore } from 'vuex';
import { formatTime } from '@/utils'
export default defineComponent({
  name: 'PlayerProgressBar',
  setup() {
    const store = useStore();
    const progressRef = ref<any>(null);
    const progressBarRef = ref<any>(null);
    const isMove = ref(false);
    const visible = ref(false);
    const tips = ref(0);
    let touch = { startX: 0, left: 0 } as { startX: number, left: number };
    let cachePercent: number = 0;;
    let finaPercent: number = 0;

    const percent: any = computed({
      get() {
        if (isMove.value) return;
        const ratio = store.state.currentTime / store.state.duration
        return (ratio * 100).toFixed(2) || 0;
      },
      set(val) {
        progressBarRef.value.style.transform = `translate3d(${(val as number) - 100}%, 0, 0)`
      }
    })
    const duration = computed(() => formatTime(store.state.duration));
    const currentTime = computed(() => formatTime(store.state.currentTime));

    const handleTouchStart = (e: TouchEvent) => {
      touch.startX = e.touches[0].clientX;
      touch.left = progressRef.value.clientWidth;
      cachePercent = percent.value as number
    }
    const handleTouchMove = (e: TouchEvent) => {
      isMove.value = true;
      visible.value = true;
      const deltaX = e.touches[0].clientX - touch.startX;
      const newPercent = deltaX / touch.left;
      percent.value = Math.max(Math.min(+cachePercent + newPercent * 100, 100), 0);
      finaPercent = +cachePercent + newPercent * 100;
      tips.value = formatTime(finaPercent / 100 * store.state.duration);
    }
    let audio;
    nextTick(() => { audio = document.getElementById('audio') as HTMLAudioElement });
    const handleCurrentTime = (time: number) => {
      const filterLyric = store.getters.lyricKeys.filter((item) => item <= Math.floor(time));
      audio.currentTime = time;
      store.commit('setLyricScrollY', filterLyric.length);
      store.commit('setDebounce', true);
    }
    let timeId = -1;
    const handleTouchEnd = () => {
      const currentTime = finaPercent / 100 * store.state.duration;
      handleCurrentTime(currentTime);
      visible.value = false;
      timeId = setTimeout(() => { isMove.value = false }, 50);
    };
    const hanleClick = (e) => {
      const offsetX = progressRef.value.getBoundingClientRect().left;
      const width = progressRef.value.getBoundingClientRect().width;
      const percent = (e.clientX - offsetX) / width;
      const currentTime = percent * store.state.duration;
      handleCurrentTime(currentTime)
    };

    onUnmounted(() => {
      clearTimeout(timeId)
    })

    return {
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
      hanleClick,
      progressBarRef,
      progressRef,
      currentTime,
      duration,
      percent,
      visible,
      tips,
    }
  },
});
</script>
<style scoped lang="less">
.proress {
  &-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    padding: 0.6rem 0;
    .line-bar {
      position: absolute;
      left: 0;
      top: 0;
      width: 0;
      height: 0.3rem;
      width: 100%;
      background-color: #fff;
      .ball {
        position: absolute;
        right: -1.5rem;
        top: 50%;
        transform: translateY(-50%);
        height: 1.5rem;
        width: 1.5rem;
        background-color: #fff;
        border-radius: 50%;
        .tip {
          width: 4rem;
          height: 2.2rem;
          position: absolute;
          text-align: center;
          line-height: 2.22rem;
          top: -3.5rem;
          left: 50%;
          transform: translate3d(-50%, 0, 0);
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
          background: rgba(0, 0, 0, 0.4);
        }
      }
    }
  }
  &-bar {
    position: relative;
    width: calc(100% - 1.5rem);
    height: 0.3rem;
    background-color: rgba(255, 255, 255, 0.3);
    font-size: 14px;
    font-weight: 100;
    color: #fff;
  }
  &-line-wrap {
    position: relative;
    width: calc(75% + 1.5rem);
    height: 100%;
    overflow: hidden;
    padding: 0.6rem 0;
  }
}
</style>
