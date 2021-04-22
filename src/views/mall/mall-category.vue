<template>
  <div class="mall-category">
    <BaseBack title="语种风格馆" />
    <BaseTabs
      :navList="navList"
      :active="active"
      lineHeight="0.053rem"
      @change="handleChange"
      @tabs="(index) => (active = index)"
      position="relative"
      top="0"
      ref="tabs"
    />
    <MallArea :list="albums" className="mall-category-style"></MallArea>
  </div>
</template>
<script>
import MallArea from '@/components/Mall/MallArea';

import { getAlbumListStyle } from '@/api/album';
export default {
  name: 'MallCategory',
  components: { MallArea },
  data() {
    return {
      albums: [],
      active: 0,
      navList: [
        { id: 'Z_H', name: '华语' },
        { id: 'E_A', name: '欧美' },
        { id: 'KR', name: '韩国' },
        { id: 'JP', name: '日本' },
      ],
    };
  },
  mounted() {
    this.$refs.tabs.init();
    this.handleChange(0);
  },
  methods: {
    async handleChange(index) {
      const area = this.navList[index]['id'];
      const { albumProducts, code } = await getAlbumListStyle({
        area,
        limit: 10,
      });
      if (code == 200) this.albums = albumProducts;
    },
  },
};
</script>
<style lang="less">
.mall-category {
  &-style {
    width: 140px;
    height: 140px;
    padding-right: 20px;
    background-size: 160px 160px !important;
  }
}
</style>
<style lang="less" scoped>
.mall-category {
  padding: 60px 0;
}
</style>
