<template>
  <transition name="confirm-fade">
    <div class="confirm" v-show="visible" @click.stop="clickCancel">
      <div class="confirm-wrapper">
        <div class="confirm-content">
          <p class="text">{{ content }}</p>
          <div class="operate">
            <div @click.stop="clickCancel" class="operate-btn left">
              取消
            </div>
            <div @click.stop="clickConfirm" class="operate-btn">确定</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import store from '@/store';
export default {
  name: 'MessageBox',
  data() {
    return {
      visible: false,
      title: '提示',
      content: '内容',
      resolve: '',
      reject: '',
    };
  },
  methods: {
    clickConfirm() {
      this.visible = false;
      store.commit('setlockScroll', -1);
      this.resolve('confirm');
    },
    clickCancel() {
      this.visible = false;
      store.commit('setlockScroll', -1);
      this.reject('cancel');
    },
    showMsgBox: function() {
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
  },
};
</script>

<style scoped lang="less">
.confirm {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1007;
  background-color: rgba(0, 0, 0, 0.3);
  &.confirm-fade-enter-active {
    animation: confirm-fadein 0.3s;
    .confirm-content {
      animation: confirm-zoom 0.3s;
    }
  }
  .confirm-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    .confirm-content {
      width: 270px;
      border-radius: 5px;
      background: #fff;
      .text {
        padding: 12px 15px;
        line-height: 22px;
        text-align: center;
        font-size: 12px;
      }
      .operate {
        display: flex;
        align-items: center;
        text-align: center;
        font-size: 12px;
        .operate-btn {
          flex: 1;
          line-height: 22px;
          padding: 12px 0;
          border-top: 1px solid #f5f5f5;
          color: red;
          &.left {
            border-right: 1px solid #f5f5f5;
          }
        }
      }
    }
  }
}

@keyframes confirm-fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes confirm-zoom {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
