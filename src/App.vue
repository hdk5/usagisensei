<template>
  <div id="app">
    <Layout>
      <Header><topNav/></Header>
      <Layout>
        <Sider hide-trigger><sideBar/></Sider>
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
  }
}
</script>
