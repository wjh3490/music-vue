<template>
  <transition name="slide">
    <div v-show="!fullScreen" class="mini-container" @click.stop="handleFullScreen">
      <!-- <section class="mini-cd" :class="{ active: !playing }">
        <div
          class="mini-cd-wrap"
          :style="{
            backgroundImage: `conic-gradient(#20a0ff 0%, #2010ff ${percent *
              100}%, #fff ${percent * 100}%, #fff ${100 - percent * 100}%)`,
          }"
        ></div>
        <div class="mini-cd-bgc" :class="{ 'animation_pause': !playing }">
          <img :src="currentSong.picUrl" alt class="mini-cd-img" />
        </div>
      </section>-->
      <mini-progress-bar />
      <section class="mini-desc ellipsis">
        <p class="mini-player-name ellipsis">{{ currentSong.name }} - {{ currentSong.artists }}</p>
      </section>
      <div class="control">
        <i
          @click.stop="handlePlaying"
          class="pause iconfont mini-control-icon mini-icon-commom"
          :class="playing ? 'icon-pause-full' : 'icon-bofang31'"
        ></i>
        <i @click.stop="actionNext" class="next iconfont icon-qianjin mini-icon-commom"></i>
        <i
          @click.stop="handleVisible"
          class="iconfont icon-iconsMusicyemianbofangmoshiPlayList mini_collect-icon mini-icon-commom"
        ></i>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex';
import MiniProgressBar from './MiniProgressBar.vue'
export default defineComponent({
  name: 'MiniPlayer',
  components: { MiniProgressBar },
  setup() {
    const store = useStore();
    const playing = computed(() => store.state.playing);
    const fullScreen = computed(() => store.state.fullScreen);
    const percent = computed(() => store.state.currentTime / store.state.duration);
    const currentSong = computed(() => store.getters.currentSong);
    const handleVisible = () => {
      store.commit('setPlayListVisible', true);
      store.commit('setlockScroll', 1)
    };
    const handlePlaying = () => { store.commit('setPlaying', !playing.value) };
    const handleFullScreen = () => {
      store.commit('setlockScroll', 1)
      store.commit('setFullScreen', true)
    };
    const actionNext = () => { store.dispatch('actionNext') };

    return {
      playing,
      percent,
      fullScreen,
      currentSong,
      actionNext,
      handleVisible,
      handlePlaying,
      handleFullScreen,
    }
  },
});
</script>
<style scoped lang="less">
.mini {
  &-container {
    position: fixed;
    left: 0;
    bottom: 0px;
    width: 100%;
    height: 56px;
    background-color: #fff;
    box-shadow: 0px 0px 20px 10px rgb(95 101 105 / 15%);
    z-index: 99;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    .control {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100px;
      .mini-icon-commom {
        display: inline-block;
        color: #169af3;
        vertical-align: middle;
      }
      .icon-qianjin {
        font-size: 26px;
        // margin: 0 12px 0 8px;
      }
      .mini_collect-icon {
        font-size: 28px;
      }
      .mini-control-icon {
        font-size: 26px;
      }
    }
    .mini-desc {
      flex: 1;
      margin: 0 10px;
      .mini-player-name {
        font-size: 14px;
      }
      .mini-player-singer {
        font-size: 12px;
        color: #888;
      }
    }
  }
}
</style>
