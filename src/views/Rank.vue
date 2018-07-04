<template>
  <div v-title="'rank'" class="rank">
    <!-- <isotope ref="isotope" class="isotope-container" :options='isotopeOption' :list="shipArray"> -->
    <Card class="tier-card" v-for="tier in Object.keys(rankData)" :key="tier">
      <p slot="title">{{tier}}</p>
      <Card class="type-card" v-for="type in Object.keys(rankData[tier])" :key="type">
        <p slot="title">{{type}}</p>
        <Card class="ship-item" v-for="ship in Object.keys(rankData[tier][type])" :key="ship" :padding="0">
          <div class="ability-container">
            <div class="ability-placeholder" v-if="!rankData[tier][type][ship].ability[0]"/>
            <div class="ability-bar" v-for="ability in rankData[tier][type][ship].ability" :key="ability.key" :style="`width: ${abilityLength(rankData[tier][type][ship].ability)}; background-color: ${abilityColor(ability)};`">
              <p class="ability-text">{{abilityName(ability)}}</p>
            </div>
          </div>
          <img class="ship-image" width="100" height="100" :src="`img/shipicons/${shipData[ship].id}.png`">
          <p class="ship-name">{{shipData[ship].name}}</p>
        </Card>
      </Card>
    </Card>
    <!-- </isotope> -->
    
    <div class="rank-footer">评定标准：伤害输出 > 生存表现 > 队伍辅助 | 榜单仅供叁考练船，不代表舰娘的绝对强度</div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import isotope from 'vueisotope'
import shipData from '../assets/database.json'
import axios from 'axios'

export default {
  data() {
    return {
      isotopeOption: {
        layoutMode: 'masonry',
        getFilterData: {
          all: function() {
            return true
          },
          multi: ship => {
            let nation = this.filterStats.nation
            let type = this.filterStats.type
            if (nation !== '' && type !== '') {
              return ship.nation === nation && ship.type === type
            } else if (nation !== '') {
              return ship.nation === nation
            } else if (type !== '') {
              return ship.type === type
            }
          }
        },
        hiddenStyle: {
          opacity: 0,
          transform: 'scale(0.5)'
        },
        visibleStyle: {
          opacity: 1,
          transform: 'scale(1)'
        }
      }
    }
  },
  created() {
    let files = ['29']
    if (files.indexOf(this.$route.params.id) < 0) {
      const last = files[files.length - 1]
      this.$router.push({
        path: '/rank/' + last
      })
    }
    axios.get(`js/ship${this.$route.params.id}.json`).then(res => {
      this.$store.commit('loadRankData', res.data)
      this.$Message.success('成功添加')
    })
  },
  computed: {
    shipData: function() {
      return shipData
    },
    shipArray: function() {
      let result = []
      Object.keys(shipData).map(shipName => {
        if (shipData[shipName].id) {
          result.push(shipData[shipName])
        }
      })
      return result
    },
    ...mapGetters(['rankData'])
  },
  methods: {
    abilityLength: function(ability) {
      if (ability.length !== 0) {
        return Math.round(100 / ability.length) + '%'
      } else {
        return '100%'
      }
    },
    abilityColor: function(ability) {
      switch (ability) {
        case '炮':
          return '#e00102'
        case '雷':
          return '#0000fe'
        case '弹':
          return '#00abc9'
        case '空':
          return '#028df2'
        case '爆':
          return '#e101ad'
        case '防':
          return '#ff8b00'
        case '奶':
          return '#02b501'
        case '零':
          return '#d5b61e'
        case '防辅':
          return '#fe8100'
        case '伤辅':
          return '#e00003'
      }
    },
    abilityName: function(ability) {
      if (ability.length === 2) {
        ability = ability.substr(1)
      }
      return ability
    }
  },
  components: {
    isotope
  }
}
</script>
<style lang="scss" scoped>
.ivu-layout-content {
  background: #f5f5f5;
}
.rank {
  height: calc(100vh - 60px);
  .tier-card {
    margin: 10px;
  }
  .type-card {
    display: inline-block;
    margin: 5px;
  }
}
.ship-item {
  width: 102px;
  height: 130px;
  margin: 5px;
  text-align: center;
  vertical-align: middle;
  display: inline-table;
  .ability-container {
    .ability-placeholder {
      background: #495060;
      height: 5px;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.6);
    }
    .ability-bar {
      height: 5px;
      display: inline-block;
      position: relative;
      top: -2px;
      z-index: 100;
      transition: height ease 0.5s;
      border-bottom: 1px solid rgba(255, 255, 255, 0.6);
      &:first-child {
        border-top-left-radius: 4px;
      }
      &:last-child {
        border-top-right-radius: 4px;
      }
      &:hover {
        height: 20px;
      }
      .ability-text {
        font-size: 12px;
        opacity: 0;
        transition: opacity ease 0.6s;
        color: #fff;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
  .ship-image {
    position: absolute;
    left: 0;
    top: 5px;
  }
  .ship-name {
    position: absolute;
    top: 106px;
    margin: 0 auto;
    width: 100px;
  }
}
.rank-footer {
  text-align: center;
}
</style>
