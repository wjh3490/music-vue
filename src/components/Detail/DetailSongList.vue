<template>
  <div class="songList">
    <div class="allplay">全部播放</div>
    <ul>
      <li
        @click.stop.prevent="$emit('player', index, $event.currentTarget)"
        v-for="(item, index) in songs"
        :key="index"
      >
        <div class="out">
          <div class="desc ellipsis">
            <p
              class="ellipsis song-name"
              :class="{ active: item.id == currrenSong.id }"
            >
              {{ item.name }}
            </p>
            <span>{{ item.singer }}</span>
          </div>
          <div class="album">{{ index + 1 }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'DetailSongList',
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
.scroller {
  height: 100%;
}

.songList {
  width: 100%;
  border-radius: 20px 20px 0 0;
  background: #fff;

  ul {
    border-radius: 10px;
    // overflow: hidden;

    li {
      font-size: 0;
      padding-left: 60px;
      position: relative;
      height: 55px;
      .inner {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #f2f3f4;
        font-size: 16px;
        .img {
          height: 100%;
          img {
            height: 100%;
            width: 60px;
            vertical-align: middle;
          }
        }
        .name {
          height: 55px;
          line-height: 55px;
          padding-left: 10px;
          padding-right: 50px;
          span {
            // vertical-align: middle;
            font-size: 14px;
          }
        }
      }
      .song-name {
        font-size: 16px;
        color: #2e3030;
        padding-right: 50px;
        margin-bottom: 5px;
      }
      .desc {
        // border-top: 1px solid #e4e4e4;
        padding: 7px 0;
        .active {
          color: #169af3;
        }
        &.first {
          border-top: none;
        }

        span {
          font-size: 12px;
          color: #757575;
        }
      }
      .album {
        position: absolute;
        width: 60px;
        height: 55px;
        line-height: 55px;
        text-align: center;
        top: 0;
        left: 0;
        font-size: 16px;
      }
    }
  }
}
.allplay {
  height: 50px;
  position: sticky;
  top: 50px;
  z-index: 92;
  border-radius: 10px 10px 0 0;
  margin-top:-10px;
  background-color: #fff;
  overflow: hidden;
}
.isFixed {
  // overflow: auto;
}
</style>
