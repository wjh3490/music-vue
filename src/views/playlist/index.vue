<template>
  <div class="singer-container">
    <BaseBack title="歌单广场" />
    <BaseTabs
      :navList="navList"
      @tabs="handleScroll"
      :active="active"
      @change="handleChange"
    />

    <swiper :options="swiperOptions" ref="mySwiper" v-if="navList.length > 0">
      <swiper-slide
        v-for="(item, index) in navList"
        :key="item.id"
      >
        <component :is="currentTabComponent(index)" ref="playlist"></component>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import PlayListMain from '@/components/Playlist/PlayListMain.vue';
import PlayListRecommend from '@/components/Playlist/PlayListRecommend.vue';
import { getPlaylist } from '@/api/playlist';
export default {
  name: 'Playlist',
  components: { PlayListMain, PlayListRecommend },
  data() {
    return {
      active: 0,
      navList: [],
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
    currentTabComponent() {
      return function(index) {
        if (index == 0) return 'PlayListRecommend';
        return 'PlayListMain';
      };
    },
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
  watch: {
    navList: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          this.child = this.$refs.playlist;
          this.child[0].getSingers();
        });
      },
    },
  },
  created() {
    this.getList();
  },
  methods: {
    handleChange(index) {
      const id = this.navList[index]['id'];
      this.child[this.active].getSingers(id);
    },
    async getList() {
      const { code, tags } = await getPlaylist();
      if (code == 200) this.navList = [{ name: '推荐', id: 100 }, ...tags];
    },
    handleScroll(index) {
      if (this.active == index) return;
      this.swiper.slideTo(index, 0, false);
    },
  },
};
</script>
<style scoped>
.singer-container {
  padding-top: 110px;
}
</style>
