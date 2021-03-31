import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.configure({ showSpinner: false })

Vue.use(VueRouter);
// const routerList = [];
// function importAll(route) {
//   route.keys().forEach(k => {
//     return routerList.push(route(k).default);
//   });
// }

// importAll(require.context('.', true, /\.router\.js/));

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/recommend' },
    {
      path: '/rank',
      component: () =>
        import(/* webpackChunkName: "rank" */ '../views/rank')
    },
   
    {
      path: '/recommend',
      component: () =>
        import(/* webpackChunkName: "recommend" */ '../views/recommend')
    },
    {
      path: '/singers',
      name:'Singers',
      component: () =>
        import(/* webpackChunkName: "rank" */ '../views/singers')
    },
    {
      path: '/user',
      component: () =>
        import(/* webpackChunkName: "user" */ '../views/user')
    },
    {
      path: '/playlist',
      component: () =>
        import(/* webpackChunkName: "playlist" */ '../views/playlist')
    },
    {
      path: '/details/:id',
      component: () =>
        import(/* webpackChunkName: "detail" */ '../views/details')
    },
    {
      path: '/search',
      component: () =>
        import(/* webpackChunkName: "search" */ '../views/search')
    }
  ],
  scrollBehavior: () => ({ y: 0 })
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});
router.afterEach(() => {
  NProgress.done();
});


export default router;
