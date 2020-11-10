import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    deleteUser(state) {
      state.user = null;
    },
  },
  actions: {
    setUser(state, payload) {
      state.commit('setUser', payload);
    },
    deleteUser(state) {
      state.commit('deleteUser');
    },
  },
  getters: {
    getUser: (state) => state.user,
  },
  modules: {
  },
});
