<template >
  <template v-if="!!hots.length">
    <header class="search_hots-title">热门榜</header>
    <div class="search_hots-wrap">
      <ul class="search_hots-items">
        <template v-for="(item, index) in hots">
          <li v-if="index < length" :key="item.searchWord" class="search_hots-item">
            <router-link
              :to="{ name: 'SearchDetail', query: { keyword: item.searchWord } }"
              class="search_hots-link"
            >
              <span :class="index <= 2 && 'top3'" class="search_hots-index">{{ index + 1 }}</span>
              <span
                :class="index <= 2 && 'top3'"
                class="ellipsis search_hots-keyword"
              >{{ item.searchWord }}</span>&nbsp;
              <img
                v-if="item.iconUrl"
                :src="item.iconUrl"
                :alt="item.iconUrl"
                class="search_hots-img"
              />
            </router-link>
          </li>
        </template>
      </ul>
      <div v-if="length != 20" class="search_hots-grown" @click.stop="length = 20">展开更多</div>
    </div>
  </template>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { fetchSearchHots } from '@/api/search';
export default defineComponent({
  name: 'SearchHotList',
  setup() {
    const hots = ref<Array<{ searchWord: string, iconUrl: string }>>([])
    const length = ref(10)
    const getHotList = async () => {
      const { data } = await fetchSearchHots()
      hots.value = data
    }
    onMounted(getHotList)
    return {
      hots,
      length
    }
  }

});
</script>
<style scoped lang="less">
.search_hots {
  &-title {
    color: #333;
    font-weight: 700;
    margin-bottom: 1.4rem;
    margin-top: 1rem;
  }
  &-wrap {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    padding: 1.8rem 1.6rem;
  }
  &-items {
    display: flex;
    flex-wrap: wrap;
  }
  &-item {
    width: 50%;
    &:not(:nth-last-child(-n + 2)) {
      margin-bottom: 1.2rem;
    }
  }
  &-link {
    display: flex;
    align-items: center;
  }
  &-index {
    width: 2.2rem;
    color: #888;
    font-weight: 700;
    &.top3 {
      color: red;
    }
  }
  &-keyword {
    width: 60%;
    &.top3 {
      font-weight: 700;
    }
  }
  &-grown {
    color: #888;
    text-align: center;
    margin-top: 1.4rem;
  }
  &-img {
    display: inline-block;
    width: 1.8rem;
    height: 0.9rem;
    object-fit: contain;
  }
}
</style>
