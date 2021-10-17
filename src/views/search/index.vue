<template>
  <div class="search-container">
    <g-head-nav :show="false">
      <template #left>{{ null }}</template>
      <div class="search-container-wrap">
        <i class="iconfont icon-sousuo search-container-look"></i>
        <input
          type="text"
          v-model="keywords"
          :placeholder="defaultKeyword"
          ref="inputRef"
          class="search-container-input"
          @keydown.enter="handleKeyDown"
        />
        <i
          v-show="keywords"
          class="iconfont icon-guanbi2fill search-container-close"
          @click="handleClear"
        ></i>
      </div>
      <template #right>
        <router-link :to="{ name: 'Home' }" style="padding: 0 1rem;">取消</router-link>
      </template>
    </g-head-nav>

    <div v-show="!keywords" class="search-container-list">
      <search-history-list />
      <search-hot-list />
    </div>

    <search-result-list v-show="keywords" :list="searchList" :keyword="keywords" />
  </div>
</template>

<script lang="ts">
const MAX_LENGTH = 10
import debounce from 'lodash.debounce'
import { defineComponent, ref, watch, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { fetchSearchSuggest, fetchSearchDefault } from '@/api/search'
import SearchHistoryList from '@/components/Search/SearchHistoryList.vue'
import SearchResultList from '@/components/Search/SearchResultList.vue'
import SearchHotList from '@/components/Search/SearchHotList.vue'

export default defineComponent({
  name: 'Search',
  components: { SearchHistoryList, SearchResultList, SearchHotList },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const keywords = ref('')
    const defaultKeyword = ref('')
    const searchList = ref([])
    const inputRef = ref<HTMLInputElement | null>(null)
    const getSearchList = async (keywords: string) => {
      const { result: { allMatch = [] } } = await fetchSearchSuggest({
        keywords,
        type: 'mobile'
      })
      searchList.value = allMatch
    }
    const getSearchDefault = async () => {
      const { data: { showKeyword } } = await fetchSearchDefault()
      defaultKeyword.value = showKeyword
    }
    const handleClear = () => { keywords.value = '' }
    const handleKeyDown = () => {
      router.push({ name: 'SearchDetail', query: { keyword: keywords.value } })
    }
    
    watch(keywords, debounce((val: string) => {
      if (!val) return
      getSearchList(val)
    }, 200))
    watch(route, ({ name, query }) => {
      nextTick(() => (inputRef.value as HTMLInputElement).focus())
      if (name === 'Search' && query.keyword) {
        keywords.value = query?.keyword as string ?? ''
      }
      if (name === 'SearchDetail') {
        const history = store.state.historyList
        const keyword = query?.keyword ?? ''
        const id = history.indexOf(keyword)
        if (id > -1) history.splice(id, 1)
        if (history.length >= MAX_LENGTH) history.pop()
        history.unshift(keyword);
        localStorage.setItem('history', JSON.stringify(history));
        store.commit('setHistoryList', history)
      }
    }, { immediate: true })

    onMounted(getSearchDefault)

    return {
      keywords,
      inputRef,
      searchList,
      defaultKeyword,
      handleClear,
      handleKeyDown
    }
  },
});
</script>
<style scoped lang="less">
.search-container {
  position: relative;
  background: #fbfbfb;
  color: #f1f1f1;
  z-index: 9;
  &-list {
    padding: 0 1.6rem;
  }
  &-item {
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  &-wrap {
    position: relative;
    width: 96%;
    height: 3.5rem;
    padding: 0 3rem;
    box-sizing: border-box;
    background: #ebecec;
    border-radius: 3rem;
    margin: 0 1rem;
  }
  &-input {
    width: 100%;
    height: 3.5rem;
    line-height: 1.8rem;
    background: rgba(0, 0, 0, 0);
    font-size: 14px;
    color: #333;
  }
  &-look,
  &-close {
    position: absolute;
    top: 50%;
    transform: translate3d(0, -50%, 0);
    margin: 0 0.8rem;
    vertical-align: middle;
  }
  &-look {
    left: 0;
  }
  &-close {
    right: 0;
    color: #bbbdc0;
  }
}
</style>
