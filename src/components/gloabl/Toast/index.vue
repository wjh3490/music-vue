<template>
  <div class="toast" v-show="visible">
    <span class="iconfont" :class="{ icon }"></span>
    <span>{{ message }}</span>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  data() {
    return {
      message: '',
      icon: '',
      visible: true,
      time: '',
    };
  },
  beforeDestroy() {
    clearTimeout(this.time);
  },
};
</script>
<style lang="less" scoped>
.toast {
  position: fixed;
  z-index: 9999;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: content-box;
  max-width: 70%;
  padding:  12px 16px;
  color: #fff;
  font-size: 14px;
  line-height: 20px;
  white-space: pre-wrap;
  text-align: center;
  word-wrap: break-word;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  transform: translate3d(-50%, -50%, 0);
}
</style>
