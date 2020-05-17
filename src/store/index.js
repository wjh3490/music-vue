import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import { playMode } from '../utils/config';

const store = new Vuex.Store({
  state: {
    singer: {},
    currrentIndex: -1,
    playList: [],
    playing: false,
    fullScreen: false,
    sequenceList: [],
    mode: playMode.sequence,
    historyList: JSON.parse(localStorage.getItem('history')) || [],

    likeList: JSON.parse(localStorage.getItem('likeList')) || [],
    playHistory: JSON.parse(localStorage.getItem('playHistory')) || []
  },
  getters: {
    playHistory(state) {
      return state.playHistory;
    },
    likeList(state) {
      return state.likeList;
    },
    singer(state) {
      return state.singer;
    },
    sequenceList(state) {
      return state.sequenceList;
    },
    mode(state) {
      return state.mode;
    },
    currrenSong(state) {
      return state.playList[state.currrentIndex] || {};
    },
    playList(state) {
      return state.playList;
    },
    currrentIndex(state) {
      return state.currrentIndex;
    },
    playing(state) {
      return state.playing;
    },
    fullScreen(state) {
      return state.fullScreen;
    },
    historyList(state) {
      return state.historyList;
    }
  },
  mutations: {
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
      state.currrentIndex = currrentIndex;
    },
    setPlay(state, list) {
      state.playList = list;
    },
    setPlaying(state, playing) {
      state.playing = playing;
    },
    setFullScreen(state, fullScreen) {
      state.fullScreen = fullScreen;
    },
    setMode(state, mode) {
      state.mode = mode;
    },
    setSequenceList(state, list) {
      state.sequenceList = list;
    }
  },
  actions: {
    delSong({ commit, state }, song) {
      let playList = [...state.playList];
      let sequenceList = [...state.sequenceList];
      let currrentIndex = state.currrentIndex;
      let pIndex = playList.findIndex(item => item.id === song.id);
      playList.splice(pIndex, 1);
      let sIndex = sequenceList.findIndex(item => item.id === song.id);
      sequenceList.splice(sIndex, 1);
      if (currrentIndex > pIndex || currrentIndex === playList.length) {
        currrentIndex--;
      }

      commit('setPlay', playList);
      commit('setSequenceList', sequenceList);
      commit('setCurrrentIndex', currrentIndex);
      if (playList.length === 0) {
        commit('setPlaying', false);
      }
    },
    emptyList({ commit }) {
      commit('setPlay', []);
      commit('setSequenceList', []);
      commit('setCurrrentIndex', -1);
      commit('setPlaying', false);
      commit('setFullScreen', false);
    }
  }
});

export default store;
