<template>
  <div class="search">
    <BaseBack :isFixed="true" :background="'rgb(22, 154, 243'">
      <input
        type="text"
        v-model="searchData"
        placeholder="热门"
        class="search-input"
      />

      <template #right>
        <span @click="cancle" style="font-size:15px">取消</span>
      </template>
    </BaseBack>

    <div class="item">
      <SearchList
        :list="hotLsit"
        hotTitle="热门搜索"
        @handleSearch="(data) => (searchData = data)"
        :visible="!searchData"
        :vertical="true"
        key="hot"
      />

      <SearchList
        :visible="!searchData"
        hotTitle="历史记录"
        :list="historyList"
        @handleSearch="(data) => (searchData = data)"
        @del="del"
        :vertical="false"
        key="history"
      />

      <SearchResult :list="searchList" @play="play" :noResult="noResult">
        <template v-slot="{ item }">
          <div class="name ellipsis" v-html="highlight(item.name)"></div>
          <div class="singer ellipsis" v-html="highlight(item.singer)"></div>
        </template>
      </SearchResult>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapMutations, mapGetters } from 'vuex';
import { vSearch, vSearchHot } from '@/api/search';
import { filterList } from '@/utils/index.js';
import SearchList from '@/components/Search/SearchList';
import SearchResult from '@/components/Search/SearchResult';
export default {
  name: 'Search',
  components: { SearchList, SearchResult },
  data() {
    return {
      searchData: '',
      hotLsit: [],
      searchList: [],
      flag: null,
      noResult: false,
    };
  },

  computed: {
    highlight() {
      const reg = new RegExp(this.searchData, 'gi');
      return function(val) {
        return val.replace(reg, `<span class='red'>${this.searchData}</span>`);
      };
    },
    ...mapGetters(['playList', 'historyList']),
  },

  watch: {
    searchData(newVal) {
      this.debounce(() => {
        this.getSearch(newVal);
      }, 300);
    },
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
      if (!this.searchData) {
        this.searchList = [];
        return;
      }

      const { code, result } = await vSearch(data);
      if (code === 200) {
        const { songs } = result;
        if (!songs) {
          this.searchList = [];
          this.noResult = true;
          return;
        }
        this.noResult = false;
        const songsList = songs.reduce((acur, ele) => {
          const song = {
            id: ele.id,
            name: ele.name,
            singer: ele.artists[0].name,
            picUrl: ele.artists[0].img1v1Url,
          };

          acur.push(song);
          return acur;
        }, []);

        this.searchList = Object.freeze(songsList);
      }
    },
    async getHotList() {
      const { code, result } = await vSearchHot();
      if (code === 200) {
        const { hots } = result;
        const list = hots.reduce((acur, item) => {
          acur.push(item.first);
          return acur;
        }, []);
        this.hotLsit = list;
      }
    },
    cancle() {
      this.searchData = '';
      this.searchList = [];
    },

    del() {
      if (this.historyList.length === 0) return;
      this.$MessageBox({
        title: '',
        content: '是否要删除全部',
      })
        .then(() => {
          this.setHistoryList([]);
          localStorage.setItem('history', JSON.stringify([]));
        })
        .catch(() => {});
    },
    play(song) {
      // console.log(song);
      // let songs = this.playList;
      const history = this.historyList;
      const id = history.indexOf(this.searchData);
      if (id > -1) {
        history.splice(id, 1);
      }
      if (history.length >= 10) {
        history.pop();
      }
      history.unshift(this.searchData);
      /**********************/
      const songs = filterList(this.playList, song);
      const index = songs.findIndex((item) => item.id === song.id);
      localStorage.setItem('history', JSON.stringify(history));
      this.setPlay(songs);
      this.setCurrrentIndex(index);
      this.setFullScreen(true);
      this.setHistoryList(history);
    },
    ...mapMutations([
      'setCurrrentIndex',
      'setPlay',
      'setFullScreen',
      'setHistoryList',
    ]),
  },
};
</script>
<style scoped lang="less">
.search-input {
  width: 100%;
  height: 28px;
  padding-left: 15px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  &::-webkit-input-placeholder {
    /* placeholder颜色  */
    color: #f1f1f1;
    /* placeholder字体大小  */
    font-size: 14px;
  }
}
.search {
  position: relative;
  background: #fbfbfb;
  padding-top: 50px;
  color: #f1f1f1;
  z-index: 9;
  .item {
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
  }
}
.name {
  font-size: 14px;
}
</style>
