<template functional>
  <div class="header-search">
    <router-link tag="div" to="/search" class="header-link" key="搜索">
      <span class="iconfont icon-sousuo header-icon"></span>
      <span>请输入搜索内容</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Header',
};
</script>
<style scoped lang="less">
@color: #169af3;
.header {
  &-link {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px 0;
    margin-top: 20px;
    background: #f2f4f5;
    border-radius: 50px;
    text-align: center;
    color: #b7b3b3;
  }
  &-search {
    padding: 0 20px;
    font-size: 16px;
  }
  &-icon {
    font-size: 18px;
  }
}
</style>
