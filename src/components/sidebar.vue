<template>
  <div class="sidebar">
    <i-menu theme="dark" width="auto" active-name="1">
      <MenuGroup title="sidebar1">
        <menu-item name="1">
          <Icon type="document-text"/>
          sidebar sub1
        </menu-item>
        <menu-item name="2">
          <Icon type="chatbubbles"/>
          sidebar sub2
        </menu-item>
      </MenuGroup>
      <MenuGroup title="sidebar2">
        <menu-item name="3">
          <Icon type="heart"/>
          sidebar sub3
        </menu-item>
        <menu-item name="4">
          <Icon type="heart-broken"/>
          sidebar sub4
        </menu-item>
      </MenuGroup>
    </i-menu>
  </div>
</template>

<script>
export default {
  name: 'sidebar'
}
</script>
<style scoped>
.sidebar {
  height: calc(100vh - 64px);
}
</style>