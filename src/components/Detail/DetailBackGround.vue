<template>
  <div class="singerPic" ref="singerPic">
    <div
      class="wrap"
      :style="{ backgroundImage: `url(${$route.query.singerPic})` }"
    ></div>
    <slot />
  </div>
</template>
<script>
import pull from '@/directives/pull.js';
export default {
  name: 'DetailBackGround',
  directives: {
    pull,
  },
};
</script>
<style lang="less" scoped>
.singerPic {
  height: 315px;
  width: 100vw;
  position: sticky;
  top: -265px;
  z-index: 90;
  overflow: hidden;

  color: #fff;
  .wrap {
    width: 100%;
    height: 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: auto 100%;
    transform: scale(1.5);
    transform-origin: center center;
    background-color: rgba(22, 24, 36, 0.6);
    filter: blur(30px);
    &::after {
      content: ' ';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      background-color: rgba(0, 0, 0, 0.15);
    }
  }

  h1,
  p {
    position: absolute;
    left: 15px;
  }
  h1 {
    bottom: 35px15px;
    width: 80%;
    font-weight: 500;
    font-size: 24px;
  }
  p {
    bottom: 22px15px;
    font-size: 14px;
  }
}
</style>
