<template>
  <div
    class="singerPic"
    ref="singerPic"
    :style="{ backgroundImage: `url(${info.cover})` }"
  >
    <slot />
  </div>
</template>
<script>
export default {
  name: 'SingerInfo',
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
  position: relative;
  height: 290px;
  width: 100vw;
  z-index: 90;
  overflow: hidden;
  color: #fff;
  background-size: 100% 100%;
  border-radius: 0 0 30px 30px;
  &::after {
    content: ' ';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.1);
  }
  .wrap {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    &::after {
      content: ' ';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      // background-color: rgba(0, 0, 0, 0.25);
    }
  }
}
</style>
