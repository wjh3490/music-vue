<template>
  <audio
    id="audio"
    ref="audio"
    :src="src"
    @timeupdate="audioTimeUpdate"
    @ended="end"
    @canplay="canplay"
    @error="songReady = true"
    @play="ready"
  ></audio>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { playMode } from '@/utils/config.js';
import { parseLyric, shuffle } from '@/utils';
import { vGetSong, vGetLyric } from '@/api/songs';
export default {
  name: 'Audio',
  data() {
    return {
      src: '',
      songReady: false,
      modeList: [
        { icon: 'icon-iconsMusicyemianbofangmoshiRepeat', name: '顺序播放' },
        {
          icon: 'icon-danquxunhuan1',
          name: '单曲循环',
        },
        { icon: 'icon-iconsMusicyemianbofangmoshiShuffle', name: '随机播放' },
      ],
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
      'playHistory',
      'playAction',
    ]),
  },

  mounted() {
    this.audio = this.$refs.audio;
  },
  watch: {
    async currrenSong(newSong) {
      if (JSON.stringify(newSong) == '{}') {
        this.src = '';
        return;
      }
      if (newSong.privilege.fee == 1) {
        this.$toast({
          message:
            '此歌曲为vip歌曲, 因合作方要求, 暂时无法播放. 将自动播放下一首',
        });
        this.next();
        return;
      }
      let res = await vGetSong(newSong.id);
      if (!res.data[0].url) {
        this.src = `https://music.163.com/song/media/outer/url?id=${newSong.id}.mp3`;
      } else {
        this.src = res.data[0].url;
      }
      this.getLyric(newSong.id);
      this.setPlaying(true);
      this.setLyricScrollY(0);
      this.setCurrentTime(0);
      this.$nextTick(() => this.audio.play());
    },
    playing(val) {
      if (val) {
        this.$nextTick(() => this.audio.play());
      } else {
        this.$nextTick(() => this.audio.pause());
      }
    },
    mode(val) {
      this.getNewList(val);
      this.$toast({
        message: this.modeList[val]['name'] + '模式',
      });
    },
  },
  methods: {
    audioTimeUpdate(e) {
      this.setCurrentTime(e.target.currentTime);
    },
    async getLyric(id) {
      let res = await vGetLyric(id);
      if (!res.lrc) {
        this.currentLyric = '';
        return;
      }
      let currentLyric = parseLyric(res.lrc.lyric);
      let currentTLyric = parseLyric(res.tlyric.lyric);

      let lyrics = {};
      for (let key in currentLyric) {
        if (currentLyric[key]) {
          lyrics[key] = {
            lyric: currentLyric[key],
            tlyric: currentTLyric[key],
          };
        }
      }
      this.setCurrentLyric(lyrics);
      this.setLyricKeys(Object.keys(lyrics));
    },
    ready() {},
    canplay() {
      this.$nextTick(() => this.setDuration(this.audio.duration));
    },
    end() {
      if (this.playList.length === 1) this.setMode(playMode.loop);
      this.mode === playMode.loop ? this.loop() : this.next();
    },
    loop() {
      this.setCurrentTime(0);
      this.audio.play();
      if (this.currentLyric) this.el.scrollTo(0, 0);
    },
    pre() {
      this.actionPre();
      // if (!this.songReady) return;
      // let index = this.currrentIndex - 1;
      // if (index === -1) index = this.playList.length - 1;
      // this.setCurrrentIndex(index);
      // this.songReady = false;
    },
    next() {
      // if (!this.songReady) return;
      this.actionNext();
      // let index = this.currrentIndex + 1;
      // if (index === this.playList.length) index = 0;
      // this.setCurrrentIndex(index);
      // this.songReady = false;
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
    ...mapMutations([
      'setCurrentTime',
      'setDuration',
      'setCurrrentIndex',
      'setPlaying',
      'setPlay',
      'setMode',
      'setSongInfo',
      'setCurrentLyric',
      'setLyricKeys',
      'setLyricScrollY',
    ]),
    ...mapActions(['actionPre', 'actionNext']),
  },
};
</script>
<style scoped lang="less">
@base: 37.5rem;
.player {
  position: relative;
  z-index: 100;
}
</style>
