<template>
  <div style="width:100%">
    <swiperSlide class="swiper-item" :data-id="id">
      <div>
        <swiper :options="swiperOptions" style="margin: 0 20px">
          <swiperSlide>
            <img
              src="../../assets/imgs/1.jpg"
              style="width:150px"
              alt=""
            /> </swiperSlide
          ><swiperSlide>
            <img src="../../assets/imgs/2.jpg" style="width:150px" alt="" />
          </swiperSlide>
          <swiperSlide>
            <img src="../../assets/imgs/3.jpg" style="width:150px" alt="" />
          </swiperSlide>
          <swiperSlide>
            <img src="../../assets/imgs/4.jpg" style="width:150px" alt="" />
          </swiperSlide>
          <swiperSlide>
            <img src="../../assets/imgs/5.jpg" style="width:150px" alt="" />
          </swiperSlide>
        </swiper>
      </div>
    </swiperSlide>
  </div>
</template>
<script>
import { getPlaylistDetail } from '@/api/playlist';
import { mapMutations, mapGetters } from 'vuex';
import { swiper,swiperSlide } from 'vue-awesome-swiper';
export default {
  name: 'PlayListRecommend',
  props: ['id'],
  components: { swiper,swiperSlide },
  data() {
    return {
      singerList: [],
      swiperOptions: {
        effect: 'coverflow',
        slidesPerView: '3',
        spaceBetween: '-20%',
        centeredSlides: true,
        loop: true,
        loopSlides: 2,
        coverflowEffect: {
          rotate: 0, // 旋转的角度
          stretch: 0, // 拉伸   图片间左右的间距和密集度
          depth: 130, // 深度   切换图片间上下的间距和密集度
          modifier: 4, // 修正值 该值越大前面的效果越明显
          slideShadows: false,
        },
      },
    };
  },
  filters: {
    formatIndex(index) {
      return (index + '').padStart(2, '0');
    },
    formatRank(rank) {
      if (rank > 0) return ['icon-jiantou', 'rankRose'];
      if (rank < 0) return ['icon-jiantou', 'rankLose'];
      if (rank == 0) return ['icon-line', 'rankEqual'];
    },
  },
  computed: {
    ...mapGetters(['singer']),
  },
  methods: {
    async getSingers(type) {
      const {
        code,
        playlist: { tracks },
      } = await getPlaylistDetail(type);
      if (code === 200) this.singerList = Object.freeze(tracks);
    },
    getSingerDetail(singer) {
      const _singer = {
        id: singer.id,
        singerPic: singer.picUrl,
        name: singer.name,
      };

      this.setSinger(_singer);
      this.$router.push(
        `/details/${singer.id}?singerPic=${singer.picUrl}&name=${singer.name}&componentName=SingerDetail`
      );
    },
    ...mapMutations(['setSinger']),
  },
};
</script>
<style lang="less" scoped>
.singer {
  &-main {
    &-wrap {
      padding-bottom: 80px;
    }
    &-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
    }
    &-img {
      width: 80px;
      height: 80px;
      border-radius: 8px;
    }
    &-index {
      width: 55px;
      display: flex;
      flex-direction: column;
      font-size: 18px;
    }
    &-name {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 15px;
    }
    &-score {
      margin-top: 6px;
      color: #999;
    }
    &-singer {
      font-size: 16px;
    }
    &-nownum {
      color: #999;
      font-size: 18px;
      text-align: center;
    }
    &-rank {
      display: flex;
      align-items: center;
      margin-top: 4px;
      justify-content: center;
    }
    &-top3 {
      color: #169af3;
    }
    &-num {
      font-size: 12px;
      color: #999;
    }
  }
}
.swiper {
  height: calc(100vh - 40px);
}
.swiper-item {
  overflow-y: auto;
}
.rankRose {
  color: #ff3a3a;
  font-size: 12px;
}
.rankLose {
  color: #169af3;
  font-size: 12px;
  transform: rotate(180deg);
}
.rankEqual {
  font-size: 12px;
  transform: scale(0.7);
  color: #999;
}
</style>
