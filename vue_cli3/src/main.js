// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {
    axios
} from './assets/axios';
import store from './store';
// 引入样式初始化文件
import '../static/css/reset.css';
import '../static/iconfont/iconfont.css';
import '../static/iconfontNew/fonts/font.css';
import '../static/css/common.css';
import methods from './assets/methods.js'; // 挂载到vue上面的公共方法


Vue.use(methods);
console.log(process.env.IS_WEB);
Vue.config.productionTip = false;
Vue.use(ElementUI);

// 设置为全局的axios
Vue.prototype.axios = axios;



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
