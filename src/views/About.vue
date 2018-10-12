<template>
  <div v-title="$t('title.main')+$t('title.about')" class="about">
    <Github fill="#fff" color="#287bd3" top="0"/>
    <Card style="margin-top:60px;" :bordered="false">
      <p slot="title">{{$t("about.site.title")}}</p>
      <Timeline>
        <TimelineItem>{{$t("about.site.line1")}}</TimelineItem>
        <TimelineItem>{{$t("about.site.line2")}}</TimelineItem>
        <TimelineItem>{{$t("about.site.line3")}}</TimelineItem>
        <TimelineItem>{{$t("about.site.line4")}}</TimelineItem>
      </Timeline>
    </Card>
    <Card :bordered="false">
      <p slot="title">{{$t("about.rank.title")}}</p>
      <Timeline>
        <TimelineItem color="red">
          <Icon type="android-alert" slot="dot"/>
          <span>{{$t("about.rank.line1")}}</span>
        </TimelineItem>
        <TimelineItem color="red">
          <Icon type="android-alert" slot="dot"/>
          <span>{{$t("about.rank.line2")}}</span>
        </TimelineItem>
        <TimelineItem color="red">
          <Icon type="android-alert" slot="dot"/>
          <span>{{$t("about.rank.line3")}}</span>
        </TimelineItem>
        <TimelineItem>
          <Icon type="ios-information" slot="dot"/>
          <span>{{$t("about.rank.line4")}}</span>
        </TimelineItem>
        <TimelineItem>
          <Icon type="ios-information" slot="dot"/>
          <span>{{$t("about.rank.line5")}}</span>
        </TimelineItem>
      </Timeline>
    </Card>
    <Card style="margin-bottom:40px;" :bordered="false">
      <p slot="title">{{$t("about.tier.title")}}</p>
      <Timeline color="#fd071e">
        <TimelineItem>
          <p slot="dot">T0</p>
          <p class="time">{{$t("about.tier.name0")}}</p>
          <p class="content">{{$t("about.tier.desc0")}}</p>
        </TimelineItem>
        <TimelineItem color="#ff0084">
          <p slot="dot">T1</p>
          <p class="time">{{$t("about.tier.name1")}}</p>
          <p class="content">{{$t("about.tier.desc1")}}</p>
        </TimelineItem>
        <TimelineItem color="#e75b1e">
          <p slot="dot">T2</p>
          <p class="time">{{$t("about.tier.name2")}}</p>
          <p class="content">{{$t("about.tier.desc2")}}</p>
        </TimelineItem>
        <TimelineItem color="#968400">
          <p slot="dot">T3</p>
          <p class="time">{{$t("about.tier.name3")}}</p>
          <p class="content">{{$t("about.tier.desc3")}}</p>
        </TimelineItem>
        <TimelineItem color="#5ac100">
          <p slot="dot">T4</p>
          <p class="time">{{$t("about.tier.name4")}}</p>
          <p class="content">{{$t("about.tier.desc4")}}</p>
        </TimelineItem>
        <TimelineItem color="#219bb0">
          <p slot="dot">T5</p>
          <p class="time">{{$t("about.tier.name5")}}</p>
          <p class="content">{{$t("about.tier.desc5")}}</p>
        </TimelineItem>
        <TimelineItem color="#0156ef">
          <p slot="dot">Tn</p>
          <p class="time">{{$t("about.tier.namen")}}</p>
          <p class="content">{{$t("about.tier.descn")}}</p>
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
