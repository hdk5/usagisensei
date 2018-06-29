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
      state.rankData[data.rank][data.type] = {}
      state.rankData[data.rank][data.type][data.ship] = {
        ability,
        morden
      }
    },
    increment(state) {
      state.count++
    },
    decrement(state) {
      state.count--
    }
  },
  actions: {
    addShip: ({ commit }) => commit('addShip'),
    increment: ({ commit }) => commit('increment'),
    decrement: ({ commit }) => commit('decrement'),
    incrementIfOdd({ commit, state }) {
      if ((state.count + 1) % 2 === 0) {
        commit('increment')
      }
    },
    incrementAsync({ commit }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('increment')
          resolve()
        }, 1000)
      })
    }
  },
  getters: {
    rankData: state => {
      return state.rankData
    }
  }
})
