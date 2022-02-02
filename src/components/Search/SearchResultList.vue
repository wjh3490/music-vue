<template >
  <ul class="search_result-container">
    <li v-for="item in list" :key="item.keyword" class="search_result-item">
      <span class="iconfont icon-sousuo"></span>
      <router-link
        :to="{ name: 'SearchDetail', query: { keyword: item.keyword } }"
        class="search_result-link"
      >
        <span v-html="highlight(item.keyword, keyword)"></span>
      </router-link>
    </li>
    <li v-if="!list.length">
      <router-link
        :to="{ name: 'SearchDetail', query: { keyword } }"
        class="search_result-no search_result-item"
      >搜索 “{{ keyword }}”</router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import useHighlight from '@/composables/useHighlist'
export default defineComponent({
  name: 'SearchResultList',
  props: {
    list: {
      type: Array as PropType<Array<{ keyword: string }>>,
      default: () => []
    },
    keyword: {
      type: String,
      default: ''
    }
  },
  setup() {
    const { highlight } = useHighlight()
    return { highlight }
  }
});
</script>
<style scoped lang="less">
.search_result {
  &-link {
    flex: 1;
    margin-left: 1rem;
    border-bottom: 0.01rem solid #e4e4e4;
  }
  &-item {
    display: flex;
    align-items: center;
    line-height: 4rem;
    padding-left: 1rem;
    color: #2e3030;
    font-size: 14px;
  }
  &-no {
    border-bottom: 0.01rem solid #e4e4e4;
    color: var(--blue);
  }
}
</style>
