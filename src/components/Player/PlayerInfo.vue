<template>
  <div class="player-info-container">
    <section class="player-info-des ellipsis">
      <p class="player-info-name ellipsis">{{ currrenSong.name }}</p>
      <div class="player-info-time ellipsis">
        发行时间：
        <span v-if="currrenSong.publishTime">{{
          currrenSong.publishTime | parseTime('{y}-{m}-{d}')
        }}</span>
        <span v-else>暂无</span>
      </div>
      <div class="player-info-line"></div>
      <p class="player-info-artists ellipsis">
        歌手： {{ currrenSong.artists }}
      </p>
      <div class="player-info-wrap">
        <img class="player-info-figure" :src="currrenSong.picUrl" alt="" />
        <p class="player-info-album">专辑：{{ currrenSong.album }}</p>
      </div>
    </section>
    <section class="player-info-simisong" v-if="songs.length">
      <span class="player-info-title">相关歌曲</span>
      <p v-for="item in songs" :key="item.id" class="player-info-simisong-item">
        {{ item.name }} - {{ formatArtists(item.artists) }}
      </p>
    </section>
    <section class="player-info-simiplaylist" v-if="playlists.length">
      <span class="player-info-title">相关歌单</span>
      <div
        class="player-info-simiplaylist-item"
        v-for="playlist in playlists"
        :key="playlist.id"
      >
        <img
          v-lazy="playlist.coverImgUrl"
          alt=""
          class="player-info-simiplaylist-figure"
        />
        <span class="player-info-simiplaylist-name ellipsis">{{ playlist.name }}</span>
        <span class="iconfont icon-youjiantou"></span>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { querySongSimi, queryPlaylistSimi } from '@/api/singer';
export default {
  name: 'PlayerInfo',
  props: {
    index: Number,
    flag: Boolean,
  },
  data() {
    return {
      playlists: [],
      songs: [],
    };
  },
  computed: {
    ...mapGetters(['currrenSong']),
    formatArtists() {
      return function(artist) {
        return artist.map((item) => item.name).join('/');
      };
    },
  },

  watch: {
    index(val) {
      if (val == 0 && this.flag) {
        this.getSimiPlaylist();
        this.getSimiSong();
        this.$emit('change', false);
      }
    },
  },
  methods: {
    async getSimiPlaylist() {
      const { playlists, code } = await queryPlaylistSimi(
        this.currrenSong.id,
        3
      );
      if (code == 200) this.playlists = playlists.slice(0, 3);
    },
    async getSimiSong() {
      const { code, songs } = await querySongSimi(this.currrenSong.id, 3);
      if (code == 200) this.songs = songs.slice(0, 3);
    },
  },
};
</script>
<style lang="less" scoped>
@color: rgba(225, 225, 225, 0.8);
@fontSize: 14px;
.player-info {
  &-container {
    padding: 0 15px;
    overflow-y: auto;
    height: calc(100vh - 40px);
  }
  &-name {
    font-size: 24px;
    color: #fff;
  }
  &-des {
    padding: 10px 8px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 8px;
  }
  &-line {
    background-color: @color;
    height: 0.5px;
    margin: 10px 0;
  }
  &-artists {
    color: @color;
    font-size: @fontSize;
  }
  &-time {
    margin-top: 10px;
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
    margin-top: 10px;
  }
  &-figure {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
  }

  &-title {
    display: inline-block;
    font-size: 16px;
    color: #fff;
    padding-bottom: 10px;
  }
  &-simisong {
    margin-top: 15px;
    padding: 10px 8px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    &-item {
      color: @color;
      font-size: @fontSize;
      margin-bottom: 6px;
    }
  }
  &-simiplaylist {
    margin-top: 15px;
    &-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    &-figure {
      width: 60px;
      height: 60px;
      border-radius: 6px;
      margin-right: 8px;
    }
    &-name {
      font-size: @fontSize;
      color: #fff;
      width: 245px;
    }
  }
}
.icon-youjiantou {
  color: @color;
}
</style>
