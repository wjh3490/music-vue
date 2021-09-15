<template>
  <div class="circle">
    <div class="bgc">
      <img v-lazy="currrenSong.picUrl" class="bgc-img" alt />
    </div>
    <div class="song-detail">
      <p class="song-singer">{{ currrenSong.name }}</p>
      <p class="song-name">{{ currrenSong.artists }}</p>
      <div class="currrent_lyric">
        {{
          currentLyric
            ? currentLyric?.lyric
            : '暂无歌词'
        }}
      </div>
      <div class="currrent_lyric" v-if="currentLyric?.tlyric">{{ currentLyric['tlyric'] }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex';
export default defineComponent({
  name: 'PlayerCircle',
  setup() {
    const store = useStore()
    const currrenSong = computed(() => store.getters.currrenSong);
    const currentLyric = computed(() => store.state.currentLyric[store.state.LyricScrollY - 1]);

    return {
      currrenSong,
      currentLyric,
    }
  },
});
</script>
<style scoped lang="less">
.song-detail {
  padding: 0 44px;
  margin-top: 8px;
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
  .currrent_lyric {
    font-size: 14px;
    color: rgba(225, 225, 225, 0.8);
  }
  .bgc {
    width: 280px;
    height: 250px;
    border-radius: 10px;
    margin: 0 auto;
    overflow: hidden;
    background-size: 100% 100%;
    background-position: center, center;
    background-repeat: no-repeat;
    transition: background-image 0.2s;
    .bgc-img {
      height: 100%;
    }
  }
  .no-lyric {
    margin-top: 18px;
    font-size: 14px;
    color: #fff;
  }
}
.rotateY {
  transform: rotateY(180deg);
}
</style>
