<template>
  <div class="proress-bar" ref="progressBar" @click.prevent="progressClick">
    <div class="currentTime">{{ currentTime | format }}</div>
    <div class="duration">{{ duration | format }}</div>

    <div
      ref="progress"
      class="line-bar"
      :style="{ width: `${percent}%`, backgroundColor: bgc }"
    >
      <div
        class="ball"
        @touchstart.stop="ballTouchStart"
        @touchmove.stop="ballTouchMove"
        @touchend.stop="ballTouchEnd"
      >
        <div class="tip" :style="{ background: bgc }" v-show="tipShow">
          {{ tip | format }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  filters: {
    format(interval) {
      interval = interval | 0;
      let minute = (interval / 60) | 0;
      let second = (interval % 60).toString().padStart(2, '0');
      // minute = minute < 10 ? "0" + minute : minute;
      // second = second < 10 ? '0' + second : second
      // second = second.padStart(2, '0')
      return minute + ':' + second;
    }
  },
  
  props: {
    bgc: String,
    duration: Number,
    currentTime: Number,
    move: Boolean
  },

  data() {
    return {
      tip: 0,
      tipShow: false
    };
  },

  computed: {
    percent({ currentTime, duration }) {
      let _currentTime = currentTime;
      let _duration = duration;
      return (_currentTime / _duration) * 100;
    },
    isMove: {
      get() {
        return this.move;
      },
      set(val) {
        this.$emit('update:move', val);
      }
    }
  },

  created() {
    this.touch = {};
  },

  methods: {
    ballTouchStart(e) {
      this.touch.initiated = true;
      this.touch.startX = e.touches[0].pageX;
      this.touch.left = this.$refs.progress.clientWidth;
    },
    ballTouchMove(e) {
      if (!this.touch.initiated) {
        return;
      }
      this.isMove = true;
      this.tipShow = true;
      const deltaX = e.touches[0].pageX - this.touch.startX;
      const offsetWidth = Math.min(
        this.$refs.progressBar.clientWidth,
        Math.max(0, this.touch.left + deltaX)
      );

      let percent = offsetWidth / this.$refs.progressBar.clientWidth;
      this.$refs.progress.style.width = percent * 100 + '%';
      let currentTime = percent * this.duration;
      this.tip = currentTime;
    },
    ballTouchEnd(e) {
      const deltaX = e.changedTouches[0].clientX - this.touch.startX;
      const offsetWidth = Math.min(
        this.$refs.progressBar.clientWidth,
        Math.max(0, this.touch.left + deltaX)
      );
      let percent = offsetWidth / this.$refs.progressBar.clientWidth;
      let currentTime = percent * this.duration;

      this.isMove = false;
      // this.$refs.audio.currentTime = currentTime
      this.$emit('progressBar', currentTime);
      this.tipShow = false;
    },
    progressClick(e) {
      let offsetX = this.$refs.progressBar.getBoundingClientRect().left;

      let percent = (e.clientX - offsetX) / this.$refs.progressBar.clientWidth;
      let currentTime = percent * this.duration;
      this.$emit('progressBar', currentTime);
      // this.$refs.audio.currentTime = currentTime
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
