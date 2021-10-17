<template>
  <div class="control">
    <i
      class="iconfont mode-icon"
      :class="modeOptions[mode]['icon']"
      @click="$emit('update:visible', !visible)"
    ></i>
    <div class="control-action">
      <i @click.stop="actionPre" class="pre iconfont icon-qianjin control-icon"></i>
      <i
        @click.stop="handlePlaying"
        class="pause iconfont control-icon"
        :class="playing ? 'icon-zanting11' : 'icon-bofang'"
      ></i>
      <i @click.stop="actionNext" class="next iconfont icon-qianjin control-icon"></i>
    </div>
    <i
      @click="handleVisible"
      class="iconfont icon-iconsMusicyemianbofangmoshiPlayList collect-icon"
    ></i>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { modeOptions } from '@/utils';
export default defineComponent({
  name: 'PlayerControl',
  props: {
    visible: Boolean,
  },
  emits: ['update:visible'],
  setup() {
    const store = useStore();
    const playing = computed(() => store.state.playing);
    const mode = computed(() => store.state.mode);
    const handlePlaying = () => { store.commit('setPlaying', !playing.value) }
    const handleVisible = () => {
      store.commit('setPlayListVisible', true);
      store.commit('setlockScroll', 1)
    }
    const actionPre = () => { store.dispatch('actionPre') }
    const actionNext = () => { store.dispatch('actionNext') }

    return {
      mode,
      playing,
      modeOptions,
      actionPre,
      actionNext,
      handleVisible,
      handlePlaying,
    }
  },
});
</script>

<style scoped lang="less">
.control {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
  .control-icon {
    &.pause {
      font-size: 50px;
      margin: 0 3rem;
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
