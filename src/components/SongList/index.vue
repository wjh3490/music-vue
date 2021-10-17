<template>
  <modal :z-index="900" :appear="false" :modal="playListVisible" @close="handleClose">
    <transition name="slide">
      <div class="playsong" :class="!fullScreen && 'playsong-isFull'" v-show="playListVisible">
        <song-list-mode />
        <ul ref="scrollBar" class="playsong-main">
          <song-list-item
            v-for="(item, index) in playList"
            :key="item.id"
            :data="item"
            :index="index"
          />
        </ul>
        <div class="song-close" @click="handleClose">关 闭</div>
      </div>
    </transition>
  </modal>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import Modal from '../common/Modal.vue'
import SongListItem from './SongListItem.vue'
import SongListMode from './SongListMode.vue'

export default defineComponent({
  name: 'SongList',
  components: { Modal, SongListItem, SongListMode },
  setup() {
    const store = useStore()
    const playList = computed(() => store.state.playList)
    const playListVisible = computed(() => store.state.playListVisible)
    const fullScreen = computed(() => store.state.fullScreen)

    const handleClose = () => {
      store.commit('setlockScroll', -1)
      store.commit('setPlayListVisible', false)
    }

    return {
      playList,
      fullScreen,
      playListVisible,
      handleClose,

    }
  },
});
</script>
<style scoped lang="less">
.song-close {
  padding: 1.2rem 1.6rem;
  height: 4.5rem;
  text-align: center;
  border-top: 0.01rem solid rgba(225, 225, 225, 0.8);
  font-size: 16px;
}
.playsong {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 450px;
  width: 100vw;
  z-index: 1006 !important;
  color: #fff;
  // background-color: rgba(57, 51, 51, 0.65);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 16px 16px 0 0;
  &-isFull {
    color: #000;
    background-color: rgba(255, 255, 255, 0.8);
  }
  &-main {
    overflow-y: auto;
    height: 35.5rem;
    width: 100%;
    padding-left: 16px;
  }
}
</style>
