<template>
  <div class="Base-music">
    <div v-for="(item, index) in balls" :key="index">
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
      >
        <div class="musicIcon ball" v-show="item.show">
          <i class="iconfont icon-yinle inner inner-hook"></i>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BaseBall',
  data() {
    return {
      balls: [
        { show: false },
        { show: false },
        { show: false },
        { show: false },
        { show: false },
      ],
      dropBalls: [],
    };
  },
  methods: {
    drop(el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          this.dropBalls.push(ball);
          return;
        }
      }
    },
    beforeEnter(el) {
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect();
          let x = 120;
          let y = -(window.innerHeight - rect.top - 50);
          console.log(y)
          el.style.display = '';
          el.style.webkitTransform = `translate3d(0,${y}px,0)`;
          el.style.transform = `translate3d(0,${y}px,0)`;
          el.style.transition = 'all .8s';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
          inner.style.transform = `translate3d(${x}px,0,0)`;
          inner.style.transition = 'all .8s';
        }
      }
    },
    enter(el, done) {
      /*eslint-disable-next-line */
      let rf = el.offsetHeight;
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0,0,0)';
        el.style.transform = 'translate3d(0,0,0)';
        el.style.transition = 'all .8s cubic-bezier(.62,-0.1,.86,.57)';
        let inner = el.getElementsByClassName('inner-hook')[0];
        inner.style.webkitTransform = 'translate3d(0,0,0)';
        inner.style.transform = 'translate3d(0,0,0)';
        inner.style.transition = 'all .8s linear';
        el.addEventListener('transitionend', done);
        // done();
      });
    },

    afterEnter(el) {
      let ball = this.dropBalls.shift();
      if (ball) {
        ball.show = false;
        el.style.display = 'none';
      }
    },
  },
};
</script>

<style lang="less" scoped>
.musicIcon {
  position: fixed;
  bottom: 35px;
  left: 100px;
  z-index: 9999;
  i {
    font-size: 30px;
    color: #169af3;
    font-weight: 700;
  }
}
</style>
