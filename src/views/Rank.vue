<template>
  <div v-title="'rank'" class="rank">
    <!-- <isotope ref="isotope" class="isotope-container" :options='isotopeOption' :list="shipArray"> -->
      <div v-for="tier in rankData" :key="tier.key">
        <div v-for="type in tier" :key="type.key">
          <Card v-for="ship in Object.keys(type)" :key="ship.key" :padding="0">
            <div style="text-align:center">
              <img width="100" height="100" :src="`img/shipicons/${shipData[ship].id}.png`">
              <p>{{shipData[ship].name}}</p>
            </div>
          </Card>
        </div>
      </div>
    <!-- </isotope> -->
    <p>评定标准：伤害输出 > 生存表现 > 队伍辅助 | 榜单仅供叁考练船，不代表舰娘的绝对强度</p>
    
    <pre>{{rankData}}</pre>
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
  components: {
    isotope
  }
}
</script>

<style scoped>
.rank {
  height: calc(100vh - 64px);
}
.ivu-card {
  width: 102px;
  height: 130px;
  margin: 5px;
}
</style>
