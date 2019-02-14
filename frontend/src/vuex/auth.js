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
  FETCH_CURRENT_USER: async ({ commit, dispatch }) => {
    let currentUser;
    try {
      currentUser = await kuzzle.auth.getMyCredentials('local');
    } catch (error) {
      throw error;
    }

    commit('SET_CURRENT_USER', currentUser);
    await dispatch('customerConfig/FETCH_CONFIG', null, { root: true });
    await dispatch('alarms/FETCH_TRIGGERED_ALARMS', null, { root: true });
    await dispatch('alarms/SUBSCRIBE', null, { root: true });
  },
  LOG_OUT: async ({ commit, dispatch }) => {
    await dispatch('alarms/UNSUBSCRIBE', null, { root: true });
    commit('alarms/UNSET_ALL_TRIGGERED_ALARMS', null, { root: true });
    commit('customerConfig/UNSET_CONFIG', null, { root: true });
    commit('devices/SET_DEVICE_LIST', [], { root: true });
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
