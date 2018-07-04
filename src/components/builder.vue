<template>
  <Form class="build" label-position="top" :model="formItem">
    <FormItem label="艦船">
      <Select v-model="formItem.ship" filterable>
        <Option v-for="ship in shipData" :value="ship.name" :key="ship.id">{{ship.name}}</Option>
      </Select>
    </FormItem>
    <FormItem label="階級">
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
    <FormItem label="能力">
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
    <FormItem label="改造" style="width: inherit;">
      <i-switch v-model="formItem.morden">
        <span slot="open"/>
        <span slot="close"/>
      </i-switch>
    </FormItem>
    <FormItem>
      <Button type="success" @click="addShip" long>添加</Button>
    </FormItem>
  </Form>
</template>
<script>
import shipData from '../assets/database.json'

export default {
  data() {
    return {
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
    }
  },
  methods: {
    addShip: function() {
      if (this.formItem.ship && this.formItem.rank) {
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
<style scoped>
.ivu-form {
  margin: 10px;
}
.ivu-form-item {
  margin-bottom: 10px;
}
</style>
