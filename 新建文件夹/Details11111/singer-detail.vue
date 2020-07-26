<template>
  <div class="detail-container">
    <slot :songs="songs" :playCount="0"></slot>
  </div>
</template>

<script>
import { vGetSongs } from '../../../api/singer';

export default {
  name: 'SingerDetail',

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

