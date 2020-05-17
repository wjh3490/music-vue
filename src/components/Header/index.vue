<template functional>
  <div class="header">
    <header>
      <i class="left"></i>
      <router-link tag="p" to="/">
         MY MUSIC
      </router-link>
      <i class="right"></i>
    </header>
    <div class="search">
      <router-link tag="div" to="/search" class="inp" key="搜索">
        <span class="iconfont icon-sousuo"></span>
        <span>请输入搜索内容</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>
<style scoped lang="less">
@base: 37.5rem;
@color: #169af3;

.header {
  padding-bottom: 1px;
  font-size: 16px;
  background: @color;
  .search {
    padding: 0 20 / @base;
    .inp {
      width: 100%;
      height: 28 / @base;
      line-height: 28 / @base;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50 / @base;
      text-align: center;
      font-size: 0;
      color: #f1f1f1;
      span {
        font-size: 12px;
        display: inline-block;
        vertical-align: middle;
      }
      .icon-sousuo {
        font-size: 16px;
        margin-right: 5 / @base;
      }
    }
  }
  header {
    text-align: center;
    height: 44 / @base;
    line-height: 44 / @base;
    font-weight: 700;
    letter-spacing: 3 / @base;
    padding: 0 44 / @base;
    color: #f1f1f1;

    i {
      position: absolute;
      top: 0;
      width: 44 / @base;
      height: 44 / @base;
      &.left {
        left: 0;
      }
      &.right {
        right: 0;
      }
    }
  }
}
</style>
