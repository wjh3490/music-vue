<template>
  <div class="rank-detail">
    <BaseBack background="transparent" :title="title" color="#fff" :isFixed="true" />
    <BaseBackGround :info="info" :opacity="opacity" />
    <BaseSongList :songs="songs" @player="player" />
  </div>
</template>

<script lang="ts">
import { defineComponent} from 'vue';
import { rankSongs } from '@/api/rank';
import { mapMutations, mapGetters } from 'vuex';
import { Song } from '@/utils/config';
const mapName = {
  0: '歌单',
  1: '排行榜',
};
export default defineComponent({
  name: 'PlaylistDetail',
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
      title: mapName[this.$route.query.type],
    };
  },
  computed: {
    ...mapGetters(['playList']),
  },
  created() {
    this.fetchPlaylist();
  },
  mounted() {
    document.addEventListener('scroll', this.handldeScroll);
  },
  methods: {
    async fetchPlaylist() {
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
          updateTime,
          playCount,
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
        updateTime,
        playCount,
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
          publishTime: tracks[i]['publishTime'],
          alia: tracks[i]['alia'],
          privilege: {
            pl: privileges[i]['pl'],
            fee: tracks[i]['fee'],
            flag: privileges[i]['flag'],
            maxbr: privileges[i]['maxbr'],
          },
        };
        songs.push(new Song(song));
      }
      this.songs = songs;
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
        this.title = mapName[this.$route.query.type];
      }
    },
    ...mapMutations([
      'setFullScreen',
      'setCurrrentIndex',
      'setPlay',
      'setSequenceList',
    ]),
  },
});
</script>
