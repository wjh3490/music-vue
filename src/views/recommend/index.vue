<template>
  <div class="recommend" :class="{ padding: playList.length > 0 }">
    <div class="slide">
      <Swiper :swiperList="swiperList" :swiperOptions="swiperOptions" />
    </div>
    <div class="personalized">
      <list title="热门推荐">
        <ul class="recommend-list">
          <li
            v-for="(item, index) in personalized"
            :key="index"
            @click.stop="pushDetails(item)"
            class="recommend-item"
          >
            <div class="pic">
              <img v-lazy="item.picUrl" alt />
              <div class="bottom">
                <span class="num">{{ item.playCount | filterNum }}在听</span>
              </div>
            </div>
            <p class="recommend-name">{{ item.name }}</p>
          </li>
        </ul>
      </list>
    </div>
    <div class="newsongs">
      <list title="新碟上架">
        <ul class="recommend-list">
          <li
            v-for="(item, index) in newsong"
            :key="index"
            @click.stop="playSong(index)"
            class="recommend-item"
          >
            <div class="pic">
              <img v-lazy="item.picUrl" alt />
            </div>
            <p class="desc recommend-name">{{ item.name }}</p>
            <p class="recommend-name">{{ item.singer }}</p>
          </li>
        </ul>
      </list>
    </div>
  </div>
</template>

<script>
/*eslint-disable */
import Swiper from './components/Swiper';
import List from './components/List';
import { mapMutations, mapGetters } from 'vuex';
import {
  vGetPersonalized,
  vGetNewsong,
  vGetBanner,
  vGetDetail
} from '../../api/recomment.js';
export default {
  name: 'Recommend',
  components: { Swiper, List },
  filters: {
    filterNum(val) {
      let num;
      if (val >= 10000) {
        num = `${(val / 10000).toFixed(1)}万`;
      }
      if (val >= 100000000) {
        num = `${(val / 100000000).toFixed(1)}亿`;
      }
      return num;
    }
  },

  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination'
        },
        on: {
          click: e => {
            this.getDetail(e.target.offsetParent.dataset.id);
          }
        },
        loop: true,
        autoplay: {
          delay: 2000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        watchSlidesVisibility: true, // 解决了swiper前面的一个不能提前加载的bug
        lazy: {
          preloaderClass: 'my-lazy-preloader'
        }, // 懒加载开启
        // observer: true,
        // observeParents: true,
        slidesPerView: 'auto',
        centeredSlides: true
      },

      swiperList: [],
      personalized: [],
      newsong: []
    };
  },

  computed: {
    ...mapGetters(['playList'])
  },

  created() {
    this.getSwiperList();
    this.getPersonalized();
    this.getNewsong();
  },
  /*eslint-disable */
  methods: {
    playSong(index) {
      this.setPlay(this.newsong);
      this.setSequenceList(this.newsong);
      this.setCurrrentIndex(index);
      // this.setFullScreen(true)
    },

    async getSwiperList() {
      const { code, banners } = await vGetBanner();

      if (code === 200) {
        this.swiperList = banners;
      }
    },
    async getPersonalized() {
      const { code, result } = await vGetPersonalized();
      if (code === 200) {
        this.personalized = result.splice(0, 15);
      }
    },
    async getNewsong() {
      const { code, result } = await vGetNewsong();
      if (code === 200) {
        result.forEach(item => {
          const song = {
            id: item.id,
            name: item.name,
            picUrl: item.song.album.picUrl,
            singer: item.song.artists[0].name
          };

          this.newsong.push(song);
        });

        this.newsong = this.newsong.splice(0, 9);
      }
    },
    async getDetail(id) {
      const { songs } = await vGetDetail(id);
      if (!songs.length) {
        return;
      }
      const song = {
        id: songs[0].id,
        name: songs[0].name,
        picUrl: songs[0].al.picUrl,
        singer: songs[0].ar[0].name
      };
      let index = this.newsong.findIndex(item => item.id === song.id);
      
      if (index >= 0) {
        this.playSong(index);
      } else {
        this.newsong.unshift(song);
        this.playSong(0);
      }
    },

    pushDetails(singer) {
      const _singer = {
        id: singer.id,
        singerPic: singer.picUrl,
        name: singer.name
      };

      this.setSinger(_singer);
      this.$router.push(
        `/details/${singer.id}?singerPic=${singer.picUrl}&name=${singer.name}&componentName=RecommendDetail`
      );
    },
    ...mapMutations([
      'setCurrrentIndex',
      'setPlay',
      'setFullScreen',
      'setSequenceList',
      'setSinger'
    ])
  }
};
</script>
<style scoped lang="less">
@base: 37.5rem;
@color: #169af3;
.recommend {
  font-size: 12px;
  &.padding {
    padding-bottom: 70 / @base;
  }
}
.slide {
  background: @color;
}

.commonCss() {
  .recommend-list {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    .recommend-item {
      width: 31%;
      height: 100%;
      padding: 7/4% 0;
      border-radius: 6 / @base;
      .recommend-name {
        margin-top: 5 / @base;
      }
    }
  }
}
.personalized {
  .commonCss();
  .pic {
    position: relative;
    .bottom {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 22 / @base;
      line-height: 22 / @base;
      background: rgba(0, 0, 0, 0.5);
      color: #ccc;
      text-align: center;
    }
  }
}

.newsongs {
  .desc {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .commonCss();
}
</style>
