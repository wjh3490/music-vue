import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.configure({ showSpinner: false });

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
    { path: '/', redirect: '/home' },
    {
      path: '/rank',
      component: () => import(/* webpackChunkName: "rank" */ '../views/rank'),
    },
    {
      path: '/home',
      component: () =>
        import(/* webpackChunkName: "recommend" */ '../views/home'),
    },
    {
      path: '/singer',
      name: 'Singer',
      component: () => import(/* webpackChunkName: "rank" */ '../views/singer'),
    },
    {
      path: '/singer/:id',
      component: () =>
        import(
          /* webpackChunkName: "singer-detail" */ '../views/singer/singer-detail'
        ),
    },
    {
      path: '/user',
      component: () => import(/* webpackChunkName: "user" */ '../views/user'),
    },
    {
      path: '/playlist',
      component: () =>
        import(/* webpackChunkName: "playlist" */ '../views/playlist'),
    },
    {
      path: '/playlist/:id',
      component: () =>
        import(
          /* webpackChunkName: "playlist-detail" */ '../views/playlist/playlist-detail'
        ),
    },
    {
      path: '/album/:id',
      component: () => import(/* webpackChunkName: "album" */ '../views/album'),
    },
    {
      path: '/mall',
      component: () => import(/* webpackChunkName: "mall" */ '../views/mall'),
    }, 
    {
      path: '/mall-category',
      component: () => import(/* webpackChunkName: "mall-category" */ '../views/mall/mall-category'),
    },
    {
      path: '/songs/:id?',
      component: () => import(/* webpackChunkName: "songs" */ '../views/songs'),
    },
    {
      path: '/search',
      component: () =>
        import(/* webpackChunkName: "search" */ '../views/search'),
    },
  ],
  scrollBehavior: () => ({ y: 0 }),
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});
router.afterEach(() => {
  NProgress.done();
});

export default router;
