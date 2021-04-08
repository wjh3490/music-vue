<template>
  <div class="singerPic" ref="singerPic">
    <div
      class="wrap"
      :style="{ backgroundImage: `url(${info.coverImgUrl})` }"
    ></div>
    <main class="detail" :style="{ opacity }">
      <div class="detail-wrap">
        <div class="detail-wrap-left">
          <img :src="info.coverImgUrl" alt="" class="detail-wrap-bgc" />
        </div>
        <div class="detail-wrap-right">
          <div>
            <p class="detail-wrap-name">{{ info.name }}</p>
            <div class="detail-wrap-avatar">
              <img :src="info.avatarUrl" alt="" class="detail-wrap-img" />
              <span class="detail-wrap-nickname">{{ info.nickname }}</span>
            </div>
          </div>
          <p class="detail-wrap-info ellipsis">{{ info.description }}</p>
        </div>
      </div>
      <div class="detail-msg">
        <div class="detail-msg-icon iconfont icon-shanchu2">
          <span class="detail-msg-des"> {{ info.subscribedCount }}</span>
        </div>
        <div class="detail-msg-icon iconfont icon-pinglun">
          <span class="detail-msg-des">{{ info.commentCount }}</span>
        </div>
        <div class="detail-msg-icon iconfont icon-fenxiang">
          <span class="detail-msg-des"> {{ info.shareCount }}</span>
        </div>
      </div>
    </main>
    <slot />
  </div>
</template>
<script>
export default {
  name: 'DetailBackGround',
  props: {
    info: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      opacity: 1,
    };
  },
  mounted() {
    document.addEventListener('scroll', () => {
      console.dir(document.documentElement.scrollTop);
      this.opacity = 1 - document.documentElement.scrollTop / 200;
    });
  },
  beforeDestroy() {
    document.removeEventListener('scroll');
  },
};
</script>
<style lang="less" scoped>
.detail {
  padding: 0 20px;
  &-wrap {
    display: flex;
    margin-top: 65px;
    justify-content: space-between;
    color: #fff;
    &-left {
      width: 110px;
      height: 110px;
    }
    &-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 20px;
      flex: 1;
    }
    &-name {
      color: #fff;
      font-size: 16px;
    }
    &-nickname {
      font-size: 14px;
    }
    &-avatar {
      display: flex;
      align-items: center;
      margin-top: 6px;
    }
    &-bgc {
      height: 100%;
      border-radius: 8px;
    }

    &-img {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      margin-right: 10px;
    }
    &-info {
      width: 195px;
    }
  }

  &-msg {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    margin-top: 25px;
    font-size: 18px;
    &-icon {
      font-size: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    &-des {
      font-size: 16px;
    }
  }
}
.singerPic {
  height: 260px;
  width: 100vw;
  position: sticky;
  top: -210px;
  z-index: 90;
  overflow: hidden;
  color: #fff;
  .wrap {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-position: 0 0;
    background-repeat: no-repeat;
    background-size: cover;
    transform: scale(1.5);
    transform-origin: center center;
    filter: blur(10px);
    &::after {
      content: ' ';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      background-color: rgba(0, 0, 0, 0.25);
    }
  }
}
</style>
