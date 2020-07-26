import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.configure({ showSpinner: false })
import Layout from '../layout/index.vue';

Vue.use(VueRouter);
const routerList = [];
function importAll(route) {
  route.keys().forEach(k => {
    return routerList.push(route(k).default);
  });
}

importAll(require.context('.', true, /\.router\.js/));

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/recomment' },

    {
      path: '/',
      redirect: '/recomment',
      component: Layout,
      name: 'Layout',
      children: [...routerList]
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
