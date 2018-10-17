import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

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
    rawLink: {
      29: '575927',
      30: '654007',
      31: '853229'
    }
  },
  plugins: [createPersistedState()],
  mutations: {
    addShip (state, data) {
      let ability = data.ability
      let morden = data.morden
      let evaluation = data.evaluation
      let type = data.type
      switch (type) {
        case '战列':
        case '战巡':
        case '航母':
        case '轻航':
        case '维修':
          type = 'main'
          break
        case '驱逐':
        case '轻巡':
        case '重巡':
          type = 'vanguard'
          break
        case '潜艇':
          type = 'submarine'
          break
      }
      if (!state.rankData[data.rank][type]) {
        state.rankData[data.rank][type] = {}
      }
      state.rankData[data.rank][type][data.ship] = {
        evaluation,
        ability,
        morden
      }
    },
    removeShip (state, data) {
      Object.keys(state.rankData).map(tier => {
        Object.keys(state.rankData[tier]).map(type => {
          delete state.rankData[tier][type][data]
          if (Object.keys(state.rankData[tier][type]).length === 0) {
            delete state.rankData[tier][type]
          }
        })
      })
    },
    loadRankData (state, data) {
      state.rankData = data
    }
  },
  actions: {
    addShip: ({
      commit
    }) => commit('addShip')
  },
  getters: {
    rankData: state => {
      return state.rankData
    },
    rawLink: state => {
      return state.rawLink
    }
  }
})
