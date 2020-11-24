import Vue from 'vue';
import Vuex from 'vuex';
import app from '@/vuex/app';
import auth from '@/vuex/auth';

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    auth
  },
  strict: debug
});
