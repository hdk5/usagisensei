<template>
  <div v-title="'rank'" class="rank">
    <!-- <isotope ref="isotope" class="isotope-container" :options='isotopeOption' :list="shipArray"> -->
    <Card class="tier-card" v-for="tier in Object.keys(rankData)" :key="tier">
      <p slot="title">{{tier}}</p>
      <span class="type-card" v-for="type in Object.keys(rankData[tier])" :key="type">
        <Card class="ship-item" v-for="ship in Object.keys(rankData[tier][type])" :key="ship" :padding="0">
          <div class="ability-container">
            <div class="ability-placeholder" v-if="!rankData[tier][type][ship].ability[0]"/>
            <div class="ability-bar" v-for="ability in rankData[tier][type][ship].ability" :key="ability.key" :style="`width: ${abilityLength(rankData[tier][type][ship].ability)}; background-color: ${abilityColor(ability)};`">
              <p class="ability-text">{{abilityName(ability)}}</p>
            </div>
          </div>
          <img class="ship-image" width="100" height="100" :src="`img/shipicons/${shipData[ship].id}.png`" :style="'border-bottom-color:'+rarityColor(shipData[ship].rarity)">
          <div :class="'ship-type-icon-'+shipData[ship].type" :style="{ backgroundImage: 'url(img/shiptype.png)' }"/>
          <p class="ship-name">{{shipName(shipData[ship].name)}}</p>
          <div class="rarity-bar" :style="'border-bottom-color:'+rarityColor(shipData[ship].rarity)"/>
        </Card>
      </span>
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
  watch: {
    '$route.params.id': function() {
      this.loadRankData()
    }
  },
  created: function() {
    this.loadRankData()
  },
  beforeMount() {},
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
    loadRankData() {
      let files = ['29', '30']
      if (files.indexOf(this.$route.params.id) < 0) {
        const last = files[files.length - 1]
        this.$router.push({
          path: '/rank/' + last
        })
      }
      axios.get(`js/ship${this.$route.params.id}.json`).then(res => {
        this.$store.commit('loadRankData', res.data)
        this.$Message.success({
          content: `成功载入第${this.$route.params.id}期舰娘强度榜`,
          duration: 3
        })
      })
    },
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
    },
    shipName: function(name) {
      switch (name) {
        case '试作型布里MKII':
          return '试作型布里'
        case '查尔斯·奥斯本':
          return '查尔斯 A.'
        case '印第安纳波利斯':
          return '印第安纳'
        case '伊丽莎白女王':
          return '伊丽莎白'
        case '希佩尔海军上将':
          return '希佩尔上将'
        case '斯佩伯爵海军上将':
          return '斯佩伯爵'
        default:
          return name
      }
    },
    rarityColor: function(rarity) {
      if (rarity === 15) {
        rarity = 5
      }
      const rarityList = ['#c3c3c3', '#80c3e1', '#8b71d2', '#ecca7d']
      return rarityList[rarity - 2]
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
    border-bottom-width: 1px;
    border-bottom-style: solid;
  }
  .ship-name {
    position: absolute;
    top: 106px;
    margin-left: 28px;
    width: 70px;
  }
  $shipTypeArray: (
    '维修': -5px -5px,
    '潜艇': -40px -5px,
    '驱逐': -5px -31px,
    '战列': -40px -31px,
    '轻巡': -75px -5px,
    '轻航': -75px -31px,
    '重巡': -5px -57px,
    '重炮': -40px -57px,
    '航母': -75px -57px,
    '战巡': -40px -31px,
    '航巡': -5px -57px,
    '航战': -40px -31px,
    '雷巡': -75px -5px
  );
  @each $type, $position in $shipTypeArray {
    .ship-type-icon-#{$type} {
      width: 25px;
      height: 16px;
      position: absolute;
      top: 108px;
      margin-left: 1px;
      background-position: $position;
    }
  }
  .rarity-bar {
    width: 100px;
    height: 2px;
    position: absolute;
    bottom: 0;
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
}
.rank-footer {
  text-align: center;
}
</style>
