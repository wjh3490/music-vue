<template >
  <div class="mall-area-wrap">
    <div class="mall-area-item" v-for="item in list" :key="item.albumId">
      <figure class="mall-area-figure mall-area-dystyle" :style="style">
        <img v-lazy="item.coverUrl" class="mall-area-pic"  alt />
      </figure>
      <p class="mall-area-name ellipsis">{{ item.albumName }}</p>
      <p class="mall-area-artist ellipsis">{{ item.artistName }}</p>
      <p class="mall-area-price ellipsis">¥ {{ item.price }}</p>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { StrKeys } from '@/types'
export default defineComponent({
  name: 'MallArea',
  props: {
    list: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
    style: {
      type: Object as PropType<StrKeys<string>>,
      default: () => ({
        width: '9.5rem',
        height: '9.5rem',
        paddingRight: '1.5rem',
      })
    },
  },
});
</script>
<style lang="less" scoped>
.mall-area {
  &-wrap {
    display: flex;
    padding: 0 1.4rem;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  &-figure {
    background: url("../../assets/imgs/type_cd.png") no-repeat;
    background-position: right center;
    box-sizing: content-box;
    overflow: hidden;
  }
  &-dystyle {
    background-size: 100% 100%;
  }
  &-pic {
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
  &-name {
    margin-top: 0.6rem;
    width: 10rem;
  }
  &-artist {
    color: #999;
    width: 10rem;
  }
  &-price {
    color: #c20c0c;
    width: 10rem;
  }
}
</style>
