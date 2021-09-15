import { createApp } from 'vue'
import App from './App.vue'
import VueLazyLoad from 'vue3-lazyload'
const modules = import.meta.globEager('./components/base/*.vue')
import router from './router'
import store from './store'
import './style/base.less';
import './style/transition.less';
import './style/font.css';
import './assets/font/iconfont.css';
import lazyLoadUrl from './assets/imgs/default.jpg';

const app = createApp(App)
Object.keys(modules).forEach(item => {
    const component = modules[item].default;
    app.component(component.name, component)
})

app.use(router);
app.use(store);
app.use(VueLazyLoad, {
    loading: lazyLoadUrl,
})
app.mount('#app')

