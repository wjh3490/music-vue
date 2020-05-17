<template>
  <div class="singers" ref="singers">
    <ul>
      <RecycleScroller
        class="scroller"
        :items="singerList"
        :item-size="50"
        key-field="id"
        v-slot="{ item, index }"
      >
        <li :key="index" @click.stop="pushSinger(item)" class="singers-item">
          <div class="avatar">
            <img v-lazy="item.img1v1Url" alt class="singers-img" />
          </div>
          <div class="name">
            <span>{{ item.name }}</span>
          </div>
        </li>
      </RecycleScroller>
    </ul>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import { vGetSinger } from '../../api/singer';
export default {
  name: 'Singer',
  data() {
    return {
      singerList: [],
      scrollY: 0
    };
  },
  computed: {
    ...mapGetters(['singer'])
  },

  created() {
    this.getSingers();
  },

  /*eslint-disable */
  methods: {
    handleScroll() {
      this.scrollY = window.scrollTop;
      console.log(window);
    },
    async getSingers() {
      const { code, artists } = await vGetSinger();
      if (code === 200) {
        this.singerList = artists;
      }
    },
    pushSinger(singer) {
      const _singer = {
        id: singer.id,
        singerPic: singer.picUrl,
        name: singer.name
      };

      this.setSinger(_singer);
      this.$router.push(
        `/details/${singer.id}?singerPic=${singer.picUrl}&name=${singer.name}&componentName=SingerDetail`
      );
    },

    ...mapMutations(['setSinger'])
  }
};
</script>
<style scoped lang="less">
@base: 37.5rem;
@ca: 119 / @base;
.singers ul .scroller {
  height: 100vh;
  // overflow: hidden;
}
.singers-item {
  font-size: 16px;
  height: 50 / @base;
  line-height: 50 / @base;
  padding-left: 60 / @base;
  position: relative;
  .name {
    border-bottom: 1 / @base solid #e4e4e4;
    height: 100%;
    line-height: 50 / @base;
  }
  .avatar {
    position: absolute;
    left: 10 / @base;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 50%;
    overflow: hidden;
    .singers-img {
      width: 38 / @base;
      height: 38 / @base;
    }
  }
}
</style>
