<template>
  <div class="singer-container">
    <BaseTabs
      :navList="navList"
      @tabs="handleScroll"
      :active="active"
      @change="handleChange"
      ref="tabs"
    />
    <main class="singer-main">
      <swiper :options="swiperOptions" ref="mySwiper" v-if="navList.length > 0">
        <swiper-slide
          :data-id="item.targetId"
          v-for="item in navList"
          :key="item.id"
        >
          <SongsNewAlbumList ref="singer" />
        </swiper-slide>
      </swiper>
    </main>
  </div>
</template>
<script>
import SongsNewAlbumList from './SongsNewAlbumList';
export default {
  name: 'SongNewAblum',
  components: { SongsNewAlbumList },
  data() {
    return {
      active: 0,
      navList: [
        { id: 'ZH', name: '华语' },
        { id: 'EA', name: '欧美' },
        { id: 'KR', name: '韩国' },
        { id: 'JP', name: '日本' },
      ],
      swiperOptions: {
        on: {
          slideChange: () => {
            this.active = this.swiper.activeIndex;
          },
        },
        loop: false,
        watchSlidesVisibility: true,
      },
    };
  },

  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
  mounted() {
    this.singers = this.$refs.singer;
    this.singers[0].getSingers('ZH');
    this.$refs.tabs.init();
  },
  methods: {
    handleChange(index) {
      const id = this.navList[index]['id'];
      this.singers[index].getSingers(id);
    },
    handleScroll(index) {
      if (this.active == index) return;
      this.swiper.slideTo(index, 0, false);
    },
  },
};
</script>
<style scoped lang="less">
.singer {
  &-container {
    padding-top: 90px;
  }
}
</style>
