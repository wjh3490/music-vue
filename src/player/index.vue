<template>
  <div class="player" v-show="playList.length > 0">
    <transition name="scale">
      <div class="normal-player" v-show="fullScreen">
        <div class="normal-player-main">
          <header class="normal-player-header">
            <div class="title">
              <p class="ellipsis">{{ currrenSong.name }}</p>
              <span class="ellipsis">{{ currrenSong.singer }}</span>
            </div>
            <div class="return" @click="setFullScreen(false)">
              <span class="iconfont icon-iconfont2"></span>
            </div>
          </header>

          <transition name="fade1">
            <lyric
              ref="lyric"
              v-show="!visibleAllLyric"
              :currentLyric="currentLyric"
              :visibleAllLyric.sync="visibleAllLyric"
              :activeLyricIndex='activeLyricIndex'
            />
          </transition>

          <transition name="fade1">
            <CircleLyric
            :animationStatus='animationStatus'
              v-show="visibleAllLyric"
              :currentLyric="currentLyric"
              :visibleAllLyric.sync="visibleAllLyric"
              :playingLyric=" currentLyric[activeLyricIndex]"
            />
          </transition>

          <div class="bottom">
            <Mode :visibleMode.sync="visibleMode" @changeMode="changeMode">
              <i
                class="iconfont mode-icon"
                @click="visibleMode = !visibleMode"
                :class="swichMode.icon"
              ></i>
            </Mode>

            <Control
              @pause="pause"
              @next="next"
              @pre="pre"
              :bgc="bgc"
              :palyStatus="palyStatus"
            />

            <div class="collect" @click="handlePlayListVisible
            ">
              <i
                class="iconfont icon-iconsMusicyemianbofangmoshiPlayList collect-icon"
              ></i>
            </div>

            <div class="like" @click="likeMode" :class="running">
              <span class="iconfont like-icon" :class="likeClass"></span>
            </div>
          </div>

          <progress-bar
            :bgc="bgc"
            :duration="duration"
            :currentTime="currentTime"
            @progressBar=" currentTime => audio.currentTime = currentTime"
            :lyricKeys='lyricKeys'
            :LyricScrollY.sync='LyricScrollY'
            :debounce.sync='debounce'
          />
        </div>

        <div
          :class="visibleAllLyric ? '' : 'filterNone'"
          class="blurBg"
          v-lazy:background-image="currrenSong.picUrl"
        ></div>

        <div class="blurBgMask"></div>
      </div>
    </transition>

    <transition name="fade2">
      <mini-player
        v-show="!fullScreen"
        @pause="pause"
        @next="next"
        @handlePlayListVisible="handlePlayListVisible"
        :palyStatus="palyStatus"
        :animationStatus="animationStatus"
        :percent="percent"
      />
    </transition>

    <transition name="slide1">
      <play-list
        :visiblePlayList.sync="visiblePlayList"
        @stopPlay="() => audio.pause()"
        ref="a"
        v-if="visiblePlayList"
        @changeMode="changeMode"
        :swichMode='swichMode'
      />
    </transition>

    <audio
      ref="audio"
      @timeupdate="e => currentTime = e.target.currentTime"
      @ended="end"
      @canplay="canplay"
      @error="songReady = true"
      @play="ready"
    ></audio>
  </div>
</template>

<script>
/*eslint-disable */
const MAX_LENGTH = 100;
import { mapGetters, mapMutations } from 'vuex';
import { playMode } from '../utils/config.js';
import {
  shuffle,
  scrollToEase,
  scrollToSmooth,
  randomColor
} from '../utils/index.js';
import { vGetSong, vGetLyric } from '../api/songs';
import { parseLyric, filterList } from '../utils/index.js';
import PlayList from '../components/PlayList';
import MiniPlayer from './components/MiniPlayer';
import Control from './components/Control';
import ProgressBar from './components/ProgressBar';
import Lyric from './components/Lyric';
import CircleLyric from './components/Circle';
import Mode from './components/Mode';

