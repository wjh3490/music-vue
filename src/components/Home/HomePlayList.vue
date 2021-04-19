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
              <img v-lazy="item.picUrl" alt="" class="home-playlist-img" />
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
  name: 'HomePlayList',
  props: {
    list: {
      type: Array,
      default: () => [],
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
    height: 142px;
    overflow: hidden;
  }
  &-scroll {
    overflow-x: scroll;
    margin-left: 15px;
    height: 150px;
  }
  &-wrap {
    display: flex;
    white-space: nowrap;
  }
  &-item {
    width: 110px;
    margin-right: 10px;
  }
  &-img {
    width: 110px;
    height: 110px;
    border-radius: 8px;
  }
  &-name {
    white-space: normal;
  }
}
</style>
