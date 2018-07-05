<template>
  <div class="topnav">
    <i-menu mode="horizontal" theme="light" :active-name="activeName">
      <router-link to="/">
        <menu-item name="home">
          <Icon type="home"/>
          主页
        </menu-item>
      </router-link>
      <router-link to="/about">
        <menu-item name="about">
          <Icon type="information"/>
          关于本站
        </menu-item>
      </router-link>
      <Submenu name="rank">
        <template slot="title">
          <Icon type="star"/>
          排行榜
        </template>
        <MenuGroup title="舰娘强度榜">
          <router-link to="/rank/29">
            <menu-item name="ship29">第29期</menu-item>
          </router-link>
        </MenuGroup>
      </Submenu>
      <router-link v-if="process.env.NODE_ENV === 'development'" to="/editor">
        <menu-item name="editor">
          <Icon type="edit"/>
          编辑器
        </menu-item>
      </router-link>
    </i-menu>
  </div>
</template>

<script>
export default {
  name: 'topnav',
  data() {
    return {
      activeName: this.$route.name
    }
  }
}
</script>