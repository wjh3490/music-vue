<template functional>
  <section class="home-newsong">
    <slot />
    <swiper
      :options="props.options"
      v-if="props.songs.length"
      v-show="props.activeTab == 1"
    >
      <swiper-slide
        v-for="(item, index) in props.songs"
        :key="'s' + index"
        style="width: 9.2rem"
      >
        <div class="home-newsong">
          <ul>
            <li
              @click="listeners.player(song.id)"
              class="home-newsong-item"
              v-for="song in item"
              :key="song.id"
            >
              <figure class="home-newsong-figure">
                <img v-lazy="song.picUrl" alt="" class="home-newsong-img" />
                <span
                  class="iconfont home-newsong-icon"
                  :class="props.palyStatus(song.id)"
                ></span>
              </figure>
              <div class="home-newsong-right ellipsis">
                <div class="ellipsis">
                  <span class="home-newsong-name ">{{ song.name }}</span>
                  <span> - {{ song.artists }} </span>
                </div>
                <div class="ellipsis home-newsong-album">{{ song.album }}</div>
              </div>
            </li>
          </ul>
        </div>
      </swiper-slide>
    </swiper>

    <swiper
      :options="props.options"
      v-if="props.albums.length"
      v-show="props.activeTab == 2"
    >
      <swiper-slide
        v-for="(item, index) in props.albums"
        :key="'b' + index"
        style="width: 9.2rem"
      >
        <div class="home-newsong">
          <ul>
            <li class="home-newsong-item" v-for="song in item" :key="song.id">
              <figure class="home-newsong-figure">
                <img v-lazy="song.picUrl" alt="" class="home-newsong-img" />
              </figure>
              <div class="home-newsong-right ellipsis">
                <div class="ellipsis">
                  <span class="home-newsong-name ">{{ song.name }}</span>
                  <!-- <span v-if="song.artists"> - {{ song.artists }} </span> -->
                </div>
                <div class="ellipsis home-newsong-album">
                  {{ song.artists }}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </swiper-slide>
    </swiper>

    <swiper
      :options="props.options"
      v-if="props.products.length"
      v-show="props.activeTab == 3"
    >
      <swiper-slide v-for="(item, index) in props.products" :key="'p' + index">
        <div class="home-newsong">
          <ul>
            <li class="home-newsong-item" v-for="song in item" :key="song.id">
              <figure class="home-newsong-figure">
                <img v-lazy="song.picUrl" alt="" class="home-newsong-img" />
              </figure>
              <div class="home-newsong-right ellipsis">
                <div class="ellipsis">
                  <span class="home-newsong-name ">{{ song.name }}</span>
                  <!-- <span v-if="song.artists"> - {{ song.artists }} </span> -->
                </div>
                <div class="ellipsis home-newsong-album">
                  {{ song.artists }}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </swiper-slide>
    </swiper>
  </section>
</template>

<script>
export default {
  name: 'HomeNewSong',
  props: {
    albums: {
      type: Array,
      default: () => [],
    },
    songs: {
      type: Array,
      default: () => [],
    },
    products: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Object,
      default: () => ({
        watchSlidesVisibility: true,
        centeredSlides: true,
        slidesPerView: 'auto',
      }),
    },
    activeTab: [String, Number],
    palyStatus: Function,
  },
};
</script>
<style scoped lang="less">
.home-newsong {
  &-img {
    width: 60px;
    height: 60px;
    border-radius: 6px;
  }
  &-item {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }
  &-right {
    width: 240px;
    margin-left: 10px;
    color: #999;
    font-size: 13px;
  }
  &-name {
    color: #333;
    font-size: 15px;
  }
  &-album {
    margin-top: 6px;
  }
  &-figure {
    position: relative;
  }
  &-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    color: #fff;
    font-size: 24px;
  }
}
.home-newsong /deep/ .swiper-slide {
  width: 345px !important;
}
</style>