export default {
  name: 'Player',
  components: {
    PlayList,
    MiniPlayer,
    Control,
    ProgressBar,
    Lyric,
    CircleLyric,
    Mode
  },

  data() {
    return {
      bgc: '',
      visibleMode: false,
      visiblePlayList: false,
      visibleAllLyric: true,
      duration: 0,
      currentTime: 0,
      songReady: false,

      currentLyric: {},
      playingLyric: '',
      // showBgc: true,

      running: '',
      flag: null,

      playMode,
      // modeIndex: 0,
      activeLyricIndex: '0',
      LyricScrollY: 0,
      lyricKeys: [],
      // move: false,
      debounce: false
    };
  },

  computed: {
    ...mapGetters([
      'currrenSong',
      'playList',
      'currrentIndex',
      'playing',
      'fullScreen',
      'mode',
      'sequenceList',
      'likeList',
      'playHistory'
    ]),

    likeClass({ currrenSong, likeList }) {
      const _likeList = [...likeList];
      const flag = _likeList.every(item => item.id !== currrenSong.id);

      return flag ? 'icon-shoucang1' : 'icon-shoucang active_red';
    },
    palyStatus({ playing }) {
      const _playing = playing;
      return _playing ? 'icon-bofangzanting' : 'icon-bofangsanjiaoxing';
    },
    animationStatus({ playing }) {
      const _playing = playing;
      return _playing ? '' : 'animation_pause';
    },
    swichMode({ mode }) {
      const _mode = mode;
      let icon = null;
      let text = '';
      switch (_mode) {
        case 2:
          icon = 'icon-iconsMusicyemianbofangmoshiShuffle';
          text = '随机播放';
          break;
        case 1:
          icon = 'icon-iconsMusicyemianbofangmoshiAlrepeatOne';
          text = '单曲循环';
          break;
        default:
          icon = 'icon-iconsMusicyemianbofangmoshiRepeat';
          text = '顺序播放';
          break;
      }
      return { icon, text };
    },
    percent({ currentTime, duration }) {
      return currentTime / duration;
    }
  },
  watch: {
    async currrenSong(newSong, oldSong) {
      if (!newSong.id) return;
      if (newSong.id === oldSong.id) return;

      let res = await vGetSong(newSong.id);

      this.getLyric(newSong.id);
      if (!res.data[0].url) {
        // 如果没有歌曲路径 就直接跳下一首
        this.next();
        return;
      }
      // this.el.scrollTo(0, 0);

      this.audio.src = res.data[0].url;
      this.$nextTick(() => {
        this.audio.play();
      });
      scrollToSmooth(this.el, 0);
      this.LyricScrollY = 0;
      this.setPlaying(true);
      this.bgc = randomColor();
    },

    currentTime(val) {
      if (!this.currentLyric) return;
      if (!this.fullScreen) return;
      if (this.visibleAllLyric) return;

      if (this.lyricKeys[this.LyricScrollY] > Math.floor(val)) {
        if (this.debounce) {
          this.activeLyricIndex = this.lyricKeys[this.LyricScrollY - 1];
          this.scrollAnimate(this.LyricScrollY);
          this.debounce = false;
        }
        return;
      }

      let filterLyric = [];
      filterLyric = this.lyricKeys.filter(item => item <= Math.floor(val));
      this.LyricScrollY = filterLyric.length;
      this.activeLyricIndex = filterLyric.pop();
      this.scrollAnimate(this.LyricScrollY);
    }
  },
  mounted() {
    this.audio = this.$refs.audio;
    this.el = this.$refs.lyric.$refs.lyricList;
  },
  methods: {
    async getLyric(id) {
      let res = await vGetLyric(id);
      if (!res.lrc) {
        this.currentLyric = '';
        this.playingLyric = '';
        return;
      }
      let currentLyric = parseLyric(res.lrc.lyric);
      let lyrics = {};
      // 删除空的歌词 ( 空白行 )
      for (let key in currentLyric) {
        if (currentLyric[key]) {
          lyrics[key] = currentLyric[key];
        }
      }

      this.currentLyric = Object.freeze(lyrics);
      this.lyricKeys = Object.keys(lyrics);
    },
    scrollAnimate(index) {
      this.$nextTick(() => {
        const start = this.el.scrollTop;
        const activeLyric = document.querySelector('.active-lyric');
        const { offsetTop, offsetHeight } = activeLyric;
        scrollToEase(this.el, start, offsetTop - 150 - offsetHeight);
      });
    },
    //收藏功能
    likeMode() {
      if (!this.flag) {
        this.running = 'running';
        this.flag = setTimeout(() => {
          this.running = '';
          this.flag = null;
        }, 300);
      }
      const list = this.likeList;
      const index = list.findIndex(item => item.id === this.currrenSong.id);
      if (index > -1) {
        list.splice(index, 1);
      } else {
        list.unshift(this.currrenSong);
      }

      localStorage.setItem('likeList', JSON.stringify(list));
      this.setLikeList(list);
    },
    //
    //播放历史功能
    ready() {
      const list = this.playHistory;
      const index = list.findIndex(item => item.id === this.currrenSong.id);
      if (index > -1) list.splice(index, 1);
      if (list.length > MAX_LENGTH) list.pop();

      list.unshift(this.currrenSong);
      localStorage.setItem('playHistory', JSON.stringify(list));
      this.setPlayHistory(list);
      this.songReady = true;
    },
    //
    canplay() {
      this.$nextTick(() => {
        this.duration = this.audio.duration;
      });
    },

    handlePlayListVisible() {
      this.visiblePlayList = true;
      this.$nextTick(() => {
        let index = this.playList.findIndex(
          item => item.id === this.currrenSong.id
        );
        this.$refs.a.$refs.scrollSong.scrollTo(
          0,
          this.$refs.a.$refs.songItem[index].offsetTop -
            (this.$refs.a.$refs.scrollSong.offsetHeight +
              this.$refs.a.$refs.songItem[index].offsetHeight) /
              2
        );
      });
    },

    changeMode(mode) {
      this.setMode(mode);
      this.getNewList(mode);
      this.visibleMode = false;
    },
    getNewList(mode) {
      let list = null;
      list =
        mode === playMode.random
          ? shuffle(this.sequenceList)
          : this.sequenceList;

      this.resetCurrentIndex(list);
      this.setPlay(list);
    },
    resetCurrentIndex(list) {
      const index = list.findIndex(item => item.id === this.currrenSong.id);
      this.setCurrrentIndex(index);
    },

    end() {
      if (this.playList.length === 1) this.setMode(playMode.loop);
      this.mode === playMode.loop ? this.loop() : this.next();
    },
    loop() {
      this.audio.currentTime = 0;
      this.audio.play();
      if (this.currentLyric) {
        this.el.scrollTo(0, 0);
      }
    },
    pre() {
      if (!this.songReady) return;
      const index = this.currrentIndex - 1;
      if (index === -1) index = this.playList.length - 1;

      this.setCurrrentIndex(index);
      this.songReady = false;
    },
    pause() {
      this.setPlaying(!this.playing);
      this.playing ? this.audio.play() : this.audio.pause();
    },
    next() {
      if (!this.songReady) return;
      const index = this.currrentIndex + 1;
      if (index === this.playList.length) index = 0;

      this.setCurrrentIndex(index);
      this.songReady = false;
    },

    ...mapMutations([
      'setCurrrentIndex',
      'setPlaying',
      'setMode',
      'setPlay',
      'setFullScreen',
      'setLikeList',
      'setPlayHistory'
    ])
  }
};
</script>
<style scoped lang="less">
@import './index.less';
</style>
