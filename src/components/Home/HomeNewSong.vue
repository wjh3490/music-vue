<template >
  <ul>
    <li class="home-newsong-item" v-for="item in data" :key="item.id">
      <figure class="home-newsong-figure" @click="handlePlay(item.id, item)">
        <img v-lazy="item.picUrl" class="home-newsong-img" />
        <span class="iconfont home-newsong-icon" :class="status(item.id)"></span>
      </figure>
      <div class="home-newsong-right ellipsis">
        <div class="ellipsis">
          <span class="home-newsong-name">{{ item.name }}</span>
          <span v-if="item.artists">- {{ item.artists }}</span>
        </div>
        <div v-if="item.album" class="ellipsis home-newsong-album">{{ item.album }}</div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { useStore } from "vuex";
import { arrayToString, } from '@/utils'

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
    type: String
  },
  emits: ['play'],
  setup(props) {
    const store = useStore();
    const status = computed(() => (id: number) => {
      if (store.getters.currentSong.id === id) {
        return store.state.playing ? 'icon-pause-full' : 'icon-bofang31';
      } else {
        return 'icon-bofang31';
      }
    })
    const handlePlay = async (id: number, item: any) => {
      if (props.type !== 'song') return;
      const index = store.state.playList.findIndex((item) => item.id == id);
      if (index >= 0) {
        if (id == store.getters.currentSong.id) {
          store.commit('setPlaying', !store.state.playing)
        } else {
          store.commit('setCurrrentIndex', index)
        }
      } else {
        const song = {
          id: item.id,
          name: item.name,
          picUrl: item.picUrl,
          artists: item.artists,
          album: item.album,
          alia: arrayToString(item?.song?.alias ?? []),
          privilege: {
            pl: item?.song?.privilege?.pl ?? '',
            fee: item?.song?.privilege?.fee ?? '',
            flag: item?.song?.privilege?.flag ?? '',
            maxbr: item?.song?.privilege?.maxbr ?? '',
          },
        };
        store.commit('setPlay', [song, ...store.state.playList]);
        store.commit('setSequenceList', store.state.playList);
        store.commit('setCurrrentIndex', 0);
      }
    }
    return {
      status,
      handlePlay
    }
  }
});
</script>
<style scoped lang="less">
.home-newsong {
  &-img {
    width: 6rem;
    height: 6rem;
    border-radius: 6px;
  }
  &-item {
    display: flex;
    align-items: center;
    margin-top: 1rem;
  }
  &-right {
    width: 24rem;
    margin-left: 1rem;
    color: #999;
    font-size: 13px;
  }
  &-name {
    color: #333;
    font-size: 15px;
  }
  &-album {
    margin-top: 0.6rem;
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
</style>
