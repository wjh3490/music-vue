<template>
  <div class="singerPic" ref="singerPic" v-pull>
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
@base: 37.5rem;
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
    left: 15 / @base;
  }
  h1 {
    bottom: 35 / @base;
    width: 80%;
    font-weight: 500;
    font-size: 24px;
  }
  p {
    bottom: 22 / @base;
    font-size: 14px;
  }
}
</style>
