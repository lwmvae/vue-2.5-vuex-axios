// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
Vue.prototype.$http = axios;

import Vuex from 'vuex';

Vue.use(Vuex);

Vue.config.productionTip = false




/* eslint-disable no-new */
const app = new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app');

// router.push('/courseCenter');
