<template>
  <div class="singer-container">
    <BaseBack title="歌单广场" />
    <nav class="singer-nav">
      <div class="singer-hidden" ref="scrollbar">
        <ul class="singer-nav-wrap" ref="scrollItem">
          <li
            v-for="(item, index) in navList"
            :key="item.id"
            @click="handleScroll(item.id, index)"
            :class="{ active: type == index }"
            class="singer-nav-item"
            ref="li"
          >
            {{ item.name }}
          </li>
        </ul>
        <div
          class="singer-nav-line"
          :style="{ transform: `translateX(${dis}px) translateX(-50%)` }"
        ></div>
      </div>
    </nav>
    <!-- <de></de> -->
    <main class="singer-main">
      <swiper :options="swiperOptions" class="swiper" ref="mySwiper">
        <template v-for="(item, index) in navList">
          <component
            :is="currentTabComponent(index)"
            :key="'s' + item.id"
            ref="singerList"
            :id="item.id"
          ></component>
        </template>
      </swiper>
    </main>
  </div>
</template>
<script>
/*eslint-disable */
import 'swiper/dist/css/swiper.css';
import { swiper } from 'vue-awesome-swiper';
import SingerList from '@/components/PlayList/SingerList';
import PlayListRecommend from '@/components/PlayList/PlayListRecommend';
import { getPlaylist, getPlaylistDetail } from '@/api/playlist';
import { scrollToEase } from '@/utils';
export default {
  name: 'Playlist',
  components: { PlayListRecommend, swiper, SingerList },
  data() {
    return {
      type: 0,
      active: 100,
      dis: 30,
      navList: [],
      swiperOptions: {
        on: {
          slideChange: (swiper) => {
            this.type = this.swiper.activeIndex;
            this.active = this.$refs.singerList[this.type].id;
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
        if (index == 0) {
          return 'PlayListRecommend';
        } else {
          return 'SingerList';
        }
      };
    },
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
  mounted() {
    this.getList();
  },
  watch: {
    type(val) {
      const id = this.navList[val].id;
      this.$refs.singerList[val].getSingers(id);
    },
    active() {
      this.adjust();
    },
  },
  methods: {
    handleChange(index) {
      if (this.type == index) return;
      this.swiper.slideTo(index - 1, 0, false);
    },
    async getList() {
      const { code, tags } = await getPlaylist();
      if (code == 200) this.navList = [{ name: '推荐', id: 100 }, ...tags];
      const id = tags[0].id;
      this.$nextTick(() => this.$refs.singerList[0].getSingers(id));
    },

    adjust() {
      this.$nextTick(() => {
        this.dis =
          this.$refs.li[this.type].offsetLeft +
          this.$refs.li[this.type].offsetWidth / 2;
        const active = this.active;
        const viewportSize = this.$refs.scrollbar.clientWidth;
        const itemsEle = this.$refs.scrollItem;

        const scrollerSize = itemsEle.clientWidth;
        const maxTranslate = scrollerSize - viewportSize;
        const middleTranslate = viewportSize / 2;

        const items = itemsEle.children;

        let size = 0;
        this.navList.every((label, index) => {
          if (label.id === active) {
            size += items[index]['clientWidth'] / 2;
            return false;
          }

          size += items[index]['clientWidth'];
          return true;
        });

        let translate = size - middleTranslate;
        translate = Math.min(maxTranslate, Math.max(0, translate));
        this.translate = translate;
        scrollToEase(
          this.$refs.scrollbar,
          this.$refs.scrollbar.scrollLeft,
          translate,
          'scrollLeft',
          1000
        );
        // this.$refs.scrollbar.scrollTo({
        //   left: translate,
        //   behavior: 'smooth',
        // });
      });
    },
    handleScroll(tag, index) {
      console.log(tag, index);
      this.active = tag;
      if (this.type == index) return;
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
  &-hidden {
    position: relative;
    overflow-x: auto;
    height: 52px;
    width: 100%;
  }
  &-nav {
    width: 100%;
    position: fixed;
    top: 50px;
    font-size: 16px;
    background-color: #fff;
    z-index: 99;
    overflow: hidden;
    height: 44px;
    line-height: 44px;

    &-wrap {
      height: 40px;
      display: inline-block;
      white-space: nowrap;
      word-break: break-all;
    }
    &-item {
      display: inline-block;
      font-weight: 600;
      padding: 0 15px;

      &.active {
        color: #169af3;
      }
    }
    &-line {
      position: absolute;
      bottom: 10px;
      text-align: center;
      height: 3px;
      transition: all 0.2s;
      width: 30px;
      background-color: #169af3;
      border-radius: 4px;
      // &::after {
      //   content: '';
      //   display: block;
      //   height: 100%;

      //   width: 30px;
      //   margin: 0 auto;
      //   background-color: #169af3;
      //   border-radius: 3px;
      // }
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
