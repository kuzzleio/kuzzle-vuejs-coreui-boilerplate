import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';
import Login from '@/views/Login';
import DefaultContainer from '@/views/DefaultContainer';
import PageNotFound from '@/views/404.vue';

Vue.use(Router);

export const createRouter = (kuzzle, store) => {
  const authenticationGuard = async (to, from, next) => {
    try {
      if (await store.dispatch('auth/CHECK_TOKEN', kuzzle)) {
        next();
      } else {
        next({ name: 'login', query: { to: to.name } });
      }
    } catch (error) {
      console.error(error.message);
      next({ name: 'login', query: { to: to.name } });
    }
  };

  const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/login',
        name: 'login',
        component: Login
      },
      {
        path: '/',
        beforeEnter: authenticationGuard,
        component: DefaultContainer,
        children: [
          {
            path: '/',
            name: 'home',
            component: Home
          }
        ]
      },
      {
        path: '*',
        component: PageNotFound
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

  return router;
};
