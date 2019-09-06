import Vue from 'vue';
import App from './App.vue';
import { createRouter } from './router';
import store from './store';
import i18n from './i18n';
import './logger';
import BootstrapVue from 'bootstrap-vue';
import VueKuzzle from 'vue-kuzzle';
import config from './config.json';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueKuzzle, config);

const router = createRouter(Vue.prototype.$kuzzle, store);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
