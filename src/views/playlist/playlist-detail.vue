<template>
  <div class="detail-container">
    <BaseBack
      background="transparent"
      :title="$route.query.name"
      color="#fff"
    />
    <DetailBackGround :info="info" />
    <DetailSongList :songs="songs" @player="player" :showText="showText" />
    <div>
      <div v-for="(item, index) in balls" :key="index">
        <transition
          @before-enter="beforeEnter"
          @enter="enter"
          @after-enter="afterEnter"
        >
          <div class="musicIcon ball" v-show="item.show">
            <i class="iconfont icon-yinle inner inner-hook"></i>
          </div>
        </transition>
      </div>
    </div>
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
      showText: false,
      percent: 0,
      scrollTop: 0,
      musicIcon: false,
      dom: null,
      info: {},
      balls: [
        { show: false },
        { show: false },
        { show: false },
        { show: false },
        { show: false },
      ],
      dropBalls: [],
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
    drop(el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          this.dropBalls.push(ball);
          return;
        }
      }
    },
    beforeEnter(el) {
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect();
          let x = 120;
          let y = -(window.innerHeight - rect.top - 50);
          el.style.display = '';
          el.style.webkitTransform = `translate3d(0,${y}px,0)`;
          el.style.transform = `translate3d(0,${y}px,0)`;
          el.style.transition = 'all .8s';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
          inner.style.transform = `translate3d(${x}px,0,0)`;
          inner.style.transition = 'all .8s';
          console.log(el.style.transform, x);
        }
      }
    },
    enter(el, done) {
      let rf = el.offsetHeight;
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0,0,0)';
        el.style.transform = 'translate3d(0,0,0)';
        el.style.transition = 'all .8s cubic-bezier(.62,-0.1,.86,.57)';
        let inner = el.getElementsByClassName('inner-hook')[0];
        inner.style.webkitTransform = 'translate3d(0,0,0)';
        inner.style.transform = 'translate3d(0,0,0)';
        inner.style.transition = 'all .8s linear';
        el.addEventListener('transitionend', done);
        // done();
      });
    },

    afterEnter(el) {
      let ball = this.dropBalls.shift();
      if (ball) {
        ball.show = false;
        el.style.display = 'none';
      }
    },
    scroll(e) {
      console.log(e.target.scrollTop);
      this.percent = Math.min(e.target.scrollTop / 400, 1);
      this.scrollTop = e.target.scrollTop;
      if (e.target.scrollTop >= 250) {
        this.showText = true;
      } else {
        this.showText = false;
      }
    },
    player(index, ele) {
      this.drop(ele);
      this.musicIcon = true;
      this.dom = ele;
      if (!Object.is(this.songs, this.playList)) {
        this.setPlay(this.songs);
        this.setSequenceList(this.songs);
      }
      this.setCurrrentIndex(index);
      // this.setFullScreen(true)
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
.musicIcon {
  position: fixed;
  bottom: 35px;
  left: 100px;
  z-index: 9999;
  i {
    font-size: 30px;
    color: #169af3;
    font-weight: 700;
  }
}
</style>
>
