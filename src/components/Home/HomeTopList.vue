<template functional>
  <section class="home-toplist">
    <slot />
    <swiper :options="props.options" v-if="props.list.length">
      <swiper-slide v-for="(item, index) in props.list" :key="item.id" style="width: 9.2rem">
        <router-link
          :to="`/playlist/${item.id}`"
          tag="div"
          class="home-toplist-main"
          :style="{ backgroundColor: props.colors[index] }"
        >
          <img v-lazy="item.coverImgUrl" alt="" class="home-toplist-figure" />
          <div class="home-toplist-songs">
            <div class="home-toplist-title">
              <b class="home-toplist-name">{{ item.name }}</b> _
              {{ item.updateFrequency }}
            </div>
            <div class=" home-toplist-song-wrap">
              <div
                class="ellipsis home-toplist-song"
                v-for="(track, index) in item.tracks"
                :key="track.first"
              >
                <span class="home-toplist-song-rank"
                  ><b>0{{ index + 1 }}&nbsp;&nbsp; </b></span
                >
                <span class="home-toplist-song-name">{{ track.first }}</span>
                -
                <span class="home-toplist-song=artist">{{ track.second }}</span>
              </div>
            </div>
          </div>
        </router-link>
      </swiper-slide>
    </swiper>
  </section>
</template>

<script>
export default {
  name: 'HomeTopList',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Object,
      default: () => ({
        watchSlidesVisibility: true,
        slidesPerView: 'auto',
        centeredSlides: true,
      }),
    },
    colors: {
      type: Object,
      default: () => ({
        0: '#e6eaf1',
        1: '#eff1f1',
        2: '#ebe6e7',
        3: '#faefee',
      }),
    },
  },
};
</script>
<style scoped lang="less">
.home-toplist {
  &-main {
    display: flex;
    border-radius: 8px;
    overflow: hidden;
    background: #faefee;
    margin-right: 10px;
  }
  &-name {
    font-size: 15px;
  }
  &-title {
    margin-bottom: 6px;
  }
  &-songs {
    padding: 10px 0;
    padding-right: 30px;
    padding-left: 10px;
    width: 220px;
  }
  &-song {
    font-size: 14px;
    &-wrap {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 60px;
    }
  }
  &-figure {
    width: 110px;
    height: 110px;
    border-radius: 0 8px 8px 0;
    box-shadow: 0 4px 4px 0 rgba(95, 101, 105, 0.6);
  }
}
.home-toplist /deep/ .swiper-slide {
  width: 345px;
}
</style>
