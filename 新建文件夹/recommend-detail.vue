<template>
  <div class="recommend_list">
    <Scroll :songs="songs" :playCount="playCount" />
  </div>
</template>

<script>
import Scroll from '../../components/Scroll/index';
import { vGetSongs } from '../../api/recomment';
export default {
  name: 'RecommendDetail',
  components: {
    Scroll
  },
  data() {
    return {
      songs: [],
      playCount: 0
    };
  },
/*eslint-disable */
  created() {
    this.getSongs();
    console.log(this.$route.params.id);
  },

  methods: {
    async getSongs() {
      const {
        playlist: { playCount, tracks }
      } = await vGetSongs(this.$route.params.id);
      this.playCount = playCount;

      tracks.forEach(ele => {
        const song = {
          id: ele.id,
          name: ele.name,
          singer: ele.ar[0].name,
          picUrl: ele.al.picUrl
        };
        this.songs.push(song);
      });
    }
  }
};
</script>
<style scoped lang="less">
.recommend_list {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;

  background: #fff;
  z-index: 10;
}
</style>
