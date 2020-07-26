<script>
/*eslint-disable */
// <template>
//   <div class="details">
//     <RankDetail>
//       <template v-slot="{ songs }">
//         <Scroll :songs="songs" />
//       </template>
//     </RankDetail>
//   </div>
// </template>
import { recommentSongs } from '@/api/recomment';
import { singerSongs } from '@/api/singer';
import { rankSongs } from '@/api/rank';
import Scroll from '@/components/Scroll';

export default {
  name: 'Detail',

  data() {
    return {
      songs: [],
      playCount: 0
    };
  },

  created() {
    const { query, params } = this.$route;
    this[query.componentName](params.id);
  },
  methods: {
    async RankDetail(id) {
      const {
        code,
        playlist: { playCount, tracks }
      } = await rankSongs(id);

      if (code === 200) {
        this.getSongs(tracks);
      }
    },
    async RecommendDetail(id) {
      const {
        code,
        playlist: { playCount, tracks }
      } = await recommentSongs(id);

      if (code === 200) {
        this.getSongs(tracks, playCount);
      }
    },
    async SingerDetail(id) {
      const { code, hotSongs } = await singerSongs(id);

      if (code === 200) {
        this.getSongs(hotSongs);
      }
    },

    getSongs(list, count = 0) {
      let songs = [];
      list.forEach(ele => {
        const song = {
          id: ele.id,
          name: ele.name,
          singer: ele.ar[0].name,
          picUrl: ele.al.picUrl
        };
        this.playCount = count;
        songs.push(song);
      });

      this.songs = Object.freeze(songs);
    }
  },

  render() {
    const { songs, playCount } = this;
    return (
      <div class="detail-container">
        <Scroll songs={songs} playCount={playCount} />
      </div>
    );
  }
};
</script>
