<template>
  <div  class="proress-bar"  v-progress >
    <div 
      class="line-bar"
      :style="{ width: `${percent}%`, backgroundColor: '#20a0ff' }"
    >
      <div
        class="ball"
        ref="progressBall"
      >
        <div class="tip" :style="{ background: '#20a0ff' }" v-show="visible">
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
  name: 'PlayerProgressBar',
  filters: {
    format
  },
 updated() {
    console.log('PlayerProgressBar')
  },
  directives: { progress },
  props: {
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
.proress-bar {
  position: absolute;
  bottom: 120px;
  left: 50%;
  width: 70%;
  transform: translateX(-50%);
  height: 3px;
  background-color: rgba(255, 255, 255, 0.3);
  font-size: 14px;
  font-weight: 100;
  color: #fff;
  .currentTime {
    position: absolute;
    left: -36px;
    top: 50%;
    transform: translateY(-50%);
  }
  .duration {
    position: absolute;
    right: -40px;
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
      right: -10px;
      top: 50%;
      transform: translateY(-50%);
      height: 10px;
      width: 10px;
      background-color: #fff;
      border-radius: 50%;
      .tip {
        width: 40px;
        height: 22px;
        position: absolute;
        text-align: center;
        line-height: 22px;
        top: -35px;
        left: 50%;
        transform: translate3d(-50%, 0, 0);
        border-radius: 4px;
        font-size: 12px;
      }
    }
  }
}
</style>
