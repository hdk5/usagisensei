<template>
  <div>
    <Card class="ship-item" v-for="ship in Object.keys(rankData[tier][type])" :key="ship" :padding="0" :bordered="false" :style="{height:shipItemHeight(rankData[tier][type][ship].evaluation)}">
      <div class="ability-container">
        <div class="ability-placeholder" v-if="!rankData[tier][type][ship].ability[0]"/>
        <div class="ability-bar" v-for="ability in rankData[tier][type][ship].ability" :key="ability.key" :style="`width: ${abilityLength(rankData[tier][type][ship].ability)}; background-color: ${abilityColor(ability)};`">
          <p class="ability-text">
            {{abilityName(ability,'title')}}
            <span class="tooltip">{{abilityName(ability,'desc')}}</span>
          </p>
        </div>
      </div>
      <img class="ship-image" v-if="rankData[tier][type][ship].morden" :src="`img/shipicons/3${shipData[ship].id}.png`" :style="'border-bottom-color:'+rarityColor(shipData[ship].rarity,1)">
      <img class="ship-image" v-else :src="`img/shipicons/${shipData[ship].id}.png`" :style="'border-bottom-color:'+rarityColor(shipData[ship].rarity,0)">
      <div class="retrofit" v-if="rankData[tier][type][ship].morden" :style="{backgroundColor:rarityColor(shipData[ship].rarity,rankData[tier][type][ship].morden)}">
        <div class="retrofit-ribbon retrofit-ribbon-top" :style="{borderColor:`transparent transparent ${rarityColor(shipData[ship].rarity,rankData[tier][type][ship].morden)} transparent`}"/>
        <img src="../assets/retrofited.png">
        <div class="retrofit-ribbon retrofit-ribbon-left" :style="{borderColor:`transparent transparent ${rarityColor(shipData[ship].rarity,rankData[tier][type][ship].morden)} transparent`}"/>
      </div>
      <div :class="'ship-type-icon-'+shipData[ship].type" :style="{ backgroundImage: 'url(img/shiptype.png)' }"/>
      <p class="ship-name">{{shipName(shipData[ship].name)}}</p>
      <div class="rarity-bar" :style="{borderBottomColor:rarityColor(shipData[ship].rarity,rankData[tier][type][ship].morden)}">
        <div class="evaluation" v-if="rankData[tier][type][ship].evaluation" v-for="(evaluation,index) in rankData[tier][type][ship].evaluation" :key="index" :style="{backgroundColor:rarityColor(shipData[ship].rarity,rankData[tier][type][ship].morden),color:evaluationColor(shipData[ship].rarity,rankData[tier][type][ship].morden)}">
          <p class="evaluation-title">{{$t('evaluation.'+index)}}</p>
          <p class="evaluation-rank">{{evaluation}}</p>
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
import localeEN from '../locales/en.json'
import localeCN from '../locales/zh-CN.json'

export default {
  name: 'shipItem',
  props: ['shipData', 'rankData', 'tier', 'type'],
  computed: {
    localeCN: function() {
      return localeCN
    },
    localeEN: function() {
      return localeEN
    }
  },
  methods: {
    shipItemHeight: function(evaluation) {
      let height = 130
      if (evaluation) {
        height += 30
      }
      return height + 'px'
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
    abilityName: function(ability, slot) {
      if (slot === 'desc') {
        if (this.$i18n.locale === 'en') {
          ability = this.localeEN.ability[ability]
        } else {
          ability = this.localeCN.ability[ability]
        }
        return ability
      } else {
        if (ability.length === 2) {
          ability = ability.substr(1)
        }
        return ability
      }
    },
    shipName: function(name) {
      if (
        this.$i18n.locale === 'en' &&
        this.localeEN.ship[name] !== undefined
      ) {
        name = this.localeEN.ship[name]
        return name
      } else {
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
          case '埃米尔·贝尔汀':
            return '埃米尔'
          default:
            return name
        }
      }
    },
    rarityColor: function(rarity, morden) {
      if (rarity === 15) {
        rarity = 5
      }
      const rarityList = ['#c3c3c3', '#80c3e1', '#8b71d2', '#ecca7d', '#f8beff']
      if (morden) {
        return rarityList[rarity - 1]
      } else {
        return rarityList[rarity - 2]
      }
    },
    evaluationColor: function(rarity, morden) {
      if (rarity === 15) {
        rarity = 5
      }
      if (morden) {
        rarity += 1
      }
      if (rarity === 4) {
        return '#fff'
      } else {
        return '#444'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.ship-item {
  width: 102px;
  margin: 5px;
  text-align: center;
  vertical-align: middle;
  display: inline-table;
  white-space: nowrap;
  .ability-container {
    margin: 1px 1px;
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
      border-right: 1px solid rgba(255, 255, 255, 0.6);
      border-bottom: 1px solid rgba(255, 255, 255, 0.6);
      &:first-child {
        border-top-left-radius: 4px;
      }
      &:last-child {
        border-top-right-radius: 4px;
        border-right: 0;
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
      .tooltip {
        position: absolute;
        top: -25px;
        left: 50%;
        color: #495060;
        border: 1px solid #495060;
        border-radius: 3px;
        background: #fff;
        padding: 0 4px;
        transform: translate(-50%, 0);
      }
    }
  }
  .retrofit {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 84px;
    right: 1px;
    .retrofit-ribbon {
      content: '';
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 0 20px 20px;
    }
    .retrofit-ribbon-top {
      position: absolute;
      bottom: 20px;
      right: 1;
    }
    .retrofit-ribbon-left {
      position: absolute;
      bottom: 0;
      right: 20px;
    }
    img {
      position: absolute;
      bottom: 2px;
      right: 1px;
      z-index: 999;
    }
  }
  .ship-image {
    height: 100px;
    width: 100px;
    position: absolute;
    left: 1px;
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
    'AR': -5px -5px,
    'SS': -40px -5px,
    'DD': -5px -31px,
    'BB': -40px -31px,
    'CL': -75px -5px,
    'CVL': -75px -31px,
    'CA': -5px -57px,
    'BM': -40px -57px,
    'CV': -75px -57px,
    'BC': -40px -31px,
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
    height: 32px;
    position: absolute;
    bottom: 1px;
    left: 1px;
    text-align: justify;
    padding-top: 1px;
    border-bottom: {
      width: 2px;
      style: solid;
      left-radius: 4px;
      right-radius: 4px;
    }

    .evaluation {
      height: 100%;
      width: 33%;
      display: inline-block;
      text-align: center;
      .evaluation-title {
        font-size: 12px;
        line-height: 14px;
      }
      .evaluation-rank {
        font-size: 16px;
        line-height: 16px;
        font-weight: bold;
      }
    }
  }
}
</style>
