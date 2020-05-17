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
              v-show="!showBgc"
              :currentTime="currentTime"
              :currentLyric="currentLyric"
              :showBgc.sync="showBgc"
              :animationStatus="animationStatus"
              :playingLyric="playingLyric"
            />
          </transition>

          <transition name="fade1">
            <CircleLyric
              v-show="showBgc"
              :currentLyric="currentLyric"
              :showBgc.sync="showBgc"
              :animationStatus="animationStatus"
              :playingLyric="playingLyric"
            />
          </transition>

          <div class="bottom">
            <Mode :showMode.sync="showMode" @changeMode="changeMode" :modeIndex="modeIndex">
              <i
                class="iconfont mode-icon"
                @click="showMode = !showMode"
                :class="swichMode.icon"
              ></i>
            </Mode>

            <control
              @pause="pause"
              @next="next"
              @pre="pre"
              :bgc="bgc"
              :palyStatus="palyStatus"
            />

            <div class="collect" @click="showPlayList">
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
            :move.sync="move"
            @progressBar="setProgressBar"
          />
        </div>

        <div
          :class="showBgc ? '' : 'filterNone'"
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
        @showPlayList="showPlayList"
        :palyStatus="palyStatus"
        :animationStatus="animationStatus"
        :percent="currentTime/duration"
      />
    </transition>

    <transition name="slide1">
      <play-list
        :playShow.sync="playShow"
        @stopPlay="StopPlay"
        ref="a"
        v-if="playShow"
        @changeMode="changeMode"
        :swichMode='swichMode'
      />
    </transition>

    <audio
      ref="audio"
      @timeupdate="updateTime"
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
import { vGetSong, vGetLyric } from '../api/songs';
import { parseLyric, filterList } from '../utils/index.js';
import PlayList from '../components/PlayList';
import MiniPlayer from './components/MiniPlayer';
import Control from './components/Control';
import ProgressBar from './components/ProgressBar';
import Lyric from './components/Lyric';
import CircleLyric from './components/Circle';
import Mode from './components/Mode';
import { shuffle } from '../utils/index.js';
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
      showMode: false, // 控制播放模式显示,
      duration: 0,
      currentTime: 0,
      playShow: false,
      songReady: false,
      // isLike: false,
      currentLyric: {},
      playingLyric: '',
      showBgc: true,

      running: '',
      flag: null,
      playMode: playMode,
      modeIndex: 0
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
      let _likeList = [...likeList];
      let flag = _likeList.every(item => item.id !== currrenSong.id);

      return flag ? 'icon-shoucang1' : 'icon-shoucang active_red';
    },
    palyStatus({ playing }) {
      let _playing = playing;
      return _playing ? 'icon-bofangzanting' : 'icon-bofangsanjiaoxing';
    },
    animationStatus({ playing }) {
      let _playing = playing;
      return _playing ? '' : 'animation_pause';
    },
    swichMode({ mode }) {
      let _mode = mode;
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
    }
  },
  watch: {
    async currrenSong(newSong, oldSong) {
      if (!newSong.id) {
        return;
      }
      if (newSong.id === oldSong.id) {
        return;
      }

      let res = await vGetSong(newSong.id);
      this.getLyric(newSong.id);
      if (!res.data[0].url) {
        // 如果没有歌曲路径 就直接跳下一首
        this.next();
        return;
      }
      this.$refs.audio.src = res.data[0].url;
      this.$nextTick(() => {
        this.$refs.audio.play();
      });

      this.setPlaying(true);
      this.rgbColor();
    },
    currentTime(val) {
      if (!this.currentLyric) {
        return;
      }
      if (!this.fullScreen) {
        return;
      }
      if (this.showBgc) {
        return;
      }
      this.$nextTick(() => {
        let yellows = document.querySelectorAll('.yellow');
        let empty = this.$refs.lyric.$refs.empty.offsetHeight;

        Array.from(yellows).forEach(ele => ele.classList.remove('font-color'));
        if (yellows.length !== 0) {
          let last = yellows[yellows.length - 1];
          last.classList.add('font-color');

          let lyricLine = last.offsetTop;
          let offsetHeight = last.offsetHeight;

          this.playingLyric = last.innerHTML;
          this.$refs.lyric.$refs.lyricList.scrollTo({
            top: lyricLine - empty - offsetHeight,
            left: 0,
            behavior: 'smooth'
          });
        }
      });
    }
  },

  created() {
    this.touch = {};
    this.move = false;
  },

  methods: {
    StopPlay() {
      this.$refs.audio.pause();
    },

    async getLyric(id) {
      let res = await vGetLyric(id);
      if (!res.lrc) {
        this.currentLyric = '';
        this.playingLyric = '';
        return;
      }
      let currentLyric = parseLyric(res.lrc.lyric);
      let a = {};
      // 删除空的歌词 ( 空白行 )
      for (let key in currentLyric) {
        if (currentLyric[key]) {
          a[key] = currentLyric[key];
        }
      }

      this.currentLyric = a;
      this.$refs.lyric.$refs.lyricList.scrollTo(0, 0);
    },

    rgbColor() {
      let r = parseInt(Math.random() * 100) + 100;
      let g = parseInt(Math.random() * 100) + 100;
      let b = parseInt(Math.random() * 100) + 100;
      this.bgc = `rgb(${r}, ${g}, ${b})`;
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
      let list = this.likeList;
      let index = list.findIndex(item => item.id === this.currrenSong.id);
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
      let list = this.playHistory;
      let index = list.findIndex(item => item.id === this.currrenSong.id);
      if (index > -1) {
        list.splice(index, 1);
      }
      if (list.length > MAX_LENGTH) {
        list.pop();
      }
      list.unshift(this.currrenSong);

      localStorage.setItem('playHistory', JSON.stringify(list));
      this.setPlayHistory(list);
      this.songReady = true;
    },
    //
    canplay() {
      this.$nextTick(() => {
        this.duration = this.$refs.audio.duration;
      });
    },

    showPlayList() {
      this.playShow = true;
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
    /**滚动条功能 */
    setProgressBar(currentTime) {
      this.$refs.audio.currentTime = currentTime;
    },

    /**滚动条功能 */
    updateTime(e) {
      if (this.move) {
        return;
      }

      this.currentTime = e.target.currentTime;
    },

    changeMode(mode) {
      this.setMode(mode);
      // let list = null;
      // if (mode === playMode.random) {
      //   list = shuffle(this.sequenceList);
      // } else {
      //   list = this.sequenceList;
      // }
      // this.resetCurrentIndex(list);
      // this.setPlay(list);
      this.setPlayList(mode);
      this.showMode = false;
    },
    setPlayList(mode) {
      let list = null;
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList);
      } else {
        list = this.sequenceList;
      }
      this.resetCurrentIndex(list);
      this.setPlay(list);
    },
    resetCurrentIndex(list) {
      let index = list.findIndex(item => {
        return item.id === this.currrenSong.id;
      });
      this.setCurrrentIndex(index);
    },

    end() {
      console.log(this.playList.length === 1);
      if (this.playList.length === 1) {
        this.setMode(playMode.loop);
      }

      if (this.mode === playMode.loop) {
        this.loop();
      } else {
        this.next();
      }
    },
    loop() {
      this.$refs.audio.currentTime = 0;
      this.$refs.audio.play();
      if (this.currentLyric) {
        this.$refs.lyric.$refs.lyricList.scrollTo(0, 0);
      }
    },
    pre() {
      if (!this.songReady) {
        return;
      }
      let index = this.currrentIndex - 1;
      if (index === -1) {
        index = this.playList.length - 1;
      }
      this.setCurrrentIndex(index);
      this.songReady = false;
    },
    pause() {
      const audio = this.$refs.audio;
      this.setPlaying(!this.playing);
      this.playing ? audio.play() : audio.pause();
    },
    next() {
      if (!this.songReady) {
        return;
      }
      let index = this.currrentIndex + 1;
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
