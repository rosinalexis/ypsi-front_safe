import { createStore } from "vuex";

export default createStore({
  state: {
    user: null,
  },
  getters: {
    user: (state) => {
      return state.user;
    },
  },
  actions: {
    setUser: ({ commit }, user) => {
      commit("SET_USER", user);
    },
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user;
    },
  },
  modules: {},
});
