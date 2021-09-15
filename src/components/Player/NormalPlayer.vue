<template>
  <div :style="{ backgroundImage: `url(${backgroundImage})` }" class="normal-player">
    <div class="normal-player-main">
      <player-tabs :index="active" @slide="handleSlide" />
      <base-swiper-items
        v-slot="{ data }"
        :list="playerOptions"
        :options="playerSwiperOptions"
        style="height:calc(100% - 4rem)"
        @slideChange="onSlideChange"
        @swiper="onSwiper"
      >
        <component :is="data.component" />
      </base-swiper-items>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue'
import { useStore } from 'vuex';
import PlayerTabs from '@/components/Player/PlayerTabs.vue'
import PlayerInfo from '@/components/Player/PlayerInfo.vue'
import PlayerLyric from '@/components/Player/PlayerLyric.vue'
import PlayerMain from '@/components/Player/PlayerMain.vue'
import { playerSwiperOptions, playerOptions } from "@/utils";
import userSwiper from '@/composables/useSwiper'
export default defineComponent({
  name: 'NormalPlayer',
  components: {
    PlayerTabs,
    PlayerInfo,
    PlayerLyric,
    PlayerMain,
  },
  setup() {
    const store = useStore();
    const backgroundImage = ref('');
    const {
      active,
      onSwiper,
      handleSlide,
      onSlideChange,
    } = userSwiper();


    let img = new Image();
    watch(() => store.getters.currrenSong, (val) => {
      img.src = val.picUrl;
      img.onload = () => {
        backgroundImage.value = val.picUrl;
      }
    });
    watch(() => store.state.fullScreen, (val) => {
      if (val) handleSlide(1);
    })

    return {
      active,
      playerOptions,
      backgroundImage,
      playerSwiperOptions,
      onSwiper,
      handleSlide,
      onSlideChange,
    }
  },
});
</script>
<style lang="less">
.normal-player {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  transition: background-image 0.4s;
  background: no-repeat 50% / cover;
}

.blurBg {
  width: 100%;
  height: 100%;
  // background-size: 100% 100%;
  // background-position: center;
  // background-repeat: no-repeat;
  // background-position: 50% center;
  transition: background-image 0.4s;
  background: no-repeat 50% / cover;
  // transform: scale(1.5);
  // transform-origin: center center;
  // filter: blur(65px);
  // opacity: 0.6;
}
.blurBgMask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.6;
  z-index: 9;
}
.normal-player-main {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 100;
  backdrop-filter: blur(40px) brightness(0.65);
  -webkit-backdrop-filter: blur(40px) brightness(0.65);
}
.normal-player-bottom {
  position: absolute;
  bottom: 20px;
  width: 100%;
  padding: 0 25px;
  .collect {
    color: #fff;
    .collect-icon {
      font-size: 24px;
    }
  }
  .like {
    position: absolute;
    top: -4px;
    right: 35px;

    &.running {
      animation: pulse 0.3s ease-in-out;
    }
    .like-icon {
      font-size: 22px;
      color: #fff;
      &.active_red {
        color: #f0746b;
      }
    }
  }
}

.player-center {
  height: 70%;
  position: relative;
  width: 100%;
  margin-top: 12px;
}
.control-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
