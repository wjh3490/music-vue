<template>
  <div class="circle">
    <div class="bgc">
      <img :src="currentSong.picUrl" class="bgc-img" alt />
    </div>
    <div class="song-detail">
      <p class="song-singer">{{ currentSong.name }}</p>
      <p class="song-name">{{ currentSong.artists }}</p>
      <player-currrent-lyric />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex';
import PlayerCurrrentLyric from './PlayerCurrrentLyric.vue'
export default defineComponent({
  name: 'PlayerCircle',
  components: { PlayerCurrrentLyric },
  setup() {
    const store = useStore()
    const currentSong = computed(() => store.getters.currentSong);
    return {
      currentSong,
    }
  },
});
</script>
<style scoped lang="less">
.song-detail {
  padding: 0 4.4rem;
  margin-top: 0.8rem;
  .song-singer {
    font-size: 24px;
    color: #fff;
    font-weight: 700;
  }
  .song-name {
    color: rgba(225, 225, 225, 0.8);
    font-size: 16px;
    margin: 4px 0;
  }
}
.circle {
  .bgc {
    width: 28rem;
    height: 25rem;
    border-radius: 10px;
    margin: 0 auto;
    margin-top: 1.6rem;
    overflow: hidden;
    background-size: 100% 100%;
    background-position: center, center;
    background-repeat: no-repeat;
    transition: background-image 0.2s;
    .bgc-img {
      height: 100%;
      background-color: #ccc;
    }
  }
  .no-lyric {
    margin-top: 1.8rem;
    font-size: 14px;
    color: #fff;
  }
}
</style>
