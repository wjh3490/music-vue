export default {
  path: '/singer',
  component: () =>
    import(/* webpackChunkName: "singer" */ '../views/singers')
};
