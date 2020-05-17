<template functional>
  <div class="list">
    <h3 class="list-h3">{{ props.title }}</h3>
    <slot />
  </div>
</template>

<style scoped lang="less">
.list {
  .list-h3 {
    padding: 3% 0;
    padding-left: 7/4%;
  }
}
</style>
