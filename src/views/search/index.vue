<template>
  <div class="search">
    <div class="input">
      <Return />
      <div class="content">
        <input
          type="text"
          v-model="searchData"
          placeholder="热门"
          class="search-input"
        />
      </div>
      <div class="cancle" @click="cancle">
        <span>取消</span>
      </div>
    </div>

    <div class="item">
      <SearchList
        :list="hotLsit"
        @handleSearch="data => (searchData = data)"
        :visible="!searchData"
        :vertical="true"
        key="hot"
      >
      </SearchList>

      <SearchList
        :visible="!searchData"
        :list="historyList"
        @handleSearch="data => (searchData = data)"
        @del="del"
        :vertical="false"
          key="history"
      ></SearchList>

      <Result :list="searchList" @play="play">
        <template v-slot="{ item }">
          <div class="name ellipsis" v-html="highlight(item.name)"></div>
          <div class="singer ellipsis" v-html="highlight(item.singer)"></div>
        </template>
      </Result>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapMutations, mapGetters } from 'vuex';
import { vSearch, vSearchHot } from '../../api/search';
import Return from '../../components/Return/index';
import { filterList } from '../../utils/index.js';
import SearchList from './components/SearchList';
import Result from './components/Result';
export default {
  name: 'Search',
  components: { Return, SearchList, Result },

  data() {
    return {
      searchData: '',
      hotLsit: [],
      // showList: true,
      searchList: [],
      flag: null
    };
  },

  computed: {
    highlight() {
      const reg = new RegExp(this.searchData, 'gi');
      return function(val) {
        return val.replace(reg, `<span class='red'>${this.searchData}</span>`);
      };
    },
    ...mapGetters(['playList', 'historyList'])
  },

  watch: {
    searchData(newVal) {
      this.debounce(() => {
        this.getSearch(newVal);
      }, 500);
    }
  },

  created() {
    this.getHotList();
  },

  methods: {
    debounce(fn, wait = 1000) {
      if (this.flag) clearTimeout(this.flag);
      this.flag = setTimeout(fn, wait);
    },
    async getSearch(data) {
      // if (this.searchData) {
      //   this.showList = false
      // } else {
      //   this.showList = true
      // }
      if (!this.searchData) {
        this.searchList = [];
        return;
      }

      const { code, result } = await vSearch(data);
      if (code === 200) {
        const { songs } = result;
        let songsList = [];

        songs.forEach(ele => {
          const song = {
            id: ele.id,
            name: ele.name,
            singer: ele.artists[0].name,
            picUrl: ele.artists[0].img1v1Url
          };

          songsList.push(song);
        });

        this.searchList = songsList;
      }
    },
    async getHotList() {
      const { code, result } = await vSearchHot();
      if (code === 200) {
        const { hots } = result;
        hots.forEach(item => {
          this.hotLsit.push(item.first);
        });
      }
    },
    cancle() {
      this.searchData = '';
      this.searchList = [];
      // this.showList = true
    },
    // searchHot(data) {
    //   this.searchData = data;
    // },
    // highlight(val) {
    //   const reg = new RegExp(this.searchData, 'gi');
    //   return val.replace(reg, `<span class='red'>${this.searchData}</span>`);
    // },
    del() {
      if (this.historyList.length === 0) return;
      this.$MessageBox({
        title: '',
        content: '是否要删除全部'
      })
        .then(() => {
          this.setHistoryList([]);
          localStorage.setItem('history', JSON.stringify([]));
        })
        .catch(() => {});
    },
    play(song) {
      console.log(song)
      let songs = this.playList;
      let history = this.historyList;
      let id = history.indexOf(this.searchData);
      if (id > -1) {
        history.splice(id, 1);
      }
      if (history.length > 10) {
        history.pop();
      }
      history.unshift(this.searchData);
      /**********************/
      songs = filterList(songs, song);
      let index  = songs.findIndex(item => item.id === song.id)
      localStorage.setItem('history', JSON.stringify(history));
      this.setPlay(songs);
      this.setCurrrentIndex(index);
      this.setFullScreen(true);
      this.setHistoryList(history);
    },
    ...mapMutations([
      'setCurrrentIndex',
      'setPlay',
      // 'setPlaying',
      'setFullScreen',
      'setHistoryList'
    ])
  }
};
</script>
<style scoped lang="less">
@base: 37.5rem;
.search {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fbfbfb;
  padding-top: 50px;
  color: #f1f1f1;
  z-index: 9;
  .item {
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .input {
    top: 0;
    width: 100%;
    position: fixed;
    padding: 0 50px;
    background: #169af3;
    height: 50 / @base;
    overflow: hidden;
    font-size: 0px;
    // color: #f1f1f1;
    .content {
      margin-top: 10 / @base;
      font-size: 14px;
      .search-input {
        width: 100%;
        height: 28 / @base;
        padding-left: 15 / @base;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50px;
        &::-webkit-input-placeholder {
          /* placeholder颜色  */
          color: #f1f1f1;
          /* placeholder字体大小  */
          font-size: 14px;
          /* placeholder位置  */
          // text-align: right;
        }
      }
    }
    .cancle {
      position: absolute;
      right: 10 / @base;
      top: 50%;
      transform: translate3d(0, -50%, 0);
      font-size: 14px;
      color: #f1f1f1;
    }
  }
}
.name {
  font-size: 14px;
}
</style>
