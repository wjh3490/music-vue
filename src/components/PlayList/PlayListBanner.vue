<template>
  <div>
    <BaseSwiper
      :list="recommendSongs"
      :options="swiperOptions"
      v-slot="{ data, index }"
      ref="mySwiper"
      class="playlist-recommend"
    >
      <div class="playlist-recommend-wrap">
        <img class="playlist-recommend-pic" :src="data.picUrl" alt="" />
        <span
          :class="palyStatus(data)"
          class="playlist-recommend-icon iconfont"
          @click="handlePlay(data, index)"
        ></span>
        <div class="playlist-recommend-mask" v-show="id != index"></div>
      </div>
    </BaseSwiper>
    <p class="playlist-recommend-name">
      <strong>{{ recommendSongs[id] && recommendSongs[id]['name'] }}</strong>
    </p>
  </div>
</template>
<script>
import { vGetNewsong } from '@/api/recomment';
import { mapMutations, mapGetters } from 'vuex';
import { Song } from '@/utils/config';
export default {
  name: 'PlayListBanner',
  data() {
    return {
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
        on: {
          slideChange: () => {
            this.id = this.swiper.realIndex;
          },
        },
      },
      recommendSongs: [],
      id: 0,
    };
  },

  computed: {
    palyStatus({ playing, currrenSong }) {
      return function(data) {
        if (currrenSong.id == data.id) {
          return playing ? 'icon-pause-full' : 'icon-bofang';
        } else {
          return 'icon-bofang';
        }
      };
    },
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    ...mapGetters(['playList', 'playing', 'currrenSong']),
  },
  created() {
    this.getRecommendSongs();

    this.$nextTick(() => (this.audio = document.getElementById('audio')));
  },
  methods: {
    handlePlay(item) {
      let index = this.playList.findIndex((item1) => item1.id === item.id);
      if (index >= 0) {
        if (item.id == this.currrenSong.id) {
          this.setPlaying(!this.playing);
          this.playing ? this.audio.play() : this.audio.pause();
        } else {
          this.setCurrrentIndex(index);
        }
      } else {
        const song = {
          id: item.id,
          name: item.name,
          picUrl: item.picUrl,
          singer: item.song.artists[0]['name'],
          album: item.song.album.name,
          alia: item.song.album.alias,
          privilege: {
            pl: item.song.privilege['pl'],
            fee: item.song.privilege['fee'],
            flag: item.song.privilege['flag'],
            maxbr: item.song.privilege['maxbr'],
          },
        };
        this.setPlay([new Song(song), ...this.playList]);
        this.setSequenceList(this.playList);
        this.setCurrrentIndex(0);
      }
    },
    async getRecommendSongs() {
      const { code, result } = await vGetNewsong({ limit: 30 });
      if (code == 200) {
        this.recommendSongs = result.slice(0, 5);
      }
    },
    ...mapMutations([
      'setPlaying',
      'setCurrrentIndex',
      'setPlay',
      'setSequenceList',
    ]),
  },
};
</script>
<style lang="less" scoped>
.playlist-recommend {
  margin: 0 20px;
  &-wrap {
    position: relative;
    width: 160px;
    height: 150px;
    overflow: hidden;
    border-radius: 15px;
  }
  &-name {
    margin-top: 10px;
    text-align: center;
    font-size: 16px;
  }
  &-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.3);
  }
  &-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    font-size: 30px;
    color: #fff;
  }
}
</style>
