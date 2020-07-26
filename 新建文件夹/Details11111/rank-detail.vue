<template>
  <div class="detail-container">
    <slot :songs="songs" :playCount="0"></slot>
  </div>
</template>

<script>
/*eslint-disable */
import { vGetList } from '../../../api/rank.js';
export default {
  name: 'RankDetail',
  // provide() {
  //   return {
  //     song : this
  //   }
  // },

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
  }
};
</script>
