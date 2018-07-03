<template>
  <div v-title="'rank'" class="rank">
    <!-- <isotope ref="isotope" class="isotope-container" :options='isotopeOption' :list="shipArray"> -->
    <div v-for="tier in rankData" :key="tier.key">
      <div v-for="type in tier" :key="type.key">
        <Card v-for="ship in Object.keys(type)" :key="ship.key" :padding="0">
          <div style="text-align:center">
            <div class="ability-container">
              <div class="ability-placeholder" v-if="!type[ship].ability[0]"/>
              <div class="ability-bar" :style="`width: ${abilityLength(type[ship].ability)}; background-color: ${abilityColor(ability)};`" v-for="ability in type[ship].ability" :key="ability.key">
                <p class="ability-text">{{ability}}</p>
              </div>
            </div>
            <img class="ship-image" width="100" height="100" :src="`img/shipicons/${shipData[ship].id}.png`">
            <p class="ship-name">{{shipData[ship].name}}</p>
          </div>
        </Card>
      </div>
    </div>
    <!-- </isotope> -->
    
    <div class="rank-footer">评定标准：伤害输出 > 生存表现 > 队伍辅助 | 榜单仅供叁考练船，不代表舰娘的绝对强度</div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import isotope from 'vueisotope'
import shipData from '../assets/database.json'

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
        case '辅':
          return '#fe8100'
        case '腐':
          return '#e00003'
      }
    }
  },
  components: {
    isotope
  }
}
</script>

<style scoped>
.ivu-layout-content {
  background: #f5f5f5;
}
.rank {
  height: calc(100vh - 60px);
}
.ivu-card {
  width: 102px;
  height: 130px;
  margin: 5px;
}
.rank-footer {
  position: absolute;
  bottom: 0;
  text-align: center;
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
.ability-bar {
  height: 5px;
  display: inline-block;
  position: relative;
  top: -2px;
  z-index: 100;
  transition: height ease 0.5s;
  border-bottom: 1px solid rgba(255, 255, 255, 0.6);
}
.ability-bar:first-child {
  border-top-left-radius: 4px;
}
.ability-bar:last-child {
  border-top-right-radius: 4px;
}
.ability-bar:hover {
  height: 20px;
}
.ability-placeholder {
  background: #495060;
  height: 5px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.6);
}
.ability-text {
  font-size: 12px;
  opacity: 0;
  transition: opacity ease 0.6s;
  color: #fff;
}
.ability-text:hover {
  opacity: 1;
}
</style>
