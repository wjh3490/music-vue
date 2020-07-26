export default {
  path: '/search',
  component: () =>
    import(/* webpackChunkName: "search" */ '../views/search')
};
