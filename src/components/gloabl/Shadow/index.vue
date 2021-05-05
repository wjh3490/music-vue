<template>
  <transition name="fade">
    <div
      @click="close"
      v-show="visible"
      class="shadow"
      :style="{ background, zIndex }"
    ></div>
  </transition>
</template>

<script>
export default {
  name: 'Shadow',
  data() {
    return {
      visible: false,
      zIndex: 2000,
      background: 'rgba(0, 0, 0, 0)',
      closed: false,
      onClose: null,
    };
  },
  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false;
        this.$el.parentNode.removeChild(this.$el);
      }
    },
    visible: {
      immediate: true,
      handler(val) {
        let flag = document.body.classList.contains('shadow-hidden');
        if (val) {
          if (!flag) document.body.classList.add('shadow-hidden');
        } else {
          document.body.classList.remove('shadow-hidden');
        }
      },
    },
  },
  methods: {
    close() {
      this.closed = true;
      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    },
  },
};
</script>
<style scoped>
.shadow {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
.shadow-hidden {
  overflow: hidden !important;
}
.fade-enter,
.fade-enter-leave-to {
  opacity: 1;
}
.fade-enter-active,
.fade-enter-leave-active {
  transition: all 100s;
}
</style>
