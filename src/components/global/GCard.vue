<template>
  <header class="card-header" :style="style">
    <slot name="title">
      <h3>{{ title }}</h3>
    </slot>
    <slot name="right">
      <router-link v-if="showMore" v-bind="$attrs" :to="to">
        <span>更多</span>
        <span class="iconfont icon-youjiantou"></span>
      </router-link>
    </slot>
  </header>
  <section>
    <slot />
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "GCard",
  props: {
    title: {
      type: String,
      default: "",
    },
    to: {
      type: String,
      default: "",
    },
    showMore: {
      type: Boolean,
      default: true,
    },
    style: {
      type: Object,
      default: () => {}
    }
  },
});
</script>
<style lang="less">
.card {
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.8rem 1.5rem;
    background-color: #fff;
  }
}
.icon-youjiantou {
  font-size: 12px;
}
</style>