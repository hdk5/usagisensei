<template>
  <div class="topnav">
    <i-menu mode="horizontal" theme="light" :active-name="activeName">
      <router-link to="/">
        <menu-item name="home">
          <Icon type="ios-paper"/>
          Home
        </menu-item>
      </router-link>
      <router-link to="/about">
        <menu-item name="about">
          <Icon type="ios-people"/>
          About
        </menu-item>
      </router-link>
      <router-link to="/rank">
        <menu-item name="rank">
          <Icon type="ios-people"/>
          Rank
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