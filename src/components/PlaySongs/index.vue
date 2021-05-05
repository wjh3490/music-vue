<template>
  <div>
    <transition name="scale">
      <div class="playsong" v-show="visible">
        <div class="item-list">
          <div class="list-title">
            <div class="mode" style="color:#169af3">
              <i
                class="iconfont  mode-icon"
                :class="modeList[mode]['icon']"
              ></i>
              <span @click="handleMode">{{ modeList[mode]['name'] }}</span>
            </div>

            <div class="empty" @click="clearAll">
              <span>清空全部</span>
              <i class="iconfont icon-shanchu"></i>
            </div>
          </div>
          <ul ref="scrollBar" class="playsong-main">
            <li
              v-for="(item, index) in playList"
              :key="index"
              @click.stop="() => setCurrrentIndex(index)"
              ref="scrollItem"
              class="clearfix playsong-item "
            >
              <div
                class="playsong-desc-wrap  ellipsis fl"
                :class="{ 'playsong-active': item.id == currrenSong.id }"
              >
                <span
                  class="playsong-desc-name"
                  :class="{ 'playsong-active': item.id == currrenSong.id }"
                  >{{ item.name }}</span
                >

                <div class="inline-block">
                  <BasePrivilege :privilege="item.privilege" />
                </div>
                <span class="inline-block"> - </span>
                <span class="playsong-desc-artists">{{ item.artists }}</span>
              </div>
              <div class="fl playsong-byte">
                <div
                  class="audio-icon unselectable "
                  v-if="item.id == currrenSong.id"
                >
                  <template v-for="item in audioIcon">
                    <div
                      :class="{ active: !playing }"
                      class="column"
                      :style="{ animationDelay: `${item.time}s` }"
                      :key="item.time"
                    ></div>
                  </template>
                </div>
              </div>
              <i
                @click.stop="del(item)"
                style=" color: #fff"
                class="iconfont icon-shanchu fr"
              ></i>
            </li>
          </ul>
          <div class="playsong-close" @click="handleClose">
            关闭
          </div>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div class="mask" v-show="visible" @click="handleClose"></div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { scrollToSmooth } from '@/utils';
export default {
  name: 'PlaySongs',
  data() {
    return {
      modeList: [
        { icon: 'icon-iconsMusicyemianbofangmoshiRepeat', name: '顺序播放' },
        {
          icon: 'icon-danquxunhuan1',
          name: '单曲循环',
        },
        { icon: 'icon-iconsMusicyemianbofangmoshiShuffle', name: '随机播放' },
      ],
      audioIcon: [
        { time: -1.2 },
        { time: 0 },
        { time: -1.5 },
        { time: -0.9 },
        { time: -0.6 },
      ],
      index: 0,
    };
  },
  computed: {
    ...mapGetters(['playing', 'playList', 'currrenSong', 'visible', 'mode']),
  },
  mounted() {
    this.scrollBar = this.$refs.scrollBar;
    this.scrollItem = this.$refs.scrollItem;
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
      this.index++;
      if (this.index > 2) this.index = 0;
      this.setMode(this.index);
    },

    clearAll() {
      this.setlockScroll(1);
      this.$MessageBox({
        title: '',
        content: '是否要删除全部',
      })
        .then(() => {
          this.emptyList();
          this.setPlaying(false);
          this.setVisible(false);
        })
        .catch(() => {});
    },

    del(item) {
      this.delSong(item);
      if (this.playList.length === 0) {
        this.handleClose();
      }
    },
    handleClose() {
      this.setVisible(false);
    },

    ...mapMutations([
      'setCurrrentIndex',
      'setVisible',
      'setMode',
      'setlockScroll',
      'setPlaying',
    ]),
    ...mapActions(['delSong', 'emptyList']),
  },
};
</script>
<style scoped lang="less">
.inline-block {
  display: inline-block;
  vertical-align: middle;
}
.playsong {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 450px;
  width: 100vw;
  z-index: 1006 !important;
  color: rgba(225, 225, 225, 0.8);
  background-color: rgba(57, 51, 51, 0.65);

  &-main {
    overflow-y: scroll;
    height: 350px;
    width: 100%;
    padding-left: 16px;
    padding-bottom: 50px;
  }
  &-item {
    // display: flex;
    // justify-content: space-between;
    // align-items: center;
    padding: 12px 16px 12px 0;
    border-bottom: 0.5px solid rgba(225, 225, 225, 0.5);
  }
  &-desc {
    &-wrap {
      max-width: 270px;
    }
    &-name {
      font-size: 16px;
      margin-right: 4px;
      color: #fff;
      vertical-align: middle;
    }
    &-artists {
      margin-left: 2px;
      margin-right: 5px;
      vertical-align: middle;
    }
  }
  &-close {
    margin-top: 5px;
    border-top: 0.5px solid rgba(225, 225, 225, 0.8);
    color: #fff;
    font-size: 16px;
    text-align: center;
    padding-top: 10px;
  }
  &-byte {
    margin-left: 4px;
  }
  &-active {
    color: #169af3 !important;
  }
  .item-list {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    z-index: 1002;
    .list-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      line-height: 50px;
      font-size: 14px;
      border-bottom: 0.5px solid #ccc;
      overflow: hidden;
      width: 100%;
      z-index: 1002;
      color: #fff;
    }
  }
}
.audio-icon {
  position: relative;
  display: flex;
  height: 15px;
  align-items: center;
  overflow: hidden;
  .column {
    width: 2px;
    height: 100%;
    margin-left: 2px;
    background-color: #169af3;
    animation: play 0.9s linear infinite alternate;
    &.active {
      animation-play-state: paused;
    }
  }
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background: rgba(7, 17, 27, 0.2);
  z-index: 1005;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-leave-active,
.fade-enter-active {
  transition: opacity 0.2s;
}
.icon-shanchu {
  font-size: 24px;
}
</style>
