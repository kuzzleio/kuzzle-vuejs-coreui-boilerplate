import Vue from 'vue';
import App from './App.vue';
import { createRouter } from './router';
import store from './store';
import i18n from './i18n';
import './logger';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import VueKuzzle from 'vue-plugin-kuzzle';
import config from './config.json';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueKuzzle, config);

const router = createRouter(Vue.prototype.$kuzzle, store);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
