<template>
  <div class="play-scrollbar play">
    <PlayListBanner />
    <main>
      <BaseList :list="list" @list="getSingerDetail" />
    </main>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import PlayListBanner from './PlayListBanner';
import { getRecommendPlaylist } from '@/api/playlist';
export default {
  name: 'PlayListRecommend',
  components: { PlayListBanner },
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
      this.$router.push(`/playlist/${singer.id}?type=0`);
    },
    ...mapMutations(['setSinger']),
  },
};
</script>
