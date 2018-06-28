<template>
  <div v-title="'rank'" class="rank">
    <h1>This is an rank page</h1>
    <isotope ref="isotope" class="isotope-container" :options='isotopeOption' :list="shipData">
      <Card v-for="element in shipData" @click="selected=element" :key="element.id" :padding="0" v-if="element.id">
        <div style="text-align:center">
          <img width="100" height="100" :src="`img/shipicons/${element.id}.png`">
          <p>{{element.name}}</p>
        </div>
      </Card>
    </isotope>
    <p>评定标准：伤害输出 > 生存表现 > 队伍辅助 | 榜单仅供叁考练船，不代表舰娘的绝对强度</p>
  </div>
</template>
<script>
import isotope from 'vueisotope'
import shipData from '../assets/database.json'

export default {
  data() {
    return {
      abilitiy: {
        cannon: ['炮', '主炮+1'],
        tropedo: ['雷', '雷伤优秀'],
        barrage: ['弹', '弹幕优秀'],
        antiair: ['空', '防空优秀'],
        boomb: ['爆', '打自爆优秀'],
        survive: ['防', '生存/机动'],
        heal: ['奶', '耐久回复'],
        zero: ['零', '零破低耗'],
        buff: ['辅', '增伤BUFF'],
        debuff: ['辅', '减伤BUFF']
      },
      shipType: {
        1: '驱逐',
        2: '轻巡',
        3: '重巡',
        4: '战巡',
        5: '战列',
        6: '轻航',
        7: '航母',
        8: '潜艇',
        9: '航巡',
        10: '航战',
        11: '雷巡',
        12: '维修',
        13: '重炮'
      },
      shipNation: {
        1: '白鹰',
        2: '皇家',
        3: '重樱',
        4: '铁血',
        5: '东煌',
        6: 'nil',
        7: '北方联合',
        8: '自由鸢尾',
        9: '其他',
        101: '联动-海王星',
        102: '联动-哔哩哔哩'
      },
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
      let result = []
      Object.keys(shipData).map(shipName => {
        result.push(shipData[shipName])
      })
      return result
    }
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
