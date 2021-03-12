// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'  //登录
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'
import api from "./interface/indexxx"
 
import VueRouter from 'vue-router';
Vue.config.productionTip = false
Vue.prototype.$api=api.commonUrl

Vue.use(ElementUI);
Vue.use(VueAxios, axios)
 
 

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})
