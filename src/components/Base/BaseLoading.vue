<template>
  <ul class="base-loading">
    <li v-for="v in 5" :key="v" :style="`--line-index: ${v}`"></li>
  </ul>
</template>
<script>
export default {
  name: 'BaseLoading',
};
</script>
<style lang="less">
.base-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  li {
    --time: calc((var(--line-index) - 1) * 200ms);
    border-radius: 3px;
    width: 3px;
    height: 20px;
    background-color: #f66;
    animation: beat 0.8s ease-in-out var(--time) infinite;
    & + li {
      margin-left: 3px;
    }
  }
}
@keyframes beat {
  0%,
  100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0.5);
  }
}
</style>
