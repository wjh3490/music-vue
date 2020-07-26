<template>
  <div  class="proress-bar"  v-progress >
    <div 
      class="line-bar"
      :style="{ width: `${percent}%`, backgroundColor: bgc }"
    >
      <div
        class="ball"
        ref="progressBall"
      >
        <div class="tip" :style="{ background: bgc }" v-show="visible">
          {{ tip | format }}
        </div>
      </div>
    </div>
    <div class="currentTime">{{ currentTime | format }}</div>
    <div class="duration">{{ duration | format }}</div>

 
  </div>
</template>

<script>
/*eslint-disable */
import { format } from '@/filters';
import progress from '@/directives/progress.js';
export default {
  name: 'ProgressBar',
  filters: {
    format
  },

  directives: { progress },
  props: {
    bgc: String,
    duration: Number,
    currentTime: Number,
    lyricKeys: [Array, String],
    LyricScrollY: Number,
    debounce: Boolean
  },

  data() {
    return {
      tip: 0,
      visible: false,
      isMove: false
    };
  },

  computed: {
    percent(vm) {
      if (this.isMove) return;
      return (this.currentTime / this.duration) * 100 || 0;
    }
  }
};
</script>
<style scoped lang="less">
@base: 37.5rem;
.proress-bar {
  position: absolute;
  bottom: 120px;
  left: 50%;
  width: 70%;
  transform: translateX(-50%);
  height: 3 / @base;
  background-color: rgba(255, 255, 255, 0.3);
  font-size: 14px;
  font-weight: 100;
  color: #fff;
  .currentTime {
    position: absolute;
    left: -36 / @base;
    top: 50%;
    transform: translateY(-50%);
  }
  .duration {
    position: absolute;
    right: -40 / @base;
    top: 50%;
    transform: translateY(-50%);
  }
  .line-bar {
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: 100%;
    .ball {
      position: absolute;
      right: -10 / @base;
      top: 50%;
      transform: translateY(-50%);
      height: 10 / @base;
      width: 10 / @base;
      background-color: #fff;
      border-radius: 50%;
      .tip {
        width: 40 / @base;
        height: 22 / @base;
        position: absolute;
        text-align: center;
        line-height: 22 / @base;
        top: -35 / @base;
        left: 50%;
        transform: translate3d(-50%, 0, 0);
        border-radius: 4 / @base;
        font-size: 12px;
      }
    }
  }
}
</style>
