<template >
  <ul>
    <li class="home-newsong-item" v-for="item in data" :key="item.id">
      <figure class="home-newsong-figure" @click="$emit('play', item.id)">
        <img v-lazy="item.picUrl" alt class="home-newsong-img" />
        <span class="iconfont home-newsong-icon" :class="status(item.id)"></span>
      </figure>
      <div class="home-newsong-right ellipsis">
        <div class="ellipsis">
          <span class="home-newsong-name">{{ item.name }}</span>
          <span>- {{ item.artists }}</span>
        </div>
        <div class="ellipsis home-newsong-album">{{ item.album }}</div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { useStore } from "vuex";
interface Song {
  id: number,
  picUrl: string,
  name: string,
  artists: string,
  album: string,

}
export default defineComponent({
  name: "HomeNewSong",
  props: {
    data: {
      type: Array as PropType<Song[]>,
      default: () => [],
    },
  },
  emits: ['play'],
  setup() {
    const store = useStore();
    const status = computed(() => (id: number) => {
      if (store.getters.currrenSong.id == id) {
        return store.state.playing ? 'icon-pause-full' : 'icon-bofang31';
      } else {
        return 'icon-bofang31';
      }
    })

    return {
      status,
    }
  }
});
</script>
<style scoped lang="less">
.home-newsong {
  &-img {
    width: 60px;
    height: 60px;
    border-radius: 6px;
  }
  &-item {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }
  &-right {
    width: 240px;
    margin-left: 10px;
    color: #999;
    font-size: 13px;
  }
  &-name {
    color: #333;
    font-size: 15px;
  }
  &-album {
    margin-top: 6px;
  }
  &-figure {
    position: relative;
  }
  &-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    color: #fff;
    font-size: 24px;
  }
}
.home-newsong /deep/ .swiper-slide {
  width: 345px !important;
}
</style>
