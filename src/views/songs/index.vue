<template>
  <div class="songs-main paddingtop50">
    <base-back :isFixed="true">
      <nav class="songs-nav-wrap">
        <span
          class="songs-nav-item"
          :class="{ 'songs-nav-active': +activeIndex === 1 }"
          @click="activeIndex = 1"
        >新歌</span>
        <span
          class="songs-nav-item"
          :class="{ 'songs-nav-active': +activeIndex === 2 }"
          @click="activeIndex = 2"
        >新碟</span>
      </nav>
    </base-back>
    <songs-new-song v-show="+activeIndex === 1" />
    <songs-new-album v-show="+activeIndex === 2" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, } from 'vue';
import { useRoute } from 'vue-router';

import SongsNewAlbum from '@/components/Songs/SongsNewAlbum.vue';
import SongsNewSong from '@/components/Songs/SongsNewSong.vue';
export default defineComponent({
  name: 'Songs',
  components: { SongsNewAlbum, SongsNewSong },
  setup() {
    const route = useRoute();
    const activeIndex = ref(route.params.id || 1);
    return {
      activeIndex,
    }
  },
})

</script>
<style lang="less" scoped>
.songs {
  &-main {
    background-color: #fafafa;
  }
  &-nav {
    &-wrap {
      display: flex;
      border: 0.1rem solid #169af3;
      width: 20rem;
      height: 3rem;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;
      border-radius: 30px;
      overflow: hidden;
    }
    &-item {
      font-size: 16px;
      padding: 0.4rem 0;
      border-radius: 14px;
      width: 50%;
      text-align: center;
      color: #169af3;
    }
    &-active {
      background-color: #169af3;
      color: #fff;
    }
  }
}
</style>
