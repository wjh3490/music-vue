<template>
  <div class="playlist">
    <div class="mask" @click.prevent="$emit('update:visiblePlayList', false)"></div>
    <div class="item-list">
      <div class="playlist-mask"></div>
      <div class="list-title">
        <div class="mode">  
           <i
            class="iconfont  mode-icon"
            :class="swichMode.icon"
          ></i>
           <span @click="handleMode">{{  swichMode.text }}</span>
        </div>
       
        <div class="empty fr" @click="clearAll">
          <span>清空全部</span>
          <i class="iconfont icon-shanchu"></i>
        </div>
      </div>
      <ul ref="scrollSong" class="playlist-main">
        <li
          v-for="(item, index) in playList"
          :key="index"
          @click="() => setCurrrentIndex(index)"
          class="ellipsis"
          ref="songItem"
        >
          <div class="pic">
            <template v-if="item.id === currrenSong.id">
              <img v-lazy="currrenSong.picUrl" />
            </template>

            <template v-else>
              <span class="play-index"> {{ index + 1 }} </span>
            </template>
          </div>
          <div class="name" :class="{ fontActive: item.id === currrenSong.id }">
            <p class="ellipsis">{{ item.name }}</p>
            <span :class="{ fontActive: item.id === currrenSong.id }">{{
              item.singer
            }}</span>
          </div>
          <div class="del" @click.stop="del(item)">
            <i class="iconfont icon-shanchu"></i>
          </div>

          
        </li>
      </ul>
     
    </div>
  </div>
</template>

<script>
/** eslint-disable */
//  <div class="close" @click.prevent="$emit('update:playShow', false)">
//   关闭
// </div>
/*eslint-disable */
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { shuffle } from '../../utils/index.js';
import { playMode } from '../../utils/config.js';
export default {
  name: 'PlayList',
  props: {
    swichMode: {
      type: [Object, String]
    }
  },
  data() {
    return {
      mode: 0
    };
  },
  computed: {
    ...mapGetters(['playList', 'currrenSong'])
  },
  methods: {
    handleMode() {
      this.mode++;
      if (this.mode > 2) {
        this.mode = 0;
      }
      this.$emit('changeMode', this.mode);
    },

    clearAll() {
      this.$MessageBox({
        title: '',
        content: '是否要删除全部'
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

    // play(index) {
    //   this.setCurrrentIndex(index);
    // },
    ...mapMutations(['setCurrrentIndex']),
    ...mapActions(['delSong', 'emptyList'])
  }
};
</script>
<style scoped lang="less">
@import './index.less';
</style>
