<template functional>
  <div class="control">
    <i
      @click.stop="listeners.pre"
      class="pre iconfont icon-qianjin control-icon"
    ></i>
    <i
      @click.stop="listeners.pause"
      class="pause iconfont  control-icon"
      :class="props.palyStatus"
    ></i>
    <i
      @click.stop="listeners.next"
      class="next iconfont icon-qianjin  control-icon"
    ></i>
  </div>
</template>
<script>
export default {
  name: 'PlayerControl',
  props: {
    palyStatus: {
      type: String,
      defaule: '',
    },
  },
};
</script>

<style scoped lang="less">
.control {
  display: flex;
  align-items: center;
  .control-icon {
    &.pause {
      font-size: 40px;
      margin: 0 30px;
      color: rgba(255, 255, 255, 0.7);
    }
    &.pre {
      transform: rotate(180deg);
      color: rgba(255, 255, 255, 0.8);
      font-size: 24px;
    }
    &.next {
      color: rgba(255, 255, 255, 0.8);
      font-size: 24px;
    }
  }
}
</style>
