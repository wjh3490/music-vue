<template functional>
  <section class="mall-album">
    <slot />
    <swiper :options="props.options" v-if="props.list.length">
      <swiper-slide v-for="(item, index) in props.list" :key="'s' + index">
        <ul>
          <li
            class="mall-album-item"
            v-for="(song, index1) in item"
            :key="song.id"
          >
            <div class="mall-album-wrap">
              <figure class="mall-album-figure">
                <img v-lazy="song.coverUrl" alt="" class="mall-album-img" />
              </figure>
              <span class="mall-album-index">{{ index1 + 1 + index * 4 }}</span>
              <div class="mall-album-right ellipsis">
                <div class="ellipsis">
                  <span class="mall-album-name ">{{ song.albumName }}</span>
                </div>
                <div class="ellipsis mall-album-album">
                  {{ song.artistName }}
                </div>
              </div>
              <span class="mall-album-action">支持</span>
            </div>
          </li>
        </ul>
      </swiper-slide>
    </swiper>
  </section>
</template>
<script>
export default {
  name: 'MallAlbum',
  props: {
    list: {
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
  },
};
</script>
<style lang="less" scoped>
.mall-album {
  &-img {
    width: 50px;
    height: 50px;
    border-radius: 4px;
  }
  &-item {
    border-bottom: 1px solid #f0f0f0;
  }
  &-wrap {
    display: flex;
    align-items: center;
    margin-top: 6px;
    padding-bottom: 6px;
  }
  &-right {
    margin-left: 10px;
    color: #999;
    font-size: 13px;
  }
  &-index {
    font-size: 16px;
    color: #525252;
    margin-left: 18px;
  }
  &-name {
    color: #333;
    font-size: 15px;
    width: 190px;
  }
  &-album {
    margin-top: 2px;
    width: 190px;
  }
  &-action {
    border-radius: 6px;
    border: 1px solid #169af3;
    padding: 2px 14px;
    border-radius: 20px;
    color: #169af3;
    font-size: 14px;
  }
}
.mall-album /deep/ .swiper-slide {
  width: 345px !important;
}
</style>
