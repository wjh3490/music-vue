<template>
  <div class="paddingtop60 padding60 mall-category">
    <base-back :isFixed="true" title="语种风格馆" />
    <base-tabs
      :navList="categoryOptions"
      :active="active"
      :style="{ top: '5rem' }"
      ref="tabRef"
      @change="handleChange"
      @tabs="(index) => (active = index)"
    />
    <mall-area
      :list="albums"
      :style="{
        width: '14rem',
        height: '14rem',
        paddingRight: '2rem',
      }"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import MallArea from '@/components/Mall/MallArea.vue';
import { categoryOptions, categoryNavMaps } from '@/utils'
import { fetchAlbumListStyle } from '@/api/album';
import { Tab } from '@/types'
export default defineComponent({
  name: 'MallCategory',
  components: { MallArea },
  setup() {
    const albums = ref([]);
    const active = ref(0);
    const tabRef = ref<Tab | null>(null)

    const handleChange = async (index) => {
      const { albumProducts } = await fetchAlbumListStyle({
        area: categoryNavMaps[index],
        limit: 10,
      });
      albums.value = albumProducts;
    }
    onMounted(() => {
      (tabRef.value as Tab).init(0);
      handleChange(0);
    })
    return {
      tabRef,
      albums,
      active,
      categoryOptions,
      handleChange
    }
  },

});
</script>
<style  lang="less" scoped>
.mall-category {
  &:deep(.mall-area-item) {
    margin-top: 1.2rem;
  }
}
</style>

