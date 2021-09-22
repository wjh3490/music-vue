<template>
  <div class="paddingtop45 new-album">
    <g-card :show-more="false" title="本周新碟" :style="{ position: 'sticky', top: ' 5rem' }">
      <album-list
        :list="weekAlbum"
        :style="{
          height: '14rem',
          paddingRight: '2rem',
          width: '14rem',
        }"
      />
    </g-card>
    <g-card :show-more="false" title="本周新碟" :style="{ position: 'sticky', top: ' 5rem' }">
      <album-list
        :list="monthAlbum"
        :style="{
          height: '14rem',
          paddingRight: '2rem',
          width: '14rem',
        }"
      />
    </g-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { fetchTopAlbum } from '@/api/album';
import { arrayToString } from '@/utils';
import AlbumList from '@/components/common/AlbumList.vue'

export default defineComponent({
  name: 'SongsNewAlbum',
  components: { AlbumList },
  setup() {
    const monthAlbum = ref([]);
    const weekAlbum = ref([]);
    const date = new Date();
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const getAlnums = async () => {
      const params = { area: 'ALL', month: 9 }
      const { monthData, weekData } = await fetchTopAlbum(params);
      monthAlbum.value = monthData.map(item => ({
        albumId: item.id,
        coverUrl: item.picUrl,
        albumName: item.name,
        artistName: arrayToString(item.artists)
      }
      ));
      weekAlbum.value = weekData.map(item => ({
        albumId: item.id,
        coverUrl: item.picUrl,
        albumName: item.name,
        artistName: arrayToString(item.artists)
      }
      ));
    }
    onMounted(getAlnums)
    return {
      monthAlbum,
      weekAlbum,
      year,
      month
    }
  },
});
</script>
<style lang="less" scoped>
.songs-album {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 1.5rem;
  margin-top: 1.5rem;
  &-item {
    margin-bottom: 1.5rem;
  }
  &-img {
    width: 16.2rem;
    height: 16.2rem;
    border-radius: 8px;
  }
  &-info {
    margin-top: 0.5rem;
  }
  &-name {
    width: 15rem;
    font-size: 14px;
  }
  &-artist {
    width: 15rem;
    font-size: 13px;
    color: #999;
    margin-top: 0.3rem;
  }
}
</style>
