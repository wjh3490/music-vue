export default {
  path: '/rank',
  component: () =>
    import(/* webpackChunkName: "rank" */ '../views/rank'),
  // children: [
  //   {
  //     path: ':id',
  //     component: () =>
  //       import(
  //         /* webpackChunkName: "rank-detail" */ '../views/rank/rank-detail.vue'
  //       )
  //   }
  // ]
};
