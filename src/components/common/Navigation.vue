<template>
  <nav class="nav-conainer">
    <router-link :to="item.to" v-for="item in navList" :key="item.name" class="nav-item">
      <span :class="[item.icon, type]" class="iconfont nav-icon"></span>
      <span class="nav-name">{{ item.name }}</span>
    </router-link>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
export default defineComponent({
  name: 'Navigation',
  props: {
    navList: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
    type: {
      type: String,
      default: '',
    }
  },
});
</script>

<style lang="less" scoped>
.nav-conainer {
  display: flex;
  font-size: 16px;
  margin-top: 2rem;
  overflow: hidden;
  .nav-item {
    flex: 1;
    text-align: center;
    color: #169af2;
  }
  .primary {
    background-color: #169af2;
    color: #fff;
  }
  .nav-icon {
    display: inline-block;
    font-size: 24px;
    width: 5rem;
    height: 5rem;
    line-height: 5rem;
    border-radius: 50%;
  }
  .nav-name {
    display: block;
    font-size: 13px;
    color: #000;
    margin-top: 6px;
  }
}
</style>
