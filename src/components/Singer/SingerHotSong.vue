<template>
  <div
    class="singer-songs"
    :class="active == 0 ? 'auto-height' : 'fixed-height'"
  >
    <PlayListSongList :songs="songs" @player="player" />
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex';
import { queryArtistTop } from '@/api/singer';
import PlayListSongList from '@/components/PlayList/PlayListSongList';
export default {
  name: 'SingerHotSong',
  components: { PlayListSongList },
  props: {
    active: {
      type: [String, Number],
      default: '0',
    },
  },
  data() {
    return {
      songs: [],
    };
  },
  computed: {
    ...mapGetters(['playList', 'fullScreen']),
  },
  methods: {
    async getDetail() {
      const { id } = this.$route.params;
      const { songs } = await queryArtistTop(id);

      let list = [];
      for (let i = 0, length = songs.length; i < length; i++) {
        const song = {
          id: songs[i]['id'],
          name: songs[i]['name'],
          album: songs[i]['al']['name'],
          alia:songs[i]['alia'].join(' '),
          singer: this.getArtist(songs[i]['ar']).join('/'),
          picUrl: songs[i]['al']['picUrl'],
          privilege: {
            pl: songs[i]['privilege']['pl'],
            fee: songs[i]['privilege']['fee'],
            flag: songs[i]['privilege']['flag'],
            maxbr: songs[i]['privilege']['maxbr'],
          },
        };
        list.push(song);
      }
      this.songs = list;
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
    ...mapMutations([
      'setCurrrentIndex',
      'setPlay',
      'setFullScreen',
      'setSequenceList',
    ]),
  },
};
</script>

<style lang="less" scoped>
.singer-songs {
  overflow-x: hidden;
}
.auto-height {
  height: auto;
}
.fixed-height {
  height: calc(100vh - 50px);
}
</style>
