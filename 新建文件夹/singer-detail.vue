<template>
  <div class="singer_desc">
    <Scroll :songs="songs" />
  </div>
</template>

<script>
import Scroll from '../../components/Scroll/index';
import { vGetSongs } from '../../api/singer';

export default {
  name: 'SingerDetail',
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
      let res = await vGetSongs(this.$route.params.id);
      res.hotSongs.forEach(ele => {
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
.singer_desc {
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
