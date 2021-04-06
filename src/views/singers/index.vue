<template>
  <div class="singer-container">
    <BaseBack title="歌手榜" />
    <nav class="singer-nav">
      <div class="singer-nav-wrap">
        <span
          v-for="item in navList"
          :key="item.item"
          @click="handleChange(item.id)"
          :class="{ active: type == item.id }"
          class="singer-nav-item"
          >{{ item.name }}</span
        >
      </div>
      <div
        class="singer-nav-line"
        :style="{ transform: `translate3d(${(this.type - 1) * 100}%,0,0)` }"
      ></div>
    </nav>
    <main class="singer-main">
      <BaseSwiper :options="swiperOptions" ref="mySwiper" :list="navList">
        <SingerList ref="singerList" />
      </BaseSwiper>
    </main>
  </div>
</template>
<script>
/*eslint-disable */
import SingerList from '@/components/Singer/SingerList';
export default {
  name: 'Singer',
  components: { SingerList },
  data() {
    return {
      type: 1,
      navList: [
        { id: 1, name: '华语' },
        { id: 2, name: '欧美' },
        { id: 3, name: '韩国' },
        { id: 4, name: '日本' },
      ],
      swiperOptions: {
        on: {
          slideChange: () => {
            this.type = this.swiper.activeIndex + 1;
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
    this.child = this.$refs.mySwiper.swiperSlide;
    this.child[0].$children[0].getSingers(1);
  },

  watch: {
    type(val) {
      this.child[val - 1].$children[0].getSingers(val);
    },
  },
  methods: {
    handleChange(index) {
      if (this.type == index) return;
      this.swiper.slideTo(index - 1, 0, false);
    },
  },
};
</script>
<style scoped lang="less">
.singer {
  &-container {
    padding-top: 90px;
  }
  &-nav {
    width: 100%;
    position: fixed;
    top: 50px;
    font-size: 16px;
    background-color: #fff;
    z-index: 99;
    &-wrap {
      height: 40px;
      display: flex;

      align-items: center;
    }
    &-item {
      flex: 1;
      text-align: center;
      font-weight: 600;
      &.active {
        color: #169af3;
      }
    }
    &-line {
      width: 25%;
      text-align: center;
      height: 3px;
      transition: all 0.3s;
      &::after {
        content: '';
        display: block;
        height: 100%;
        width: 30px;
        margin: 0 auto;
        background-color: #169af3;
        border-radius: 3px;
      }
    }
  }
 
}
</style>
