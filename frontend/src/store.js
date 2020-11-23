import { createStore } from 'vuex';
import app from '@/vuex/app';
import auth from '@/vuex/auth';

const debug = process.env.NODE_ENV !== 'production';

export default createStore({
  modules: {
    app,
    auth
  },
  strict: debug
});
