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
          currentLyric[activeLyricIndex]
            ? currentLyric[activeLyricIndex]['lyric']
            : '暂无歌词'
        }}
      </div>
      <div
        class="currrent_lyric"
        v-if="currentLyric[activeLyricIndex] && currentLyric[activeLyricIndex]['tlyric']"
      >
        {{ currentLyric[activeLyricIndex]['tlyric'] }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'PlayerCircle',
  computed: {
    ...mapGetters(['currrenSong', 'currentLyric', 'activeLyricIndex']),
  },
};
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
