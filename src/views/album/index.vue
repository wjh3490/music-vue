<template>
  <div class="album-container">
    <BaseBack
      background="transparent"
      :title="$route.query.name"
      color="#fff"
    />
    <DetailBackGround :info="info" />
    <DetailSongList :songs="songs" @player="player" />
    <BaseBall ref="ball" />
  </div>
</template>
<script>
/*eslint-disable */
import { mapMutations, mapGetters } from 'vuex';
import { getAlbum } from '@/api/album';

import DetailBackGround from '@/components/Detail/DetailBackGround';
import DetailSongList from '@/components/Detail/DetailSongList';
export default {
  name: 'Album',
  components: { DetailSongList, DetailBackGround },
  data() {
    return {
      songs: [],
      info: {
        nickname: '',
        subscribedCount: 0,
        commentCount: 0,
        description: 0,
        name: '',
        coverImgUrl: '',
        avatarUrl: '',
      },
    };
  },
  computed: {
    ...mapGetters(['playList']),
  },
  created() {
    this.getPlaylist();
  },
  methods: {
    async getPlaylist() {
      const { id } = this.$route.params;
      const { code, songs, album } = await getAlbum(id);
      const info = {
        nickname: album.artist.name,
        subscribedCount: album.info.likedCount,
        commentCount: album.info.commentCount,
        description: album.description,
        name: album.name,
        coverImgUrl: album.picUrl,
        publishTime: album.publishTime,
        id: album.artist.id
      };
      this.info = info;

      let list = [];
      for (let i = 0, length = songs.length; i < length; i++) {
        const song = {
          id: songs[i]['id'],
          name: songs[i]['name'],
          album: songs[i]['al']['name'],
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
      this.$refs.ball.drop(ele);
      if (!Object.is(this.songs, this.playList)) {
        this.setPlay(this.songs);
        this.setSequenceList(this.songs);
      }
      this.setCurrrentIndex(index);
    },
    ...mapMutations(['setCurrrentIndex', 'setPlay', 'setSequenceList']),
  },
};
</script>
