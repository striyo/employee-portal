import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null,
    notifications: [],
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    deleteUser(state) {
      state.user = null;
    },
    pushNotifications(state, payload) {
      state.notifications.push(payload);
    },
    deleteNotifications(state, payload) {
      state.notifications = state.notifications.filter((message) => message.id !== payload);
    },
  },
  actions: {
    setUser(state, payload) {
      state.commit('setUser', payload);
    },
    deleteUser(state) {
      state.commit('deleteUser');
    },
    pushNotifications(state, payload) {
      let notif = {
        id: Math.random() * 100,
        message: payload.message,
        error: payload.error,
      };

      state.commit('pushNotifications', notif);
    },
    deleteNotifications(state, payload) {
      state.commit('deleteNotifications', payload);
    },
  },
  getters: {
    getUser: (state) => state.user,
  },
  modules: {
  },
});
