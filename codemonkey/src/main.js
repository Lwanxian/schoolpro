import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import axios from "axios";

import Elementui from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';

Vue.prototype.axios = axios;

axios.defaults.baseURL = "http://localhost:8081";

axios.defaults.withCredentials = true;


Vue.use(Elementui);



Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')