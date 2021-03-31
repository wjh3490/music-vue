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
      <swiper :options="swiperOptions" class="swiper" ref="mySwiper">
        <SingerList v-for="index in 4" :key="index" ref="singerList" />
      </swiper>
    </main>
  </div>
</template>
<script>
/*eslint-disable */
import 'swiper/dist/css/swiper.css';
import { swiper } from 'vue-awesome-swiper';
import SingerList from '@/components/Singer/SingerList';
export default {
  name: 'Singer',
  components: { swiper, SingerList },
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
    this.$refs.singerList[0].getSingers(1);
  },
  watch: {
    type(val) {
      this.$refs.singerList[val - 1].getSingers(val);
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
  &-main {
    padding-right: 10px;
  }
}
.swiper {
  padding-top: 15px;
  height: calc(100vh - 40px);
}
</style>
