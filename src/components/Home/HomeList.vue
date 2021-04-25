<template functional>
  <section class="home-playlist">
    <slot />
    <main class="home-playlist-main">
      <div class="home-playlist-scroll">
        <ul class="home-playlist-wrap">
          <router-link
            :to="`/playlist/${item.id}`"
            v-for="item in props.list"
            :key="item.id"
            class="home-playlist-item"
          >
            <figure class="home-playlist-figure">
              <img
                :class="{ 'home-playlist-round': props.round }"
                v-lazy="item.picUrl"
                alt=""
                class="home-playlist-img"
              />
            </figure>
            <p class="home-playlist-name clamp">{{ item.name }}</p>
          </router-link>
        </ul>
      </div>
    </main>
  </section>
</template>
<script>
export default {
  name: 'HomeList',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    round: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="less" scoped>
.home-playlist {
  &-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 15px;
  }
  &-more {
    padding: 2px 8px;
    border-radius: 20px;
    border: 1px solid #888;
    color: #333;
  }
  &-main {
    height: 150px;
    overflow: hidden;
  }
  &-scroll {
    overflow-x: scroll;
    overflow-y: hidden;
    padding-left: 15px;
    padding-right: 5px;
    height: 160px;
  }
  &-wrap {
    white-space: nowrap;
    display: inline-block;
  }
  &-item {
    width: 110px;
    display: inline-block;
    margin-right: 10px;
    vertical-align: middle;
  }
  &-img {
    width: 110px;
    height: 110px;
    border-radius: 8px;
  }
  &-figure {
    height: 110px;
  }
  &-name {
    margin-top: 6px;
    white-space: normal;
    height: 38px;
    text-align: center;
  }
  &-round {
    border-radius: 50%;
  }
}
</style>
