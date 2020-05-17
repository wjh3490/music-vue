<template>
  <div>
    <slot :songs="songs"></slot>
  </div>
</template>

<script>
/*eslint-disable */
import Scroll from '../../components/Scroll/index';
import { vGetList } from '../../api/rank';
export default {
  name: 'RankDetail',
  components: {
    Scroll
  },

  data() {
    return {
      songs: []
    };
  },

  created() {
    this.getSongs();
  },
  methods: {
    async getSongs() {
      const { code, playlist } = await vGetList(this.$route.params.id);
      if (code === 200) {
        const { tracks } = playlist;
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
  },


  
};
</script>
<style scoped lang="less">
.details {
  background: #fff;
  z-index: 10;
}
</style>
