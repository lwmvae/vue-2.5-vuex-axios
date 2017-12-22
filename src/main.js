// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
Vue.prototype.$http = axios;


Vue.config.productionTip = false

Vue.directive('title', {
  inserted: function(el, binding) {
    document.title = el.dataset.title
  }
});


/* eslint-disable no-new */
const app = new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app');

// router.push('/courseCenter');
