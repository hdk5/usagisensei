import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    rankData: {
      T0: {},
      T1: {},
      T2: {},
      T3: {},
      T4: {},
      T5: {},
      Tn: {}
    },
    ranks: [29, 30]
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
    },
    removeShip(state, data) {
      Object.keys(state.rankData).map(tier => {
        Object.keys(state.rankData[tier]).map(type => {
          delete state.rankData[tier][type][data]
          if (Object.keys(state.rankData[tier][type]).length === 0) {
            delete state.rankData[tier][type]
          }
        })
      })
    },
    loadRankData(state, data) {
      state.rankData = data
    }
  },
  actions: {
    addShip: ({ commit }) => commit('addShip')
  },
  getters: {
    rankData: state => {
      return state.rankData
    },
    ranks: state => {
      return state.ranks
    }
  }
})
