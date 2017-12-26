// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import { sync } from 'vuex-router-sync'
import store from './store'

import router from './router'

import axios from 'axios';
Vue.prototype.$http = axios;

const unsync = sync(store, router)

unsync()

Vue.config.productionTip = false




/* eslint-disable no-new */
const app = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');

// router.go('/courseCenter');
