<template>
  <div class="detail-container">
    <BaseBack
      background="transparent"
      :title="$route.query.name"
      color="#fff"
    />
    <DetailBackGround :info="info" />
    <DetailSongList :songs="songs" @player="player" :showText="showText" />
    <BaseBall ref="ball" />
  </div>
</template>
<script>
/*eslint-disable */
import { mapMutations, mapGetters } from 'vuex';
import { recommentSongs } from '@/api/recomment';
import DetailBackGround from '@/components/Detail/DetailBackGround';
import DetailSongList from '@/components/Detail/DetailSongList';
export default {
  name: 'PlaylistDetail',
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
      playCount: 0,
      percent: 0,
    };
  },
  computed: {
    ...mapGetters([
      'playList',
      'currrenSong',
      'fullScreen',
      'singer',
      'currrentIndex',
    ]),
  },
  created() {
    this.getPlaylist();
  },
  methods: {
    async getPlaylist() {
      const { id } = this.$route.params;
      const {
        code,
        playlist: {
          tracks,
          creator,
          subscribedCount,
          commentCount,
          description,
          name,
          coverImgUrl,
        },
        privileges,
      } = await recommentSongs(id);
      const info = {
        nickname: creator.nickname,
        subscribedCount: subscribedCount,
        commentCount: commentCount,
        description: description,
        name: name,
        coverImgUrl: coverImgUrl,
        avatarUrl: creator.avatarUrl,
      };
      this.info = info;

      let songs = [];
      for (let i = 0, length = tracks.length; i < length; i++) {
        const song = {
          id: tracks[i]['id'],
          name: tracks[i]['name'],
          album: tracks[i]['al']['name'],
          singer: this.getArtist(tracks[i]['ar']).join('/'),
          picUrl: tracks[i]['al']['picUrl'],
          privilege: {
            pl: privileges[i]['pl'],
            fee: privileges[i]['fee'],
            flag: privileges[i]['flag'],
            maxbr: privileges[i]['maxbr'],
          },
        };
        songs.push(song);
      }
      this.songs = songs;
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
    ...mapMutations([
      'setCurrrentIndex',
      'setPlay',
      'setFullScreen',
      'setSequenceList',
    ]),
  },
};
</script>
<style scoped lang="less">

</style>
>
