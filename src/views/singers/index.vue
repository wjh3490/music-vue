<template>
  <div class="singers" >
    <BaseNav />
    <ul>
      <li
        v-for="(item, index) in singerList"
        :key="index"
        @click.stop="getSingerDetail(item)"
        class="singers-item"
      >
        <div class="avatar">
          <img v-lazy="item.img1v1Url" alt class="singers-img" />
        </div>
        <div class="name">
          <span>{{ item.name }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import { vGetSinger } from '@/api/singer';
export default {
  name: 'Singer',
  data() {
    return {
      singerList: [],
    };
  },
  computed: {
    ...mapGetters(['singer']),
  },
  created() {
    this.getSingers();
  },
  methods: {
    async getSingers() {
      const { code, artists } = await vGetSinger();
      if (code === 200) this.singerList = Object.freeze(artists);
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
<style scoped lang="less">
@ca: 119px;
.singers ul .scroller {
  height: 100vh;
}
.singers-item {
  font-size: 16px;
  height: 50px;
  line-height: 50px;
  padding-left: 60px;
  position: relative;
  .name {
    border-bottom: 1px solid #e4e4e4;
    height: 100%;
    line-height: 50px;
  }
  .avatar {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 50%;
    overflow: hidden;
    .singers-img {
      width: 38px;
      height: 38px;
    }
  }
}
</style>
