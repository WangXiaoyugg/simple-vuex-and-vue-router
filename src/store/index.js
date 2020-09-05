import Vue from 'vue'
import Vuex from '../lib/vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: 'garen'
  },
  mutations: {
    setUsername(state) {
      state.name = 'mike'
    }
  },
  actions: {
    setUsername({ commit }) {
      setTimeout(() => {
        commit('setUsername')
      }, 1000)
    }
  },
  modules: {
  }
})
