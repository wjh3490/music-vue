<template>
  <nav class="base-tabs-nav" v-if="navList.length > 0" :class="{ fixed: isFixed }" :style="style">
    <div class="base-tabs-hidden" ref="scrollbarRef">
      <ul
        class="base-tabs-nav-wrap"
        ref="scrollItemRef"
        :class="{ 'base-tabs-nav-normal': navList.length <= 4 }"
      >
        <li
          v-for="(item, index) in navList"
          :key="item[valueKey]"
          :class="{ active: active == index }"
          :ref="getRef"
          class="base-tabs-nav-item"
          @click="$emit('tabs', index, item[valueKey])"
        >
          <span>{{ item.name }}</span>
          <slot>
            <span class="base-tabs-nav-icon" v-if="count">{{ count[item.icon] }}</span>
          </slot>
        </li>
      </ul>
      <div
        class="base-tabs-nav-line"
        :style="{
          ...transformStyle,
          ...lineStyle
        }"
      ></div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, watch, nextTick, onBeforeUnmount, PropType } from '@vue/runtime-core';
import { scrollToEase } from '@/utils';
import { StrKeys } from '@/types'

export default defineComponent({
  name: 'BaseTabs',
  props: {
    valueKey: {
      type: String,
      default: 'id'
    },
    active: {
      type: [Number, String],
      default: 0,
    },
    isFixed: {
      type: Boolean,
      default: false,
    },
    navList: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
    count: {
      type: Object,
      default: () => { },
    },
    lineStyle: {
      type: Object as PropType<StrKeys<string>>,
      default: () => { }
    },
    style: {
      type: Object as PropType<StrKeys<string>>,
      default: () => { }
    },

  },
  emit: ['change', 'tabs'],
  setup(props, { emit, expose }) {
    const scrollbarRef = ref<HTMLDivElement | null>(null);
    const scrollItemRef = ref<HTMLDivElement | null>(null);
    const lisRef = ref<HTMLLIElement[]>([]);
    const transformStyle = ref({});

    const getRef = (el): void => {
      lisRef.value.push(el as HTMLLIElement);
    }
    const init = (time = 0.3) => {
      const { offsetLeft, offsetWidth } = lisRef.value[props.active];
      const left = offsetLeft + offsetWidth / 2
      transformStyle.value = {
        transform: `translate3d(calc(${left}px - 1.5rem),0,0)`,
        transitionDuration: `${time}s`,
      };
    }
    let timeId: number = -1;
    const adjust = () => {
      nextTick(() => {
        const active = props.active;
        const viewportSize = (scrollbarRef.value as HTMLDivElement).clientWidth;
        const itemsEle = scrollItemRef.value as HTMLDivElement;
        const scrollerSize = itemsEle.clientWidth;
        const maxTranslate = scrollerSize - viewportSize;
        const middleTranslate = viewportSize / 2;
        const items = itemsEle.children;

        let size = 0;
        props.navList.every((_, index) => {
          if (index == active) {
            size += items[index]['clientWidth'] / 2;
            return false;
          }
          size += items[index]['clientWidth'];
          return true;
        });

        let translate = size - middleTranslate;
        translate = Math.min(maxTranslate, Math.max(0, translate));
        timeId = setTimeout(() => {
          scrollToEase(
            scrollbarRef.value,
            (scrollbarRef.value as HTMLDivElement).scrollLeft,
            translate,
            'scrollLeft',
            300
          );
        }, 200);
      });
    }
    watch(() => props.active, (val, oldval) => {
      init();
      emit('change', val, oldval);
      props.navList.length > 4 && nextTick(adjust);
    })
    onBeforeUnmount(() => clearInterval(timeId));
    expose({ init })
    return {
      transformStyle,
      scrollItemRef,
      scrollbarRef,
      getRef,
    }
  },
});
</script>

<style lang="less" scoped>
.base-tabs {
  &-hidden {
    position: relative;
    overflow-x: auto;
    height: 5.2rem;
    width: 100%;
  }
  &-nav {
    width: 100%;
    font-size: 16px;
    background-color: #fff;
    z-index: 10;
    overflow: hidden;
    height: 4.4rem;
    line-height: 4.4rem;

    &-wrap {
      height: 4rem;
      display: inline-block;
      white-space: nowrap;
      word-break: break-all;
      .base-tabs-nav-item {
        display: inline-block;
        padding: 0 1.5rem;
        &.active {
          color: #000 !important;
          font-weight: 600;
        }
      }
    }
    &-normal {
      display: flex;
      align-items: center;
      .base-tabs-nav-item {
        flex: 1;
        text-align: center;
        &.active {
          color: #000 !important;
          font-weight: 600;
        }
      }
    }
    &-icon {
      font-size: 12px;
    }
    &-line {
      position: absolute;
      bottom: 1.4rem;
      text-align: center;
      border-radius: 0.4rem;
      background-color: #169af3;
      height: 0.3rem;
      width: 3rem;
    }
  }
}
.fixed {
  position: fixed;
}
</style>
