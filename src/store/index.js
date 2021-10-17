import { createStore } from 'vuex'
import { playMode } from '../utils/config'
const parse = JSON.parse

const store = createStore({
  state: {
    axiosList: {},
    singer: {},
    songInfo: '',
    currrentIndex: -1,
    playList: [],
    playing: false,
    fullScreen: false,
    sequenceList: [],
    mode: playMode.sequence,
    historyList: parse(localStorage.getItem('history')) || [],
    likeList: parse(localStorage.getItem('likeList')) || [],
    playHistory: parse(localStorage.getItem('playHistory')) || [],
    playListVisible: false,
    currentTime: 0,
    currentLyric: [],
    duration: 0,
    LyricScrollY: 0,
    debounce: false,
    activeLyricIndex: 0,

    lockScroll: 0,
  },
  getters: {
    lyricKeys(state) {
      const times = (state.currentLyric || []).map(item => item.time ? item.time : '') || []
      return times.filter(Boolean);
    },
    currentSong(state) {
      return state.playList[state.currrentIndex] || {};
    },
  },
  mutations: {
    setlockScroll(state, num) {
      state.lockScroll = state.lockScroll + num;
    },
    setPlayListVisible(state, visible) {
      state.playListVisible = visible;
    },
    setActiveLyricIndex(state, index) {
      state.activeLyricIndex = index;
    },
    setDebounce(state, debounce) {
      state.debounce = debounce;
    },
    setLyricScrollY(state, LyricScrollY) {
      state.LyricScrollY = LyricScrollY;
    },
    setCurrentLyric(state, currentLyric) {
      state.currentLyric = currentLyric;
    },
    setCurrentTime(state, time) {
      state.currentTime = time;
    },
    setDuration(state, time) {
      state.duration = time;
    },
    setSongInfo(state, obj) {
      state.songInfo = obj;
    },
    setAxiosList(state, obj) {
      state.axiosList = Object.assign(state.axiosList, obj);
    },
    clearAxiosList(state) {
      state.axiosList = {};
    },
    setPlayHistory(state, playHistory) {
      state.playHistory = playHistory;
    },
    setLikeList(state, likeList) {
      state.likeList = likeList;
    },
    setHistoryList(state, historyList) {
      state.historyList = historyList;
    },
    setSinger(state, singer) {
      state.singer = singer;
    },
    setCurrrentIndex(state, currrentIndex) {
      state.currrentIndex = currrentIndex; // 当前歌曲下标
    },
    setPlay(state, list) {
      state.playList = list;
    },
    setPlaying(state, playing) {
      state.playing = playing; // 播放状态
    },
    setFullScreen(state, fullScreen) {
      state.fullScreen = fullScreen;
    },
    setMode(state, mode) {
      state.mode = mode;
    },
    setSequenceList(state, list) {
      state.sequenceList = list;
    },
  },
  actions: {
    delSong({ commit, state }, song) {
      let playList = [...state.playList];
      let sequenceList = [...state.sequenceList];
      let currrentIndex = state.currrentIndex;
      let pIndex = playList.findIndex((item) => item.id === song.id);
      playList.splice(pIndex, 1);
      let sIndex = sequenceList.findIndex((item) => item.id === song.id);
      sequenceList.splice(sIndex, 1);
      if (currrentIndex > pIndex || currrentIndex === playList.length) {
        currrentIndex--;
      }

      commit('setPlay', playList);
      commit('setSequenceList', sequenceList);
      commit('setCurrrentIndex', currrentIndex);
      if (playList.length === 0) {
        commit('setPlaying', false);
        if (state.fullScreen) {
          commit('setFullScreen', false);
        }
      }
    },
    clearAll({ commit, state }) {
      commit('setPlay', []);
      commit('setSequenceList', []);
      commit('setCurrrentIndex', -1);
      commit('setPlaying', false);
      if (state.fullScreen) {
        commit('setFullScreen', false);
      }
    },
    actionPre({ commit, state }) {
      let index = state.currrentIndex - 1;
      if (index === -1) index = state.playList.length - 1;
      commit('setCurrrentIndex', index);
    },
    actionNext({ commit, state }) {
      let index = state.currrentIndex + 1;
      if (index === state.playList.length) index = 0;
      commit('setCurrrentIndex', index);
    },
  },
});

export default store;
