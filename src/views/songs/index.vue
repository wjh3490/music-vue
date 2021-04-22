<template>
  <div class="songs-main">
    <BaseBack>
      <nav class="songs-nav-wrap">
        <span
          :class="{ 'songs-nav-active': activeIndex == 0 }"
          @click="handleChange(0)"
          >新歌</span
        >
        <span class="songs-nav-line"> | </span>
        <span
          :class="{ 'songs-nav-active': activeIndex == 1 }"
          @click="handleChange(1)"
          >新碟</span
        >
      </nav>
    </BaseBack>
    <PlayListSongList
      :songs="songs"
      @player="player"
      v-show="activeIndex == 0"
      style="padding-top:1.6rem"
    />
    <SongsNewAlbum v-show="activeIndex == 1"></SongsNewAlbum>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { vGetNewsong } from '@/api/recomment.js';
import PlayListSongList from '@/components/PlayList/PlayListSongList';
import SongsNewAlbum from '@/components/Songs/SongsNewAlbum';
import { Song } from '@/utils/config';
export default {
  name: 'Songs',
  components: { PlayListSongList, SongsNewAlbum },
  data() {
    return {
      songs: [],
      activeIndex: this.$route.params.id || 1,
    };
  },
  created() {
    this.getNewSong();
  },
  methods: {
    async getNewSong() {
      const { code, result } = await vGetNewsong({ limit: 30 });
      if (code == 200) {
        let list = [];
        for (let i = 0, length = result.length; i < length; i++) {
          const song = {
            id: result[i]['id'],
            name: result[i]['name'],
            album: result[i]['song']['name'],
            singer: result[i]['song']['artists'],
            picUrl: result[i]['picUrl'],
            privilege: {
              pl: result[i]['song']['privilege']['pl'] || '',
              fee: result[i]['song']['privilege']['fee'] || '',
              flag: result[i]['song']['privilege']['flag'] || '',
              maxbr: result[i]['song']['privilege']['maxbr'] || '',
            },
          };
          list.push(new Song(song));
        }
        this.songs = list;
      }
    },
    getArtist(artist) {
      return artist.reduce((acc, cur) => {
        acc.push(cur.name);
        return acc;
      }, []);
    },
    player(index, ele) {
      this.$drop(ele);
      if (!Object.is(this.songs, this.playList)) {
        this.setPlay(this.songs);
        this.setSequenceList(this.songs);
      }
      this.setCurrrentIndex(index);
    },
    handleChange(index) {
      if (this.activeIndex == index) return;
      this.activeIndex = index;
    },
    ...mapMutations([
      'setCurrrentIndex',
      'setPlay',
      'setFullScreen',
      'setSequenceList',
      'setSinger',
    ]),
  },
};
</script>

<style lang="less" scoped>
.songs {
  &-main {
    background-color: #fafafa;
  }
  &-nav {
    &-wrap {
      display: flex;
      color: #999;
      justify-content: center;
      align-items: center;
    }
    &-line {
      margin: 0 20px;
    }
    &-active {
      color: #333;
      font-weight: 600;
    }
  }
}
</style>
