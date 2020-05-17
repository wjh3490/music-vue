export default {
  path: '/user',
  component: () =>
    import(/* webpackChunkName: "user" */ '../views/user')
};
