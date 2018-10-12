<template>
  <div v-title="$t('title.main')+$t('title.rank')" class="rank">
    <Github fill="#063261" color="#fff" top="60px"/>
    <h1 class="page-title">{{$t('rank.title', { msg: this.$route.params.id })}}</h1>
    <Card :class="`tier-card tier-card-${tier}`" v-for="tier in Object.keys(rankData)" :key="tier" :padding="0">
      <div class="tier-title">
        <p class="tier-text">{{tier}}</p>
      </div>
      <div class="tier-desc">
        <p class="tier-text">{{tierDesc(tier)}}</p>
      </div>
      <div class="tier-container">
        <div class="type-card" v-for="type in Object.keys(rankData[tier])" :key="type">
          <p class="type-text">{{$t("formation."+type)}}</p>
          <Card class="ship-item" v-for="ship in Object.keys(rankData[tier][type])" :key="ship" :padding="0" :bordered="false">
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
            <div :class="'ship-type-icon-'+shipData[ship].type" :style="{ backgroundImage: 'url(img/shiptype.png)' }"/>
            <p class="ship-name" v-if="rankData[tier][type][ship].morden">{{shipName(shipData[ship].name)}}{{$t("rank.retrofitted")}}</p>
            <p class="ship-name" v-else>{{shipName(shipData[ship].name)}}</p>
            <div class="rarity-bar" v-if="rankData[tier][type][ship].morden" :style="'border-bottom-color:'+rarityColor(shipData[ship].rarity,1)"/>
            <div class="rarity-bar" v-else :style="'border-bottom-color:'+rarityColor(shipData[ship].rarity,0)"/>
          </Card>
        </div>
      </div>
    </Card>
    <Row class="rank-footer">
      <i-col span="6">
        <p>{{$t('rank.raw')}}<a :href="'https://www.bilibili.com/read/cv'+rawLink[this.$route.params.id]" target="_blank">{{rawLink[this.$route.params.id]}}</a></p>
      </i-col>
      <i-col span="12">
        <p>{{$t('rank.standard')}}</p>
      </i-col>
      <i-col span="6">
        <p>{{$t('rank.liveroom')}}<a href="https://live.bilibili.com/5560806" target="_blank"> 5560806</a></p>
      </i-col>
    </Row>
    <BackTop/>
  </div>
</template>
<script>
import Github from '@/components/github.vue'
import { mapGetters } from 'vuex'
import shipData from '../assets/database.json'
import localeEN from '../locales/en.json'
import localeCN from '../locales/zh-CN.json'
import axios from 'axios'

export default {
  watch: {
    '$route.params.id': function() {
      this.loadRankData()
    }
  },
  created: function() {
    if (this.rawLink[this.$route.params.id] === undefined) {
      const link = Object.keys(this.rawLink)
      const last = link[link.length - 1]
      this.$router.push({
        path: '/rank/' + last
      })
    }
    this.loadRankData()
  },
  computed: {
    shipData: function() {
      return shipData
    },
    localeEN: function() {
      return localeEN
    },
    localeCN: function() {
      return localeCN
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
    ...mapGetters(['rankData', 'rawLink'])
  },
  methods: {
    loadRankData() {
      axios.get(`js/ship${this.$route.params.id}.json`).then(res => {
        this.$store.commit('loadRankData', res.data)
        let message = `成功载入第${this.$route.params.id}期舰娘强度榜`
        if (this.$i18n.locale === 'en') {
          message = `成功载入第${this.$route.params.id}期舰娘强度榜EN`
        }
        this.$Message.success({
          content: message,
          duration: 3
        })
      })
    },
    tierDesc: function(tier) {
      if (this.$i18n.locale === 'en') {
        switch (tier) {
          case 'T0':
            return 'Core of Fleet'
          case 'T1':
            return 'Main Force'
          case 'T2':
            return 'Secondary Force'
          case 'T3':
            return 'Alternate Force'
          case 'T4':
            return 'Recommended'
          case 'T5':
            return 'Optional'
          case 'Tn':
            return 'Powered by Love'
        }
      } else {
        switch (tier) {
          case 'T0':
            return '舰队核心'
          case 'T1':
            return '推图主力'
          case 'T2':
            return '次选主力'
          case 'T3':
            return '候补主力'
          case 'T4':
            return '中等推荐'
          case 'T5':
            return '选择练船'
          case 'Tn':
            return '为爱发电'
        }
      }
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
      if (this.$i18n.locale === 'en' && this.localeEN.ship[name] !== undefined) {
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
      const rarityList = ['#c3c3c3', '#80c3e1', '#8b71d2', '#ecca7d']
      return rarityList[rarity + morden - 2]
    }
  },
  components: {
    Github
  }
}
</script>
<style lang="scss" scoped>
.ivu-layout-content {
  background: #f5f5f5;
}
.rank {
  height: calc(100vh - 60px);
  .page-title {
    text-align: center;
    margin: 20px 0;
  }
  .tier-card {
    margin: 10px;
    @mixin tier-text($position, $vertical) {
      background: #57a3f3;
      position: absolute;
      height: 100%;
      #{$position}: 0;
      top: 0;
      width: 22px;
      @if $position == left {
        border-right: 1px solid #fff;
      } @else {
        border-left: 1px solid #fff;
      }
      border-top-#{$position}-radius: 3px;
      border-bottom-#{$position}-radius: 3px;
      .tier-text {
        @if $vertical {
          writing-mode: vertical-lr;
        }
        color: #fff;
        text-align: center;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .tier-title {
      @include tier-text(left, false);
    }
    .type-text {
      background: linear-gradient(to right, rgba(87, 163, 243, 0) 0%, rgba(98, 170, 240, 1) 30%, rgba(113, 179, 235, 1) 70%, rgba(125, 185, 232, 0) 100%);
      color: #fff;
      text-align: center;
    }
    .tier-container {
      margin: 10px 30px;
      text-align: center;
      .type-card {
        display: inline-block;
        text-align: left;
        width: 100%;
        border-bottom: 1px dashed #287bd3e8;
        &:last-child {
          border-bottom: 0;
        }
      }
    }
    .tier-desc {
      @include tier-text(right, true);
    }
  }
  .tier-card-Tn {
    margin-bottom: 35px;
  }
  $tier-list: '0', '1', '2', '3', '4', '5', 'n';
  @each $tier in $tier-list {
    .tier-card-T#{$tier} {
      background: url('../assets/rank_mask.png'), url('../assets/rank_bg#{$tier}.png');
      background-position: center;
      background-repeat: repeat, no-repeat;
      background-size: auto, cover;
    }
  }
}
.ship-item {
  width: 102px;
  height: 130px;
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
    bottom: 1px;
    left: 1px;
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
}
.rank-footer {
  text-align: center;
  position: fixed;
  bottom: 0;
  background: #fff;
  width: 100%;
  height: 26px;
  .ivu-col {
    margin-top: 4px;
  }
  z-index: 999;
  border-top: 1px solid #57a3f3;
}
</style>
