<template>
  <Card class="build" :padding="0">
    <Form label-position="top" :model="formItem">
      <Row>
        <i-col span="5">
          <FormItem>
            <p class="item-label">艦船</p>
            <Select v-model="formItem.ship" filterable>
              <Option v-for="ship in shipData" :value="ship.name" :key="ship.id">{{ship.name}}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="6">
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
        </i-col>
        <i-col span="8">
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
        </i-col>
        <i-col span="2">

          <p class="item-label">改造</p>
          <i-switch v-model="formItem.morden">
            <span slot="open"/>
            <span slot="close"/>
          </i-switch>

        </i-col>
        
        <i-col span="3">
          <ButtonGroup style="margin-top: 10px;">
            <Button type="success" @click="addShip">添加</Button>
            <Button class="raw-button" type="primary" @click="rawData = true">检视原始码</Button>
          </ButtonGroup>
        </i-col>
      </Row>
    </Form>
    <Modal v-model="rawData" :closable="false" footer-hide>
      <textarea v-model="rankDataString" style="width: 100%; height: 500px;"/>
    </Modal>
  </Card>
</template>
<script>
import { mapGetters } from 'vuex'
import shipData from '../assets/database.json'

export default {
  data() {
    return {
      rawData: false,
      formItem: {
        rank: '',
        ship: '',
        ability: [],
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
      if (this.formItem.ship && this.formItem.rank) {
        this.$store.commit('removeShip', this.formItem.ship)
        this.formItem.type = shipData[this.formItem.ship].type
        this.$store.commit('addShip', this.formItem)
        this.$Message.success(`成功添加${this.formItem.ship}`)
        this.$router.push({
          path: '/empty'
        })
        this.$router.go(-1)
      } else {
        this.$Message.warning('資料有誤請重新查驗！')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.build {
  position: fixed;
  bottom: 0;
  z-index: 999;
  width: calc(100% - 20px);
  margin: 10px;
  background-color: #495061;
  color: #fff;
  .item-label {
    line-height: 10px;
    margin-bottom: 5px;
  }
}
.ivu-col {
  padding: 0 10px;
}
.ivu-form {
  margin: 10px;
}
.ivu-form-item {
  margin-bottom: 10px;
}
</style>