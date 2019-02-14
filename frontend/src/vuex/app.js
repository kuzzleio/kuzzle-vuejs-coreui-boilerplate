const state = {
  waitingForConnection: false,
  online: false
};

const mutations = {
  SET_ONLINE: state => {
    state.online = true;
  },
  SET_OFFLINE: state => {
    state.online = false;
  },
  SET_WAITING_FOR_CONNECTION: state => {
    state.waitingForConnection = true;
  },
  UNSET_WAITING_FOR_CONNECTION: state => {
    state.waitingForConnection = false;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
