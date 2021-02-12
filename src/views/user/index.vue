<template>
  <div class="user">
    <BaseNav />
    <div class="title clearfix">
      <div class="left fl" @click="flag = false">
        <i class="iconfont icon-shoucang1 user-icon"></i>
        <span :class="{ fontColor: !flag }" class="user-name">我的收藏</span>
      </div>
      <div class="right fr" @click="flag = true">
        <i class="iconfont icon-zuijinbofang user-icon"></i>
        <span :class="{ fontColor: flag }" class="user-name">最近播放</span>
      </div>
    </div>
    <div>
      <ul class="user-list">
        <li
          v-for="(item, index) in list"
          :key="index"
          @click="play(item, index)"
          class="user-item"
        >
          <p class="name ellipsis">{{ item.name }}</p>
          <p class="singer ellipsis">{{ item.singer }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { filterList } from '@/utils/index.js';
export default {
  name: 'User',
  data() {
    return {
      list: [],
      flag: false,
    };
  },
  computed: {
    ...mapGetters(['likeList', 'playHistory', 'playList']),
  },
  watch: {
    flag: {
      handler(val) {
        let list;
        list = val ? [...this.playHistory] : [...this.likeList];
        this.list = Object.freeze(list);
      },
      immediate: true,
    },
  },

  methods: {
    play(song) {
      let songs = this.playList;
      songs = filterList(songs, song);
      let index = songs.findIndex((item) => item.id === song.id);
      this.setPlay(songs);
      this.setCurrrentIndex(index);
      this.setFullScreen(true);
    },
    ...mapMutations(['setCurrrentIndex', 'setPlay', 'setFullScreen']),
  },
};
</script>
<style scoped lang="less">
@base: 37.5rem;
.user {
  background-color: #fff;
  .title {
    border-bottom: 1px solid #e4e4e4;
    .left {
      border-right: 1px solid #e4e4e4;
    }
    .left,
    .right {
      width: 50%;
      text-align: center;
      height: 40 / @base;
      line-height: 40 / @base;
      font-size: 0;
      .user-name {
        display: inline-block;
        margin-left: 7 / @base;
        font-size: 16px;
        vertical-align: middle;
        color: #1a1a1a;
        &.fontColor {
          color: #169af3;
        }
      }
      .user-icon {
        color: #169af3;
        font-weight: 700;
        vertical-align: middle;
      }
    }
  }

  .user-list {
    padding: 0 30 / @base;
    .user-item {
      height: 50 / @base;
      color: #2e3030;
      padding-top: 5 / @base;
      border-bottom: 1 / @base solid #e4e4e4;
      .name {
        font-size: 16px;
      }
      .singer {
        font-size: 12px;
        color: #757575;
      }
    }
  }
}
</style>
