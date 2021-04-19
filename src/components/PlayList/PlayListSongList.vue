<template>
  <div class="songList">
    <!-- <div class="allplay">
      <div class="allplay-left">
        <span class="iconfont icon-bofang allplay-icon"></span>
        <span class="allplay-btn">全部播放</span>
        <span class="allplay-length">({{ songs.length }})</span>
      </div>
      <span class="iconfont icon-xiazai allplay-right"></span>
    </div> -->

    <main class="songlist-main">
      <ul class="songlist-wrap">
        <li
          class="songlist-item"
          @click.stop.prevent="$emit('player', index, $event.currentTarget)"
          v-for="(item, index) in songs"
          :key="item.id"
          :class="{ active: item.id == currrenSong.id }"
        >
          <div
            class="songlist-index"
            :class="{ active: item.id == currrenSong.id }"
          >
            {{ index + 1 }}
          </div>
          <div class="songlist-name ">
            <div
              class="ellipsis songlist-title"
              :class="{ active: item.id == currrenSong.id }"
            >
              <span>
                {{ item.name }}
              </span>

              <span style="color:#a59797f5" v-if="item.alia">
                ({{ item.alia }})</span
              >
            </div>
            <div
              class="songlist-album"
              :class="{ active: item.id == currrenSong.id }"
            >
              <div class="songlist-album-icons">
                <!-- sq -->
                <span
                  v-if="item.privilege.maxbr === 999000"
                  class="iconsq icon sq"
                  >SQ</span
                >
                <!-- 独家 -->
                <span
                  v-if="/64|68|1088|1092/.test(item.privilege.flag)"
                  class="icon only"
                  >独家</span
                >
                <!-- vip -->
                <span v-if="item.privilege.fee === 1" class="icon vip"
                  >vip</span
                >
                <!-- 试听 -->
                <span
                  v-if="/1152|1028|1088|1092/.test(item.privilege.flag)"
                  class="icon listen"
                  >试听</span
                >
              </div>
              <div class="ellipsis songlist-content">
                <span>{{ item.singer }}</span> · <span>{{ item.album }}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'PlaylistSongList',
  props: {
    songs: Array,
  },
  data() {
    return {
      showText: false,
    };
  },
  computed: {
    ...mapGetters(['currrenSong', 'fullScreen', 'playList']),
  },
};
</script>
<style scoped lang="less">
.songlist {
  &-item {
    position: relative;
    display: flex;
    align-items: center;
    margin: 10px 0;
    &.active {
      &::after {
        position: absolute;
        left: 0;
        content: '';
        height: 100%;
        width: 4px;
        border-radius: 4px;
        background-color: #169af3;
      }
    }
  }

  &-wrap {
    padding-bottom: 60px;
  }
  &-index {
    font-size: 16px;
    width: 50px;
    text-align: center;
    &.active {
      color: #169af3;
    }
  }
  &-title {
    width: 260px;
    font-size: 18px;
    // color: #a59797f5;
    &.active {
      color: #169af3;
    }
  }
  &-content {
    width: 260px;
  }
  &-album {
    margin-top: 6px;
    color: #a59797f5;
    display: flex;
    align-items: center;
    &.active {
      color: #169af3;
    }
    &-icons {
      display: flex;
    }
  }
}
.allplay {
  height: 50px;
  position: sticky;
  top: 50px;
  z-index: 92;
  overflow: hidden;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  &-left {
    display: flex;
    align-items: center;
  }
  &-icon {
    font-size: 28px;
    color: #169af3;
  }
  &-btn {
    margin: 0 6px;
    font-size: 15px;
    font-weight: 300;
  }
  &-length {
    font-weight: 300;
  }
  &-right {
    font-size: 22px;
    color: #9a9696;
  }
}
.icon {
  border: 1px solid #169af3;
  border-radius: 3px;
  color: #169af3;
  transform: scale(0.7);
  width: 28px;
  height: 17px;
  line-height: 15px;
  text-align: center;
  margin-left: -3px;
}
.iconsq {
  border: 1px solid #f3cd16;
  color: #f3cd16;
}
</style>
