<template>
  <div class="singerPic" ref="singerPic">
    <img :src="$route.query.singerPic" alt="" class="img" />
    <h1 class="ellipsis">{{ $route.query.name }}</h1>
    <div class="mask"></div>
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
  height: 250px;
  overflow: hidden;
  background-position: center -50px;
  background-repeat: no-repeat;
  background-size: 100% 400px;
  position: relative;
  color: #fff;
  .mask {
    top: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
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
