import Vue from 'vue';
import Shadow from './Shadow';
import Toast from './Toast';
import MessageBox from './MessageBox';
import Drop from './Drop';

Vue.prototype.$shadow = Shadow;
Vue.prototype.$toast = Toast;
Vue.use(MessageBox)
Vue.use(Drop)
