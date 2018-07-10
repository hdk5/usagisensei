<template>
  <div id="app">
    <Layout class="ivu-layout-container">
      <Header>
        <topNav/>
      </Header>
      <Layout>
        <Content>
          <router-view/>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import topNav from '@/components/topnav.vue'

export default {
  components: {
    topNav
  }
}
</script>
<style scoped>
html {
  overflow-y: hidden;
}
.ivu-layout-header {
  padding: 0;
  height: 60px;
}
</style>

