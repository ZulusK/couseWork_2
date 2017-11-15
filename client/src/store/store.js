import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    id: null,
    username: null,
    isUserLoggedIn: false
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      if (token) {
        state.isUserLoggedIn = true;
      } else {
        state.isUserLoggedIn = false;
      }
    },
    setId (state, id) {
      state.id = id
    },
    setUsername (state, username) {
      state.username = username
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token);
    },
    setId ({commit}, id) {
      commit('setId', id);
    },
    setUsername ({commit}, username) {
      commit('setUsername', username);
    }
  }
})
