<template>
  <div class="proress-wrap">
    <div class="currentTime">{{ currentTime | format }}</div>
    <div class="proress-bar" v-progress>
      <div
        class="line-bar"
        :style="{ width: `${percent}%`, backgroundColor: '#fff' }"
      >
        <div class="ball" ref="progressBall">
          <div class="tip" v-show="visible">
            {{ tip | format }}
          </div>
        </div>
      </div>
    </div>
    <div class="duration">{{ duration | format }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import progress from '@/directives/progress.js';
export default {
  name: 'PlayerProgressBar',
  directives: { progress },
  data() {
    return {
      tip: 0,
      visible: false,
      isMove: false,
    };
  },
  computed: {
    percent({ isMove, currentTime, duration }) {
      if (isMove) return;
      return ((currentTime / duration) * 100).toFixed(2) || 0;
    },
    ...mapGetters(['duration', 'currentTime', 'lyricKeys']),
  },
};
</script>
<style scoped lang="less">
.proress {
  &-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
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
        height: 15px;
        width: 15px;
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
          font-weight: 500;
          background: rgba(0, 0, 0, 0.4);
        }
      }
    }
  }
  &-bar {
    position: relative;
    width: 75%;
    height: 3px;
    background-color: rgba(255, 255, 255, 0.3);
    font-size: 14px;
    font-weight: 100;
    color: #fff;
  }
}
</style>
