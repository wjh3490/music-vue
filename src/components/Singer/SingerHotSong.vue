<template>
  <div
    class="singer-songs"
    :class="active == 0 ? 'auto-height' : 'fixed-height'"
  >
    <BaseSongList :songs="songs" @player="player" />
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex';
import { queryArtistTop } from '@/api/singer';
import { Song } from '@/utils/config';
export default {
  name: 'SingerHotSong',
  props: {
    active: {
      type: [String, Number],
      default: '0',
    },
    cover: String,
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
          alia: songs[i]['alia'] || [],
          artists: songs[i]['ar'],
          publishTime:songs[i]['publishTime'],
          picUrl: songs[i]['al']['picUrl'],
          privilege: {
            pl: songs[i]['privilege']['pl'],
            fee: songs[i]['fee'],
            flag: songs[i]['privilege']['flag'],
            maxbr: songs[i]['privilege']['maxbr'],
          },
        };
        list.push(new Song(song));
      }
      this.songs = list;
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
