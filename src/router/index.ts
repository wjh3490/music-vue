import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.configure({ showSpinner: false });
const routes: RouteRecordRaw[] =
  [
    { path: '/', redirect: '/home' },
    {
      path: '/rank',
      name: 'Rank',
      component: () => import('@/views/rank/index.vue'),
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/home/index.vue')

    },
    {
      path: '/singer',
      name: 'Singer',
      component: () => import('@/views/singer/index.vue'),
    },
    {
      path: '/singer/:id',
      name: 'SingerDetail',
      component: () =>
        import(
          '@/views/singer/detail.vue'
        ),
    },
    // {
    //   path: '/user',
    //   component: () => import('../views/user'),
    // },
    // {
    //   path: '/playlist',
    //   name: 'Playlist',
    //   component: () =>
    //     import('@/views/playlist/index.vue'),
    // },
    {
      path: '/playlist/:id',
      name: 'PlayListDetail',
      component: () =>
        import('@/views/playlist/detail.vue'),
    },
    {
      path: '/album/:id',
      name: 'Album',
      component: () => import('@/views/album/index.vue'),
    },
    {
      path: '/mall',
      name: 'Mall',
      component: () => import('@/views/mall/index.vue'),
    },
    {
      path: '/mall-category',
      name: 'MallCategory',
      component: () => import('@/views/mall/mall-category.vue'),
    },
    {
      path: '/mall-shop',
      name: 'MallShop',
      component: () => import('@/views/mall/mall-shop.vue'),
    },
    {
      path: '/songs',
      name: 'Songs',
      component: () => import('@/views/songs/index.vue'),
    },
    {
      path: '/search',
      name: 'Search',
      component: () =>
        import('@/views/search/index.vue'),
    },
    {
      path: '/search-detail',
      name: 'SearchDetail',
      component: () =>
        import('@/views/search/detail.vue'),
    },

  ]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});
router.afterEach(() => {
  NProgress.done();
});

export default router;
