
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import VueLazyload from 'vue-lazyload';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import * as filters from '@/filters';

import 'swiper/dist/css/swiper.css';
import './style/base.less';
import './style/transition.less';
import './style/font.css';
import './utils/flexible';
import './assets/font/iconfont.css';

import '@/components/base';
import '@/components/gloabl';
import './registerServiceWorker';

Vue.use(VueAwesomeSwiper);
Vue.use(VueLazyload, {
  loading: require('./assets/imgs/default.jpg'),
});
Vue.config.productionTip = false;
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});
new Vue({
  render: (h) => h(App),
  store,
  router,
  components: { App },
}).$mount('#app');
