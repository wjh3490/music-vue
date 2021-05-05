<template>
  <div
    class="singerPic"
    ref="singerPic"
    :style="{ backgroundImage: `url(${info.coverImgUrl})` }"
  >
    <main class="detail">
      <div :style="{ opacity }">
        <div class="detail-wrap">
          <div
            class="detail-wrap-left"
            :style="{ backgroundImage: `url(${info.coverImgUrl})` }"
          >
            <span v-if="info.playCount" class="iconfont icon-erji detail-wrap-left-icon"> {{info.playCount | filterNum}}</span>
            <!-- <img :src="info.coverImgUrl" alt="" class="detail-wrap-bgc" /> -->
          </div>
          <div class="detail-wrap-right">
            <div>
              <p class="detail-wrap-name clamp">
                {{ info.name }}
                <span style="color:#dedede" v-if="info.alias"
                  >({{info.aliasuj}})</span
                >
              </p>
              <div class="detail-wrap-avatar" v-if="info.avatarUrl">
                <img :src="info.avatarUrl" alt="" class="detail-wrap-img" />
                <span class="detail-wrap-nickname">{{ info.nickname }}</span>
              </div>
              <div class="detail-wrap-singername" v-if="info.artist">
                <span class="detail-wrap-artists" style="color:#dedede">
                  <span>歌手:</span>
                  <span class="ellipsis detail-wrap-artist ">{{
                    info.artist
                  }}</span>
                  <span class="iconfont icon-iconfont2 return-left"></span>
                </span>
              </div>
            </div>
            <div class="detail-wrap-container">
              <p
                class="detail-wrap-info ellipsis"
                style="color:#dedede"
                v-if="info.publishTime"
              >
                发行时间: {{ info.publishTime | parseTime('{y}-{m}-{d}') }}
              </p>
              <p
                class="detail-wrap-info ellipsis"
                v-if="info.updateTime && $route.query.type == 1"
                style="color:#dedede"
              >
                最近更新: {{ info.updateTime | parseTime('{y}-{m}-{d}') }}
              </p>
              <p class="detail-wrap-info ellipsis" style="color:#dedede">
                {{ info.description }}
              </p>
            </div>
          </div>
        </div>
        <div class="detail-msg">
          <div class="detail-msg-icon iconfont icon-shoucang21">
            <span class="detail-msg-des">
              {{ info.subscribedCount | filterNum }}</span
            >
          </div>
          <div class="detail-msg-icon iconfont icon-pinglun">
            <span class="detail-msg-des">{{
              info.commentCount | filterNum
            }}</span>
          </div>
          <div class="detail-msg-icon iconfont icon-fenxiang">
            <span class="detail-msg-des">
              {{ info.shareCount | filterNum }}</span
            >
          </div>
        </div>
      </div>
    </main>
    <slot />
  </div>
</template>
<script>
export default {
  name: 'BaseBackGround',
  props: {
    info: {
      type: Object,
      default: () => {},
    },
    opacity: {
      type: [String, Number],
      default: 1,
    },
  },
};
</script>
<style lang="less" scoped>
.detail {
  padding: 0 20px;
  padding-top: 60px;
  backdrop-filter: blur(40px) brightness(0.9);
  -webkit-backdrop-filter: blur(40px) brightness(0.9);
  height: 100%;
  &-wrap {
    display: flex;
    justify-content: space-between;
    color: #fff;

    &-left {
      position: relative;
      width: 120px;
      height: 120px;
      border-radius: 8px;
      background-size: 100% 100%;
      background-color: #fff;
      -webkit-transition: background-image 0.4s;
      transition: background-image 0.4s;
      &-icon {
        position: absolute;
        right: 6px;
        bottom: 6px;
      }
    }
    &-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 16px;
      flex: 1;
    }
    &-name {
      color: #fff;
      font-size: 18px;
    }
    &-nickname {
      font-size: 14px;
    }
    &-singername {
      display: flex;
      align-items: center;
      margin-top: 8px;
      color: #fff;
    }
    &-artist {
      font-size: 14px;
      color: #fff;
      max-width: 150px;
      margin-left: 8px;
    }
    &-artists {
      display: flex;
      align-items: center;
    }
    &-avatar {
      display: flex;
      align-items: center;
      margin-top: 6px;
    }
    &-bgc {
      height: 100%;
      background-color: #fff;
      border-radius: 8px;
    }
    &-img {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      margin-right: 8px;
    }
    &-info {
      width: 195px;
      margin-top:4px;
    }
    &-container {
      font-size: 14px;
    }
  }

  &-msg {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    margin-top: 16px;
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
  background: no-repeat 50% / cover;
  -webkit-transition: background-image 0.4s;
  transition: background-image 0.4s;
}
.return-left {
  font-size: 12px;
  margin-left: 4px;
  transform: rotate(180deg);
}
</style>
