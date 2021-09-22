<template>
  <div class="player-info-container">
    <section class="player-info-des ellipsis">
      <p class="player-info-name ellipsis">{{ currentSong.name }}</p>
      <div class="player-info-time ellipsis">
        发行时间：
        <span v-if="currentSong.publishTime">
          {{
            parseTime(currentSong.publishTime, '{y}-{m}-{d}')
          }}
        </span>
        <span v-else>暂无</span>
      </div>
      <div class="player-info-line"></div>
      <p class="player-info-artists ellipsis">歌手： {{ currentSong.artists }}</p>
      <div class="player-info-wrap">
        <img class="player-info-figure" v-lazy="currentSong.picUrl" alt />
        <p class="player-info-album">专辑：{{ currentSong.album }}</p>
      </div>
    </section>
    <section class="player-info-simisong" v-if="simiSongs.length">
      <span class="player-info-title">相关歌曲</span>
      <p
        v-for="item in simiSongs"
        :key="item.id"
        class="player-info-simisong-item"
      >{{ item.name }} - {{ arrayToString(item.artists) }}</p>
    </section>
    <section class="player-info-simiplaylist" v-if="simiPlayList.length">
      <span class="player-info-title">相关歌单</span>
      <div
        v-for="playlist in simiPlayList"
        :key="playlist.id"
        class="player-info-simiplaylist-item"
      >
        <img v-lazy="playlist.coverImgUrl" alt class="player-info-simiplaylist-figure" />
        <span class="player-info-simiplaylist-name ellipsis">{{ playlist.name }}</span>
        <span class="iconfont icon-youjiantou"></span>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted, watch } from 'vue'
import { useStore } from 'vuex';
import { fetchSongSimi, fetchPlaylistSimi } from '@/api/singer';
import { arrayToString, parseTime } from '@/utils';

interface Songs {
  name: string,
  id: number,
  artists: any[],
}
interface PlayList {
  name: string,
  id: number,
  coverImgUrl: string,
}

export default defineComponent({
  name: 'PlayerInfo',
  props: {
    index: {
      type: Number,
      default: 0,
    }
  },
  setup(props) {
    const store = useStore();
    const simiPlayList = ref<PlayList[]>([]);
    const simiSongs = ref<Songs[]>([]);
    const currentSong = computed(() => store.getters.currentSong);
    const fullScreen = computed(() => store.state.fullScreen)
    let flag = false;
    const getSimiPlaylist = async () => {
      const { playlists } = await fetchPlaylistSimi(
        currentSong.value.id,
        3
      );
      simiPlayList.value = playlists.slice(0, 3);
    };
    const getSimiSong = async () => {
      const { songs } = await fetchSongSimi(currentSong.value.id, 3);
      simiSongs.value = songs.slice(0, 3);
    };
    const getData = () => {
      getSimiPlaylist();
      getSimiSong();
      flag = true
    }
    watch(() => props.index, (val) => {
      if (val === 0 && !flag) {
        getData();
      }
    })
    watch(currentSong, () => {
      if (fullScreen.value && props.index === 0) {
        getData();
      }
    })

    return {
      simiSongs,
      currentSong,
      simiPlayList,
      parseTime,
      arrayToString,
      fullScreen
    }
  },
});
</script>
<style lang="less" scoped>
@color: rgba(225, 225, 225, 0.8);
@fontSize: 1.4rem;
.player-info {
  &-container {
    padding: 0 1.5rem;
    overflow-y: auto;
    height: calc(100vh - 4rem);
  }
  &-name {
    font-size: 24px;
    color: #fff;
  }
  &-des {
    padding: 1rem 0.8rem;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 0.8rem;
  }
  &-line {
    background-color: @color;
    height: 0.1rem;
    margin: 1rem 0;
  }
  &-artists {
    color: @color;
    font-size: @fontSize;
  }
  &-time {
    margin-top: 1rem;
    color: @color;
    font-size: @fontSize;
  }
  &-album {
    color: @color;
    font-size: @fontSize;
  }
  &-wrap {
    display: flex;
    align-items: center;
    margin-top: 1rem;
  }
  &-figure {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    margin-right: 1rem;
  }

  &-title {
    display: inline-block;
    font-size: 16px;
    color: #fff;
    padding-bottom: 1rem;
  }
  &-simisong {
    margin-top: 1.5rem;
    padding: 1rem 0.8rem;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    &-item {
      color: @color;
      font-size: @fontSize;
      margin-bottom: 0.6rem;
    }
  }
  &-simiplaylist {
    margin-top: 1.5rem;
    &-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
    }
    &-figure {
      width: 6rem;
      height: 6rem;
      border-radius: 0.6rem;
      margin-right: 0.8rem;
    }
    &-name {
      font-size: @fontSize;
      color: #fff;
      width: 24.5rem;
    }
  }
}
.icon-youjiantou {
  color: @color;
}
</style>
