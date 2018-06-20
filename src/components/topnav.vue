<template>
  <div class="topnav">
    <i-menu mode="horizontal" theme="dark" active-name="1">
      <router-link to="/">
        <menu-item name="1">
          <Icon type="ios-paper"/>
          Home
        </menu-item>
      </router-link>
      <router-link to="/about">
        <menu-item name="2">
          <Icon type="ios-people"/>
          About
        </menu-item>
      </router-link>
      <Submenu name="3">
        <template slot="title">
          <Icon type="stats-bars"/>
          Submenu
        </template>
        <MenuGroup title="使用">
          <menu-item name="3-1">sub1-1</menu-item>
          <menu-item name="3-2">sub1-2</menu-item>
          <menu-item name="3-3">sub1-3</menu-item>
        </MenuGroup>
        <MenuGroup title="留存">
          <menu-item name="3-4">sub2-1</menu-item>
          <menu-item name="3-5">sub2-2</menu-item>
        </MenuGroup>
      </Submenu>
    </i-menu>
  </div>
</template>

<script>
export default {
  name: 'topnav'
}
</script>