<template>
  <div class="singer-info" :style="{ backgroundImage: `url(${info.cover})` }">
    <div class="singer-info-wrap">
      <div class="singer-info-name">{{ info.name }}</div>
      <div class="singer-info-identify" v-if="info.identifyTag">
        <img :src="info?.identify?.imageUrl" alt="" class="singer-info-figure" />
        <span class="singer-info-identifyTag">{{ info.identifyTag }}</span>
      </div>
      <p class="singer-info-desc" v-if="info.identify.imageDesc">
        {{ info.identify.imageDesc }}
      </p>
      <div class="singer-info-action">
        <span class="singer-info-btn singer-info-follow"> + 关注</span>
        <span class="singer-info-btn singer-info-twitter iconfont icon-duanxin">
          私信</span
        >
      </div>
    </div>
    <slot />
  </div>
</template>
<script>
export default {
  name: 'SingerInfo',
  props: {
    info: {
      type: Object,
    },
  },
};
</script>
<style lang="less" scoped>
.singer-info {
  position: relative;
  height: 290px;
  width: 100vw;
  z-index: 90;
  overflow: hidden;
  color: #fff;
  background-size: 100% 100%;
  border-radius: 0 0 30px 30px;
  &::after {
    content: ' ';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.15);
  }
  &-wrap {
    position: absolute;
    bottom: 20px;
    left: 30px;
    right: 30px;
    z-index: 99;
  }
  &-name {
    font-size: 20px;
    font-weight: 600;
  }
  &-identify {
    display: flex;
    align-items: center;
    margin-top: 6px;
  }
  &-identifyTag {
    font-size: 13px;
  }
  &-figure {
    width: 15px;
    height: 15px;
    margin-right: 7px;
  }
  &-desc {
    margin-top: 6px;
    color: #f0f0f0;
    font-size: 14px;
  }
  &-action {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
  }
  &-btn {
    font-size: 14px;
    padding: 5px 15px;
    border-radius: 15px;
    font-weight: 600;
  }
  &-follow {
    background-color: #fff;
    color: #000;
  }
  &-twitter {
    background: rgba(255, 255, 255, 0.3);
  }
}
</style>
