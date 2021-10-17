<template>
  <div class="header-search">
    <router-link tag="div" to="/search" class="header-link">
      <span class="iconfont icon-sousuo header-icon"></span>
      <span>请输入搜索内容</span>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'HomeSearch',
});
</script>
<style scoped lang="less">
.header {
  &-link {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.6rem 0;
    margin: 1.5rem 0;
    background: #e7eaec;
    border-radius: 5rem;
    text-align: center;
    color: #b7b3b3;
  }
  &-search {
    padding: 0 2rem;
    font-size: 16px;
  }
  &-icon {
    font-size: 18px;
  }
}
</style>
