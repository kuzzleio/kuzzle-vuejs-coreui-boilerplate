import kuzzle from '@/services/kuzzle';

const state = {
  currentUser: null
};

const getters = {
  currentUser: state => state.currentUser,
  currentUsername: state =>
    state.currentUser ? state.currentUser.username : null
};

const actions = {
  LOGIN: async ({ dispatch }, credentials) => {
    let jwt;
    try {
      jwt = await kuzzle.auth.login('local', credentials, '7 days');
      await dispatch('FETCH_CURRENT_USER');
    } catch (error) {
      localStorage.removeItem('user_token');
      throw error;
    }

    localStorage.setItem('user_token', jwt);
  },
  CHECK_TOKEN: async ({ dispatch, getters }) => {
    const jwt = localStorage.getItem('user_token');

    if (!jwt) {
      return false;
    }

    const { valid } = await kuzzle.auth.checkToken(jwt);

    if (!valid) {
      await dispatch('LOG_OUT');
      return false;
    }

    kuzzle.jwt = jwt;

    if (!getters.currentUser) {
      await dispatch('FETCH_CURRENT_USER');
    }

    return true;
  },
  FETCH_CURRENT_USER: async ({ commit }) => {
    let currentUser;
    try {
      currentUser = await kuzzle.auth.getMyCredentials('local');
    } catch (error) {
      throw error;
    }

    commit('SET_CURRENT_USER', currentUser);

    /**
     * Here, you can perform some data fetch related to your user-session.
     */
  },
  LOG_OUT: async ({ commit }) => {
    /**
     * You should tear down your session here.
     */
    commit('UNSET_CURRENT_USER');
    kuzzle.jwt = null;
    localStorage.removeItem('user_token');
  },
  SAVE_USER_LOCALE: async ({ commit }, locale) => {
    try {
      await kuzzle.auth.updateSelf({ locale });
      commit('SET_USER_LOCALE', locale);
    } catch (error) {
      console.error(
        `Unable to set locale ${locale} for current user: ${error.message}`
      );
    }
  }
};

const mutations = {
  SET_CURRENT_USER: (state, user) => {
    state.currentUser = user;
  },
  UNSET_CURRENT_USER: state => {
    state.currentUser = null;
  },
  SET_USER_LOCALE: (state, locale) => {
    if (!state.currentUser || !state.currentUser.content) {
      return;
    }
    if (!locale) {
      return;
    }

    state.currentUser.content.locale = locale;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
