import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/style/base.less';
import '@/style/transition.less';
import '@/style/font.css';
import '@/assets/font/iconfont.css';
import VueLazyLoad from 'vue3-lazyload'
import lazyLoadUrl from '@/assets/imgs/default.jpg';
import registerGolbal from '@/components/global'
const app = createApp(App)

app.use(router)
    .use(store)
    .use(VueLazyLoad, {
        loading: lazyLoadUrl,
    })
    .use(registerGolbal)
    .mount('#app')

