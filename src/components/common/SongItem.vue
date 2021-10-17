<template>
  <section
    :class="{ active: song.id === currentSong.id }"
    class="songlist-item"
    @click.stop.prevent="handlePlay(index)"
  >
    <template v-if="hide">
      <div
        v-if="!visible"
        class="songlist-index"
        :class="{ active: song.id == currentSong.id }"
      >{{ index + 1 }}</div>
      <div v-if="visible" class="songlist-figure">
        <img v-lazy="song.picUrl" />
      </div>
    </template>
    <div class="songlist-name">
      <div class="ellipsis songlist-title" :class="{ active: song.id == currentSong.id }">
        <span v-if="highlight" v-html="highlightFn(song.name)"></span>
        <span v-else>{{ song.name }}</span>

        <span v-if="song.alia" :class="{ active: song.id == currentSong.id }" class="songlist-alia">
          (
          <span v-if="highlight" v-html="highlightFn(song.alia)"></span>
          <span v-else>{{ song.alia }}</span>)
        </span>
      </div>
      <div class="songlist-album" :class="{ active: song.id == currentSong.id }">
        <privilege :privilege="song.privilege" />
        <div class="ellipsis songlist-content">
          <span v-if="highlight" v-html="highlightFn(song.artists)"></span>
          <span v-else>{{ song.artists }}</span>
          .
          <span v-if="highlight" v-html="highlightFn(song.album)"></span>
          <span v-else>{{ song.album }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { useStore } from 'vuex';
import isEqual from 'lodash.isequal'
import type { Song } from '@/types'
import Privilege from './Privilege.vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'SongItem',
  components: { Privilege },
  props: {
    song: {
      type: Object as PropType<Song>,
      default: () => { }
    },
    songs: {
      type: Object as PropType<Song[]>,
      default: () => []
    },
    index: {
      type: Number,
      default: 0,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    highlight: {
      type: Boolean,
      default: false
    },
    hide: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const store = useStore()
    const route = useRoute()
    const currentSong = computed(() => store.getters.currentSong)
    const playList = computed(() => store.state.playList)
    const highlightFn = computed(() => (val: string | undefined) => {
      const keyword = route.query.keyword as string
      const reg = new RegExp(keyword, 'gi');
      return (val as string).replace(reg, `<span class='highlight'>${keyword}</span>`);
    })

    const handlePlay = (index: number) => {
      console.log(props.songs, playList.value)
      if (!isEqual(props.songs, playList.value)) {
        store.commit('setPlay', props.songs)
        store.commit('setSequenceList', props.songs)
      }
      store.commit('setCurrrentIndex', index)
    }
    return {
      highlightFn,
      currentSong,
      handlePlay,
    }
  },
});
</script>
<style scoped lang="less">
.songlist {
  &-item {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    &.active {
      &::after {
        position: absolute;
        left: 0;
        content: "";
        height: 100%;
        width: 0.4rem;
        border-radius: 4px;
        background-color: #169af3;
      }
    }
  }

  &-wrap {
    padding-bottom: 6rem;
  }
  &-figure {
    width: 5rem;
    border-radius: 4px;
    overflow: hidden;
    margin-left: 1rem;
    margin-right: 0.6rem;
  }
  &-index {
    font-size: 16px;
    width: 5rem;
    text-align: center;
    color: #333;
    &.active {
      color: #169af3;
    }
  }

  &-title {
    width: 26rem;
    font-size: 18px;
    color: #333;
    &.active {
      color: #169af3;
    }
  }
  &-alia {
    color: #333;
    &.active {
      color: #169af3;
    }
  }
  &-content {
    width: 260px;
  }
  &-album {
    margin-top: 0.6rem;
    color: #a59797f5;
    display: flex;
    align-items: center;
    &.active {
      color: #169af3;
    }
    &-icons {
      display: flex;
    }
  }
}
.allplay {
  height: 5rem;
  position: sticky;
  top: 5rem;
  z-index: 92;
  overflow: hidden;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
  &-left {
    display: flex;
    align-items: center;
  }
  &-icon {
    font-size: 28px;
    color: #169af3;
  }
  &-btn {
    margin: 0 0.6rem;
    font-size: 15px;
    font-weight: 300;
  }
  &-length {
    font-weight: 300;
  }
  &-right {
    font-size: 22px;
    color: #9a9696;
  }
}
.icon {
  border: 0.1rem solid #169af3;
  border-radius: 3px;
  color: #169af3;
  transform: scale(0.7);
  width: 2.8rem;
  height: 1.7rem;
  line-height: 15px;
  text-align: center;
  margin-left: -0.3rem;
}
.iconsq {
  border: 0.1rem solid #f3cd16;
  color: #f3cd16;
}
</style>
