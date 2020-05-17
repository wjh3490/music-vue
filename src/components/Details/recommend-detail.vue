<template>
  <div>
    <slot :songs="songs" :playCount="playCount"></slot>
  </div>
</template>

<script>
import { vGetSongs } from '../../api/recomment';
export default {
  name: 'RecommendDetail',

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

