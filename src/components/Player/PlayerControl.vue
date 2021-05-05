<template>
  <div class="control">
    <slot />
    <div class="control-action">
      <i
        @click.stop="actionPre"
        class="pre iconfont icon-qianjin control-icon"
      ></i>
      <i
        @click.stop="setPlaying(!playing)"
        class="pause iconfont  control-icon"
        :class="playing ? 'icon-zanting11' : 'icon-bofang'"
      ></i>
      <i
        @click.stop="actionNext"
        class="next iconfont icon-qianjin  control-icon"
      ></i>
    </div>
    <i
      @click="handleVisible"
      class="iconfont icon-iconsMusicyemianbofangmoshiPlayList collect-icon"
    ></i>
  </div>
</template>
<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';
export default {
  name: 'PlayerControl',
  computed: {
    ...mapGetters(['playing']),
  },
  methods: {
    handleVisible() {
      this.setVisible(true);
      this.setlockScroll(1);
    },
    ...mapMutations(['setPlaying', 'setVisible', 'setlockScroll']),
    ...mapActions(['actionPre', 'actionNext']),
  },
};
</script>

<style scoped lang="less">
.control {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  .control-icon {
    &.pause {
      font-size: 50px;
      margin: 0 30px;
      color: rgba(255, 255, 255, 0.7);
    }
    &.pre {
      transform: rotate(180deg);
    }
  }
}
.iconfont {
  font-size: 24px;
  color: rgba(255, 255, 255, 0.7);
}
</style>
