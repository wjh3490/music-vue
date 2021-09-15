<template>
  <base-swiper-items
    v-slot="{ data, index }"
    :list="recommendSongs"
    :options="playListSwiperOption"
    class="playlist-recommend"
    @swiper="onSwiper"
  >
    <div class="playlist-recommend-wrap">
      <img class="playlist-recommend-pic" :src="data.picUrl" alt />
      <span class="playlist-recommend-icon iconfont icon-bofang" @click="handlePlay(data, index)"></span>
      <div class="playlist-recommend-mask" v-show="swiper?.realIndex ?? 0 != index"></div>
    </div>
  </base-swiper-items>
  <p class="playlist-recommend-name">
    <strong>{{ recommendSongs[swiper?.realIndex ?? 0] && recommendSongs[swiper?.realIndex ?? 0]['name'] }}</strong>
  </p>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex';
import { fetchNewsong } from '@/api/recomment';
import { Song } from '@/utils/config';
import { playListSwiperOption } from '@/utils'
export default defineComponent({
  name: 'PlayListBanner',
  setup() {
    const {
      setPlaying,
      setCurrrentIndex,
      setPlay,
      setSequenceList,
      playList,
      playing,
      currrenSong,
    } = useStore();
    const swiper = ref<any>(null);
    const onSwiper = (sw: Element) => {
      swiper.value = sw
      console.log(swiper.value.realIndex)
    }
    const recommendSongs = ref([]);
    const handlePlay = (item) => {
      let index = playList.findIndex((item1) => item1.id === item.id);
      if (index >= 0) {
        if (item.id == currrenSong.id) {
          setPlaying(!playing);
          playing ? audio.play() : audio.pause();
        } else {
          setCurrrentIndex(index);
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
        setPlay([new Song(song), ...playList]);
        setSequenceList(playList);
        setCurrrentIndex(0);
      }
    }

    const getRecommendSongs = async () => {
      const { result } = await fetchNewsong({ limit: 30 });
      recommendSongs.value = result.slice(0, 5);
    }
    const palyStatus = computed(() => {
      // return function (data) {
      //   if (currrenSong.id == data.id) {
      //     return playing ? 'icon-pause-full' : 'icon-bofang';
      //   } else {
      return 'icon-bofang';
      // }
      // };
    })

    onMounted(getRecommendSongs)
    return {
      playListSwiperOption,
      palyStatus,
      handlePlay,
      onSwiper,
      recommendSongs,
      swiper
    }
  },
});
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
