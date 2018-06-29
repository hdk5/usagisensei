import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    rankData: {
      '0': {},
      '1': {},
      '2': {},
      '3': {},
      '4': {},
      '5': {},
      '9': {}
    }
  },
  mutations: {
    addShip(state, data) {
      let ability = data.ability
      let morden = data.morden
      if (!state.rankData[data.rank][data.type]) {
        state.rankData[data.rank][data.type] = {}
      }
      state.rankData[data.rank][data.type][data.ship] = {
        ability,
        morden
      }
    }
  },
  actions: {
    addShip: ({ commit }) => commit('addShip')
  },
  getters: {
    rankData: state => {
      return state.rankData
    }
  }
})
