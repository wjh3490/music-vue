<template>
  <div class="play-scrollbar play">
    <PlayListRecommendBanner />
    <main>
      <BaseList :list="list" @list="getSingerDetail" />
    </main>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import PlayListRecommendBanner from './PlayListRecommendBanner';
import { getRecommendPlaylist } from '@/api/playlist';
export default {
  name: 'PlayListRecommend',
  components: { PlayListRecommendBanner },
  props: ['id'],
  data() {
    return {
      list: [],
    };
  },
  methods: {
    async getSingers() {
      const { code, result } = await getRecommendPlaylist();
      if (code == 200) {
        this.list = result.reduce((acc, cur) => {
          const obj = {
            id: cur.id,
            picUrl: cur.picUrl,
            playCount: cur.playCount,
            name: cur.name,
          };
          acc.push(obj);
          return acc;
        }, []);
      }
    },
    getSingerDetail(singer) {
      const _singer = {
        id: singer.id,
        singerPic: singer.picUrl,
        name: singer.name,
      };

      this.setSinger(_singer);
      this.$router.push(`/playlist/${singer.id}`);
    },
    ...mapMutations(['setSinger']),
  },
};
</script>
<style lang="less" scoped></style>
