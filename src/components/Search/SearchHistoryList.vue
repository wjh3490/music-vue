<template>
  <template v-if="!!historyList.length">
    <header class="search_history-title">
      <strong>搜索记录</strong>
      <span class="iconfont icon-shanchu search-icon" @click="clearAll"></span>
    </header>
    <ul class="search_history-items">
      <li v-for="(item, index) in historyList" :key="index" class="search_history-item">
        <router-link :to="{ name: 'SearchDetail', query: { keyword: item } }">{{ item }}</router-link>
      </li>
    </ul>
  </template>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import dialog from '../common/Dialog'
export default defineComponent({
  name: 'SearchHistoryList',
  setup() {
    const store = useStore()
    const historyList = computed(() => store.state.historyList)
    const clearAll = async () => {
      try {
        await dialog({ content: '是否清空所有搜索历史' })
        store.commit('setHistoryList', [])
        localStorage.setItem('history', JSON.stringify([]));
      } catch (error) { }
    }
    return { historyList, clearAll }
  },
});
</script>
<style scoped lang="less">
.search_history {
  &-title {
    color: #333;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1.2rem;
    margin-bottom: 1rem;
  }
  &-items {
    display: flex;
    flex-wrap: wrap;
  }
  &-item {
    padding: 0.4rem 1rem;
    background: #f2f3f4;
    margin-bottom: 1rem;
    margin-right: 0.8rem;
    border-radius: 30px;
    font-size: 12px;
    color: #2e3030;
  }
}
.icon-shanchu {
  font-size: 24px;
}
</style>
