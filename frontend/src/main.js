import { createApp } from 'vue';
import App from './App.vue';
import { createAppRouter } from './router';
import store from './store';
import i18n from './i18n';
import logger from './logger';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import VueKuzzle from 'vue-plugin-kuzzle';
import config from './config.json';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

const router = createAppRouter(Vue.prototype.$kuzzle, store);

createApp(App)
  .use(router)
  .use(BootstrapVue)
  .use(BootstrapVueIcons)
  .use(VueKuzzle, config)
  .use(store)
  .use(i18n)
  .use(logger.logger, logger.options);

// Vue.config.productionTip = false;
// Vue.use(BootstrapVue);
// Vue.use(BootstrapVueIcons);
// Vue.use(VueKuzzle, config);

// new Vue({
//   router,
//   store,
//   i18n,
//   render: h => h(App)
// }).$mount('#app');
