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
          <router-link v-for="rank in ranks" :key="rank" :to="'/rank/'+rank">
            <menu-item :name="'ship'+rank">第{{rank}}期</menu-item>
          </router-link>
        </MenuGroup>
      </Submenu>
      <!-- <router-link to="/editor">
        <menu-item name="editor">
          <Icon type="edit"/>
          编辑器
        </menu-item>
      </router-link> -->
    </i-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'topnav',
  data() {
    return {
      activeName: this.$route.name
    }
  },
  computed: {
    ranks: function() {
      return Object.keys(this.rawLink)
    },
    ...mapGetters(['rawLink'])
  }
}
</script>