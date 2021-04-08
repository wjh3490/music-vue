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

    <BaseSwiper
      ref="mySwiper"
      :options="swiperOptions"
      :list="navList"
      v-slot="{ index, data }"
    >
      <component
        :is="currentTabComponent(index)"
        ref="playlist"
        :id="data.id"
      ></component>
    </BaseSwiper>
  </div>
</template>
<script>
/*eslint-disable */
import PlayList from '@/components/Playlist/PlayList';
import PlayListRecommend from '@/components/Playlist/PlayListRecommend';
import { getPlaylist, getPlaylistDetail } from '@/api/playlist';
import { scrollToEase } from '@/utils';
export default {
  name: 'Playlist',
  components: { PlayList, PlayListRecommend },
  data() {
    return {
      type: 0,
      active: 100,
      dis: 30,
      navList: [],
      swiperOptions: {
        on: {
          slideChange: () => {
            this.type = this.swiper.activeIndex;
            this.active = this.child[this.type].$children[0]['id'];
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
        return 'PlayList';
      };
    },
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
  watch: {
    active(val) {
      this.child[this.type].$children[0].getSingers(val);
      this.adjust();
    },
    navList: {
      deep: true,
      handler(val) {
        this.$nextTick(() => {
          this.child = this.$refs.mySwiper.swiperSlide;
          this.child[0].$children[0].getSingers();
        });
      },
    },
  },
  created() {
    this.getList();
  },
  methods: {
    handleChange(index) {
      if (this.type == index) return;
      this.swiper.slideTo(index - 1, 0, false);
    },
    async getList() {
      const { code, tags } = await getPlaylist();
      if (code == 200) this.navList = [{ name: '推荐', id: 100 }, ...tags];
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
        this.time = setTimeout(() => {
          scrollToEase(
            this.$refs.scrollbar,
            this.$refs.scrollbar.scrollLeft,
            translate,
            'scrollLeft',
            300
          );
        }, 200);
        this.$once('beforeDestory', () => clearInterval(this.time));
      });
    },
    handleScroll(tag, index) {
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
    margin-top: 20px;
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
    }
  }
}
</style>
