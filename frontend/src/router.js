import Vue from 'vue';
import Router from 'vue-router';
import kuzzle from '@/services/kuzzle';
import store from '@/store';

import Home from './views/Home.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  /**
   * This route guard ensures that the app is connected to Kuzzle before
   * passing to the next route.
   */
  const offlinePageDelay = 1500;
  return new Promise(async resolve => {
    setTimeout(() => {
      if (!store.state.app.online) {
        store.commit('app/SET_WAITING_FOR_CONNECTION');
      }
    }, offlinePageDelay);
    const onceConnected = () => {
      store.commit('app/SET_ONLINE');
      setTimeout(() => {
        store.commit('app/UNSET_WAITING_FOR_CONNECTION');
      }, offlinePageDelay);

      kuzzle.removeListener('connected', onceConnected);
      kuzzle.removeListener('reconnected', onceConnected);

      next();
      return resolve();
    };
    if (!store.state.app.online) {
      kuzzle.addListener('connected', onceConnected);
      kuzzle.addListener('reconnected', onceConnected);
    } else {
      onceConnected();
    }
  });
});

export default router;
