import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    tokens: {
      access: null,
      refresh: null,
    },
    user: null
  },
  plugins: [
    createPersistedState()
  ],
  getters: {
    isLogged: (state) => () => Boolean(state.user),
    isNotLogged: (state) => () => !Boolean(state.user),
  },
  mutations: {
    setToken_refresh (state, token) {
      state.tokens.refresh = token
    },
    setToken_access (state, token) {
      state.tokens.access = token
    },
    setUser (state, value) {
      state.user = value;
    }
  },
  actions: {
    setToken_refresh ({commit}, token) {
      commit('setToken_refresh', token);
    },
    setToken_access ({commit}, token) {
      commit('setToken_access', token);
    },
    setUser ({commit}, value) {
      commit('setUser', value)
    }
  }
})
