export default {
  path: '/recomment',
  component: () =>
    import(
      /* webpackChunkName: "recomment" */ '../views/recommend'
    )
};
