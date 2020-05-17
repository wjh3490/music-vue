<template>
  <div class="play-mode">
    <slot />
    <transition name="slide">
      <ul v-show="showMode" class="mode-list">
        
        <li @click="$emit('changeMode', index)" class="mode-item" v-for="(modes, index) in modeList" :key="modes.icon">
          <i
            class="iconfont icon-iconsMusicyemianbofangmoshiRepeat mode-icon"
            :class="{ active: mode === index }"
          ></i>
          <span :class="{ active: mode === index }" class="mode-name"
            >{{ modes.name }}</span
          >
        </li>
       
      </ul>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
//  <li @click="$emit('changeMode', 2)" class="mode-item">
//   <i
//     class="iconfont icon-iconsMusicyemianbofangmoshiShuffle  mode-icon"
//     :class="{ active: mode === 2 }"
//   ></i>
//   <span :class="{ active: mode === 2 }" class="mode-name"
//     >随机播放</span
//   >
// </li>
// <li @click="$emit('changeMode', 1)" class="mode-item">
//   <i
//     class="iconfont icon-iconsMusicyemianbofangmoshiAlrepeatOne  mode-icon"
//     :class="{ active: mode === 1 }"
//   ></i>
//   <span :class="{ active: mode === 1 }" class="mode-name"
//     >单曲循环</span
//   >
// </li>
export default {
  name: 'Mode',
  props: {
    showMode: { type: Boolean }
  },
  data() {
    return {
      modeList: [
        { icon: 'icon-iconsMusicyemianbofangmoshiRepeat', name: '顺序播放' },
        { icon: 'icon-iconsMusicyemianbofangmoshiShuffle', name: '随机播放' },
        {
          icon: 'icon-iconsMusicyemianbofangmoshiAlrepeatOne',
          name: '单曲循环'
        }
      ]
    };
  },
  computed: {
    ...mapGetters(['mode'])
  }
};
</script>
<style scoped lang="less">
//   <ul v-show="showMode">
//                   <li @click="changeMode(0)">
//                     <i
//                       class="iconfont icon-iconsMusicyemianbofangmoshiRepeat"
//                       :class="{ active: mode === 0 }"
//                     ></i>
//                     <span :class="{ active: mode === 0 }">顺序播放</span>
//                   </li>
//                   <li @click="changeMode(2)">
//                     <i
//                       class="iconfont icon-iconsMusicyemianbofangmoshiShuffle"
//                       :class="{ active: mode === 2 }"
//                     ></i>
//                     <span :class="{ active: mode === 2 }">随机播放</span>
//                   </li>
//                   <li @click="changeMode(1)">
//                     <i
//                       class="iconfont icon-iconsMusicyemianbofangmoshiAlrepeatOne"
//                       :class="{ active: mode === 1 }"
//                     ></i>
//                     <span :class="{ active: mode === 1 }">单曲循环</span>
//                   </li>
//                 </ul>
@base: 37.5rem;
.play-mode {
  position: absolute;
  left: 35 / @base;
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
      width: 100 / @base;
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
