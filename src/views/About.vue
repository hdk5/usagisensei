<template>
  <div v-title="'about'" class="about">
    <Github fill="#fff" color="#287bd3" top="0"/>
    <Card style="margin-top:60px;" :bordered="false">
      <p slot="title">本站说明</p>
      <Timeline>
        <TimelineItem>本站仅将兔老师强度榜以网页的形式重新实现，榜单资料兔老师全权拥有。</TimelineItem>
        <TimelineItem>本站游戏图像素材取自Wiki等网站</TimelineItem>
        <TimelineItem>本站为个人练习项目，若有大佬想参与欢迎联系。</TimelineItem>
        <TimelineItem>如有任何bug或是资料错误等，欢迎在github直丢issues。</TimelineItem>
      </Timeline>
    </Card>
    <Card :bordered="false">
      <p slot="title">榜单说明</p>
      <Timeline>
        <TimelineItem color="red">
          <Icon type="android-alert" slot="dot"/>
          <span>榜单仅供参考练船，不代表舰娘的绝对强度，建议以副本需求和阵容搭配选择舰娘。</span>
        </TimelineItem>
        <TimelineItem color="red">
          <Icon type="android-alert" slot="dot"/>
          <span>榜单舰娘为同舰型之间的排名对比，如驱逐不跟轻巡比，且不考虑养成成本和油耗等。</span>
        </TimelineItem>
        <TimelineItem color="red">
          <Icon type="android-alert" slot="dot"/>
          <span>舰娘的强度需要一定的装备、技能和觉醒等级支撑，强度梯度以副本开荒强度实际表现为基准。</span>
        </TimelineItem>
        <TimelineItem>
          <Icon type="ios-information" slot="dot"/>
          <span>榜单评定标准：伤害输出＞生存表现＞队伍辅助<br>
            每只舰娘的定位用处都不一样，伤害不是唯一的强度评定标准。</span>
        </TimelineItem>
        <TimelineItem>
          <Icon type="ios-information" slot="dot"/>
          <span>各期榜单变动及详细资料请至兔老师bilibili原帖查看。</span>
        </TimelineItem>
      </Timeline>
    </Card>
    <Card style="margin-bottom:40px;" :bordered="false">
      <p slot="title">梯度说明</p>
      <Timeline color="#fd071e">
        <TimelineItem>
          <p slot="dot">T0</p>
          <p class="time">舰队核心</p>
          <p class="content">碧蓝最强阵容的核心选手，天选之子。</p>
        </TimelineItem>
        <TimelineItem color="#ff0084">
          <p slot="dot">T1</p>
          <p class="time">推图主力</p>
          <p class="content">可以与 T0 相知匹敌的强度，推图主力，劳模。</p>
        </TimelineItem>
        <TimelineItem color="#e75b1e">
          <p slot="dot">T2</p>
          <p class="time">次选主力</p>
          <p class="content">同样是推图主力实力选手，属性优秀，但是因为一些能力上的不足暂时留在T2。</p>
        </TimelineItem>
        <TimelineItem color="#968400">
          <p slot="dot">T3</p>
          <p class="time">候补主力</p>
          <p class="content">自身优秀的属性，在没有适合的主图阵容可以选择此梯度。</p>
        </TimelineItem>
        <TimelineItem color="#5ac100">
          <p slot="dot">T4</p>
          <p class="time">一般推荐</p>
          <p class="content">我是分割线。</p>
        </TimelineItem>
        <TimelineItem color="#219bb0">
          <p slot="dot">T5</p>
          <p class="time">选择练船</p>
          <p class="content">虽然能力不高，但是努力的舰娘仍然凭借自身一些特点获得上场的机会。</p>
        </TimelineItem>
        <TimelineItem color="#0156ef">
          <p slot="dot">Tn</p>
          <p class="time">为爱发电</p>
          <p class="content">微薄的存在感 因为兎老师不忍心让她们不被玩家熟知而带到了强度榜上， 弱小的舰娘正等待着为爱发电的提督发掘她们的潜力。</p>
        </TimelineItem>
      </Timeline>
    </Card>



  </div>
</template>
<script>
import Github from '@/components/github.vue'

export default {
  name: 'about',
  components: {
    Github
  }
}
</script>

<style scoped>
.about {
  width: 100%;
  background: #287bd3;
  position: absolute;
  top: 60px;
}
.ivu-card {
  margin: 10px 10vw;
}
.ivu-timeline-item-head-custom {
  font-size: 20px;
}
</style>
