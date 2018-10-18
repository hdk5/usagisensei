<template>
  <div v-title="$t('title.main')+$t('title.rank')" class="rank">
    <Github fill="#063261" color="#fff" top="60px"/>
    <h1 class="page-title">{{$t('rank.title', { msg: this.$route.params.id })}}</h1>
    <Card :class="`tier-card tier-card-${tier}`" v-for="tier in Object.keys(rankData)" :key="tier" :padding="0">
      <div class="tier-title">
        <p class="tier-text">{{tier}}</p>
      </div>
      <div class="tier-desc">
        <p class="tier-text">{{$t("about.tier.name"+tier.substr(1,1))}}</p>
      </div>
      <div class="tier-container">
        <div class="type-card" v-for="type in Object.keys(rankData[tier])" :key="type">
          <p class="type-text">{{$t("formation."+type)}}</p>
          <shipItem :shipData="shipData" :rankData="rankData" :tier="tier" :type="type"/>
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
import shipItem from '@/components/shipItem.vue'
import shipData from '@/assets/database.json'
import { mapGetters } from 'vuex'
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
    }
  },
  components: {
    Github,
    shipItem
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
      background: linear-gradient(
        to right,
        rgba(87, 163, 243, 0) 0%,
        rgba(98, 170, 240, 1) 30%,
        rgba(113, 179, 235, 1) 70%,
        rgba(125, 185, 232, 0) 100%
      );
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
      background: url('../assets/rank_mask.png'),
        url('../assets/rank_bg#{$tier}.png');
      background-position: center;
      background-repeat: repeat, no-repeat;
      background-size: auto, cover;
    }
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
