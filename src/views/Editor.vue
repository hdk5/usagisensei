<template>
  <div v-title="$t('title.main')+$t('title.editor')" class="editor">
    <Builder/>
    <Card :class="`tier-card tier-card-${tier}`" v-for="tier in Object.keys(rankData)" :key="tier">
      <p class="tier-card-title" slot="title">{{tier}}</p>
      <Card class="type-card" v-for="type in Object.keys(rankData[tier])" :key="type">
        <p class="type-card-title" slot="title">{{$t('formation.'+type)}}</p>
        <shipItem :shipData="shipData" :rankData="rankData" :tier="tier" :type="type"/>
      </Card>
    </Card>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import shipData from '@/assets/database.json'
import Builder from '@/components/builder.vue'
import shipItem from '@/components/shipItem.vue'

export default {
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
    Builder,
    shipItem
  }
}
</script>
<style lang="scss" scoped>
.ivu-layout-content {
  background: #f5f5f5;
}
.editor {
  height: calc(100vh - 60px);
  .tier-card {
    margin: 10px;
    &:last-child {
      margin-bottom: 110px;
    }
  }
  $tier-list: '0', '1', '2', '3', '4', '5', 'n';
  @each $tier in $tier-list {
    .tier-card-T#{$tier} {
      background: url('../assets/rank_mask.png'),
        url('../assets/rank_bg#{$tier}.png');
      background-position: center;
      background-repeat: repeat, no-repeat;
      background-size: auto, cover;
    }
  }
  .type-card {
    width: 100%;
    background: rgba(255, 255, 255, 0.5);
    display: inline-block;
    margin: 5px;
  }
  .tier-card-title,
  .type-card-title {
    font-size: 18px;
    text-align: center;
  }
}
.ship-item {
  width: 102px;
  height: 130px;
  margin: 5px;
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
        text-align: center;
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
</style>
