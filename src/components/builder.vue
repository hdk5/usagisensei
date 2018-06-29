<template>
        <Form class="build" :model="formItem">
          <FormItem label="艦船">
            <Select v-model="formItem.ship" filterable>
              <Option v-for="ship in shipData" :value="ship.name" :key="ship.id">{{ship.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="階級">
            <RadioGroup v-model="formItem.rank">
              <Radio label="0">T0</Radio>
              <Radio label="1">T1</Radio>
              <Radio label="2">T2</Radio>
              <Radio label="3">T3</Radio>
              <Radio label="4">T4</Radio>
              <Radio label="5">T5</Radio>
              <Radio label="9">Tn</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="能力">
            <CheckboxGroup v-model="formItem.ability">
              <Tooltip content="主炮+1">
              <Checkbox label="炮"/>
              </Tooltip>
              <Tooltip content="雷伤优秀">
              <Checkbox label="雷"/>
              </Tooltip>
              <Tooltip content="弹幕优秀">
              <Checkbox label="弹"/>
              </Tooltip>
              <Tooltip content="防空优秀">
              <Checkbox label="空"/>
              </Tooltip>
              <Tooltip content="打自爆优秀">
              <Checkbox label="爆"/>
              </Tooltip>
              <Tooltip content="生存/机动">
              <Checkbox label="防"/>
              </Tooltip>
              <Tooltip content="耐久回复">
              <Checkbox label="奶"/>
              </Tooltip>
              <Tooltip content="零破低耗">
              <Checkbox label="零"/>
              </Tooltip>
              <Tooltip content="增伤BUFF">
              <Checkbox label="辅"/>
              </Tooltip>
              <Tooltip content="减伤BUFF">
              <Checkbox label="辅"/>
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
            <Button type="success" long>添加</Button>
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
        morden: false
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
  methods: {}
}
</script>
<style>
.build {
  color: #fff;
}
.ivu-form {
  margin: 10px;
}
.ivu-form-item {
  margin-bottom: 10px;
}
.ivu-form .ivu-form-item-label {
  width: 100%;
  font-size: 16px;
  text-align: left;
  color: #fff;
}
</style>
