<template>
  <div class="play-mode">
    <slot />
    <i class="iconfont mode-icon" :class="modeOptions[mode]['icon']" @click="visible = !visible"></i>
    <!-- <transition name="slide"> -->
    <ul v-show="visible" class="mode-list">
      <li
        v-for="(item, index) in modeOptions"
        :key="item.icon"
        class="mode-item"
        @click="changeMode(index)"
      >
        <i class="iconfont mode-icon" :class="[{ active: mode === index }, item.icon]"></i>
        <span :class="{ active: mode === index }" class="mode-name">
          {{
            item.name
          }}
        </span>
      </li>
    </ul>
    <!-- </transition> -->
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { defineComponent, ref, computed } from 'vue'
import { modeOptions } from '@/utils'

type Mode = string | number | symbol;

export default defineComponent({
  name: 'PlayerMode',
  setup() {
    const store = useStore();
    const visible = ref(false);
    const mode = computed(() => store.state.mode);
    const setMode = (mode: Mode) => { store.commit('setMode', mode) }

    const changeMode = (status: Mode) => {
      visible.value = false;
      if (mode.value === status) return;
      setMode(status);
    }
    return {
      mode,
      visible,
      modeOptions,
      changeMode,
    }
  },
});
</script>
<style scoped lang="less">
.play-mode {
  position: relative;
  z-index: 1200;
  .mode-icon {
    font-size: 24px;
    color: #fff;
    vertical-align: middle;
    &.active {
      color: #a9a98a;
    }
  }
  .mode-list {
    position: absolute;
    left: 0;
    top: -325%;
    font-size: 12px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(20px) brightness(100%);
    .mode-item {
      width: 100px;
      .mode-name {
        vertical-align: middle;
        &.active {
          color: #a9a98a;
        }
      }
    }
  }
}
</style>
