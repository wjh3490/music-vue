<template>
  <transition name="slide">
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
  </transition>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { defineComponent, ref, computed } from 'vue'
import { modeOptions } from '@/utils'

type Mode = string | number | symbol;

export default defineComponent({
  name: 'PlayerMode',
  props: {
    visible: Boolean,
  },
  emits: ['update:visible'],
  setup(_, { emit }) {
    const store = useStore();
    const mode = computed(() => store.state.mode);
    const setMode = (mode: Mode) => { store.commit('setMode', mode) }

    const changeMode = (status: Mode) => {
      emit('update:visible', false)
      if (mode.value === status) return;
      setMode(status);
    }
    return {
      mode,
      modeOptions,
      changeMode,
    }
  },
});
</script>
<style scoped lang="less">
.mode-list {
  position: absolute;
  left: 2.5rem;
  bottom: 4.5rem;
  padding: 0.4rem 1rem 0.4rem 0.7rem;
  font-size: 12px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px) brightness(100%);
  border-radius: 4px;
  .mode-icon {
    font-size: 2.4rem;
    color: #fff;
    &.active {
      color: #a9a98a;
    }
  }
  .mode-item {
    width: 8rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .mode-name {
      font-size: 1.4rem;
      &.active {
        color: #a9a98a;
      }
    }
  }
}
</style>
