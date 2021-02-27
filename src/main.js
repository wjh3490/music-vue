// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import VueLazyload from 'vue-lazyload';

import './style/base.less';
import './style/transition.less';
import './utils/flexible';
import './assets/font/iconfont.css';
import '@/components/Base'
import MessageBox from './components/MessageBox';
import './registerServiceWorker'


Vue.use(VueLazyload, {
  loading: require('./assets/imgs/default.jpg')
});
Vue.use(MessageBox);
Vue.config.productionTip = false;
new Vue({
  render: h => h(App),
  store,
  router,
  components: { App }
}).$mount('#app');
//git@github.com:wjh3490/music-vue.git
//  <!-- <% for(var js of htmlWebpackPlugin.options.cdn.js) { %>
//   <script src="<%=js%>"></script>
//   <% } %> -->
