<template>
  <div class="album-container">
    <BaseBack background="transparent" :title="title" color="#fff" />
    <BaseBackGround :info="info" :opacity="opacity"/>
    <BaseSongList :songs="songs" @player="player" />
  </div>
</template>
<script>
/*eslint-disable */
import { mapMutations, mapGetters } from 'vuex';
import { getAlbum } from '@/api/album';
import { Song } from '@/utils/config';
export default {
  name: 'Album',
  data() {
    return {
      songs: [], opacity: 1,
      info: {
        nickname: '',
        subscribedCount: 0,
        commentCount: 0,
        shareCount: 0,
        description: 0,
        name: '',
        coverImgUrl: '',
        avatarUrl: '',
      },
      title:'专辑'
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
      const { code, songs, album } = await getAlbum(id);
      const info = {
        artist: (album.artists || []).map((item) => item.name).join('/'),
        alias: (album.alias || []).join('/'),
        subscribedCount: album.info.likedCount || 0,
        commentCount: album.info.commentCount || 0,
        shareCount: album.info.shareCount || 0,
        description: album.description,
        name: album.name,
        coverImgUrl: album.picUrl,
        publishTime: album.publishTime,
        id: album.artist.id,
      };
      this.info = info;

      let list = [];
      for (let i = 0, length = songs.length; i < length; i++) {
        const song = {
          id: songs[i]['id'],
          name: songs[i]['name'],
          album: songs[i]['al']['name'],
          artists: songs[i]['ar'],
          picUrl: songs[i]['al']['picUrl'],
          publishTime: album.publishTime,
          alia: songs[i]['alia'] || [],
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
    getArtist(artist) {
      return artist.reduce((acc, cur) => {
        acc.push(cur.name);
        return acc;
      }, []);
    },
    player(index, ele, item) {
      if (item.fee == 1) {
        this.$toast({ message: '此歌曲为vip歌曲, 因合作方要求,暂时无法播放' });
      }
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
        this.title = "专辑";
      }
    },
    ...mapMutations(['setCurrrentIndex', 'setPlay', 'setSequenceList']),
  },
};
</script>
