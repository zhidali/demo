// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {
    axios
} from './assets/js/http/axios'
import store from './store'
// 引入样式初始化文件
import './assets/css/reset.css'
import './assets/fonts/iconfont/iconfont.css'
import './assets/fonts/iconfontNew/fonts/font.css'
import './assets/css/common.css'
import upload from './assets/js/upload/upload.js' // 挂载到vue上面的公共方法
// 引入svg文件
import './assets/fonts/iconSvg';

// 引入sentry
// import * as Sentry from '@sentry/browser';
// import * as Integrations from '@sentry/integrations';

// sentry初始化
// Sentry.init({
//     dsn: 'http://e9ddae100728438ab10e371bd63cb5e5@crash.julive.com/6',
//     integrations: [new Integrations.Vue({
//         Vue,
//         attachProps: true
//     })]
// });

Vue.use(upload)

Vue.config.productionTip = false
Vue.use(ElementUI)

// 设置为全局的axios
Vue.prototype.axios = axios
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>'
})
