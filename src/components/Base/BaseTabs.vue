<template>
  <nav
    class="base-tabs-nav"
    v-if="navList.length > 0"
    :style="{ top, position }"
  >
    <div class="base-tabs-hidden" ref="scrollbar">
      <ul
        class="base-tabs-nav-wrap"
        ref="scrollItem"
        :class="{ 'base-tabs-nav-normal': navList.length <= 4 }"
      >
        <li
          v-for="(item, index) in navList"
          :key="item.id"
          @click="$emit('tabs', index)"
          :class="{ active: active == index }"
          class="base-tabs-nav-item"
          ref="li"
        >
          {{ item.name }}
        </li>
      </ul>
      <div class="base-tabs-nav-line" :style="lineStyle"></div>
    </div>
  </nav>
</template>

<script>
import { scrollToEase } from '@/utils';
export default {
  name: 'BaseTabs',
  props: {
    navList: {
      type: Array,
      default: () => [],
    },
    active: {
      type: [Number, String],
      default: 0,
    },
    position: {
      type: String,
      default: 'fixed',
    },
    top: {
      type: String,
      default: '1.33rem',
    },
  },
  data() {
    return {
      lineStyle: {},
    };
  },
  watch: {
    active(val, oldval) {
      this.init(0.3);
      this.$emit('change', val, oldval);
      this.navList.length > 4 && this.adjust();
    },
    navList: {
      handler() {
        this.$nextTick(() => {
          this.init();
        });
      },
      deep: true,
    },
  },
  methods: {
    init(time) {
      const li = this.$refs.li[this.active];
      const left = li.offsetLeft + li.offsetWidth / 2;
      this.lineStyle = {
        transform: `translate3d(${left}px,0px,0px) translate3d(-50%,0px,0px)`,
        transitionDuration: `${time}s`,
      };
    },
    adjust() {
      this.$nextTick(() => {
        const active = this.active;
        const viewportSize = this.$refs.scrollbar.clientWidth;
        const itemsEle = this.$refs.scrollItem;
        const scrollerSize = itemsEle.clientWidth;
        const maxTranslate = scrollerSize - viewportSize;
        const middleTranslate = viewportSize / 2;
        const items = itemsEle.children;

        let size = 0;
        this.navList.every((label, index) => {
          if (index == active) {
            size += items[index]['clientWidth'] / 2;
            return false;
          }

          size += items[index]['clientWidth'];
          return true;
        });

        let translate = size - middleTranslate;
        translate = Math.min(maxTranslate, Math.max(0, translate));
        this.translate = translate;
        this.time = setTimeout(() => {
          scrollToEase(
            this.$refs.scrollbar,
            this.$refs.scrollbar.scrollLeft,
            translate,
            'scrollLeft',
            300
          );
        }, 200);
        this.$once('beforeDestory', () => clearInterval(this.time));
      });
    },
  },
};
</script>

<style lang="less" scoped>
.base-tabs {
  &-hidden {
    position: relative;
    overflow-x: auto;
    height: 52px;
    width: 100%;
  }
  &-nav {
    width: 100%;
    position: fixed;
    top: 50px;
    font-size: 16px;
    background-color: #fff;
    z-index: 99;
    overflow: hidden;
    height: 44px;
    line-height: 44px;

    &-wrap {
      height: 40px;
      display: inline-block;
      white-space: nowrap;
      word-break: break-all;
      .base-tabs-nav-item {
        display: inline-block;
        font-weight: 600;
        padding: 0 15px;
        &.active {
          color: #169af3;
        }
      }
    }
    &-normal {
      display: flex;
      align-items: center;
      .base-tabs-nav-item {
        flex: 1;
        text-align: center;
        font-weight: 600;
        &.active {
          color: #169af3;
        }
      }
    }
    &-line {
      position: absolute;
      bottom: 10px;
      text-align: center;
      height: 3px;
      width: 30px;
      background-color: #169af3;
      border-radius: 4px;
    }
  }
}
</style>
