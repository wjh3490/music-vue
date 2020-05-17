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
import Scroll from '../../components/Scroll';
import { vGetList } from '../../api/rank';

export default {
  name: 'Detail',
  components: {
    Scroll,
    RankDetail: () =>
      import(
        /* webpackChunkName: "rank-detail" */ '../../components/Details/rank-detail'
      ),
    RecommendDetail: () =>
      import(
        /* webpackChunkName: "recommend-detail" */ '../../components/Details/recommend-detail'
      ),
    SingerDetail: () =>
      import(
        /* webpackChunkName: "singer-detail" */ '../../components/Details/singer-detail'
      )
  },

  render() {
    const { componentName } = this.$route.query;
    const data = {
      scopedSlots: {
        default: slotProps => {
          return (
            <Scroll songs={slotProps.songs} playCount={slotProps.playCount} />
          );
        }
      }
    };
    return <componentName {...data} />;
  }
};
</script>
