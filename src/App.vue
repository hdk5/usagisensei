<template>
  <div id="app">
    <Layout class="ivu-layout-container">
      <Header :style="{position: 'fixed', width: '100%', zIndex: '9999'}">
        <topNav/>
      </Header>
      <Layout :style="{marginTop: '60px'}">
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

