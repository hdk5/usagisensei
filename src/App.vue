<template>
  <div id="app">
    <Layout class="ivu-layout-container">
      <Header><topNav/></Header>
      <Layout>
        <Sider hide-trigger v-if="rankPage"><sideBar/></Sider>
        <Content><router-view/></Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import topNav from '@/components/topnav.vue'
import sideBar from '@/components/sidebar.vue'

export default {
  components: {
    topNav,
    sideBar
  },
  computed: {
    rankPage: function() {
      return this.$route.name === 'rank'
    }
  }
}
</script>
<style scoped>
.ivu-layout-header {
  padding: 0;
  height: 60px;
}
.ivu-layout-sider {
  padding-top: 2px;
  background-color: #f5f5f5;
}
</style>

