import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    id: null,
    username: null,
    isUserLoggedIn: false
  },
  plugins: [
    createPersistedState()
  ],
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
