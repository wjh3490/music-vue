<template>
  <div class="play-mode">
    <slot />
    <i
      class="iconfont mode-icon"
      :class="swichMode"
      @click="visibleMode = !visibleMode"
    ></i>
    <transition name="slide">
      <ul v-show="visibleMode" class="mode-list">
        <li
          @click="handleMode(index)"
          class="mode-item"
          v-for="(item, index) in modeList"
          :key="item.icon"
        >
          <i
            class="iconfont icon-iconsMusicyemianbofangmoshiRepeat mode-icon"
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
import { mapGetters } from 'vuex';
export default {
  name: 'PlayerMode',
  props: {
    // visibleMode: { type: Boolean },
    swichMode: { type: String },
  },
  updated() {
    console.log('PlayerMode');
  },
  data() {
    return {
      visibleMode: false,
      modeList: [
        { icon: 'icon-iconsMusicyemianbofangmoshiRepeat', name: '顺序播放' },
        {
          icon: 'icon-iconsMusicyemianbofangmoshiAlrepeatOne',
          name: '单曲循环',
        },
        { icon: 'icon-iconsMusicyemianbofangmoshiShuffle', name: '随机播放' },
      ],
    };
  },
  methods: {
    handleMode(index) {
      this.visibleMode = false;
      this.$emit('changeMode', index);
     
    },
  },
  computed: {
    ...mapGetters(['mode']),
  },
};
</script>
<style scoped lang="less">
.play-mode {
  position: absolute;
  left: 35px;
  top: 50%;
  font-size: 0;
  transform: translateY(-50%);
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
