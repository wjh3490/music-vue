<template>
  <div class="playlist">
    <div
      class="mask"
      @click.prevent="$emit('update:visiblePlayList', false)"
    ></div>
    <div class="item-list">
      <div class="playlist-mask"></div>
      <div class="list-title">
        <div class="mode" style="color:#169af3">
          <i class="iconfont  mode-icon" :class="swichMode.icon"></i>
          <span @click="handleMode">{{ swichMode.text }}</span>
        </div>

        <div class="empty" @click="clearAll">
          <span>清空全部</span>
          <i class="iconfont icon-shanchu"></i>
        </div>
      </div>
      <ul ref="scrollBar" class="playlist-main">
        <li
          v-for="(item, index) in playList"
          :key="index"
          @click.stop="() => setCurrrentIndex(index)"
          class="ellipsis"
          ref="scrollItem"
        >
          <div class="pic">
            <template v-if="item.id === currrenSong.id">
              <img v-lazy="currrenSong.picUrl" />
            </template>

            <template v-else>
              <span style="color: #fff" class="play-index">
                {{ index + 1 }}
              </span>
            </template>
          </div>
          <div class="name ellipsis" :class="{ fontActive: item.id === currrenSong.id }">
            <p class="ellipsis">{{ item.name }}</p>
            <span :class="{ fontActive: item.id === currrenSong.id }">{{
              item.singer
            }}</span>
          </div>
          <i
            @click.stop="del(item)"
            style=" color: #fff"
            class="iconfont icon-shanchu"
          ></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
/*eslint-disable */
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { shuffle, scrollToSmooth } from '../../utils/index.js';
import { playMode } from '../../utils/config.js';
export default {
  name: 'PlayerList',
  props: {
    swichMode: {
      type: [Object, String],
    },
  },
  data() {
    return {
      mode: 0,
    };
  },
  computed: {
    ...mapGetters(['playList', 'currrenSong']),
  },
  mounted() {
    this.scrollBar = this.$refs.scrollBar;
    this.scrollItem = this.$refs.scrollItem;
  },
   updated() {
    // console.log('PlayerList')
  },
  methods: {
    getActiveItemDistancce() {
      this.$nextTick(() => {
        let index = this.playList.findIndex(
          (item) => item.id === this.currrenSong.id
        );

        let to =
          this.scrollItem[index].offsetTop -
          (this.scrollBar.offsetHeight - this.scrollItem[index].offsetHeight) /
            2;
        scrollToSmooth(this.scrollBar, to);
      });
    },
    handleMode() {
      this.mode++;
      if (this.mode > 2) this.mode = 0;
      this.$emit('changeMode', this.mode);
    },

    clearAll() {
      this.$MessageBox({
        title: '',
        content: '是否要删除全部',
      })
        .then(() => {
          this.emptyList();
          this.$emit('update:visiblePlayList', false);
          this.$emit('stopPlay');
        })
        .catch(() => {});
    },

    del(item) {
      this.delSong(item);
      if (this.playList.length === 0) {
        this.$emit('update:visiblePlayList', false);
        this.$emit('stopPlay');
      }
    },

    ...mapMutations(['setCurrrentIndex']),
    ...mapActions(['delSong', 'emptyList']),
  },
};
</script>
<style scoped lang="less">
.playlist {
  position: fixed;
  bottom: 0;
  left: 0;
  top: 0;
  right: 0;
  i {
    font-size: 24px;
  }
  z-index: 1001;
  &.slide1-enter,
  &.slide1-leave-to {
    .item-list {
      transform: translate3d(0, 100%, 0);
      opacity: 1;
    }
    .mask {
      opacity: 1;
    }
  }
  &.slide1-leave-active,
  &.slide1-enter-active {
    transition: opacity 0.3s;
    .item-list {
      transition: transform 0.3s;
    }
    .mask {
      transition: opacity 0.3s;
    }
  }
  .mask {
    position: fixed;
    bottom: 0;
    left: 0;
    top: 0;
    right: 0;
    z-index: 1001;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .item-list {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 449px;
    background-color: rgba(95, 95, 95, 0.8);
    z-index: 1002;
    .list-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      line-height: 50px;
      font-size: 14px;
      border-bottom: 1px solid #ccc;
      overflow: hidden;
      width: 100%;
      z-index: 1002;
      color: #fff;
    }
  }
  .playlist-main {
    overflow-y: scroll;
    height: 100%;
    width: 100%;
    padding-bottom: 50px;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px 0 14px;
      border-bottom: 1px solid #ccc;
      height: 50px;
      &:last-child {
        border-bottom: none;
      }
      .pic {
        line-height: 40px;
        width: 40px;
        height: 40px;
        text-align: center;
      }
      img {
        height: 100%;
          width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
      }
      .name {
        flex: 1;
        color: #fff;
        margin-left: 30px;
        margin-right: 20px;
        &.fontActive {
          color: #169af3;
        }
        p {
          font-size: 14px;
          margin-bottom: 2px;
        }
        span {
          color: #888;
          &.fontActive {
            color: #169af3;
          }
        }
      }
    }
  }
}
</style>
