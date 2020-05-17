<template>
  <div
    class="songList"
    :class="{ paddingB: !fullScreen && playList.length > 0 }"
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
  name: 'SongList',

  props: {
    songs: Array
  },
  // inject: {
  //   song: {
  //     default: () => {}
  //   }
  // },
  /*eslint-disable */
  // created() {
  //   console.log(this);
  // },
  // data() {
  //   return {
  //     startY: ''
  //   };
  // },

  computed: {
    ...mapGetters(['currrenSong', 'fullScreen', 'playList'])
  }
  // methods: {
  //   player(index, e) {
  //     this.$emit('player', index, e.currentTarget);
  //   }
  // }
};
</script>
<style scoped lang="less">
@base: 37.5rem;
.scroller {
  height: 100%;
}

.songList {
  border-radius: 5 / @base;
  background: #fff;
  &.paddingB {
    padding-bottom: 70 / @base;
  }
  ul {
    li {
      font-size: 0;
      padding-left: 60 / @base;
      position: relative;
      height: 55 / @base;
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
            width: 60 / @base;
            vertical-align: middle;
          }
        }
        .name {
          height: 55 / @base;
          line-height: 55 / @base;
          padding-left: 10 / @base;
          padding-right: 50 / @base;
          span {
            // vertical-align: middle;
            font-size: 14px;
          }
        }
      }
      .desc {
        border-top: 1 / @base solid #e4e4e4;
        padding: 7 / @base 0;

        &.first {
          border-top: none;
        }
        p {
          font-size: 14px;
          color: #2e3030;
          padding-right: 50 / @base;
          margin-bottom: 5 / @base;
        }
        span {
          font-size: 12px;
          color: #757575;
        }
      }
      .album {
        position: absolute;
        width: 60 / @base;
        height: 55 / @base;
        line-height: 55 / @base;
        text-align: center;
        top: 0;
        left: 0;
        font-size: 16px;
      }
    }
  }
}
</style>
