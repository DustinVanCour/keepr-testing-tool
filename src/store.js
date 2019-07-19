import Vue from 'vue'
import Vuex from 'vuex'
import auth from './stores/auth'
import keeps from './stores/keeps'
import vaults from './stores/vaults'
import vaultKeeps from './stores/vaultKeeps'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },
  modules: {
    auth,
    keeps,
    vaults,
    vaultKeeps
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    }

  },
  actions: {
  },
  getters: {
    User(state) {
      return state.user
    }
  }
})
