import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
const routerList = [];
function importAll(route) {
  route.keys().forEach(k => {
    return routerList.push(route(k).default);
  });
}

importAll(require.context('.', true, /\.router\.js/));

const router = new VueRouter({
  routes: [{ path: '/', redirect: '/recomment' }, ...routerList],
  scrollBehavior: () => ({ y: 0 })
});

export default router;
