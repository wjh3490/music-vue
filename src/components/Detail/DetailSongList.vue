<template>
  <div
    class="songList"
  >
    <ul>
      <li
        @click.stop.prevent="$emit('player', index, $event.currentTarget)"
        v-for="(item, index) in songs"
        :key="index"
      >
        <template v-if="item.id === currrenSong.id">
          <div class="inner">
            <div class="img fl">
              <img v-lazy="item.picUrl" alt />
            </div>
            <div class="name ellipsis">
              <span>{{ item.name }}</span>
              <span>--</span>
              <span>{{ item.singer }}</span>
            </div>
          </div>
        </template>

        <template v-else>
          <div class="out">
            <div class="desc ellipsis" :class="{ first: index === 0 }">
              <p class="ellipsis">{{ item.name }}</p>
              <span>{{ item.singer }}</span>
            </div>
            <div class="album">{{ index + 1 }}</div>
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'DetailSongList',
  props: {
    songs: Array
  },
  computed: {
    ...mapGetters(['currrenSong', 'fullScreen', 'playList'])
  }
};
</script>
<style scoped lang="less">
.scroller {
  height: 100%;
}

.songList {
  border-radius: 5px;
  background: #fff;
 
  ul {
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
      .desc {
        border-top: 1px solid #e4e4e4;
        padding: 7px 0;

        &.first {
          border-top: none;
        }
        p {
          font-size: 14px;
          color: #2e3030;
          padding-right: 50px;
          margin-bottom: 5px;
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
</style>
