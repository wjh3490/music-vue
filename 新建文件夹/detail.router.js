export default {
  path: '/details/:id',
  component: () =>
    import(
      /* webpackChunkName: "detail" */ '../views/details'
    )
};
