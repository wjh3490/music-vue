<template>
  <ul class="mall-album-container">
    <li class="mall-album-item" v-for="(song, index) in list" :key="song.albumId">
      <figure class="mall-album-figure">
        <img v-lazy="song.coverUrl" alt class="mall-album-img" />
      </figure>
      <span class="mall-album-index">{{ index + 1 + num * 4 }}</span>
      <div class="mall-album-right ellipsis">
        <div>
          <div class="ellipsis mall-album-name">{{ song.albumName }}</div>
          <div class="ellipsis mall-album-album">{{ song.artistName }}</div>
        </div>
        <span class="mall-album-action">支持</span>
      </div>
    </li>
  </ul>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { StrKeys } from '@/types'
export default defineComponent({
  name: 'MallAlbum',
  props: {
    list: {
      type: Array as PropType<StrKeys<string>[]>,
      default: () => [],
    },
    num: {
      type: Number,
      default: 0
    },
  },
});
</script>
<style lang="less" scoped>
.mall-album {
  &-img {
    width: 5rem;
    height: 5rem;
    border-radius: 4px;
  }
  &-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.6rem;
    padding-bottom: 0.6rem;
    padding-right: 1.2rem;
    border-bottom: 0.1rem solid #f0f0f0;
  }
  &-right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 1rem;
    color: #999;
    font-size: 13px;
    width: 25rem;
  }
  &-index {
    font-size: 16px;
    color: #525252;
    margin-left: 1.4rem;
  }
  &-name {
    color: #333;
    font-size: 15px;
    width: 18rem;
  }
  &-album {
    margin-top: 2px;
    width: 18rem;
  }
  &-action {
    border-radius: 6px;
    border: 0.1rem solid #169af3;
    padding: 0.2rem 1.4rem;
    border-radius: 20px;
    color: #169af3;
    font-size: 14px;
  }
}
</style>
