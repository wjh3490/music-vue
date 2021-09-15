<template>
  <div class="mini-container" @click.stop="handleFullScreen">
    <section class="mini-cd" :class="{ active: !playing }">
      <div
        class="mini-cd-wrap"
        :style="{
          backgroundImage: `conic-gradient(#20a0ff 0%, #2010ff ${percent *
            100}%, #fff ${percent * 100}%, #fff ${100 - percent * 100}%)`,
        }"
      ></div>
      <div class="mini-cd-bgc" :class="{ 'animation_pause': !playing }">
        <img :src="currrenSong.picUrl" alt class="mini-cd-img" />
      </div>
    </section>

    <section class="mini-desc ellipsis">
      <p class="mini-player-name ellipsis">{{ currrenSong.name }} - {{ currrenSong.artists }}</p>
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
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex';
export default defineComponent({
  name: 'MiniPlayer',
  setup() {
    const store = useStore();
    const playing = computed(() => store.state.playing);
    const percent = computed(() => store.state.currentTime / store.state.duration);
    const currrenSong = computed(() => store.getters.currrenSong);
    const handleVisible = () => { store.commit('setVisible', true) };
    const handlePlaying = () => { store.commit('setPlaying', !playing.value) };
    const handleFullScreen = () => { store.commit('setFullScreen', true) };
    const actionNext = () => { store.dispatch('actionNext') };

    return {
      playing,
      percent,
      currrenSong,
      handleVisible,
      handlePlaying,
      handleFullScreen,
      actionNext,
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
    box-shadow: rgba(0, 69, 189, 0.1) 0px 0px 6px 0px;
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
  &-cd {
    position: relative;
    border-radius: 50%;
    width: 56px;
    height: 56px;
    transition: all 0.5s;
    overflow: hidden;
    transform: translateY(-5px);
    &.active {
      transform: translateY(-1px) scale(0.8);
    }
    &-wrap {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
    &-bgc {
      position: absolute;
      top: 0;
      left: 0;
      padding: 3px;
      overflow: hidden;
      animation: move 20s linear infinite;
      &.animation_pause {
        animation-play-state: paused;
      }
    }
    &-img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
}
</style>
