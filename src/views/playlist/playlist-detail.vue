<template>
  <div class="rank-detail">
    <BaseBack background="transparent" :title="title" color="#fff" />
    <PlayListBackGround :info="info" :opacity="opacity" />
    <PlayListSongList :songs="songs" @player="player" />
    <BaseBall ref="ball" />
  </div>
</template>

<script>
import { rankSongs } from '@/api/rank';
import { mapMutations, mapGetters } from 'vuex';
import PlayListBackGround from '@/components/PlayList/PlayListBackGround';
import PlayListSongList from '@/components/PlayList/PlayListSongList';
import { Song } from '@/utils/config';
export default {
  name: 'PlaylistDetail',
  components: { PlayListSongList, PlayListBackGround },
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
      opacity: 1,
      title: '歌单',
    };
  },
  computed: {
    ...mapGetters(['playList']),
  },
  created() {
    this.getPlaylist();
  },
  mounted() {
    document.addEventListener('scroll', this.handldeScroll);
  },
  methods: {
    async getPlaylist() {
      const { id } = this.$route.params;
      const {
        playlist: {
          tracks,
          creator,
          subscribedCount,
          commentCount,
          description,
          shareCount,
          name,
          coverImgUrl,
        },
        privileges,
      } = await rankSongs(id);
      const info = {
        nickname: creator.nickname,
        avatarUrl: creator.avatarUrl,
        subscribedCount,
        shareCount,
        commentCount,
        description,
        name: name,
        coverImgUrl,
      };
      this.info = info;
      let songs = [];
      for (let i = 0, length = tracks.length; i < length; i++) {
        const song = {
          id: tracks[i]['id'],
          name: tracks[i]['name'],
          album: tracks[i]['al']['name'],
          artists: tracks[i]['ar'],
          picUrl: tracks[i]['al']['picUrl'],
          privilege: {
            pl: privileges[i]['pl'],
            fee: privileges[i]['fee'],
            flag: privileges[i]['flag'],
            maxbr: privileges[i]['maxbr'],
          },
        };
        songs.push(new Song(song));
      }
      this.songs = songs;
    },
    player(index, ele) {
      this.$drop(ele);
      if (!Object.is(this.songs, this.playList)) {
        this.setPlay(this.songs);
        this.setSequenceList(this.songs);
      }
      this.setCurrrentIndex(index);
    },
    handldeScroll() {
      this.opacity = 1 - document.documentElement.scrollTop / 200;
      if (document.documentElement.scrollTop > 150) {
        this.title = this.info.name;
      } else {
        this.title = '歌单';
      }
    },
    ...mapMutations(['setCurrrentIndex', 'setPlay', 'setSequenceList']),
  },
};
</script>
