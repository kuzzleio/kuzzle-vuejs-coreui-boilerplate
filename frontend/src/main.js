import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';
import './notifications';
import BootstrapVue from 'bootstrap-vue';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
