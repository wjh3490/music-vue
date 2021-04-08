<template>
  <div class="play-scrollbar">
    <BaseList :list="list" @list="getSingerDetail" />
  </div>
</template>
<script>
import { getPlaylistDetail } from '@/api/playlist';
import { mapMutations, mapGetters } from 'vuex';
export default {
  name: 'PlayListC',
  props: ['id'],
  data() {
    return {
      list: [],
    };
  },

  computed: {
    ...mapGetters(['singer']),
  },
  methods: {
    async getSingers(type) {
      const {
        code,
        playlist: { tracks },
      } = await getPlaylistDetail(type);
      if (code == 200) {
        this.list = tracks.reduce((acc, cur) => {
          const obj = {
            id: cur.id,
            picUrl: cur.al.picUrl,
            playCount: cur.dt,
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
