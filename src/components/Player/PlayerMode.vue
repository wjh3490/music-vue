<template>
  <div class="play-mode">
    <slot />
    <i
      class="iconfont mode-icon"
      :class="modeList[mode]['icon']"
      @click="visibleMode = !visibleMode"
    ></i>
    <transition name="slide">
      <ul v-show="visibleMode" class="mode-list">
        <li
          @click="changeMode(index)"
          class="mode-item"
          v-for="(item, index) in modeList"
          :key="item.icon"
        >
          <i
            class="iconfont  mode-icon"
            :class="[{ active: mode === index }, item.icon]"
          ></i>
          <span :class="{ active: mode === index }" class="mode-name">{{
            item.name
          }}</span>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'PlayerMode',
  data() {
    return {
      visibleMode: false,
      modeIcon: '',
      modeList: [
        { icon: 'icon-iconsMusicyemianbofangmoshiRepeat', name: '顺序播放' },
        {
          icon: 'icon-danquxunhuan1',
          name: '单曲循环',
        },
        { icon: 'icon-iconsMusicyemianbofangmoshiShuffle', name: '随机播放' },
      ],
    };
  },
  computed: {
    ...mapGetters(['mode', 'sequenceList', 'currrenSong']),
  },
  created() {},
  methods: {
    changeMode(mode) {
      this.visibleMode = false;
      if (this.mode === mode) return;
      this.setMode(mode);
    },
    ...mapMutations(['setCurrrentIndex', 'setMode', 'setPlay']),
  },
};
</script>
<style scoped lang="less">
.play-mode {
  position: relative;
  z-index: 1200;
  .mode-icon {
    font-size: 24px;
    color: #fff;
    vertical-align: middle;
    &.active {
      color: #a9a98a;
    }
  }
  .mode-list {
    position: absolute;
    left: 0;
    top: -325%;
    font-size: 12px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(20px) brightness(100%);
    .mode-item {
      width: 100px;
      .mode-name {
        vertical-align: middle;
        &.active {
          color: #a9a98a;
        }
      }
    }
  }
}
</style>
