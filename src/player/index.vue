<template>
  <div class="player" v-show="playList.length > 0">
    <transition name="scale">
      <NormalPlayer
        v-if="fullScreen"
        :swichMode="swichMode"
        :audio="audio"
        :currentTime="currentTime"
        :duration="duration"
        :palyStatus="palyStatus"
        :animationStatus="animationStatus"
        :currentLyric="currentLyric"
        :lyricKeys="lyricKeys"
        @pause="pause"
        @next="next"
        @pre="pre"
        @mode="changeMode"
        @handlePlayListVisible="handlePlayListVisible"
        ref="normal"
      />
    </transition>

    <transition name="fade2">
      <MiniPlayer
        v-if="!fullScreen"
        @pause="pause"
        @next="next"
        @handlePlayListVisible="handlePlayListVisible"
        :palyStatus="palyStatus"
        :animationStatus="animationStatus"
        :percent="percent"
      />
    </transition>

    <transition name="slide1">
      <PlayList
        :visiblePlayList.sync="visiblePlayList"
        @stopPlay="() => audio.pause()"
        ref="playList"
        v-if="visiblePlayList"
        @changeMode="changeMode"
        :swichMode="swichMode"
      />
    </transition>

    <audio
      ref="audio"
      :src="src"
      @timeupdate="(e) => (currentTime = e.target.currentTime)"
      @ended="end"
      @canplay="canplay"
      @error="songReady = true"
      @play="ready"
    ></audio>
  </div>
</template>

<script>
/*eslint-disable */
const modeStatus = {
  0: { icon: 'icon-iconsMusicyemianbofangmoshiRepeat', text: '顺序播放' },
  1: { icon: 'icon-iconsMusicyemianbofangmoshiAlrepeatOne', text: '单曲循环' },
  2: { icon: 'icon-iconsMusicyemianbofangmoshiShuffle', text: '随机播放' },
};
const MAX_LENGTH = 100;
import { mapGetters, mapMutations } from 'vuex';
import { playMode } from '../utils/config.js';
import {
  shuffle,
  scrollToEase,
  scrollToSmooth,
  randomColor,
  parseLyric,
  filterList,
} from '../utils/index.js';
import { vGetSong, vGetLyric } from '../api/songs';
import MiniPlayer from '@/components/Player/MiniPlayer';
import NormalPlayer from '@/components/Player/NormalPlayer';
import PlayList from '@/components/Player/PlayList';
export default {
  name: 'Player',
  components: { MiniPlayer, NormalPlayer, PlayList },
  data() {
    return {
      src: '',
      visiblePlayList: false,
      duration: 0,
      currentTime: 0,
      songReady: false,
      currentLyric: {},
      lyricKeys: [],
      playMode,
      audio: '',
    };
  },

  computed: {
    palyStatus({ playing }) {
      return playing ? 'icon-bofangzanting' : 'icon-bofangsanjiaoxing';
    },
    animationStatus({ playing }) {
      return playing ? '' : 'animation_pause';
    },
    swichMode({ mode }) {
      return modeStatus[mode];
    },
    percent({ currentTime, duration }) {
      return currentTime / duration;
    },
    ...mapGetters([
      'currrenSong',
      'playList',
      'currrentIndex',
      'playing',
      'fullScreen',
      'mode',
      'sequenceList',
      'playHistory',
    ]),
  },
  updated() {
    console.log(222);
  },

  mounted() {
    this.audio = this.$refs.audio;
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
      this.src = res.data[0].url;
      this.$nextTick(() => {
        this.audio.play();
      });
      this.setPlaying(true);

      if (this.fullScreen) {
        this.$refs.normal.scrollToSmooth();
        this.$refs.normal.LyricScrollY = 0;
      }
    },
  },
  methods: {
    async getLyric(id) {
      let res = await vGetLyric(id);
      if (!res.lrc) {
        this.currentLyric = '';
        // this.playingLyric = '';
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
    ready() {
      const list = this.playHistory;
      const index = list.findIndex((item) => item.id === this.currrenSong.id);
      if (index > -1) list.splice(index, 1);
      if (list.length > MAX_LENGTH) list.pop();

      list.unshift(this.currrenSong);
      localStorage.setItem('playHistory', JSON.stringify(list));
      this.setPlayHistory(list);
      this.songReady = true;
    },
    canplay() {
      this.$nextTick(() => {
        this.duration = this.audio.duration;
      });
    },

    handlePlayListVisible() {
      this.visiblePlayList = true;
      this.$nextTick(() => {
        const playList = this.$refs.playList; //
        playList.getActiveItemDistancce();
      });
    },
    changeMode(mode) {
      if (this.mode === mode) return;
      this.setMode(mode);
      this.getNewList(mode);
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
      const index = list.findIndex((item) => item.id === this.currrenSong.id);
      this.setCurrrentIndex(index);
    },

    end() {
      if (this.playList.length === 1) this.setMode(playMode.loop);
      this.mode === playMode.loop ? this.loop() : this.next();
    },
    loop() {
      this.audio.currentTime = 0;
      this.audio.play();
      if (this.currentLyric) this.el.scrollTo(0, 0);
    },
    pre() {
      if (!this.songReady) return;
      let index = this.currrentIndex - 1;
      if (index === -1) index = this.playList.length - 1;
      this.setCurrrentIndex(index);
      this.songReady = false;
    },
    pause() {
      this.setPlaying(!this.playing);
      this.playing ? this.audio.play() : this.audio.pause();
    },
    next() {
      console.log(111);
      if (!this.songReady) return;
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
      'setPlayHistory',
    ]),
  },
};
</script>
<style scoped lang="less">
@base: 37.5rem;
.player {
  position: relative;
  z-index: 12;
}
</style>
