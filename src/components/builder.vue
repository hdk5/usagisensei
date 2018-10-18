<template>
  <Modal class-name="build" width="350" v-model="buildModal" :closable="false" draggable scrollable title="Modal 1">
    <p class="build-header" slot="header">
      <Icon class="move-icon" type="md-move" />
      <span>排行榜编辑器</span>
    </p>
    <Form class="build-body" label-position="top" :model="formItem">
      <FormItem>
        <p class="item-label">艦船</p>
        <Select v-model="formItem.ship" filterable>
          <Option v-for="ship in shipData" :value="ship.name" :key="ship.id">{{ship.name}}</Option>
        </Select>
      </FormItem>
      <FormItem>
        <p class="item-label">階級</p>
        <RadioGroup v-model="formItem.rank">
          <Radio label="T0">T0</Radio>
          <Radio label="T1">T1</Radio>
          <Radio label="T2">T2</Radio>
          <Radio label="T3">T3</Radio>
          <Radio label="T4">T4</Radio>
          <Radio label="T5">T5</Radio>
          <Radio label="Tn">Tn</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem>
        <p class="item-label">能力</p>
        <CheckboxGroup v-model="formItem.ability">
          <Tooltip content="主炮+1" placement="top-start" :delay="500">
            <Checkbox label="炮" style="color:#e00102;"/>
          </Tooltip>
          <Tooltip content="雷伤优秀" placement="top-start" :delay="500">
            <Checkbox label="雷" style="color:#0000fe;"/>
          </Tooltip>
          <Tooltip content="弹幕优秀" placement="top-start" :delay="500">
            <Checkbox label="弹" style="color:#00abc9;"/>
          </Tooltip>
          <Tooltip content="防空优秀" placement="top-start" :delay="500">
            <Checkbox label="空" style="color:#028df2;"/>
          </Tooltip>
          <Tooltip content="打自爆优秀" placement="top-start" :delay="500">
            <Checkbox label="爆" style="color:#e101ad;"/>
          </Tooltip>
          <Tooltip content="生存/机动" placement="top-start" :delay="500">
            <Checkbox label="防" style="color:#ff8b00;"/>
          </Tooltip>
          <Tooltip content="耐久回复" placement="top-start" :delay="500">
            <Checkbox label="奶" style="color:#02b501;"/>
          </Tooltip>
          <Tooltip content="零破低耗" placement="top-start" :delay="500">
            <Checkbox label="零" style="color:#d5b61e;"/>
          </Tooltip>
          <Tooltip content="防御BUFF" placement="top-start" :delay="500">
            <Checkbox label="防辅" style="color:#fe8100;">辅</Checkbox>
          </Tooltip>
          <Tooltip content="增伤BUFF" placement="top-start" :delay="500">
            <Checkbox label="伤辅" style="color:#e00003;">辅</Checkbox>
          </Tooltip>
        </CheckboxGroup>
      </FormItem>
      <FormItem>
        <p class="item-label">評價</p>
        <RadioGroup style="display: block;" v-model="formItem.evaluation[0]">
          <p class="item-label" style="display: inline-block;">伤害：</p>
          <Radio label="S"/>
          <Radio label="A"/>
          <Radio label="B"/>
          <Radio label="C"/>
          <Radio label="D"/>
        </RadioGroup>
        <RadioGroup style="display: block;" v-model="formItem.evaluation[1]">
          <p class="item-label" style="display: inline-block;">生存：</p>
          <Radio label="S"/>
          <Radio label="A"/>
          <Radio label="B"/>
          <Radio label="C"/>
          <Radio label="D"/>
        </RadioGroup>
        <RadioGroup style="display: block;" v-model="formItem.evaluation[2]">
          <p class="item-label" style="display: inline-block;">辅助：</p>
          <Radio label="S"/>
          <Radio label="A"/>
          <Radio label="B"/>
          <Radio label="C"/>
          <Radio label="D"/>
        </RadioGroup>
      </FormItem>
      <FormItem>
        <p class="item-label">改造</p>
        <i-switch v-model="formItem.morden">
          <span slot="open"/>
          <span slot="close"/>
        </i-switch>
      </FormItem>
    </Form>
    <div slot="footer">
      <ButtonGroup class="build-footer">
        <Button type="success" @click="addShip">添加</Button>
        <Button class="raw-button" type="primary" @click="rawData = true">检视原始码</Button>
      </ButtonGroup>
      <Button type="error" style="margin-top: 10px;" @click="clearRankData" long>清空榜单资料</Button>
    </div>
    <Modal v-model="rawData" :closable="false" footer-hide>
      <textarea v-model="rankDataString" style="width: 100%; height: 500px;"/>
    </Modal>
  </Modal>
</template>
<script>
import { mapGetters } from 'vuex'
import shipData from '../assets/database.json'

export default {
  data() {
    return {
      rawData: false,
      buildModal: true,
      formItem: {
        rank: '',
        ship: '',
        ability: [],
        evaluation: [],
        morden: false,
        type: ''
      }
    }
  },
  computed: {
    shipData: function() {
      let result = []
      Object.keys(shipData).map(shipName => {
        if (shipData[shipName].id) {
          result.push(shipData[shipName])
        }
      })
      return result
    },
    rankDataString: function() {
      return JSON.stringify(this.rankData, null, 2)
    },
    ...mapGetters(['rankData'])
  },
  methods: {
    addShip: function() {
      if (
        this.formItem.ship &&
        this.formItem.rank &&
        this.formItem.evaluation.length === 3
      ) {
        this.$store.commit('removeShip', this.formItem.ship)
        this.formItem.type = shipData[this.formItem.ship].type
        this.$store.commit('addShip', this.formItem)
        this.$router.push({
          path: '/empty'
        })
        this.$router.go(-1)
      } else {
        this.$Message.warning('资料有误请重新查验！')
      }
    },
    clearRankData: function() {
      this.$Modal.confirm({
        title: '警告',
        content: '<p>确定清空榜单资料吗？此动作无法恢复。</p>',
        okText: '清空',
        cancelText: '取消',
        onOk: () => {
          this.$store.commit('clearRankData')
          this.$router.push({
            path: '/empty'
          })
          this.$router.go(-1)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.move-icon {
  float: right;
  font-size: 20px;
}
.build {
  .build-header {
    color: #fff;
    padding-left: 20px;
    text-align: center;
  }
  .build-body {
    .ivu-form-item {
      margin-bottom: 10px;
    }
    .item-label {
      line-height: 10px;
      margin-bottom: 5px;
    }
  }
  .build-footer {
    width: 100%;
    button {
      width: 50%;
    }
  }
}
</style>
<style>
.build .ivu-modal-content {
  background-color: #0f3256cc;
  color: #fff;
}
</style>