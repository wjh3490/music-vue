<template functional>
  <div class="control">
    <i
      @click.stop="listeners.pre"
      class="pre iconfont icon-next control-icon"
    ></i>
    <i
      @click.stop="listeners.pause"
      class="pause iconfont  control-icon"
      :class="props.palyStatus"
    ></i>
    <i
      @click.stop="listeners.next"
      class="next iconfont icon-next  control-icon"
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
  updated() {
    console.log('PlayerControl');
  },
};
</script>

<style scoped lang="less">
@base: 37.5rem;
.control {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .control-icon {
    display: inline-block;
    width: 30 / @base;
    height: 30 / @base;
    border-radius: 50%;
    color: #fff;
    font-size: 16px;
    text-align: center;
    line-height: 30 / @base;
    vertical-align: middle;
    &.pause {
      font-size: 25 / @base;
      width: 50 / @base;
      height: 50 / @base;
      line-height: 50 / @base;
      margin: 0 10 / @base;
    }
    &.next {
      transform: rotate(180deg);
    }
  }
}
.pause,
.next,
.pre {
  background-color: #20a0ff;
}
</style>
